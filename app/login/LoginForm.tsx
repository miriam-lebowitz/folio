"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2, AlertCircle, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function LoginForm({
  callbackUrl,
  authError,
}: {
  callbackUrl: string
  authError: string | null
}) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(
    authError === "CredentialsSignin" ? "Invalid email or password. Please try again." : null,
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    })

    setLoading(false)

    if (result?.ok) {
      router.push(callbackUrl)
      router.refresh()
    } else {
      setError("Invalid email or password. Please try again.")
    }
  }

  function fillDemo(role: "patron" | "staff" | "admin") {
    const demos = {
      patron: { email: "patron@library.org", password: "password" },
      staff: { email: "staff@library.org", password: "staffpass" },
      admin: { email: "admin@library.org", password: "adminpass" },
    }
    setEmail(demos[role].email)
    setPassword(demos[role].password)
    setError(null)
  }

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      {/* Logo */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 bg-amber-warm rounded-2xl flex items-center justify-center mx-auto shadow-md">
          <BookOpen className="w-7 h-7 text-cream" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-brown-deep">Welcome back</h1>
          <p className="text-brown-light text-sm mt-1">Sign in to your Folio library account</p>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex gap-2.5 items-start p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs text-amber-dark hover:underline underline-offset-2"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-light/50 hover:text-brown-light transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Signing in…
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-brown-light">
        Don't have a card?{" "}
        <Link href="/register" className="text-amber-dark hover:underline font-medium">
          Apply for a library card
        </Link>
      </p>

      {/* Demo credentials */}
      <div className="bg-amber-warm/8 border border-amber-warm/25 rounded-xl p-4 space-y-2.5">
        <p className="text-xs font-semibold text-brown-deep">
          Demo accounts — click to fill
        </p>
        <div className="flex flex-wrap gap-2">
          {(["patron", "staff", "admin"] as const).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => fillDemo(role)}
              className="text-xs capitalize bg-cream border border-sand hover:border-amber-warm/60 text-brown px-3 py-1.5 rounded-full transition-colors"
            >
              {role}
            </button>
          ))}
        </div>
        <p className="text-xs text-brown-light/60">
          Patron: patron@library.org / password
        </p>
      </div>
    </div>
  )
}
