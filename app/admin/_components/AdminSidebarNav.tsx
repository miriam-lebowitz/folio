"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Users,
  Settings,
  ArrowLeft,
  ChevronRight,
} from "lucide-react"

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/catalog", label: "Catalog", icon: BookOpen, exact: false },
  { href: "/admin/reports", label: "Reports", icon: BarChart2, exact: false },
  { href: "/admin/users", label: "Users", icon: Users, exact: false },
  { href: "/admin/settings", label: "Settings", icon: Settings, exact: false },
]

interface AdminSidebarNavProps {
  variant?: "sidebar" | "topbar"
}

export default function AdminSidebarNav({ variant = "sidebar" }: AdminSidebarNavProps) {
  const pathname = usePathname()

  const isActive = (item: (typeof NAV_ITEMS)[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href)

  if (variant === "topbar") {
    return (
      <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                active
                  ? "bg-amber-warm/20 text-amber-warm"
                  : "text-brown-light/70 hover:text-cream hover:bg-white/10"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    )
  }

  return (
    <nav className="flex flex-col gap-1 px-3">
      {NAV_ITEMS.map((item) => {
        const active = isActive(item)
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              active
                ? "bg-amber-warm text-cream shadow-sm"
                : "text-brown-light/70 hover:bg-white/10 hover:text-cream"
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="flex-1">{item.label}</span>
            {active && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
          </Link>
        )
      })}

      {/* Divider + back link */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-brown-light/50 hover:text-cream hover:bg-white/10 transition-all"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          Back to Library
        </Link>
      </div>
    </nav>
  )
}
