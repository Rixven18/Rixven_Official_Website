// =============================================================================
// RIXVEN — tailwind.config.js
// Custom design system: Colors extracted from rixven.svg logo.
// Electric Blue: #0887C9 | Golden Yellow: #F5B543
// Industrial Tech Professional aesthetic — extreme precision, zero compromise.
// =============================================================================

const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Scan all relevant files for class usage
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Fallback if using pages router in hybrid
  ],

  // Enable dark mode via class strategy (future-proofing)
  darkMode: 'class',

  theme: {
    extend: {
      // -------------------------------------------------------------------------
      // RIXVEN BRAND COLOR SYSTEM
      // Extracted from rixven.svg logo with precision.
      // -------------------------------------------------------------------------
      colors: {
        // === BRAND PRIMARIES ===
        'rixven-blue': {
          DEFAULT: '#0887C9',  // Electric Blue — exact from SVG fill="#0887C9"
          50:  '#E8F5FC',
          100: '#C5E6F7',
          200: '#9FD4F0',
          300: '#74C0E8',
          400: '#4BA7D2',      // Lighter accent from SVG fill="#4BA7D2"
          500: '#0887C9',      // PRIMARY — exact logo blue
          600: '#0772AA',
          700: '#065D8B',
          800: '#04486C',
          900: '#02334D',
          950: '#011E2E',
        },
        'rixven-gold': {
          DEFAULT: '#F5B543',  // Golden Yellow — exact from SVG fill="#F5B543"
          50:  '#FEF9EC',
          100: '#FDEFC8',
          200: '#FCE4A0',
          300: '#F9D577',
          400: '#F7C85C',
          500: '#F5B543',      // PRIMARY — exact logo gold
          600: '#E09A28',
          700: '#B97D1A',
          800: '#926210',
          900: '#6B4909',
          950: '#3D2904',
        },

        // === NEUTRAL SYSTEM — RIXVEN Industrial Palette ===
        'rixven-white': {
          DEFAULT: '#FFFFFF',  // Pure White — primary background
          slate:   '#F8FAFC',  // Ultra-clean Slate White — secondary background
          mist:    '#F1F5F9',  // Mist — card backgrounds, section dividers
          pearl:   '#E2E8F0',  // Pearl — borders, subtle separators
        },
        'rixven-charcoal': {
          DEFAULT: '#0F172A',  // Rich Charcoal — primary text
          900:     '#0F172A',  // Maximum depth
          800:     '#1E293B',  // Deep slate
          700:     '#334155',  // Mid tone
          600:     '#475569',  // Subtle text
          500:     '#64748B',  // Muted text
          400:     '#94A3B8',  // Placeholder / secondary info
          300:     '#CBD5E1',  // Hairlines, subtle UI
        },

        // === SEMANTIC ALIASES — For consistent usage patterns ===
        background:       '#FFFFFF',
        'background-alt': '#F8FAFC',
        foreground:       '#0F172A',
        muted:            '#64748B',
        border:           '#E2E8F0',
        'border-strong':  '#CBD5E1',
        accent:           '#0887C9',
        'accent-gold':    '#F5B543',
        'accent-hover':   '#0772AA',

        // === STATUS COLORS ===
        success:   { DEFAULT: '#10B981', light: '#D1FAE5' },
        warning:   { DEFAULT: '#F59E0B', light: '#FEF3C7' },
        error:     { DEFAULT: '#EF4444', light: '#FEE2E2' },
        info:      { DEFAULT: '#3B82F6', light: '#DBEAFE' },
      },

      // -------------------------------------------------------------------------
      // TYPOGRAPHY — Syne (Display) + Instrument Sans (Body)
      // Premium, distinctive, non-generic. NOT Inter. NOT Space Grotesk.
      // -------------------------------------------------------------------------
      fontFamily: {
        // Display / Headings — Syne: geometric, authoritative, tech-forward
        display: ['var(--font-syne)', 'Syne', ...fontFamily.sans],
        // UI / Body — Instrument Sans: refined, modern, readable
        sans:    ['var(--font-instrument-sans)', 'Instrument Sans', ...fontFamily.sans],
        // Monospace — Geist Mono: for code, technical specs, terminal displays
        mono:    ['var(--font-geist-mono)', 'Geist Mono', ...fontFamily.mono],
      },

      // -------------------------------------------------------------------------
      // TYPOGRAPHY SCALE — Custom sizes for editorial authority
      // -------------------------------------------------------------------------
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],   // 10px — labels, badges
        'xs':  ['0.75rem',  { lineHeight: '1rem' }],       // 12px
        'sm':  ['0.875rem', { lineHeight: '1.375rem' }],   // 14px
        'base':['1rem',     { lineHeight: '1.625rem' }],   // 16px
        'lg':  ['1.125rem', { lineHeight: '1.75rem' }],    // 18px
        'xl':  ['1.25rem',  { lineHeight: '1.875rem' }],   // 20px
        '2xl': ['1.5rem',   { lineHeight: '2rem' }],       // 24px
        '3xl': ['1.875rem', { lineHeight: '2.375rem' }],   // 30px
        '4xl': ['2.25rem',  { lineHeight: '2.75rem' }],    // 36px
        '5xl': ['3rem',     { lineHeight: '1.15' }],       // 48px
        '6xl': ['3.75rem',  { lineHeight: '1.1' }],        // 60px
        '7xl': ['4.5rem',   { lineHeight: '1.05' }],       // 72px
        '8xl': ['6rem',     { lineHeight: '1' }],          // 96px
        '9xl': ['8rem',     { lineHeight: '0.95' }],       // 128px — Hero display
        '10xl':['10rem',    { lineHeight: '0.9' }],        // 160px — Maximum impact
      },

      // -------------------------------------------------------------------------
      // LETTER SPACING — Precision tracking for industrial typography
      // -------------------------------------------------------------------------
      letterSpacing: {
        'tighter':  '-0.05em',
        'tight':    '-0.025em',
        'snug':     '-0.015em',
        'normal':   '0em',
        'wide':     '0.05em',
        'wider':    '0.1em',
        'widest':   '0.25em',
        'ultra':    '0.35em',  // For uppercase labels, section markers
      },

      // -------------------------------------------------------------------------
      // SPACING — Extended scale for generous whitespace (Apple-level breathing room)
      // -------------------------------------------------------------------------
      spacing: {
        '4.5':  '1.125rem',
        '13':   '3.25rem',
        '15':   '3.75rem',
        '18':   '4.5rem',
        '22':   '5.5rem',
        '26':   '6.5rem',
        '30':   '7.5rem',
        '34':   '8.5rem',
        '38':   '9.5rem',
        '42':   '10.5rem',
        '50':   '12.5rem',
        '54':   '13.5rem',
        '58':   '14.5rem',
        '68':   '17rem',
        '72':   '18rem',
        '80':   '20rem',
        '88':   '22rem',
        '96':   '24rem',
        '104':  '26rem',
        '112':  '28rem',
        '120':  '30rem',
        '128':  '32rem',
        '144':  '36rem',
        '160':  '40rem',
      },

      // -------------------------------------------------------------------------
      // BORDER RADIUS — Precise, intentional rounding
      // -------------------------------------------------------------------------
      borderRadius: {
        'none':    '0',
        'xs':      '2px',
        'sm':      '4px',
        DEFAULT:   '6px',
        'md':      '8px',
        'lg':      '12px',
        'xl':      '16px',
        '2xl':     '20px',
        '3xl':     '24px',
        '4xl':     '32px',
        'full':    '9999px',
      },

      // -------------------------------------------------------------------------
      // SHADOWS — Layered depth system for the industrial aesthetic
      // -------------------------------------------------------------------------
      boxShadow: {
        // Subtle elevation for cards
        'card':     '0 1px 3px 0 rgba(15,23,42,0.04), 0 1px 2px -1px rgba(15,23,42,0.04)',
        'card-md':  '0 4px 6px -1px rgba(15,23,42,0.06), 0 2px 4px -2px rgba(15,23,42,0.04)',
        'card-lg':  '0 10px 15px -3px rgba(15,23,42,0.08), 0 4px 6px -4px rgba(15,23,42,0.04)',
        'card-xl':  '0 20px 25px -5px rgba(15,23,42,0.10), 0 8px 10px -6px rgba(15,23,42,0.04)',
        // Electric Blue glow — for CTAs, active states, focused elements
        'blue-glow':   '0 0 0 1px rgba(8,135,201,0.15), 0 4px 24px rgba(8,135,201,0.12)',
        'blue-glow-lg':'0 0 0 1px rgba(8,135,201,0.20), 0 8px 40px rgba(8,135,201,0.18)',
        'blue-glow-xl':'0 0 0 2px rgba(8,135,201,0.25), 0 16px 64px rgba(8,135,201,0.22)',
        // Golden glow — for accent highlights, premium badges
        'gold-glow':   '0 0 0 1px rgba(245,181,67,0.20), 0 4px 24px rgba(245,181,67,0.14)',
        // Inset shadows for pressed states
        'inner-sm':    'inset 0 1px 2px rgba(15,23,42,0.06)',
        'inner':       'inset 0 2px 4px rgba(15,23,42,0.08)',
        // Elevated overlay (navbar, modals)
        'overlay':     '0 0 0 1px rgba(15,23,42,0.05), 0 8px 32px rgba(15,23,42,0.08), 0 2px 8px rgba(15,23,42,0.04)',
        'none':        'none',
      },

      // -------------------------------------------------------------------------
      // BACKGROUND SIZE — For gradient animations
      // -------------------------------------------------------------------------
      backgroundSize: {
        '200%': '200% 200%',
        '300%': '300% 300%',
      },

      // -------------------------------------------------------------------------
      // ANIMATIONS — Framer Motion handles heavy lifting, these are CSS supplements
      // -------------------------------------------------------------------------
      animation: {
        // Subtle gradient shift for hero backgrounds
        'gradient-shift': 'gradient-shift 8s ease infinite',
        // Gentle pulse for status indicators
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        // Fade in utility
        'fade-in': 'fadeIn 0.5s ease forwards',
        // Shimmer for loading states
        'shimmer': 'shimmer 2s linear infinite',
        // Slow spin for decorative elements
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':       { backgroundPosition: '100% 50%' },
        },
        'fadeIn': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

      // -------------------------------------------------------------------------
      // TRANSITIONS — Consistent motion timing
      // -------------------------------------------------------------------------
      transitionTimingFunction: {
        'in-expo':   'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo':  'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-out-expo':'cubic-bezier(0.87, 0, 0.13, 1)',
        'spring':    'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth':    'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
        '1200': '1200ms',
      },

      // -------------------------------------------------------------------------
      // GRID — Bento Grid and layout utilities
      // -------------------------------------------------------------------------
      gridTemplateColumns: {
        'bento-3':  'repeat(3, 1fr)',
        'bento-4':  'repeat(4, 1fr)',
        'bento-12': 'repeat(12, 1fr)',
      },
      gridTemplateRows: {
        'bento-2': 'repeat(2, 1fr)',
        'bento-3': 'repeat(3, 1fr)',
      },

      // -------------------------------------------------------------------------
      // ASPECT RATIO — For consistent media and card proportions
      // -------------------------------------------------------------------------
      aspectRatio: {
        'bento-wide':  '16 / 7',
        'bento-tall':  '9 / 16',
        'bento-card':  '4 / 3',
        'golden':      '1.618 / 1',
      },

      // -------------------------------------------------------------------------
      // Z-INDEX — Explicit layer management
      // -------------------------------------------------------------------------
      zIndex: {
        'below':    '-1',
        'base':     '0',
        'raised':   '10',
        'dropdown': '100',
        'sticky':   '200',
        'overlay':  '300',
        'modal':    '400',
        'popover':  '500',
        'toast':    '600',
        'tooltip':  '700',
        'max':      '9999',
      },

      // -------------------------------------------------------------------------
      // MAX-WIDTH — Breakpoint-aware content widths
      // -------------------------------------------------------------------------
      maxWidth: {
        'site':    '1440px',   // Maximum site width
        'content': '1280px',   // Standard content area
        'text':    '720px',    // Optimal reading width
        'narrow':  '640px',    // Narrow content (blog, docs)
        'hero':    '900px',    // Hero text columns
      },
    },
  },

  // ---------------------------------------------------------------------------
  // PLUGINS
  // ---------------------------------------------------------------------------
  plugins: [
    // Typography plugin for rich content / documentation pages
    require('@tailwindcss/typography'),
    // Forms plugin for consistent form styling
    require('@tailwindcss/forms')({
      strategy: 'class', // Use .form-* classes to avoid global overrides
    }),
    // Container queries for component-level responsiveness
    require('@tailwindcss/container-queries'),
  ],
};
