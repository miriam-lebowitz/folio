"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import {
  Search,
  Package,
  Clock,
  Bell,
  CheckCircle,
  Loader2,
  BookOpen,
  Info,
  ArrowRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// ── Mock active ILL requests for the status tracker ─────────────────────────

const MOCK_REQUESTS = [
  {
    id: "ILL-2026-0041",
    title: "The Making of the Atomic Bomb",
    author: "Richard Rhodes",
    format: "Print book",
    submitted: "March 5, 2026",
    status: "In transit",
    statusColor: "bg-amber-warm/15 text-amber-dark border-amber-warm/40",
    eta: "Est. arrival: March 16–20",
  },
  {
    id: "ILL-2026-0037",
    title: "Gödel, Escher, Bach: An Eternal Golden Braid",
    author: "Douglas R. Hofstadter",
    format: "Print book",
    submitted: "February 28, 2026",
    status: "Ready for pickup",
    statusColor: "bg-green-muted/30 text-green-library border-green-muted",
    eta: "Available until March 17, 2026",
  },
]

// ── How ILL works steps ──────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    step: "1",
    icon: <Search className="w-5 h-5" />,
    title: "Submit a request",
    body: "Fill out the form below with the title, author, and format you need. A library card is required.",
  },
  {
    step: "2",
    icon: <Package className="w-5 h-5" />,
    title: "We locate a copy",
    body: "We search our partner library network across New Jersey and nationally. Most items are found within 3–5 business days.",
  },
  {
    step: "3",
    icon: <Bell className="w-5 h-5" />,
    title: "We notify you",
    body: "Once the item arrives at Folio, you'll receive an email or text. Items are held for 7 days.",
  },
  {
    step: "4",
    icon: <BookOpen className="w-5 h-5" />,
    title: "Pick up & enjoy",
    body: "Collect your item at the circulation desk. Loan periods vary by lending library.",
  },
]

// ── Form state ───────────────────────────────────────────────────────────────

type ILLForm = {
  itemType: string
  title: string
  author: string
  publisher: string
  year: string
  isbn: string
  formatPref: string
  reason: string
  firstName: string
  lastName: string
  email: string
  cardNumber: string
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ILLPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState<ILLForm>({
    itemType: "book",
    title: "",
    author: "",
    publisher: "",
    year: "",
    isbn: "",
    formatPref: "print",
    reason: "",
    firstName: "",
    lastName: "",
    email: "",
    cardNumber: "",
  })

  const set =
    (key: keyof ILLForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }))

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="bg-cream min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brown-deep via-brown to-brown-light/70 py-14 px-4">
        <div className="max-w-5xl mx-auto text-cream space-y-3">
          <Badge className="bg-amber-warm/20 text-amber-warm border-amber-warm/30 hover:bg-amber-warm/20">
            ILL Service
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold">Interlibrary Loan</h1>
          <p className="text-cream/75 text-lg max-w-xl">
            Can't find what you need in our collection? We'll borrow it for you from a library
            across New Jersey — or anywhere in the country.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">

        {/* ── How it works ──────────────────────────────────────────── */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-brown-deep">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.step}
                className="relative flex flex-col gap-3 p-5 bg-parchment border border-sand rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-amber-warm/15 rounded-xl flex items-center justify-center text-amber-warm">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-display font-bold text-sand">{step.step}</span>
                </div>
                <div>
                  <p className="font-semibold text-brown-deep text-sm">{step.title}</p>
                  <p className="text-xs text-brown-light mt-1 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Current requests ──────────────────────────────────────── */}
        {MOCK_REQUESTS.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-brown-deep">Your Active Requests</h2>
              <span className="text-sm text-brown-light">{MOCK_REQUESTS.length} requests</span>
            </div>
            <div className="space-y-3">
              {MOCK_REQUESTS.map((req) => (
                <div
                  key={req.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-parchment border border-sand rounded-xl"
                >
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="font-medium text-brown-deep line-clamp-1">{req.title}</p>
                    <p className="text-sm text-brown-light">
                      {req.author} · {req.format}
                    </p>
                    <p className="text-xs text-brown-light/70">
                      Submitted {req.submitted} · ID: {req.id}
                    </p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${req.statusColor}`}
                    >
                      {req.status}
                    </span>
                    <p className="text-xs text-brown-light">{req.eta}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Request form ──────────────────────────────────────────── */}
        <section>
          <div className="bg-parchment border border-sand rounded-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-sand">
              <h2 className="font-display text-xl font-bold text-brown-deep">New ILL Request</h2>
              <p className="text-sm text-brown-light mt-1">
                Provide as much detail as you have. We'll track it down.
              </p>
            </div>

            <div className="px-6 py-6">
              {submitted ? (
                <div className="flex flex-col items-center text-center py-10 gap-4">
                  <div className="w-16 h-16 bg-green-library/15 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-9 h-9 text-green-library" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-brown-deep">
                      Request submitted!
                    </h3>
                    <p className="text-brown-light text-sm mt-1 max-w-sm">
                      We'll start searching our partner network for{" "}
                      <em>{form.title}</em>. You'll receive an update at{" "}
                      <strong>{form.email}</strong> within 3–5 business days.
                    </p>
                  </div>
                  <div className="bg-cream border border-sand rounded-xl p-4 text-left text-sm space-y-1.5 w-full max-w-sm">
                    <p>
                      <span className="text-brown-light">Title:</span>{" "}
                      <span className="font-medium text-brown-deep">{form.title}</span>
                    </p>
                    {form.author && (
                      <p>
                        <span className="text-brown-light">Author:</span>{" "}
                        <span className="font-medium text-brown-deep">{form.author}</span>
                      </p>
                    )}
                    <p>
                      <span className="text-brown-light">Format:</span>{" "}
                      <span className="font-medium text-brown-deep capitalize">{form.formatPref}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setForm({
                        itemType: "book",
                        title: "",
                        author: "",
                        publisher: "",
                        year: "",
                        isbn: "",
                        formatPref: "print",
                        reason: "",
                        firstName: "",
                        lastName: "",
                        email: "",
                        cardNumber: "",
                      })
                    }}
                    className="text-sm text-amber-dark hover:underline flex items-center gap-1"
                  >
                    Submit another request <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Item details */}
                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-brown-deep">Item details</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="itemType">Item type *</Label>
                        <select
                          id="itemType"
                          required
                          value={form.itemType}
                          onChange={set("itemType")}
                          className="flex h-10 w-full rounded-md border border-sand bg-cream px-3 py-2 text-sm text-brown-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-warm"
                        >
                          <option value="book">Book</option>
                          <option value="article">Journal / Article</option>
                          <option value="dvd">DVD / Film</option>
                          <option value="music">Music / CD</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="formatPref">Format preference *</Label>
                        <select
                          id="formatPref"
                          required
                          value={form.formatPref}
                          onChange={set("formatPref")}
                          className="flex h-10 w-full rounded-md border border-sand bg-cream px-3 py-2 text-sm text-brown-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-warm"
                        >
                          <option value="print">Print</option>
                          <option value="digital">Digital / PDF</option>
                          <option value="either">Either (no preference)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        required
                        value={form.title}
                        onChange={set("title")}
                        placeholder="Full title of the item"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="author">Author / Creator</Label>
                        <Input
                          id="author"
                          value={form.author}
                          onChange={set("author")}
                          placeholder="Last name, First name"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="publisher">Publisher</Label>
                        <Input
                          id="publisher"
                          value={form.publisher}
                          onChange={set("publisher")}
                          placeholder="e.g. Penguin, University Press…"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="year">Year of publication</Label>
                        <Input
                          id="year"
                          type="number"
                          min="1800"
                          max="2030"
                          value={form.year}
                          onChange={set("year")}
                          placeholder="e.g. 2019"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="isbn">ISBN / ISSN</Label>
                        <Input
                          id="isbn"
                          value={form.isbn}
                          onChange={set("isbn")}
                          placeholder="e.g. 978-0-06-112008-4"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="reason">Additional notes (optional)</Label>
                      <Textarea
                        id="reason"
                        value={form.reason}
                        onChange={set("reason")}
                        placeholder="e.g. I need a specific edition, a particular chapter, or have a deadline…"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="pt-2 border-t border-sand space-y-4">
                    <p className="text-sm font-semibold text-brown-deep">Your information</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="illFirst">First name *</Label>
                        <Input
                          id="illFirst"
                          required
                          value={form.firstName}
                          onChange={set("firstName")}
                          placeholder="First"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="illLast">Last name *</Label>
                        <Input
                          id="illLast"
                          required
                          value={form.lastName}
                          onChange={set("lastName")}
                          placeholder="Last"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="illEmail">Email address *</Label>
                        <Input
                          id="illEmail"
                          type="email"
                          required
                          value={form.email}
                          onChange={set("email")}
                          placeholder="you@example.com"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="illCard">Library card number *</Label>
                        <Input
                          id="illCard"
                          required
                          value={form.cardNumber}
                          onChange={set("cardNumber")}
                          placeholder="LIB-00000"
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Submit ILL Request
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-brown-light/60 text-center">
                    ILL requests are free for all Maplewood library cardholders. Processing takes 3–10
                    business days.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── Policies & FAQ ─────────────────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-parchment border border-sand rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-warm" />
              <h3 className="font-display text-base font-bold text-brown-deep">Typical Wait Times</h3>
            </div>
            <ul className="text-sm text-brown-light space-y-2">
              {[
                ["Books in NJ network", "3–7 business days"],
                ["Books from national partners", "5–14 business days"],
                ["Journal articles (digital)", "1–3 business days"],
                ["DVDs & specialty items", "7–14 business days"],
              ].map(([item, wait]) => (
                <li key={item} className="flex justify-between">
                  <span>{item}</span>
                  <span className="font-medium text-brown">{wait}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-parchment border border-sand rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-warm" />
              <h3 className="font-display text-base font-bold text-brown-deep">ILL Policies</h3>
            </div>
            <ul className="text-sm text-brown-light space-y-2">
              {[
                "ILL is free for all Folio cardholders in good standing.",
                "Items on hold at Folio or available digitally via Libby/hoopla are not eligible for ILL.",
                "Loan periods are set by the lending library and cannot be extended.",
                "Photocopies of articles may be retained; borrowed physical items must be returned.",
                "Patrons may have up to 5 active ILL requests at one time.",
              ].map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-warm rounded-full shrink-0 mt-1.5" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Try digital first ──────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-amber-warm/10 to-green-muted/20 border border-sand rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-display text-lg font-bold text-brown-deep">Try digital first</h3>
            <p className="text-sm text-brown-light max-w-md">
              Many titles are instantly available via Libby (OverDrive) and hoopla with no wait
              times. Check before submitting an ILL request.
            </p>
          </div>
          <Link
            href="/digital/ebooks"
            className="shrink-0 bg-amber-warm hover:bg-amber-dark text-cream text-sm font-medium px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2"
          >
            Browse Digital Content
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
