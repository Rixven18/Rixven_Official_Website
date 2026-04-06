'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#0887C9 1px, transparent 1px), linear-gradient(90deg, #0887C9 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl mx-auto px-6 text-center"
      >
        <motion.div 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 bg-rixven-blue/10 border border-rixven-blue/20 rounded-full mb-10"
        >
          <span className="w-2.5 h-2.5 bg-rixven-blue rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-rixven-blue tracking-wide uppercase">Coming Soon</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl md:text-6xl lg:text-7xl font-black text-rixven-charcoal tracking-tight mb-6"
        >
          Building the<br /><span className="text-rixven-blue">Future of Tech</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl text-rixven-charcoal-600 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          We're crafting something extraordinary. Our team is working on groundbreaking technology that will redefine what's possible. Stay tuned for the reveal.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link 
            href="/opportunities" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-rixven-blue text-white font-semibold rounded-xl hover:bg-rixven-blue-600 transition-colors shadow-blue-glow"
          >
            Get Early Access
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-rixven-white-slate text-rixven-charcoal font-semibold rounded-xl border border-rixven-white-pearl hover:bg-rixven-white-mist transition-colors"
          >
            Contact Sales
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-16 pt-10 border-t border-rixven-white-pearl"
        >
          <p className="text-rixven-charcoal-400 text-sm mb-4">Want to be the first to know?</p>
          <div className="flex gap-3 justify-center">
            {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
              <a 
                key={social}
                href={social === 'Twitter' ? 'https://twitter.com/rixven' : social === 'LinkedIn' ? 'https://linkedin.com/company/rixven' : 'https://github.com/rixven'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-medium text-rixven-charcoal-600 hover:text-rixven-blue hover:bg-rixven-white-mist rounded-lg transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12"
        >
          <div className="relative w-20 h-20 mx-auto">
            <Image src="/rixven.svg" alt="RIXVEN" fill className="object-contain" />
          </div>
          <p className="text-rixven-charcoal-400 text-xs mt-4">© 2024 RIXVEN. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}