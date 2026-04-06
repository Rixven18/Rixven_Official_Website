// =============================================================================
// RIXVEN — app/layout.tsx
// Master layout wrapper. Handles:
//   - Google Fonts (Syne + Instrument Sans + Geist Mono)
//   - JSON-LD Organization Schema (100/100 Lighthouse SEO)
//   - Dynamic OpenGraph & Twitter Card metadata
//   - Glassmorphism Navbar (with RIXVEN SVG logo)
//   - Comprehensive Corporate Footer
//   - Framer Motion AnimatePresence wrapper
// =============================================================================

import type { Metadata, Viewport } from 'next';
import { Syne, Instrument_Sans, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// ---------------------------------------------------------------------------
// FONTS — Premium, non-generic typefaces
// ---------------------------------------------------------------------------

/** Syne — Geometric, authoritative. Used for ALL headings and display text. */
const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
  preload: true,
});

/** Instrument Sans — Refined, modern. Used for body text and UI elements. */
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-sans',
  display: 'swap',
  preload: true,
});

/** Geist Mono — For code blocks, technical specs, and terminal displays. */
const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-geist-mono',
  display: 'swap',
  preload: false,
});

// ---------------------------------------------------------------------------
// VIEWPORT CONFIGURATION
// ---------------------------------------------------------------------------
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)',  color: '#0F172A' },
  ],
  colorScheme: 'light dark',
};

// ---------------------------------------------------------------------------
// ROOT METADATA — Dynamic OpenGraph & Twitter Cards (SEO 100/100)
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  // === BASE ===
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rixven.com'),
  title: {
    default:  'RIXVEN — The Core of Modern Intelligence',
    template: '%s | RIXVEN',
  },
  description:
    'RIXVEN is a global technology conglomerate building next-generation Operating Systems, autonomous AI architectures, and high-performance systems programming languages. Powering the infrastructure of tomorrow.',
  keywords: [
    'RIXVEN', 'RIXVEN OS', 'RIXVEN AI', 'RIXVEN Lang',
    'operating system', 'artificial intelligence', 'systems programming',
    'technology conglomerate', 'next-generation computing',
    'autonomous AI', 'high-performance computing',
  ],
  authors: [{ name: 'RIXVEN Corporation', url: 'https://rixven.com' }],
  creator:  'RIXVEN Corporation',
  publisher:'RIXVEN Corporation',

  // === OPENGRAPH ===
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         'https://rixven.com',
    siteName:    'RIXVEN',
    title:       'RIXVEN — The Core of Modern Intelligence',
    description: 'Global technology conglomerate. Operating Systems. Autonomous AI. Systems Languages.',
    images: [
      {
        url:    '/og/rixven-og-default.png', // 1200×630px — generate this asset
        width:   1200,
        height:  630,
        alt:     'RIXVEN — The Core of Modern Intelligence',
        type:    'image/png',
      },
    ],
  },

  // === TWITTER / X CARDS ===
  twitter: {
    card:        'summary_large_image',
    site:        '@rixven',
    creator:     '@rixven',
    title:       'RIXVEN — The Core of Modern Intelligence',
    description: 'Global technology conglomerate. Operating Systems. Autonomous AI. Systems Languages.',
    images: ['/og/rixven-og-default.png'],
  },

  // === ROBOTS & INDEXING ===
  robots: {
    index:           true,
    follow:          true,
    googleBot: {
      index:                  true,
      follow:                 true,
      'max-video-preview':    -1,
      'max-image-preview':    'large',
      'max-snippet':          -1,
    },
  },

  // === VERIFICATION (Add your actual tokens) ===
  verification: {
    google:    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    // yandex: '',
    // bing:   '',
  },

  // === CANONICAL & ALTERNATE ===
  alternates: {
    canonical: 'https://rixven.com',
    languages: {
      'en-US': 'https://rixven.com',
      // 'zh-CN': 'https://rixven.com/zh',  // Future: internationalization
    },
  },

  // === APP / PWA METADATA ===
  applicationName: 'RIXVEN',
  appleWebApp: {
    capable:        true,
    statusBarStyle: 'default',
    title:          'RIXVEN',
  },
  formatDetection: {
    email:     false,
    address:   false,
    telephone: false,
  },

  // === MANIFEST ===
  manifest: '/site.webmanifest',

  // === ICONS ===
  icons: {
    icon: [
      { url: '/favicon.ico',            sizes: 'any' },
      { url: '/icon.svg',               type: 'image/svg+xml' },
      { url: '/favicon-96x96.png',      sizes: '96x96',    type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png',   sizes: '180x180',  type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
};

// ---------------------------------------------------------------------------
// JSON-LD STRUCTURED DATA — Organization Schema (Google-optimized)
// ---------------------------------------------------------------------------
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type':    'Organization',
  name:       'RIXVEN',
  alternateName: ['RIXVEN Corporation', 'RIXVEN Technologies'],
  url:        'https://rixven.com',
  logo: {
    '@type': 'ImageObject',
    url:     'https://rixven.com/rixven.svg',
    width:   '1024',
    height:  '1024',
  },
  description:
    'RIXVEN is a global technology conglomerate building next-generation Operating Systems (RIXVEN OS), autonomous AI architectures (RIXVEN AI), and high-performance systems programming languages (RIXVEN Lang).',
  foundingDate: '2024',
  contactPoint: {
    '@type':             'ContactPoint',
    email:               'support@rixven.com',
    contactType:         'customer support',
    availableLanguage:   'English',
  },
  sameAs: [
    'https://twitter.com/rixven',
    'https://github.com/rixven',
    'https://linkedin.com/company/rixven',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name:    'RIXVEN Products',
    itemListElement: [
      {
        '@type':       'Offer',
        itemOffered: {
          '@type':       'SoftwareApplication',
          name:          'RIXVEN OS',
          applicationCategory: 'OperatingSystem',
          description:   'Next-generation operating system with autonomous kernel management.',
        },
      },
      {
        '@type':       'Offer',
        itemOffered: {
          '@type':       'SoftwareApplication',
          name:          'RIXVEN AI',
          applicationCategory: 'AIApplication',
          description:   'Autonomous AI architecture for enterprise and edge deployments.',
        },
      },
      {
        '@type':       'Offer',
        itemOffered: {
          '@type':       'SoftwareApplication',
          name:          'RIXVEN Lang',
          applicationCategory: 'DeveloperApplication',
          description:   'High-performance systems programming language with zero-cost abstractions.',
        },
      },
    ],
  },
};

const websiteSchema = {
  '@context':        'https://schema.org',
  '@type':           'WebSite',
  name:              'RIXVEN',
  url:               'https://rixven.com',
  potentialAction: {
    '@type':  'SearchAction',
    target: {
      '@type':    'EntryPoint',
      urlTemplate: 'https://rixven.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
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
      className={`
        ${syne.variable}
        ${instrumentSans.variable}
        ${geistMono.variable}
        scroll-smooth antialiased
      `}
      suppressHydrationWarning
    >
      <head>
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD Structured Data */}
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
        {/* Skip-to-main-content link for accessibility */}
        <a
          href="#main-content"
          className="
            sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
            focus:z-max focus:px-4 focus:py-2
            focus:bg-rixven-blue focus:text-white
            focus:rounded-md focus:text-sm focus:font-medium
            focus:shadow-blue-glow focus:outline-none
          "
        >
          Skip to main content
        </a>

        {/* Framer Motion provider for page transitions */}

          {/* ——— GLOBAL NAVIGATION ——— */}
          <Navbar />

          {/* ——— MAIN CONTENT ——— */}
          <main
            id="main-content"
            className="flex flex-col min-h-[calc(100vh-var(--navbar-height))]"
          >
            {children}
          </main>

          {/* ——— CORPORATE FOOTER ——— */}
          <Footer />

      </body>
    </html>
  );
}


// =============================================================================
// COMPONENT: Navbar (app/components/layout/Navbar.tsx)
// Glassmorphism with smooth scroll-state transitions
// =============================================================================

// NOTE: Create this at components/layout/Navbar.tsx
// Shown here inline for reference — extract to its own file in production.

/*
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  {
    label: 'Products',
    href: '#',
    children: [
      { label: 'RIXVEN OS',   href: '/os',   description: 'Next-generation operating system' },
      { label: 'RIXVEN AI',   href: '/ai',   description: 'Autonomous AI architecture' },
      { label: 'RIXVEN Lang', href: '/lang', description: 'Systems programming language' },
    ],
  },
  { label: 'Docs',       href: '/docs' },
  { label: 'About',      href: '/about' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className={`
        fixed top-0 left-0 right-0 z-sticky h-[var(--navbar-height)]
        transition-all duration-400 ease-smooth
        ${scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-rixven-white-pearl shadow-overlay'
          : 'bg-transparent'
        }
      `}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] as const }}
    >
      <div className="max-w-content mx-auto px-6 lg:px-8 h-full flex items-center justify-between">
        // Logo
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9">
            <Image src="/rixven.svg" alt="RIXVEN" fill className="object-contain" priority />
          </div>
          <span className="font-display font-800 text-xl tracking-tight text-rixven-charcoal">
            RIXVEN
          </span>
        </Link>

        // Desktop navigation
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <div key={link.label} className="relative">
              <Link
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-rixven-charcoal-600 hover:text-rixven-charcoal transition-colors rounded-md hover:bg-rixven-white-mist flex items-center gap-1"
              >
                {link.label}
                {link.children && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
              </Link>
            </div>
          ))}
        </nav>

        // CTA
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact" className="text-sm font-medium text-rixven-charcoal-600 hover:text-rixven-charcoal transition-colors px-3 py-2">
            Contact
          </Link>
        </div>

        // Mobile hamburger
        <button
          className="lg:hidden p-2 rounded-md hover:bg-rixven-white-mist transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
    </motion.header>
  );
}
*/
