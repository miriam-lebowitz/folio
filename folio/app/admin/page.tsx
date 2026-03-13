import { getServerSession } from "next-auth"
import Link from "next/link"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  BookOpen,
  Users,
  BarChart2,
  CheckSquare,
  PlusCircle,
  RefreshCw,
  Package,
  Clock,
  ArrowRight,
} from "lucide-react"
import { authOptions } from "@/lib/auth"
import {
  DASHBOARD_STATS,
  RECENT_ACTIVITY,
  type ActivityEvent,
} from "@/lib/admin-data"

// ── Activity type config ────────────────────────────────────────────────────

const activityConfig: Record<
  ActivityEvent["type"],
  { color: string; dot: string; label: string }
> = {
  checkout: { color: "text-amber-dark", dot: "bg-amber-warm", label: "Checkout" },
  return: { color: "text-green-library", dot: "bg-green-library", label: "Return" },
  hold: { color: "text-brown-light", dot: "bg-brown-light/60", label: "Hold" },
  registration: { color: "text-amber-dark", dot: "bg-amber-warm", label: "New Patron" },
  fine: { color: "text-red-500", dot: "bg-red-400", label: "Fine" },
  renewal: { color: "text-brown-light", dot: "bg-sand", label: "Renewal" },
  damage: { color: "text-red-500", dot: "bg-red-400", label: "Damage" },
  ill: { color: "text-green-library", dot: "bg-green-library", label: "ILL" },
}

const QUICK_ACTIONS = [
  { icon: <CheckSquare className="w-5 h-5" />, label: "Check In Item", href: "/admin/catalog", color: "bg-green-library/15 text-green-library hover:bg-green-library/25" },
  { icon: <BookOpen className="w-5 h-5" />, label: "Check Out Item", href: "/admin/catalog", color: "bg-amber-warm/15 text-amber-dark hover:bg-amber-warm/25" },
  { icon: <PlusCircle className="w-5 h-5" />, label: "New Patron", href: "/admin/users", color: "bg-sand/60 text-brown hover:bg-sand" },
  { icon: <RefreshCw className="w-5 h-5" />, label: "Process Renewal", href: "/admin/catalog", color: "bg-brown-light/15 text-brown-light hover:bg-brown-light/25" },
  { icon: <Package className="w-5 h-5" />, label: "ILL Request", href: "/ill", color: "bg-parchment text-brown hover:bg-sand/60" },
  { icon: <BarChart2 className="w-5 h-5" />, label: "View Reports", href: "/admin/reports", color: "bg-amber-warm/15 text-amber-dark hover:bg-amber-warm/25" },
]

// ── Overdue items (mock) ─────────────────────────────────────────────────────

const OVERDUE_ITEMS = [
  { title: "Sapiens", patron: "Thomas Wright", daysOverdue: 4, fine: "$2.00" },
  { title: "The Great Alone", patron: "Angela Reyes", daysOverdue: 7, fine: "$3.50" },
  { title: "Atomic Habits", patron: "Mark Stevens", daysOverdue: 22, fine: "$11.00" },
  { title: "Normal People", patron: "Nina Patel", daysOverdue: 31, fine: "$15.50" },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  const name = session?.user?.name?.split(" ")[0] ?? "there"
  const now = new Date()
  const timeLabel =
    now.getHours() < 12 ? "Good morning" : now.getHours() < 17 ? "Good afternoon" : "Good evening"

  return (
    <div className="space-y-8 max-w-6xl">

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brown-deep">
            {timeLabel}, {name}
          </h1>
          <p className="text-brown-light text-sm mt-1">
            {now.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            {" · "}Folio Public Library Staff Portal
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs text-green-library bg-green-library/10 border border-green-muted px-2.5 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-green-library rounded-full animate-pulse" />
            Library open
          </span>
          <Link
            href="/admin/reports"
            className="text-sm font-medium bg-amber-warm hover:bg-amber-dark text-cream px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <BarChart2 className="w-4 h-4" />
            Reports
          </Link>
        </div>
      </div>

      {/* ── Key metrics grid ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {DASHBOARD_STATS.map((stat) => (
          <div
            key={stat.label}
            className="bg-parchment border border-sand rounded-xl p-4 space-y-1.5"
          >
            <p className="text-xs text-brown-light font-medium leading-tight">{stat.label}</p>
            <p className={`text-2xl font-bold font-display ${stat.color}`}>{stat.value}</p>
            <p
              className={`text-xs flex items-center gap-0.5 ${
                stat.up ? "text-green-library" : "text-brown-light/60"
              }`}
            >
              {stat.up ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* ── Left column: activity + overdue ──────────────────────── */}
        <div className="xl:col-span-2 space-y-6">

          {/* Recent activity */}
          <div className="bg-parchment border border-sand rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-sand">
              <h2 className="font-display text-base font-bold text-brown-deep">Recent Activity</h2>
              <span className="text-xs text-brown-light/60 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Live
              </span>
            </div>
            <div className="divide-y divide-sand/60">
              {RECENT_ACTIVITY.slice(0, 8).map((event) => {
                const config = activityConfig[event.type]
                return (
                  <div key={event.id} className="flex items-start gap-3 px-5 py-3">
                    <div
                      className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${config.dot}`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-brown-deep leading-snug">
                        <span className={`font-medium ${config.color}`}>{config.label}</span>
                        {" · "}
                        {event.patron}
                        {event.item && (
                          <span className="text-brown-light"> — {event.item}</span>
                        )}
                      </p>
                      <p className="text-xs text-brown-light/60 mt-0.5">{event.timestamp}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="px-5 py-3 border-t border-sand">
              <Link
                href="/admin/users"
                className="text-xs text-amber-dark hover:underline flex items-center gap-1"
              >
                View full activity log <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Overdue items alert */}
          <div className="bg-parchment border border-red-300/40 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-red-300/30 bg-red-50/30">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
              <h2 className="font-display text-base font-bold text-red-600">
                Overdue Items ({OVERDUE_ITEMS.length})
              </h2>
            </div>
            <div className="divide-y divide-sand/60">
              {OVERDUE_ITEMS.map((item) => (
                <div key={item.title} className="flex items-center gap-3 px-5 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brown-deep">{item.title}</p>
                    <p className="text-xs text-brown-light mt-0.5">{item.patron}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-red-500 font-medium">{item.daysOverdue} days late</p>
                    <p className="text-xs text-brown-light mt-0.5">Fine: {item.fine}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-sand">
              <Link
                href="/admin/reports"
                className="text-xs text-amber-dark hover:underline flex items-center gap-1"
              >
                See all overdue items in reports <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Right column: quick actions + links ──────────────────── */}
        <div className="space-y-6">

          {/* Quick actions */}
          <div className="bg-parchment border border-sand rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-sand">
              <h2 className="font-display text-base font-bold text-brown-deep">Quick Actions</h2>
            </div>
            <div className="p-4 grid grid-cols-2 gap-2">
              {QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl text-center transition-colors ${action.color}`}
                >
                  {action.icon}
                  <span className="text-xs font-medium leading-tight">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Admin nav shortcuts */}
          <div className="bg-parchment border border-sand rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-sand">
              <h2 className="font-display text-base font-bold text-brown-deep">
                Staff Sections
              </h2>
            </div>
            <div className="divide-y divide-sand/60">
              {[
                {
                  icon: <BookOpen className="w-4 h-4" />,
                  label: "Catalog Management",
                  sub: "Add, edit, and manage items",
                  href: "/admin/catalog",
                },
                {
                  icon: <Users className="w-4 h-4" />,
                  label: "User Management",
                  sub: "Patron accounts and roles",
                  href: "/admin/users",
                },
                {
                  icon: <BarChart2 className="w-4 h-4" />,
                  label: "Reports",
                  sub: "Usage stats and analytics",
                  href: "/admin/reports",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-sand/30 transition-colors group"
                >
                  <div className="w-8 h-8 bg-amber-warm/10 rounded-lg flex items-center justify-center text-amber-warm shrink-0">
                    {link.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brown-deep">{link.label}</p>
                    <p className="text-xs text-brown-light">{link.sub}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-brown-light/40 group-hover:text-amber-dark transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Today's summary */}
          <div className="bg-gradient-to-br from-amber-warm/10 to-parchment border border-sand rounded-2xl p-5 space-y-3">
            <h3 className="font-display text-sm font-bold text-brown-deep">Today at a Glance</h3>
            <div className="space-y-2">
              {[
                ["Checkouts today", "47"],
                ["Returns today", "39"],
                ["New holds", "12"],
                ["New patrons", "1"],
                ["Fines collected", "$8.75"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-brown-light">{k}</span>
                  <span className="font-semibold text-brown-deep">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
