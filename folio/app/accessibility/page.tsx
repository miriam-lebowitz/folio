import Link from "next/link"
import {
  Accessibility,
  Eye,
  Ear,
  Hand,
  Monitor,
  Building,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// ── Feature lists ────────────────────────────────────────────────────────────

const PHYSICAL_FEATURES = [
  {
    category: "Entrances & Navigation",
    items: [
      "Automatic sliding doors at all public entrances",
      "Level access from the accessible parking lot",
      "Tactile ground surface indicators at building entrance",
      "Braille and large-print directional signage throughout the building",
      "High-contrast color scheme for wayfinding",
    ],
  },
  {
    category: "Mobility",
    items: [
      "Elevator access to all three floors",
      "Wide aisles (minimum 36 inches) between shelving",
      "Lowered checkout counters and service desks",
      "Adjustable-height tables in the reading room",
      "8 dedicated ADA parking spaces directly adjacent to the entrance",
      "Accessible restrooms on every floor",
    ],
  },
  {
    category: "Sensory & Communication",
    items: [
      "Induction hearing loop in Community Room A (T-coil compatible hearing aids)",
      "Assistive listening devices available at the Reference Desk (loan)",
      "Quiet study rooms for low-sensory environments",
      "Staff trained in basic American Sign Language (ASL)",
      "Large-print materials collection (400+ titles)",
      "Descriptive brochures and event guides available upon request",
    ],
  },
  {
    category: "Technology",
    items: [
      "Screen reader software (JAWS, NVDA) on all 15 public computers",
      "Screen magnification software (ZoomText) available",
      "High-contrast keyboard and trackball mouse available at the Reference Desk",
      "CCTV video magnifier for reading printed materials",
      "Text-to-speech on all public catalog terminals",
    ],
  },
]

const DIGITAL_FEATURES = [
  {
    area: "Website",
    status: "aa",
    description:
      "This website is designed to conform to WCAG 2.1 Level AA. We use semantic HTML, sufficient color contrast, keyboard navigation, and descriptive alt text.",
  },
  {
    area: "Online Catalog",
    status: "aa",
    description:
      "Our catalog search is keyboard-accessible and screen-reader compatible. Results include accessible pagination and focus management.",
  },
  {
    area: "Ask a Librarian Chat",
    status: "aa",
    description:
      "The AI chat interface is keyboard navigable and screen-reader compatible. Messages are announced via ARIA live regions.",
  },
  {
    area: "Account Portal",
    status: "aa",
    description:
      "All account management pages use ARIA labels, form validation announcements, and sufficient interactive target sizes.",
  },
  {
    area: "Digital Content Platforms",
    status: "partner",
    description:
      "Libby (OverDrive), hoopla, and PressReader are third-party platforms with their own accessibility statements. Contact them directly for platform-specific support.",
  },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AccessibilityPage() {
  return (
    <div className="bg-cream min-h-screen">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brown-deep via-brown to-brown-light/70 py-14 px-4">
        <div className="max-w-5xl mx-auto text-cream space-y-3">
          <Badge className="bg-amber-warm/20 text-amber-warm border-amber-warm/30 hover:bg-amber-warm/20">
            Accessibility
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold">
            Accessibility Statement
          </h1>
          <p className="text-cream/75 text-lg max-w-2xl">
            Folio Public Library is committed to ensuring that all patrons can access our
            facilities, collections, and digital services, regardless of ability.
          </p>
          <p className="text-cream/50 text-sm">Last reviewed: March 2026</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">

        {/* ── Our commitment ───────────────────────────────────────── */}
        <section className="bg-parchment border border-sand rounded-2xl p-6 space-y-3">
          <h2 className="font-display text-xl font-bold text-brown-deep flex items-center gap-2">
            <Accessibility className="w-5 h-5 text-amber-warm" />
            Our Commitment
          </h2>
          <p className="text-brown-light leading-relaxed">
            Folio Public Library believes that access to knowledge and community is a right, not a
            privilege. We work continuously to remove barriers — physical, digital, and
            communicative — so that everyone can participate fully in library life. This statement
            describes our current accessibility features and how to reach us if you encounter any
            barrier.
          </p>
          <p className="text-brown-light leading-relaxed">
            We comply with the Americans with Disabilities Act (ADA), Section 508 of the
            Rehabilitation Act, and the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA
            for digital content.
          </p>
        </section>

        {/* ── Physical accessibility ────────────────────────────────── */}
        <section className="space-y-5">
          <h2 className="font-display text-2xl font-bold text-brown-deep flex items-center gap-2">
            <Building className="w-6 h-6 text-amber-warm" />
            Physical Accessibility
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PHYSICAL_FEATURES.map((section) => (
              <div
                key={section.category}
                className="bg-parchment border border-sand rounded-xl p-5 space-y-3"
              >
                <h3 className="font-semibold text-brown-deep text-sm">{section.category}</h3>
                <ul className="space-y-1.5">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-brown-light">
                      <CheckCircle className="w-3.5 h-3.5 text-green-library shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Service accommodations ────────────────────────────────── */}
        <section className="space-y-5">
          <h2 className="font-display text-2xl font-bold text-brown-deep">
            Service Accommodations
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: <Eye className="w-5 h-5" />,
                title: "Vision",
                items: [
                  "Large-print books & magazines",
                  "Audiobooks (print & digital)",
                  "CCTV magnifier loan",
                  "Screen reader computers",
                ],
              },
              {
                icon: <Ear className="w-5 h-5" />,
                title: "Hearing",
                items: [
                  "Hearing loop (Room A)",
                  "Assistive listening devices",
                  "Captioned event recordings",
                  "ASL-capable staff on request",
                ],
              },
              {
                icon: <Hand className="w-5 h-5" />,
                title: "Mobility",
                items: [
                  "Curbside pickup service",
                  "Home delivery for homebound patrons",
                  "Adjusted-height workstations",
                  "Item retrieval assistance",
                ],
              },
              {
                icon: <Monitor className="w-5 h-5" />,
                title: "Cognitive",
                items: [
                  "Quiet, low-sensory study rooms",
                  "Simple-language event guides",
                  "Extended session time on request",
                  "One-on-one tech help sessions",
                ],
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-parchment border border-sand rounded-xl p-5 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-amber-warm/15 rounded-lg flex items-center justify-center text-amber-warm">
                    {card.icon}
                  </div>
                  <h3 className="font-semibold text-brown-deep">{card.title}</h3>
                </div>
                <ul className="space-y-1.5">
                  {card.items.map((item) => (
                    <li key={item} className="text-xs text-brown-light flex gap-1.5">
                      <span className="w-1 h-1 bg-amber-warm rounded-full shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Homebound delivery callout */}
          <div className="bg-amber-warm/10 border border-amber-warm/30 rounded-xl p-5 flex gap-4">
            <div className="w-10 h-10 bg-amber-warm/20 rounded-full flex items-center justify-center shrink-0">
              <Accessibility className="w-5 h-5 text-amber-warm" />
            </div>
            <div>
              <p className="font-semibold text-brown-deep text-sm">
                Homebound Delivery Service
              </p>
              <p className="text-sm text-brown-light mt-1">
                Patrons who are unable to visit the library due to disability, illness, or recovery
                may be eligible for free home delivery of library materials. Contact the Reference
                Desk to register for this service.
              </p>
            </div>
          </div>
        </section>

        {/* ── Digital accessibility ──────────────────────────────────── */}
        <section className="space-y-5">
          <h2 className="font-display text-2xl font-bold text-brown-deep flex items-center gap-2">
            <Monitor className="w-6 h-6 text-amber-warm" />
            Digital Accessibility
          </h2>

          <div className="space-y-3">
            {DIGITAL_FEATURES.map((item) => (
              <div
                key={item.area}
                className="flex gap-4 p-4 bg-parchment border border-sand rounded-xl"
              >
                <div className="shrink-0 mt-0.5">
                  {item.status === "aa" ? (
                    <span className="flex items-center gap-1 text-xs font-semibold bg-green-muted/30 text-green-library border border-green-muted px-2 py-0.5 rounded-full whitespace-nowrap">
                      <CheckCircle className="w-3 h-3" />
                      WCAG 2.1 AA
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-semibold bg-amber-warm/10 text-amber-dark border border-amber-warm/30 px-2 py-0.5 rounded-full whitespace-nowrap">
                      <AlertCircle className="w-3 h-3" />
                      Third party
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-brown-deep text-sm">{item.area}</p>
                  <p className="text-sm text-brown-light mt-0.5 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-parchment border border-sand rounded-xl p-4 space-y-2">
            <p className="text-sm font-semibold text-brown-deep">Known Limitations</p>
            <ul className="space-y-1.5">
              {[
                "Some older PDF documents in our research archive may not be fully screen-reader accessible. We are working to remediate these.",
                "Video content created before 2022 may lack closed captions. New videos are captioned at publication.",
                "Third-party embedded maps use Google Maps and may have limitations for keyboard users.",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm text-brown-light">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-warm shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Contact & feedback ────────────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-parchment border border-sand rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-brown-deep">
              Request an Accommodation
            </h2>
            <p className="text-sm text-brown-light leading-relaxed">
              If you need an accommodation to access library programs, facilities, or services,
              please contact us as early as possible. We will work with you to find a solution.
            </p>
            <div className="space-y-2.5">
              {[
                {
                  icon: <Phone className="w-4 h-4" />,
                  label: "(973) 555-0142",
                  href: "tel:+19735550142",
                },
                {
                  icon: <Mail className="w-4 h-4" />,
                  label: "access@foliolibrary.org",
                  href: "mailto:access@foliolibrary.org",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2.5 text-sm text-amber-dark hover:underline"
                >
                  <div className="w-7 h-7 bg-amber-warm/10 rounded-lg flex items-center justify-center text-amber-warm">
                    {item.icon}
                  </div>
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="bg-parchment border border-sand rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-brown-deep">
              Report a Digital Barrier
            </h2>
            <p className="text-sm text-brown-light leading-relaxed">
              If you encounter a barrier on our website, catalog, or any digital service, please
              let us know. We take accessibility feedback seriously and aim to resolve issues
              within 5 business days.
            </p>
            <a
              href="mailto:webmaster@foliolibrary.org?subject=Accessibility Feedback"
              className="inline-flex items-center gap-2 text-sm font-medium bg-amber-warm hover:bg-amber-dark text-cream px-4 py-2.5 rounded-xl transition-colors"
            >
              <Mail className="w-4 h-4" />
              Send Accessibility Feedback
            </a>
            <p className="text-xs text-brown-light/60">
              You may also file a complaint with the NJ Division on Civil Rights or the U.S.
              Department of Justice if you believe your rights have been violated.
            </p>
          </div>
        </section>

        {/* ── Footer nav ───────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-sand text-sm">
          <Link href="/about" className="text-amber-dark hover:underline flex items-center gap-1">
            About Folio <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link href="/locations" className="text-amber-dark hover:underline flex items-center gap-1">
            Branch Locations <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link href="/ask-librarian" className="text-amber-dark hover:underline flex items-center gap-1">
            Ask a Librarian <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
