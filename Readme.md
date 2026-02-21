# Scout — VC Intelligence Dashboard

A premium venture capital intelligence platform for discovering, enriching, and tracking startups. Built as a Harmonic-style workflow tool with live AI-powered enrichment.

---

## What It Does

Scout helps VC analysts discover and evaluate startups through a fast, clean interface:

- **Discover** — Search and filter companies by sector, stage, and location
- **Profile** — View detailed company profiles with funding info, signals timeline, and key metrics
- **Enrich** — Click "Enrich" on any company to pull real live data from their public website using AI
- **Organize** — Save companies to custom lists and export as CSV or JSON
- **Save Searches** — Save and re-run filtered searches anytime

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui + Radix UI
- **Animations:** Framer Motion
- **Enrichment:** Firecrawl API (web scraping) + AI extraction
- **Deployment:** Vercel

---

## Pages

| Route | Description |
|---|---|
| `/companies` | Search, filter, and browse startup companies |
| `/companies/[id]` | Company profile with enrichment, signals, and notes |
| `/lists` | Create and manage saved company lists |
| `/saved` | Save and re-run searches |

---

## Live Enrichment

On any company profile, click the **"Enrich"** button to:

1. Scrape the company's public website via Firecrawl
2. Extract a 1-2 sentence summary
3. Generate 3-6 bullets on what they do
4. Identify 5-10 keywords
5. Derive 2-4 investor signals (e.g. careers page exists, recent blog post)
6. Show exact source URLs with timestamp

Results are cached in localStorage so the same URL is never fetched twice.

> The enrichment API route runs server-side — API keys are never exposed to the browser.

---

## Environment Variables

Create a `.env.local` file in the root of the project:

```
FIRECRAWL_API_KEY=your_firecrawl_api_key_here
```

Get your free API key at [firecrawl.dev](https://firecrawl.dev) — free tier includes 500 credits.

---

## Running Locally

**Prerequisites:** Node.js 18+ and pnpm installed

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/scout-vc.git
cd scout-vc

# 2. Install dependencies
pnpm install

# 3. Add environment variables
cp .env.example .env.local
# Then add your FIRECRAWL_API_KEY to .env.local

# 4. Run the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deploying to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**
3. Import your GitHub repository
4. Under **Environment Variables**, add:
   - `FIRECRAWL_API_KEY` = your Firecrawl API key
5. Click **Deploy**

Vercel auto-detects Next.js — no extra configuration needed.

---

## Project Structure

```
scout/
├── app/
│   ├── (dashboard)/
│   │   ├── companies/
│   │   │   ├── [id]/page.tsx     # Company profile page
│   │   │   └── page.tsx          # Companies list page
│   │   ├── lists/page.tsx        # Lists management page
│   │   ├── saved/page.tsx        # Saved searches page
│   │   └── layout.tsx            # Dashboard layout with sidebar
│   ├── api/
│   │   └── enrich/route.ts       # Server-side enrichment API
│   └── layout.tsx                # Root layout
├── components/
│   ├── companies/                # Company-related components
│   ├── ui/                       # shadcn/ui components
│   └── sidebar.tsx               # Navigation sidebar
├── lib/
│   └── mock-data.ts              # Seed data (10 startups)
└── hooks/                        # Custom React hooks
```

---

## Design References

Interface patterns inspired by:
- **Harmonic.ai** — workflow and navigation structure
- **Cardinal** — thesis-driven scoring and signals
- **PitchBook / Crunchbase** — company profile layout
- **Affinity** — lists and relationship management
- **Dealroom** — signals timeline
