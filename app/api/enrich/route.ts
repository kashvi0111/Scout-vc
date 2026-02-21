import { generateText, Output } from "ai"
import { z } from "zod"

const enrichmentSchema = z.object({
  summary: z
    .string()
    .describe("A concise 1-2 sentence summary of what the company does and their market position"),
  bullets: z
    .array(z.string())
    .min(3)
    .max(6)
    .describe("3-6 bullet points explaining what the company does, their products, and value proposition"),
  keywords: z
    .array(z.string())
    .min(5)
    .max(10)
    .describe("5-10 keywords/tags relevant to the company (e.g. technology, market, business model terms)"),
  signals: z
    .array(
      z.object({
        label: z.string().describe("Short signal label, e.g. 'Careers page exists', 'Recent blog post'"),
        positive: z.boolean().describe("Whether this is a positive signal for investor interest"),
      })
    )
    .min(2)
    .max(4)
    .describe(
      "2-4 derived signals based on the website content (e.g. careers page exists, recent blog post, pricing page present, SOC 2 badge visible)"
    ),
})

export async function POST(req: Request) {
  try {
    const { url } = await req.json()

    if (!url || typeof url !== "string") {
      return Response.json({ error: "A valid URL is required" }, { status: 400 })
    }

    const firecrawlKey = process.env.FIRECRAWL_API_KEY
    if (!firecrawlKey) {
      return Response.json({ error: "FIRECRAWL_API_KEY is not configured" }, { status: 500 })
    }

    // 1. Scrape the website with Firecrawl
    const scrapeResponse = await fetch("https://api.firecrawl.dev/v2/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${firecrawlKey}`,
      },
      body: JSON.stringify({
        url,
        formats: ["markdown"],
        onlyMainContent: true,
        timeout: 30000,
        removeBase64Images: true,
        blockAds: true,
      }),
    })

    if (!scrapeResponse.ok) {
      const errorBody = await scrapeResponse.text()
      console.error("[v0] Firecrawl error:", scrapeResponse.status, errorBody)
      return Response.json(
        { error: `Firecrawl scraping failed (${scrapeResponse.status})` },
        { status: 502 }
      )
    }

    const scrapeData = await scrapeResponse.json()

    if (!scrapeData.success || !scrapeData.data?.markdown) {
      return Response.json(
        { error: "Firecrawl returned no content for this URL" },
        { status: 502 }
      )
    }

    const markdown = scrapeData.data.markdown
    const sourceUrl = scrapeData.data.metadata?.sourceURL || url
    const pageTitle = scrapeData.data.metadata?.title || ""

    // Truncate to avoid exceeding token limits
    const truncatedMarkdown = markdown.slice(0, 12000)

    // 2. Extract structured enrichment data using AI SDK
    const { output } = await generateText({
      model: "openai/gpt-4.1-mini",
      output: Output.object({ schema: enrichmentSchema }),
      messages: [
        {
          role: "user",
          content: `You are an expert VC analyst. Analyze the following website content and extract structured intelligence about this company.

Website URL: ${url}
Page Title: ${pageTitle}

Website Content:
${truncatedMarkdown}

Extract:
1. A concise 1-2 sentence summary of what the company does
2. 3-6 bullet points about what they do, their products, and value proposition
3. 5-10 relevant keywords/tags
4. 2-4 derived signals that would be interesting to a VC investor (e.g. "Careers page exists" if you see job listings, "Recent blog post" if there's recent content, "Pricing page present" if you see pricing, "SOC 2 / security compliance" if mentioned, "Open source" if applicable, "Enterprise focus" if targeting enterprise)`,
        },
      ],
    })

    if (!output) {
      return Response.json({ error: "Failed to extract structured data from content" }, { status: 500 })
    }

    return Response.json({
      ...output,
      sources: [
        {
          url: sourceUrl,
          title: pageTitle || sourceUrl,
        },
      ],
      enrichedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Enrich API error:", error)
    return Response.json(
      { error: error instanceof Error ? error.message : "An unexpected error occurred" },
      { status: 500 }
    )
  }
}
