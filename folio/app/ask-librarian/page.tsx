"use client"

import { useChat } from "@ai-sdk/react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Send, MapPin, Phone, Clock, BookOpen, Sparkles } from "lucide-react"
import type { UIMessage } from "ai"

const SUGGESTED_QUESTIONS = [
  "Can you recommend a gripping mystery novel?",
  "How do I access ebooks with my library card?",
  "What events are coming up this month?",
  "How do I place a hold on a book?",
  "What's the difference between Libby and hoopla?",
  "Can you suggest books similar to The Midnight Library?",
  "How does interlibrary loan work?",
  "What are your hours on Sundays?",
]

/** Extract plain text from a UIMessage's parts array (AI SDK v6). */
function getMessageText(message: UIMessage): string {
  for (const part of message.parts) {
    if (part.type === "text") return part.text
  }
  return ""
}

// Seed a greeting so the window is never empty on load
const WELCOME_MESSAGE: UIMessage = {
  id: "welcome",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "Hi! I'm Alex, your digital librarian at Folio Public Library 📚\n\nI'm here to help with book recommendations, account questions, digital access, upcoming events, or anything else about our library and collections. What can I help you with today?",
      state: "done",
    },
  ],
  metadata: undefined,
}

export default function AskLibrarianPage() {
  const { messages, sendMessage, status } = useChat({
    // ChatInit.messages seeds the conversation without an API call
    // DefaultChatTransport calls /api/chat/{chatId}/stream
    messages: [WELCOME_MESSAGE],
  })

  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const isLoading = status === "streaming" || status === "submitted"
  const hasUserMessages = messages.some((m) => m.role === "user")

  // Scroll to the latest message whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const text = inputValue.trim()
    if (!text || isLoading) return
    sendMessage({ text })
    setInputValue("")
  }

  function handleSuggestion(question: string) {
    sendMessage({ text: question })
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* ── Page header ─────────────────────────────────────────────── */}
        <div className="text-center mb-8 space-y-3">
          <div className="w-16 h-16 bg-amber-warm rounded-2xl flex items-center justify-center mx-auto text-cream font-display font-bold text-2xl shadow-md">
            A
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-brown-deep">Ask a Librarian</h1>
            <p className="text-brown-light mt-1">
              Chat with <span className="font-medium text-brown">Alex</span>, Folio's digital
              librarian — available 24/7
            </p>
          </div>
        </div>

        {/* ── Chat window ─────────────────────────────────────────────── */}
        <div className="bg-parchment border border-sand rounded-2xl shadow-sm overflow-hidden">

          {/* Message feed */}
          <div className="h-[520px] overflow-y-auto p-6 space-y-5">
            {messages.map((message) => {
              const text = getMessageText(message)
              if (!text) return null
              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Librarian avatar */}
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 bg-amber-warm rounded-full flex items-center justify-center text-cream text-sm font-bold shrink-0 mt-0.5">
                      A
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                      message.role === "user"
                        ? "bg-brown-deep text-cream rounded-tr-none"
                        : "bg-cream border border-sand/60 text-brown rounded-tl-none"
                    }`}
                  >
                    {text}
                  </div>
                </div>
              )
            })}

            {/* Typing indicator while streaming */}
            {isLoading && (
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 bg-amber-warm rounded-full flex items-center justify-center text-cream text-sm font-bold shrink-0">
                  A
                </div>
                <div className="bg-cream border border-sand/60 rounded-2xl rounded-tl-none px-4 py-3.5">
                  <div className="flex items-center gap-1">
                    {[0, 150, 300].map((delay) => (
                      <span
                        key={delay}
                        className="block w-2 h-2 bg-brown-light/50 rounded-full animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions — shown before the first user message */}
          {!hasUserMessages && (
            <div className="px-6 pb-5 border-t border-sand/50 pt-4 space-y-3">
              <p className="text-xs font-semibold text-brown-light uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-warm" />
                Try asking…
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSuggestion(q)}
                    disabled={isLoading}
                    className="text-sm bg-cream border border-sand text-brown hover:bg-amber-warm hover:text-cream hover:border-amber-warm rounded-full px-3 py-1.5 transition-colors disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input bar */}
          <div className="border-t border-sand bg-cream/60 px-4 py-4">
            <form onSubmit={handleSubmit} className="flex gap-2.5 items-center">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about books, services, events, or anything library-related…"
                disabled={isLoading}
                autoComplete="off"
                className="flex-1 h-11 px-4 rounded-xl border border-sand bg-cream text-brown-deep text-sm placeholder:text-brown-light/55 focus:outline-none focus:ring-2 focus:ring-amber-warm disabled:opacity-50 transition-colors"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                aria-label="Send message"
                className="w-11 h-11 bg-amber-warm hover:bg-amber-dark text-cream rounded-xl flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-xs text-brown-light/50 mt-2 text-center">
              Powered by AI · For real-time catalog availability, check{" "}
              <Link href="/search" className="underline underline-offset-2 hover:text-brown-light">
                the catalog
              </Link>{" "}
              or call (973) 555-0142
            </p>
          </div>
        </div>

        {/* ── Alternative contact options ──────────────────────────── */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: <Phone className="w-5 h-5" />,
              title: "Call Us",
              body: "(973) 555-0142",
              sub: "Mon–Thu 9 am–9 pm",
            },
            {
              icon: <MapPin className="w-5 h-5" />,
              title: "Visit In Person",
              body: "42 Maple Street",
              sub: "Maplewood, NJ 07040",
            },
            {
              icon: <Clock className="w-5 h-5" />,
              title: "Reference Desk",
              body: "Mon–Sat, open hours",
              sub: "No appointment needed",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="flex gap-3 p-4 bg-parchment border border-sand rounded-xl items-start"
            >
              <div className="w-9 h-9 bg-sand/50 rounded-lg flex items-center justify-center text-brown-light shrink-0">
                {card.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-brown-deep">{card.title}</p>
                <p className="text-sm text-brown mt-0.5">{card.body}</p>
                <p className="text-xs text-brown-light mt-0.5">{card.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── ILL cross-link ──────────────────────────────────────────── */}
        <div className="mt-6 p-4 bg-parchment border border-sand rounded-xl flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-amber-warm shrink-0" />
          <p className="text-sm text-brown-light">
            Need a book that Folio doesn't carry?{" "}
            <Link
              href="/ill"
              className="text-amber-dark hover:underline underline-offset-2 font-medium"
            >
              Submit an Interlibrary Loan request
            </Link>{" "}
            and we'll find it for you.
          </p>
        </div>
      </div>
    </div>
  )
}
