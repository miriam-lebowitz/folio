import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Shield, BookOpen } from "lucide-react"
import { authOptions } from "@/lib/auth"
import AdminSidebarNav from "./_components/AdminSidebarNav"

/**
 * Shared layout for all /admin/* pages.
 * Enforces authentication AND a staff or admin role — patrons who somehow
 * reach this route are redirected home rather than seeing a 403.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login?callbackUrl=/admin")
  }

  const role = (session.user as any).role as string
  if (role !== "admin" && role !== "staff") {
    redirect("/")
  }

  const isAdmin = role === "admin"

  return (
    <div className="min-h-screen flex bg-cream">

      {/* ── Fixed dark sidebar (desktop) ─────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-brown-deep min-h-screen sticky top-0 h-screen overflow-y-auto">

        {/* Brand */}
        <div className="px-5 py-5 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-amber-warm rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-cream" />
            </div>
            <div>
              <p className="text-cream text-sm font-semibold leading-none">Folio</p>
              <p className="text-brown-light/60 text-xs mt-0.5">Staff Portal</p>
            </div>
          </Link>
        </div>

        {/* Role chip */}
        <div className="px-5 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-amber-warm/20 rounded-full flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-amber-warm" />
            </div>
            <div>
              <p className="text-cream text-xs font-medium">{session.user?.name ?? "Staff"}</p>
              <p className={`text-xs capitalize ${isAdmin ? "text-amber-warm" : "text-brown-light/60"}`}>
                {role}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-4">
          <AdminSidebarNav variant="sidebar" />
        </div>

        {/* Version footer */}
        <div className="px-5 py-3 border-t border-white/10">
          <p className="text-xs text-brown-light/40">Folio v1.0 · Staff Portal</p>
        </div>
      </aside>

      {/* ── Main area ──────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-brown-deep border-b border-white/10 sticky top-0 z-30">
          <Link href="/admin" className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-warm" />
            <span className="text-cream text-sm font-semibold">Staff Portal</span>
          </Link>
          <AdminSidebarNav variant="topbar" />
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}
