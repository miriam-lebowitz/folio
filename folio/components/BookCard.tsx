import Link from "next/link"
import { BookOpen, Star } from "lucide-react"

/** Shared book data shape used throughout the app */
export interface Book {
  id: string
  title: string
  author: string
  genre: string
  cover?: string
  availability: "available" | "checked-out" | "on-hold"
  format?: "print" | "ebook" | "audiobook"
  year?: number
  rating?: number
  description?: string
}

const availabilityConfig: Record<
  Book["availability"],
  { label: string; dot: string; badge: string }
> = {
  available: {
    label: "Available",
    dot: "bg-green-library",
    badge: "bg-green-muted text-green-library",
  },
  "checked-out": {
    label: "Checked Out",
    dot: "bg-amber-warm",
    badge: "bg-muted-sand text-amber-dark",
  },
  "on-hold": {
    label: "On Hold",
    dot: "bg-brown-light",
    badge: "bg-sand/60 text-brown",
  },
}

interface BookCardProps {
  book: Book
  /** "grid" renders a vertical card; "list" renders a compact horizontal row */
  variant?: "grid" | "list"
}

export default function BookCard({ book, variant = "grid" }: BookCardProps) {
  const avail = availabilityConfig[book.availability]

  /* ── List variant ──────────────────────────────────────────────────────── */
  if (variant === "list") {
    return (
      <div className="flex gap-4 p-4 bg-parchment rounded-lg border border-sand hover:border-amber-warm/50 hover:shadow-sm transition-all group">
        {/* Thumbnail */}
        <div className="w-14 h-20 shrink-0 bg-gradient-to-br from-sand to-muted-sand rounded flex items-center justify-center overflow-hidden">
          {book.cover ? (
            <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
          ) : (
            <BookOpen className="w-6 h-6 text-brown-light/50" />
          )}
        </div>

        {/* Meta */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            <Link
              href={`/catalog/${book.id}`}
              className="font-display font-semibold text-brown-deep group-hover:text-amber-dark transition-colors line-clamp-1 leading-snug"
            >
              {book.title}
            </Link>
            <p className="text-sm text-brown-light mt-0.5">{book.author}</p>
          </div>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="text-xs bg-sand/60 text-brown px-2 py-0.5 rounded">{book.genre}</span>
            {book.year && <span className="text-xs text-brown-light">{book.year}</span>}
            {book.format && book.format !== "print" && (
              <span className="text-xs bg-brown-deep/10 text-brown px-2 py-0.5 rounded">
                {book.format === "ebook" ? "eBook" : "Audiobook"}
              </span>
            )}
          </div>
        </div>

        {/* Availability + actions */}
        <div className="flex flex-col items-end justify-between shrink-0 gap-2">
          <span className={`flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${avail.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${avail.dot}`} />
            {avail.label}
          </span>
          <div className="flex gap-1.5">
            <Link
              href={`/catalog/${book.id}`}
              className="text-xs px-3 py-1.5 bg-amber-warm text-cream rounded hover:bg-amber-dark transition-colors"
            >
              View
            </Link>
            <button className="text-xs px-3 py-1.5 border border-sand text-brown rounded hover:border-amber-warm hover:text-amber-dark transition-colors">
              {book.availability === "available" ? "Checkout" : "Hold"}
            </button>
          </div>
        </div>
      </div>
    )
  }

  /* ── Grid variant (default) ────────────────────────────────────────────── */
  return (
    <div className="group flex flex-col bg-parchment rounded-lg border border-sand hover:border-amber-warm/50 hover:shadow-md transition-all overflow-hidden">
      {/* Cover area */}
      <div className="relative h-52 bg-gradient-to-br from-sand to-muted-sand flex items-center justify-center overflow-hidden">
        {book.cover ? (
          <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-brown-light/50">
            <BookOpen className="w-12 h-12" />
            <p className="text-xs text-center px-4 line-clamp-3 font-display text-brown-light leading-snug">
              {book.title}
            </p>
          </div>
        )}

        {/* Non-print format badge */}
        {book.format && book.format !== "print" && (
          <span className="absolute top-2 right-2 text-xs bg-brown-deep/75 text-cream px-2 py-0.5 rounded backdrop-blur-sm">
            {book.format === "ebook" ? "eBook" : "Audio"}
          </span>
        )}
      </div>

      {/* Info section */}
      <div className="p-4 flex flex-col flex-1">
        <Link
          href={`/catalog/${book.id}`}
          className="font-display font-semibold text-brown-deep group-hover:text-amber-dark transition-colors line-clamp-2 leading-snug"
        >
          {book.title}
        </Link>
        <p className="text-sm text-brown-light mt-1">{book.author}</p>

        {/* Star rating */}
        {book.rating !== undefined && (
          <div className="flex items-center gap-1 mt-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.round(book.rating!) ? "text-amber-warm fill-amber-warm" : "text-sand"
                }`}
              />
            ))}
            <span className="text-xs text-brown-light ml-0.5">{book.rating.toFixed(1)}</span>
          </div>
        )}

        {/* Genre + availability */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-brown-light bg-sand/60 px-2 py-0.5 rounded">{book.genre}</span>
          <span className={`flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${avail.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${avail.dot}`} />
            {avail.label}
          </span>
        </div>

        {/* Action buttons */}
        <div className="mt-4 pt-3 border-t border-sand/50 flex gap-2">
          <Link
            href={`/catalog/${book.id}`}
            className="flex-1 text-center text-xs py-1.5 bg-amber-warm text-cream rounded hover:bg-amber-dark transition-colors font-medium"
          >
            View Details
          </Link>
          <button className="flex-1 text-center text-xs py-1.5 border border-sand text-brown rounded hover:border-amber-warm hover:text-amber-dark transition-colors font-medium">
            {book.availability === "available" ? "Checkout" : "Place Hold"}
          </button>
        </div>
      </div>
    </div>
  )
}
