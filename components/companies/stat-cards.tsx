"use client"

import { Building2, TrendingUp, Sparkles, Bookmark } from "lucide-react"
import { useTilt } from "@/hooks/use-tilt"
import { useCounter } from "@/hooks/use-counter"

interface StatCardProps {
  label: string
  value: number
  suffix?: string
  icon: React.ElementType
  gradient: string
}

function StatCard({ label, value, suffix = "", icon: Icon, gradient }: StatCardProps) {
  const { ref, style, handleMouseMove, handleMouseLeave } = useTilt(8)
  const count = useCounter(value)

  return (
    <div
      ref={ref}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-default overflow-hidden rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] p-5 backdrop-blur-xl transition-all duration-300 hover:border-[rgba(99,102,241,0.3)] hover:shadow-[0_16px_48px_rgba(99,102,241,0.12)]"
    >
      {/* Subtle inner glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${gradient}, transparent 70%)`,
        }}
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            {count}{suffix}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(99,102,241,0.12)]">
          <Icon className="h-5 w-5 text-[#818CF8]" />
        </div>
      </div>
    </div>
  )
}

export function StatCards() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard label="Total Companies" value={10} icon={Building2} gradient="rgba(99,102,241,0.08)" />
      <StatCard label="Avg Signal Score" value={77} icon={TrendingUp} gradient="rgba(139,92,246,0.08)" />
      <StatCard label="New This Week" value={3} icon={Sparkles} gradient="rgba(99,102,241,0.08)" />
      <StatCard label="Saved" value={0} icon={Bookmark} gradient="rgba(139,92,246,0.08)" />
    </div>
  )
}
