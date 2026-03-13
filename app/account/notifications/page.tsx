"use client"

import { useState } from "react"
import { Bell, Mail, MessageSquare, CheckCircle, Save } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface NotificationPref {
  id: string
  label: string
  description: string
  category: "checkouts" | "holds" | "account" | "community"
  email: boolean
  sms: boolean
}

const initialPrefs: NotificationPref[] = [
  {
    id: "due-date",
    label: "Due Date Reminders",
    description: "Get reminded 3 days before an item is due.",
    category: "checkouts",
    email: true,
    sms: true,
  },
  {
    id: "overdue",
    label: "Overdue Notices",
    description: "Be notified when an item is past its due date.",
    category: "checkouts",
    email: true,
    sms: false,
  },
  {
    id: "hold-ready",
    label: "Hold Ready for Pickup",
    description: "Get notified when a hold is available at your branch.",
    category: "holds",
    email: true,
    sms: true,
  },
  {
    id: "hold-expiring",
    label: "Hold Expiring Soon",
    description: "A reminder before your pickup window closes.",
    category: "holds",
    email: true,
    sms: false,
  },
  {
    id: "renewal-success",
    label: "Renewal Confirmations",
    description: "Confirmation when an item is successfully renewed.",
    category: "checkouts",
    email: true,
    sms: false,
  },
  {
    id: "fine-added",
    label: "New Fine or Fee",
    description: "Notification when a fine is added to your account.",
    category: "account",
    email: true,
    sms: false,
  },
  {
    id: "events",
    label: "Upcoming Events",
    description: "A weekly digest of events and programs at your branch.",
    category: "community",
    email: false,
    sms: false,
  },
  {
    id: "new-arrivals",
    label: "New Arrivals in My Genres",
    description: "Monthly roundup of new books in genres you've read.",
    category: "community",
    email: false,
    sms: false,
  },
  {
    id: "newsletter",
    label: "Library Newsletter",
    description: "Monthly news, highlights, and staff recommendations.",
    category: "community",
    email: false,
    sms: false,
  },
]

const categoryLabels: Record<string, string> = {
  checkouts: "Checkouts & Renewals",
  holds: "Holds & Pickup",
  account: "Account Activity",
  community: "Community & Events",
}

export default function NotificationsPage() {
  const [prefs, setPrefs] = useState<NotificationPref[]>(initialPrefs)
  const [deliveryEmail, setDeliveryEmail] = useState("patron@library.org")
  const [deliveryPhone, setDeliveryPhone] = useState("(973) 555-0199")
  const [saved, setSaved] = useState(false)

  const togglePref = (id: string, channel: "email" | "sms") => {
    setPrefs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [channel]: !p[channel] } : p)),
    )
    setSaved(false)
  }

  const handleSave = () => {
    // In production, this would call an API
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const categories = Array.from(new Set(prefs.map((p) => p.category)))

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-brown-deep">
            Notification Preferences
          </h2>
          <p className="text-brown-light text-sm mt-1">
            Choose how and when Folio contacts you about your account and library happenings.
          </p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shrink-0 transition-all ${
            saved
              ? "bg-green-muted text-green-library"
              : "bg-amber-warm text-cream hover:bg-amber-dark"
          }`}
        >
          {saved ? (
            <>
              <CheckCircle className="w-4 h-4" /> Saved
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Save Changes
            </>
          )}
        </button>
      </div>

      {/* ── Delivery addresses ───────────────────────────────────────────── */}
      <div className="bg-parchment border border-sand rounded-xl p-5 space-y-4">
        <h3 className="font-display font-semibold text-brown-deep">Delivery Addresses</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brown-light uppercase tracking-wide flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> Email Address
            </label>
            <input
              type="email"
              value={deliveryEmail}
              onChange={(e) => setDeliveryEmail(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-sand bg-cream text-brown-deep text-sm focus:outline-none focus:ring-2 focus:ring-amber-warm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-brown-light uppercase tracking-wide flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" /> Phone (SMS)
            </label>
            <input
              type="tel"
              value={deliveryPhone}
              onChange={(e) => setDeliveryPhone(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-sand bg-cream text-brown-deep text-sm focus:outline-none focus:ring-2 focus:ring-amber-warm"
            />
          </div>
        </div>
      </div>

      {/* ── Channel header row ───────────────────────────────────────────── */}
      <div className="bg-parchment border border-sand rounded-xl overflow-hidden">
        {/* Sticky column headers */}
        <div className="flex items-center px-5 py-3 bg-sand/30 border-b border-sand">
          <div className="flex-1 text-xs font-semibold text-brown-light uppercase tracking-wide">
            Notification
          </div>
          <div className="flex items-center gap-8 shrink-0">
            <div className="w-16 text-center text-xs font-semibold text-brown-light uppercase tracking-wide flex items-center justify-center gap-1">
              <Mail className="w-3.5 h-3.5" /> Email
            </div>
            <div className="w-16 text-center text-xs font-semibold text-brown-light uppercase tracking-wide flex items-center justify-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" /> SMS
            </div>
          </div>
        </div>

        {/* Grouped preference rows */}
        {categories.map((category, catIdx) => {
          const categoryPrefs = prefs.filter((p) => p.category === category)
          return (
            <div key={category}>
              {/* Category label */}
              <div className="px-5 py-2 bg-sand/20 border-y border-sand/50">
                <p className="text-xs font-semibold text-brown uppercase tracking-wide">
                  {categoryLabels[category]}
                </p>
              </div>

              {/* Pref rows */}
              {categoryPrefs.map((pref, i) => (
                <div
                  key={pref.id}
                  className={`flex items-center px-5 py-4 ${
                    i < categoryPrefs.length - 1 ? "border-b border-sand/40" : ""
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <p className="text-sm font-medium text-brown-deep">{pref.label}</p>
                    <p className="text-xs text-brown-light mt-0.5">{pref.description}</p>
                  </div>

                  <div className="flex items-center gap-8 shrink-0">
                    {/* Email toggle */}
                    <div className="w-16 flex justify-center">
                      <Switch
                        checked={pref.email}
                        onCheckedChange={() => togglePref(pref.id, "email")}
                        aria-label={`${pref.label} email notification`}
                      />
                    </div>
                    {/* SMS toggle */}
                    <div className="w-16 flex justify-center">
                      <Switch
                        checked={pref.sms}
                        onCheckedChange={() => togglePref(pref.id, "sms")}
                        aria-label={`${pref.label} SMS notification`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>

      {/* ── Footer note ───────────────────────────────────────────────────── */}
      <div className="flex items-start gap-3 p-4 bg-parchment border border-sand rounded-xl">
        <Bell className="w-4 h-4 text-brown-light shrink-0 mt-0.5" />
        <p className="text-sm text-brown-light">
          Folio will never share your contact information with third parties. Required notices
          (overdue items, account holds) may still be sent regardless of your preferences.
          You can unsubscribe from community emails at any time.
        </p>
      </div>
    </div>
  )
}
