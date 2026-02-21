"use client"

import { cn } from "@/lib/utils"

interface SignalScoreRingProps {
  score: number
  size?: number
  strokeWidth?: number
  className?: string
}

export function SignalScoreRing({ score, size = 48, strokeWidth = 3, className }: SignalScoreRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const getColor = (s: number) => {
    if (s >= 80) return "#22C55E"
    if (s >= 60) return "#6366F1"
    if (s >= 40) return "#EAB308"
    return "#EF4444"
  }

  const color = getColor(score)

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 6px ${color}60)`,
            transition: "stroke-dashoffset 1s ease-out",
          }}
        />
      </svg>
      <span
        className="absolute text-xs font-bold"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  )
}
