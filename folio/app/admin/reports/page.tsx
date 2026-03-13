import { Download, TrendingUp, Users, BookOpen, Clock, BarChart2 } from "lucide-react"
import {
  TOP_TITLES,
  GENRE_BREAKDOWN,
  WEEKDAY_ACTIVITY,
  MONTHLY_GROWTH,
  DASHBOARD_STATS,
} from "@/lib/admin-data"

// ── Reusable bar chart row ───────────────────────────────────────────────────

function BarRow({
  label,
  value,
  max,
  sub,
  color = "bg-amber-warm",
}: {
  label: string
  value: number
  max: number
  sub?: string
  color?: string
}) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className="flex items-center gap-3">
      <div className="w-36 text-sm text-brown-deep font-medium truncate shrink-0">{label}</div>
      <div className="flex-1 h-6 bg-sand/40 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="w-16 text-right shrink-0">
        <span className="text-sm font-semibold text-brown-deep">{value.toLocaleString()}</span>
        {sub && <span className="text-xs text-brown-light ml-1">{sub}</span>}
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  const topCheckout = Math.max(...TOP_TITLES.map((t) => t.checkouts))
  const topWeekday = Math.max(...WEEKDAY_ACTIVITY.map((d) => d.checkouts))
  const topMonthCheckouts = Math.max(...MONTHLY_GROWTH.map((m) => m.checkouts))
  const topMonthPatrons = Math.max(...MONTHLY_GROWTH.map((m) => m.patrons))

  return (
    <div className="space-y-8 max-w-6xl">

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brown-deep">Reports & Analytics</h1>
          <p className="text-brown-light text-sm mt-1">
            Usage statistics for Folio Public Library · March 2026
          </p>
        </div>
        <button className="flex items-center gap-2 border border-sand bg-parchment hover:bg-sand/40 text-brown text-sm font-medium px-4 py-2.5 rounded-xl transition-colors shrink-0">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* ── Summary metrics ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: <BookOpen className="w-5 h-5" />, label: "Total Checkouts (Mar)", value: "3,420", change: "+2.1%", up: true },
          { icon: <Users className="w-5 h-5" />, label: "Active Patrons (Mar)", value: "412", change: "+8 new", up: true },
          { icon: <TrendingUp className="w-5 h-5" />, label: "Digital Loans (Mar)", value: "1,187", change: "+14.3%", up: true },
          { icon: <Clock className="w-5 h-5" />, label: "Avg. Loan Duration", value: "18 days", change: "−1.5 days", up: true },
        ].map((item) => (
          <div key={item.label} className="bg-parchment border border-sand rounded-xl p-4 space-y-2">
            <div className="w-9 h-9 bg-amber-warm/10 rounded-lg flex items-center justify-center text-amber-warm">
              {item.icon}
            </div>
            <div>
              <p className="text-xs text-brown-light font-medium">{item.label}</p>
              <p className="text-2xl font-bold font-display text-brown-deep">{item.value}</p>
              <p className={`text-xs mt-0.5 ${item.up ? "text-green-library" : "text-red-400"}`}>
                {item.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ── Top 10 most borrowed ─────────────────────────────────── */}
        <div className="bg-parchment border border-sand rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-sand">
            <h2 className="font-display text-base font-bold text-brown-deep">
              Top 10 Most Borrowed
            </h2>
            <span className="text-xs text-brown-light">All time</span>
          </div>
          <div className="px-5 py-4 space-y-3">
            {TOP_TITLES.map((title, i) => (
              <div key={title.title} className="space-y-1">
                <div className="flex items-center gap-2 justify-between">
                  <span className="text-xs font-bold text-amber-warm w-5 shrink-0">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm text-brown-deep font-medium truncate">
                    {title.title}
                  </span>
                  <span className="text-xs text-brown-light shrink-0">{title.checkouts}×</span>
                </div>
                <div className="ml-7 h-1.5 bg-sand/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-warm rounded-full"
                    style={{ width: `${Math.round((title.checkouts / topCheckout) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Checkouts by day of week ─────────────────────────────── */}
        <div className="bg-parchment border border-sand rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-sand">
            <h2 className="font-display text-base font-bold text-brown-deep">
              Checkouts by Day of Week
            </h2>
            <span className="text-xs text-brown-light">This month avg.</span>
          </div>
          <div className="px-5 py-4 space-y-3">
            {WEEKDAY_ACTIVITY.map((day) => (
              <div key={day.day} className="flex items-center gap-3">
                <span className="w-8 text-xs font-semibold text-brown-light text-right shrink-0">
                  {day.day}
                </span>
                <div className="flex-1 space-y-1">
                  <div className="flex gap-1 items-center">
                    <div className="flex-1 h-3 bg-sand/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-warm rounded-full"
                        style={{ width: `${Math.round((day.checkouts / topWeekday) * 100)}%` }}
                        title={`${day.checkouts} checkouts`}
                      />
                    </div>
                    <span className="text-xs text-brown-deep font-medium w-6 text-right shrink-0">
                      {day.checkouts}
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <div className="flex-1 h-3 bg-sand/40 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-library/60 rounded-full"
                        style={{ width: `${Math.round((day.returns / topWeekday) * 100)}%` }}
                        title={`${day.returns} returns`}
                      />
                    </div>
                    <span className="text-xs text-brown-light w-6 text-right shrink-0">
                      {day.returns}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 pb-4 flex gap-4 text-xs text-brown-light">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-warm" />
              Checkouts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-green-library/60" />
              Returns
            </span>
          </div>
        </div>

        {/* ── Collection by genre ──────────────────────────────────── */}
        <div className="bg-parchment border border-sand rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-sand">
            <h2 className="font-display text-base font-bold text-brown-deep">
              Collection by Genre
            </h2>
            <span className="text-xs text-brown-light">18,402 total items</span>
          </div>
          <div className="px-5 py-4 space-y-3">
            {GENRE_BREAKDOWN.map((item, i) => {
              const colors = [
                "bg-amber-warm",
                "bg-green-library",
                "bg-brown-light/60",
                "bg-amber-warm/60",
                "bg-green-muted",
                "bg-sand",
                "bg-brown-light/40",
                "bg-parchment border border-sand",
              ]
              return (
                <BarRow
                  key={item.genre}
                  label={item.genre}
                  value={item.count}
                  max={GENRE_BREAKDOWN[0].count}
                  sub={`${item.percent}%`}
                  color={colors[i % colors.length]}
                />
              )
            })}
          </div>
        </div>

        {/* ── Monthly patron growth + checkouts ───────────────────── */}
        <div className="bg-parchment border border-sand rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-sand">
            <h2 className="font-display text-base font-bold text-brown-deep">
              Monthly Trends
            </h2>
            <span className="text-xs text-brown-light">Last 7 months</span>
          </div>
          <div className="px-5 py-4 space-y-4">
            {/* Checkouts trend */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-brown-light uppercase tracking-wide">
                Total Checkouts
              </p>
              {MONTHLY_GROWTH.map((m) => (
                <div key={m.month} className="flex items-center gap-3">
                  <span className="w-16 text-xs text-brown-light shrink-0">{m.month}</span>
                  <div className="flex-1 h-5 bg-sand/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-warm/70 rounded-full"
                      style={{ width: `${Math.round((m.checkouts / topMonthCheckouts) * 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-brown-deep w-14 text-right shrink-0">
                    {m.checkouts.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Patron count trend */}
            <div className="space-y-2 pt-4 border-t border-sand">
              <p className="text-xs font-semibold text-brown-light uppercase tracking-wide">
                Registered Patrons
              </p>
              {MONTHLY_GROWTH.map((m) => (
                <div key={m.month} className="flex items-center gap-3">
                  <span className="w-16 text-xs text-brown-light shrink-0">{m.month}</span>
                  <div className="flex-1 h-5 bg-sand/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-library/60 rounded-full"
                      style={{ width: `${Math.round((m.patrons / topMonthPatrons) * 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-brown-deep w-14 text-right shrink-0">
                    {m.patrons.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Overdue summary ──────────────────────────────────────────── */}
      <div className="bg-parchment border border-sand rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-sand">
          <h2 className="font-display text-base font-bold text-brown-deep">
            Overdue & Fine Summary
          </h2>
          <span className="text-xs text-brown-light">Current snapshot</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-sand">
          {[
            { label: "Total overdue items", value: "14", color: "text-red-500" },
            { label: "Outstanding fines", value: "$87.25", color: "text-amber-dark" },
            { label: "Fines collected (Mar)", value: "$312.50", color: "text-green-library" },
            { label: "Items lost/damaged", value: "3", color: "text-red-500" },
          ].map((item) => (
            <div key={item.label} className="p-5 text-center space-y-1">
              <p className={`text-3xl font-bold font-display ${item.color}`}>{item.value}</p>
              <p className="text-xs text-brown-light">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
