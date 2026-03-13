import Link from "next/link"
import { BookMarked, RotateCcw, ArrowRight, CheckCircle } from "lucide-react"
import { mockCurrentCheckouts, mockPastCheckouts } from "@/lib/account-data"

export const metadata = { title: "Checkouts" }

function DueDateBadge({ status, dueDate }: { status: string; dueDate: string }) {
  if (status === "overdue") {
    return (
      <span className="inline-flex items-center gap-1 text-xs bg-amber-warm/15 text-amber-dark px-2 py-0.5 rounded-full font-medium">
        Overdue · {dueDate}
      </span>
    )
  }
  if (status === "returned") {
    return (
      <span className="inline-flex items-center gap-1 text-xs bg-green-muted text-green-library px-2 py-0.5 rounded-full font-medium">
        <CheckCircle className="w-3 h-3" /> Returned
      </span>
    )
  }
  return (
    <span className="text-xs text-brown-light">Due {dueDate}</span>
  )
}

export default function CheckoutsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-semibold text-brown-deep">Checkouts</h2>
        <p className="text-brown-light text-sm mt-1">
          Manage your currently checked-out items and view your reading history.
        </p>
      </div>

      {/* ── Currently Checked Out ─────────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-brown-deep text-lg">
            Currently Checked Out
            <span className="ml-2 text-sm font-normal text-brown-light">
              ({mockCurrentCheckouts.length} item{mockCurrentCheckouts.length !== 1 ? "s" : ""})
            </span>
          </h3>
          <Link
            href="/account/renewals"
            className="flex items-center gap-1 text-sm text-amber-dark hover:text-amber-warm font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Renew all
          </Link>
        </div>

        <div className="bg-parchment border border-sand rounded-xl divide-y divide-sand/60">
          {mockCurrentCheckouts.map((item) => (
            <div
              key={item.id}
              className={`flex gap-4 p-5 ${item.status === "overdue" ? "bg-amber-warm/5" : ""}`}
            >
              {/* Cover */}
              <div className="w-14 h-20 bg-gradient-to-br from-sand to-muted-sand rounded flex items-center justify-center shrink-0">
                <BookMarked className="w-6 h-6 text-brown-light/40" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <Link
                  href={`/catalog/${item.book.id}`}
                  className="font-display font-semibold text-brown-deep hover:text-amber-dark transition-colors line-clamp-1"
                >
                  {item.book.title}
                </Link>
                <p className="text-sm text-brown-light">{item.book.author}</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <DueDateBadge status={item.status} dueDate={item.dueDate} />
                  <span className="text-xs text-brown-light/60">
                    Checked out {item.checkedOutDate}
                  </span>
                </div>

                {/* Renewal indicator */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: item.maxRenewals }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < item.renewalCount ? "bg-sand" : "bg-amber-warm"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-brown-light ml-1">
                    {item.maxRenewals - item.renewalCount} renewal{item.maxRenewals - item.renewalCount !== 1 ? "s" : ""} remaining
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 shrink-0">
                {item.renewalCount < item.maxRenewals && item.status !== "overdue" ? (
                  <button className="text-xs px-3 py-2 bg-amber-warm text-cream rounded-lg hover:bg-amber-dark transition-colors font-medium">
                    Renew
                  </button>
                ) : item.status === "overdue" ? (
                  <Link
                    href="/account/fines"
                    className="text-xs px-3 py-2 bg-amber-warm text-cream rounded-lg hover:bg-amber-dark transition-colors font-medium text-center"
                  >
                    Pay Fine
                  </Link>
                ) : (
                  <span className="text-xs px-3 py-2 border border-sand text-brown-light rounded-lg text-center cursor-not-allowed">
                    Max renewals
                  </span>
                )}
                <Link
                  href={`/catalog/${item.book.id}`}
                  className="text-xs px-3 py-2 border border-sand text-brown rounded-lg hover:border-amber-warm hover:text-amber-dark transition-colors text-center"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Checkout History ──────────────────────────────────────────────── */}
      <section>
        <h3 className="font-display font-semibold text-brown-deep text-lg mb-4">
          Checkout History
          <span className="ml-2 text-sm font-normal text-brown-light">
            ({mockPastCheckouts.length} items)
          </span>
        </h3>

        <div className="bg-parchment border border-sand rounded-xl divide-y divide-sand/60">
          {mockPastCheckouts.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 items-center">
              {/* Cover */}
              <div className="w-10 h-14 bg-gradient-to-br from-sand to-muted-sand rounded flex items-center justify-center shrink-0">
                <BookMarked className="w-4 h-4 text-brown-light/40" />
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/catalog/${item.book.id}`}
                  className="text-sm font-medium text-brown-deep hover:text-amber-dark transition-colors truncate block"
                >
                  {item.book.title}
                </Link>
                <p className="text-xs text-brown-light">{item.book.author}</p>
              </div>

              <div className="text-right text-xs text-brown-light shrink-0 space-y-0.5">
                <p>Checked out {item.checkedOutDate}</p>
                {item.returnedDate && (
                  <p className="flex items-center justify-end gap-1 text-green-library">
                    <CheckCircle className="w-3 h-3" /> Returned {item.returnedDate}
                  </p>
                )}
              </div>

              <Link
                href={`/catalog/${item.book.id}`}
                className="shrink-0 text-xs border border-sand text-brown rounded-lg px-2.5 py-1.5 hover:border-amber-warm hover:text-amber-dark transition-colors ml-2"
              >
                View <ArrowRight className="inline w-3 h-3 ml-0.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
