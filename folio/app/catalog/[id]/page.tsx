import { notFound } from "next/navigation"
import Link from "next/link"
import { BookOpen, Star, BookMarked, Share2, Clock, AlertCircle } from "lucide-react"
import BookCard from "@/components/BookCard"
import BookDetailTabs from "./BookDetailTabs"
import { BOOKS, getBook, getRelatedBooks } from "@/lib/data"

// Pre-generate static pages for every book at build time
export function generateStaticParams() {
  return BOOKS.map((book) => ({ id: book.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const book = getBook(id)
  if (!book) return {}
  return {
    title: `${book.title} by ${book.author}`,
    description: book.description,
  }
}

// Availability copy + styling
const availabilityDisplay = {
  available: {
    label: "Available",
    sub: "Ready to check out",
    dot: "bg-green-library",
    badge: "bg-green-muted text-green-library",
    cta: "Checkout",
    ctaStyle: "bg-amber-warm hover:bg-amber-dark text-cream",
  },
  "checked-out": {
    label: "Checked Out",
    sub: "All copies are currently out",
    dot: "bg-amber-warm",
    badge: "bg-muted-sand text-amber-dark",
    cta: "Place Hold",
    ctaStyle: "bg-brown hover:bg-brown-deep text-cream",
  },
  "on-hold": {
    label: "On Hold",
    sub: "Copies reserved by other patrons",
    dot: "bg-brown-light",
    badge: "bg-sand text-brown",
    cta: "Join Waitlist",
    ctaStyle: "bg-brown hover:bg-brown-deep text-cream",
  },
} as const

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const book = getBook(id)

  if (!book) notFound()

  const related = getRelatedBooks(book, 4)
  const avail = availabilityDisplay[book.availability]

  return (
    <div className="flex flex-col">

      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <div className="bg-parchment border-b border-sand py-3 px-4">
        <nav className="max-w-7xl mx-auto text-xs text-brown-light flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-amber-dark transition-colors">Home</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-amber-dark transition-colors">Catalog</Link>
          <span>/</span>
          <Link
            href={`/search?genre=${book.genre.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
            className="hover:text-amber-dark transition-colors"
          >
            {book.genre}
          </Link>
          <span>/</span>
          <span className="text-brown-deep truncate max-w-[200px]">{book.title}</span>
        </nav>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-16">

          {/* ── Left column: Cover + Availability card ─────────────────────── */}
          <div className="lg:col-span-1 space-y-5">
            {/* Book cover */}
            <div className="aspect-[2/3] bg-gradient-to-br from-sand to-muted-sand rounded-xl overflow-hidden flex items-center justify-center shadow-md">
              {book.cover ? (
                <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-3 p-8 text-center">
                  <BookOpen className="w-16 h-16 text-brown-light/40" />
                  <p className="font-display text-lg font-semibold text-brown-light/60 leading-snug">
                    {book.title}
                  </p>
                </div>
              )}
            </div>

            {/* Availability + CTA card */}
            <div className="bg-parchment border border-sand rounded-xl p-5 space-y-4">
              {/* Status */}
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${avail.dot} shrink-0`} />
                <div>
                  <p className="font-semibold text-brown-deep text-sm">{avail.label}</p>
                  <p className="text-xs text-brown-light">{avail.sub}</p>
                </div>
              </div>

              {/* Copy counts */}
              <div className="text-xs text-brown-light space-y-1 pl-5 border-l-2 border-sand/60">
                <p>{book.availableCopies} of {book.totalCopies} {book.totalCopies === 1 ? "copy" : "copies"} available</p>
                {book.waitlistCount > 0 && (
                  <p className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {book.waitlistCount} {book.waitlistCount === 1 ? "person" : "people"} waiting
                  </p>
                )}
              </div>

              {/* Primary CTA */}
              <button
                className={`w-full py-3 rounded-lg font-medium text-sm transition-colors ${avail.ctaStyle}`}
              >
                {avail.cta}
              </button>

              {/* Secondary actions */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-sand rounded-lg text-sm text-brown hover:border-amber-warm hover:text-amber-dark transition-colors">
                  <BookMarked className="w-4 h-4" /> Save
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-sand rounded-lg text-sm text-brown hover:border-amber-warm hover:text-amber-dark transition-colors">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>

              {/* Branch availability note */}
              <p className="text-xs text-brown-light/70 flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                Available at Main Branch. Check other locations for additional copies.
              </p>
            </div>

            {/* Format badge */}
            {book.format && book.format !== "print" && (
              <div className="bg-parchment border border-sand rounded-xl p-4 text-sm">
                <p className="font-medium text-brown-deep mb-1">
                  Also available as {book.format === "ebook" ? "an eBook" : "an Audiobook"}
                </p>
                <Link
                  href="/digital/ebooks"
                  className="text-amber-dark hover:underline underline-offset-2 text-xs"
                >
                  Access through our digital library →
                </Link>
              </div>
            )}
          </div>

          {/* ── Right column: Title, metadata, tabs ────────────────────────── */}
          <div className="lg:col-span-2 space-y-7">
            {/* Title block */}
            <div>
              <span className="inline-block text-xs bg-sand/60 text-brown px-2.5 py-1 rounded mb-3">
                {book.genre}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-brown-deep leading-tight">
                {book.title}
              </h1>
              <p className="text-xl text-brown-light mt-2">
                by{" "}
                <Link
                  href={`/search?q=${encodeURIComponent(book.author)}`}
                  className="hover:text-amber-dark transition-colors"
                >
                  {book.author}
                </Link>
              </p>

              {/* Star rating */}
              {book.rating !== undefined && (
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(book.rating!)
                            ? "text-amber-warm fill-amber-warm"
                            : "text-sand"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-brown-light">
                    {book.rating.toFixed(1)} · {book.reviews.length} patron {book.reviews.length === 1 ? "review" : "reviews"}
                  </span>
                </div>
              )}
            </div>

            {/* Quick metadata grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-parchment rounded-xl border border-sand text-center">
              {[
                { label: "Publisher", value: book.publisher },
                { label: "Year", value: book.year },
                { label: "Pages", value: book.pages.toLocaleString() },
                { label: "Format", value: book.format ? book.format.charAt(0).toUpperCase() + book.format.slice(1) : "Print" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-brown-light uppercase tracking-wide mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-brown-deep">{String(item.value)}</p>
                </div>
              ))}
            </div>

            {/* Tabbed content (description / reviews / details) */}
            <BookDetailTabs book={book} />
          </div>
        </div>

        {/* ── Related Books ─────────────────────────────────────────────────── */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-sand">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-amber-warm font-medium mb-1">
                  You might also like
                </p>
                <h2 className="font-display text-2xl font-bold text-brown-deep">
                  More in {book.genre}
                </h2>
              </div>
              <Link
                href={`/search?genre=${book.genre.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                className="text-sm text-amber-dark hover:text-amber-warm font-medium transition-colors"
              >
                Browse all →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((relBook) => (
                <BookCard key={relBook.id} book={relBook} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
