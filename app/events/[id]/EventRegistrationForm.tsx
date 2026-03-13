"use client"

import { useState, type FormEvent } from "react"
import { CheckCircle, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type { LibraryEvent } from "@/lib/data"

export default function EventRegistrationForm({ event }: { event: LibraryEvent }) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    attendees: "1",
    notes: "",
  })

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    // Simulate network request for the template
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
        <div className="w-16 h-16 bg-green-library/15 rounded-full flex items-center justify-center">
          <CheckCircle className="w-9 h-9 text-green-library" />
        </div>
        <div className="space-y-1">
          <h3 className="font-display text-xl font-bold text-brown-deep">You're registered!</h3>
          <p className="text-brown-light text-sm max-w-xs">
            A confirmation has been sent to <strong>{form.email}</strong>. We look forward to seeing
            you at <em>{event.title}</em>.
          </p>
        </div>
        <div className="bg-parchment border border-sand rounded-xl p-4 text-left w-full max-w-sm text-sm space-y-1.5">
          <p>
            <span className="font-medium text-brown-deep">Date:</span>{" "}
            <span className="text-brown-light">{event.date}</span>
          </p>
          <p>
            <span className="font-medium text-brown-deep">Time:</span>{" "}
            <span className="text-brown-light">{event.time}</span>
          </p>
          <p>
            <span className="font-medium text-brown-deep">Location:</span>{" "}
            <span className="text-brown-light">{event.location}</span>
          </p>
          <p>
            <span className="font-medium text-brown-deep">Attendees:</span>{" "}
            <span className="text-brown-light">{form.attendees}</span>
          </p>
        </div>
        <p className="text-xs text-brown-light/60">
          Need to cancel? Email events@foliolibrary.org or call (973) 555-0142.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="firstName">First name *</Label>
          <Input
            id="firstName"
            required
            value={form.firstName}
            onChange={set("firstName")}
            placeholder="Miriam"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lastName">Last name *</Label>
          <Input
            id="lastName"
            required
            value={form.lastName}
            onChange={set("lastName")}
            placeholder="Chen"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email address *</Label>
        <Input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={set("email")}
          placeholder="you@example.com"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={set("phone")}
            placeholder="(973) 555-0100"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cardNumber">Library card number</Label>
          <Input
            id="cardNumber"
            value={form.cardNumber}
            onChange={set("cardNumber")}
            placeholder="LIB-00000"
          />
        </div>
      </div>

      {/* Attendee count — only shown for events with limited spots */}
      {event.spotsLeft !== null && (
        <div className="space-y-1.5">
          <Label htmlFor="attendees">Number of attendees *</Label>
          <select
            id="attendees"
            required
            value={form.attendees}
            onChange={set("attendees")}
            className="flex h-10 w-full rounded-md border border-sand bg-cream px-3 py-2 text-sm text-brown-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-warm"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={String(n)}>
                {n} {n === 1 ? "person" : "people"}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="notes">Accessibility needs or notes (optional)</Label>
        <Textarea
          id="notes"
          value={form.notes}
          onChange={set("notes")}
          placeholder="e.g. wheelchair access needed, interpreter requested, dietary restrictions for receptions…"
          rows={3}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Registering…
          </>
        ) : (
          "Complete Registration"
        )}
      </Button>

      <p className="text-xs text-brown-light/60 text-center">
        By registering you agree to receive event reminders by email. Unsubscribe at any time.
      </p>
    </form>
  )
}
