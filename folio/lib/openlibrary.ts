/**
 * Open Library API client
 *
 * The Open Library (openlibrary.org) is a free, open bibliographic database
 * maintained by the Internet Archive. It contains records for millions of books
 * and provides cover images for most popular titles.
 *
 * API docs: https://openlibrary.org/developers/api
 *
 * Two main integration points used here:
 *  1. Books API  — batch metadata fetch by ISBN (publisher, pages, subjects…)
 *  2. Covers CDN — deterministic cover image URLs derived directly from ISBN,
 *                  no API call required; the browser loads them from OL's CDN.
 */

// ── Types ─────────────────────────────────────────────────────────────────────

/** A single book entry from the OL Books API with jscmd=data */
export interface OLBookData {
  title?: string
  authors?: Array<{ key: string; name: string }>
  description?: string | { type: string; value: string }
  cover?: { small?: string; medium?: string; large?: string }
  publishers?: Array<{ name: string }>
  publish_date?: string
  number_of_pages?: number
  subjects?: Array<{ name: string; url: string }>
  notes?: string | { type: string; value: string }
  url?: string
}

/**
 * The response from /api/books is a plain object keyed by "ISBN:xxxxxxxxxx".
 * Each value is an OLBookData record (or absent if the ISBN isn't in OL).
 */
export type OLBooksResponse = Record<string, OLBookData>

// ── Cover helpers ─────────────────────────────────────────────────────────────

/**
 * Builds a deterministic Open Library cover URL from an ISBN.
 *
 * This does NOT require an API call — the browser fetches the image directly
 * from OL's CDN (covers.openlibrary.org). If OL has no cover for the ISBN it
 * returns a 1×1 transparent GIF, so we validate before trusting the URL.
 *
 * Sizes:
 *  - "S" → ~50 px wide  (tiny thumbnail)
 *  - "M" → ~180 px wide (card thumbnail)
 *  - "L" → ~400 px wide (detail page hero)
 */
export function olCoverUrl(isbn: string, size: "S" | "M" | "L" = "L"): string {
  const clean = isbn.replace(/-/g, "")
  return `https://covers.openlibrary.org/b/isbn/${clean}-${size}.jpg`
}

// ── Books API ─────────────────────────────────────────────────────────────────

const OL_BOOKS_ENDPOINT = "https://openlibrary.org/api/books"

/**
 * Batch-fetches metadata for up to ~20 ISBNs in a single HTTP request.
 *
 * Responses are cached by Next.js's built-in fetch cache for 24 hours so that
 * repeated server-side renders (SSG, ISR, or concurrent requests) don't hammer
 * the Open Library API.
 *
 * Returns a map keyed by "ISBN:xxxxxxxxxx" — call `olDataForISBN(response, isbn)`
 * to retrieve the entry for a specific book.
 *
 * Gracefully returns an empty object if the network request fails, so callers
 * can fall back to their own seed data without crashing.
 */
export async function fetchBooksByISBNs(isbns: string[]): Promise<OLBooksResponse> {
  if (isbns.length === 0) return {}

  const bibkeys = isbns
    .map((i) => `ISBN:${i.replace(/-/g, "")}`)
    .join(",")

  const url = `${OL_BOOKS_ENDPOINT}?bibkeys=${bibkeys}&format=json&jscmd=data`

  try {
    const res = await fetch(url, {
      next: { revalidate: 86_400 }, // cache for 24 hours
    })

    if (!res.ok) {
      console.warn(`[OpenLibrary] Books API returned HTTP ${res.status}`)
      return {}
    }

    return (await res.json()) as OLBooksResponse
  } catch (err) {
    console.warn("[OpenLibrary] Fetch failed — using seed data as fallback:", err)
    return {}
  }
}

// ── Extraction helpers ────────────────────────────────────────────────────────

/** Looks up one book's data from a batch response using its ISBN. */
export function olDataForISBN(response: OLBooksResponse, isbn: string): OLBookData | undefined {
  const key = `ISBN:${isbn.replace(/-/g, "")}`
  return response[key]
}

/** Safely extracts a plain-text description from the polymorphic OL field. */
export function extractDescription(d: OLBookData["description"]): string {
  if (!d) return ""
  if (typeof d === "string") return d
  return d.value ?? ""
}

/** Returns the first publisher name, or empty string if unavailable. */
export function extractPublisher(d: OLBookData): string {
  return d.publishers?.[0]?.name ?? ""
}

/**
 * Extracts subject tag names from the OL subjects array.
 * Limits to `limit` entries and filters out very long or URL-heavy strings.
 */
export function extractSubjects(d: OLBookData, limit = 8): string[] {
  return (d.subjects ?? [])
    .map((s) => s.name)
    .filter((name) => name.length < 60)
    .slice(0, limit)
}
