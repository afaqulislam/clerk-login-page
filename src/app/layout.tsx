import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

import type { Appearance } from "@clerk/types";
import { siteConfig } from "@/config/site";

const clerkAppearance: Appearance = {
  baseTheme: dark,
  layout: {
    logoImageUrl: siteConfig.logo,
    logoPlacement: "inside",
  },
  variables: {
    colorPrimary: "#C9A227",
    colorBackground: "#0e0e0e",
    colorInputBackground: "#151515",
    colorInputText: "#fafafa",
    colorText: "#fafafa",
    colorTextSecondary: "#bdbdbd",
    colorDanger: "#ef4444",
    borderRadius: "0.8rem",
    fontFamily: "var(--font-inter), system-ui, sans-serif",
  },
  elements: {
    card: {
      boxShadow: "0 24px 60px rgba(0,0,0,0.7)",
      border: "1px solid rgba(255,255,255,0.08)",
    },
    header: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
    logoBox: {
      width: "56px",
      height: "56px",
      borderRadius: "0.75rem",
      border: "1px solid rgba(201,162,39,0.35)",
      background: "rgba(201,162,39,0.1)",
      padding: "10px",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
    },
    logoImage: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      borderRadius: "0.5rem",
    },
    headerTitle: {
      fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
      fontWeight: 600,
      marginTop: "14px",
    },
    formButtonPrimary: {
      backgroundColor: "#C9A227",
      color: "#000",
      fontWeight: 600,
      "&:hover": {
        backgroundColor: "#e0b53a",
      },
    },
    formFieldInput: {
      borderRadius: "0.6rem",
    },
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  icons: {
    icon: siteConfig.logo,
    shortcut: siteConfig.logo,
    apple: siteConfig.logo,
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    images: [
      {
        url: siteConfig.logo,
        width: 256,
        height: 256,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.logo],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0e0e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={clerkAppearance}>
      <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <body className="font-sans antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
