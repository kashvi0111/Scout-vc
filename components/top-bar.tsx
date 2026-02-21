"use client"

import { Search } from "lucide-react"

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b border-[rgba(255,255,255,0.08)] bg-[rgba(5,11,24,0.7)] px-6 backdrop-blur-2xl">
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search companies, sectors, signals..."
          className="h-10 w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground backdrop-blur-xl transition-all focus:border-[rgba(99,102,241,0.5)] focus:outline-none focus:ring-1 focus:ring-[rgba(99,102,241,0.3)] focus:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
        />
      </div>
    </header>
  )
}
