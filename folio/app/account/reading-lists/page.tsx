"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Plus, Trash2, BookMarked, StickyNote } from "lucide-react"
import { mockReadingLists } from "@/lib/account-data"
import type { ReadingList } from "@/lib/account-data"

export default function ReadingListsPage() {
  const [lists] = useState<ReadingList[]>(mockReadingLists)
  const [activeListId, setActiveListId] = useState<string>(lists[0]?.id ?? "")

  const activeList = lists.find((l) => l.id === activeListId) ?? lists[0]

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-brown-deep">Reading Lists</h2>
          <p className="text-brown-light text-sm mt-1">
            Organize books you want to read, have loved, and everything in between.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-amber-warm text-cream rounded-lg hover:bg-amber-dark transition-colors text-sm font-medium shrink-0">
          <Plus className="w-4 h-4" />
          New List
        </button>
      </div>

      <div className="flex gap-6 items-start">
        {/* ── List selector sidebar ────────────────────────────────────── */}
        <div className="w-52 shrink-0 space-y-1">
          {lists.map((list) => (
            <button
              key={list.id}
              onClick={() => setActiveListId(list.id)}
              className={`w-full text-left px-3 py-3 rounded-xl transition-colors ${
                activeListId === list.id
                  ? "bg-amber-warm text-cream"
                  : "hover:bg-sand/40 text-brown"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-sm truncate">{list.name}</span>
                {list.isDefault && (
                  <span className={`text-xs shrink-0 ${activeListId === list.id ? "text-cream/70" : "text-brown-light"}`}>
                    default
                  </span>
                )}
              </div>
              <p className={`text-xs mt-0.5 ${activeListId === list.id ? "text-cream/70" : "text-brown-light"}`}>
                {list.items.length} {list.items.length === 1 ? "book" : "books"}
              </p>
            </button>
          ))}
        </div>

        {/* ── Active list content ──────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          {activeList ? (
            <div className="space-y-4">
              {/* List header */}
              <div className="bg-parchment border border-sand rounded-xl p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display font-semibold text-brown-deep text-xl">
                      {activeList.name}
                      {activeList.isDefault && (
                        <span className="ml-2 text-xs font-normal text-brown-light bg-sand/60 px-2 py-0.5 rounded-full">
                          default
                        </span>
                      )}
                    </h3>
                    {activeList.description && (
                      <p className="text-sm text-brown-light mt-1">{activeList.description}</p>
                    )}
                    <p className="text-xs text-brown-light/60 mt-2">
                      Created {activeList.createdDate} · {activeList.items.length} items
                    </p>
                  </div>
                  {!activeList.isDefault && (
                    <button className="text-xs text-brown-light hover:text-red-500 transition-colors flex items-center gap-1 shrink-0">
                      <Trash2 className="w-3.5 h-3.5" /> Delete list
                    </button>
                  )}
                </div>
              </div>

              {/* Book items */}
              {activeList.items.length === 0 ? (
                <div className="bg-parchment border border-sand rounded-xl p-10 text-center space-y-3">
                  <BookOpen className="w-10 h-10 text-brown-light/30 mx-auto" />
                  <p className="text-brown-light text-sm">This list is empty.</p>
                  <Link
                    href="/catalog"
                    className="inline-block text-sm text-amber-dark hover:underline underline-offset-2"
                  >
                    Browse the catalog to add books
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {activeList.items.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-parchment border border-sand rounded-xl hover:border-amber-warm/40 transition-all group"
                    >
                      {/* Position number */}
                      <span className="w-6 h-6 rounded-full bg-sand/60 flex items-center justify-center text-xs text-brown-light shrink-0 mt-1 font-medium">
                        {index + 1}
                      </span>

                      {/* Thumbnail */}
                      <div className="w-12 h-16 bg-gradient-to-br from-sand to-muted-sand rounded flex items-center justify-center shrink-0">
                        <BookMarked className="w-5 h-5 text-brown-light/40" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <Link
                          href={`/catalog/${item.book.id}`}
                          className="font-display font-semibold text-brown-deep hover:text-amber-dark transition-colors line-clamp-1"
                        >
                          {item.book.title}
                        </Link>
                        <p className="text-sm text-brown-light">{item.book.author}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs bg-sand/60 text-brown px-2 py-0.5 rounded">
                            {item.book.genre}
                          </span>
                          <span className="text-xs text-brown-light/60">Added {item.addedDate}</span>
                        </div>
                        {item.note && (
                          <p className="text-xs text-amber-dark flex items-center gap-1 mt-0.5">
                            <StickyNote className="w-3 h-3" />
                            {item.note}
                          </p>
                        )}
                      </div>

                      {/* Availability */}
                      <div className="shrink-0 flex flex-col items-end gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          item.book.availability === "available"
                            ? "bg-green-muted text-green-library"
                            : "bg-muted-sand text-brown-light"
                        }`}>
                          {item.book.availability === "available" ? "Available" : "Not available"}
                        </span>

                        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.book.availability === "available" ? (
                            <button className="text-xs px-2.5 py-1 bg-amber-warm text-cream rounded hover:bg-amber-dark transition-colors">
                              Checkout
                            </button>
                          ) : (
                            <button className="text-xs px-2.5 py-1 bg-amber-warm text-cream rounded hover:bg-amber-dark transition-colors">
                              Hold
                            </button>
                          )}
                          <button className="text-xs px-2.5 py-1 border border-sand text-brown-light rounded hover:border-red-200 hover:text-red-500 transition-colors">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
