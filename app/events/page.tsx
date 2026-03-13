import Link from "next/link"
import { Calendar, MapPin, Clock, Users, ChevronRight, ArrowRight, RefreshCw } from "lucide-react"
import { EVENTS, type LibraryEvent } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

// ── Category config ─────────────────────────────────────────────────────────

const CATEGORIES = [
  { value: "all", label: "All Events" },
  { value: "children", label: "Children" },
  { value: "teen", label: "Teen" },
  { value: "adult", label: "Adult" },
  { value: "all-ages", label: "All Ages" },
]

const categoryStyle: Record<string, { bg: string; text: string; border: string }> = {
  "all-ages": { bg: "bg-amber-warm/15", text: "text-amber-dark", border: "border-amber-warm/40" },
  children: { bg: "bg-green-muted/40", text: "text-green-library", border: "border-green-muted" },
  teen: { bg: "bg-sand/60", text: "text-brown", border: "border-sand" },
  adult: { bg: "bg-parchment", text: "text-brown-deep", border: "border-brown-light/30" },
}

function CategoryBadge({ category }: { category: LibraryEvent["category"] }) {
  const s = categoryStyle[category] ?? categoryStyle.adult
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${s.bg} ${s.text} ${s.border}`}
    >
      {category === "all-ages" ? "All Ages" : category}
    </span>
  )
}

// ── Event card ──────────────────────────────────────────────────────────────

function EventCard({ event }: { event: LibraryEvent }) {
  const isRecurring = event.date.startsWith("Every")
  const spotsPercent =
    event.totalSpots && event.spotsLeft !== null
      ? Math.round(((event.totalSpots - event.spotsLeft) / event.totalSpots) * 100)
      : null

  return (
    <Link
      href={`/events/${event.id}`}
      className="group flex flex-col bg-parchment border border-sand rounded-xl overflow-hidden hover:border-amber-warm/60 hover:shadow-md transition-all"
    >
      {/* Date strip */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-sand/60">
        <div
          className={`flex flex-col items-center justify-center w-14 shrink-0 rounded-lg py-1.5 ${
            isRecurring ? "bg-green-muted/30 text-green-library" : "bg-amber-warm/10 text-amber-dark"
          }`}
        >
          {isRecurring ? (
            <RefreshCw className="w-4 h-4 mb-0.5" />
          ) : (
            <Calendar className="w-4 h-4 mb-0.5" />
          )}
          <span className="text-xs font-semibold leading-tight text-center px-1">{event.date}</span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-brown-deep group-hover:text-amber-dark transition-colors line-clamp-2 leading-snug">
            {event.title}
          </h3>
        </div>
      </div>

      {/* Details */}
      <div className="px-4 py-3 flex-1 space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-brown-light">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          {event.time}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-brown-light">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          {event.location}
        </div>

        {/* Availability bar */}
        {spotsPercent !== null && event.spotsLeft !== null && (
          <div className="space-y-1 pt-0.5">
            <div className="flex justify-between text-xs text-brown-light">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                {event.spotsLeft} spots left
              </span>
              <span>{spotsPercent}% full</span>
            </div>
            <div className="h-1.5 bg-sand rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  spotsPercent >= 80 ? "bg-red-400" : spotsPercent >= 50 ? "bg-amber-warm" : "bg-green-library"
                }`}
                style={{ width: `${spotsPercent}%` }}
              />
            </div>
          </div>
        )}

        {event.spotsLeft === null && (
          <p className="text-xs text-green-library font-medium">Drop-in · No registration needed</p>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 flex items-center justify-between">
        <CategoryBadge category={event.category} />
        <span className="text-xs text-amber-dark font-medium flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          Details <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  )
}

// ── Featured event card ─────────────────────────────────────────────────────

function FeaturedEventCard({ event }: { event: LibraryEvent }) {
  return (
    <div className="relative bg-gradient-to-br from-brown-deep to-brown overflow-hidden rounded-2xl p-6 text-cream flex flex-col justify-between min-h-[220px]">
      {/* Decorative circles */}
      <div className="absolute -top-8 -right-8 w-40 h-40 bg-amber-warm/15 rounded-full" />
      <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-amber-warm/10 rounded-full" />

      <div className="relative space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold bg-amber-warm text-cream px-2.5 py-0.5 rounded-full uppercase tracking-wide">
            Featured
          </span>
          <CategoryBadge category={event.category} />
        </div>

        <div>
          <p className="text-amber-warm/80 text-sm font-medium">{event.date}</p>
          <h2 className="font-display text-2xl font-bold mt-0.5 leading-tight">{event.title}</h2>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-cream/75">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> {event.time}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" /> {event.location}
          </span>
          {event.spotsLeft !== null && (
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" /> {event.spotsLeft} spots remaining
            </span>
          )}
        </div>

        <p className="text-cream/70 text-sm leading-relaxed line-clamp-2">{event.description}</p>
      </div>

      <div className="relative mt-4">
        <Link
          href={`/events/${event.id}`}
          className="inline-flex items-center gap-2 bg-amber-warm hover:bg-amber-dark text-cream font-medium text-sm px-5 py-2.5 rounded-xl transition-colors"
        >
          {event.registrationRequired ? "Register Now" : "Learn More"}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const activeCategory = params.category ?? "all"

  const featured = EVENTS.filter((e) => e.featured)
  const allFiltered =
    activeCategory === "all"
      ? EVENTS.filter((e) => !e.featured)
      : EVENTS.filter((e) => !e.featured && e.category === activeCategory)

  return (
    <div className="bg-cream min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brown-deep via-brown to-brown-light/80 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center text-cream space-y-4">
          <Badge className="bg-amber-warm/20 text-amber-warm border-amber-warm/30 hover:bg-amber-warm/20">
            June 2026
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold">Events & Programs</h1>
          <p className="text-cream/75 text-lg max-w-xl mx-auto">
            Lectures, workshops, story times, and community gatherings — there's always something
            happening at Folio.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2 text-sm">
            {[
              "8 events this month",
              "All ages welcome",
              "Most events are free",
            ].map((s) => (
              <span key={s} className="flex items-center gap-1.5 bg-cream/10 rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 bg-amber-warm rounded-full" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">

        {/* ── Category filter tabs ───────────────────────────────────── */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={cat.value === "all" ? "/events" : `/events?category=${cat.value}`}
              className={`shrink-0 text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
                activeCategory === cat.value
                  ? "bg-amber-warm text-cream border-amber-warm"
                  : "bg-parchment text-brown border-sand hover:border-amber-warm/60 hover:text-amber-dark"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* ── Featured events (only show when viewing All or matching category) ─── */}
        {(activeCategory === "all" ||
          featured.some((e) => e.category === activeCategory)) && (
          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-brown-deep">Featured This Month</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featured
                .filter((e) => activeCategory === "all" || e.category === activeCategory)
                .map((event) => (
                  <FeaturedEventCard key={event.id} event={event} />
                ))}
            </div>
          </section>
        )}

        {/* ── Full event listing ─────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-brown-deep">
              {activeCategory === "all" ? "All Upcoming Events" : `${CATEGORIES.find((c) => c.value === activeCategory)?.label} Programs`}
            </h2>
            <span className="text-sm text-brown-light">{allFiltered.length} events</span>
          </div>

          {allFiltered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allFiltered.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-parchment rounded-2xl border border-sand">
              <Calendar className="w-10 h-10 text-brown-light/40 mx-auto mb-3" />
              <p className="text-brown-light font-medium">
                No {activeCategory} events scheduled right now.
              </p>
              <Link href="/events" className="text-amber-dark hover:underline text-sm mt-2 inline-block">
                View all events →
              </Link>
            </div>
          )}
        </section>

        {/* ── Recurring programs callout ─────────────────────────────── */}
        <div className="bg-parchment border border-sand rounded-xl p-5 flex gap-4">
          <div className="w-10 h-10 bg-amber-warm/15 rounded-full flex items-center justify-center shrink-0">
            <RefreshCw className="w-5 h-5 text-amber-warm" />
          </div>
          <div>
            <h3 className="font-semibold text-brown-deep text-sm">Recurring Programs</h3>
            <p className="text-sm text-brown-light mt-1">
              Several programs — like Toddler Story Time and Chess Club — run on a weekly schedule.
              Look for the recurring icon on event cards. Drop in anytime!
            </p>
          </div>
        </div>

        {/* ── Newsletter CTA ─────────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-amber-warm/10 to-green-muted/20 border border-sand rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-brown-deep">Never miss an event</h3>
            <p className="text-sm text-brown-light mt-1">
              Set your notification preferences to get updates on programs you care about.
            </p>
          </div>
          <Link
            href="/account/notifications"
            className="shrink-0 bg-amber-warm hover:bg-amber-dark text-cream text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            Manage Notifications
          </Link>
        </div>
      </div>
    </div>
  )
}
