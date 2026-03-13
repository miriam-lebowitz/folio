import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import {
  BookMarked,
  Clock,
  AlertCircle,
  List,
  ArrowRight,
  CheckCircle2,
  TriangleAlert,
  Bell,
  RefreshCw,
} from "lucide-react"
import {
  accountSummary,
  mockCurrentCheckouts,
  mockHolds,
  mockFines,
} from "@/lib/account-data"

export const metadata = { title: "Dashboard" }

export default async function AccountDashboardPage() {
  const session = await getServerSession(authOptions)
  const user = session?.user as { name?: string; cardNumber?: string } | undefined
  const firstName = user?.name?.split(" ")[0] ?? "Patron"

  const overdueItems = mockCurrentCheckouts.filter((c) => c.status === "overdue")
  const dueSoonItems = mockCurrentCheckouts.filter((c) => {
    // Treat items due within 5 days as "due soon" (mock logic)
    return c.status === "active" && c.id === "co2"
  })
  const readyHolds = mockHolds.filter((h) => h.status === "ready")
  const outstandingFines = mockFines.filter((f) => f.status === "outstanding")

  return (
    <div className="space-y-8">

      {/* ── Welcome header ────────────────────────────────────────────────── */}
      <div>
        <h2 className="font-display text-2xl font-semibold text-brown-deep">
          Welcome back, {firstName}!
        </h2>
        <p className="text-brown-light text-sm mt-1">
          Here's a summary of your library activity.
        </p>
      </div>

      {/* ── Stat cards ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            label: "Active Checkouts",
            value: accountSummary.activeCheckouts,
            icon: <BookMarked className="w-5 h-5" />,
            href: "/account/checkouts",
            alert: accountSummary.overdueItems > 0,
            alertText: `${accountSummary.overdueItems} overdue`,
          },
          {
            label: "Holds",
            value: accountSummary.holdsTotal,
            icon: <Clock className="w-5 h-5" />,
            href: "/account/holds",
            highlight: accountSummary.holdsReady > 0,
            highlightText: `${accountSummary.holdsReady} ready for pickup!`,
          },
          {
            label: "Fines Owed",
            value: accountSummary.totalFinesOwed > 0 ? `$${accountSummary.totalFinesOwed.toFixed(2)}` : "$0.00",
            icon: <AlertCircle className="w-5 h-5" />,
            href: "/account/fines",
            alert: accountSummary.totalFinesOwed > 0,
            alertText: "Pay now",
          },
          {
            label: "Saved Items",
            value: accountSummary.savedItems,
            icon: <List className="w-5 h-5" />,
            href: "/account/reading-lists",
          },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`group p-5 rounded-xl border transition-all hover:shadow-sm ${
              stat.alert
                ? "bg-amber-warm/10 border-amber-warm/40 hover:border-amber-warm"
                : stat.highlight
                  ? "bg-green-muted/30 border-green-muted hover:border-green-light"
                  : "bg-parchment border-sand hover:border-amber-warm/50"
            }`}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${
              stat.alert
                ? "bg-amber-warm text-cream"
                : stat.highlight
                  ? "bg-green-library text-cream"
                  : "bg-sand/60 text-brown-light group-hover:bg-amber-warm/20 group-hover:text-amber-dark"
            } transition-colors`}>
              {stat.icon}
            </div>
            <div className="font-display text-2xl font-bold text-brown-deep mb-0.5">
              {stat.value}
            </div>
            <div className="text-xs text-brown-light">{stat.label}</div>
            {(stat.alertText || stat.highlightText) && (
              <div className={`text-xs font-medium mt-1.5 ${
                stat.alert ? "text-amber-dark" : "text-green-library"
              }`}>
                {stat.alertText ?? stat.highlightText}
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* ── Action items ──────────────────────────────────────────────────── */}
      {(overdueItems.length > 0 || dueSoonItems.length > 0 || readyHolds.length > 0 || outstandingFines.length > 0) && (
        <div className="bg-parchment border border-sand rounded-xl p-5 space-y-3">
          <h3 className="font-display font-semibold text-brown-deep">Action Needed</h3>

          {overdueItems.map((item) => (
            <div key={item.id} className="flex items-start gap-3 p-3 bg-amber-warm/10 border border-amber-warm/30 rounded-lg">
              <TriangleAlert className="w-4 h-4 text-amber-dark mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-brown-deep">
                  <span className="text-amber-dark">Overdue:</span>{" "}
                  {item.book.title}
                </p>
                <p className="text-xs text-brown-light mt-0.5">
                  Was due {item.dueDate} · ${(0.25).toFixed(2)}/day fine accruing
                </p>
              </div>
              <Link
                href="/account/renewals"
                className="shrink-0 text-xs bg-amber-warm text-cream px-3 py-1.5 rounded-lg hover:bg-amber-dark transition-colors font-medium"
              >
                Renew
              </Link>
            </div>
          ))}

          {dueSoonItems.map((item) => (
            <div key={item.id} className="flex items-start gap-3 p-3 bg-muted-sand/50 border border-sand rounded-lg">
              <Clock className="w-4 h-4 text-brown-light mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-brown-deep">
                  Due soon: {item.book.title}
                </p>
                <p className="text-xs text-brown-light mt-0.5">Due {item.dueDate}</p>
              </div>
              <Link
                href="/account/renewals"
                className="shrink-0 text-xs border border-sand text-brown px-3 py-1.5 rounded-lg hover:border-amber-warm hover:text-amber-dark transition-colors font-medium"
              >
                Renew
              </Link>
            </div>
          ))}

          {readyHolds.map((hold) => (
            <div key={hold.id} className="flex items-start gap-3 p-3 bg-green-muted/40 border border-green-muted rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-green-library mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-brown-deep">
                  <span className="text-green-library">Ready for pickup:</span>{" "}
                  {hold.book.title}
                </p>
                <p className="text-xs text-brown-light mt-0.5">
                  Pick up at Main Branch by {hold.expiresDate}
                </p>
              </div>
            </div>
          ))}

          {outstandingFines.map((fine) => (
            <div key={fine.id} className="flex items-start gap-3 p-3 bg-amber-warm/8 border border-amber-warm/25 rounded-lg">
              <AlertCircle className="w-4 h-4 text-amber-dark mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-brown-deep">
                  Fine: <span className="text-amber-dark">${fine.amount.toFixed(2)}</span> for {fine.bookTitle}
                </p>
                <p className="text-xs text-brown-light mt-0.5">{fine.reason} · {fine.date}</p>
              </div>
              <Link
                href="/account/fines"
                className="shrink-0 text-xs bg-amber-warm text-cream px-3 py-1.5 rounded-lg hover:bg-amber-dark transition-colors font-medium"
              >
                Pay
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* ── Current Checkouts preview ─────────────────────────────────────── */}
      <div className="bg-parchment border border-sand rounded-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-sand">
          <h3 className="font-display font-semibold text-brown-deep">Currently Checked Out</h3>
          <Link href="/account/checkouts" className="flex items-center gap-1 text-sm text-amber-dark hover:text-amber-warm font-medium transition-colors">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="divide-y divide-sand/60">
          {mockCurrentCheckouts.map((item) => (
            <div key={item.id} className="flex items-center gap-4 px-5 py-4">
              {/* Cover thumbnail */}
              <div className="w-10 h-14 bg-gradient-to-br from-sand to-muted-sand rounded flex items-center justify-center shrink-0 overflow-hidden">
                <BookMarked className="w-5 h-5 text-brown-light/40" />
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/catalog/${item.book.id}`}
                  className="text-sm font-medium text-brown-deep hover:text-amber-dark transition-colors truncate block"
                >
                  {item.book.title}
                </Link>
                <p className="text-xs text-brown-light mt-0.5">{item.book.author}</p>
              </div>

              <div className="text-right shrink-0">
                <p className="text-xs text-brown-light">Due</p>
                <p className={`text-sm font-medium ${item.status === "overdue" ? "text-amber-dark" : "text-brown-deep"}`}>
                  {item.dueDate}
                </p>
                {item.status === "overdue" && (
                  <span className="text-xs bg-amber-warm/15 text-amber-dark px-1.5 py-0.5 rounded mt-0.5 inline-block">
                    Overdue
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick account links (for mobile) ─────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:hidden">
        {[
          { href: "/account/holds", label: "Holds Queue", icon: <Clock className="w-5 h-5" /> },
          { href: "/account/renewals", label: "Renewals", icon: <RefreshCw className="w-5 h-5" /> },
          { href: "/account/reading-lists", label: "Reading Lists", icon: <List className="w-5 h-5" /> },
          { href: "/account/fines", label: "Fines & Fees", icon: <AlertCircle className="w-5 h-5" /> },
          { href: "/account/notifications", label: "Notifications", icon: <Bell className="w-5 h-5" /> },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-2.5 p-4 bg-parchment border border-sand rounded-xl text-sm font-medium text-brown hover:border-amber-warm/50 hover:text-amber-dark transition-all"
          >
            <span className="text-brown-light">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
