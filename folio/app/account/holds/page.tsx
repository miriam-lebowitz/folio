import Link from "next/link"
import { BookMarked, CheckCircle2, Clock, Users, X } from "lucide-react"
import { mockHolds } from "@/lib/account-data"

export const metadata = { title: "Holds Queue" }

export default function HoldsPage() {
  const readyHolds = mockHolds.filter((h) => h.status === "ready")
  const waitingHolds = mockHolds.filter((h) => h.status === "waiting")

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-semibold text-brown-deep">Holds Queue</h2>
        <p className="text-brown-light text-sm mt-1">
          Track your place in line and pick up items that are ready for you.
        </p>
      </div>

      {/* ── Ready for Pickup ─────────────────────────────────────────────── */}
      {readyHolds.length > 0 && (
        <section>
          <div className="bg-green-muted/30 border border-green-muted rounded-xl p-5 mb-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-library shrink-0" />
            <p className="text-sm font-medium text-green-library">
              {readyHolds.length} item{readyHolds.length !== 1 ? "s are" : " is"} ready for pickup at Main Branch!
            </p>
          </div>

          <div className="bg-parchment border border-green-muted rounded-xl divide-y divide-sand/60">
            {readyHolds.map((hold) => (
              <div key={hold.id} className="flex gap-4 p-5">
                <div className="w-14 h-20 bg-gradient-to-br from-green-muted/60 to-muted-sand rounded flex items-center justify-center shrink-0">
                  <BookMarked className="w-6 h-6 text-green-library/40" />
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <Link
                    href={`/catalog/${hold.book.id}`}
                    className="font-display font-semibold text-brown-deep hover:text-amber-dark transition-colors line-clamp-1"
                  >
                    {hold.book.title}
                  </Link>
                  <p className="text-sm text-brown-light">{hold.book.author}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs bg-green-muted text-green-library px-2.5 py-1 rounded-full font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Ready for pickup
                  </span>
                  <p className="text-xs text-brown-light">
                    Hold until{" "}
                    <span className="text-amber-dark font-medium">{hold.expiresDate}</span>
                    {" "}— pick up at Main Branch
                  </p>
                </div>
                <div className="shrink-0 flex flex-col gap-2">
                  <button className="text-xs px-3 py-2 border border-sand text-brown-light rounded-lg hover:border-amber-warm hover:text-amber-dark transition-colors">
                    Cancel hold
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Waiting in Queue ──────────────────────────────────────────────── */}
      {waitingHolds.length > 0 && (
        <section>
          <h3 className="font-display font-semibold text-brown-deep text-lg mb-4">
            Waiting in Queue
          </h3>
          <div className="bg-parchment border border-sand rounded-xl divide-y divide-sand/60">
            {waitingHolds.map((hold) => (
              <div key={hold.id} className="flex gap-4 p-5">
                <div className="w-14 h-20 bg-gradient-to-br from-sand to-muted-sand rounded flex items-center justify-center shrink-0">
                  <BookMarked className="w-6 h-6 text-brown-light/40" />
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  <Link
                    href={`/catalog/${hold.book.id}`}
                    className="font-display font-semibold text-brown-deep hover:text-amber-dark transition-colors line-clamp-1"
                  >
                    {hold.book.title}
                  </Link>
                  <p className="text-sm text-brown-light">{hold.book.author}</p>

                  {/* Queue position visual */}
                  {hold.position !== undefined && hold.totalWaiting !== undefined && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-sand/60 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-warm rounded-full transition-all"
                            style={{
                              width: `${100 - ((hold.position - 1) / hold.totalWaiting) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-brown-light shrink-0 w-20 text-right">
                          #{hold.position} of {hold.totalWaiting}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-brown-light">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Est. wait: {hold.estimatedWait}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {hold.totalWaiting} waiting
                        </span>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-brown-light/70">Hold placed {hold.placedDate}</p>
                </div>

                <div className="shrink-0 flex flex-col gap-2">
                  <button className="flex items-center gap-1.5 text-xs px-3 py-2 border border-sand text-brown-light rounded-lg hover:border-red-200 hover:text-red-600 transition-colors">
                    <X className="w-3 h-3" /> Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Empty state ───────────────────────────────────────────────────── */}
      {mockHolds.length === 0 && (
        <div className="bg-parchment border border-sand rounded-xl p-12 text-center space-y-3">
          <Clock className="w-12 h-12 text-brown-light/30 mx-auto" />
          <h3 className="font-display font-semibold text-brown-deep">No holds yet</h3>
          <p className="text-brown-light text-sm max-w-sm mx-auto">
            When you place a hold on a checked-out book, it will appear here.
          </p>
          <Link
            href="/catalog"
            className="inline-block mt-2 px-5 py-2.5 bg-amber-warm text-cream rounded-lg hover:bg-amber-dark transition-colors text-sm font-medium"
          >
            Browse the catalog
          </Link>
        </div>
      )}

      {/* ── How holds work ────────────────────────────────────────────────── */}
      <div className="bg-parchment border border-sand rounded-xl p-5">
        <h4 className="font-display font-semibold text-brown-deep mb-3">How Holds Work</h4>
        <ul className="space-y-2 text-sm text-brown-light">
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-sand rounded-full flex items-center justify-center text-xs font-bold text-brown shrink-0 mt-0.5">1</span>
            You place a hold on any checked-out item.
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-sand rounded-full flex items-center justify-center text-xs font-bold text-brown shrink-0 mt-0.5">2</span>
            When it's your turn, we notify you by email or SMS.
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-sand rounded-full flex items-center justify-center text-xs font-bold text-brown shrink-0 mt-0.5">3</span>
            You have 7 days to pick it up at your chosen branch.
          </li>
        </ul>
      </div>
    </div>
  )
}
