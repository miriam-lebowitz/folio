"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { LayoutGrid, List, SlidersHorizontal, X, Search } from "lucide-react"
import BookCard from "@/components/BookCard"
import { GENRES, type BookDetail } from "@/lib/data"

interface SearchClientProps {
  /** All books fetched server-side and passed down so the client needs no API calls */
  initialBooks: BookDetail[]
  initialQuery: string
  initialGenre: string
  initialFormat: string
  initialAvailability: string
  initialSort: string
}

/** Small helper: a labelled filter row used in the sidebar */
function FilterGroup({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-brown-light">{label}</p>
      {children}
    </div>
  )
}

/** A single filter chip / radio option */
function FilterOption({
  label,
  count,
  selected,
  onClick,
}: {
  label: string
  count?: number
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between text-sm px-3 py-1.5 rounded-lg transition-colors text-left ${
        selected
          ? "bg-amber-warm text-cream font-medium"
          : "text-brown hover:bg-sand/40 hover:text-amber-dark"
      }`}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span className={`text-xs ${selected ? "text-cream/70" : "text-brown-light/70"}`}>
          {count}
        </span>
      )}
    </button>
  )
}

export default function SearchClient({
  initialBooks,
  initialQuery,
  initialGenre,
  initialFormat,
  initialAvailability,
  initialSort,
}: SearchClientProps) {
  const router = useRouter()

  // ── Filter state ───────────────────────────────────────────────────────── //
  const [query, setQuery] = useState(initialQuery)
  const [inputValue, setInputValue] = useState(initialQuery)
  const [genre, setGenre] = useState(initialGenre)
  const [format, setFormat] = useState(initialFormat)
  const [availability, setAvailability] = useState(initialAvailability)
  const [sort, setSort] = useState(initialSort)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Update the URL when filters change (for shareability / back-nav)
  const updateUrl = (overrides: Record<string, string>) => {
    const params = new URLSearchParams()
    const vals = { q: query, genre, format, availability, sort, ...overrides }
    Object.entries(vals).forEach(([k, v]) => { if (v) params.set(k, v) })
    router.replace(`/search?${params.toString()}`, { scroll: false })
  }

  const setGenreAndUpdate = (v: string) => { setGenre(v); updateUrl({ genre: v }) }
  const setFormatAndUpdate = (v: string) => { setFormat(v); updateUrl({ format: v }) }
  const setAvailabilityAndUpdate = (v: string) => { setAvailability(v); updateUrl({ availability: v }) }
  const setSortAndUpdate = (v: string) => { setSort(v); updateUrl({ sort: v }) }

  // ── Filtering ──────────────────────────────────────────────────────────── //
  const results = useMemo(() => {
    let filtered = initialBooks.filter((book) => {
      // Keyword match against title and author
      if (query) {
        const q = query.toLowerCase()
        const match =
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q) ||
          book.genre.toLowerCase().includes(q) ||
          (book.subjects?.some((s) => s.toLowerCase().includes(q)) ?? false)
        if (!match) return false
      }

      // Genre filter — compare by genre ID slug
      if (genre) {
        const bookGenreSlug = book.genre.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")
        if (bookGenreSlug !== genre) return false
      }

      if (format && book.format !== format) return false
      if (availability && book.availability !== availability) return false

      return true
    })

    // Sorting
    switch (sort) {
      case "title-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "title-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title))
        break
      case "author":
        filtered.sort((a, b) => a.author.localeCompare(b.author))
        break
      case "newest":
        filtered.sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
        break
      case "rating":
        filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
        break
      default:
        // "relevance" — no sort change
        break
    }

    return filtered
  }, [initialBooks, query, genre, format, availability, sort])

  // Active filter count (for mobile badge)
  const activeFilterCount = [genre, format, availability].filter(Boolean).length

  // Clear all filters
  const clearAllFilters = () => {
    setGenre("")
    setFormat("")
    setAvailability("")
    updateUrl({ genre: "", format: "", availability: "" })
  }

  // ── Sidebar content (shared between desktop + mobile drawer) ──────────── //
  const FiltersContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-brown-deep">Filters</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-xs text-amber-dark hover:text-amber-dark/70 flex items-center gap-1 transition-colors"
          >
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      {/* Genre */}
      <FilterGroup label="Genre">
        <FilterOption label="All Genres" selected={!genre} onClick={() => setGenreAndUpdate("")} />
        {GENRES.map((g) => (
          <FilterOption
            key={g.id}
            label={g.name}
            count={initialBooks.filter((b) => b.genre.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") === g.id).length}
            selected={genre === g.id}
            onClick={() => setGenreAndUpdate(genre === g.id ? "" : g.id)}
          />
        ))}
      </FilterGroup>

      {/* Format */}
      <FilterGroup label="Format">
        {[
          { id: "", label: "All Formats" },
          { id: "print", label: "Print" },
          { id: "ebook", label: "eBook" },
          { id: "audiobook", label: "Audiobook" },
        ].map((opt) => (
          <FilterOption
            key={opt.id}
            label={opt.label}
            selected={format === opt.id}
            onClick={() => setFormatAndUpdate(opt.id)}
          />
        ))}
      </FilterGroup>

      {/* Availability */}
      <FilterGroup label="Availability">
        {[
          { id: "", label: "All Items" },
          { id: "available", label: "Available Now" },
          { id: "checked-out", label: "Checked Out" },
          { id: "on-hold", label: "On Hold" },
        ].map((opt) => (
          <FilterOption
            key={opt.id}
            label={opt.label}
            selected={availability === opt.id}
            onClick={() => setAvailabilityAndUpdate(opt.id)}
          />
        ))}
      </FilterGroup>
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Search bar header ─────────────────────────────────────────────── */}
      <div className="bg-parchment border-b border-sand py-6 px-4">
        <div className="max-w-7xl mx-auto space-y-4">
          <h1 className="font-display text-2xl font-bold text-brown-deep">
            {query ? `Results for "${query}"` : "Search the Catalog"}
          </h1>

          {/* Search form */}
          <form
            className="flex gap-2 max-w-2xl"
            onSubmit={(e) => {
              e.preventDefault()
              setQuery(inputValue)
              updateUrl({ q: inputValue })
            }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-light pointer-events-none" />
              <input
                type="search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Title, author, subject, ISBN…"
                className="w-full h-11 pl-9 pr-4 rounded-lg border border-sand bg-cream text-brown-deep placeholder:text-brown-light/55 focus:outline-none focus:ring-2 focus:ring-amber-warm focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="h-11 px-5 bg-amber-warm hover:bg-amber-dark text-cream rounded-lg font-medium text-sm transition-colors shrink-0"
            >
              Search
            </button>
          </form>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2">
              {genre && (
                <button
                  onClick={() => setGenreAndUpdate("")}
                  className="flex items-center gap-1.5 text-xs bg-amber-warm/15 text-amber-dark px-3 py-1 rounded-full hover:bg-amber-warm/25 transition-colors"
                >
                  {GENRES.find((g) => g.id === genre)?.name ?? genre}
                  <X className="w-3 h-3" />
                </button>
              )}
              {format && (
                <button
                  onClick={() => setFormatAndUpdate("")}
                  className="flex items-center gap-1.5 text-xs bg-amber-warm/15 text-amber-dark px-3 py-1 rounded-full hover:bg-amber-warm/25 transition-colors"
                >
                  {format.charAt(0).toUpperCase() + format.slice(1)}
                  <X className="w-3 h-3" />
                </button>
              )}
              {availability && (
                <button
                  onClick={() => setAvailabilityAndUpdate("")}
                  className="flex items-center gap-1.5 text-xs bg-amber-warm/15 text-amber-dark px-3 py-1 rounded-full hover:bg-amber-warm/25 transition-colors"
                >
                  {availability === "available" ? "Available Now" : availability === "checked-out" ? "Checked Out" : "On Hold"}
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Main layout ───────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex gap-8 flex-1">

        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
          <div className="sticky top-20">
            <FiltersContent />
          </div>
        </aside>

        {/* Results area */}
        <div className="flex-1 min-w-0 space-y-5">
          {/* Results toolbar */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <p className="text-sm text-brown-light">
              <span className="font-semibold text-brown-deep">{results.length}</span>{" "}
              {results.length === 1 ? "result" : "results"}
              {query && <> for <span className="italic">"{query}"</span></>}
            </p>

            <div className="flex items-center gap-3">
              {/* Mobile filter button */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 text-sm text-brown hover:text-amber-dark border border-sand rounded-lg px-3 py-2 hover:border-amber-warm transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 bg-amber-warm text-cream text-xs rounded-full flex items-center justify-center font-medium">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSortAndUpdate(e.target.value)}
                className="text-sm border border-sand rounded-lg px-3 py-2 bg-cream text-brown focus:outline-none focus:ring-2 focus:ring-amber-warm"
              >
                <option value="relevance">Relevance</option>
                <option value="newest">Newest First</option>
                <option value="title-asc">Title A–Z</option>
                <option value="title-desc">Title Z–A</option>
                <option value="author">Author A–Z</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* View toggle */}
              <div className="flex rounded-lg border border-sand overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${viewMode === "grid" ? "bg-amber-warm text-cream" : "bg-cream text-brown hover:bg-sand/40"}`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${viewMode === "list" ? "bg-amber-warm text-cream" : "bg-cream text-brown hover:bg-sand/40"}`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results grid / list */}
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
              <div className="w-16 h-16 bg-sand/40 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-brown-light/40" />
              </div>
              <h3 className="font-display text-xl font-semibold text-brown-deep">No results found</h3>
              <p className="text-brown-light max-w-sm text-sm">
                Try adjusting your search or removing some filters. Or{" "}
                <button
                  onClick={() => { setQuery(""); setInputValue(""); clearAllFilters() }}
                  className="text-amber-dark underline underline-offset-2 hover:text-amber-dark/80"
                >
                  clear everything
                </button>{" "}
                to browse the full catalog.
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {results.map((book) => (
                <BookCard key={book.id} book={book} variant="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((book) => (
                <BookCard key={book.id} book={book} variant="list" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile filter drawer ─────────────────────────────────────────── */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-brown-deep/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-cream shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-sand sticky top-0 bg-cream">
              <h2 className="font-display font-semibold text-brown-deep">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 text-brown-light hover:text-brown rounded-lg hover:bg-sand/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <FiltersContent />
            </div>
            <div className="sticky bottom-0 p-4 border-t border-sand bg-cream">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3 bg-amber-warm text-cream rounded-lg font-medium hover:bg-amber-dark transition-colors"
              >
                Show {results.length} results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
