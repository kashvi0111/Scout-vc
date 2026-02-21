"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Globe,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Zap,
  Bookmark,
  Sparkles,
  Clock,
  TrendingUp,
  Handshake,
  UserPlus,
  Package,
  Target,
} from "lucide-react"
import Link from "next/link"
import { useTilt } from "@/hooks/use-tilt"
import { SignalScoreRing } from "@/components/signal-score-ring"
import { GlassCard } from "@/components/glass-card"
import { EnrichmentResults, type EnrichmentData } from "@/components/companies/enrichment-results"
import type { Company } from "@/lib/mock-data"

const tabs = ["Overview", "Signals", "Notes"] as const
type Tab = (typeof tabs)[number]

const signalIconMap: Record<string, React.ElementType> = {
  Funding: DollarSign,
  Hiring: UserPlus,
  Product: Package,
  Partnership: Handshake,
  Traction: TrendingUp,
  Team: Users,
}

export function CompanyProfile({ company }: { company: Company }) {
  const [activeTab, setActiveTab] = useState<Tab>("Overview")
  const [notes, setNotes] = useState("")
  const [enrichment, setEnrichment] = useState<EnrichmentData | null>(null)
  const [enriching, setEnriching] = useState(false)
  const [enrichError, setEnrichError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const { ref: heroRef, style: heroStyle, handleMouseMove: heroMouseMove, handleMouseLeave: heroMouseLeave } = useTilt(5)

  const cacheKey = `enrich:${company.website}`

  // Load cached enrichment from localStorage on mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        setEnrichment(JSON.parse(cached))
      }
    } catch {
      // Ignore parse errors
    }
  }, [cacheKey])

  const handleEnrich = useCallback(async () => {
    // Check localStorage cache first
    try {
      const cached = localStorage.getItem(cacheKey)
      if (cached) {
        setEnrichment(JSON.parse(cached))
        return
      }
    } catch {
      // Ignore and proceed to fetch
    }

    setEnriching(true)
    setEnrichError(null)

    try {
      const response = await fetch("/api/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: company.website }),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.error || `Request failed (${response.status})`)
      }

      const data: EnrichmentData = await response.json()
      setEnrichment(data)

      // Cache in localStorage
      try {
        localStorage.setItem(cacheKey, JSON.stringify(data))
      } catch {
        // Storage full — ignore
      }
    } catch (err) {
      setEnrichError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setEnriching(false)
    }
  }, [cacheKey, company.website])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Back nav */}
      <Link
        href="/companies"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Companies
      </Link>

      <div className="flex gap-6">
        {/* Main content */}
        <div className="flex-1 space-y-6">
          {/* Hero */}
          <div
            ref={heroRef}
            style={heroStyle}
            onMouseMove={heroMouseMove}
            onMouseLeave={heroMouseLeave}
          >
            <GlassCard className="p-6">
              <div className="flex items-start gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/20 text-2xl font-bold text-[#818CF8] border border-[rgba(99,102,241,0.3)] shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                  {company.logo}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">{company.name}</h1>
                    <SignalScoreRing score={company.signalScore} size={44} strokeWidth={3} />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{company.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(99,102,241,0.3)] bg-[rgba(99,102,241,0.1)] px-2.5 py-1 text-xs font-medium text-[#C7D2FE]">
                      {company.sector}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(139,92,246,0.3)] bg-[rgba(139,92,246,0.1)] px-2.5 py-1 text-xs font-medium text-[#D8B4FE]">
                      {company.stage}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {company.location}
                    </span>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Globe className="h-3 w-3" />
                      Website
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-[rgba(99,102,241,0.15)] text-[#C7D2FE] shadow-[0_0_12px_rgba(99,102,241,0.1)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "Overview" && (
                <div className="space-y-4">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { label: "Total Funding", value: company.fundingTotal, icon: DollarSign },
                      { label: "Last Round", value: company.lastRound, icon: TrendingUp },
                      { label: "Founded", value: company.foundedYear.toString(), icon: Calendar },
                      { label: "Employees", value: company.employees, icon: Users },
                    ].map((metric) => (
                      <GlassCard key={metric.label} className="p-4" hover3d>
                        <div className="flex items-center gap-2">
                          <metric.icon className="h-4 w-4 text-[#818CF8]" />
                          <span className="text-xs text-muted-foreground">{metric.label}</span>
                        </div>
                        <p className="mt-2 text-lg font-bold text-foreground">{metric.value}</p>
                      </GlassCard>
                    ))}
                  </div>

                  {/* Description */}
                  <GlassCard className="p-5">
                    <h3 className="text-sm font-semibold text-foreground">About</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{company.description}</p>
                  </GlassCard>

                  {/* Investors */}
                  <GlassCard className="p-5">
                    <h3 className="text-sm font-semibold text-foreground">Investors</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {company.investors.map((inv) => (
                        <span
                          key={inv}
                          className="inline-flex rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-3 py-1.5 text-xs font-medium text-muted-foreground"
                        >
                          {inv}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              )}

              {activeTab === "Signals" && (
                <div className="relative space-y-0">
                  {/* Timeline line */}
                  <div className="absolute left-[23px] top-2 bottom-2 w-px bg-gradient-to-b from-[#6366F1]/40 via-[#8B5CF6]/20 to-transparent" />

                  {company.signals.map((signal, i) => {
                    const Icon = signalIconMap[signal.type] || Zap
                    return (
                      <motion.div
                        key={signal.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative flex gap-4 py-4"
                      >
                        <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[rgba(99,102,241,0.3)] bg-[rgba(99,102,241,0.1)] shadow-[0_0_12px_rgba(99,102,241,0.1)]">
                          <Icon className="h-5 w-5 text-[#818CF8]" />
                        </div>
                        <GlassCard className="flex-1 p-4" hover3d>
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="inline-flex rounded-full border border-[rgba(99,102,241,0.3)] bg-[rgba(99,102,241,0.1)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#818CF8]">
                                {signal.type}
                              </span>
                              <p className="mt-2 text-sm text-foreground">{signal.description}</p>
                            </div>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {new Date(signal.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </GlassCard>
                      </motion.div>
                    )
                  })}
                </div>
              )}

              {activeTab === "Notes" && (
                <GlassCard className="p-5">
                  <h3 className="text-sm font-semibold text-foreground">Your Notes</h3>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add your notes about this company..."
                    className="mt-3 h-40 w-full resize-none rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] p-3 text-sm text-foreground placeholder:text-muted-foreground backdrop-blur-xl focus:border-[rgba(99,102,241,0.5)] focus:outline-none focus:ring-1 focus:ring-[rgba(99,102,241,0.3)]"
                  />
                  <div className="mt-3 flex justify-end">
                    <button className="rounded-lg bg-[rgba(99,102,241,0.15)] px-4 py-2 text-sm font-medium text-[#C7D2FE] border border-[rgba(99,102,241,0.3)] transition-all hover:bg-[rgba(99,102,241,0.25)]">
                      Save Notes
                    </button>
                  </div>
                </GlassCard>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right panel */}
        <div className="w-72 shrink-0 space-y-4">
          {/* Save to List */}
          <button
            onClick={() => setSaved(!saved)}
            className={`flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
              saved
                ? "border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.1)] text-[#4ADE80]"
                : "border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] text-foreground hover:border-[rgba(255,255,255,0.2)]"
            }`}
          >
            <Bookmark className="h-4 w-4" />
            {saved ? "Saved to List" : "Save to List"}
          </button>

          {/* Enrich button */}
          <button
            onClick={handleEnrich}
            disabled={enriching}
            className={`neon-pulse flex w-full items-center justify-center gap-2 rounded-xl border border-[rgba(139,92,246,0.5)] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-4 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] disabled:opacity-70 ${
              enriching ? "animate-pulse" : ""
            }`}
          >
            <Sparkles className="h-4 w-4" />
            {enriching ? "Enriching..." : enrichment ? "Re-enrich" : "Enrich Company"}
          </button>

          {/* Enrichment results */}
          <AnimatePresence>
            {(enriching || enrichment || enrichError) && (
              <EnrichmentResults data={enrichment} loading={enriching} error={enrichError} />
            )}
          </AnimatePresence>

          {/* Thesis Match Card */}
          <GlassCard className="p-5">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-[#8B5CF6]" />
              <h3 className="text-sm font-semibold text-foreground">Thesis Match</h3>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <SignalScoreRing score={company.signalScore} size={56} strokeWidth={3.5} />
              <div>
                <p className="text-lg font-bold text-foreground">{company.signalScore}/100</p>
                <p className="text-xs text-muted-foreground">Match score</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Market Timing</span>
                <span className="text-foreground font-medium">Strong</span>
              </div>
              <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]" style={{ width: "85%" }} />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Team Quality</span>
                <span className="text-foreground font-medium">High</span>
              </div>
              <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]" style={{ width: "78%" }} />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Product Signal</span>
                <span className="text-foreground font-medium">Very High</span>
              </div>
              <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]" style={{ width: "92%" }} />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Traction</span>
                <span className="text-foreground font-medium">Moderate</span>
              </div>
              <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]" style={{ width: "65%" }} />
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  )
}
