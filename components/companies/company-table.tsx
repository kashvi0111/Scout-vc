"use client"

import { useRouter } from "next/navigation"
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { SignalScoreRing } from "@/components/signal-score-ring"
import type { Company } from "@/lib/mock-data"

type SortKey = "name" | "sector" | "stage" | "location" | "foundedYear" | "signalScore"
type SortDir = "asc" | "desc"

interface CompanyTableProps {
  companies: Company[]
}

const PAGE_SIZE = 6

export function CompanyTable({ companies }: CompanyTableProps) {
  const router = useRouter()
  const [sortKey, setSortKey] = useState<SortKey>("signalScore")
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  const [page, setPage] = useState(0)

  const sorted = useMemo(() => {
    return [...companies].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }
      return sortDir === "asc" ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number)
    })
  }, [companies, sortKey, sortDir])

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
  const paginated = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDir("desc")
    }
  }

  const getBadgeColor = (score: number) => {
    if (score >= 80) return "bg-[rgba(34,197,94,0.15)] text-[#4ADE80] border-[rgba(34,197,94,0.3)]"
    if (score >= 60) return "bg-[rgba(99,102,241,0.15)] text-[#818CF8] border-[rgba(99,102,241,0.3)]"
    if (score >= 40) return "bg-[rgba(234,179,8,0.15)] text-[#FACC15] border-[rgba(234,179,8,0.3)]"
    return "bg-[rgba(239,68,68,0.15)] text-[#F87171] border-[rgba(239,68,68,0.3)]"
  }

  const columns: { key: SortKey; label: string; className?: string }[] = [
    { key: "name", label: "Company", className: "w-[240px]" },
    { key: "sector", label: "Sector" },
    { key: "stage", label: "Stage" },
    { key: "location", label: "Location" },
    { key: "foundedYear", label: "Founded" },
    { key: "signalScore", label: "Signal Score", className: "text-right" },
  ]

  return (
    <div className="overflow-hidden rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] backdrop-blur-xl">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[rgba(255,255,255,0.08)]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "cursor-pointer px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider transition-colors hover:text-foreground",
                  col.className
                )}
                onClick={() => toggleSort(col.key)}
              >
                <div className={cn("flex items-center gap-1.5", col.key === "signalScore" && "justify-end")}>
                  {col.label}
                  <ArrowUpDown className={cn(
                    "h-3 w-3 transition-colors",
                    sortKey === col.key ? "text-[#818CF8]" : "text-muted-foreground/50"
                  )} />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginated.map((company) => (
            <tr
              key={company.id}
              onClick={() => router.push(`/companies/${company.id}`)}
              className="group cursor-pointer border-b border-[rgba(255,255,255,0.05)] transition-all duration-200 hover:bg-[rgba(99,102,241,0.06)] hover:shadow-[inset_0_0_30px_rgba(99,102,241,0.04)]"
            >
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/20 text-sm font-bold text-[#818CF8] border border-[rgba(99,102,241,0.2)]">
                    {company.logo}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground group-hover:text-[#C7D2FE] transition-colors">{company.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1 max-w-[180px]">{company.description}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <span className="inline-flex rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  {company.sector}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className="text-sm text-foreground">{company.stage}</span>
              </td>
              <td className="px-4 py-4">
                <span className="text-sm text-muted-foreground">{company.location}</span>
              </td>
              <td className="px-4 py-4">
                <span className="text-sm text-muted-foreground">{company.foundedYear}</span>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center justify-end gap-2">
                  <SignalScoreRing score={company.signalScore} size={36} strokeWidth={2.5} />
                </div>
              </td>
            </tr>
          ))}
          {paginated.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-12 text-center text-sm text-muted-foreground">
                No companies match your filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.08)] px-4 py-3">
          <span className="text-xs text-muted-foreground">
            Showing {page * PAGE_SIZE + 1}-{Math.min((page + 1) * PAGE_SIZE, sorted.length)} of {sorted.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-all",
                  page === i
                    ? "border border-[rgba(99,102,241,0.5)] bg-[rgba(99,102,241,0.15)] text-[#C7D2FE]"
                    : "border border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page === totalPages - 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
