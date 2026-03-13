import { getBooks } from "@/lib/data"
import CatalogClient from "./CatalogClient"

export const metadata = {
  title: "Catalog Management",
}

/**
 * Server component wrapper: fetches the full book list (enriched with Open
 * Library data, cached 24 h) then hands it to the interactive client component.
 */
export default async function CatalogManagementPage() {
  const books = await getBooks()
  return <CatalogClient books={books} />
}
