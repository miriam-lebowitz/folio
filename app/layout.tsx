import type { Metadata } from "next"
import { Playfair_Display, Lato } from "next/font/google"
import "./globals.css"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import SessionProvider from "@/components/providers/SessionProvider"

/* ─── Google Fonts ──────────────────────────────────────────────────────────── */

// Playfair Display — used for headings, titles, and branded text
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

// Lato — clean, highly legible sans-serif for body copy
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
})

/* ─── Site Metadata ─────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "Folio Public Library",
    template: "%s | Folio Public Library",
  },
  description:
    "Your community's home for books, learning, and connection. Search our catalog, manage your account, and discover programs at Folio Public Library.",
  keywords: ["library", "books", "ebooks", "audiobooks", "community", "Maplewood"],
}

/* ─── Root Layout ───────────────────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className="font-sans antialiased bg-cream text-foreground min-h-screen flex flex-col">
        {/*
          SessionProvider wraps the entire app so any client component can call
          useSession() to access authentication state.
        */}
        <SessionProvider>
          <NavBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
