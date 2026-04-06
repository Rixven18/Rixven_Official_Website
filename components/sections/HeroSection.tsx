// RIXVEN — components/sections/HeroSection.tsx
// Section component extracted from bundled page.tsx

'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

// Animation variants — heavy, smooth, purposeful
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren:  0.12,
      delayChildren:    0.3,
    },
  },
};

const itemVariants = {
  hidden:   { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y:       0,
    filter:  'blur(0px)',
    transition: {
      duration: 1.0,
      ease:     [0.19, 1, 0.22, 1] as const,
    },
  },
};

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax on scroll — hero content moves up as user scrolls
  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ['start start', 'end start'],
  });
  const y          = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity    = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="
        relative min-h-screen flex flex-col items-center justify-center
        pt-[var(--navbar-height)] overflow-hidden bg-white
      "
      aria-label="Hero: The Core of Modern Intelligence"
    >
      {/* Subtle background grid — evokes technical precision */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(8,135,201,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(8,135,201,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Background accent — single soft radial glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] opacity-[0.06] rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, #0887C9 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      {/* Hero content */}
      <motion.div
        className="relative z-raised max-w-hero mx-auto px-6 text-center"
        style={{ y, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Product badge */}
        <motion.div variants={itemVariants} className="inline-flex mb-8">
          <span className="
            inline-flex items-center gap-2
            px-3 py-1.5
            bg-rixven-white-mist border border-rixven-white-pearl
            text-rixven-charcoal-600 text-xs font-medium tracking-wider uppercase
            rounded-full
          ">
            <span className="w-1.5 h-1.5 rounded-full bg-rixven-blue animate-pulse-slow" />
            Now in Technical Preview — RIXVEN OS 1.0
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={itemVariants}
          className="
            font-display font-800
            text-5xl sm:text-6xl lg:text-8xl
            text-rixven-charcoal
            leading-[1.02] tracking-tighter
            mb-8
          "
        >
          The Core of{' '}
          <span className="relative">
            <span className="text-rixven-blue">Modern</span>
          </span>
          <br />
          <span className="text-rixven-charcoal-700">Intelligence</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={itemVariants}
          className="
            font-sans text-lg lg:text-xl
            text-rixven-charcoal-500
            leading-relaxed max-w-2xl mx-auto mb-12
          "
        >
          RIXVEN engineers the computational foundations of tomorrow —{' '}
          an autonomous operating system, sovereign AI architecture,
          and a systems language built for scale without compromise.
        </motion.p>

        {/* CTA group */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: '0 0 0 1px rgba(8,135,201,0.25), 0 8px 40px rgba(8,135,201,0.20)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/contact"
              className="
                inline-flex items-center gap-2.5
                px-7 py-3.5
                bg-rixven-blue text-white
                text-sm font-semibold
                rounded-lg shadow-blue-glow
                transition-colors duration-250
                hover:bg-rixven-blue-600
              "
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-rixven-charcoal-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-xs tracking-ultra uppercase font-medium">Explore</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}


