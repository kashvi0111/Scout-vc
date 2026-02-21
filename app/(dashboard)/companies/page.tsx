"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { StatCards } from "@/components/companies/stat-cards"
import { CompanyFilters } from "@/components/companies/company-filters"
import { CompanyTable } from "@/components/companies/company-table"
import { companies } from "@/lib/mock-data"

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSectors, setSelectedSectors] = useState<string[]>([])
  const [selectedStages, setSelectedStages] = useState<string[]>([])
  const [scoreRange, setScoreRange] = useState<[number, number]>([0, 100])

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      const matchesSearch =
        !searchQuery ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.sector.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesSector = selectedSectors.length === 0 || selectedSectors.includes(c.sector)
      const matchesStage = selectedStages.length === 0 || selectedStages.includes(c.stage)
      const matchesScore = c.signalScore >= scoreRange[0] && c.signalScore <= scoreRange[1]

      return matchesSearch && matchesSector && matchesStage && matchesScore
    })
  }, [searchQuery, selectedSectors, selectedStages, scoreRange])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Companies</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Discover and track high-signal startups across your investment thesis.
        </p>
      </div>

      <StatCards />

      <CompanyFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedSectors={selectedSectors}
        onSectorsChange={setSelectedSectors}
        selectedStages={selectedStages}
        onStagesChange={setSelectedStages}
        scoreRange={scoreRange}
        onScoreRangeChange={setScoreRange}
      />

      <CompanyTable companies={filtered} />
    </motion.div>
  )
}
