"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  /** Override the placeholder text */
  placeholder?: string
  /** Extra classes applied to the form wrapper */
  className?: string
  /** Controls overall height and font size */
  size?: "sm" | "md" | "lg"
  /** Pre-populate the input (e.g. when arriving from another page) */
  defaultValue?: string
}

export default function SearchBar({
  placeholder = "Search by title, author, ISBN, or keyword…",
  className,
  size = "md",
  defaultValue = "",
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const sizeClasses = {
    sm: "h-9 text-sm",
    md: "h-11 text-base",
    lg: "h-14 text-lg",
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex w-full", className)}>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label="Search the catalog"
        className={cn(
          "flex-1 px-4 rounded-l-lg border border-r-0 border-sand bg-cream/90 text-brown-deep",
          "placeholder:text-brown-light/55 focus:outline-none focus:ring-2 focus:ring-amber-warm",
          "focus:border-transparent transition-all",
          sizeClasses[size],
        )}
      />
      <button
        type="submit"
        className={cn(
          "px-5 bg-amber-warm hover:bg-amber-dark text-cream rounded-r-lg transition-colors",
          "flex items-center gap-2 font-medium shrink-0",
          sizeClasses[size],
        )}
        aria-label="Submit search"
      >
        <Search className="w-4 h-4" />
        <span className={size === "sm" ? "sr-only" : "hidden sm:inline"}>Search</span>
      </button>
    </form>
  )
}
