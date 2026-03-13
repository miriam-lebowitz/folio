import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import AccountSidebarNav from "./_components/AccountSidebarNav"
import {
  accountSummary,
  mockCurrentCheckouts,
  mockHolds,
} from "@/lib/account-data"

export const metadata = {
  title: "My Account",
}

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  const user = session?.user as { name?: string; email?: string; cardNumber?: string } | undefined

  // Build badge counts for the sidebar nav
  const badges = {
    checkouts: mockCurrentCheckouts.filter((c) => c.status !== "returned").length,
    holds: mockHolds.filter((h) => h.status === "ready").length,
    fines: accountSummary.totalFinesOwed > 0 ? 1 : undefined,
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Page header ──────────────────────────────────────────────────── */}
        <div className="mb-6">
          <p className="text-xs text-brown-light mb-1">
            <a href="/" className="hover:text-amber-dark transition-colors">Home</a>
            {" / "}
            <span className="text-brown-deep">My Account</span>
          </p>
          <h1 className="font-display text-3xl font-bold text-brown-deep">My Account</h1>
        </div>

        <div className="flex gap-8 items-start">

          {/* ── Desktop sidebar ──────────────────────────────────────────────── */}
          <aside className="hidden lg:flex flex-col gap-4 w-60 xl:w-64 shrink-0 sticky top-20">
            {/* Patron card */}
            <div className="bg-parchment border border-sand rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-amber-warm text-cream flex items-center justify-center font-display font-bold text-xl shrink-0">
                  {user?.name?.charAt(0) ?? "P"}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-brown-deep truncate">{user?.name ?? "Patron"}</p>
                  <p className="text-xs text-brown-light">{user?.cardNumber ?? "Library Card"}</p>
                  {accountSummary.totalFinesOwed > 0 && (
                    <p className="text-xs text-amber-dark font-medium mt-0.5">
                      ${accountSummary.totalFinesOwed.toFixed(2)} owed
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Nav */}
            <div className="bg-parchment border border-sand rounded-xl p-3">
              <AccountSidebarNav badges={badges} variant="sidebar" />
            </div>
          </aside>

          {/* ── Main content ─────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Mobile horizontal nav */}
            <AccountSidebarNav badges={badges} variant="mobile" />

            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
