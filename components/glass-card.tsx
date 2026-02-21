"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  className?: string
  hover3d?: boolean
}

export function GlassCard({ children, className, hover3d = false, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] backdrop-blur-xl",
        "shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]",
        "transition-all duration-300",
        hover3d && "hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(99,102,241,0.15),inset_0_1px_0_rgba(255,255,255,0.08)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
