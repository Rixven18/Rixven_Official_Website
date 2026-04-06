'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function AIComingSoonPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center pt-20">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#107C10 1px, transparent 1px), linear-gradient(90deg, #107C10 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      
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
          className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#107C10]/10 border border-[#107C10]/20 rounded-full mb-10"
        >
          <span className="w-2.5 h-2.5 bg-[#107C10] rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-[#107C10] tracking-wide uppercase">Coming Soon</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl md:text-6xl lg:text-7xl font-black text-[#1a1a1a] tracking-tight mb-6"
        >
          RIXVEN <span className="text-[#107C10]">AI</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl text-[#5c5c5c] max-w-2xl mx-auto leading-relaxed mb-8"
        >
          Autonomous AI architecture for sovereign edge deployments. RIXVEN AI operates at the kernel layer — not as an afterthought, but as a first-class citizen of the system.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          <div className="text-center">
            <p className="text-4xl font-bold text-[#107C10]">0.3ms</p>
            <p className="text-sm text-[#605e5c]">Inference Latency</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[#107C10]">10x</p>
            <p className="text-sm text-[#605e5c]">Faster Than Cloud</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[#107C10]">100%</p>
            <p className="text-sm text-[#605e5c]">Data Sovereignty</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link 
            href="/opportunities" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#107C10] text-white font-semibold rounded-xl hover:bg-[#0B5C0B] transition-colors"
          >
            Get Early Access
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#f3f2f1] text-[#323130] font-semibold rounded-xl border border-[#edebe9] hover:bg-[#e1dfdd] transition-colors"
          >
            Contact Sales
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-16"
        >
          <div className="relative w-20 h-20 mx-auto">
            <Image src="/rixven.svg" alt="RIXVEN" fill className="object-contain" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
