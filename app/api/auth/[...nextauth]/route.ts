import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// Exposes NextAuth GET and POST handlers for the App Router
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
