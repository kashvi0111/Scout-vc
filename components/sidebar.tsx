"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, List, Bookmark, Search } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/companies", label: "Companies", icon: Building2 },
  { href: "/lists", label: "Lists", icon: List },
  { href: "/saved", label: "Saved Searches", icon: Bookmark },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-[rgba(255,255,255,0.08)] bg-[rgba(10,15,30,0.6)] backdrop-blur-2xl">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-sm font-bold text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]">
          S
        </div>
        <span className="text-lg font-bold tracking-tight text-foreground">Scout</span>
      </div>

      {/* Navigation */}
      <nav className="mt-2 flex flex-1 flex-col gap-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-[rgba(99,102,241,0.15)] text-[#C7D2FE] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                  : "text-muted-foreground hover:bg-[rgba(255,255,255,0.05)] hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "h-4.5 w-4.5 transition-colors",
                isActive ? "text-[#818CF8]" : "text-muted-foreground group-hover:text-foreground"
              )} />
              {item.label}
              {isActive && (
                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-[#6366F1] shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* User avatar */}
      <div className="border-t border-[rgba(255,255,255,0.08)] px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-xs font-bold text-white">
            VC
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">Scout User</span>
            <span className="text-xs text-muted-foreground">Analyst</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
