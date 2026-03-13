"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BookOpen,
  Heart,
  Users,
  Lightbulb,
  Globe,
  Shield,
  ChevronDown,
  ArrowRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// ── Policy data ───────────────────────────────────────────────────────────────

const POLICIES = [
  {
    id: "borrowing",
    title: "Borrowing Policy",
    icon: <BookOpen className="w-4 h-4" />,
    content: [
      {
        heading: "Loan Periods",
        items: [
          "Books, audiobooks, and magazines: 3 weeks",
          "DVDs and Blu-rays: 1 week",
          "Interlibrary Loan items: Set by lending library (typically 2–4 weeks)",
          "Equipment (cameras, laptops, etc.): 4 hours to 3 days depending on item",
        ],
      },
      {
        heading: "Borrowing Limits",
        items: [
          "Up to 10 items per card at one time",
          "Maximum 5 DVDs/Blu-rays simultaneously",
          "Maximum 2 pieces of equipment at one time",
          "Digital loans via Libby and hoopla follow each platform's own limits",
        ],
      },
      {
        heading: "Renewals",
        items: [
          "Items may be renewed up to 3 times online, by phone, or in person",
          "Renewals are not permitted if another patron has placed a hold",
          "Items with fines must be paid before renewals are processed",
        ],
      },
    ],
  },
  {
    id: "holds",
    title: "Holds Policy",
    icon: <Users className="w-4 h-4" />,
    content: [
      {
        heading: "Placing Holds",
        items: [
          "Holds may be placed on any item in our catalog, including items currently checked out",
          "A maximum of 15 holds may be active per card",
          "Holds can be placed online, by phone, or at the circulation desk",
        ],
      },
      {
        heading: "Pickup & Notification",
        items: [
          "You will be notified by email or text when your hold is ready",
          "Items are held for 7 calendar days from the day of notification",
          "Unclaimed holds are returned to circulation and your hold is cancelled",
          "Holds are filled in order of request date",
        ],
      },
    ],
  },
  {
    id: "fines",
    title: "Fines & Fees",
    icon: <Shield className="w-4 h-4" />,
    content: [
      {
        heading: "Overdue Fines",
        items: [
          "Books, magazines, audiobooks: $0.25/day",
          "DVDs and Blu-rays: $1.00/day",
          "ILL items: $0.50/day (minimum $1.00 per item per billing cycle)",
          "Maximum fine per item: $10.00 (books); $15.00 (DVDs)",
        ],
      },
      {
        heading: "Lost & Damaged Items",
        items: [
          "Lost items are billed at current replacement cost plus a $5.00 processing fee",
          "Damaged items are assessed on a case-by-case basis",
          "Cards with outstanding fines over $10.00 are suspended from borrowing",
          "Fines paid in full restore borrowing privileges immediately",
        ],
      },
      {
        heading: "Fine Forgiveness",
        items: [
          "Children's materials: All overdue fines are waived — we want kids to read!",
          "First-time cardholders: One-time fine forgiveness up to $5.00",
          "Community service: 1 hour of approved volunteer work may offset $5.00 in fines",
        ],
      },
    ],
  },
  {
    id: "computers",
    title: "Computer & Internet Use",
    icon: <Globe className="w-4 h-4" />,
    content: [
      {
        heading: "Public Computer Access",
        items: [
          "Library card required for computer use (valid photo ID accepted in lieu for visitors)",
          "Sessions are limited to 1 hour when others are waiting; extendable when computers are available",
          "Printing: $0.10/page B&W, $0.25/page color",
          "USB drives are permitted; downloading software to library computers is not allowed",
        ],
      },
      {
        heading: "Internet Policy",
        items: [
          "Folio provides free Wi-Fi throughout the building — no login required",
          "Users are expected to adhere to Folio's Code of Conduct while using library internet",
          "The library uses content filtering software on public computers; filtering is not applied to personal devices",
          "The library is not responsible for personal data security on public networks",
        ],
      },
    ],
  },
  {
    id: "code-of-conduct",
    title: "Code of Conduct",
    icon: <Heart className="w-4 h-4" />,
    content: [
      {
        heading: "Our Community Standards",
        items: [
          "Treat all patrons, staff, and volunteers with courtesy and respect",
          "Keep noise to a considerate level in shared spaces (quiet study rooms are available for silence)",
          "Food and covered beverages are permitted in the reading lounge only",
          "Smoking, vaping, and alcohol are prohibited on library property",
          "Animals other than service animals are not permitted inside the building",
        ],
      },
      {
        heading: "Prohibited Conduct",
        items: [
          "Harassment, intimidation, or threatening behavior toward any person",
          "Vandalism or intentional damage to library property or materials",
          "Using the library for commercial solicitation without prior approval",
          "Any conduct that disrupts the use and enjoyment of the library by others",
        ],
      },
      {
        heading: "Enforcement",
        items: [
          "Staff may ask anyone not following these guidelines to leave",
          "Repeated violations may result in suspension of library privileges",
          "The library reserves the right to contact local law enforcement as necessary",
        ],
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    icon: <Lightbulb className="w-4 h-4" />,
    content: [
      {
        heading: "What We Collect",
        items: [
          "Name, address, contact information, and library card number for account creation",
          "Checkout and hold history (retained for account management only)",
          "Computer session logs (retained for 30 days for security purposes only)",
          "We do not collect or share browsing history, reading habits, or research topics",
        ],
      },
      {
        heading: "How We Use It",
        items: [
          "To manage your account, process transactions, and send notifications you've opted into",
          "Aggregate, anonymized data may be used for collection development and grant reporting",
          "We do not sell patron data — ever",
          "We comply with all applicable New Jersey library confidentiality laws (N.J.S.A. 18A:73-43.1)",
        ],
      },
      {
        heading: "Your Rights",
        items: [
          "You may request a copy of your personal data at any time",
          "You may request deletion of your data when you close your account",
          "Checkout history is automatically purged 90 days after return unless you opt in to reading history",
          "Contact privacy@foliolibrary.org with any questions or requests",
        ],
      },
    ],
  },
]

// ── Staff spotlight (mock) ────────────────────────────────────────────────────

const TEAM = [
  { name: "Dr. Robert Kim", title: "Library Director", initials: "RK" },
  { name: "Eleanor Park", title: "Head of Reference Services", initials: "EP" },
  { name: "Marcus Osei", title: "Youth Services Librarian", initials: "MO" },
  { name: "Fatima Al-Hassan", title: "Digital Services Coordinator", initials: "FA" },
  { name: "Thomas Brennan", title: "Circulation Supervisor", initials: "TB" },
  { name: "Linda Nakamura", title: "Community Programs Manager", initials: "LN" },
]

// ── Collapsible policy section ────────────────────────────────────────────────

function PolicySection({
  policy,
  defaultOpen = false,
}: {
  policy: (typeof POLICIES)[0]
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div id={policy.id} className="border border-sand rounded-xl overflow-hidden scroll-mt-8">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-parchment hover:bg-sand/30 transition-colors text-left"
      >
        <span className="flex items-center gap-2.5 font-semibold text-brown-deep">
          <span className="w-7 h-7 bg-amber-warm/15 rounded-lg flex items-center justify-center text-amber-warm">
            {policy.icon}
          </span>
          {policy.title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-brown-light transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="px-5 py-5 space-y-5 bg-cream border-t border-sand">
          {policy.content.map((section) => (
            <div key={section.heading} className="space-y-2">
              <h4 className="text-sm font-semibold text-brown-deep">{section.heading}</h4>
              <ul className="space-y-1.5">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-brown-light">
                    <span className="w-1.5 h-1.5 bg-amber-warm rounded-full shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brown-deep via-brown to-brown-light/70 py-16 px-4">
        <div className="max-w-5xl mx-auto text-cream space-y-4">
          <Badge className="bg-amber-warm/20 text-amber-warm border-amber-warm/30 hover:bg-amber-warm/20">
            Est. 1924
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold">About Folio</h1>
          <p className="text-cream/75 text-lg max-w-2xl leading-relaxed">
            For over a century, Folio Public Library has been a cornerstone of the Maplewood
            community — a free, welcoming space for everyone to learn, create, and connect.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-14">

        {/* ── Our story ────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="font-display text-3xl font-bold text-brown-deep">Our Story</h2>
            <div className="space-y-3 text-brown-light leading-relaxed">
              <p>
                Folio Public Library opened its doors in 1924 with a collection of 1,200 books
                donated by Maplewood residents and a vision of a free, open library for all. What
                began as a single reading room in a renovated Victorian house has grown into a
                vital community hub serving over 1,200 registered patrons.
              </p>
              <p>
                In 1967, the library moved to its current home at 42 Maple Street, a building
                designed to bring light and warmth into the reading experience. Major renovations
                in 2009 and 2019 added the Children's Wing, the Digital Commons, and the
                community meeting rooms used for hundreds of programs each year.
              </p>
              <p>
                Today, Folio's collection spans 18,400 physical and digital items across every
                genre, subject, and age group. But our mission remains what it has always been:
                to be the place where the Maplewood community comes to discover something new.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-0">
            {[
              { year: "1924", event: "Folio opens with 1,200 donated books" },
              { year: "1951", event: "Children's reading program launched" },
              { year: "1967", event: "Move to 42 Maple Street" },
              { year: "1992", event: "First public computers installed" },
              { year: "2009", event: "Children's Wing & Community Rooms added" },
              { year: "2019", event: "Digital Commons renovation completed" },
              { year: "2024", event: "Centennial celebration — 100 years of Folio!" },
            ].map((item, i, arr) => (
              <div key={item.year} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 bg-amber-warm rounded-full flex items-center justify-center text-cream text-xs font-bold shrink-0">
                    {item.year.slice(2)}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-0.5 h-6 bg-sand my-1" />
                  )}
                </div>
                <div className="pt-2 pb-4">
                  <p className="text-xs font-semibold text-amber-dark">{item.year}</p>
                  <p className="text-sm text-brown-light">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Mission & values ─────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-brown-deep">Mission & Values</h2>
            <p className="text-brown-light mt-2">
              Everything we do flows from a simple idea: knowledge should be freely available to
              everyone, without exception.
            </p>
          </div>

          <div className="bg-parchment border border-sand rounded-2xl p-6 text-center">
            <p className="font-display text-xl font-bold text-brown-deep italic leading-relaxed">
              "To connect the Maplewood community with the knowledge, stories, and resources they
              need to live, learn, and thrive — freely and without judgment."
            </p>
            <p className="text-sm text-brown-light mt-3">— Folio Public Library Mission Statement</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: <BookOpen className="w-5 h-5" />,
                title: "Free Access",
                body: "All services are free for Maplewood residents. No barriers, no fees, no judgment.",
              },
              {
                icon: <Users className="w-5 h-5" />,
                title: "Community First",
                body: "We listen to our community. Programs, collections, and services reflect what you actually need.",
              },
              {
                icon: <Heart className="w-5 h-5" />,
                title: "Inclusivity",
                body: "Everyone is welcome here — regardless of age, background, language, or ability.",
              },
              {
                icon: <Lightbulb className="w-5 h-5" />,
                title: "Lifelong Learning",
                body: "From story time to senior workshops, we support curiosity at every stage of life.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="bg-parchment border border-sand rounded-xl p-5 space-y-3"
              >
                <div className="w-9 h-9 bg-amber-warm/15 rounded-xl flex items-center justify-center text-amber-warm">
                  {v.icon}
                </div>
                <div>
                  <p className="font-semibold text-brown-deep">{v.title}</p>
                  <p className="text-sm text-brown-light mt-1 leading-relaxed">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Staff team ───────────────────────────────────────────── */}
        <section className="space-y-5">
          <h2 className="font-display text-2xl font-bold text-brown-deep">Meet the Team</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-parchment border border-sand rounded-xl p-4 text-center space-y-2"
              >
                <div className="w-12 h-12 bg-amber-warm/20 rounded-full flex items-center justify-center text-amber-dark font-bold text-sm mx-auto">
                  {member.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-brown-deep leading-snug">{member.name}</p>
                  <p className="text-xs text-brown-light mt-0.5 leading-snug">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-brown-light">
            Interested in joining the team?{" "}
            <a href="mailto:jobs@foliolibrary.org" className="text-amber-dark hover:underline">
              View open positions →
            </a>
          </p>
        </section>

        {/* ── Policies ─────────────────────────────────────────────── */}
        <section id="policies" className="space-y-5 scroll-mt-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-brown-deep">Library Policies</h2>
            <p className="text-brown-light text-sm mt-1">
              Our policies exist to make Folio welcoming and fair for everyone. Click any section
              to expand.
            </p>
          </div>
          <div className="space-y-3">
            {POLICIES.map((policy, i) => (
              <PolicySection key={policy.id} policy={policy} defaultOpen={i === 0} />
            ))}
          </div>
          <p className="text-sm text-brown-light">
            Questions about our policies?{" "}
            <Link href="/ask-librarian" className="text-amber-dark hover:underline">
              Ask a librarian
            </Link>{" "}
            or call (973) 555-0142.
          </p>
        </section>

        {/* ── Board of trustees ────────────────────────────────────── */}
        <section className="bg-parchment border border-sand rounded-2xl p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-brown-deep">Board of Trustees</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-8">
            {[
              ["Patricia Walsh", "Board Chair"],
              ["James Okafor", "Vice Chair"],
              ["Sandra Goldstein", "Treasurer"],
              ["Kevin Navarro", "Secretary"],
              ["Dr. Alice Chen", "Trustee"],
              ["William Faber", "Trustee"],
            ].map(([name, role]) => (
              <div key={name} className="text-sm">
                <span className="font-medium text-brown-deep">{name}</span>
                <span className="text-brown-light ml-2 text-xs">— {role}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-brown-light">
            Board meetings are open to the public and held on the first Tuesday of each month at
            6:30 pm in Community Room A.
          </p>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-amber-warm/10 to-green-muted/20 border border-sand rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-brown-deep">
              Ready to get your library card?
            </h3>
            <p className="text-sm text-brown-light mt-1">
              It's free for Maplewood residents and takes just a few minutes.
            </p>
          </div>
          <Link
            href="/register"
            className="shrink-0 bg-amber-warm hover:bg-amber-dark text-cream text-sm font-medium px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2"
          >
            Apply for a Card
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
