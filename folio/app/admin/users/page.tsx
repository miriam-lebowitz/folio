"use client"

import { useState, useMemo } from "react"
import {
  Search,
  PlusCircle,
  Eye,
  Edit2,
  ShieldOff,
  ShieldCheck,
  X,
  CheckCircle,
  Loader2,
  Users,
  Filter,
} from "lucide-react"
import { PATRONS, type PatronRecord } from "@/lib/admin-data"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// ── Status / role badge helpers ──────────────────────────────────────────────

function StatusBadge({ status }: { status: PatronRecord["status"] }) {
  const config = {
    active: "bg-green-muted/30 text-green-library border-green-muted",
    suspended: "bg-red-50 text-red-500 border-red-200",
    expired: "bg-sand/60 text-brown-light border-sand",
  }[status]
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${config}`}>
      {status}
    </span>
  )
}

function RoleBadge({ role }: { role: PatronRecord["role"] }) {
  const config = {
    patron: "bg-parchment text-brown border-sand/60",
    staff: "bg-amber-warm/10 text-amber-dark border-amber-warm/30",
    admin: "bg-brown-deep/10 text-brown-deep border-brown-deep/20",
  }[role]
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${config}`}>
      {role}
    </span>
  )
}

// ── Patron detail drawer ──────────────────────────────────────────────────────

function PatronDrawer({
  patron,
  onClose,
}: {
  patron: PatronRecord
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-cream w-full max-w-sm shadow-2xl overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-sand bg-parchment sticky top-0">
          <div>
            <p className="font-display font-bold text-brown-deep">{patron.name}</p>
            <p className="text-xs text-brown-light mt-0.5">{patron.cardNumber}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-sand/60 text-brown-light"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 space-y-5">
          {/* Status row */}
          <div className="flex gap-2">
            <StatusBadge status={patron.status} />
            <RoleBadge role={patron.role} />
          </div>

          {/* Contact info */}
          <div className="bg-parchment border border-sand rounded-xl p-4 space-y-2.5 text-sm">
            <p className="font-semibold text-brown-deep text-xs uppercase tracking-wide">
              Contact
            </p>
            {[
              ["Email", patron.email],
              ["Phone", patron.phone],
              ["Member since", patron.memberSince],
              ["Last visit", patron.lastVisit],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-2">
                <span className="text-brown-light shrink-0">{k}</span>
                <span className="font-medium text-brown-deep text-right">{v}</span>
              </div>
            ))}
          </div>

          {/* Library activity */}
          <div className="bg-parchment border border-sand rounded-xl p-4 space-y-2.5 text-sm">
            <p className="font-semibold text-brown-deep text-xs uppercase tracking-wide">
              Library Activity
            </p>
            {[
              ["Active checkouts", patron.activeCheckouts],
              ["Holds", patron.holdsCount],
              ["Total checkouts (all time)", patron.totalCheckouts],
              ["Fines owed", patron.finesOwed > 0 ? `$${patron.finesOwed.toFixed(2)}` : "None"],
            ].map(([k, v]) => (
              <div key={String(k)} className="flex justify-between gap-2">
                <span className="text-brown-light shrink-0">{k}</span>
                <span
                  className={`font-medium text-right ${
                    k === "Fines owed" && patron.finesOwed > 0 ? "text-red-500" : "text-brown-deep"
                  }`}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Button className="w-full" variant="outline">
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Patron
            </Button>
            {patron.status === "active" ? (
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-500 border border-red-200 rounded-xl hover:bg-red-50 transition-colors">
                <ShieldOff className="w-4 h-4" />
                Suspend Account
              </button>
            ) : (
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-green-library border border-green-muted rounded-xl hover:bg-green-muted/20 transition-colors">
                <ShieldCheck className="w-4 h-4" />
                Reactivate Account
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── New patron form modal ────────────────────────────────────────────────────

function NewPatronModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "patron",
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value }))

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    setSaving(false)
    setSaved(true)
    setTimeout(onClose, 800)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-cream w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-sand bg-parchment">
          <h2 className="font-display text-lg font-bold text-brown-deep">Register New Patron</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-sand/60 text-brown-light"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="nfirst">First name *</Label>
              <Input id="nfirst" required value={form.firstName} onChange={set("firstName")} placeholder="First" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="nlast">Last name *</Label>
              <Input id="nlast" required value={form.lastName} onChange={set("lastName")} placeholder="Last" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="nemail">Email address *</Label>
            <Input id="nemail" type="email" required value={form.email} onChange={set("email")} placeholder="patron@example.com" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="nphone">Phone</Label>
            <Input id="nphone" type="tel" value={form.phone} onChange={set("phone")} placeholder="(973) 555-0100" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="nrole">Role</Label>
            <select
              id="nrole"
              value={form.role}
              onChange={set("role")}
              className="flex h-10 w-full rounded-md border border-sand bg-cream px-3 text-sm text-brown-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-warm"
            >
              <option value="patron">Patron</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <p className="text-xs text-brown-light/60">
            A library card number will be automatically generated. A welcome email with card details will be sent.
          </p>

          <div className="flex justify-end gap-3 pt-2 border-t border-sand">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-brown-light hover:text-brown px-4 py-2 rounded-xl hover:bg-sand/40 transition-colors"
            >
              Cancel
            </button>
            <Button type="submit" disabled={saving || saved}>
              {saved ? (
                <><CheckCircle className="w-4 h-4 mr-2" />Registered!</>
              ) : saving ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-2" />Saving…</>
              ) : (
                "Register Patron"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const [query, setQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewPatron, setViewPatron] = useState<PatronRecord | null>(null)
  const [showNewModal, setShowNewModal] = useState(false)

  const filtered = useMemo(() => {
    let result = [...PATRONS]
    if (query) {
      const q = query.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.email.toLowerCase().includes(q) ||
          p.cardNumber.toLowerCase().includes(q),
      )
    }
    if (roleFilter !== "all") result = result.filter((p) => p.role === roleFilter)
    if (statusFilter !== "all") result = result.filter((p) => p.status === statusFilter)
    return result
  }, [query, roleFilter, statusFilter])

  const counts = useMemo(
    () => ({
      total: PATRONS.length,
      active: PATRONS.filter((p) => p.status === "active").length,
      suspended: PATRONS.filter((p) => p.status === "suspended").length,
      staff: PATRONS.filter((p) => p.role === "staff" || p.role === "admin").length,
    }),
    [],
  )

  return (
    <div className="space-y-6 max-w-6xl">

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brown-deep">User Management</h1>
          <p className="text-brown-light text-sm mt-1">
            {counts.total} patrons · {counts.active} active · {counts.staff} staff/admin
          </p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 bg-amber-warm hover:bg-amber-dark text-cream text-sm font-medium px-4 py-2.5 rounded-xl transition-colors shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Register New Patron
        </button>
      </div>

      {/* ── Stat pills ──────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: "All patrons", value: counts.total, filter: "all", status: "all" },
          { label: "Active", value: counts.active, filter: "all", status: "active" },
          { label: "Suspended", value: counts.suspended, filter: "all", status: "suspended" },
          { label: "Staff & Admin", value: counts.staff, filter: "staff+admin", status: "all" },
        ].map((pill) => (
          <button
            key={pill.label}
            onClick={() => {
              setStatusFilter(pill.status)
              if (pill.filter === "staff+admin") setRoleFilter("staff")
              else setRoleFilter("all")
            }}
            className="flex items-center gap-2 bg-parchment border border-sand hover:border-amber-warm/60 text-brown text-sm px-3 py-1.5 rounded-full transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-amber-warm" />
            {pill.label}
            <span className="font-semibold text-brown-deep">{pill.value}</span>
          </button>
        ))}
      </div>

      {/* ── Filters ─────────────────────────────────────────────────── */}
      <div className="bg-parchment border border-sand rounded-xl p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-light/50" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, or card number…"
            className="pl-9"
          />
        </div>
        {[
          {
            value: roleFilter,
            setter: setRoleFilter,
            options: ["all", "patron", "staff", "admin"],
            label: "Role",
          },
          {
            value: statusFilter,
            setter: setStatusFilter,
            options: ["all", "active", "suspended", "expired"],
            label: "Status",
          },
        ].map((f) => (
          <div key={f.label} className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brown-light/50 pointer-events-none" />
            <select
              value={f.value}
              onChange={(e) => f.setter(e.target.value)}
              className="flex h-10 rounded-md border border-sand bg-cream pl-8 pr-8 text-sm text-brown-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-warm"
            >
              {f.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === "all" ? `All ${f.label}s` : opt.charAt(0).toUpperCase() + opt.slice(1)}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* ── Table ───────────────────────────────────────────────────── */}
      <div className="bg-parchment border border-sand rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sand bg-sand/20">
                {[
                  "Patron",
                  "Card #",
                  "Email",
                  "Role",
                  "Status",
                  "Checkouts",
                  "Fines",
                  "Member Since",
                  "Actions",
                ].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-xs font-semibold text-brown-light uppercase tracking-wide whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-brown-light">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    No patrons match your search.
                  </td>
                </tr>
              ) : (
                filtered.map((patron) => (
                  <tr
                    key={patron.id}
                    className="hover:bg-sand/20 transition-colors group cursor-pointer"
                    onClick={() => setViewPatron(patron)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-amber-warm/20 rounded-full flex items-center justify-center text-amber-dark text-xs font-bold shrink-0">
                          {patron.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                        <span className="font-medium text-brown-deep whitespace-nowrap">
                          {patron.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-brown-light font-mono text-xs whitespace-nowrap">
                      {patron.cardNumber}
                    </td>
                    <td className="px-4 py-3 text-brown-light text-xs max-w-[160px] truncate">
                      {patron.email}
                    </td>
                    <td className="px-4 py-3">
                      <RoleBadge role={patron.role} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={patron.status} />
                    </td>
                    <td className="px-4 py-3 text-brown-light">
                      <span className="font-medium text-brown-deep">{patron.activeCheckouts}</span>
                      <span className="text-brown-light/60">/{patron.totalCheckouts}</span>
                    </td>
                    <td className="px-4 py-3">
                      {patron.finesOwed > 0 ? (
                        <span className="text-red-500 font-medium">
                          ${patron.finesOwed.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-brown-light/40">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-brown-light text-xs whitespace-nowrap">
                      {patron.memberSince}
                    </td>
                    <td
                      className="px-4 py-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setViewPatron(patron)}
                          className="p-1.5 rounded-lg hover:bg-amber-warm/10 text-brown-light hover:text-amber-dark transition-colors"
                          title="View"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          className="p-1.5 rounded-lg hover:bg-amber-warm/10 text-brown-light hover:text-amber-dark transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {patron.status === "active" ? (
                          <button
                            className="p-1.5 rounded-lg hover:bg-red-50 text-brown-light hover:text-red-500 transition-colors"
                            title="Suspend"
                          >
                            <ShieldOff className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            className="p-1.5 rounded-lg hover:bg-green-muted/20 text-brown-light hover:text-green-library transition-colors"
                            title="Reactivate"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-sand bg-sand/10 flex items-center justify-between">
          <p className="text-xs text-brown-light">
            Showing {filtered.length} of {PATRONS.length} patrons
          </p>
          <p className="text-xs text-brown-light/50">Click any row to view patron details</p>
        </div>
      </div>

      {/* ── Patron detail drawer ─────────────────────────────────────── */}
      {viewPatron && (
        <PatronDrawer patron={viewPatron} onClose={() => setViewPatron(null)} />
      )}

      {/* ── New patron modal ─────────────────────────────────────────── */}
      {showNewModal && <NewPatronModal onClose={() => setShowNewModal(false)} />}
    </div>
  )
}
