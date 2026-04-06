// RIXVEN — components/sections/StatsBar.tsx
// Section component extracted from bundled page.tsx

'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useEffect, useState } from 'react';

const STATS = [
  { value: '140', suffix: 'ns', label: 'Kernel Context Switch',     sublabel: 'RIXVEN OS' },
  { value: '3.2', suffix: 'M',  label: 'Lines of Core Codebase',    sublabel: 'RIXVEN Lang' },
  { value: '99.999', suffix: '%', label: 'Uptime SLA',              sublabel: 'Enterprise Tier' },
  { value: '0',   suffix: 'CVEs', label: 'Critical Vulnerabilities', sublabel: 'Since launch' },
];

function AnimatedNumber({ value, suffix }: { value: string; suffix: string }) {
  const [displayed, setDisplayed] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const numericValue = parseFloat(value);
    const duration = 1800;
    const start = Date.now();
    const tick = () => {
      const elapsed  = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 4); // ease-out-quart
      const current  = numericValue * eased;
      setDisplayed(
        Number.isInteger(numericValue)
          ? Math.floor(current).toString()
          : current.toFixed(value.includes('.') ? 1 : 0)
      );
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display font-800 text-5xl text-rixven-charcoal tracking-tighter tabular-nums">
      {displayed}
      <span className="text-rixven-blue ml-1 text-4xl">{suffix}</span>
    </span>
  );
}

export function StatsBar() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <section ref={ref} className="py-24 bg-white border-y border-[#E5E7EB]">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 lg:divide-x lg:divide-rixven-white-pearl"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col gap-2 lg:px-10 first:pl-0 last:pr-0"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.19, 1, 0.22, 1] as const }}
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <div>
                <p className="text-sm font-semibold text-rixven-charcoal-700 font-sans">{stat.label}</p>
                <p className="text-xs text-rixven-charcoal-400 font-sans mt-0.5">{stat.sublabel}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
