"use client"

import { motion } from "framer-motion"
import {
  Sparkles,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Loader2,
} from "lucide-react"
import { GlassCard } from "@/components/glass-card"

export interface EnrichmentData {
  summary: string
  bullets: string[]
  keywords: string[]
  signals: { label: string; positive: boolean }[]
  sources: { url: string; title: string }[]
  enrichedAt: string
}

interface EnrichmentResultsProps {
  data: EnrichmentData | null
  loading: boolean
  error: string | null
}

export function EnrichmentResults({ data, loading, error }: EnrichmentResultsProps) {
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <GlassCard className="space-y-4 p-5">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-[#8B5CF6]" />
            <h3 className="text-sm font-semibold text-foreground">Enriching...</h3>
          </div>

          {/* Skeleton loaders */}
          <div className="space-y-3">
            <div>
              <div className="h-3 w-16 rounded shimmer" />
              <div className="mt-2 h-3 w-full rounded shimmer" />
              <div className="mt-1 h-3 w-3/4 rounded shimmer" />
            </div>
            <div>
              <div className="h-3 w-24 rounded shimmer" />
              <div className="mt-2 space-y-1.5">
                <div className="h-3 w-full rounded shimmer" />
                <div className="h-3 w-5/6 rounded shimmer" />
                <div className="h-3 w-4/6 rounded shimmer" />
              </div>
            </div>
            <div>
              <div className="h-3 w-20 rounded shimmer" />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-5 w-16 rounded-full shimmer" />
                ))}
              </div>
            </div>
            <div>
              <div className="h-3 w-16 rounded shimmer" />
              <div className="mt-2 space-y-1.5">
                <div className="h-3 w-40 rounded shimmer" />
                <div className="h-3 w-36 rounded shimmer" />
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <GlassCard className="p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#EF4444]" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">Enrichment Failed</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{error}</p>
              <p className="mt-2 text-[10px] text-muted-foreground">
                Try again or check that the company URL is accessible.
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    )
  }

  if (!data) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="space-y-4 p-5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#8B5CF6]" />
          <h3 className="text-sm font-semibold text-foreground">Enrichment Results</h3>
        </div>

        {/* Summary */}
        <div>
          <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Summary
          </h4>
          <p className="mt-1 text-xs leading-relaxed text-foreground">{data.summary}</p>
        </div>

        {/* Bullets */}
        <div>
          <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            What they do
          </h4>
          <ul className="mt-1.5 space-y-1">
            {data.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-foreground">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#818CF8]" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        {/* Keywords */}
        <div>
          <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Keywords
          </h4>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {data.keywords.map((kw) => (
              <span
                key={kw}
                className="rounded-full border border-[rgba(139,92,246,0.3)] bg-[rgba(139,92,246,0.1)] px-2 py-0.5 text-[10px] font-medium text-[#D8B4FE] shadow-[0_0_8px_rgba(139,92,246,0.1)]"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Signals */}
        <div>
          <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Derived Signals
          </h4>
          <div className="mt-1.5 space-y-1.5">
            {data.signals.map((signal, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                {signal.positive ? (
                  <CheckCircle className="h-3.5 w-3.5 shrink-0 text-[#4ADE80]" />
                ) : (
                  <XCircle className="h-3.5 w-3.5 shrink-0 text-[#F87171]" />
                )}
                <span className="text-foreground">{signal.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sources */}
        <div>
          <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Sources
          </h4>
          <div className="mt-1.5 space-y-1">
            {data.sources.map((source, i) => (
              <a
                key={i}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-[#818CF8] transition-colors hover:text-[#A5B4FC] hover:underline"
              >
                <ExternalLink className="h-3 w-3 shrink-0" />
                <span className="truncate">{source.title}</span>
              </a>
            ))}
            <span className="text-[10px] text-muted-foreground">
              Enriched: {new Date(data.enrichedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}
