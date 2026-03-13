"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import {
  BookOpen,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  BookMarked,
  Clock,
  AlertCircle,
  List,
  MessageCircle,
} from "lucide-react"

/** Top-level navigation items, with optional dropdown children */
const navLinks = [
  {
    label: "Catalog",
    href: "/catalog",
    children: [
      { label: "Browse All", href: "/catalog" },
      { label: "Search", href: "/search" },
      { label: "eBooks & Audiobooks", href: "/digital/ebooks" },
      { label: "Digital Magazines", href: "/digital/magazines" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Ask a Librarian", href: "/ask-librarian" },
      { label: "Interlibrary Loan", href: "/ill" },
      { label: "Room & Equipment Booking", href: "/rooms" },
    ],
  },
  { label: "Events", href: "/events" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Locations & Hours", href: "/locations" },
      { label: "About & Policies", href: "/about" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
]

export default function NavBar() {
  const { data: session, status } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const isLoading = status === "loading"

  return (
    <header className="sticky top-0 z-50 bg-parchment border-b border-sand shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Brand ─────────────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <BookOpen className="w-7 h-7 text-amber-warm group-hover:text-amber-dark transition-colors" />
            <span className="font-display text-xl font-bold text-brown-deep tracking-tight">
              Folio
            </span>
          </Link>

          {/* ── Desktop Navigation ────────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-brown hover:text-amber-dark rounded-md hover:bg-sand/40 transition-colors"
                >
                  {link.label}
                  {link.children && <ChevronDown className="w-3 h-3 opacity-60" />}
                </Link>

                {/* Dropdown panel */}
                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-parchment border border-sand rounded-lg shadow-lg py-1.5 z-50">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-brown hover:text-amber-dark hover:bg-sand/40 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* ── Auth Controls (desktop) ───────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-2">
            {isLoading ? (
              <div className="w-24 h-8 bg-sand/40 rounded animate-pulse" />
            ) : status === "authenticated" && session?.user ? (
              /* Logged-in: avatar + user menu */
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  onBlur={() => setTimeout(() => setUserMenuOpen(false), 150)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-brown hover:text-amber-dark rounded-md hover:bg-sand/40 transition-colors"
                >
                  {/* Avatar initials circle */}
                  <div className="w-7 h-7 rounded-full bg-amber-warm text-cream flex items-center justify-center text-xs font-bold shrink-0">
                    {session.user.name?.charAt(0) ?? "P"}
                  </div>
                  <span className="max-w-[100px] truncate">
                    {session.user.name?.split(" ")[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>

                {userMenuOpen && (
                  <div className="absolute top-full right-0 mt-1 w-56 bg-parchment border border-sand rounded-lg shadow-lg py-1.5 z-50">
                    <div className="px-4 py-2 border-b border-sand/60 mb-1">
                      <p className="text-xs font-medium text-brown-deep truncate">{session.user.name}</p>
                      <p className="text-xs text-brown-light truncate">{session.user.email}</p>
                    </div>
                    <Link href="/account" className="flex items-center gap-2.5 px-4 py-2 text-sm text-brown hover:bg-sand/40 transition-colors">
                      <User className="w-4 h-4 text-brown-light" /> My Account
                    </Link>
                    <Link href="/account/checkouts" className="flex items-center gap-2.5 px-4 py-2 text-sm text-brown hover:bg-sand/40 transition-colors">
                      <BookMarked className="w-4 h-4 text-brown-light" /> My Checkouts
                    </Link>
                    <Link href="/account/holds" className="flex items-center gap-2.5 px-4 py-2 text-sm text-brown hover:bg-sand/40 transition-colors">
                      <Clock className="w-4 h-4 text-brown-light" /> My Holds
                    </Link>
                    <Link href="/account/reading-lists" className="flex items-center gap-2.5 px-4 py-2 text-sm text-brown hover:bg-sand/40 transition-colors">
                      <List className="w-4 h-4 text-brown-light" /> Reading Lists
                    </Link>
                    <Link href="/account/fines" className="flex items-center gap-2.5 px-4 py-2 text-sm text-brown hover:bg-sand/40 transition-colors">
                      <AlertCircle className="w-4 h-4 text-brown-light" /> Fines & Fees
                    </Link>
                    <hr className="my-1 border-sand/60" />
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-brown hover:bg-sand/40 transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4 text-brown-light" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Logged-out: login + register links */
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-brown hover:text-amber-dark transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium bg-amber-warm text-cream rounded-md hover:bg-amber-dark transition-colors"
                >
                  Get a Card
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile hamburger ─────────────────────────────────────────── */}
          <button
            className="md:hidden p-2 text-brown hover:text-amber-dark rounded-md hover:bg-sand/40 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ───────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden bg-parchment border-t border-sand px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <div key={link.label}>
              <Link
                href={link.href}
                className="block text-base font-medium text-brown py-1.5 hover:text-amber-dark"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="ml-4 space-y-1 pb-1">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block text-sm text-brown-light py-1 hover:text-amber-dark"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <hr className="border-sand" />

          {status === "authenticated" && session?.user ? (
            <>
              <div className="py-1.5">
                <p className="text-sm font-medium text-brown-deep">{session.user.name}</p>
                <p className="text-xs text-brown-light">{session.user.email}</p>
              </div>
              <Link href="/account" className="block text-sm text-brown py-1 hover:text-amber-dark" onClick={() => setMobileOpen(false)}>
                My Account
              </Link>
              <button
                onClick={() => { signOut({ callbackUrl: "/" }); setMobileOpen(false) }}
                className="block text-sm text-brown py-1 hover:text-amber-dark w-full text-left"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex gap-3 pt-1">
              <Link
                href="/login"
                className="flex-1 text-center py-2 border border-sand rounded-md text-sm font-medium text-brown hover:bg-sand/40 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="flex-1 text-center py-2 bg-amber-warm text-cream rounded-md text-sm font-medium hover:bg-amber-dark transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Get a Card
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
