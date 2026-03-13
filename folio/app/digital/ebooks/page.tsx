import Link from "next/link"
import {
  Headphones,
  BookOpen,
  Smartphone,
  Wifi,
  Clock,
  CheckCircle2,
  ArrowRight,
  Star,
  Zap,
  Film,
  ChevronDown,
} from "lucide-react"
import { BOOKS } from "@/lib/data"

export const metadata = {
  title: "eBooks & Audiobooks",
  description:
    "Access thousands of ebooks and audiobooks instantly, free with your Folio library card.",
}

// ── Platform data ─────────────────────────────────────────────────────────── //

const platforms = [
  {
    id: "libby",
    name: "Libby",
    tagline: "by OverDrive",
    description:
      "The gold standard for library ebooks and audiobooks. Borrow titles just like a physical book — they'll be returned automatically when they're due. Holds system means the most popular titles are always available eventually.",
    features: ["Ebooks & audiobooks", "Syncs across devices", "Read in-app or Kindle", "Magazines included"],
    badge: "Most Popular",
    badgeColor: "bg-amber-warm text-cream",
    borrows: "Up to 10 items at once",
    waitlist: true,
    icon: <BookOpen className="w-8 h-8" />,
    iconBg: "bg-amber-warm/15 text-amber-warm",
    steps: [
      "Download the Libby app (iOS or Android)",
      "Search for Folio Public Library",
      "Sign in with your library card number",
    ],
  },
  {
    id: "hoopla",
    name: "hoopla",
    tagline: "Instant borrowing, no waitlists",
    description:
      "Stream or download ebooks, audiobooks, comics, music, and movies instantly — no holds, no waiting. The perfect complement to Libby for the titles you want right now.",
    features: ["No waitlists ever", "Ebooks, comics, music & film", "Instant access", "Offline downloads"],
    badge: "No Waitlists",
    badgeColor: "bg-green-muted text-green-library",
    borrows: "Up to 8 borrows per month",
    waitlist: false,
    icon: <Zap className="w-8 h-8" />,
    iconBg: "bg-green-muted/60 text-green-library",
    steps: [
      "Visit hoopladigital.com or get the app",
      "Create a free account with your library card",
      "Start reading or listening immediately",
    ],
  },
  {
    id: "kanopy",
    name: "Kanopy",
    tagline: "Film & educational streaming",
    description:
      "Ad-free streaming of thousands of acclaimed films, documentaries, and educational videos from the Criterion Collection, PBS, and world-class educational publishers.",
    features: ["Films & documentaries", "Educational content", "Ad-free streaming", "Criterion Collection"],
    badge: "Films too",
    badgeColor: "bg-sand text-brown",
    borrows: "Up to 10 streams per month",
    waitlist: false,
    icon: <Film className="w-8 h-8" />,
    iconBg: "bg-sand/60 text-brown",
    steps: [
      "Go to kanopy.com or get the app",
      "Find Folio Public Library",
      "Sign in with your library card",
    ],
  },
]

// ── Featured digital titles (curated from catalog) ────────────────────────── //
const featuredDigital = ["8", "1", "10", "14", "3", "16"].map(
  (id) => BOOKS.find((b) => b.id === id)!,
).filter(Boolean)

// ── FAQ ───────────────────────────────────────────────────────────────────── //
const faqs = [
  {
    q: "Do I need a library card to access digital content?",
    a: "Yes — a free Folio library card is required. Maplewood residents can get one online or at any branch in minutes.",
  },
  {
    q: "Can I read offline?",
    a: "Both Libby and hoopla support offline downloads. Download before you lose your connection, and read or listen anywhere.",
  },
  {
    q: "What devices are supported?",
    a: "iPhone, iPad, Android phones and tablets, Kindle e-readers (via Libby), Chromebooks, and most computers via your web browser.",
  },
  {
    q: "What's the difference between Libby and hoopla?",
    a: "Libby has a larger collection and is free of borrow limits, but popular titles may have waitlists. hoopla is instant — no holds — but you're limited to 8 items per month.",
  },
  {
    q: "Are there any fees?",
    a: "None, ever. These services are completely free with your library card as part of Folio's digital collection.",
  },
  {
    q: "What happens when my loan expires?",
    a: "Digital items expire automatically — no late fees, no trips to the library. On Libby you can renew if no one else has a hold.",
  },
]

export default function EbooksPage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brown/95 to-brown-deep text-cream py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-warm/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-library/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-warm/20 text-amber-light px-4 py-1.5 rounded-full text-sm font-medium">
            <Smartphone className="w-3.5 h-3.5" />
            Free with your library card
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold leading-tight">
            eBooks &amp; Audiobooks
          </h1>
          <p className="text-xl text-cream/70 max-w-xl mx-auto leading-relaxed">
            Thousands of titles on your phone, tablet, or e-reader — available 24/7, completely free.
          </p>

          {/* Stats strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-sm text-cream/60">
            {[
              { icon: <BookOpen className="w-4 h-4" />, text: "50,000+ ebooks" },
              { icon: <Headphones className="w-4 h-4" />, text: "30,000+ audiobooks" },
              { icon: <Wifi className="w-4 h-4" />, text: "Stream or download" },
              { icon: <Clock className="w-4 h-4" />, text: "Access 24 / 7" },
            ].map((s) => (
              <span key={s.text} className="flex items-center gap-1.5">
                {s.icon} {s.text}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="#platforms"
              className="px-6 py-3 bg-amber-warm hover:bg-amber-dark text-cream rounded-lg font-medium transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/register"
              className="px-6 py-3 border border-cream/30 text-cream rounded-lg font-medium hover:bg-cream/10 transition-colors"
            >
              Get a Library Card
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────────────── */}
      <section className="bg-parchment py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-brown-deep text-center mb-10">
            Start reading in three steps
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Get your library card", body: "Sign up for a free card online or at any Folio branch. Maplewood residents qualify instantly.", icon: "🪪" },
              { step: "2", title: "Choose a platform", body: "Download Libby for the largest selection, or hoopla for instant access with no waitlists.", icon: "📱" },
              { step: "3", title: "Borrow and enjoy", body: "Search, borrow, and read or listen — on any device, anywhere, anytime. Items return automatically.", icon: "📖" },
            ].map((s) => (
              <div key={s.step} className="text-center space-y-3">
                <div className="text-4xl">{s.icon}</div>
                <div className="w-8 h-8 bg-amber-warm text-cream rounded-full flex items-center justify-center font-bold text-sm mx-auto">
                  {s.step}
                </div>
                <h3 className="font-display font-semibold text-brown-deep">{s.title}</h3>
                <p className="text-sm text-brown-light leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform cards ──────────────────────────────────────────────────── */}
      <section id="platforms" className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-amber-warm font-medium mb-1">
            Included with your card
          </p>
          <h2 className="font-display text-3xl font-bold text-brown-deep">Our Digital Platforms</h2>
          <p className="text-brown-light mt-2">
            Three services, one library card. Each has its own strengths — use them together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className="bg-parchment border border-sand rounded-2xl p-6 flex flex-col gap-5 hover:border-amber-warm/40 hover:shadow-md transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${platform.iconBg}`}>
                  {platform.icon}
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${platform.badgeColor}`}>
                  {platform.badge}
                </span>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-brown-deep">{platform.name}</h3>
                <p className="text-xs text-amber-dark font-medium mt-0.5">{platform.tagline}</p>
              </div>

              <p className="text-sm text-brown leading-relaxed flex-1">{platform.description}</p>

              {/* Features */}
              <ul className="space-y-1.5">
                {platform.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-brown">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-library shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Borrow limit */}
              <div className="pt-3 border-t border-sand/60 text-xs text-brown-light flex items-center justify-between">
                <span>{platform.borrows}</span>
                {platform.waitlist ? (
                  <span className="text-amber-dark">Holds may apply</span>
                ) : (
                  <span className="text-green-library font-medium flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Instant
                  </span>
                )}
              </div>

              {/* How to access */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-brown-light uppercase tracking-wide">
                  How to get started
                </p>
                <ol className="space-y-1">
                  {platform.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-brown-light">
                      <span className="w-4 h-4 bg-sand rounded-full flex items-center justify-center text-brown font-bold shrink-0 mt-0.5 text-[10px]">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured digital titles ──────────────────────────────────────────── */}
      <section className="bg-parchment py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-amber-warm font-medium mb-1">
                Available on Libby &amp; hoopla
              </p>
              <h2 className="font-display text-3xl font-bold text-brown-deep">
                Popular Digital Titles
              </h2>
            </div>
            <Link
              href="/search?format=ebook"
              className="flex items-center gap-1 text-sm text-amber-dark hover:text-amber-warm font-medium transition-colors"
            >
              All ebooks <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredDigital.map((book) => (
              <Link
                key={book.id}
                href={`/catalog/${book.id}`}
                className="group flex flex-col gap-2"
              >
                {/* Cover placeholder */}
                <div className="aspect-[2/3] bg-gradient-to-br from-sand to-muted-sand rounded-lg flex items-center justify-center overflow-hidden group-hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-center gap-1.5 p-3 text-center">
                    <BookOpen className="w-8 h-8 text-brown-light/40" />
                    <span className="text-xs text-brown-light/60 font-display leading-tight line-clamp-3">
                      {book.title}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-brown-deep group-hover:text-amber-dark transition-colors line-clamp-1">
                    {book.title}
                  </p>
                  <p className="text-xs text-brown-light">{book.author}</p>
                  {/* Star rating */}
                  {book.rating && (
                    <div className="flex items-center gap-0.5 mt-0.5">
                      <Star className="w-3 h-3 text-amber-warm fill-amber-warm" />
                      <span className="text-xs text-brown-light">{book.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Device compatibility ─────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-3xl font-bold text-brown-deep text-center mb-10">
          Read &amp; listen on any device
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "iPhone & iPad", icon: "📱", note: "Libby & hoopla apps" },
            { label: "Android", icon: "📲", note: "Libby & hoopla apps" },
            { label: "Kindle", icon: "📖", note: "via Libby / Amazon" },
            { label: "Computer", icon: "💻", note: "Browser-based reading" },
          ].map((device) => (
            <div
              key={device.label}
              className="bg-parchment border border-sand rounded-xl p-5 text-center space-y-2"
            >
              <div className="text-3xl">{device.icon}</div>
              <p className="font-medium text-brown-deep text-sm">{device.label}</p>
              <p className="text-xs text-brown-light">{device.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section className="bg-parchment py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-brown-deep mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-cream border border-sand rounded-xl group"
              >
                <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer list-none font-medium text-brown-deep hover:text-amber-dark transition-colors">
                  {faq.q}
                  <ChevronDown className="w-4 h-4 shrink-0 text-brown-light group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-5 pb-4 text-sm text-brown leading-relaxed border-t border-sand/50 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Get a card CTA ───────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brown to-brown-deep text-cream py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            No library card? Get one free.
          </h2>
          <p className="text-cream/70 text-lg max-w-lg mx-auto">
            Any Maplewood resident can sign up instantly online or in person. It takes two minutes and costs absolutely nothing.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/register"
              className="px-8 py-3.5 bg-amber-warm hover:bg-amber-dark text-cream rounded-xl font-semibold transition-colors"
            >
              Get a Free Library Card
            </Link>
            <Link
              href="/ask-librarian"
              className="px-8 py-3.5 border border-cream/30 text-cream rounded-xl font-medium hover:bg-cream/10 transition-colors"
            >
              Have a Question?
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
