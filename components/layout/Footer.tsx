// =============================================================================
// RIXVEN — components/layout/Footer.tsx
// Comprehensive corporate footer for a global tech conglomerate.
// =============================================================================

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

// =============================================================================
// RIXVEN — components/layout/Footer.tsx
// Comprehensive corporate footer for a global tech conglomerate.
// Sections: Logo + tagline | Products | Company | Legal | Resources | Support
// Bottom bar: Copyright | Legal links | Social links
// =============================================================================

const FOOTER_SECTIONS = [
  {
    title: 'Platform',
    links: [
      { label: 'Home',          href: '/' },
      { label: 'Products',      href: '/products' },
      { label: 'RIXVEN OS',     href: '/os' },
      { label: 'RIXVEN AI',     href: '/ai' },
      { label: 'RIXVEN Lang',   href: '/lang' },
      { label: 'Pricing',       href: '/opportunities' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'GitHub',         href: 'https://github.com/rixven', external: true },
      { label: 'Status',         href: 'https://status.rixven.com', external: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About',          href: '/about' },
      { label: 'Blog',           href: '/coming-soon' },
      { label: 'Careers',         href: '/coming-soon', badge: "We're hiring" },
      { label: 'Press',          href: '/coming-soon' },
      { label: 'Contact',        href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/coming-soon' },
      { label: 'Terms of Service', href: '/coming-soon' },
      { label: 'Cookie Policy',  href: '/coming-soon' },
      { label: 'Security',       href: '/coming-soon' },
      { label: 'Compliance',     href: '/coming-soon' },
      { label: 'Licenses',       href: '/coming-soon' },
    ],
  },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-rixven-charcoal text-white"
      aria-label="RIXVEN corporate footer"
    >
      {/* ——— MAIN FOOTER BODY ——— */}
      <div className="max-w-content mx-auto px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 mb-16">

          {/* Brand column */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="relative w-10 h-10">
                <Image src="/rixven.svg" alt="RIXVEN" fill className="object-contain" />
              </div>
              <span className="font-display font-800 text-xl text-white tracking-tight">
                RIXVEN
              </span>
            </Link>

            <p className="text-sm text-white/55 leading-relaxed font-sans max-w-[240px] mb-8">
              Engineering the computational foundations of tomorrow. Operating Systems.
              Autonomous AI. Systems Languages.
            </p>

            {/* Contact info */}
            <div className="space-y-2">
              <a
                href="mailto:support@rixven.com"
                className="flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors font-sans"
              >
                <span className="text-rixven-blue text-xs">✉</span>
                support@rixven.com
              </a>
              <p className="text-sm text-white/35 font-sans">
                Response within 1 business day
              </p>
            </div>

            {/* SOC 2 badge */}
            <div className="mt-8 inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.06] border border-white/10 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-xs font-medium text-white/60 font-sans">SOC 2 Type II Compliant</span>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4 font-sans">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white transition-colors font-sans"
                        {...('external' in link && link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {link.label}
                        {'external' in link && link.external && (
                          <ExternalLink className="w-3 h-3 opacity-50" />
                        )}
                        {'badge' in link && link.badge && (
                          <span className="text-2xs font-semibold px-1.5 py-0.5 bg-rixven-gold/20 text-rixven-gold rounded">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ——— FOOTER BOTTOM BAR ——— */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-xs text-white/35 font-sans">
            © {currentYear} RIXVEN Corporation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


// =============================================================================
// RIXVEN — components/providers/MotionProvider.tsx
// Framer Motion AnimatePresence + LazyMotion wrapper.
// Reduces bundle size via feature flag lazy-loading.
// =============================================================================
