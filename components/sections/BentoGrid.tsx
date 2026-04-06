// RIXVEN — components/sections/BentoGrid.tsx
// Section component extracted from bundled page.tsx

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Cpu, Brain, Code2, ArrowRight, Shield, Zap, Globe } from 'lucide-react';

// Bento card data — three core pillars
const PILLARS = [
  {
    id:          'os',
    label:       '01 — Operating System',
    title:       'RIXVEN OS',
    tagline:     'Kernel-level autonomy. Zero-compromise performance.',
    description: 'A next-generation operating system with an autonomous microkernel, deterministic memory management, and real-time hardware abstraction. Engineered for mission-critical environments where failure is not an option.',
    href:        '/os',
    icon:        Cpu,
    accent:      '#0887C9',  // Electric Blue
    features:    ['Autonomous Microkernel', 'Deterministic GC', 'Hardware Abstraction Layer', 'Formal Verification'],
    span:        'col-span-2 row-span-2',  // Large card — dominant position
    bg:          'bg-white',
  },
  {
    id:          'ai',
    label:       '02 — Artificial Intelligence',
    title:       'RIXVEN AI',
    tagline:     'Autonomous reasoning at the edge.',
    description: 'A sovereign AI architecture that runs inference at the edge — on your hardware, under your control. No cloud dependency. No data sovereignty compromise.',
    href:        '/ai',
    icon:        Brain,
    accent:      '#F5B543',  // Golden Yellow
    features:    ['Edge Inference', 'Sovereign Deployment', 'Multi-Modal', 'Zero-Trust AI'],
    span:        'col-span-1 row-span-1',
    bg:          'bg-rixven-white-slate',
  },
  {
    id:          'lang',
    label:       '03 — Systems Language',
    title:       'RIXVEN Lang',
    tagline:     'Safety without sacrifice.',
    description: 'A compiled systems programming language with zero-cost abstractions, provable memory safety, and LLVM-optimized codegen. Write firmware, kernels, and real-time systems with confidence.',
    href:        '/lang',
    icon:        Code2,
    accent:      '#0887C9',
    features:    ['Zero-Cost Abstractions', 'LLVM Codegen', 'Provable Memory Safety', 'Bare Metal'],
    span:        'col-span-1 row-span-1',
    bg:          'bg-white',
  },
] as const;

// Stagger animation for grid items
const gridVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 32, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1] as const },
  },
};

function BentoCard({
  pillar,
  index,
}: {
  pillar: typeof PILLARS[number];
  index: number;
}) {
  const Icon = pillar.icon;

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{
        y: -3,
        transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] as const },
      }}
      className={`
        group relative
        ${pillar.span}
        ${pillar.bg}
        border border-rixven-white-pearl
        rounded-2xl p-8 lg:p-10
        overflow-hidden
        cursor-pointer
        transition-shadow duration-400
        hover:shadow-card-xl hover:border-rixven-charcoal-300
      `}
    >
      {/* Hover accent glow — appears on card hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 rounded-2xl"
        style={{
          background: `radial-gradient(ellipse at top left, ${pillar.accent}08 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* Subtle top border accent */}
      <div
        className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-600"
        style={{ background: `linear-gradient(90deg, transparent, ${pillar.accent}40, transparent)` }}
        aria-hidden="true"
      />

      <div className="relative z-raised flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${pillar.accent}12`, border: `1px solid ${pillar.accent}20` }}
          >
            <Icon className="w-6 h-6" style={{ color: pillar.accent }} />
          </div>
          <span className="text-xs font-medium tracking-wider text-rixven-charcoal-400 uppercase">
            {pillar.label}
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="font-display font-700 text-2xl lg:text-3xl text-rixven-charcoal tracking-tight mb-2">
          {pillar.title}
        </h3>
        <p className="text-sm font-medium text-rixven-charcoal-500 mb-4 font-sans">
          {pillar.tagline}
        </p>
        <p className="text-sm text-rixven-charcoal-400 leading-relaxed mb-8 font-sans">
          {pillar.description}
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {pillar.features.map((feature) => (
            <span
              key={feature}
              className="inline-flex px-2.5 py-1 text-xs font-medium rounded-md bg-rixven-white-mist text-rixven-charcoal-600 border border-rixven-white-pearl"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <Link
            href={pillar.href}
            className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-250 group/link"
            style={{ color: pillar.accent }}
          >
            Explore {pillar.title}
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-250" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function BentoGrid() {
  const ref     = useRef<HTMLElement>(null);
  const inView  = useInView(ref, { once: true, margin: '-100px 0px' });

  return (
    <section
      ref={ref}
      className="py-32 bg-rixven-white-slate"
      aria-labelledby="bento-heading"
    >
      <div className="max-w-content mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] as const }}
        >
          <span className="inline-block text-xs font-semibold tracking-ultra text-rixven-blue uppercase mb-4">
            Product Platform
          </span>
          <h2
            id="bento-heading"
            className="font-display font-700 text-4xl lg:text-6xl text-rixven-charcoal tracking-tight max-w-2xl leading-[1.08]"
          >
            Three layers.{' '}
            <span className="text-rixven-charcoal-400">One unified</span>{' '}
            architecture.
          </h2>
        </motion.div>

        {/* Bento Grid — 3-column, 2-row layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 grid-rows-1 md:grid-rows-2 gap-4 auto-rows-[360px]"
          variants={gridVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {PILLARS.map((pillar, i) => (
            <BentoCard key={pillar.id} pillar={pillar} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}


