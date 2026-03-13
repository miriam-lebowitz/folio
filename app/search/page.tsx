import { Suspense } from "react"
import SearchClient from "./SearchClient"
import { getBooks, type BookDetail } from "@/lib/data"

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
    genre?: string
    format?: string
    availability?: string
    sort?: string
  }>
}

export const metadata = {
  title: "Search",
  description: "Search Folio's catalog by title, author, subject, or keyword.",
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // Fetch all books server-side (cached 24 h by Next.js fetch cache) so the
  // client component receives real data without making its own API calls.
  const [params, books] = await Promise.all([
    searchParams,
    getBooks(),
  ])

  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <SearchClient
        initialBooks={books}
        initialQuery={params.q ?? ""}
        initialGenre={params.genre ?? ""}
        initialFormat={params.format ?? ""}
        initialAvailability={params.availability ?? ""}
        initialSort={params.sort ?? "relevance"}
      />
    </Suspense>
  )
}
