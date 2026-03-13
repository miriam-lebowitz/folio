import Link from "next/link"
import { BookOpen, MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-brown-deep text-cream/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* ── Brand & Tagline ──────────────────────────────────────────── */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-light" />
              <span className="font-display text-lg font-bold text-cream">Folio</span>
            </Link>
            <p className="text-sm leading-relaxed text-cream/65">
              Your community's home for books, learning. Free for all residents of Maplewood.
            </p>
            {/* Social / newsletter placeholder */}
            <p className="text-xs text-cream/40 italic">Open source & community-built.</p>
          </div>

          {/* ── Quick Links ──────────────────────────────────────────────── */}
          <div>
            <h3 className="font-display font-semibold text-cream mb-3 text-sm uppercase tracking-wider">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/catalog", label: "Browse Catalog" },
                { href: "/search", label: "Search Books" },
                { href: "/digital/ebooks", label: "eBooks & Audiobooks" },
                { href: "/digital/magazines", label: "Digital Magazines" },
                { href: "/events", label: "Events & Programs" },
                { href: "/ask-librarian", label: "Ask a Librarian" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-amber-light transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Account Links ────────────────────────────────────────────── */}
          <div>
            <h3 className="font-display font-semibold text-cream mb-3 text-sm uppercase tracking-wider">
              My Account
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/account", label: "Dashboard" },
                { href: "/account/checkouts", label: "Checkouts" },
                { href: "/account/holds", label: "Holds Queue" },
                { href: "/account/renewals", label: "Renewals" },
                { href: "/account/fines", label: "Fines & Fees" },
                { href: "/account/reading-lists", label: "Reading Lists" },
                { href: "/rooms", label: "Book a Room" },
                { href: "/ill", label: "Interlibrary Loan" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-amber-light transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact & Hours ──────────────────────────────────────────── */}
          <div>
            <h3 className="font-display font-semibold text-cream mb-3 text-sm uppercase tracking-wider">
              Visit Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-light mt-0.5 shrink-0" />
                <span>
                  42 Maple Street<br />
                  Maplewood, NJ 07040
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-light shrink-0" />
                <a href="tel:+19735550142" className="hover:text-amber-light transition-colors">
                  (973) 555-0142
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-light shrink-0" />
                <a href="mailto:info@foliolibrary.org" className="hover:text-amber-light transition-colors">
                  info@foliolibrary.org
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-light mt-0.5 shrink-0" />
                <span>
                  Mon – Thu: 9 am – 9 pm<br />
                  Fri – Sat: 9 am – 6 pm<br />
                  Sun: 12 pm – 5 pm
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────────── */}
        <div className="mt-10 pt-6 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-cream/40">
          <p>© {new Date().getFullYear()} Folio Public Library. Open source under the MIT License.</p>
          <nav className="flex gap-5">
            <Link href="/about" className="hover:text-cream/70 transition-colors">About</Link>
            <Link href="/accessibility" className="hover:text-cream/70 transition-colors">Accessibility</Link>
            <Link href="/about#policies" className="hover:text-cream/70 transition-colors">Policies</Link>
            <Link href="/locations" className="hover:text-cream/70 transition-colors">Locations</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
