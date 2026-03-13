<div align="center">

<br />

<img src="https://api.iconify.design/lucide:book-open.svg?color=%23c4892a&width=64&height=64" alt="Folio" />

# Folio

### An open-source public library website template

*Built for libraries, by library lovers — free to use, fork, and make your own.*

[![Next.js](https://img.shields.io/badge/Next.js_16-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-c4892a.svg)](LICENSE)

</div>

---

## What is Folio?

Folio is a fully-featured, open-source library website template designed for public libraries of any size. It ships with everything a modern library needs — catalog search, patron account management, event listings, digital resources, room booking, and an AI-powered librarian chatbot — so your team can spend less time building and more time serving your community.

Clone it, customize it with your library's name, colors, and collection, and go live. No vendor lock-in. No licensing fees. Just a welcoming digital home for your patrons.

---

## Features

**📚 Catalog & Discovery**
- Full-text catalog search powered by the [Open Library API](https://openlibrary.org/developers/api)
- Staff picks and new arrivals sections on the homepage
- Browse by genre with book counts
- Detailed book pages with description, author, and availability tabs

**👤 Patron Accounts**
- Secure login and registration with library card numbers
- View current checkouts with due dates and renewal options
- Manage holds and waitlists
- Reading lists (want to read, reading, finished)
- Fines & fees overview
- Notification preferences

**🤖 Ask a Librarian (AI)**
- 24/7 AI chat assistant powered by [Claude](https://anthropic.com) via the [Vercel AI SDK](https://sdk.vercel.ai)
- Warm, knowledgeable persona scoped to your library's services and hours
- Handles book recommendations, account questions, digital access help, and more

**📅 Events & Programs**
- Upcoming events calendar with category filtering
- Featured event highlight
- Event registration form

**🏛️ Library Services**
- Interlibrary Loan (ILL) request form
- Study room and equipment booking
- Digital resources hub (eBooks, audiobooks, magazines)

**⚙️ Admin Panel**
- Catalog management
- User management
- Reports dashboard

**♿ Accessibility**
- Accessibility statement page
- Keyboard-navigable UI with visible focus rings
- Semantic HTML throughout

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| UI Primitives | [Radix UI](https://www.radix-ui.com) |
| Auth | [NextAuth.js v4](https://next-auth.js.org) |
| AI | [Vercel AI SDK v6](https://sdk.vercel.ai) + [Anthropic Claude](https://anthropic.com) |
| Icons | [Lucide React](https://lucide.dev) |
| Catalog API | [Open Library](https://openlibrary.org/developers) |
| Runtime | [Bun](https://bun.sh) |

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/folio.git
cd folio
```

### 2. Install dependencies

```bash
bun install
```

### 3. Set up environment variables

Copy the example below into a new `.env.local` file at the project root:

```bash
# NextAuth — generate a secret with: openssl rand -base64 32
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# Anthropic — required for the Ask a Librarian AI chat
ANTHROPIC_API_KEY=sk-ant-...
```

### 4. Run the development server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see your library.

---

## Demo Accounts

Folio ships with three demo accounts for local development:

| Role | Email | Password |
|---|---|---|
| Patron | `patron@library.org` | `password` |
| Staff | `staff@library.org` | `staffpass` |
| Admin | `admin@library.org` | `adminpass` |

> **For production:** replace the demo user roster in `lib/auth.ts` with real database lookups.

---

## Customizing for Your Library

Folio is built to be adapted. Here are the key places to make it your own:

| What to change | Where |
|---|---|
| Library name, address, hours | `app/api/chat/route.ts` (AI prompt) and `components/Footer.tsx` |
| Brand colors | `app/globals.css` (CSS custom properties) |
| Staff picks & events data | `lib/data.ts` |
| Navigation links | `components/NavBar.tsx` |
| AI librarian persona | `app/api/chat/route.ts` (the system prompt) |
| Patron account data | `lib/account-data.ts` |

---

## Project Structure

```
folio/
├── app/
│   ├── api/              # API routes (auth, AI chat)
│   ├── account/          # Patron account pages
│   ├── admin/            # Staff & admin panel
│   ├── ask-librarian/    # AI chat page
│   ├── catalog/          # Catalog browse & book detail
│   ├── digital/          # eBooks, audiobooks, magazines
│   ├── events/           # Events calendar & detail
│   └── ...               # Other pages
├── components/           # Shared UI components
├── lib/                  # Data, auth config, utilities
└── public/               # Static assets
```

---

## Deploying

The easiest way to deploy Folio is with [Vercel](https://vercel.com). Connect your repository, add your environment variables, and you're live in minutes.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## Contributing

Contributions are warmly welcomed — whether that's a bug fix, a new feature, or improvements to accessibility and documentation. Please open an issue to discuss larger changes before submitting a pull request.

---

## License

MIT — free to use for any library, anywhere.

---

<div align="center">
<sub>Made with 📚 for libraries and the communities they serve.</sub>
</div>
