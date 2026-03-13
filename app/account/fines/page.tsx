import Link from "next/link"
import { AlertCircle, CreditCard, CheckCircle, Receipt } from "lucide-react"
import { mockFines, accountSummary } from "@/lib/account-data"

export const metadata = { title: "Fines & Fees" }

export default function FinesPage() {
  const outstanding = mockFines.filter((f) => f.status === "outstanding")
  const paid = mockFines.filter((f) => f.status === "paid")
  const totalOwed = accountSummary.totalFinesOwed

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-semibold text-brown-deep">Fines &amp; Fees</h2>
        <p className="text-brown-light text-sm mt-1">
          Fines accrue at $0.25/day for overdue items. Accounts with balances over $5.00 cannot check out new items.
        </p>
      </div>

      {/* ── Balance summary ───────────────────────────────────────────────── */}
      <div className={`rounded-xl border p-6 ${
        totalOwed > 0
          ? "bg-amber-warm/10 border-amber-warm/40"
          : "bg-green-muted/30 border-green-muted"
      }`}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            {totalOwed > 0 ? (
              <div className="w-14 h-14 bg-amber-warm rounded-full flex items-center justify-center">
                <AlertCircle className="w-7 h-7 text-cream" />
              </div>
            ) : (
              <div className="w-14 h-14 bg-green-library rounded-full flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-cream" />
              </div>
            )}
            <div>
              <p className="text-sm text-brown-light font-medium">Outstanding Balance</p>
              <p className={`font-display text-4xl font-bold mt-1 ${
                totalOwed > 0 ? "text-amber-dark" : "text-green-library"
              }`}>
                ${totalOwed.toFixed(2)}
              </p>
            </div>
          </div>

          {totalOwed > 0 && (
            <button className="flex items-center gap-2 px-6 py-3 bg-amber-warm text-cream rounded-xl hover:bg-amber-dark transition-colors font-semibold">
              <CreditCard className="w-5 h-5" />
              Pay ${totalOwed.toFixed(2)} Online
            </button>
          )}
        </div>

        {totalOwed === 0 && (
          <p className="text-sm text-green-library font-medium mt-2 ml-18">
            Your account is in good standing. Happy reading!
          </p>
        )}
      </div>

      {/* ── Outstanding fines ────────────────────────────────────────────── */}
      {outstanding.length > 0 && (
        <section>
          <h3 className="font-display font-semibold text-brown-deep text-lg mb-4">
            Outstanding Fines
          </h3>
          <div className="bg-parchment border border-sand rounded-xl divide-y divide-sand/60">
            {outstanding.map((fine) => (
              <div key={fine.id} className="flex items-center gap-4 p-5">
                <div className="w-10 h-10 bg-amber-warm/15 rounded-lg flex items-center justify-center shrink-0">
                  <Receipt className="w-5 h-5 text-amber-dark" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-brown-deep">{fine.bookTitle}</p>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    <span className="text-xs text-brown-light">{fine.reason}</span>
                    <span className="text-xs text-brown-light/60">·</span>
                    <span className="text-xs text-brown-light">{fine.daysLate} days late</span>
                    <span className="text-xs text-brown-light/60">·</span>
                    <span className="text-xs text-brown-light">Incurred {fine.date}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display font-bold text-amber-dark text-lg">
                    ${fine.amount.toFixed(2)}
                  </p>
                  <span className="text-xs bg-amber-warm/15 text-amber-dark px-2 py-0.5 rounded-full">
                    Outstanding
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* In-person payment note */}
          <p className="text-xs text-brown-light mt-3 flex items-start gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            You can also pay at the circulation desk. We accept cash, card, and contactless payment.
          </p>
        </section>
      )}

      {/* ── Fine history ──────────────────────────────────────────────────── */}
      {paid.length > 0 && (
        <section>
          <h3 className="font-display font-semibold text-brown-deep text-lg mb-4">
            Payment History
          </h3>
          <div className="bg-parchment border border-sand rounded-xl divide-y divide-sand/60">
            {paid.map((fine) => (
              <div key={fine.id} className="flex items-center gap-4 p-4 opacity-70">
                <div className="w-8 h-8 bg-green-muted rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-library" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-brown-deep">{fine.bookTitle}</p>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    <span className="text-xs text-brown-light">{fine.reason}</span>
                    {fine.paidDate && (
                      <span className="text-xs text-green-library">Paid {fine.paidDate}</span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-brown-light line-through">
                    ${fine.amount.toFixed(2)}
                  </p>
                  <span className="text-xs text-green-library">Paid</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Fine policy ───────────────────────────────────────────────────── */}
      <div className="bg-parchment border border-sand rounded-xl p-5">
        <h4 className="font-display font-semibold text-brown-deep mb-3">Fine Policy</h4>
        <ul className="space-y-1.5 text-sm text-brown-light">
          <li>· Overdue items: $0.25 per day, per item</li>
          <li>· Lost items: replacement cost + $5.00 processing fee</li>
          <li>· Accounts over $5.00 cannot check out new items</li>
          <li>· Fines can be paid online, by phone, or in person</li>
          <li>· Questions? <Link href="/ask-librarian" className="text-amber-dark hover:underline underline-offset-2">Ask a Librarian</Link></li>
        </ul>
      </div>
    </div>
  )
}
