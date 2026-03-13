import Link from "next/link"
import {
  BookOpen,
  Headphones,
  Users,
  ArrowRight,
  CalendarDays,
  Newspaper,
  Rocket,
  Sparkles,
  BookMarked,
  Star,
  Feather,
  ImageIcon,
  Heart,
  User,
  Clock,
  Search,
  CheckCircle,
  Megaphone,
  Tablet,
  MapPin,
} from "lucide-react"
import SearchBar from "@/components/SearchBar"
import BookCard from "@/components/BookCard"
import {
  BOOKS,
  EVENTS,
  ANNOUNCEMENTS,
  GENRES,
  STAFF_PICKS,
  NEW_ARRIVALS,
} from "@/lib/data"

// ── Genre icon mapping ──────────────────────────────────────────────────────── //
const genreIcons: Record<string, React.ReactNode> = {
  fiction: <BookOpen className="w-6 h-6" />,
  mystery: <Search className="w-6 h-6" />,
  "historical-fiction": <Clock className="w-6 h-6" />,
  nonfiction: <Newspaper className="w-6 h-6" />,
  biography: <User className="w-6 h-6" />,
  "science-fiction": <Rocket className="w-6 h-6" />,
  fantasy: <Sparkles className="w-6 h-6" />,
  "young-adult": <BookMarked className="w-6 h-6" />,
  childrens: <Star className="w-6 h-6" />,
  poetry: <Feather className="w-6 h-6" />,
  "graphic-novels": <ImageIcon className="w-6 h-6" />,
  "self-help": <Heart className="w-6 h-6" />,
}

// Category badge colors for events
const categoryColors: Record<string, string> = {
  "all-ages": "bg-amber-warm/15 text-amber-dark",
  children: "bg-green-muted text-green-library",
  teen: "bg-sand text-brown",
  adult: "bg-muted-sand text-brown-deep",
}

// Announcement icon + color
const announcementStyles: Record<string, { icon: React.ReactNode; border: string; bg: string }> = {
  success: { icon: <CheckCircle className="w-5 h-5 text-green-library" />, border: "border-green-muted", bg: "bg-green-muted/30" },
  info: { icon: <Megaphone className="w-5 h-5 text-amber-warm" />, border: "border-amber-warm/40", bg: "bg-amber-warm/10" },
  warning: { icon: <Megaphone className="w-5 h-5 text-amber-dark" />, border: "border-amber-dark/40", bg: "bg-amber-light/10" },
}

export default function HomePage() {
  const staffPickBooks = STAFF_PICKS.map((id) => BOOKS.find((b) => b.id === id)!).filter(Boolean)
  const newArrivalBooks = NEW_ARRIVALS.map((id) => BOOKS.find((b) => b.id === id)!).filter(Boolean)
  const featuredEvents = [...EVENTS].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)).slice(0, 3)

  return (
    <div className="flex flex-col">

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-warm/10 via-parchment to-cream py-24 px-4">
        {/* Soft decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-amber-warm/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-12 w-56 h-56 bg-green-muted/25 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-7">
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-brown-deep leading-tight">
            Discover Your Next<br />
            <span className="text-amber-warm">Great Read</span>
          </h1>

          <p className="text-xl text-brown-light max-w-lg mx-auto leading-relaxed">
            Search over 85,000 books, ebooks, and audiobooks —{" "}
            <span className="text-brown font-medium">free</span> with your library card.
          </p>

          <div className="max-w-2xl mx-auto">
            <SearchBar size="lg" />
          </div>

          {/* Popular search tags */}
          <p className="text-sm text-brown-light">
            Popular:{" "}
            {["fiction", "mystery", "history", "fantasy", "biography"].map((term, i) => (
              <span key={term}>
                <Link
                  href={`/search?q=${term}`}
                  className="hover:text-amber-dark underline underline-offset-2 transition-colors"
                >
                  {term}
                </Link>
                {i < 4 ? <span className="mx-1.5 text-sand">·</span> : ""}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ── Stats strip ─────────────────────────────────────────────────────── */}
      <section className="bg-brown-deep text-cream py-8">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-6 text-center divide-x divide-cream/10">
          {[
            { icon: <BookOpen className="w-5 h-5" />, value: "85,000+", label: "Items in Collection" },
            { icon: <Headphones className="w-5 h-5" />, value: "12,000", label: "eBooks & Audiobooks" },
            { icon: <Users className="w-5 h-5" />, value: "Always Free", label: "For All Residents" },
          ].map((stat) => (
            <div key={stat.label} className="px-4 space-y-1">
              <div className="flex justify-center text-amber-light mb-1">{stat.icon}</div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-amber-light">{stat.value}</div>
              <div className="text-xs sm:text-sm text-cream/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Staff Picks ─────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-warm font-medium mb-1">
              Curated by our librarians
            </p>
            <h2 className="font-display text-3xl font-bold text-brown-deep">Staff Picks</h2>
          </div>
          <Link
            href="/catalog?collection=staff-picks"
            className="flex items-center gap-1 text-sm text-amber-dark hover:text-amber-warm font-medium transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {staffPickBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* ── New Arrivals ────────────────────────────────────────────────────── */}
      <section className="bg-parchment py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-amber-warm font-medium mb-1">
                Just added
              </p>
              <h2 className="font-display text-3xl font-bold text-brown-deep">New Arrivals</h2>
            </div>
            <Link
              href="/catalog?sort=newest"
              className="flex items-center gap-1 text-sm text-amber-dark hover:text-amber-warm font-medium transition-colors"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Horizontally scrollable strip */}
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-thin">
            {newArrivalBooks.map((book) => (
              <div key={book.id} className="flex-shrink-0 w-44 sm:w-48">
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Browse by Genre ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-warm font-medium mb-1">
              Explore the collection
            </p>
            <h2 className="font-display text-3xl font-bold text-brown-deep">Browse by Genre</h2>
          </div>
          <Link
            href="/catalog"
            className="flex items-center gap-1 text-sm text-amber-dark hover:text-amber-warm font-medium transition-colors"
          >
            Full catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {GENRES.map((genre) => (
            <Link
              key={genre.id}
              href={`/search?genre=${genre.id}`}
              className="group flex flex-col items-center gap-2 p-4 bg-parchment border border-sand rounded-lg hover:border-amber-warm/60 hover:bg-amber-warm/5 transition-all text-center"
            >
              <div className="w-11 h-11 rounded-lg bg-sand/50 flex items-center justify-center text-brown-light group-hover:bg-amber-warm group-hover:text-cream transition-colors">
                {genreIcons[genre.id] ?? <BookOpen className="w-6 h-6" />}
              </div>
              <span className="text-sm font-medium text-brown group-hover:text-amber-dark transition-colors leading-tight">
                {genre.name}
              </span>
              <span className="text-xs text-brown-light/70">{genre.count.toLocaleString()}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Library News & Announcements ───────────────────────────────────── */}
      <section className="bg-parchment py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest text-amber-warm font-medium mb-1">
              Stay informed
            </p>
            <h2 className="font-display text-3xl font-bold text-brown-deep">Library News</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ANNOUNCEMENTS.map((ann) => {
              const style = announcementStyles[ann.type]
              return (
                <div
                  key={ann.id}
                  className={`p-5 rounded-lg border ${style.border} ${style.bg} flex flex-col gap-3`}
                >
                  <div className="flex items-start gap-3">
                    {style.icon}
                    <h3 className="font-display font-semibold text-brown-deep leading-snug">{ann.title}</h3>
                  </div>
                  <p className="text-sm text-brown leading-relaxed">{ann.body}</p>
                  <p className="text-xs text-brown-light mt-auto">{ann.date}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-warm font-medium mb-1">
              What's happening
            </p>
            <h2 className="font-display text-3xl font-bold text-brown-deep">Upcoming Events</h2>
          </div>
          <Link
            href="/events"
            className="flex items-center gap-1 text-sm text-amber-dark hover:text-amber-warm font-medium transition-colors"
          >
            Full calendar <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredEvents.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group p-5 bg-parchment border border-sand rounded-lg hover:border-amber-warm/60 hover:shadow-sm transition-all flex flex-col gap-3"
            >
              {event.featured && (
                <span className="inline-flex items-center gap-1 text-xs bg-amber-warm text-cream px-2 py-0.5 rounded-full font-medium w-fit">
                  <Star className="w-3 h-3 fill-cream" /> Featured
                </span>
              )}
              <div>
                <h3 className="font-display font-semibold text-brown-deep group-hover:text-amber-dark transition-colors leading-snug">
                  {event.title}
                </h3>
                <p className="text-sm text-amber-dark mt-1 font-medium">{event.date}</p>
              </div>
              <p className="text-sm text-brown-light line-clamp-2">{event.description}</p>
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-sand/50">
                <div className="flex items-center gap-1.5 text-xs text-brown-light">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {event.time}
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${categoryColors[event.category]}`}>
                  {event.category.replace("-", " ")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Digital Resources CTA ───────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brown to-brown-deep text-cream py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-14 h-14 bg-amber-warm/20 rounded-2xl flex items-center justify-center">
              <Tablet className="w-7 h-7 text-amber-light" />
            </div>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Take the Library Anywhere
          </h2>
          <p className="text-lg text-cream/70 max-w-xl mx-auto leading-relaxed">
            Access thousands of ebooks, audiobooks, and digital magazines — all free with your
            Folio library card. No late fees. No waiting in line.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/digital/ebooks"
              className="px-6 py-3 bg-amber-warm text-cream rounded-lg hover:bg-amber-dark transition-colors font-medium flex items-center gap-2"
            >
              <Headphones className="w-4 h-4" />
              eBooks &amp; Audiobooks
            </Link>
            <Link
              href="/digital/magazines"
              className="px-6 py-3 border border-cream/30 text-cream rounded-lg hover:bg-cream/10 transition-colors font-medium flex items-center gap-2"
            >
              <Newspaper className="w-4 h-4" />
              Digital Magazines
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
