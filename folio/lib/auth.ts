import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

/**
 * NextAuth configuration.
 * Uses a credentials provider with demo users for development.
 * In production, replace the authorize() logic with real database lookups.
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Library Card",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "patron@foliolibrary.org" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Demo user roster — swap this for a real DB query in production
        const demoUsers = [
          {
            id: "1",
            name: "Sarah Chen",
            email: "patron@library.org",
            password: "password",
            role: "patron",
            cardNumber: "LIB-00042",
          },
          {
            id: "2",
            name: "James Rivera",
            email: "staff@library.org",
            password: "staffpass",
            role: "staff",
            cardNumber: "LIB-STAFF-01",
          },
          {
            id: "3",
            name: "Admin User",
            email: "admin@library.org",
            password: "adminpass",
            role: "admin",
            cardNumber: "LIB-ADM-01",
          },
        ]

        const user = demoUsers.find(
          (u) => u.email === credentials?.email && u.password === credentials?.password,
        )

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            cardNumber: user.cardNumber,
          }
        }

        return null
      },
    }),
  ],

  session: { strategy: "jwt" },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      // Persist custom fields into the JWT on initial sign-in
      if (user) {
        token.role = (user as any).role
        token.cardNumber = (user as any).cardNumber
      }
      return token
    },
    async session({ session, token }) {
      // Expose custom fields on the session object for client use
      if (session.user) {
        ;(session.user as any).role = token.role
        ;(session.user as any).cardNumber = token.cardNumber
        ;(session.user as any).id = token.sub
      }
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}
