// ── Types ─────────────────────────────────────────────────────────────────── //

export interface PatronRecord {
  id: string
  cardNumber: string
  name: string
  email: string
  phone: string
  role: "patron" | "staff" | "admin"
  status: "active" | "suspended" | "expired"
  memberSince: string
  activeCheckouts: number
  totalCheckouts: number
  holdsCount: number
  finesOwed: number
  lastVisit: string
}

export interface ActivityEvent {
  id: string
  type: "checkout" | "return" | "hold" | "registration" | "fine" | "renewal" | "damage" | "ill"
  description: string
  patron: string
  timestamp: string
  item?: string
}

export interface DashboardStat {
  label: string
  value: string | number
  change: string
  up: boolean
  color: string
}

export interface TopTitle {
  title: string
  author: string
  checkouts: number
  holds: number
}

export interface GenreBreakdown {
  genre: string
  count: number
  percent: number
}

export interface WeekdayActivity {
  day: string
  checkouts: number
  returns: number
}

export interface MonthlyGrowth {
  month: string
  patrons: number
  checkouts: number
}

// ── Dashboard stats ────────────────────────────────────────────────────────── //

export const DASHBOARD_STATS: DashboardStat[] = [
  {
    label: "Registered Patrons",
    value: "1,247",
    change: "+23 this month",
    up: true,
    color: "text-amber-warm",
  },
  {
    label: "Active Checkouts",
    value: 342,
    change: "+18 vs yesterday",
    up: true,
    color: "text-green-library",
  },
  {
    label: "Holds in Queue",
    value: 87,
    change: "-5 vs yesterday",
    up: false,
    color: "text-brown-light",
  },
  {
    label: "Overdue Items",
    value: 14,
    change: "-3 vs yesterday",
    up: false,
    color: "text-red-500",
  },
  {
    label: "Items in Collection",
    value: "18,402",
    change: "+47 this week",
    up: true,
    color: "text-amber-warm",
  },
  {
    label: "Digital Loans Today",
    value: 56,
    change: "+12 vs yesterday",
    up: true,
    color: "text-green-library",
  },
]

// ── Recent activity feed ───────────────────────────────────────────────────── //

export const RECENT_ACTIVITY: ActivityEvent[] = [
  {
    id: "a1",
    type: "checkout",
    description: "Checked out",
    patron: "Sarah Mitchell",
    item: "The Midnight Library — Matt Haig",
    timestamp: "2 minutes ago",
  },
  {
    id: "a2",
    type: "registration",
    description: "New patron registered",
    patron: "David Chen",
    timestamp: "8 minutes ago",
  },
  {
    id: "a3",
    type: "return",
    description: "Returned",
    patron: "Maria Lopez",
    item: "Educated — Tara Westover",
    timestamp: "14 minutes ago",
  },
  {
    id: "a4",
    type: "hold",
    description: "Hold placed",
    patron: "James Kowalski",
    item: "Klara and the Sun — Kazuo Ishiguro",
    timestamp: "21 minutes ago",
  },
  {
    id: "a5",
    type: "fine",
    description: "Fine paid — $3.50",
    patron: "Rachel Thompson",
    timestamp: "35 minutes ago",
  },
  {
    id: "a6",
    type: "renewal",
    description: "Renewed",
    patron: "Thomas Wright",
    item: "Sapiens — Yuval Noah Harari",
    timestamp: "42 minutes ago",
  },
  {
    id: "a7",
    type: "damage",
    description: "Item reported damaged",
    patron: "Angela Reyes",
    item: "The Thursday Murder Club — Richard Osman",
    timestamp: "1 hour ago",
  },
  {
    id: "a8",
    type: "ill",
    description: "ILL request fulfilled",
    patron: "Mark Stevens",
    item: "The Making of the Atomic Bomb — Richard Rhodes",
    timestamp: "1 hour ago",
  },
  {
    id: "a9",
    type: "checkout",
    description: "Checked out",
    patron: "Priya Sharma",
    item: "Lessons in Chemistry — Bonnie Garmus",
    timestamp: "1.5 hours ago",
  },
  {
    id: "a10",
    type: "return",
    description: "Returned",
    patron: "Carlos Mendez",
    item: "Where the Crawdads Sing — Delia Owens",
    timestamp: "2 hours ago",
  },
]

// ── Top titles ─────────────────────────────────────────────────────────────── //

export const TOP_TITLES: TopTitle[] = [
  { title: "The Midnight Library", author: "Matt Haig", checkouts: 234, holds: 18 },
  { title: "Lessons in Chemistry", author: "Bonnie Garmus", checkouts: 198, holds: 12 },
  { title: "Educated", author: "Tara Westover", checkouts: 187, holds: 9 },
  { title: "Where the Crawdads Sing", author: "Delia Owens", checkouts: 175, holds: 24 },
  { title: "Sapiens", author: "Yuval Noah Harari", checkouts: 162, holds: 7 },
  { title: "The Thursday Murder Club", author: "Richard Osman", checkouts: 155, holds: 31 },
  { title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", checkouts: 143, holds: 15 },
  { title: "Klara and the Sun", author: "Kazuo Ishiguro", checkouts: 131, holds: 11 },
  { title: "Demon Copperhead", author: "Barbara Kingsolver", checkouts: 124, holds: 8 },
  { title: "The Covenant of Water", author: "Abraham Verghese", checkouts: 118, holds: 6 },
]

// ── Collection genre breakdown ─────────────────────────────────────────────── //

export const GENRE_BREAKDOWN: GenreBreakdown[] = [
  { genre: "Fiction", count: 5840, percent: 32 },
  { genre: "Non-Fiction", count: 4120, percent: 22 },
  { genre: "Mystery & Thriller", count: 2210, percent: 12 },
  { genre: "Children's", count: 1980, percent: 11 },
  { genre: "Science Fiction", count: 1470, percent: 8 },
  { genre: "Biography", count: 1100, percent: 6 },
  { genre: "Young Adult", count: 916, percent: 5 },
  { genre: "Other", count: 766, percent: 4 },
]

// ── Weekday activity ───────────────────────────────────────────────────────── //

export const WEEKDAY_ACTIVITY: WeekdayActivity[] = [
  { day: "Mon", checkouts: 48, returns: 41 },
  { day: "Tue", checkouts: 62, returns: 57 },
  { day: "Wed", checkouts: 71, returns: 65 },
  { day: "Thu", checkouts: 66, returns: 58 },
  { day: "Fri", checkouts: 84, returns: 79 },
  { day: "Sat", checkouts: 97, returns: 88 },
  { day: "Sun", checkouts: 43, returns: 38 },
]

// ── Monthly patron growth ──────────────────────────────────────────────────── //

export const MONTHLY_GROWTH: MonthlyGrowth[] = [
  { month: "Sep '25", patrons: 1142, checkouts: 2870 },
  { month: "Oct '25", patrons: 1163, checkouts: 3140 },
  { month: "Nov '25", patrons: 1181, checkouts: 2920 },
  { month: "Dec '25", patrons: 1195, checkouts: 2310 },
  { month: "Jan '26", patrons: 1208, checkouts: 3080 },
  { month: "Feb '26", patrons: 1224, checkouts: 3350 },
  { month: "Mar '26", patrons: 1247, checkouts: 3420 },
]

// ── Patron records ─────────────────────────────────────────────────────────── //

export const PATRONS: PatronRecord[] = [
  {
    id: "u1",
    cardNumber: "LIB-00142",
    name: "Sarah Mitchell",
    email: "sarah.mitchell@email.com",
    phone: "(973) 555-0201",
    role: "patron",
    status: "active",
    memberSince: "March 2019",
    activeCheckouts: 3,
    totalCheckouts: 187,
    holdsCount: 1,
    finesOwed: 0,
    lastVisit: "Today",
  },
  {
    id: "u2",
    cardNumber: "LIB-00287",
    name: "James Kowalski",
    email: "j.kowalski@email.com",
    phone: "(973) 555-0344",
    role: "patron",
    status: "active",
    memberSince: "July 2021",
    activeCheckouts: 2,
    totalCheckouts: 94,
    holdsCount: 2,
    finesOwed: 0,
    lastVisit: "Today",
  },
  {
    id: "u3",
    cardNumber: "LIB-00398",
    name: "Maria Lopez",
    email: "mlopez@email.com",
    phone: "(973) 555-0412",
    role: "patron",
    status: "active",
    memberSince: "January 2020",
    activeCheckouts: 0,
    totalCheckouts: 243,
    holdsCount: 0,
    finesOwed: 0,
    lastVisit: "Today",
  },
  {
    id: "u4",
    cardNumber: "LIB-00501",
    name: "David Chen",
    email: "dchen@email.com",
    phone: "(973) 555-0533",
    role: "patron",
    status: "active",
    memberSince: "March 2026",
    activeCheckouts: 0,
    totalCheckouts: 0,
    holdsCount: 0,
    finesOwed: 0,
    lastVisit: "Today",
  },
  {
    id: "u5",
    cardNumber: "LIB-00614",
    name: "Rachel Thompson",
    email: "r.thompson@email.com",
    phone: "(973) 555-0617",
    role: "patron",
    status: "active",
    memberSince: "May 2018",
    activeCheckouts: 4,
    totalCheckouts: 312,
    holdsCount: 3,
    finesOwed: 0,
    lastVisit: "Yesterday",
  },
  {
    id: "u6",
    cardNumber: "LIB-00712",
    name: "Thomas Wright",
    email: "t.wright@email.com",
    phone: "(973) 555-0789",
    role: "patron",
    status: "active",
    memberSince: "November 2022",
    activeCheckouts: 2,
    totalCheckouts: 67,
    holdsCount: 1,
    finesOwed: 1.5,
    lastVisit: "Yesterday",
  },
  {
    id: "u7",
    cardNumber: "LIB-00823",
    name: "Angela Reyes",
    email: "a.reyes@email.com",
    phone: "(973) 555-0844",
    role: "patron",
    status: "active",
    memberSince: "August 2020",
    activeCheckouts: 1,
    totalCheckouts: 128,
    holdsCount: 0,
    finesOwed: 5.25,
    lastVisit: "1 hour ago",
  },
  {
    id: "u8",
    cardNumber: "LIB-00934",
    name: "Mark Stevens",
    email: "m.stevens@email.com",
    phone: "(973) 555-0912",
    role: "patron",
    status: "suspended",
    memberSince: "February 2017",
    activeCheckouts: 0,
    totalCheckouts: 421,
    holdsCount: 0,
    finesOwed: 28.0,
    lastVisit: "2 weeks ago",
  },
  {
    id: "u9",
    cardNumber: "LIB-01047",
    name: "Priya Sharma",
    email: "priya.s@email.com",
    phone: "(973) 555-1012",
    role: "patron",
    status: "active",
    memberSince: "June 2023",
    activeCheckouts: 3,
    totalCheckouts: 48,
    holdsCount: 2,
    finesOwed: 0,
    lastVisit: "1.5 hours ago",
  },
  {
    id: "u10",
    cardNumber: "LIB-01158",
    name: "Carlos Mendez",
    email: "c.mendez@email.com",
    phone: "(973) 555-1134",
    role: "patron",
    status: "active",
    memberSince: "September 2021",
    activeCheckouts: 0,
    totalCheckouts: 89,
    holdsCount: 1,
    finesOwed: 0,
    lastVisit: "2 hours ago",
  },
  {
    id: "u11",
    cardNumber: "LIB-00055",
    name: "Eleanor Park",
    email: "e.park@foliolibrary.org",
    phone: "(973) 555-0142",
    role: "staff",
    status: "active",
    memberSince: "January 2015",
    activeCheckouts: 2,
    totalCheckouts: 534,
    holdsCount: 1,
    finesOwed: 0,
    lastVisit: "Today",
  },
  {
    id: "u12",
    cardNumber: "LIB-00001",
    name: "Robert Kim",
    email: "r.kim@foliolibrary.org",
    phone: "(973) 555-0142",
    role: "admin",
    status: "active",
    memberSince: "June 2008",
    activeCheckouts: 1,
    totalCheckouts: 1247,
    holdsCount: 0,
    finesOwed: 0,
    lastVisit: "Today",
  },
  {
    id: "u13",
    cardNumber: "LIB-01284",
    name: "Nina Patel",
    email: "n.patel@email.com",
    phone: "(973) 555-1289",
    role: "patron",
    status: "expired",
    memberSince: "March 2020",
    activeCheckouts: 0,
    totalCheckouts: 73,
    holdsCount: 0,
    finesOwed: 0,
    lastVisit: "4 months ago",
  },
  {
    id: "u14",
    cardNumber: "LIB-01392",
    name: "Jason Turner",
    email: "j.turner@email.com",
    phone: "(973) 555-1401",
    role: "patron",
    status: "active",
    memberSince: "December 2024",
    activeCheckouts: 2,
    totalCheckouts: 14,
    holdsCount: 1,
    finesOwed: 0,
    lastVisit: "3 days ago",
  },
  {
    id: "u15",
    cardNumber: "LIB-00778",
    name: "Grace Okonkwo",
    email: "g.okonkwo@email.com",
    phone: "(973) 555-0790",
    role: "patron",
    status: "active",
    memberSince: "April 2019",
    activeCheckouts: 5,
    totalCheckouts: 274,
    holdsCount: 2,
    finesOwed: 0,
    lastVisit: "Yesterday",
  },
]
