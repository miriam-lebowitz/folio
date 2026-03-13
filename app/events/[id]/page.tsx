import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock, MapPin, Users, ChevronLeft, Info, RefreshCw } from "lucide-react"
import { EVENTS } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import EventRegistrationForm from "./EventRegistrationForm"
import type { Metadata } from "next"

// ── Static params for SSG ───────────────────────────────────────────────────

export function generateStaticParams() {
  return EVENTS.map((e) => ({ id: e.id }))
}

// ── Dynamic metadata ────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const event = EVENTS.find((e) => e.id === id)
  if (!event) return { title: "Event Not Found" }
  return {
    title: `${event.title} — Folio Public Library`,
    description: event.description,
  }
}

// ── Category label helper ───────────────────────────────────────────────────

const categoryLabel: Record<string, string> = {
  "all-ages": "All Ages",
  children: "Children",
  teen: "Teen",
  adult: "Adult",
}

const categoryBadgeClass: Record<string, string> = {
  "all-ages": "bg-amber-warm/15 text-amber-dark border-amber-warm/40",
  children: "bg-green-muted/40 text-green-library border-green-muted",
  teen: "bg-sand/60 text-brown border-sand",
  adult: "bg-parchment text-brown-deep border-brown-light/30",
}

// ── Page ────────────────────────────────────────────────────────────────────

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const event = EVENTS.find((e) => e.id === id)

  if (!event) notFound()

  const isRecurring = event.date.startsWith("Every")
  const spotsPercent =
    event.totalSpots && event.spotsLeft !== null
      ? Math.round(((event.totalSpots - event.spotsLeft) / event.totalSpots) * 100)
      : null
  const almostFull = spotsPercent !== null && spotsPercent >= 75

  return (
    <div className="bg-cream min-h-screen">

      {/* ── Breadcrumb ────────────────────────────────────────────────── */}
      <div className="border-b border-sand bg-parchment">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-brown-light">
          <Link href="/events" className="flex items-center gap-1 hover:text-amber-dark transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Events & Programs
          </Link>
          <span>/</span>
          <span className="text-brown-deep truncate">{event.title}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left: event details ──────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                {event.featured && (
                  <Badge className="bg-amber-warm text-cream border-amber-warm hover:bg-amber-warm text-xs uppercase tracking-wide">
                    Featured
                  </Badge>
                )}
                <span
                  className={`text-xs font-medium px-2.5 py-0.5 rounded-full border capitalize ${
                    categoryBadgeClass[event.category] ?? categoryBadgeClass.adult
                  }`}
                >
                  {categoryLabel[event.category] ?? event.category}
                </span>
                {isRecurring && (
                  <span className="flex items-center gap-1 text-xs text-green-library bg-green-muted/30 border border-green-muted rounded-full px-2.5 py-0.5">
                    <RefreshCw className="w-3 h-3" />
                    Recurring
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl md:text-4xl font-bold text-brown-deep leading-tight">
                {event.title}
              </h1>
            </div>

            {/* Key info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: <Calendar className="w-5 h-5 text-amber-warm" />,
                  label: "Date",
                  value: event.date,
                },
                {
                  icon: <Clock className="w-5 h-5 text-amber-warm" />,
                  label: "Time",
                  value: event.time,
                },
                {
                  icon: <MapPin className="w-5 h-5 text-amber-warm" />,
                  label: "Location",
                  value: `${event.location} — Folio Public Library`,
                },
                {
                  icon: <Users className="w-5 h-5 text-amber-warm" />,
                  label: "Registration",
                  value: event.registrationRequired
                    ? event.spotsLeft !== null
                      ? `Required · ${event.spotsLeft} of ${event.totalSpots} spots left`
                      : "Required"
                    : "Drop-in — no registration needed",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex gap-3 p-4 bg-parchment rounded-xl border border-sand"
                >
                  <div className="w-9 h-9 bg-amber-warm/10 rounded-lg flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-brown-light uppercase tracking-wide">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-brown-deep mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Seats progress bar */}
            {spotsPercent !== null && event.spotsLeft !== null && (
              <div className="bg-parchment border border-sand rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-brown-deep">Seats remaining</span>
                  <span
                    className={`font-semibold ${
                      almostFull ? "text-red-500" : "text-green-library"
                    }`}
                  >
                    {event.spotsLeft} / {event.totalSpots}
                  </span>
                </div>
                <div className="h-2 bg-sand rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      spotsPercent >= 80
                        ? "bg-red-400"
                        : spotsPercent >= 50
                          ? "bg-amber-warm"
                          : "bg-green-library"
                    }`}
                    style={{ width: `${spotsPercent}%` }}
                  />
                </div>
                {almostFull && (
                  <p className="text-xs text-red-500 font-medium">
                    Almost full — register soon to secure your spot.
                  </p>
                )}
              </div>
            )}

            {/* Description */}
            <div className="space-y-3">
              <h2 className="font-display text-xl font-bold text-brown-deep">About This Event</h2>
              <p className="text-brown leading-relaxed">{event.description}</p>
            </div>

            {/* Drop-in note */}
            {!event.registrationRequired && (
              <div className="flex gap-3 p-4 bg-green-muted/20 border border-green-muted/60 rounded-xl">
                <Info className="w-5 h-5 text-green-library shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-library text-sm">No registration needed</p>
                  <p className="text-brown-light text-sm mt-0.5">
                    This is a drop-in event — just show up! Seating is first-come, first-served.
                  </p>
                </div>
              </div>
            )}

            {/* Recurring note */}
            {isRecurring && (
              <div className="flex gap-3 p-4 bg-amber-warm/10 border border-amber-warm/30 rounded-xl">
                <RefreshCw className="w-5 h-5 text-amber-warm shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-dark text-sm">Recurring program</p>
                  <p className="text-brown-light text-sm mt-0.5">
                    This program runs <strong>{event.date.toLowerCase()}</strong>. Drop in any week
                    — no need to register in advance.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: registration card ─────────────────────────────── */}
          <div className="space-y-4">
            <div className="bg-parchment border border-sand rounded-2xl overflow-hidden sticky top-6">
              <div className="px-6 py-5 border-b border-sand bg-amber-warm/5">
                <h2 className="font-display text-lg font-bold text-brown-deep">
                  {event.registrationRequired ? "Register for this Event" : "Event Information"}
                </h2>
                <p className="text-xs text-brown-light mt-1">
                  {event.registrationRequired
                    ? "Secure your spot — it only takes a minute."
                    : "Free admission · All are welcome"}
                </p>
              </div>

              <div className="px-6 py-5">
                {event.registrationRequired ? (
                  <EventRegistrationForm event={event} />
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2 text-sm">
                      {[
                        ["Date", event.date],
                        ["Time", event.time],
                        ["Location", event.location],
                        ["Cost", "Free"],
                        ["Registration", "Drop-in, no registration"],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span className="text-brown-light">{k}</span>
                          <span className="font-medium text-brown-deep text-right max-w-[60%]">{v}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/events"
                      className="block w-full text-center bg-amber-warm hover:bg-amber-dark text-cream text-sm font-medium px-4 py-2.5 rounded-xl transition-colors mt-4"
                    >
                      Browse All Events
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Questions */}
            <div className="bg-parchment border border-sand rounded-xl p-4 text-sm space-y-1">
              <p className="font-medium text-brown-deep">Questions?</p>
              <p className="text-brown-light">
                Contact us at{" "}
                <a
                  href="mailto:events@foliolibrary.org"
                  className="text-amber-dark hover:underline"
                >
                  events@foliolibrary.org
                </a>{" "}
                or (973) 555-0142.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
