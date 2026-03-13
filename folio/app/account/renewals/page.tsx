import Link from "next/link"
import { BookMarked, RotateCcw, CheckCircle, AlertCircle } from "lucide-react"
import { mockCurrentCheckouts } from "@/lib/account-data"

export const metadata = { title: "Renewals" }

export default function RenewalsPage() {
  const renewable = mockCurrentCheckouts.filter(
    (c) => c.status === "active" && c.renewalCount < c.maxRenewals,
  )
  const notRenewable = mockCurrentCheckouts.filter(
    (c) => c.status !== "active" || c.renewalCount >= c.maxRenewals,
  )

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-semibold text-brown-deep">Renewals</h2>
        <p className="text-brown-light text-sm mt-1">
          Renew items before they're due to keep them for another 3 weeks.
        </p>
      </div>

      {/* ── Renewal policy callout ─────────────────────────────────────────── */}
      <div className="bg-amber-warm/8 border border-amber-warm/30 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-amber-dark mt-0.5 shrink-0" />
        <p className="text-sm text-brown">
          Items can be renewed up to <strong>2 times</strong> unless another patron has placed a hold on them.
          Renewals extend your due date by <strong>21 days</strong>.
        </p>
      </div>

      {/* ── Items available to renew ─────────────────────────────────────── */}
      {renewable.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-brown-deep text-lg">
              Available to Renew
              <span className="ml-2 text-sm font-normal text-brown-light">({renewable.length})</span>
            </h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-amber-warm text-cream rounded-lg hover:bg-amber-dark transition-colors text-sm font-medium">
              <RotateCcw className="w-4 h-4" />
              Renew All ({renewable.length})
            </button>
          </div>

          <div className="bg-parchment border border-sand rounded-xl divide-y divide-sand/60">
            {renewable.map((item) => (
              <div key={item.id} className="flex gap-4 p-5 items-center">
                <div className="w-12 h-16 bg-gradient-to-br from-sand to-muted-sand rounded flex items-center justify-center shrink-0">
                  <BookMarked className="w-5 h-5 text-brown-light/40" />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <Link
                    href={`/catalog/${item.book.id}`}
                    className="font-medium text-brown-deep hover:text-amber-dark transition-colors truncate block"
                  >
                    {item.book.title}
                  </Link>
                  <p className="text-sm text-brown-light">{item.book.author}</p>
                  <div className="flex items-center gap-3 flex-wrap text-xs text-brown-light">
                    <span>Currently due: <span className="text-brown-deep font-medium">{item.dueDate}</span></span>
                    <span>→ New due date: <span className="text-green-library font-medium">
                      {/* Mock: add 21 days to the due date string */}
                      July {parseInt(item.dueDate.split(" ")[1]) + 21 > 31 ? parseInt(item.dueDate.split(" ")[1]) + 21 - 31 : parseInt(item.dueDate.split(" ")[1]) + 21}, 2026
                    </span></span>
                  </div>

                  {/* Renewals remaining dots */}
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {Array.from({ length: item.maxRenewals }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2.5 h-2.5 rounded-full border ${
                          i < item.renewalCount
                            ? "bg-sand border-sand"
                            : "bg-amber-warm border-amber-warm"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-brown-light ml-1">
                      {item.maxRenewals - item.renewalCount} left
                    </span>
                  </div>
                </div>

                <button className="shrink-0 flex items-center gap-1.5 text-sm px-4 py-2 bg-amber-warm text-cream rounded-lg hover:bg-amber-dark transition-colors font-medium">
                  <RotateCcw className="w-3.5 h-3.5" />
                  Renew
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Items that cannot be renewed ─────────────────────────────────── */}
      {notRenewable.length > 0 && (
        <section>
          <h3 className="font-display font-semibold text-brown-deep text-lg mb-4">
            Cannot Be Renewed
            <span className="ml-2 text-sm font-normal text-brown-light">({notRenewable.length})</span>
          </h3>

          <div className="bg-parchment border border-sand rounded-xl divide-y divide-sand/60">
            {notRenewable.map((item) => {
              const reason =
                item.status === "overdue"
                  ? "Item is overdue — please return it as soon as possible"
                  : "Maximum renewals reached (2 of 2 used)"

              return (
                <div key={item.id} className="flex gap-4 p-5 items-center opacity-80">
                  <div className="w-12 h-16 bg-gradient-to-br from-sand to-muted-sand rounded flex items-center justify-center shrink-0">
                    <BookMarked className="w-5 h-5 text-brown-light/40" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <Link
                      href={`/catalog/${item.book.id}`}
                      className="font-medium text-brown-deep hover:text-amber-dark transition-colors truncate block"
                    >
                      {item.book.title}
                    </Link>
                    <p className="text-sm text-brown-light">{item.book.author}</p>
                    <div className="flex items-center gap-1.5 text-xs text-amber-dark">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {reason}
                    </div>
                  </div>

                  <span className="shrink-0 text-xs text-brown-light/60 border border-sand/60 px-3 py-2 rounded-lg cursor-not-allowed">
                    Not eligible
                  </span>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ── All caught up ─────────────────────────────────────────────────── */}
      {renewable.length === 0 && notRenewable.length === 0 && (
        <div className="bg-parchment border border-sand rounded-xl p-12 text-center space-y-3">
          <CheckCircle className="w-12 h-12 text-green-library/50 mx-auto" />
          <h3 className="font-display font-semibold text-brown-deep">Nothing to renew</h3>
          <p className="text-brown-light text-sm">You have no checked-out items at the moment.</p>
          <Link
            href="/catalog"
            className="inline-block mt-2 px-5 py-2.5 bg-amber-warm text-cream rounded-lg hover:bg-amber-dark transition-colors text-sm font-medium"
          >
            Browse the catalog
          </Link>
        </div>
      )}
    </div>
  )
}
