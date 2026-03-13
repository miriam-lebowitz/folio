import { withAuth } from "next-auth/middleware"

/**
 * Protects /account/* and /admin/* routes — redirects unauthenticated
 * visitors to the login page (defined in authOptions.pages.signIn).
 */
export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
})

export const config = {
  matcher: ["/account/:path*", "/admin/:path*"],
}
