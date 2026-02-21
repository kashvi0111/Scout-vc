"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  X,
  Trash2,
  RefreshCw,
  Bookmark,
  Clock,
  Search,
  Zap,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { GlassCard } from "@/components/glass-card"

interface SavedSearch {
  id: string
  name: string
  filters: {
    sectors: string[]
    stages: string[]
    scoreMin: number
    scoreMax: number
    query: string
  }
  createdAt: string
  lastRun: string | null
}

export default function SavedSearchesPage() {
  const router = useRouter()
  const [searches, setSearches] = useState<SavedSearch[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState("")
  const [newSectors, setNewSectors] = useState<string[]>([])
  const [newStages, setNewStages] = useState<string[]>([])
  const [newScoreMin, setNewScoreMin] = useState(0)
  const [newScoreMax, setNewScoreMax] = useState(100)
  const [newQuery, setNewQuery] = useState("")
  const [runningId, setRunningId] = useState<string | null>(null)

  const allSectors = ["AI", "Fintech", "Healthcare", "SaaS"]
  const allStages = ["Pre-seed", "Seed", "Series A"]

  useEffect(() => {
    const stored = localStorage.getItem("scout-saved-searches")
    if (stored) {
      setSearches(JSON.parse(stored))
    } else {
      const seed: SavedSearch[] = [
        {
          id: "ss-1",
          name: "High-Signal AI Companies",
          filters: { sectors: ["AI"], stages: [], scoreMin: 70, scoreMax: 100, query: "" },
          createdAt: "2025-10-01T00:00:00Z",
          lastRun: "2025-10-15T00:00:00Z",
        },
        {
          id: "ss-2",
          name: "Seed-Stage Fintech",
          filters: { sectors: ["Fintech"], stages: ["Seed"], scoreMin: 0, scoreMax: 100, query: "" },
          createdAt: "2025-09-20T00:00:00Z",
          lastRun: null,
        },
        {
          id: "ss-3",
          name: "Healthcare Series A",
          filters: { sectors: ["Healthcare"], stages: ["Series A"], scoreMin: 60, scoreMax: 100, query: "" },
          createdAt: "2025-09-10T00:00:00Z",
          lastRun: "2025-10-10T00:00:00Z",
        },
      ]
      setSearches(seed)
      localStorage.setItem("scout-saved-searches", JSON.stringify(seed))
    }
  }, [])

  const saveSearches = (updated: SavedSearch[]) => {
    setSearches(updated)
    localStorage.setItem("scout-saved-searches", JSON.stringify(updated))
  }

  const createSearch = () => {
    if (!newName.trim()) return
    const newSearch: SavedSearch = {
      id: `ss-${Date.now()}`,
      name: newName.trim(),
      filters: {
        sectors: newSectors,
        stages: newStages,
        scoreMin: newScoreMin,
        scoreMax: newScoreMax,
        query: newQuery,
      },
      createdAt: new Date().toISOString(),
      lastRun: null,
    }
    saveSearches([...searches, newSearch])
    setNewName("")
    setNewSectors([])
    setNewStages([])
    setNewScoreMin(0)
    setNewScoreMax(100)
    setNewQuery("")
    setShowCreate(false)
  }

  const deleteSearch = (id: string) => {
    saveSearches(searches.filter((s) => s.id !== id))
  }

  const rerunSearch = (search: SavedSearch) => {
    setRunningId(search.id)
    // Update lastRun
    saveSearches(
      searches.map((s) => (s.id === search.id ? { ...s, lastRun: new Date().toISOString() } : s))
    )
    // Simulate running then redirect
    setTimeout(() => {
      setRunningId(null)
      router.push("/companies")
    }, 1200)
  }

  const toggleFilter = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Saved Searches</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Re-run your favorite search queries to find new matches.
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 rounded-xl border border-[rgba(99,102,241,0.5)] bg-[rgba(99,102,241,0.1)] px-4 py-2.5 text-sm font-medium text-[#C7D2FE] transition-all hover:bg-[rgba(99,102,241,0.2)] hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
        >
          <Plus className="h-4 w-4" />
          Save Search
        </button>
      </div>

      {/* Create search form */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <GlassCard className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Create Saved Search</h3>
                <button onClick={() => setShowCreate(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Search name..."
                className="w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[rgba(99,102,241,0.5)] focus:outline-none"
              />

              <input
                type="text"
                value={newQuery}
                onChange={(e) => setNewQuery(e.target.value)}
                placeholder="Search query (optional)..."
                className="w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[rgba(99,102,241,0.5)] focus:outline-none"
              />

              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Sectors</span>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {allSectors.map((s) => (
                    <button
                      key={s}
                      onClick={() => setNewSectors(toggleFilter(newSectors, s))}
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                        newSectors.includes(s)
                          ? "border-[rgba(99,102,241,0.5)] bg-[rgba(99,102,241,0.15)] text-[#C7D2FE]"
                          : "border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] text-muted-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Stages</span>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {allStages.map((s) => (
                    <button
                      key={s}
                      onClick={() => setNewStages(toggleFilter(newStages, s))}
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                        newStages.includes(s)
                          ? "border-[rgba(139,92,246,0.5)] bg-[rgba(139,92,246,0.15)] text-[#D8B4FE]"
                          : "border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] text-muted-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Score</span>
                <span className="text-xs text-muted-foreground">{newScoreMin}</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={newScoreMin}
                  onChange={(e) => setNewScoreMin(Number(e.target.value))}
                  className="h-1 w-24 cursor-pointer appearance-none rounded-full bg-[rgba(255,255,255,0.1)] accent-[#6366F1]"
                />
                <span className="text-xs text-muted-foreground">to</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={newScoreMax}
                  onChange={(e) => setNewScoreMax(Number(e.target.value))}
                  className="h-1 w-24 cursor-pointer appearance-none rounded-full bg-[rgba(255,255,255,0.1)] accent-[#6366F1]"
                />
                <span className="text-xs text-muted-foreground">{newScoreMax}</span>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={createSearch}
                  className="rounded-lg bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                >
                  Save Search
                </button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Saved search cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {searches.map((search, i) => (
          <motion.div
            key={search.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard className="group p-5 transition-all hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(99,102,241,0.12)]">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)]">
                    <Search className="h-5 w-5 text-[#A78BFA]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{search.name}</h3>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Saved {new Date(search.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteSearch(search.id)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-all group-hover:opacity-100 hover:bg-[rgba(239,68,68,0.1)] hover:text-[#F87171]"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Filter chips */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {search.filters.sectors.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-[rgba(99,102,241,0.3)] bg-[rgba(99,102,241,0.1)] px-2 py-0.5 text-[10px] font-medium text-[#C7D2FE] shadow-[0_0_6px_rgba(99,102,241,0.1)]"
                  >
                    {s}
                  </span>
                ))}
                {search.filters.stages.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-[rgba(139,92,246,0.3)] bg-[rgba(139,92,246,0.1)] px-2 py-0.5 text-[10px] font-medium text-[#D8B4FE] shadow-[0_0_6px_rgba(139,92,246,0.1)]"
                  >
                    {s}
                  </span>
                ))}
                {(search.filters.scoreMin > 0 || search.filters.scoreMax < 100) && (
                  <span className="rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    Score: {search.filters.scoreMin}-{search.filters.scoreMax}
                  </span>
                )}
                {search.filters.query && (
                  <span className="rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {`"${search.filters.query}"`}
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between">
                {search.lastRun ? (
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Zap className="h-3 w-3" />
                    Last run {new Date(search.lastRun).toLocaleDateString()}
                  </span>
                ) : (
                  <span className="text-[10px] text-muted-foreground">Never run</span>
                )}

                <button
                  onClick={() => rerunSearch(search)}
                  disabled={runningId === search.id}
                  className={`neon-pulse flex items-center gap-1.5 rounded-lg border border-[rgba(139,92,246,0.5)] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-3 py-1.5 text-xs font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:opacity-70 ${
                    runningId === search.id ? "animate-pulse" : ""
                  }`}
                >
                  <RefreshCw className={`h-3 w-3 ${runningId === search.id ? "animate-spin" : ""}`} />
                  {runningId === search.id ? "Running..." : "Re-run"}
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}

        {searches.length === 0 && (
          <div className="col-span-2 py-16 text-center">
            <Bookmark className="mx-auto h-10 w-10 text-muted-foreground/30" />
            <p className="mt-3 text-sm text-muted-foreground">No saved searches yet. Create one to get started.</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
