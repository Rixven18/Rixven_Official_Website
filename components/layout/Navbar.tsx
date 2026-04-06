// =============================================================================
// RIXVEN — components/layout/Navbar.tsx
// Glassmorphism navigation bar.
// Features:
//   - Animated mount (slide-down from top)
//   - Scroll-state transitions: transparent → glass blur on scroll
//   - Dropdown mega-menu for Products
//   - Mobile drawer navigation
//   - Active route highlighting
//   - RIXVEN SVG logo (Next.js Image)
// =============================================================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, ArrowRight,
  Cpu, Brain, Code2, ExternalLink,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// NAVIGATION DATA
// ---------------------------------------------------------------------------

const PRODUCTS = [
  {
    label:       'RIXVEN OS',
    href:        '/os',
    icon:        Cpu,
    description: 'Next-generation operating system with a formally verified microkernel.',
    badge:       'Coming Soon',
    accent:      '#0078D4',
  },
  {
    label:       'RIXVEN AI',
    href:        '/ai',
    icon:        Brain,
    description: 'Autonomous AI architecture for sovereign edge deployments.',
    badge:       'Coming Soon',
    accent:      '#107C10',
  },
  {
    label:       'RIXVEN Lang',
    href:        '/lang',
    icon:        Code2,
    description: 'High-performance systems language with provable memory safety.',
    badge:       'Coming Soon',
    accent:      '#8764B8',
  },
] as const;

const NAV_LINKS = [
  { label: 'Home',        href: '/',                    hasDropdown: false },
  { label: 'Products',    href: '#',                    hasDropdown: true  },
  { label: 'Opportunities', href: '/opportunities',      hasDropdown: false },
  { label: 'Contact',     href: '/contact',             hasDropdown: false },
  { label: 'About',       href: '/about',               hasDropdown: false },
] as const;

// ---------------------------------------------------------------------------
// ANIMATION VARIANTS
// ---------------------------------------------------------------------------

const navVariants = {
  hidden:  { y: -100, opacity: 0 },
  visible: {
    y: 0, opacity: 1,
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] as const },
  },
};

const dropdownVariants = {
  hidden:  { opacity: 0, y: -8, scale: 0.98, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] as const },
  },
  exit:    {
    opacity: 0, y: -8, scale: 0.98,
    transition: { duration: 0.15, ease: 'easeIn' as const },
  },
};

const mobileMenuVariants = {
  hidden:  { opacity: 0, x: '100%' },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] as const },
  },
  exit:    {
    opacity: 0, x: '100%',
    transition: { duration: 0.3, ease: 'easeIn' as const },
  },
};

// ---------------------------------------------------------------------------
// PRODUCT DROPDOWN COMPONENT
// ---------------------------------------------------------------------------

function ProductDropdown({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="
        absolute top-full left-1/2 -translate-x-1/2 mt-2
        w-[600px] p-2
        bg-white/95 backdrop-blur-xl
        border border-rixven-white-pearl
        rounded-2xl shadow-overlay
      "
    >
      <div className="grid grid-cols-3 gap-1">
        {PRODUCTS.map((product) => {
          const Icon = product.icon;
          return (
            <Link
              key={product.label}
              href={product.href}
              onClick={onClose}
              className="
                group flex flex-col gap-3 p-4 rounded-xl
                hover:bg-rixven-white-slate
                transition-all duration-200
              "
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${product.accent}12`, border: `1px solid ${product.accent}20` }}
              >
                <Icon className="w-5 h-5" style={{ color: product.accent }} />
              </div>
              {/* Content */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-rixven-charcoal font-sans">
                    {product.label}
                  </span>
                  <span
                    className="text-2xs font-medium px-1.5 py-0.5 rounded"
                    style={{
                      color:           product.accent,
                      backgroundColor: `${product.accent}12`,
                    }}
                  >
                    {product.badge}
                  </span>
                </div>
                <p className="text-xs text-rixven-charcoal-400 leading-relaxed font-sans">
                  {product.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      {/* Footer row */}
      <div className="mt-1 pt-2 border-t border-rixven-white-pearl px-3 pb-1 flex items-center justify-between">
        <span className="text-xs text-rixven-charcoal-400 font-sans">
          Building the infrastructure of tomorrow
        </span>
        <Link
          href="/products"
          onClick={onClose}
          className="inline-flex items-center gap-1 text-xs font-semibold text-rixven-blue hover:underline transition-colors"
        >
          View All Products <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// MAIN NAVBAR COMPONENT
// ---------------------------------------------------------------------------

export function Navbar() {
  const pathname    = usePathname();
  const [scrolled, setScrolled]           = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Track scroll for glass transition
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleDropdownToggle = useCallback((label: string) => {
    setActiveDropdown(prev => prev === label ? null : label);
  }, []);

  const closeDropdown = useCallback(() => setActiveDropdown(null), []);

  return (
    <>
      {/* Click-outside overlay to close dropdowns */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-dropdown"
          onClick={closeDropdown}
          aria-hidden="true"
        />
      )}

      <motion.header
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`
          fixed top-0 left-0 right-0 z-sticky
          h-[var(--navbar-height)]
          transition-all duration-400
          ${scrolled
            ? 'bg-white/85 backdrop-blur-xl border-b border-rixven-white-pearl shadow-overlay'
            : 'bg-transparent'
          }
        `}
        role="banner"
      >
        <div className="max-w-content mx-auto px-6 lg:px-8 h-full flex items-center justify-between">

          {/* ——— LOGO ——— */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rixven-blue rounded-md"
            aria-label="RIXVEN — Return to homepage"
          >
            <motion.div
              className="relative w-9 h-9 shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <Image
                src="/rixven.svg"
                alt="RIXVEN Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
            <span className="font-display font-800 text-[1.1rem] tracking-tight text-rixven-charcoal">
              RIXVEN
            </span>
          </Link>

          {/* ——— DESKTOP NAV ——— */}
          <nav
            className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

              if (link.hasDropdown) {
                const isOpen = activeDropdown === link.label;
                return (
                  <div key={link.label} className="relative">
                    <button
                      onClick={() => handleDropdownToggle(link.label)}
                      className={`
                        flex items-center gap-1 px-3 py-2 rounded-md
                        text-sm font-medium font-sans transition-colors duration-150
                        ${isOpen
                          ? 'bg-rixven-white-mist text-rixven-charcoal'
                          : 'text-rixven-charcoal-600 hover:bg-rixven-white-mist hover:text-rixven-charcoal'
                        }
                      `}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                      </motion.span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <ProductDropdown onClose={closeDropdown} />
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`
                    px-3 py-2 rounded-md text-sm font-medium font-sans
                    transition-colors duration-150
                    ${isActive
                      ? 'bg-rixven-white-mist text-rixven-charcoal'
                      : 'text-rixven-charcoal-600 hover:bg-rixven-white-mist hover:text-rixven-charcoal'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ——— MOBILE HAMBURGER ——— */}
          <motion.button
            className="
              lg:hidden p-2 rounded-md
              text-rixven-charcoal-600 hover:bg-rixven-white-mist
              transition-colors
            "
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen
                ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X className="w-5 h-5" /></motion.span>
                : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu className="w-5 h-5" /></motion.span>
              }
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* ——— MOBILE DRAWER ——— */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-overlay bg-rixven-charcoal/20 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.nav
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="
                fixed top-0 right-0 bottom-0 w-80 z-modal
                bg-white border-l border-rixven-white-pearl
                pt-[var(--navbar-height)] pb-safe
                overflow-y-auto lg:hidden
              "
              aria-label="Mobile navigation"
            >
              <div className="p-6 space-y-1">
                {/* Products section */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-rixven-charcoal-400 uppercase tracking-wider mb-3 px-3">
                    Products
                  </p>
                  {PRODUCTS.map((product) => {
                    const Icon = product.icon;
                    return (
                      <Link
                        key={product.label}
                        href={product.href}
                        className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-rixven-white-slate transition-colors"
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${product.accent}12` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: product.accent }} />
                        </div>
                        <span className="text-sm font-semibold text-rixven-charcoal font-sans">{product.label}</span>
                      </Link>
                    );
                  })}
                </div>

                <hr className="border-rixven-white-pearl my-4" />

                {/* Other links */}
                {NAV_LINKS.filter(l => !l.hasDropdown).map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block px-3 py-2.5 text-sm font-medium text-rixven-charcoal-600 hover:text-rixven-charcoal hover:bg-rixven-white-slate rounded-xl transition-colors font-sans"
                  >
                    {link.label}
                  </Link>
                ))}

                <hr className="border-rixven-white-pearl my-4" />

                {/* CTAs */}
                <Link
                  href="/contact"
                  className="block px-3 py-2.5 text-sm font-medium text-rixven-charcoal-600 hover:text-rixven-charcoal hover:bg-rixven-white-slate rounded-xl transition-colors font-sans"
                >
                  Contact
                </Link>

              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

