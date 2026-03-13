"use client"

import { useState } from "react"
import { Star, ThumbsUp } from "lucide-react"
import type { BookDetail } from "@/lib/data"

interface BookDetailTabsProps {
  book: BookDetail
}

type Tab = "description" | "reviews" | "details"

export default function BookDetailTabs({ book }: BookDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("description")

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "description", label: "Description" },
    { id: "reviews", label: "Reviews", count: book.reviews.length },
    { id: "details", label: "Details" },
  ]

  return (
    <div>
      {/* Tab bar */}
      <div className="flex border-b border-sand gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === tab.id
                ? "border-amber-warm text-amber-dark"
                : "border-transparent text-brown-light hover:text-brown"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-1.5 text-xs bg-sand text-brown-light px-1.5 py-0.5 rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div className="pt-6">

        {/* ── Description ─────────────────────────────────────────────────── */}
        {activeTab === "description" && (
          <div className="prose-library max-w-prose space-y-4">
            <p className="text-brown leading-relaxed text-[1.0625rem]">{book.description}</p>
            {book.subjects.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-sm text-brown-light font-medium mr-1">Subjects:</span>
                {book.subjects.map((subject) => (
                  <a
                    key={subject}
                    href={`/search?q=${encodeURIComponent(subject)}`}
                    className="text-xs bg-sand/60 text-brown px-2.5 py-1 rounded-full hover:bg-amber-warm/20 hover:text-amber-dark transition-colors"
                  >
                    {subject}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Reviews ─────────────────────────────────────────────────────── */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            {/* Average rating summary */}
            {book.rating !== undefined && (
              <div className="flex items-center gap-4 p-4 bg-parchment rounded-lg border border-sand">
                <div className="text-center">
                  <div className="font-display text-4xl font-bold text-brown-deep">
                    {book.rating.toFixed(1)}
                  </div>
                  <div className="flex justify-center mt-1 gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(book.rating!)
                            ? "text-amber-warm fill-amber-warm"
                            : "text-sand"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-brown-light mt-1">
                    {book.reviews.length} review{book.reviews.length !== 1 ? "s" : ""}
                  </div>
                </div>
                <div className="h-12 w-px bg-sand" />
                <p className="text-sm text-brown-light">
                  Based on patron reviews at Folio Public Library.
                </p>
              </div>
            )}

            {book.reviews.length === 0 ? (
              <p className="text-brown-light text-sm italic">
                No reviews yet — be the first to share your thoughts after reading!
              </p>
            ) : (
              book.reviews.map((review) => (
                <div key={review.id} className="border-b border-sand/60 pb-5 last:border-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="font-medium text-brown-deep text-sm">{review.patron}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < review.rating
                                ? "text-amber-warm fill-amber-warm"
                                : "text-sand"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-brown-light shrink-0">{review.date}</span>
                  </div>
                  <p className="text-sm text-brown leading-relaxed">{review.text}</p>
                  <button className="flex items-center gap-1.5 text-xs text-brown-light hover:text-amber-dark mt-3 transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5" /> Helpful
                  </button>
                </div>
              ))
            )}

            {/* Write a review CTA */}
            <div className="pt-2 border-t border-sand">
              <p className="text-sm text-brown-light">
                Read this book?{" "}
                <a href="/login" className="text-amber-dark hover:underline underline-offset-2">
                  Sign in
                </a>{" "}
                to leave a review for other patrons.
              </p>
            </div>
          </div>
        )}

        {/* ── Details ─────────────────────────────────────────────────────── */}
        {activeTab === "details" && (
          <div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
              {[
                { label: "Publisher", value: book.publisher },
                { label: "Publication Year", value: book.year },
                { label: "Pages", value: book.pages.toLocaleString() },
                { label: "ISBN", value: book.isbn },
                { label: "Dewey Decimal", value: book.dewey ?? "—" },
                { label: "Format", value: book.format ? book.format.charAt(0).toUpperCase() + book.format.slice(1) : "Print" },
                { label: "Copies in System", value: book.totalCopies },
                { label: "Currently Available", value: book.availableCopies },
              ].map((row) => (
                <div key={row.label} className="flex flex-col gap-0.5">
                  <dt className="text-brown-light text-xs uppercase tracking-wide">{row.label}</dt>
                  <dd className="text-brown-deep font-medium">{String(row.value)}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  )
}
