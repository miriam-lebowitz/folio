import { Suspense } from "react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { authOptions } from "@/lib/auth"
import LoginForm from "./LoginForm"

// ── Static decorative side panel quotes ─────────────────────────────────────

const QUOTES = [
  {
    text: "A library is not a luxury but one of the necessities of life.",
    attr: "Henry Ward Beecher",
  },
  {
    text: "Libraries were full of ideas — perhaps the most dangerous and powerful of all weapons.",
    attr: "Sarah J. Maas",
  },
  {
    text: "A great library contains the diary of the human race.",
    attr: "George Mercer Dawson",
  },
]

const quote = QUOTES[0]

// ── Server component — redirects already-signed-in users ────────────────────

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>
}) {
  const session = await getServerSession(authOptions)
  if (session) redirect("/account")

  const params = await searchParams
  const callbackUrl = params.callbackUrl ?? "/account"
  const authError = params.error ?? null

  return (
    <div className="min-h-screen flex">

      {/* ── Decorative left panel (desktop) ──────────────────────── */}
      <div className="hidden lg:flex flex-col justify-between w-2/5 bg-gradient-to-br from-brown-deep via-brown to-brown-light/80 p-12 text-cream">
        {/* Top: brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold">Folio</span>
          <span className="text-cream/40 text-sm">Public Library</span>
        </Link>

        {/* Middle: quote */}
        <div className="space-y-4">
          <div className="w-12 h-1 bg-amber-warm rounded-full" />
          <blockquote className="font-display text-2xl font-bold leading-snug">
            "{quote.text}"
          </blockquote>
          <p className="text-cream/60 text-sm">— {quote.attr}</p>
        </div>

        {/* Bottom: stats */}
        <div className="grid grid-cols-3 gap-4 border-t border-cream/10 pt-8">
          {[
            ["18,402", "items"],
            ["1,247", "patrons"],
            ["Since 1924", "community"],
          ].map(([val, label]) => (
            <div key={label}>
              <p className="font-display font-bold text-xl text-amber-warm">{val}</p>
              <p className="text-xs text-cream/50 mt-0.5 capitalize">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel: form ──────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-cream">
        {/* Mobile brand */}
        <Link href="/" className="lg:hidden mb-8 font-display text-xl font-bold text-brown-deep">
          Folio Public Library
        </Link>

        <Suspense>
          <LoginForm callbackUrl={callbackUrl} authError={authError} />
        </Suspense>

        <p className="mt-8 text-xs text-brown-light/50 text-center max-w-xs">
          By signing in you agree to Folio's{" "}
          <Link href="/about#privacy" className="underline hover:text-brown-light">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/about#code-of-conduct" className="underline hover:text-brown-light">
            Terms of Use
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
