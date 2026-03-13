import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Search,
  Clock,
  Newspaper,
  User,
  Rocket,
  Sparkles,
  BookMarked,
  Star,
  Feather,
  ImageIcon,
  Heart,
} from "lucide-react"
import SearchBar from "@/components/SearchBar"
import BookCard from "@/components/BookCard"
import { GENRES, getBooks, getStaffPicks, getNewArrivals } from "@/lib/data"

// Genre icon mapping (same as home page — could be extracted to a shared util)
const genreIcons: Record<string, React.ReactNode> = {
  fiction: <BookOpen className="w-7 h-7" />,
  mystery: <Search className="w-7 h-7" />,
  "historical-fiction": <Clock className="w-7 h-7" />,
  nonfiction: <Newspaper className="w-7 h-7" />,
  biography: <User className="w-7 h-7" />,
  "science-fiction": <Rocket className="w-7 h-7" />,
  fantasy: <Sparkles className="w-7 h-7" />,
  "young-adult": <BookMarked className="w-7 h-7" />,
  childrens: <Star className="w-7 h-7" />,
  poetry: <Feather className="w-7 h-7" />,
  "graphic-novels": <ImageIcon className="w-7 h-7" />,
  "self-help": <Heart className="w-7 h-7" />,
}

export const metadata = {
  title: "Browse Catalog",
  description: "Explore Folio's collection by genre, subject, and reading level.",
}

export default async function CatalogPage() {
  const [allBooks, staffPickBooks, newArrivalsRaw] = await Promise.all([
    getBooks(),
    getStaffPicks(),
    getNewArrivals(),
  ])
  const newArrivalBooks = newArrivalsRaw.slice(0, 5)

  // Books for the young readers section
  const youngReaderBooks = allBooks.filter(
    (b) => b.genre === "Children's" || b.genre === "Young Adult",
  ).slice(0, 4)

  return (
    <div className="flex flex-col">

      {/* ── Page Hero ───────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-parchment to-cream border-b border-sand py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <nav className="text-xs text-brown-light flex items-center gap-1.5">
            <Link href="/" className="hover:text-amber-dark transition-colors">Home</Link>
            <span>/</span>
            <span className="text-brown-deep">Catalog</span>
          </nav>
          <h1 className="font-display text-4xl font-bold text-brown-deep">Browse Our Collection</h1>
          <p className="text-brown-light text-lg max-w-xl">
            Over 85,000 titles across every genre, format, and reading level. Start exploring.
          </p>
          <SearchBar className="max-w-xl" />
        </div>
      </section>

      {/* ── Browse by Genre (large cards) ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-amber-warm font-medium mb-1">
            Explore by subject
          </p>
          <h2 className="font-display text-3xl font-bold text-brown-deep">Browse by Genre</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {GENRES.map((genre) => (
            <Link
              key={genre.id}
              href={`/search?genre=${genre.id}`}
              className="group p-6 bg-parchment border border-sand rounded-xl hover:border-amber-warm/60 hover:shadow-md transition-all flex gap-4 items-start"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-sand/50 flex items-center justify-center text-brown-light group-hover:bg-amber-warm group-hover:text-cream transition-colors shrink-0">
                {genreIcons[genre.id] ?? <BookOpen className="w-7 h-7" />}
              </div>
              {/* Text */}
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-semibold text-brown-deep group-hover:text-amber-dark transition-colors">
                  {genre.name}
                </h3>
                <p className="text-xs text-brown-light mt-1 line-clamp-2 leading-relaxed">
                  {genre.description}
                </p>
                <p className="text-xs text-amber-dark font-medium mt-2">
                  {genre.count.toLocaleString()} titles
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Staff Picks ─────────────────────────────────────────────────────── */}
      <section className="bg-parchment py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-amber-warm font-medium mb-1">
                Librarian recommendations
              </p>
              <h2 className="font-display text-3xl font-bold text-brown-deep">Staff Picks</h2>
              <p className="text-brown-light mt-1 text-sm">
                Books our team is loving right now.
              </p>
            </div>
            <Link
              href="/search?collection=staff-picks"
              className="flex items-center gap-1 text-sm text-amber-dark hover:text-amber-warm font-medium transition-colors"
            >
              See all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {staffPickBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* ── For Young Readers ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-warm font-medium mb-1">
              Ages 0–17
            </p>
            <h2 className="font-display text-3xl font-bold text-brown-deep">For Young Readers</h2>
            <p className="text-brown-light mt-1 text-sm">
              Picture books, middle grade, and young adult titles.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/search?genre=childrens"
              className="text-sm text-amber-dark hover:text-amber-warm font-medium transition-colors"
            >
              Children's
            </Link>
            <span className="text-sand">·</span>
            <Link
              href="/search?genre=young-adult"
              className="text-sm text-amber-dark hover:text-amber-warm font-medium transition-colors"
            >
              Young Adult
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {youngReaderBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* ── New Arrivals ────────────────────────────────────────────────────── */}
      <section className="bg-parchment py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-amber-warm font-medium mb-1">
                Recently added
              </p>
              <h2 className="font-display text-3xl font-bold text-brown-deep">New Arrivals</h2>
            </div>
            <Link
              href="/search?sort=newest"
              className="flex items-center gap-1 text-sm text-amber-dark hover:text-amber-warm font-medium transition-colors"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {newArrivalBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Collections ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-amber-warm font-medium mb-1">
            Handpicked themes
          </p>
          <h2 className="font-display text-3xl font-bold text-brown-deep">Featured Collections</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: "Books That Changed the Conversation",
              desc: "Essential reading from the past decade — fiction and nonfiction that shifted how we see the world.",
              href: "/search?collection=conversation-changers",
              count: 24,
              bg: "from-amber-warm/20 to-parchment",
            },
            {
              title: "Summer Reading 2026",
              desc: "This year's official summer reading list for all ages. Track your progress and earn rewards.",
              href: "/search?collection=summer-2026",
              count: 40,
              bg: "from-green-muted/40 to-cream",
            },
            {
              title: "Staff Favorites: Comfort Reads",
              desc: "Cozy, warm, and deeply satisfying books for when the world feels like a lot.",
              href: "/search?collection=comfort-reads",
              count: 18,
              bg: "from-sand/60 to-parchment",
            },
            {
              title: "Essential Histories",
              desc: "Narrative nonfiction and historical fiction that bring the past vividly to life.",
              href: "/search?collection=histories",
              count: 32,
              bg: "from-muted-sand/60 to-cream",
            },
            {
              title: "Award Winners & Finalists",
              desc: "Pulitzer Prize, Booker, National Book Award, and more — the best the literary world has to offer.",
              href: "/search?collection=award-winners",
              count: 55,
              bg: "from-amber-warm/15 to-parchment",
            },
            {
              title: "Books for Difficult Conversations",
              desc: "Thoughtful titles to help you navigate loss, change, conflict, and the complexities of life.",
              href: "/search?collection=difficult-conversations",
              count: 21,
              bg: "from-green-muted/30 to-cream",
            },
          ].map((collection) => (
            <Link
              key={collection.title}
              href={collection.href}
              className={`group p-6 bg-gradient-to-br ${collection.bg} border border-sand rounded-xl hover:border-amber-warm/60 hover:shadow-md transition-all flex flex-col gap-3`}
            >
              <h3 className="font-display font-semibold text-brown-deep group-hover:text-amber-dark transition-colors leading-snug">
                {collection.title}
              </h3>
              <p className="text-sm text-brown-light leading-relaxed flex-1">{collection.desc}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-brown-light">{collection.count} titles</span>
                <span className="flex items-center gap-1 text-xs text-amber-dark font-medium group-hover:gap-2 transition-all">
                  Browse <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
