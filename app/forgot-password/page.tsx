"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { BookOpen, Mail, CheckCircle, Loader2, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm space-y-6">

        {/* Brand mark */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-amber-warm rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <BookOpen className="w-7 h-7 text-cream" />
          </div>
          <p className="text-xs text-brown-light font-medium">Folio Public Library</p>
        </div>

        {submitted ? (
          // ── Success state ──────────────────────────────────────────
          <div className="bg-parchment border border-sand rounded-2xl p-8 space-y-5 text-center">
            <div className="w-14 h-14 bg-green-library/15 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-library" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-brown-deep">Check your inbox</h1>
              <p className="text-brown-light text-sm mt-2 leading-relaxed">
                If an account exists for{" "}
                <strong className="text-brown-deep">{email}</strong>, we've sent a link to reset
                your password. It will expire in 60 minutes.
              </p>
            </div>
            <div className="bg-amber-warm/8 border border-amber-warm/20 rounded-xl p-3">
              <p className="text-xs text-brown-light">
                Didn't receive it? Check your spam folder, or{" "}
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setEmail("")
                  }}
                  className="text-amber-dark hover:underline"
                >
                  try again
                </button>
                .
              </p>
            </div>
            <p className="text-xs text-brown-light/50">
              Still having trouble? Call us at (973) 555-0142.
            </p>
          </div>
        ) : (
          // ── Form ──────────────────────────────────────────────────
          <div className="bg-parchment border border-sand rounded-2xl p-8 space-y-5">
            <div className="space-y-1">
              <h1 className="font-display text-xl font-bold text-brown-deep">Reset your password</h1>
              <p className="text-sm text-brown-light">
                Enter the email address on your account and we'll send you a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="fpemail">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-light/50" />
                  <Input
                    id="fpemail"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="pl-9"
                  />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin mr-2" />Sending…</>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>

            <Link
              href="/login"
              className="flex items-center justify-center gap-1.5 text-sm text-brown-light hover:text-amber-dark transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
