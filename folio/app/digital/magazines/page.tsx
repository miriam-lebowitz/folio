import Link from "next/link"
import {
  Newspaper,
  Globe,
  Clock,
  Zap,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Tablet,
  Download,
  Languages,
} from "lucide-react"

export const metadata = {
  title: "Digital Magazines & Newspapers",
  description:
    "Access 7,000+ digital publications — newspapers, magazines, and journals — free with your Folio library card.",
}

// ── Publication data ──────────────────────────────────────────────────────── //

const publications = {
  "News & Current Affairs": [
    { title: "The New York Times", country: "🇺🇸", frequency: "Daily", type: "newspaper" },
    { title: "The Washington Post", country: "🇺🇸", frequency: "Daily", type: "newspaper" },
    { title: "The Guardian", country: "🇬🇧", frequency: "Daily", type: "newspaper" },
    { title: "The Wall Street Journal", country: "🇺🇸", frequency: "Daily", type: "newspaper" },
    { title: "USA Today", country: "🇺🇸", frequency: "Daily", type: "newspaper" },
    { title: "Le Monde", country: "🇫🇷", frequency: "Daily", type: "newspaper" },
    { title: "El País", country: "🇪🇸", frequency: "Daily", type: "newspaper" },
    { title: "The Economist", country: "🌍", frequency: "Weekly", type: "magazine" },
  ],
  "Culture & Arts": [
    { title: "The New Yorker", country: "🇺🇸", frequency: "Weekly", type: "magazine" },
    { title: "The Atlantic", country: "🇺🇸", frequency: "Monthly", type: "magazine" },
    { title: "Smithsonian", country: "🇺🇸", frequency: "Monthly", type: "magazine" },
    { title: "Harper's Magazine", country: "🇺🇸", frequency: "Monthly", type: "magazine" },
    { title: "The Paris Review", country: "🇺🇸", frequency: "Quarterly", type: "magazine" },
    { title: "Artforum", country: "🇺🇸", frequency: "Monthly", type: "magazine" },
  ],
  "Science & Technology": [
    { title: "Scientific American", country: "🇺🇸", frequency: "Monthly", type: "magazine" },
    { title: "Popular Science", country: "🇺🇸", frequency: "Bi-monthly", type: "magazine" },
    { title: "Wired", country: "🇺🇸", frequency: "Monthly", type: "magazine" },
    { title: "MIT Technology Review", country: "🇺🇸", frequency: "Bi-monthly", type: "magazine" },
    { title: "National Geographic", country: "🌍", frequency: "Monthly", type: "magazine" },
    { title: "New Scientist", country: "🇬🇧", frequency: "Weekly", type: "magazine" },
  ],
  "Lifestyle & Home": [
    { title: "Bon Appétit", country: "🇺🇸", frequency: "Monthly", type: "magazine" },
    { title: "Architectural Digest", country: "🇺🇸", frequency: "Monthly", type: "magazine" },
    { title: "Better Homes & Gardens", country: "🇺🇸", frequency: "Monthly", type: "magazine" },
    { title: "Travel + Leisure", country: "🇺🇸", frequency: "Monthly", type: "magazine" },
    { title: "Martha Stewart Living", country: "🇺🇸", frequency: "Monthly", type: "magazine" },
    { title: "Real Simple", country: "🇺🇸", frequency: "Monthly", type: "magazine" },
  ],
  "Health & Wellness": [
    { title: "Health", country: "🇺🇸", frequency: "Monthly", type: "magazine" },
    { title: "Prevention", country: "🇺🇸", frequency: "Monthly", type: "magazine" },
    { title: "Runner's World", country: "🇺🇸", frequency: "Monthly", type: "magazine" },
    { title: "Yoga Journal", country: "🇺🇸", frequency: "Bi-monthly", type: "magazine" },
    { title: "Men's Health", country: "🇺🇸", frequency: "Monthly", type: "magazine" },
    { title: "Women's Health", country: "🇺🇸", frequency: "Monthly", type: "magazine" },
  ],
  "Business & Finance": [
    { title: "Bloomberg Businessweek", country: "🇺🇸", frequency: "Weekly", type: "magazine" },
    { title: "Forbes", country: "🇺🇸", frequency: "Bi-weekly", type: "magazine" },
    { title: "Fortune", country: "🇺🇸", frequency: "Monthly", type: "magazine" },
    { title: "Harvard Business Review", country: "🇺🇸", frequency: "Bi-monthly", type: "magazine" },
    { title: "Fast Company", country: "🇺🇸", frequency: "Monthly", type: "magazine" },
    { title: "Inc.", country: "🇺🇸", frequency: "Monthly", type: "magazine" },
  ],
}

const categoryColors: Record<string, string> = {
  "News & Current Affairs": "bg-amber-warm/10 border-amber-warm/30 text-amber-dark",
  "Culture & Arts": "bg-green-muted/30 border-green-muted text-green-library",
  "Science & Technology": "bg-blue-50 border-blue-100 text-blue-700",
  "Lifestyle & Home": "bg-pink-50 border-pink-100 text-pink-700",
  "Health & Wellness": "bg-green-50 border-green-100 text-green-700",
  "Business & Finance": "bg-muted-sand border-sand text-brown",
}

const faqs = [
  {
    q: "Do current issues require a waitlist?",
    a: "No — unlike physical magazines, digital publications through PressReader are available to unlimited patrons simultaneously. Read the latest issue the moment it's published.",
  },
  {
    q: "Can I read issues that were published months ago?",
    a: "Yes. PressReader keeps an archive of past issues going back several months for most publications, and longer for many major newspapers.",
  },
  {
    q: "Are the publications available in languages other than English?",
    a: "PressReader offers titles in 60+ languages. Use the language filter in the app or on the website to find publications in your preferred language.",
  },
  {
    q: "Can I download issues to read offline?",
    a: "Yes. The PressReader app allows you to download full issues to read without an internet connection — great for commutes and travel.",
  },
  {
    q: "Is there a limit to how much I can read?",
    a: "No limits. Once your library card is connected, you can read as many publications as you want.",
  },
]

export default function MagazinesPage() {
  const totalPublications = Object.values(publications).reduce(
    (sum, arr) => sum + arr.length, 0
  )
  const categories = Object.keys(publications)

  return (
    <div className="flex flex-col">

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brown/90 to-brown-deep text-cream py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-8 right-8 w-72 h-72 bg-amber-warm/8 rounded-full blur-3xl" />
          <div className="absolute -bottom-8 -left-8 w-56 h-56 bg-green-library/8 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-warm/20 text-amber-light px-4 py-1.5 rounded-full text-sm font-medium">
            <Newspaper className="w-3.5 h-3.5" />
            Free with your library card
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold leading-tight">
            Digital Magazines<br />&amp; Newspapers
          </h1>
          <p className="text-xl text-cream/70 max-w-xl mx-auto leading-relaxed">
            Over 7,000 publications from 100+ countries — the latest issues, always available, no waitlists.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-2 text-sm text-cream/60">
            {[
              { icon: <Globe className="w-4 h-4" />, text: "100+ countries" },
              { icon: <Zap className="w-4 h-4" />, text: "No waitlists" },
              { icon: <Languages className="w-4 h-4" />, text: "60+ languages" },
              { icon: <Download className="w-4 h-4" />, text: "Offline reading" },
              { icon: <Clock className="w-4 h-4" />, text: "New issues daily" },
            ].map((s) => (
              <span key={s.text} className="flex items-center gap-1.5">
                {s.icon} {s.text}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="#access"
              className="px-6 py-3 bg-amber-warm hover:bg-amber-dark text-cream rounded-lg font-medium transition-colors"
            >
              How to Access
            </Link>
            <Link
              href="#publications"
              className="px-6 py-3 border border-cream/30 text-cream rounded-lg font-medium hover:bg-cream/10 transition-colors"
            >
              Browse Publications
            </Link>
          </div>
        </div>
      </section>

      {/* ── PressReader spotlight ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-amber-warm font-medium mb-1">
                Powered by
              </p>
              <h2 className="font-display text-3xl font-bold text-brown-deep">PressReader</h2>
              <p className="text-brown-light mt-1">The world's largest digital newsstand</p>
            </div>

            <p className="text-brown leading-relaxed">
              PressReader gives Folio cardholders unlimited access to the world's best journalism —
              newspapers, magazines, and periodicals from every corner of the globe, delivered the
              moment they're published. No waitlists, no limits, no subscriptions needed.
            </p>

            <ul className="space-y-2.5">
              {[
                "7,000+ publications in 60+ languages",
                "New issues published daily, including today's papers",
                "Archive access to past issues",
                "Read online or download for offline access",
                "Available on iOS, Android, and web browser",
                "Auto-translate articles into your language",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-brown">
                  <CheckCircle2 className="w-4 h-4 text-green-library shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual card */}
          <div className="bg-gradient-to-br from-parchment to-cream border border-sand rounded-2xl p-8 space-y-5">
            <div className="w-16 h-16 bg-brown-deep rounded-2xl flex items-center justify-center">
              <Newspaper className="w-8 h-8 text-cream" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-brown-deep">PressReader</h3>
              <p className="text-amber-dark text-sm font-medium mt-0.5">7,000+ publications · Always free</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              {[
                { label: "Publications", value: "7,000+" },
                { label: "Languages", value: "60+" },
                { label: "Countries", value: "100+" },
                { label: "New issues/day", value: "3,000+" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/50 rounded-xl p-3">
                  <p className="font-display font-bold text-brown-deep text-xl">{stat.value}</p>
                  <p className="text-xs text-brown-light mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How to access ────────────────────────────────────────────────────── */}
      <section id="access" className="bg-parchment py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-brown-deep text-center mb-10">
            Get started in minutes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Visit PressReader.com",
                body: "Go to pressreader.com or download the free app from the App Store or Google Play.",
                icon: <Globe className="w-6 h-6" />,
              },
              {
                step: "2",
                title: "Choose 'Library or Group'",
                body: "Select 'Connect via Library' and search for Folio Public Library to link your card.",
                icon: <Newspaper className="w-6 h-6" />,
              },
              {
                step: "3",
                title: "Enter your card number",
                body: "Sign in with your library card number. Start reading any of 7,000+ publications instantly.",
                icon: <Tablet className="w-6 h-6" />,
              },
            ].map((s) => (
              <div
                key={s.step}
                className="bg-cream border border-sand rounded-xl p-6 text-center space-y-3 hover:border-amber-warm/40 hover:shadow-sm transition-all"
              >
                <div className="w-12 h-12 bg-amber-warm/10 text-amber-warm rounded-xl flex items-center justify-center mx-auto">
                  {s.icon}
                </div>
                <div className="w-7 h-7 bg-amber-warm text-cream rounded-full flex items-center justify-center font-bold text-sm mx-auto">
                  {s.step}
                </div>
                <h3 className="font-display font-semibold text-brown-deep">{s.title}</h3>
                <p className="text-sm text-brown-light leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Publications by category ─────────────────────────────────────────── */}
      <section id="publications" className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-amber-warm font-medium mb-1">
            Sample selection
          </p>
          <h2 className="font-display text-3xl font-bold text-brown-deep">
            Browse Publications
          </h2>
          <p className="text-brown-light mt-2">
            A small sample of what's available. PressReader includes {totalPublications > 0 ? `all ${totalPublications} shown here plus` : ""} thousands more.
          </p>
        </div>

        <div className="space-y-10">
          {categories.map((category) => {
            const pubs = publications[category as keyof typeof publications]
            const colorClass = categoryColors[category] ?? "bg-sand/40 border-sand text-brown"

            return (
              <div key={category}>
                {/* Category header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${colorClass}`}>
                    {category}
                  </span>
                  <span className="text-xs text-brown-light">{pubs.length} titles shown</span>
                </div>

                {/* Publication list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {pubs.map((pub) => (
                    <div
                      key={pub.title}
                      className="flex items-center gap-3 p-3 bg-parchment border border-sand rounded-lg hover:border-amber-warm/40 transition-colors group"
                    >
                      {/* Flag + icon */}
                      <div className="w-9 h-9 bg-sand/50 rounded-lg flex items-center justify-center text-lg shrink-0 group-hover:bg-amber-warm/10 transition-colors">
                        {pub.country}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-brown-deep truncate group-hover:text-amber-dark transition-colors">
                          {pub.title}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-xs text-brown-light capitalize">{pub.type}</span>
                          <span className="text-brown-light/40">·</span>
                          <span className="text-xs text-brown-light">{pub.frequency}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-center mt-10 text-sm text-brown-light">
          These are just a few highlights. PressReader gives you access to{" "}
          <span className="font-semibold text-brown-deep">7,000+ total publications</span> from 100+ countries — explore the full catalog in the app.
        </p>
      </section>

      {/* ── No-waitlist callout ──────────────────────────────────────────────── */}
      <section className="bg-green-muted/20 border-y border-green-muted py-12 px-4">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="w-16 h-16 bg-green-library/15 rounded-2xl flex items-center justify-center shrink-0 mx-auto sm:mx-0">
            <Zap className="w-8 h-8 text-green-library" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-brown-deep">
              No waitlists — ever
            </h3>
            <p className="text-brown-light text-sm mt-1 leading-relaxed">
              Unlike physical magazines or even some digital ebooks, PressReader lets unlimited
              patrons access the same publication at the same time. No holds, no queues, no
              waiting. The current issue of The New York Times is available to every cardholder
              right now.
            </p>
          </div>
        </div>
      </section>

      {/* ── Also available: other digital content ────────────────────────────── */}
      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-2xl font-bold text-brown-deep mb-6">
          Also included with your card
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/digital/ebooks"
            className="group flex gap-4 p-5 bg-parchment border border-sand rounded-xl hover:border-amber-warm/50 hover:shadow-sm transition-all"
          >
            <div className="w-12 h-12 bg-amber-warm/10 text-amber-warm rounded-xl flex items-center justify-center shrink-0 group-hover:bg-amber-warm group-hover:text-cream transition-colors">
              <Newspaper className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-brown-deep group-hover:text-amber-dark transition-colors">
                eBooks &amp; Audiobooks
              </h3>
              <p className="text-sm text-brown-light mt-1">
                50,000+ ebooks and 30,000+ audiobooks via Libby and hoopla.
              </p>
              <span className="text-xs text-amber-dark font-medium flex items-center gap-1 mt-2">
                Explore <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>

          <div className="flex gap-4 p-5 bg-parchment border border-sand rounded-xl">
            <div className="w-12 h-12 bg-sand/40 text-brown-light rounded-xl flex items-center justify-center shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-brown-deep">
                LinkedIn Learning &amp; More
              </h3>
              <p className="text-sm text-brown-light mt-1">
                Free access to LinkedIn Learning, Kanopy streaming films, and language learning tools.
              </p>
              <Link
                href="/ask-librarian"
                className="text-xs text-amber-dark font-medium flex items-center gap-1 mt-2 hover:text-amber-dark/80"
              >
                Ask a librarian for access <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
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
              <details key={i} className="bg-cream border border-sand rounded-xl group">
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

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brown to-brown-deep text-cream py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            The world's news, in your hands
          </h2>
          <p className="text-cream/70 text-lg max-w-lg mx-auto">
            Thousands of publications, zero cost, no waitlists. All you need is a free Folio library card.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/register"
              className="px-8 py-3.5 bg-amber-warm hover:bg-amber-dark text-cream rounded-xl font-semibold transition-colors"
            >
              Get a Free Library Card
            </Link>
            <a
              href="https://www.pressreader.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 border border-cream/30 text-cream rounded-xl font-medium hover:bg-cream/10 transition-colors"
            >
              Open PressReader ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
