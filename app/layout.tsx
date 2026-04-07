// =============================================================================
// RIXVEN — app/layout.tsx  (Next.js 14+ — App Router)
//
// What this file owns:
//   ✓ Google Fonts via next/font (Syne · Instrument Sans · Geist Mono)
//   ✓ Viewport export (separated from metadata per Next.js 14 requirement)
//   ✓ Full Metadata object — OpenGraph, Twitter Card, robots, alternates
//   ✓ JSON-LD structured data (Organization + WebSite schemas)
//   ✓ Glassmorphism Navbar + Corporate Footer
//
// What this file intentionally does NOT own:
//   ✗ icons  → handled automatically by app/icon.tsx & app/apple-icon.tsx
//   ✗ manifest link → handled automatically by app/manifest.ts
//   ✗ <link rel="preconnect"> for Google Fonts → next/font injects these
//     optimally; adding them manually creates duplicate hints.
// =============================================================================

import type { Metadata, Viewport } from "next";
import { Syne, Instrument_Sans, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// ---------------------------------------------------------------------------
// FONTS
// ---------------------------------------------------------------------------

/** Syne — Geometric, authoritative. Headings & display text. */
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
  preload: true,
});

/** Instrument Sans — Refined, modern. Body text & UI elements. */
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-instrument-sans",
  display: "swap",
  preload: true,
});

/** Geist Mono — Code blocks, technical specs, terminal displays. */
const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false, // Loaded on-demand; not needed for initial paint
});

// ---------------------------------------------------------------------------
// VIEWPORT
// In Next.js 14+, viewport must be a *separate* named export — placing it
// inside `metadata` is deprecated and causes a build warning.
// ---------------------------------------------------------------------------
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  // Must match manifest.ts theme_color exactly to avoid a colour flash
  // between the splash screen and the first painted frame.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
  colorScheme: "light dark",
};

// ---------------------------------------------------------------------------
// METADATA
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  // ── Base URL (resolves relative OG image paths) ──────────────────────────
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://rixven.com"
  ),

  // ── Title ─────────────────────────────────────────────────────────────────
  title: {
    default: "RIXVEN — The Core of Modern Intelligence",
    // Child pages set their own title; this template appends the brand.
    template: "%s | RIXVEN",
  },

  // ── Core ──────────────────────────────────────────────────────────────────
  description:
    "RIXVEN is a global technology conglomerate building next-generation Operating Systems, autonomous AI architectures, and high-performance systems programming languages. Powering the infrastructure of tomorrow.",

  keywords: [
    "RIXVEN",
    "RIXVEN OS",
    "RIXVEN AI",
    "RIXVEN Lang",
    "operating system",
    "artificial intelligence",
    "systems programming",
    "technology conglomerate",
    "next-generation computing",
    "autonomous AI",
    "high-performance computing",
  ],

  authors: [{ name: "RIXVEN Corporation", url: "https://rixven.com" }],
  creator: "RIXVEN Corporation",
  publisher: "RIXVEN Corporation",

  // ── OpenGraph ─────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rixven.com",
    siteName: "RIXVEN",
    title: "RIXVEN — The Core of Modern Intelligence",
    description:
      "Global technology conglomerate. Operating Systems. Autonomous AI. Systems Languages.",
    images: [
      {
        // Generate this at 1200×630 — e.g. via app/opengraph-image.tsx
        url: "/og/rixven-og-default.png",
        width: 1200,
        height: 630,
        alt: "RIXVEN — The Core of Modern Intelligence",
        type: "image/png",
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@rixven",
    creator: "@rixven",
    title: "RIXVEN — The Core of Modern Intelligence",
    description:
      "Global technology conglomerate. Operating Systems. Autonomous AI. Systems Languages.",
    images: ["/og/rixven-og-default.png"],
  },

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Verification ──────────────────────────────────────────────────────────
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
    // yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION ?? '',
    // other: { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION ?? '' },
  },

  // ── Canonical + hreflang alternates ───────────────────────────────────────
  alternates: {
    canonical: "https://rixven.com",
    languages: {
      "en-US": "https://rixven.com",
      // 'zh-CN': 'https://rixven.com/zh',
    },
  },

  // ── PWA / App metadata ────────────────────────────────────────────────────
  applicationName: "RIXVEN",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RIXVEN",
    // startupImage can be added here if you generate splash screens
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // ── DO NOT ADD ────────────────────────────────────────────────────────────
  // icons:    Next.js reads app/icon.tsx & app/apple-icon.tsx automatically.
  //           Adding icons here creates *duplicate* <link> tags and breaks
  //           the content-hash cache keys that Next.js manages for you.
  //
  // manifest: Next.js reads app/manifest.ts automatically.
  //           Adding it here emits a duplicate <link rel="manifest"> tag.
};

// ---------------------------------------------------------------------------
// JSON-LD STRUCTURED DATA
// ---------------------------------------------------------------------------

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RIXVEN",
  alternateName: ["RIXVEN Corporation", "RIXVEN Technologies"],
  url: "https://rixven.com",
  logo: {
    "@type": "ImageObject",
    // Point at the dynamic icon route — always fresh, no stale PNG in /public
    url: "https://rixven.com/icon",
    width: "512",
    height: "512",
  },
  description:
    "RIXVEN is a global technology conglomerate building next-generation Operating Systems (RIXVEN OS), autonomous AI architectures (RIXVEN AI), and high-performance systems programming languages (RIXVEN Lang).",
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@rixven.com",
    contactType: "customer support",
    availableLanguage: "English",
  },
  sameAs: [
    "https://twitter.com/rixven",
    "https://github.com/rixven",
    "https://linkedin.com/company/rixven",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "RIXVEN Products",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "SoftwareApplication",
          name: "RIXVEN OS",
          applicationCategory: "OperatingSystem",
          description:
            "Next-generation operating system with autonomous kernel management.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "SoftwareApplication",
          name: "RIXVEN AI",
          applicationCategory: "AIApplication",
          description:
            "Autonomous AI architecture for enterprise and edge deployments.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "SoftwareApplication",
          name: "RIXVEN Lang",
          applicationCategory: "DeveloperApplication",
          description:
            "High-performance systems programming language with zero-cost abstractions.",
        },
      },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RIXVEN",
  url: "https://rixven.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://rixven.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

// ---------------------------------------------------------------------------
// ROOT LAYOUT
// ---------------------------------------------------------------------------
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={[
        syne.variable,
        instrumentSans.variable,
        geistMono.variable,
        "scroll-smooth antialiased",
      ].join(" ")}
      suppressHydrationWarning
    >
      <head>
        {/*
         * NOTE: Do NOT add <link rel="preconnect"> for Google Fonts here.
         * next/font/google injects optimal preconnect hints automatically
         * during the build. Adding them manually creates duplicate hints
         * that can actually *slow down* resource discovery.
         */}

        {/* JSON-LD — rendered before interactive so crawlers see it immediately */}
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          id="json-ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>

      <body
        className="
          font-sans
          bg-white text-rixven-charcoal
          selection:bg-rixven-blue-100 selection:text-rixven-blue-900
          [--navbar-height:72px]
        "
      >
        {/* Accessibility: skip nav for keyboard users */}
        <a
          href="#main-content"
          className="
            sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
            focus:z-[9999] focus:px-4 focus:py-2
            focus:bg-rixven-blue focus:text-white
            focus:rounded-md focus:text-sm focus:font-medium
            focus:shadow-blue-glow focus:outline-none
          "
        >
          Skip to main content
        </a>

        <Navbar />

        <main
          id="main-content"
          className="flex flex-col min-h-[calc(100vh-var(--navbar-height))]"
        >
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
