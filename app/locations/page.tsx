import Link from "next/link"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  Bus,
  Accessibility,
  Wifi,
  Printer,
  Monitor,
  Coffee,
  BookOpen,
  ArrowRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// ── Branch data ──────────────────────────────────────────────────────────────

const MAIN_HOURS = [
  { day: "Monday", hours: "9:00 am – 9:00 pm", open: true },
  { day: "Tuesday", hours: "9:00 am – 9:00 pm", open: true },
  { day: "Wednesday", hours: "9:00 am – 9:00 pm", open: true },
  { day: "Thursday", hours: "9:00 am – 9:00 pm", open: true },
  { day: "Friday", hours: "9:00 am – 6:00 pm", open: true },
  { day: "Saturday", hours: "9:00 am – 6:00 pm", open: true },
  { day: "Sunday", hours: "12:00 pm – 5:00 pm", open: true },
]

const AMENITIES = [
  { icon: <Wifi className="w-4 h-4" />, label: "Free Wi-Fi" },
  { icon: <Printer className="w-4 h-4" />, label: "Print, copy & scan" },
  { icon: <Monitor className="w-4 h-4" />, label: "15 public computers" },
  { icon: <Coffee className="w-4 h-4" />, label: "Reading lounge" },
  { icon: <BookOpen className="w-4 h-4" />, label: "Self-checkout kiosks" },
  { icon: <Accessibility className="w-4 h-4" />, label: "Full ADA access" },
]

const ACCESSIBILITY_FEATURES = [
  "Automatic entry doors on all public entrances",
  "Elevator access to all floors",
  "Accessible parking spaces directly in front of the building",
  "Braille and large-print signage throughout",
  "Assistive listening devices available at the Reference Desk",
  "Screen magnifiers and screen-reader software on all public computers",
  "Adjustable-height tables in the reading room",
  "Quiet study rooms available for patrons who need a low-sensory environment",
  "Service animals welcome",
]

// ── Today helper ──────────────────────────────────────────────────────────────

function getTodayHours() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const today = days[new Date().getDay()]
  return MAIN_HOURS.find((h) => h.day === today)
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LocationsPage() {
  const todayHours = getTodayHours()

  return (
    <div className="bg-cream min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brown-deep via-brown to-brown-light/70 py-14 px-4">
        <div className="max-w-5xl mx-auto text-cream space-y-3">
          <Badge className="bg-amber-warm/20 text-amber-warm border-amber-warm/30 hover:bg-amber-warm/20">
            Location & Hours
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            Find Us in Maplewood
          </h1>
          <p className="text-cream/75 text-lg max-w-xl">
            Folio Public Library has served the Maplewood community from 42 Maple Street since
            1924. Open seven days a week.
          </p>
          {todayHours && (
            <div className="flex items-center gap-2 pt-1">
              <span className="flex items-center gap-1.5 text-sm bg-cream/10 rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 bg-green-library rounded-full animate-pulse" />
                Today: {todayHours.hours}
              </span>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">

        {/* ── Main branch card ─────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Map placeholder */}
          <div className="relative rounded-2xl overflow-hidden bg-parchment border border-sand min-h-[320px] flex items-center justify-center">
            {/* Decorative topographic-style background */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 20px, rgba(139,90,43,0.3) 20px, rgba(139,90,43,0.3) 21px)",
              }}
            />
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(139,90,43,0.5) 29px)",
              }}
            />
            <div className="relative text-center space-y-3 p-8">
              <div className="w-12 h-12 bg-amber-warm rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6 text-cream" />
              </div>
              <div>
                <p className="font-display font-bold text-brown-deep text-lg">
                  Folio Public Library
                </p>
                <p className="text-brown-light text-sm mt-1">42 Maple Street</p>
                <p className="text-brown-light text-sm">Maplewood, NJ 07040</p>
              </div>
              <a
                href="https://maps.google.com/?q=42+Maple+Street+Maplewood+NJ+07040"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-amber-dark hover:underline font-medium"
              >
                Get directions <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Contact details */}
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-2xl font-bold text-brown-deep">
                Folio Public Library
              </h2>
              <p className="text-brown-light text-sm mt-1">Main Branch — Est. 1924</p>
            </div>

            <div className="space-y-3">
              {[
                {
                  icon: <MapPin className="w-4 h-4" />,
                  label: "Address",
                  value: "42 Maple Street, Maplewood, NJ 07040",
                },
                {
                  icon: <Phone className="w-4 h-4" />,
                  label: "Phone",
                  value: "(973) 555-0142",
                  href: "tel:+19735550142",
                },
                {
                  icon: <Mail className="w-4 h-4" />,
                  label: "Email",
                  value: "info@foliolibrary.org",
                  href: "mailto:info@foliolibrary.org",
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <div className="w-8 h-8 bg-amber-warm/10 rounded-lg flex items-center justify-center text-amber-warm shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-brown-light font-medium">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-amber-dark hover:underline font-medium">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-brown-deep font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Amenities chips */}
            <div>
              <p className="text-xs font-semibold text-brown-light uppercase tracking-wide mb-2">
                Amenities
              </p>
              <div className="flex flex-wrap gap-2">
                {AMENITIES.map((a) => (
                  <span
                    key={a.label}
                    className="flex items-center gap-1.5 text-xs bg-parchment border border-sand text-brown px-2.5 py-1 rounded-full"
                  >
                    {a.icon}
                    {a.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Hours table ──────────────────────────────────────────── */}
        <section className="bg-parchment border border-sand rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-sand">
            <Clock className="w-5 h-5 text-amber-warm" />
            <h2 className="font-display text-lg font-bold text-brown-deep">Hours of Operation</h2>
          </div>
          <div className="divide-y divide-sand/50">
            {MAIN_HOURS.map((row) => {
              const isToday = row.day === getTodayHours()?.day
              return (
                <div
                  key={row.day}
                  className={`flex items-center justify-between px-5 py-3 ${
                    isToday ? "bg-amber-warm/8" : ""
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      isToday ? "text-amber-dark" : "text-brown-deep"
                    }`}
                  >
                    {row.day}
                    {isToday && (
                      <span className="ml-2 text-xs bg-amber-warm text-cream px-1.5 py-0.5 rounded-full">
                        Today
                      </span>
                    )}
                  </span>
                  <span className={`text-sm ${isToday ? "font-semibold text-amber-dark" : "text-brown-light"}`}>
                    {row.hours}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="px-5 py-3 border-t border-sand bg-sand/10">
            <p className="text-xs text-brown-light">
              Hours may vary on holidays. Check our{" "}
              <Link href="/" className="text-amber-dark hover:underline">
                homepage
              </Link>{" "}
              or social media for holiday announcements.
            </p>
          </div>
        </section>

        {/* ── Getting here ─────────────────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: <Car className="w-5 h-5" />,
              title: "Parking",
              items: [
                "Free municipal lot adjacent to the library (enter on Maple St.)",
                "Dedicated ADA spaces directly in front of the entrance",
                "Street parking available on Maple Street and surrounding blocks",
                "EV charging stations in the municipal lot",
              ],
            },
            {
              icon: <Bus className="w-5 h-5" />,
              title: "Public Transit",
              items: [
                "NJ Transit Bus #21 stops on Maple St. (0.1 miles)",
                "South Orange / Maplewood train station (0.4 miles walk)",
                "Bike racks available at the front entrance",
                "Citi Bike docking station at Springfield Ave.",
              ],
            },
            {
              icon: <Accessibility className="w-5 h-5" />,
              title: "Accessibility",
              items: [
                "Accessible ramp and automatic doors at main entrance",
                "Elevator to all floors",
                "Hearing loop in Community Room A",
                "Large-print and tactile signage throughout",
              ],
            },
          ].map((card) => (
            <div key={card.title} className="bg-parchment border border-sand rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-warm/10 rounded-lg flex items-center justify-center text-amber-warm">
                  {card.icon}
                </div>
                <h3 className="font-semibold text-brown-deep">{card.title}</h3>
              </div>
              <ul className="space-y-1.5">
                {card.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-brown-light">
                    <span className="w-1 h-1 bg-amber-warm rounded-full shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* ── Accessibility features ────────────────────────────────── */}
        <section className="bg-gradient-to-r from-amber-warm/8 to-green-muted/10 border border-sand rounded-2xl p-6 space-y-4">
          <h2 className="font-display text-xl font-bold text-brown-deep flex items-center gap-2">
            <Accessibility className="w-5 h-5 text-amber-warm" />
            Accessibility Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ACCESSIBILITY_FEATURES.map((feature) => (
              <div key={feature} className="flex gap-2 text-sm text-brown-light">
                <span className="w-1.5 h-1.5 bg-green-library rounded-full shrink-0 mt-1.5" />
                {feature}
              </div>
            ))}
          </div>
          <p className="text-sm text-brown-light pt-1">
            Need an accommodation?{" "}
            <a href="tel:+19735550142" className="text-amber-dark hover:underline">
              Call us at (973) 555-0142
            </a>{" "}
            or{" "}
            <Link href="/accessibility" className="text-amber-dark hover:underline">
              read our full Accessibility Statement
            </Link>
            .
          </p>
        </section>

        {/* ── Bookmobile ────────────────────────────────────────────── */}
        <section className="bg-parchment border border-sand rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-center justify-between">
          <div className="space-y-1">
            <h2 className="font-display text-lg font-bold text-brown-deep">📚 Folio Bookmobile</h2>
            <p className="text-sm text-brown-light max-w-md">
              Our bookmobile visits South Orange, Millburn, and nearby neighborhoods every week.
              Check the schedule to find us near you — all library services, no building required.
            </p>
          </div>
          <Link
            href="/events"
            className="shrink-0 bg-amber-warm hover:bg-amber-dark text-cream text-sm font-medium px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2"
          >
            Bookmobile Schedule
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  )
}
