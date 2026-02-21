"use client"

import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { sectors, stages } from "@/lib/mock-data"

interface CompanyFiltersProps {
  searchQuery: string
  onSearchChange: (val: string) => void
  selectedSectors: string[]
  onSectorsChange: (val: string[]) => void
  selectedStages: string[]
  onStagesChange: (val: string[]) => void
  scoreRange: [number, number]
  onScoreRangeChange: (val: [number, number]) => void
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200",
        active
          ? "border-[rgba(99,102,241,0.5)] bg-[rgba(99,102,241,0.15)] text-[#C7D2FE] shadow-[0_0_12px_rgba(99,102,241,0.15)]"
          : "border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] text-muted-foreground hover:border-[rgba(255,255,255,0.2)] hover:text-foreground"
      )}
    >
      {label}
      {active && <X className="h-3 w-3" />}
    </button>
  )
}

export function CompanyFilters({
  searchQuery,
  onSearchChange,
  selectedSectors,
  onSectorsChange,
  selectedStages,
  onStagesChange,
  scoreRange,
  onScoreRangeChange,
}: CompanyFiltersProps) {
  const toggleSector = (sector: string) => {
    onSectorsChange(
      selectedSectors.includes(sector)
        ? selectedSectors.filter((s) => s !== sector)
        : [...selectedSectors, sector]
    )
  }

  const toggleStage = (stage: string) => {
    onStagesChange(
      selectedStages.includes(stage)
        ? selectedStages.filter((s) => s !== stage)
        : [...selectedStages, stage]
    )
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, description, or sector..."
          className="h-11 w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground backdrop-blur-xl transition-all focus:border-[rgba(99,102,241,0.5)] focus:outline-none focus:ring-1 focus:ring-[rgba(99,102,241,0.3)]"
        />
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Stage</span>
        {stages.map((stage) => (
          <FilterChip
            key={stage}
            label={stage}
            active={selectedStages.includes(stage)}
            onClick={() => toggleStage(stage)}
          />
        ))}

        <div className="mx-2 h-5 w-px bg-[rgba(255,255,255,0.08)]" />

        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Sector</span>
        {sectors.map((sector) => (
          <FilterChip
            key={sector}
            label={sector}
            active={selectedSectors.includes(sector)}
            onClick={() => toggleSector(sector)}
          />
        ))}

        <div className="mx-2 h-5 w-px bg-[rgba(255,255,255,0.08)]" />

        {/* Signal Score Range */}
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Score</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{scoreRange[0]}</span>
          <input
            type="range"
            min={0}
            max={100}
            value={scoreRange[0]}
            onChange={(e) => onScoreRangeChange([Number(e.target.value), scoreRange[1]])}
            className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-[rgba(255,255,255,0.1)] accent-[#6366F1]"
          />
          <span className="text-xs text-muted-foreground">-</span>
          <input
            type="range"
            min={0}
            max={100}
            value={scoreRange[1]}
            onChange={(e) => onScoreRangeChange([scoreRange[0], Number(e.target.value)])}
            className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-[rgba(255,255,255,0.1)] accent-[#6366F1]"
          />
          <span className="text-xs text-muted-foreground">{scoreRange[1]}</span>
        </div>
      </div>
    </div>
  )
}
