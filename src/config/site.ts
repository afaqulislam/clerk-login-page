export const siteConfig = {
  name: "Afaq Hub",
  title: "Afaq Hub — Ignite Your Imagination",
  description:
    "Sign in to unlock amazing features and ignite your imagination at Afaq Hub.",
  keywords: [
    "Afaq Hub",
    "login",
    "signup",
    "authentication",
    "premium",
    "creative",
  ] as string[],
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  logo: "/favicon.svg",
  tagline: "Ignite your imagination and achieve greatness.",
} as const;
