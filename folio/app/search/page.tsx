import { Suspense } from "react"
import SearchClient from "./SearchClient"

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
  // Await server-side params and pass them as props to the client component
  // so the initial render is populated without useSearchParams / Suspense complexity
  const params = await searchParams

  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <SearchClient
        initialQuery={params.q ?? ""}
        initialGenre={params.genre ?? ""}
        initialFormat={params.format ?? ""}
        initialAvailability={params.availability ?? ""}
        initialSort={params.sort ?? "relevance"}
      />
    </Suspense>
  )
}
