"use client"

import { useState, type FormEvent } from "react"
import {
  Users,
  Monitor,
  Mic,
  Wifi,
  CheckCircle,
  ChevronLeft,
  Info,
  Loader2,
  Calendar,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// ── Room data ───────────────────────────────────────────────────────────────

const ROOMS = [
  {
    id: "community-a",
    name: "Community Room A",
    capacity: 50,
    area: "1,200 sq ft",
    description:
      "Our largest event space — ideal for lectures, film screenings, workshops, and community gatherings. Flexible furniture arrangement. ADA accessible with separate A/V control room.",
    features: [
      "Ceiling projector & screen",
      "Wireless microphone system",
      "Whiteboard & markers",
      "Flexible tables & chairs",
      "ADA accessible",
      "A/V control room",
    ],
    featureIcons: [Monitor, Mic, Wifi, Users],
    priceNote: "Free for nonprofits & community groups · $25/hr for commercial use",
    availability: "Mon–Sat during library hours",
    color: "from-amber-warm/20 to-parchment",
  },
  {
    id: "community-b",
    name: "Community Room B",
    capacity: 25,
    area: "600 sq ft",
    description:
      "A versatile medium room for meetings, workshops, and small group activities. Includes a 65″ display and HDMI connectivity.",
    features: [
      '65" display screen',
      "HDMI connection",
      "Whiteboard",
      "Tables & chairs",
      "ADA accessible",
    ],
    featureIcons: [Monitor, Wifi],
    priceNote: "Free for nonprofits & community groups",
    availability: "Mon–Sat during library hours",
    color: "from-green-muted/30 to-parchment",
  },
  {
    id: "teen-room",
    name: "Teen Room (Off-Peak)",
    capacity: 15,
    area: "300 sq ft",
    description:
      "Available to teen-led programs and youth organizations during off-peak hours. Flexible seating, casual atmosphere, gaming setup available select days.",
    features: ["Flexible seating", "Whiteboard", "Gaming setup (select days)"],
    featureIcons: [Users],
    priceNote: "Available to teens and youth organizations only",
    availability: "Weekday afternoons only",
    color: "from-sand/50 to-parchment",
  },
  {
    id: "computer-lab",
    name: "Computer Lab",
    capacity: 15,
    area: "400 sq ft",
    description:
      "15 Windows computers with high-speed internet, ideal for group digital literacy sessions, classes, and tech training. Projector available for instructor use.",
    features: ["15 Windows computers", "High-speed internet", "Printer access", "Instructor projector"],
    featureIcons: [Monitor, Wifi],
    priceNote: "Free for classes and community training",
    availability: "By appointment, during library hours",
    color: "from-brown-light/10 to-parchment",
  },
  {
    id: "study-1",
    name: "Quiet Study Room 1",
    capacity: 4,
    area: "80 sq ft",
    description:
      "Soundproofed study room with whiteboard and power outlets. Perfect for tutoring, focused group study, or remote calls.",
    features: ["Soundproofed walls", "Whiteboard", "Power outlets"],
    featureIcons: [Wifi],
    priceNote: "Always free · 2-hour maximum",
    availability: "Walk-in or reserve up to 7 days ahead",
    color: "from-cream to-parchment",
  },
  {
    id: "study-2",
    name: "Quiet Study Room 2",
    capacity: 4,
    area: "80 sq ft",
    description:
      "Identical to Study Room 1 — soundproofed, with whiteboard and power outlets. Great for a distraction-free session.",
    features: ["Soundproofed walls", "Whiteboard", "Power outlets"],
    featureIcons: [Wifi],
    priceNote: "Always free · 2-hour maximum",
    availability: "Walk-in or reserve up to 7 days ahead",
    color: "from-cream to-parchment",
  },
]

const EQUIPMENT = [
  { name: "Portable Projector", qty: 2, note: "HDMI + USB-C adapters included" },
  { name: "Digital Camera (DSLR)", qty: 1, note: "Canon EOS Rebel · 3-day loan" },
  { name: "Podcast Microphone Kit", qty: 2, note: "USB mic + pop filter + stand" },
  { name: "Laptop (Windows)", qty: 3, note: "Pre-loaded with Office suite · 4-hr loan" },
  { name: "Ring Light & Tripod", qty: 2, note: "For video calls or content creation" },
  { name: "Laminator", qty: 1, note: "In-library use only · up to 5 mil pouches" },
]

// ── Form state types ─────────────────────────────────────────────────────────

type FormState = {
  room: string
  date: string
  startTime: string
  duration: string
  purpose: string
  attendees: string
  firstName: string
  lastName: string
  email: string
  cardNumber: string
  notes: string
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function RoomsPage() {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState<FormState>({
    room: "",
    date: "",
    startTime: "",
    duration: "1",
    purpose: "",
    attendees: "1",
    firstName: "",
    lastName: "",
    email: "",
    cardNumber: "",
    notes: "",
  })

  const set =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const selectedRoom = ROOMS.find((r) => r.id === selectedRoomId) ?? null

  function selectRoom(id: string) {
    setSelectedRoomId(id)
    setForm((prev) => ({ ...prev, room: id }))
    setTimeout(() => {
      document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="bg-cream min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brown-deep via-brown to-brown-light/70 py-14 px-4">
        <div className="max-w-5xl mx-auto text-cream space-y-3">
          <Badge className="bg-amber-warm/20 text-amber-warm border-amber-warm/30 hover:bg-amber-warm/20">
            Meeting Rooms
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold">Room & Equipment Booking</h1>
          <p className="text-cream/75 text-lg max-w-xl">
            Free meeting rooms, study spaces, and tech equipment — available to Maplewood community
            members with a library card.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">

        {/* ── Policy callout ─────────────────────────────────────────── */}
        <div className="flex gap-3 p-4 bg-amber-warm/10 border border-amber-warm/30 rounded-xl">
          <Info className="w-5 h-5 text-amber-warm shrink-0 mt-0.5" />
          <p className="text-sm text-brown-light">
            All rooms require a valid Maplewood library card. Rooms may be reserved up to{" "}
            <strong className="text-brown">30 days in advance</strong>. Study rooms may be booked up
            to 7 days ahead in 2-hour blocks. Commercial use requires prior approval.
          </p>
        </div>

        {/* ── Room grid ──────────────────────────────────────────────── */}
        <section className="space-y-5">
          <h2 className="font-display text-2xl font-bold text-brown-deep">Available Spaces</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ROOMS.map((room) => {
              const isSelected = selectedRoomId === room.id
              return (
                <div
                  key={room.id}
                  className={`flex flex-col rounded-2xl border overflow-hidden transition-all cursor-pointer ${
                    isSelected
                      ? "border-amber-warm ring-2 ring-amber-warm/30 shadow-md"
                      : "border-sand hover:border-amber-warm/60 hover:shadow-sm"
                  }`}
                  onClick={() => selectRoom(room.id)}
                >
                  {/* Color band */}
                  <div className={`h-2 bg-gradient-to-r ${room.color}`} />

                  <div className="flex-1 p-5 space-y-3 bg-parchment">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-brown-deep leading-snug">{room.name}</h3>
                      {isSelected && (
                        <CheckCircle className="w-5 h-5 text-amber-warm shrink-0 mt-0.5" />
                      )}
                    </div>

                    <div className="flex gap-3 text-xs text-brown-light">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        Up to {room.capacity}
                      </span>
                      <span>{room.area}</span>
                    </div>

                    <p className="text-sm text-brown-light line-clamp-3">{room.description}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {room.features.slice(0, 3).map((f) => (
                        <span
                          key={f}
                          className="text-xs bg-sand/50 text-brown px-2 py-0.5 rounded-full"
                        >
                          {f}
                        </span>
                      ))}
                      {room.features.length > 3 && (
                        <span className="text-xs text-brown-light">
                          +{room.features.length - 3} more
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-brown-light border-t border-sand/60 pt-2">
                      {room.priceNote}
                    </p>
                  </div>

                  <div className="px-5 py-3 border-t border-sand bg-parchment">
                    <button
                      className={`w-full text-sm font-medium py-2 rounded-lg transition-colors ${
                        isSelected
                          ? "bg-amber-warm text-cream"
                          : "bg-cream border border-sand text-brown hover:bg-amber-warm/10 hover:border-amber-warm/60"
                      }`}
                    >
                      {isSelected ? "Selected ✓" : "Select this Room"}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Booking form ───────────────────────────────────────────── */}
        <section id="booking-form" className="scroll-mt-8">
          <div className="bg-parchment border border-sand rounded-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-sand">
              <h2 className="font-display text-xl font-bold text-brown-deep">
                {selectedRoom ? `Book: ${selectedRoom.name}` : "Booking Request"}
              </h2>
              <p className="text-sm text-brown-light mt-1">
                {selectedRoom
                  ? `Up to ${selectedRoom.capacity} people · ${selectedRoom.area}`
                  : "Select a room above, then complete the form below."}
              </p>
            </div>

            <div className="px-6 py-6">
              {submitted ? (
                <div className="flex flex-col items-center text-center py-8 gap-4">
                  <div className="w-16 h-16 bg-green-library/15 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-9 h-9 text-green-library" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-brown-deep">
                      Request received!
                    </h3>
                    <p className="text-brown-light text-sm mt-1 max-w-sm">
                      We'll confirm your booking within one business day. A confirmation will be sent
                      to <strong>{form.email}</strong>.
                    </p>
                  </div>
                  <div className="bg-cream border border-sand rounded-xl p-4 text-left text-sm space-y-1.5 w-full max-w-sm">
                    {[
                      ["Room", ROOMS.find((r) => r.id === form.room)?.name ?? form.room],
                      ["Date", form.date],
                      ["Start time", form.startTime],
                      ["Duration", `${form.duration} hour${form.duration !== "1" ? "s" : ""}`],
                      ["Attendees", form.attendees],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-brown-light">{k}</span>
                        <span className="font-medium text-brown-deep">{v}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setSelectedRoomId(null)
                      setForm({
                        room: "",
                        date: "",
                        startTime: "",
                        duration: "1",
                        purpose: "",
                        attendees: "1",
                        firstName: "",
                        lastName: "",
                        email: "",
                        cardNumber: "",
                        notes: "",
                      })
                    }}
                    className="text-sm text-amber-dark hover:underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Room selector (if not already chosen via card) */}
                  <div className="space-y-1.5">
                    <Label htmlFor="room">Room *</Label>
                    <select
                      id="room"
                      required
                      value={form.room}
                      onChange={(e) => {
                        set("room")(e)
                        setSelectedRoomId(e.target.value)
                      }}
                      className="flex h-10 w-full rounded-md border border-sand bg-cream px-3 py-2 text-sm text-brown-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-warm"
                    >
                      <option value="">Select a room…</option>
                      {ROOMS.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name} (up to {r.capacity})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date / time */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="date">Date *</Label>
                      <Input id="date" type="date" required value={form.date} onChange={set("date")} />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="startTime">Start time *</Label>
                      <Input
                        id="startTime"
                        type="time"
                        required
                        value={form.startTime}
                        onChange={set("startTime")}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="duration">Duration *</Label>
                      <select
                        id="duration"
                        required
                        value={form.duration}
                        onChange={set("duration")}
                        className="flex h-10 w-full rounded-md border border-sand bg-cream px-3 py-2 text-sm text-brown-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-warm"
                      >
                        {["1", "2", "3", "4"].map((h) => (
                          <option key={h} value={h}>
                            {h} hour{h !== "1" ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Event details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="purpose">Purpose of booking *</Label>
                      <Input
                        id="purpose"
                        required
                        placeholder="e.g. Book club meeting, tutoring session…"
                        value={form.purpose}
                        onChange={set("purpose")}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="attendees">Expected attendees *</Label>
                      <Input
                        id="attendees"
                        type="number"
                        min="1"
                        required
                        value={form.attendees}
                        onChange={set("attendees")}
                      />
                    </div>
                  </div>

                  {/* Contact info */}
                  <div className="pt-2 border-t border-sand space-y-4">
                    <p className="text-sm font-semibold text-brown-deep">Your information</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="fname">First name *</Label>
                        <Input
                          id="fname"
                          required
                          value={form.firstName}
                          onChange={set("firstName")}
                          placeholder="First"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="lname">Last name *</Label>
                        <Input
                          id="lname"
                          required
                          value={form.lastName}
                          onChange={set("lastName")}
                          placeholder="Last"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="remail">Email *</Label>
                        <Input
                          id="remail"
                          type="email"
                          required
                          value={form.email}
                          onChange={set("email")}
                          placeholder="you@example.com"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="rcardNumber">Library card number *</Label>
                        <Input
                          id="rcardNumber"
                          required
                          value={form.cardNumber}
                          onChange={set("cardNumber")}
                          placeholder="LIB-00000"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="rnotes">
                      Special requests or accessibility needs (optional)
                    </Label>
                    <Textarea
                      id="rnotes"
                      value={form.notes}
                      onChange={set("notes")}
                      placeholder="e.g. need chairs arranged in a circle, ADA entrance required, microphone needed…"
                      rows={3}
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4 mr-2" />
                        Submit Booking Request
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-brown-light/60 text-center">
                    Bookings are subject to approval. You'll receive a confirmation email within 1
                    business day.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── Equipment checkout ─────────────────────────────────────── */}
        <section className="space-y-5">
          <div>
            <h2 className="font-display text-2xl font-bold text-brown-deep">Equipment Checkout</h2>
            <p className="text-brown-light text-sm mt-1">
              Borrow tech equipment with your library card. Request at the circulation desk.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EQUIPMENT.map((item) => (
              <div
                key={item.name}
                className="flex gap-3 p-4 bg-parchment border border-sand rounded-xl"
              >
                <div className="w-9 h-9 bg-sand/50 rounded-lg flex items-center justify-center shrink-0">
                  <Monitor className="w-4 h-4 text-brown-light" />
                </div>
                <div>
                  <p className="font-medium text-brown-deep text-sm">{item.name}</p>
                  <p className="text-xs text-brown-light mt-0.5">{item.note}</p>
                  <p className="text-xs text-green-library mt-1">{item.qty} available</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-brown-light">
            Equipment availability changes daily.{" "}
            <a href="tel:+19735550142" className="text-amber-dark hover:underline">
              Call (973) 555-0142
            </a>{" "}
            to check availability or ask a staff member at the front desk.
          </p>
        </section>

        {/* ── Policies ──────────────────────────────────────────────── */}
        <section className="bg-parchment border border-sand rounded-2xl p-6 space-y-3">
          <h3 className="font-display text-lg font-bold text-brown-deep">Room Use Policies</h3>
          <ul className="text-sm text-brown-light space-y-2">
            {[
              "A valid Folio Library card is required to book any room or borrow equipment.",
              "Rooms must be reserved during library hours. Setup and cleanup time must be included in your booking window.",
              "Rooms are available for non-commercial, community use at no charge. Commercial use requires prior approval and may incur fees.",
              "Groups are responsible for leaving rooms in the same condition they found them.",
              "Amplified music requires advance approval. Catering is allowed in Community Rooms only.",
              "Rooms may not be booked for private fundraising, religious services, or partisan political events.",
              "Cancellations must be made at least 24 hours in advance by contacting the library.",
            ].map((policy) => (
              <li key={policy} className="flex gap-2">
                <span className="w-1.5 h-1.5 bg-amber-warm rounded-full shrink-0 mt-1.5" />
                {policy}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
