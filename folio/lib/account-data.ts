import type { BookDetail } from "./data"
import { BOOKS } from "./data"

// ── Types ──────────────────────────────────────────────────────────────────── //

export interface CheckoutItem {
  id: string
  book: BookDetail
  checkedOutDate: string
  dueDate: string
  /** Raw ISO-style date for computing "days overdue" comparisons in UI */
  dueDateRaw: string
  renewalCount: number
  maxRenewals: number
  status: "active" | "overdue" | "returned"
  returnedDate?: string
}

export interface HoldItem {
  id: string
  book: BookDetail
  status: "waiting" | "ready" | "cancelled"
  position?: number
  totalWaiting?: number
  estimatedWait?: string
  placedDate: string
  /** Pickup expiry (only set when status is "ready") */
  expiresDate?: string
}

export interface FineItem {
  id: string
  bookTitle: string
  amount: number
  daysLate: number
  reason: string
  date: string
  status: "outstanding" | "paid"
  paidDate?: string
}

export interface ReadingListItem {
  id: string
  book: BookDetail
  addedDate: string
  note?: string
}

export interface ReadingList {
  id: string
  name: string
  description?: string
  isDefault: boolean
  items: ReadingListItem[]
  createdDate: string
}

// ── Current Checkouts ─────────────────────────────────────────────────────── //

export const mockCurrentCheckouts: CheckoutItem[] = [
  {
    id: "co1",
    book: BOOKS.find((b) => b.id === "1")!,
    checkedOutDate: "June 1, 2026",
    dueDate: "June 22, 2026",
    dueDateRaw: "2026-06-22",
    renewalCount: 0,
    maxRenewals: 2,
    status: "active",
  },
  {
    id: "co2",
    book: BOOKS.find((b) => b.id === "7")!,
    checkedOutDate: "May 28, 2026",
    dueDate: "June 18, 2026",
    dueDateRaw: "2026-06-18",
    renewalCount: 1,
    maxRenewals: 2,
    status: "active",
  },
  {
    id: "co3",
    book: BOOKS.find((b) => b.id === "10")!,
    checkedOutDate: "May 13, 2026",
    dueDate: "June 3, 2026",
    dueDateRaw: "2026-06-03",
    renewalCount: 2,
    maxRenewals: 2,
    status: "overdue",
  },
]

// ── Past Checkouts ────────────────────────────────────────────────────────── //

export const mockPastCheckouts: CheckoutItem[] = [
  {
    id: "ph1",
    book: BOOKS.find((b) => b.id === "3")!,
    checkedOutDate: "April 5, 2026",
    dueDate: "April 26, 2026",
    dueDateRaw: "2026-04-26",
    renewalCount: 0,
    maxRenewals: 2,
    status: "returned",
    returnedDate: "April 23, 2026",
  },
  {
    id: "ph2",
    book: BOOKS.find((b) => b.id === "15")!,
    checkedOutDate: "March 10, 2026",
    dueDate: "March 31, 2026",
    dueDateRaw: "2026-03-31",
    renewalCount: 1,
    maxRenewals: 2,
    status: "returned",
    returnedDate: "March 28, 2026",
  },
  {
    id: "ph3",
    book: BOOKS.find((b) => b.id === "12")!,
    checkedOutDate: "February 14, 2026",
    dueDate: "March 7, 2026",
    dueDateRaw: "2026-03-07",
    renewalCount: 0,
    maxRenewals: 2,
    status: "returned",
    returnedDate: "March 5, 2026",
  },
  {
    id: "ph4",
    book: BOOKS.find((b) => b.id === "8")!,
    checkedOutDate: "January 3, 2026",
    dueDate: "January 24, 2026",
    dueDateRaw: "2026-01-24",
    renewalCount: 2,
    maxRenewals: 2,
    status: "returned",
    returnedDate: "January 24, 2026",
  },
  {
    id: "ph5",
    book: BOOKS.find((b) => b.id === "17")!,
    checkedOutDate: "December 10, 2025",
    dueDate: "December 31, 2025",
    dueDateRaw: "2025-12-31",
    renewalCount: 0,
    maxRenewals: 2,
    status: "returned",
    returnedDate: "December 29, 2025",
  },
]

// ── Holds ─────────────────────────────────────────────────────────────────── //

export const mockHolds: HoldItem[] = [
  {
    id: "h1",
    book: BOOKS.find((b) => b.id === "9")!,
    status: "ready",
    placedDate: "March 20, 2026",
    expiresDate: "June 20, 2026",
  },
  {
    id: "h2",
    book: BOOKS.find((b) => b.id === "5")!,
    status: "waiting",
    position: 4,
    totalWaiting: 12,
    estimatedWait: "4–5 weeks",
    placedDate: "May 1, 2026",
  },
  {
    id: "h3",
    book: BOOKS.find((b) => b.id === "2")!,
    status: "waiting",
    position: 2,
    totalWaiting: 7,
    estimatedWait: "2–3 weeks",
    placedDate: "May 15, 2026",
  },
]

// ── Fines & Fees ──────────────────────────────────────────────────────────── //

export const mockFines: FineItem[] = [
  {
    id: "f1",
    bookTitle: "Piranesi",
    amount: 1.25,
    daysLate: 5,
    reason: "Overdue return",
    date: "June 3, 2026",
    status: "outstanding",
  },
  {
    id: "f2",
    bookTitle: "The Covenant of Water",
    amount: 0.50,
    daysLate: 2,
    reason: "Overdue return",
    date: "April 12, 2026",
    status: "paid",
    paidDate: "April 20, 2026",
  },
  {
    id: "f3",
    bookTitle: "Six of Crows",
    amount: 2.00,
    daysLate: 8,
    reason: "Overdue return",
    date: "March 5, 2026",
    status: "paid",
    paidDate: "March 15, 2026",
  },
]

// ── Reading Lists ─────────────────────────────────────────────────────────── //

export const mockReadingLists: ReadingList[] = [
  {
    id: "rl1",
    name: "Want to Read",
    description: "Books I'm planning to read next",
    isDefault: true,
    createdDate: "January 1, 2026",
    items: [
      { id: "rli1", book: BOOKS.find((b) => b.id === "11")!, addedDate: "May 28, 2026" },
      { id: "rli2", book: BOOKS.find((b) => b.id === "18")!, addedDate: "May 15, 2026" },
      { id: "rli3", book: BOOKS.find((b) => b.id === "20")!, addedDate: "April 30, 2026", note: "Recommended by James K." },
      { id: "rli4", book: BOOKS.find((b) => b.id === "16")!, addedDate: "April 10, 2026" },
      { id: "rli5", book: BOOKS.find((b) => b.id === "14")!, addedDate: "March 22, 2026" },
    ],
  },
  {
    id: "rl2",
    name: "Favorites",
    description: "Books I loved and want to recommend",
    isDefault: false,
    createdDate: "February 15, 2026",
    items: [
      { id: "rli6", book: BOOKS.find((b) => b.id === "7")!, addedDate: "March 15, 2026", note: "A true masterpiece" },
      { id: "rli7", book: BOOKS.find((b) => b.id === "8")!, addedDate: "February 20, 2026", note: "Absolutely loved this one" },
      { id: "rli8", book: BOOKS.find((b) => b.id === "1")!, addedDate: "January 30, 2026" },
    ],
  },
  {
    id: "rl3",
    name: "Book Club",
    description: "Upcoming and past book club selections",
    isDefault: false,
    createdDate: "March 1, 2026",
    items: [
      { id: "rli9", book: BOOKS.find((b) => b.id === "4")!, addedDate: "June 1, 2026", note: "June pick — everyone should read this" },
      { id: "rli10", book: BOOKS.find((b) => b.id === "3")!, addedDate: "May 1, 2026" },
    ],
  },
]

// ── Derived summary stats (used on the dashboard) ────────────────────────── //

export const accountSummary = {
  activeCheckouts: mockCurrentCheckouts.filter((c) => c.status !== "returned").length,
  overdueItems: mockCurrentCheckouts.filter((c) => c.status === "overdue").length,
  holdsTotal: mockHolds.length,
  holdsReady: mockHolds.filter((h) => h.status === "ready").length,
  totalFinesOwed: mockFines
    .filter((f) => f.status === "outstanding")
    .reduce((sum, f) => sum + f.amount, 0),
  savedItems: mockReadingLists.reduce((sum, l) => sum + l.items.length, 0),
}
