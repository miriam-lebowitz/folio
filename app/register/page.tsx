"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import {
  BookOpen,
  CheckCircle,
  Loader2,
  AlertCircle,
  ChevronRight,
  Gift,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

// ── What you get cards ───────────────────────────────────────────────────────

const BENEFITS = [
  { icon: "📚", text: "Borrow up to 10 items at once" },
  { icon: "📱", text: "Unlimited ebooks via Libby & hoopla" },
  { icon: "🎬", text: "Free streaming films via Kanopy" },
  { icon: "📰", text: "Digital magazines via PressReader" },
  { icon: "🏛️", text: "Free room reservations" },
  { icon: "🤖", text: "Ask a Librarian 24/7 AI chat" },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cardNumber, setCardNumber] = useState("")

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    dob: "",
    agreeTerms: false,
    agreeAge: false,
  })

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
      setForm((p) => ({ ...p, [key]: value }))
    }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    // Generate a mock card number
    const num = `LIB-${String(Math.floor(10000 + Math.random() * 90000))}`
    setCardNumber(num)
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex">

      {/* ── Left panel ────────────────────────────────────────────── */}
      <div className="hidden lg:flex flex-col justify-between w-2/5 bg-gradient-to-br from-brown-deep via-brown to-brown-light/80 p-12 text-cream">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold">Folio</span>
          <span className="text-cream/40 text-sm">Public Library</span>
        </Link>

        <div className="space-y-6">
          <div>
            <div className="w-12 h-1 bg-amber-warm rounded-full mb-4" />
            <h2 className="font-display text-2xl font-bold">Your card. Your community.</h2>
            <p className="text-cream/60 mt-2 text-sm leading-relaxed">
              A Folio library card is free for all Maplewood residents and opens the door to
              thousands of books, films, and digital resources.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-amber-warm uppercase tracking-wide flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5" />
              What you get
            </p>
            {BENEFITS.map((b) => (
              <div key={b.text} className="flex items-center gap-2.5 text-sm text-cream/80">
                <span>{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-cream/30">Always free. No credit card required.</p>
      </div>

      {/* ── Right panel: form ──────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-start px-6 py-12 bg-cream overflow-y-auto">
        <div className="w-full max-w-sm space-y-6">

          {/* Mobile brand */}
          <div className="lg:hidden flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-amber-warm" />
            <span className="font-display font-bold text-brown-deep">Folio Public Library</span>
          </div>

          {submitted ? (
            // ── Success state ──────────────────────────────────────
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-green-library/15 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-9 h-9 text-green-library" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-brown-deep">
                  Welcome to Folio!
                </h1>
                <p className="text-brown-light text-sm mt-1">
                  Your library card application has been received.
                </p>
              </div>
              <div className="bg-parchment border border-sand rounded-xl p-5 text-left space-y-3">
                <p className="text-xs font-semibold text-brown-light uppercase tracking-wide">
                  Your new library card
                </p>
                <p className="font-display text-3xl font-bold text-amber-dark tracking-widest">
                  {cardNumber}
                </p>
                <p className="text-sm text-brown-light">
                  Issued to{" "}
                  <strong className="text-brown-deep">
                    {form.firstName} {form.lastName}
                  </strong>
                </p>
                <div className="pt-2 border-t border-sand space-y-1 text-xs text-brown-light">
                  <p>A confirmation email has been sent to <strong>{form.email}</strong>.</p>
                  <p>Your physical card will arrive by mail within 5–7 business days. You can start borrowing digitally right away!</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  className="block w-full text-center bg-amber-warm hover:bg-amber-dark text-cream font-medium text-sm px-4 py-2.5 rounded-xl transition-colors"
                >
                  Sign In to Your Account
                </Link>
                <Link
                  href="/digital/ebooks"
                  className="block w-full text-center bg-parchment border border-sand hover:bg-sand/40 text-brown font-medium text-sm px-4 py-2.5 rounded-xl transition-colors"
                >
                  Browse Digital Books →
                </Link>
              </div>
            </div>
          ) : (
            // ── Form ──────────────────────────────────────────────
            <>
              <div>
                <h1 className="font-display text-2xl font-bold text-brown-deep">
                  Apply for a Library Card
                </h1>
                <p className="text-brown-light text-sm mt-1">
                  Free for Maplewood, NJ residents. Takes about 2 minutes.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="rfirst">First name *</Label>
                    <Input id="rfirst" required value={form.firstName} onChange={set("firstName")} placeholder="First" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="rlast">Last name *</Label>
                    <Input id="rlast" required value={form.lastName} onChange={set("lastName")} placeholder="Last" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="remail">Email address *</Label>
                  <Input id="remail" type="email" required value={form.email} onChange={set("email")} placeholder="you@example.com" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="rphone">Phone number</Label>
                  <Input id="rphone" type="tel" value={form.phone} onChange={set("phone")} placeholder="(973) 555-0100" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="raddress">Street address *</Label>
                  <Input id="raddress" required value={form.address} onChange={set("address")} placeholder="123 Main Street" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="rcity">City *</Label>
                    <Input id="rcity" required value={form.city} onChange={set("city")} placeholder="Maplewood" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="rzip">ZIP code *</Label>
                    <Input id="rzip" required value={form.zip} onChange={set("zip")} placeholder="07040" maxLength={10} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="rdob">Date of birth *</Label>
                  <Input id="rdob" type="date" required value={form.dob} onChange={set("dob")} />
                  <p className="text-xs text-brown-light/60">
                    Required for account verification. Patrons under 18 need parental consent.
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-sand">
                  <label className="flex gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={form.agreeTerms}
                      onChange={set("agreeTerms")}
                      className="mt-0.5 accent-amber-warm"
                    />
                    <span className="text-sm text-brown-light">
                      I agree to Folio's{" "}
                      <Link href="/about#borrowing" className="text-amber-dark hover:underline">
                        Borrowing Policy
                      </Link>{" "}
                      and{" "}
                      <Link href="/about#code-of-conduct" className="text-amber-dark hover:underline">
                        Code of Conduct
                      </Link>
                      . *
                    </span>
                  </label>
                  <label className="flex gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={form.agreeAge}
                      onChange={set("agreeAge")}
                      className="mt-0.5 accent-amber-warm"
                    />
                    <span className="text-sm text-brown-light">
                      I confirm I am a resident of Maplewood, NJ or surrounding areas. *
                    </span>
                  </label>
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin mr-2" />Submitting…</>
                  ) : (
                    <>Get My Library Card <ChevronRight className="w-4 h-4 ml-1" /></>
                  )}
                </Button>
              </form>

              <p className="text-center text-sm text-brown-light">
                Already have a card?{" "}
                <Link href="/login" className="text-amber-dark hover:underline font-medium">
                  Sign in
                </Link>
              </p>

              <div className="flex items-start gap-2 p-3 bg-amber-warm/8 border border-amber-warm/20 rounded-xl">
                <AlertCircle className="w-4 h-4 text-amber-warm shrink-0 mt-0.5" />
                <p className="text-xs text-brown-light">
                  Cards are available to residents of Maplewood, South Orange, Millburn, and
                  surrounding NJ communities. Non-residents may apply in person with a $25/year fee.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
