"use client"

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"

/**
 * Thin client wrapper around NextAuth's SessionProvider.
 * Placed in the root layout so all client components can call useSession().
 */
export default function SessionProvider({ children }: { children: React.ReactNode }) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}
