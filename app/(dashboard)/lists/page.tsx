"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  X,
  Trash2,
  Download,
  List,
  Clock,
  Building2,
} from "lucide-react"
import { GlassCard } from "@/components/glass-card"
import { companies } from "@/lib/mock-data"

interface SavedList {
  id: string
  name: string
  companyIds: string[]
  updatedAt: string
}

export default function ListsPage() {
  const [lists, setLists] = useState<SavedList[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState("")
  const [openListId, setOpenListId] = useState<string | null>(null)

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("scout-lists")
    if (stored) {
      setLists(JSON.parse(stored))
    } else {
      // seed with an example list
      const seed: SavedList[] = [
        {
          id: "list-1",
          name: "Top AI Picks",
          companyIds: ["1", "6", "10"],
          updatedAt: new Date().toISOString(),
        },
        {
          id: "list-2",
          name: "Healthcare Pipeline",
          companyIds: ["3", "5", "9"],
          updatedAt: new Date().toISOString(),
        },
      ]
      setLists(seed)
      localStorage.setItem("scout-lists", JSON.stringify(seed))
    }
  }, [])

  const saveLists = (updated: SavedList[]) => {
    setLists(updated)
    localStorage.setItem("scout-lists", JSON.stringify(updated))
  }

  const createList = () => {
    if (!newName.trim()) return
    const newList: SavedList = {
      id: `list-${Date.now()}`,
      name: newName.trim(),
      companyIds: [],
      updatedAt: new Date().toISOString(),
    }
    saveLists([...lists, newList])
    setNewName("")
    setShowCreate(false)
  }

  const deleteList = (id: string) => {
    saveLists(lists.filter((l) => l.id !== id))
    if (openListId === id) setOpenListId(null)
  }

  const removeFromList = (listId: string, companyId: string) => {
    saveLists(
      lists.map((l) =>
        l.id === listId
          ? { ...l, companyIds: l.companyIds.filter((c) => c !== companyId), updatedAt: new Date().toISOString() }
          : l
      )
    )
  }

  const exportList = (list: SavedList, format: "csv" | "json") => {
    const listCompanies = companies.filter((c) => list.companyIds.includes(c.id))
    let content: string
    let mime: string
    let ext: string

    if (format === "json") {
      content = JSON.stringify(listCompanies, null, 2)
      mime = "application/json"
      ext = "json"
    } else {
      const headers = "Name,Sector,Stage,Location,Founded,Signal Score,Website"
      const rows = listCompanies.map(
        (c) => `"${c.name}","${c.sector}","${c.stage}","${c.location}",${c.foundedYear},${c.signalScore},"${c.website}"`
      )
      content = [headers, ...rows].join("\n")
      mime = "text/csv"
      ext = "csv"
    }

    const blob = new Blob([content], { type: mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${list.name.toLowerCase().replace(/\s+/g, "-")}.${ext}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const openList = lists.find((l) => l.id === openListId)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Lists</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Organize companies into curated lists for tracking and outreach.
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 rounded-xl border border-[rgba(99,102,241,0.5)] bg-[rgba(99,102,241,0.1)] px-4 py-2.5 text-sm font-medium text-[#C7D2FE] transition-all hover:bg-[rgba(99,102,241,0.2)] hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
        >
          <Plus className="h-4 w-4" />
          New List
        </button>
      </div>

      {/* Create list modal */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <GlassCard className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Create New List</h3>
                <button onClick={() => setShowCreate(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 flex gap-3">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && createList()}
                  placeholder="Enter list name..."
                  className="flex-1 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[rgba(99,102,241,0.5)] focus:outline-none focus:ring-1 focus:ring-[rgba(99,102,241,0.3)]"
                  autoFocus
                />
                <button
                  onClick={createList}
                  className="rounded-lg bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                >
                  Create
                </button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List cards OR open list detail */}
      {openListId && openList ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <button
            onClick={() => setOpenListId(null)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {"<-"} Back to all lists
          </button>
          <GlassCard className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">{openList.name}</h2>
                <p className="text-xs text-muted-foreground">{openList.companyIds.length} companies</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => exportList(openList, "csv")}
                  className="flex items-center gap-1.5 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Download className="h-3 w-3" />
                  CSV
                </button>
                <button
                  onClick={() => exportList(openList, "json")}
                  className="flex items-center gap-1.5 rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Download className="h-3 w-3" />
                  JSON
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {openList.companyIds.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">No companies in this list yet.</p>
              ) : (
                openList.companyIds.map((cId) => {
                  const c = companies.find((co) => co.id === cId)
                  if (!c) return null
                  return (
                    <div
                      key={c.id}
                      className="flex items-center justify-between rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] px-4 py-3 transition-all hover:bg-[rgba(99,102,241,0.05)]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/20 text-xs font-bold text-[#818CF8] border border-[rgba(99,102,241,0.2)]">
                          {c.logo}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{c.name}</p>
                          <p className="text-xs text-muted-foreground">{c.sector} / {c.stage}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromList(openList.id, c.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-[rgba(239,68,68,0.1)] hover:text-[#F87171]"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )
                })
              )}
            </div>
          </GlassCard>
        </motion.div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {lists.map((list, i) => (
            <motion.div
              key={list.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard
                className="group cursor-pointer p-5 transition-all hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(99,102,241,0.12)]"
                onClick={() => setOpenListId(list.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)]">
                    <List className="h-5 w-5 text-[#818CF8]" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteList(list.id)
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-all group-hover:opacity-100 hover:bg-[rgba(239,68,68,0.1)] hover:text-[#F87171]"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-foreground">{list.name}</h3>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {list.companyIds.length} companies
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(list.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}

          {lists.length === 0 && (
            <div className="col-span-3 py-16 text-center">
              <List className="mx-auto h-10 w-10 text-muted-foreground/30" />
              <p className="mt-3 text-sm text-muted-foreground">No lists yet. Create one to get started.</p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}
