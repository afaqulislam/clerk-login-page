<p align="center">
  <img src="public/favicon.svg" alt="Afaq Hub Logo" width="96" height="96" />
</p>

<h1 align="center">Afaq Hub</h1>

<p align="center">
  A premium, gold-themed sign-in &amp; sign-up experience built with
  <strong>Next.js 15</strong>, <strong>Clerk</strong>, <strong>Tailwind CSS</strong>, and <strong>Framer Motion</strong>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white" alt="TypeScript 5" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 3" />
  <img src="https://img.shields.io/badge/Clerk-Auth-6c47ff?logo=clerk&logoColor=white" alt="Clerk" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License: MIT" />
</p>

---

## ✨ Features

| | |
|---|---|
| 🔐 **Complete authentication** | Sign In, Sign Up, and full account management through Clerk modals |
| 🎨 **Premium gold UI** | A single consistent luxury accent over a deep charcoal base |
| 🎬 **Smooth animations** | Framer Motion entrance & exit transitions, animated particle canvas |
| ♿ **Accessible** | Keyboard focus states, ARIA labels, semantic markup |
| ⚡ **Performance** | `next/font` loading, reduced-motion support, canvas cleanup |
| 🕒 **Real-time footer** | Live date & time displayed in the footer |
| 🔍 **SEO-ready** | Metadata, Open Graph, Twitter cards, PWA manifest, custom favicon |
| 📱 **Responsive** | Optimized for mobile, tablet, and desktop |

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.18+ (20+ recommended)
- A **Clerk** account — [dashboard.clerk.com](https://dashboard.clerk.com)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/afaqulislam/clerk-login-page.git
cd clerk-login-page

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env.local
```

### Configuration

Open `.env.local` and add your keys from the Clerk Dashboard → **API Keys**:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🧰 Scripts

| Command            | Description                     |
| ------------------ | ------------------------------- |
| `npm run dev`      | Start the development server    |
| `npm run build`    | Build for production            |
| `npm run start`    | Start the production build      |
| `npm run lint`     | Run ESLint                      |
| `npm run typecheck` | Run TypeScript type checking   |

## 📁 Project Structure

```
.
├── public/
│   ├── favicon.svg               # Gold crown favicon
│   └── manifest.webmanifest      # PWA manifest
└── src/
    ├── app/
    │   ├── layout.tsx            # Root layout, SEO metadata, Clerk theme
    │   ├── page.tsx              # Landing + authentication UI
    │   └── globals.css           # Design tokens & global styles
    ├── config/
    │   └── site.ts               # Centralised site & brand configuration
    └── middleware.ts             # Clerk authentication middleware
```

## 🛠 Customisation

| What                     | Where                          |
| ------------------------ | ------------------------------ |
| Brand name & tagline     | `src/config/site.ts`           |
| Colour palette           | `src/app/globals.css`, `tailwind.config.ts` |
| Logo / favicon           | `public/favicon.svg`           |
| Clerk modal appearance   | `clerkAppearance` in `src/app/layout.tsx` |

## ☁️ Deploy on Vercel

```bash
vercel
```

Or push the repository to [Vercel](https://vercel.com/new) and set the environment variables
(`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `NEXT_PUBLIC_APP_URL`) in the dashboard.

---

<p align="center">
  Made with <span style="color: #C9A227;">♥</span> by <a href="https://www.linkedin.com/in/afaqulislam">Afaq Ul Islam</a>
</p>

<p align="center">
  <img src="public/favicon.svg" alt="Afaq Hub" width="32" height="32" />
  <br />
  <em>Ignite your imagination and achieve greatness.</em>
</p>