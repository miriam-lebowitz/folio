"use client"

import { useState, useMemo } from "react"
import {
  Search,
  PlusCircle,
  Edit2,
  Trash2,
  X,
  CheckCircle,
  Loader2,
  BookOpen,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Filter,
} from "lucide-react"
import { BOOKS, type BookDetail } from "@/lib/data"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// ── Sort config ──────────────────────────────────────────────────────────────

type SortField = "title" | "author" | "year" | "availableCopies"
type SortDir = "asc" | "desc"

// ── Availability badge ────────────────────────────────────────────────────────

function AvailBadge({ book }: { book: BookDetail }) {
  if (book.availableCopies > 0) {
    return (
      <span className="text-xs font-medium text-green-library bg-green-muted/30 border border-green-muted px-2 py-0.5 rounded-full">
        {book.availableCopies}/{book.totalCopies} avail.
      </span>
    )
  }
  if (book.waitlistCount > 0) {
    return (
      <span className="text-xs font-medium text-amber-dark bg-amber-warm/10 border border-amber-warm/30 px-2 py-0.5 rounded-full">
        {book.waitlistCount} holds
      </span>
    )
  }
  return (
    <span className="text-xs font-medium text-brown-light bg-sand/50 border border-sand px-2 py-0.5 rounded-full">
      0/{book.totalCopies} avail.
    </span>
  )
}

// ── Add/Edit form ─────────────────────────────────────────────────────────────

type BookFormData = {
  title: string
  author: string
  genre: string
  format: string
  year: string
  isbn: string
  publisher: string
  totalCopies: string
  description: string
}

const EMPTY_FORM: BookFormData = {
  title: "",
  author: "",
  genre: "",
  format: "print",
  year: "",
  isbn: "",
  publisher: "",
  totalCopies: "1",
  description: "",
}

function BookFormModal({
  book,
  onClose,
  onSave,
}: {
  book: BookDetail | null
  onClose: () => void
  onSave: () => void
}) {
  const [form, setForm] = useState<BookFormData>(
    book
      ? {
          title: book.title,
          author: book.author,
          genre: book.genre,
          format: book.format ?? "print",
          year: String(book.year),
          isbn: book.isbn,
          publisher: book.publisher,
          totalCopies: String(book.totalCopies),
          description: book.description,
        }
      : EMPTY_FORM,
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const set =
    (key: keyof BookFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [key]: e.target.value }))

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    setSaving(false)
    setSaved(true)
    setTimeout(() => {
      onSave()
      onClose()
    }, 700)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-cream w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-sand bg-parchment">
          <h2 className="font-display text-lg font-bold text-brown-deep">
            {book ? "Edit Item" : "Add New Item"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-sand/60 text-brown-light transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="ftitle">Title *</Label>
              <Input id="ftitle" required value={form.title} onChange={set("title")} placeholder="Full title" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="fauthor">Author *</Label>
              <Input id="fauthor" required value={form.author} onChange={set("author")} placeholder="Last, First" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="fgenre">Genre *</Label>
              <Input id="fgenre" required value={form.genre} onChange={set("genre")} placeholder="e.g. Fiction" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="fformat">Format *</Label>
              <select
                id="fformat"
                required
                value={form.format}
                onChange={set("format")}
                className="flex h-10 w-full rounded-md border border-sand bg-cream px-3 text-sm text-brown-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-warm"
              >
                <option value="print">Print</option>
                <option value="ebook">eBook</option>
                <option value="audiobook">Audiobook</option>
                <option value="dvd">DVD</option>
                <option value="magazine">Magazine</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="fyear">Year *</Label>
              <Input id="fyear" type="number" required value={form.year} onChange={set("year")} placeholder="2024" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="fisbn">ISBN</Label>
              <Input id="fisbn" value={form.isbn} onChange={set("isbn")} placeholder="978-0-00-000000-0" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="fpublisher">Publisher</Label>
              <Input id="fpublisher" value={form.publisher} onChange={set("publisher")} placeholder="Publisher name" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="fcopies">Total copies *</Label>
              <Input id="fcopies" type="number" min="1" required value={form.totalCopies} onChange={set("totalCopies")} />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="fdesc">Description</Label>
              <Textarea id="fdesc" value={form.description} onChange={set("description")} rows={3} placeholder="Short synopsis…" />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3 border-t border-sand">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-brown-light hover:text-brown px-4 py-2 rounded-xl hover:bg-sand/40 transition-colors"
            >
              Cancel
            </button>
            <Button type="submit" disabled={saving || saved}>
              {saved ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Saved!
                </>
              ) : saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Saving…
                </>
              ) : book ? (
                "Save Changes"
              ) : (
                "Add to Catalog"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CatalogManagementPage() {
  const [query, setQuery] = useState("")
  const [genreFilter, setGenreFilter] = useState("all")
  const [formatFilter, setFormatFilter] = useState("all")
  const [availFilter, setAvailFilter] = useState("all")
  const [sortField, setSortField] = useState<SortField>("title")
  const [sortDir, setSortDir] = useState<SortDir>("asc")
  const [editBook, setEditBook] = useState<BookDetail | null | undefined>(undefined) // undefined = closed, null = new
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set())

  const genres = ["all", ...Array.from(new Set(BOOKS.map((b) => b.genre))).sort()]
  const formats = ["all", "print", "ebook", "audiobook"]

  const filtered = useMemo(() => {
    let result = BOOKS.filter((b) => !deletedIds.has(b.id))

    if (query) {
      const q = query.toLowerCase()
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.isbn?.toLowerCase().includes(q),
      )
    }
    if (genreFilter !== "all") result = result.filter((b) => b.genre === genreFilter)
    if (formatFilter !== "all") result = result.filter((b) => b.format === formatFilter)
    if (availFilter === "available") result = result.filter((b) => b.availableCopies > 0)
    if (availFilter === "unavailable") result = result.filter((b) => b.availableCopies === 0)
    if (availFilter === "holds") result = result.filter((b) => b.waitlistCount > 0)

    result = [...result].sort((a, b) => {
      let av: string | number = a[sortField] ?? ""
      let bv: string | number = b[sortField] ?? ""
      if (typeof av === "string") av = av.toLowerCase()
      if (typeof bv === "string") bv = bv.toLowerCase()
      if (av < bv) return sortDir === "asc" ? -1 : 1
      if (av > bv) return sortDir === "asc" ? 1 : -1
      return 0
    })

    return result
  }, [query, genreFilter, formatFilter, availFilter, sortField, sortDir, deletedIds])

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDir("asc")
    }
  }

  function SortIcon({ field }: { field: SortField }) {
    if (sortField !== field) return <ChevronsUpDown className="w-3.5 h-3.5 text-brown-light/40" />
    return sortDir === "asc" ? (
      <ChevronUp className="w-3.5 h-3.5 text-amber-warm" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 text-amber-warm" />
    )
  }

  return (
    <div className="space-y-6 max-w-6xl">

      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-brown-deep">Catalog Management</h1>
          <p className="text-brown-light text-sm mt-1">
            {BOOKS.length - deletedIds.size} items · search, filter, add or edit
          </p>
        </div>
        <button
          onClick={() => setEditBook(null)}
          className="flex items-center gap-2 bg-amber-warm hover:bg-amber-dark text-cream text-sm font-medium px-4 py-2.5 rounded-xl transition-colors shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          Add New Item
        </button>
      </div>

      {/* ── Filters ─────────────────────────────────────────────────── */}
      <div className="bg-parchment border border-sand rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative sm:col-span-2 lg:col-span-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-light/50" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, author, ISBN…"
            className="pl-9"
          />
        </div>
        {[
          { id: "genre", value: genreFilter, setter: setGenreFilter, options: genres, label: "Genre" },
          { id: "format", value: formatFilter, setter: setFormatFilter, options: formats, label: "Format" },
          { id: "avail", value: availFilter, setter: setAvailFilter, options: ["all", "available", "unavailable", "holds"], label: "Availability" },
        ].map((f) => (
          <div key={f.id} className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brown-light/50 pointer-events-none" />
            <select
              value={f.value}
              onChange={(e) => f.setter(e.target.value)}
              className="flex h-10 w-full rounded-md border border-sand bg-cream pl-8 pr-3 text-sm text-brown-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-warm"
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
                  { label: "Title", field: "title" as SortField },
                  { label: "Author", field: "author" as SortField },
                  { label: "Genre", field: null },
                  { label: "Format", field: null },
                  { label: "Year", field: "year" as SortField },
                  { label: "Copies", field: "availableCopies" as SortField },
                  { label: "Holds", field: null },
                  { label: "Rating", field: null },
                  { label: "Actions", field: null },
                ].map(({ label, field }) => (
                  <th
                    key={label}
                    className={`px-4 py-3 text-left text-xs font-semibold text-brown-light uppercase tracking-wide whitespace-nowrap ${
                      field ? "cursor-pointer hover:text-brown-deep select-none" : ""
                    }`}
                    onClick={field ? () => toggleSort(field) : undefined}
                  >
                    <span className="flex items-center gap-1">
                      {label}
                      {field && <SortIcon field={field} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-brown-light">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    No items match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((book) => (
                  <tr
                    key={book.id}
                    className="hover:bg-sand/20 transition-colors group"
                  >
                    <td className="px-4 py-3 max-w-[200px]">
                      <p className="font-medium text-brown-deep line-clamp-1">{book.title}</p>
                    </td>
                    <td className="px-4 py-3 text-brown-light whitespace-nowrap">{book.author}</td>
                    <td className="px-4 py-3">
                      <Badge className="bg-sand/50 text-brown border-sand/60 text-xs">
                        {book.genre}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-brown-light capitalize whitespace-nowrap">
                      {book.format}
                    </td>
                    <td className="px-4 py-3 text-brown-light">{book.year}</td>
                    <td className="px-4 py-3">
                      <AvailBadge book={book} />
                    </td>
                    <td className="px-4 py-3 text-brown-light">
                      {book.waitlistCount > 0 ? (
                        <span className="text-amber-dark font-medium">{book.waitlistCount}</span>
                      ) : (
                        <span className="text-brown-light/40">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-brown-light">
                      {book.rating ? `${book.rating} ★` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditBook(book)}
                          className="p-1.5 rounded-lg hover:bg-amber-warm/10 text-brown-light hover:text-amber-dark transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove "${book.title}" from the catalog?`)) {
                              setDeletedIds((s) => new Set([...s, book.id]))
                            }
                          }}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-brown-light hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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
            Showing {filtered.length} of {BOOKS.length - deletedIds.size} items
          </p>
          <p className="text-xs text-brown-light/50">
            Changes are not persisted in this demo
          </p>
        </div>
      </div>

      {/* ── Add/Edit modal ───────────────────────────────────────────── */}
      {editBook !== undefined && (
        <BookFormModal
          book={editBook}
          onClose={() => setEditBook(undefined)}
          onSave={() => setEditBook(undefined)}
        />
      )}
    </div>
  )
}
