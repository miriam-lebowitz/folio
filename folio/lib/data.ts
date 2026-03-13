import type { Book } from "@/components/BookCard"

// ── Extended Types ─────────────────────────────────────────────────────────── //

export interface BookReview {
  id: string
  patron: string
  rating: number
  date: string
  text: string
}

/** Full book record — satisfies the base Book interface for use with BookCard */
export interface BookDetail extends Book {
  description: string
  publisher: string
  pages: number
  isbn: string
  dewey?: string
  subjects: string[]
  totalCopies: number
  availableCopies: number
  waitlistCount: number
  reviews: BookReview[]
}

export interface LibraryEvent {
  id: string
  title: string
  date: string
  time: string
  location: string
  category: "children" | "teen" | "adult" | "all-ages"
  description: string
  spotsLeft: number | null   // null = unlimited / drop-in
  totalSpots: number | null
  featured: boolean
  registrationRequired: boolean
}

export interface Announcement {
  id: string
  title: string
  body: string
  date: string
  type: "info" | "success" | "warning"
}

export interface LibraryGenre {
  id: string
  name: string
  count: number
  description: string
}

// ── Helper Functions ───────────────────────────────────────────────────────── //

export function getBook(id: string): BookDetail | undefined {
  return BOOKS.find((b) => b.id === id)
}

export function getBooksByGenre(genre: string, limit?: number): BookDetail[] {
  const filtered = BOOKS.filter(
    (b) => b.genre.toLowerCase() === genre.toLowerCase(),
  )
  return limit ? filtered.slice(0, limit) : filtered
}

export function getRelatedBooks(book: BookDetail, count = 4): BookDetail[] {
  return BOOKS.filter((b) => b.id !== book.id && b.genre === book.genre).slice(0, count)
}

// ── Curated Lists ──────────────────────────────────────────────────────────── //

/** IDs for the "Staff Picks" feature section */
export const STAFF_PICKS = ["7", "8", "4", "16"]

/** IDs for the "New Arrivals" horizontal strip (newest additions first) */
export const NEW_ARRIVALS = ["5", "4", "12", "9", "6", "3", "18", "1"]

// ── Genres ────────────────────────────────────────────────────────────────── //

export const GENRES: LibraryGenre[] = [
  { id: "fiction", name: "Fiction", count: 4820, description: "Novels and short stories across the full literary spectrum" },
  { id: "mystery", name: "Mystery & Thriller", count: 2140, description: "Whodunits, crime novels, and edge-of-your-seat suspense" },
  { id: "historical-fiction", name: "Historical Fiction", count: 1560, description: "Stories set in the past that illuminate our present" },
  { id: "nonfiction", name: "Non-Fiction", count: 8250, description: "True accounts, journalism, science, history, and more" },
  { id: "biography", name: "Biography & Memoir", count: 1840, description: "Lives examined — famous, ordinary, and everything between" },
  { id: "science-fiction", name: "Science Fiction", count: 1420, description: "Speculative futures and technological imagination" },
  { id: "fantasy", name: "Fantasy", count: 1680, description: "Magic, myth, and worlds beyond our own" },
  { id: "young-adult", name: "Young Adult", count: 2310, description: "Coming-of-age stories for readers of every age" },
  { id: "childrens", name: "Children's", count: 5130, description: "Picture books, chapter books, and middle grade wonder" },
  { id: "poetry", name: "Poetry & Drama", count: 720, description: "Verse, plays, and the art of language" },
  { id: "graphic-novels", name: "Graphic Novels", count: 940, description: "Comics, manga, and illustrated storytelling" },
  { id: "self-help", name: "Self-Help", count: 1240, description: "Personal growth, wellness, finance, and productivity" },
]

// ── Announcements ──────────────────────────────────────────────────────────── //

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "a1",
    title: "Summer Reading Program Is Here!",
    body: "Join our annual Summer Reading Challenge running June through August. Track your reading, earn badges, and enter to win prizes. All ages welcome — sign up at the circulation desk or online.",
    date: "June 1, 2026",
    type: "success",
  },
  {
    id: "a2",
    title: "Extended Friday Hours All Summer",
    body: "Through August, the main branch is open until 9 pm on Fridays. Satellite branches keep their regular hours. See our Locations page for the full schedule.",
    date: "May 28, 2026",
    type: "info",
  },
  {
    id: "a3",
    title: "New Digital Resources Available",
    body: "We've expanded our digital collection! Cardholders now have free access to Kanopy (streaming films), PressReader (5,000+ newspapers & magazines), and LinkedIn Learning. No waitlists, ever.",
    date: "May 15, 2026",
    type: "info",
  },
]

// ── Events ────────────────────────────────────────────────────────────────── //

export const EVENTS: LibraryEvent[] = [
  {
    id: "e1",
    title: "Summer Reading Kickoff Party",
    date: "Saturday, June 14, 2026",
    time: "10:00 am – 12:00 pm",
    location: "Main Hall",
    category: "all-ages",
    description:
      "Celebrate the start of Summer Reading with games, crafts, and a special story time. Grab your reading log and get a head start on summer adventures! Refreshments provided.",
    spotsLeft: null,
    totalSpots: null,
    featured: true,
    registrationRequired: false,
  },
  {
    id: "e2",
    title: "Poetry Open Mic Night",
    date: "Tuesday, June 17, 2026",
    time: "7:00 pm – 9:00 pm",
    location: "Community Room A",
    category: "adult",
    description:
      "Share your original poetry or a poem you love in a warm, supportive setting. All skill levels welcome. Sign up at the door or reserve a reading slot online.",
    spotsLeft: 8,
    totalSpots: 30,
    featured: false,
    registrationRequired: false,
  },
  {
    id: "e3",
    title: "Toddler Story Time",
    date: "Every Tuesday",
    time: "10:00 am – 10:45 am",
    location: "Children's Room",
    category: "children",
    description:
      "Songs, stories, and movement activities for children ages 1–3 with a caregiver. Drop-in, no registration needed. We'll have bubbles.",
    spotsLeft: null,
    totalSpots: null,
    featured: false,
    registrationRequired: false,
  },
  {
    id: "e4",
    title: "Author Talk: Voices from Maplewood",
    date: "Friday, June 20, 2026",
    time: "6:30 pm – 8:00 pm",
    location: "Main Hall",
    category: "adult",
    description:
      "Three local authors read from their recent work and discuss the craft of writing. Books available for purchase and signing. Presented with the Maplewood Arts Council.",
    spotsLeft: 22,
    totalSpots: 80,
    featured: true,
    registrationRequired: true,
  },
  {
    id: "e5",
    title: "Teen Book Club",
    date: "Thursday, June 19, 2026",
    time: "4:00 pm – 5:30 pm",
    location: "Teen Room",
    category: "teen",
    description:
      "This month we're reading Six of Crows by Leigh Bardugo. Snacks provided. New members always welcome — just show up!",
    spotsLeft: 12,
    totalSpots: 20,
    featured: false,
    registrationRequired: false,
  },
  {
    id: "e6",
    title: "Digital Library Workshop",
    date: "Sunday, June 22, 2026",
    time: "2:00 pm – 3:30 pm",
    location: "Computer Lab",
    category: "adult",
    description:
      "Learn to access ebooks, audiobooks, digital magazines, and streaming films using your library card. Bring your device or use one of ours.",
    spotsLeft: 5,
    totalSpots: 15,
    featured: false,
    registrationRequired: true,
  },
  {
    id: "e7",
    title: "ESL Conversation Circle",
    date: "Every Thursday",
    time: "6:00 pm – 7:30 pm",
    location: "Meeting Room B",
    category: "adult",
    description:
      "Practice English in a friendly, informal conversation group. All levels welcome. Facilitated by trained community volunteers.",
    spotsLeft: null,
    totalSpots: null,
    featured: false,
    registrationRequired: false,
  },
  {
    id: "e8",
    title: "Chess Club",
    date: "Every Saturday",
    time: "2:00 pm – 5:00 pm",
    location: "Activity Room",
    category: "all-ages",
    description:
      "Drop in for casual or competitive chess. All skill levels welcome, from complete beginners to tournament players. Boards and pieces provided.",
    spotsLeft: null,
    totalSpots: null,
    featured: false,
    registrationRequired: false,
  },
]

// ── Books ─────────────────────────────────────────────────────────────────── //

export const BOOKS: BookDetail[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fiction",
    availability: "available",
    year: 2020,
    rating: 4.2,
    format: "print",
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. When Nora Seed finds herself in the Midnight Library, she must decide once and for all what makes a life truly worth living.",
    publisher: "Viking",
    pages: 288,
    isbn: "978-0-525-55947-4",
    dewey: "823.92",
    subjects: ["Fiction", "Fantasy", "Mental Health", "Parallel Lives", "Second Chances"],
    totalCopies: 4,
    availableCopies: 2,
    waitlistCount: 0,
    reviews: [
      { id: "r1-1", patron: "Sarah M.", rating: 5, date: "March 15, 2024", text: "A beautiful, life-affirming book that made me reconsider all the roads not taken. I was in tears by the end — in the very best way." },
      { id: "r1-2", patron: "James K.", rating: 4, date: "February 8, 2024", text: "Haig has a gift for making complex philosophical ideas feel deeply human. Warm and thoroughly thought-provoking." },
      { id: "r1-3", patron: "Pat L.", rating: 3, date: "November 20, 2023", text: "Charming and well-written, though somewhat predictable. A gentle, reassuring read I'd recommend to anyone going through a difficult stretch." },
    ],
  },
  {
    id: "2",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    genre: "Fiction",
    availability: "checked-out",
    year: 2022,
    rating: 4.5,
    format: "print",
    description:
      "Two old friends reunite to create a video game that becomes a phenomenon, and their creative partnership spans decades filled with joy, tragedy, envy, and love. A dazzling novel about collaboration, ambition, and what it means to devote your life to making something.",
    publisher: "Knopf",
    pages: 402,
    isbn: "978-0-593-32137-8",
    dewey: "813.6",
    subjects: ["Fiction", "Friendship", "Video Games", "Creativity", "Loss"],
    totalCopies: 5,
    availableCopies: 0,
    waitlistCount: 7,
    reviews: [
      { id: "r2-1", patron: "Alex W.", rating: 5, date: "April 2, 2024", text: "One of the best novels I've read in years. The relationship between Sam and Sadie is unlike anything I've encountered in fiction." },
      { id: "r2-2", patron: "Miriam C.", rating: 5, date: "January 14, 2024", text: "Zevin writes about creativity and friendship with such insight and tenderness. I didn't want it to end." },
    ],
  },
  {
    id: "3",
    title: "Lessons in Chemistry",
    author: "Bonnie Garmus",
    genre: "Fiction",
    availability: "available",
    year: 2022,
    rating: 4.3,
    format: "print",
    description:
      "Chemist Elizabeth Zott is not your average woman. In the early 1960s, she becomes the unlikely star of a daytime cooking show where she teaches housewives the science behind every recipe — and inadvertently helps them change their lives.",
    publisher: "Doubleday",
    pages: 390,
    isbn: "978-0-385-54734-9",
    dewey: "813.6",
    subjects: ["Fiction", "Historical Fiction", "Feminism", "1960s America", "Science"],
    totalCopies: 6,
    availableCopies: 3,
    waitlistCount: 0,
    reviews: [
      { id: "r3-1", patron: "Linda P.", rating: 5, date: "May 5, 2024", text: "Funny, warm, and surprisingly moving. Elizabeth Zott is a character I'll think about for a long time." },
      { id: "r3-2", patron: "Tom B.", rating: 4, date: "March 20, 2024", text: "Smart, witty, and full of heart. A little slow to start but absolutely worth sticking with." },
    ],
  },
  {
    id: "4",
    title: "The Women",
    author: "Kristin Hannah",
    genre: "Historical Fiction",
    availability: "available",
    year: 2024,
    rating: 4.6,
    format: "print",
    description:
      "When Frankie McGrath follows her brother to Vietnam as an Army nurse, she is transformed by what she experiences. But when she returns home, she finds an America unwilling to honor the women who served — and must discover who she is beyond the war.",
    publisher: "St. Martin's Press",
    pages: 473,
    isbn: "978-1-250-31785-4",
    dewey: "813.6",
    subjects: ["Historical Fiction", "Vietnam War", "Women Veterans", "1960s–1970s", "Coming of Age"],
    totalCopies: 8,
    availableCopies: 4,
    waitlistCount: 3,
    reviews: [
      { id: "r4-1", patron: "Carol R.", rating: 5, date: "April 18, 2024", text: "Hannah at her absolute best. I knew almost nothing about female Vietnam veterans and this novel opened my eyes completely." },
      { id: "r4-2", patron: "Patricia G.", rating: 5, date: "April 5, 2024", text: "Powerful and important. I cried, I got angry, and I cheered. Frankie is an unforgettable heroine." },
      { id: "r4-3", patron: "Michael T.", rating: 4, date: "March 29, 2024", text: "Emotionally rich and historically illuminating. A big book in every sense, and every page earns its place." },
    ],
  },
  {
    id: "5",
    title: "James",
    author: "Percival Everett",
    genre: "Fiction",
    availability: "on-hold",
    year: 2024,
    rating: 4.4,
    format: "print",
    description:
      "A radical retelling of Adventures of Huckleberry Finn told from the perspective of the enslaved man Jim — reimagined as a man of deep intelligence navigating a world that refuses to see him as fully human, while protecting Huck and searching for his family.",
    publisher: "Doubleday",
    pages: 303,
    isbn: "978-0-385-55036-3",
    dewey: "813.6",
    subjects: ["Fiction", "Historical Fiction", "Race in America", "Classic Retelling", "19th Century"],
    totalCopies: 4,
    availableCopies: 0,
    waitlistCount: 12,
    reviews: [
      { id: "r5-1", patron: "Dana F.", rating: 5, date: "May 10, 2024", text: "Absolutely brilliant. Everett transforms Twain's novel into something essential for our moment. I've pressed it on everyone I know." },
      { id: "r5-2", patron: "Noel H.", rating: 4, date: "April 28, 2024", text: "Incisive, funny, and deeply moving. The code-switching sections alone make this worth reading." },
    ],
  },
  {
    id: "6",
    title: "The God of the Woods",
    author: "Liz Moore",
    genre: "Mystery & Thriller",
    availability: "available",
    year: 2024,
    rating: 4.1,
    format: "print",
    description:
      "In 1975, a girl disappears from an Adirondack summer camp — the second child to vanish from the same estate in twenty years. As investigators close in, long-buried secrets about the Van Laar family begin to surface in this atmospheric multi-generational thriller.",
    publisher: "Riverhead Books",
    pages: 481,
    isbn: "978-0-593-53956-3",
    dewey: "813.6",
    subjects: ["Mystery", "Thriller", "1970s America", "Family Secrets", "Summer Camp"],
    totalCopies: 5,
    availableCopies: 2,
    waitlistCount: 0,
    reviews: [
      { id: "r6-1", patron: "Jess A.", rating: 4, date: "May 20, 2024", text: "Atmospheric and gripping. The alternating timelines kept me guessing until the very end." },
      { id: "r6-2", patron: "Rob K.", rating: 4, date: "May 1, 2024", text: "A slow-burn thriller in the best sense. Moore builds dread masterfully and the characters feel incredibly real." },
    ],
  },
  {
    id: "7",
    title: "All the Light We Cannot See",
    author: "Anthony Doerr",
    genre: "Historical Fiction",
    availability: "available",
    year: 2014,
    rating: 4.7,
    format: "print",
    description:
      "A blind French girl and a German boy meet in occupied Saint-Malo during World War II. Their braided stories unfold across the sweeping geography of the war, building to a stunning and devastating convergence. Winner of the Pulitzer Prize.",
    publisher: "Scribner",
    pages: 531,
    isbn: "978-1-4767-4658-6",
    dewey: "813.6",
    subjects: ["Historical Fiction", "WWII", "France", "Moral Choices", "Courage"],
    totalCopies: 7,
    availableCopies: 5,
    waitlistCount: 0,
    reviews: [
      { id: "r7-1", patron: "Eleanor V.", rating: 5, date: "February 12, 2024", text: "One of the most beautiful novels I've ever read. The prose is extraordinary. An absolute masterpiece." },
      { id: "r7-2", patron: "Ben H.", rating: 5, date: "October 3, 2023", text: "Deserved every award it received. A profound meditation on luck, choice, and what it means to be good in impossible circumstances." },
    ],
  },
  {
    id: "8",
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Science Fiction",
    availability: "available",
    year: 2021,
    rating: 4.8,
    format: "print",
    description:
      "A lone astronaut wakes up far from Earth with no memory — and gradually discovers he's on a desperate one-way mission to save humanity. As his memories return piece by piece, he must figure out how to complete an impossible task with only the most unlikely of companions.",
    publisher: "Ballantine Books",
    pages: 476,
    isbn: "978-0-593-13520-4",
    dewey: "813.6",
    subjects: ["Science Fiction", "Space", "Astronomy", "Survival", "Friendship"],
    totalCopies: 5,
    availableCopies: 3,
    waitlistCount: 0,
    reviews: [
      { id: "r8-1", patron: "Chris M.", rating: 5, date: "March 1, 2024", text: "The most fun I've had reading in years. Rocky alone makes this essential. Weir's scientific creativity is astonishing." },
      { id: "r8-2", patron: "Sam R.", rating: 5, date: "January 22, 2024", text: "I'm not usually a sci-fi reader but I absolutely devoured this. The friendship at the heart of the book is genuinely moving." },
    ],
  },
  {
    id: "9",
    title: "Fourth Wing",
    author: "Rebecca Yarros",
    genre: "Fantasy",
    availability: "checked-out",
    year: 2023,
    rating: 4.3,
    format: "print",
    description:
      "Twenty-year-old Violet Sorrengail is forced to enter the Riders Quadrant at Basgiath War College, where students bond with dragons — and many don't survive the year. Her mother commands. The dragons choose. And one dangerous upperclassman may be all that stands between her and death.",
    publisher: "Red Tower Books",
    pages: 517,
    isbn: "978-1-64937-491-5",
    dewey: "813.6",
    subjects: ["Fantasy", "Romantasy", "Dragons", "Magic", "War College"],
    totalCopies: 8,
    availableCopies: 0,
    waitlistCount: 18,
    reviews: [
      { id: "r9-1", patron: "Olivia T.", rating: 5, date: "April 10, 2024", text: "I read this in 36 hours and immediately put the sequel on hold. The perfect combination of romance and fantasy action." },
      { id: "r9-2", patron: "Maya L.", rating: 4, date: "March 5, 2024", text: "Addictive and fun. If you like romantasy, this is essential reading." },
    ],
  },
  {
    id: "10",
    title: "Piranesi",
    author: "Susanna Clarke",
    genre: "Fantasy",
    availability: "available",
    year: 2020,
    rating: 4.2,
    format: "print",
    description:
      "Piranesi lives in the House — an infinite labyrinth of halls and tidal statues — where only one other person visits him twice a week. When new messages disturb his peaceful existence, Piranesi must confront unsettling truths about his world, his identity, and how he came to be there.",
    publisher: "Bloomsbury",
    pages: 272,
    isbn: "978-1-5266-2242-9",
    dewey: "823.92",
    subjects: ["Fantasy", "Mystery", "Identity", "Memory", "Labyrinth"],
    totalCopies: 4,
    availableCopies: 3,
    waitlistCount: 0,
    reviews: [
      { id: "r10-1", patron: "Rachel S.", rating: 5, date: "February 28, 2024", text: "Utterly singular. Nothing else reads like this. Short but dense with beauty and strangeness." },
      { id: "r10-2", patron: "Otto F.", rating: 4, date: "December 5, 2023", text: "I've read it three times and find something new each time. A small book that contains a whole universe." },
    ],
  },
  {
    id: "11",
    title: "The Covenant of Water",
    author: "Abraham Verghese",
    genre: "Historical Fiction",
    availability: "available",
    year: 2023,
    rating: 4.5,
    format: "print",
    description:
      "Spanning three generations of a family in South India from 1900 to 1977, this sweeping novel follows the men and women bound by a strange condition — a tendency to drown in water — tracing the country's transformation alongside the family's. A meditation on medicine, faith, and love.",
    publisher: "Grove Atlantic",
    pages: 736,
    isbn: "978-0-8021-6029-1",
    dewey: "813.6",
    subjects: ["Historical Fiction", "India", "Family Saga", "Medicine", "Post-Colonialism"],
    totalCopies: 4,
    availableCopies: 2,
    waitlistCount: 2,
    reviews: [
      { id: "r11-1", patron: "Priya N.", rating: 5, date: "May 15, 2024", text: "A magisterial novel. Verghese's India is rendered with extraordinary love and precision. A book I will carry for life." },
      { id: "r11-2", patron: "George A.", rating: 4, date: "April 8, 2024", text: "Long but never slow. The characters feel like people I've actually known. A profound achievement." },
    ],
  },
  {
    id: "12",
    title: "The Anxious Generation",
    author: "Jonathan Haidt",
    genre: "Non-Fiction",
    availability: "available",
    year: 2024,
    rating: 4.1,
    format: "print",
    description:
      "Social psychologist Jonathan Haidt examines how the sudden shift to a phone-based childhood has rewired adolescence and generated an epidemic of mental illness among teenagers — and what parents, schools, and governments can do to reverse course.",
    publisher: "Penguin Press",
    pages: 385,
    isbn: "978-0-593-65512-5",
    dewey: "305.235",
    subjects: ["Psychology", "Parenting", "Social Media", "Mental Health", "Adolescence"],
    totalCopies: 5,
    availableCopies: 2,
    waitlistCount: 4,
    reviews: [
      { id: "r12-1", patron: "David S.", rating: 4, date: "May 8, 2024", text: "Important and well-argued. Whether you agree with all of Haidt's prescriptions or not, the diagnosis is hard to dismiss." },
      { id: "r12-2", patron: "Susan B.", rating: 4, date: "April 20, 2024", text: "Every parent of teenagers should read this. Alarming but ultimately optimistic about what we can change." },
    ],
  },
  {
    id: "13",
    title: "I'm Glad My Mom Died",
    author: "Jennette McCurdy",
    genre: "Biography & Memoir",
    availability: "on-hold",
    year: 2022,
    rating: 4.5,
    format: "print",
    description:
      "Former child star Jennette McCurdy's searing memoir about her controlling mother, her struggles with eating disorders and emotional manipulation, and her eventual path toward independence, identity, and healing.",
    publisher: "Simon & Schuster",
    pages: 320,
    isbn: "978-1-982185-82-4",
    dewey: "791.4502",
    subjects: ["Memoir", "Celebrity", "Mental Health", "Eating Disorders", "Mother-Daughter"],
    totalCopies: 4,
    availableCopies: 0,
    waitlistCount: 9,
    reviews: [
      { id: "r13-1", patron: "Anna G.", rating: 5, date: "March 14, 2024", text: "Devastatingly honest and unexpectedly funny. McCurdy writes about dark material with incredible grace and wit." },
      { id: "r13-2", patron: "Felix H.", rating: 5, date: "January 30, 2024", text: "One of the best memoirs I've ever read. Brave, specific, and occasionally hilarious." },
    ],
  },
  {
    id: "14",
    title: "The House in the Cerulean Sea",
    author: "TJ Klune",
    genre: "Fantasy",
    availability: "available",
    year: 2020,
    rating: 4.4,
    format: "print",
    description:
      "Caseworker Linus Baker is sent to evaluate a highly classified orphanage housing the most dangerous magical children in the world. He's not supposed to get attached. He absolutely gets attached. A cozy, warm-hearted fantasy about chosen family, bureaucracy, and the courage to love.",
    publisher: "Tor Books",
    pages: 394,
    isbn: "978-1-250-21728-5",
    dewey: "813.6",
    subjects: ["Fantasy", "Cozy Fantasy", "LGBTQ+", "Found Family", "Magic"],
    totalCopies: 5,
    availableCopies: 3,
    waitlistCount: 0,
    reviews: [
      { id: "r14-1", patron: "Grace O.", rating: 5, date: "April 30, 2024", text: "The most cozy and warm fantasy novel I've ever read. A comfort read that also makes you think about acceptance and belonging." },
      { id: "r14-2", patron: "Ivan L.", rating: 4, date: "February 16, 2024", text: "Perfectly charming. It's sweet without being saccharine, and the found family at the end made me genuinely happy." },
    ],
  },
  {
    id: "15",
    title: "Killers of the Flower Moon",
    author: "David Grann",
    genre: "Non-Fiction",
    availability: "available",
    year: 2017,
    rating: 4.5,
    format: "print",
    description:
      "In the 1920s, the Osage Nation in Oklahoma was systematically murdered for their oil wealth in a vast conspiracy. David Grann uncovers this forgotten American atrocity and traces the formation of the FBI through the investigation that followed.",
    publisher: "Doubleday",
    pages: 338,
    isbn: "978-0-385-54248-1",
    dewey: "976.6004",
    subjects: ["True Crime", "History", "Native American History", "FBI", "Oklahoma"],
    totalCopies: 6,
    availableCopies: 4,
    waitlistCount: 0,
    reviews: [
      { id: "r15-1", patron: "Mark W.", rating: 5, date: "February 5, 2024", text: "A masterpiece of narrative nonfiction. Haunting, important, and as gripping as any thriller." },
      { id: "r15-2", patron: "June C.", rating: 4, date: "September 12, 2023", text: "Essential American history that should be required reading. Grann is among the very best in the form." },
    ],
  },
  {
    id: "16",
    title: "Six of Crows",
    author: "Leigh Bardugo",
    genre: "Young Adult",
    availability: "available",
    year: 2015,
    rating: 4.7,
    format: "print",
    description:
      "Criminal prodigy Kaz Brekker has been offered a chance at a near-impossible heist that could make him rich beyond his wildest dreams. But only if he can assemble a crew of six dangerous misfits, each with a distinct skill the job requires — and survive each other long enough to pull it off.",
    publisher: "Henry Holt",
    pages: 465,
    isbn: "978-1-250-07659-4",
    dewey: "813.6",
    subjects: ["Fantasy", "Young Adult", "Heist", "Ensemble Cast", "Magic Systems"],
    totalCopies: 5,
    availableCopies: 3,
    waitlistCount: 0,
    reviews: [
      { id: "r16-1", patron: "Julia P.", rating: 5, date: "March 22, 2024", text: "The best YA fantasy I've ever read. The ensemble cast is extraordinary — every character is a complete gem." },
      { id: "r16-2", patron: "Theo R.", rating: 5, date: "January 10, 2024", text: "Kaz Brekker is iconic. The plot is intricate but never confusing. Bardugo at her best." },
    ],
  },
  {
    id: "17",
    title: "Wonder",
    author: "R.J. Palacio",
    genre: "Children's",
    availability: "available",
    year: 2012,
    rating: 4.5,
    format: "print",
    description:
      "Ten-year-old Auggie Pullman was born with a facial difference that has kept him home-schooled for most of his life. When he enters fifth grade at a real school, he discovers that everything — including his understanding of himself and the world — can change.",
    publisher: "Knopf",
    pages: 315,
    isbn: "978-0-375-86902-0",
    dewey: "[Fic]",
    subjects: ["Children's Fiction", "Disabilities", "Friendship", "Middle School", "Kindness"],
    totalCopies: 8,
    availableCopies: 6,
    waitlistCount: 0,
    reviews: [
      { id: "r17-1", patron: "Tommy F. (age 10)", rating: 5, date: "April 3, 2024", text: "This is my favorite book ever. Please read it." },
      { id: "r17-2", patron: "Elizabeth F.", rating: 5, date: "April 3, 2024", text: "My son and I read this together. It sparked so many important conversations. A genuinely special book." },
    ],
  },
  {
    id: "18",
    title: "Demon Copperhead",
    author: "Barbara Kingsolver",
    genre: "Fiction",
    availability: "available",
    year: 2022,
    rating: 4.4,
    format: "print",
    description:
      "A boy named Demon Copperhead is born to a teenage mother in the mountains of southern Appalachia. His story — navigating foster care, the opioid crisis, and the failures of a broken system — is a searing modern retelling of David Copperfield that blazes with compassion and fury.",
    publisher: "Harper",
    pages: 560,
    isbn: "978-0-063-25942-7",
    dewey: "813.54",
    subjects: ["Fiction", "Opioid Crisis", "Appalachia", "Poverty", "Coming of Age"],
    totalCopies: 5,
    availableCopies: 3,
    waitlistCount: 0,
    reviews: [
      { id: "r18-1", patron: "Carl M.", rating: 5, date: "March 10, 2024", text: "Devastating and essential. Kingsolver writes with such love for these people and such fury at the systems that failed them." },
      { id: "r18-2", patron: "Nina J.", rating: 4, date: "February 2, 2024", text: "Dickens reimagined for a contemporary American tragedy. Impossible to put down." },
    ],
  },
  {
    id: "19",
    title: "The Wager",
    author: "David Grann",
    genre: "Non-Fiction",
    availability: "checked-out",
    year: 2023,
    rating: 4.2,
    format: "print",
    description:
      "The true story of a shipwreck, mutiny, and murder that gripped the world in the 1740s. Stranded on an island off Patagonia, the crew of HMS Wager fractured into warring factions — and those who made it home told wildly conflicting stories about what had happened.",
    publisher: "Doubleday",
    pages: 352,
    isbn: "978-0-385-53438-7",
    dewey: "910.4",
    subjects: ["History", "True Crime", "18th Century", "Shipwreck", "Justice"],
    totalCopies: 4,
    availableCopies: 0,
    waitlistCount: 3,
    reviews: [
      { id: "r19-1", patron: "Steve C.", rating: 4, date: "May 12, 2024", text: "A riveting true story told with the pacing of a thriller. Grann is one of the best narrative nonfiction writers working today." },
    ],
  },
  {
    id: "20",
    title: "The Way of Kings",
    author: "Brandon Sanderson",
    genre: "Fantasy",
    availability: "available",
    year: 2010,
    rating: 4.6,
    format: "print",
    description:
      "On a world ravaged by devastating storms, a soldier, an enslaved bridgeman, and a young woman who steals forbidden books each seek truth amid coming destruction. The first volume in The Stormlight Archive — one of the most ambitious works of epic fantasy ever attempted.",
    publisher: "Tor Books",
    pages: 1001,
    isbn: "978-0-765-32637-9",
    dewey: "813.6",
    subjects: ["Epic Fantasy", "Magic Systems", "World-Building", "Honor", "War"],
    totalCopies: 4,
    availableCopies: 2,
    waitlistCount: 1,
    reviews: [
      { id: "r20-1", patron: "Derek L.", rating: 5, date: "January 30, 2024", text: "The most fully realized fantasy world I've ever encountered. 1,000 pages and not a single wasted word." },
      { id: "r20-2", patron: "Penny J.", rating: 4, date: "November 15, 2023", text: "Dense and epic in the best sense. Don't be intimidated by the size — every chapter earns its place." },
    ],
  },
]
