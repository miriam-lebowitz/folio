"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BookMarked,
  Clock,
  RefreshCw,
  AlertCircle,
  List,
  Bell,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/account", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/account/checkouts", label: "Checkouts", icon: BookMarked },
  { href: "/account/holds", label: "Holds Queue", icon: Clock },
  { href: "/account/renewals", label: "Renewals", icon: RefreshCw },
  { href: "/account/fines", label: "Fines & Fees", icon: AlertCircle },
  { href: "/account/reading-lists", label: "Reading Lists", icon: List },
  { href: "/account/notifications", label: "Notifications", icon: Bell },
]

interface AccountSidebarNavProps {
  /** Optional counts to show as badges next to nav items */
  badges?: {
    checkouts?: number
    holds?: number
    renewals?: number
    fines?: number
  }
  /** Variant controls desktop sidebar vs mobile horizontal strip */
  variant?: "sidebar" | "mobile"
}

export default function AccountSidebarNav({
  badges = {},
  variant = "sidebar",
}: AccountSidebarNavProps) {
  const pathname = usePathname()

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/")

  if (variant === "mobile") {
    return (
      <div className="flex gap-1 overflow-x-auto pb-1 -mx-4 px-4 lg:hidden scrollbar-thin">
        {navLinks.map((link) => {
          const active = isActive(link.href, link.exact)
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors shrink-0",
                active
                  ? "bg-amber-warm text-cream"
                  : "text-brown hover:bg-sand/40 hover:text-amber-dark",
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{link.label}</span>
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <nav className="space-y-0.5">
      {navLinks.map((link) => {
        const active = isActive(link.href, link.exact)
        const Icon = link.icon
        const badge = link.href.includes("checkouts")
          ? badges.checkouts
          : link.href.includes("holds")
            ? badges.holds
            : link.href.includes("renewals")
              ? badges.renewals
              : link.href.includes("fines")
                ? badges.fines
                : undefined

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              active
                ? "bg-amber-warm text-cream"
                : "text-brown hover:bg-sand/40 hover:text-amber-dark",
            )}
          >
            <span className="flex items-center gap-3">
              <Icon className="w-4 h-4 shrink-0" />
              {link.label}
            </span>
            {badge !== undefined && badge > 0 && (
              <span
                className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full font-medium",
                  active ? "bg-cream/25 text-cream" : "bg-amber-warm/15 text-amber-dark",
                )}
              >
                {badge}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
