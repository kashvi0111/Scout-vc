"use client"

import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { AnimatedOrbs } from "@/components/animated-orbs"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background">
      <AnimatedOrbs />
      <Sidebar />
      <div className="ml-64">
        <TopBar />
        <main className="relative p-6">{children}</main>
      </div>
    </div>
  )
}
