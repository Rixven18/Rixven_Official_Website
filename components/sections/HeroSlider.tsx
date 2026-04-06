'use client';
// RIXVEN — HeroSlider — Microsoft-Style Light Theme
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
  { id:0, badge:"World's No.1 Technology", headline:['The OS Built','For The','Next Century.'], accent:'Next Century.', sub:'RIXVEN OS is a formally verified microkernel operating system with deterministic memory management and real-time guarantees — engineered for mission-critical environments.', cta:{label:'Explore RIXVEN OS',href:'/os'}, ctaSecondary:{label:'Contact Us',href:'/contact'}, tag:'RIXVEN OS', color:'#0078D4', stat:{value:'140ns',label:'Kernel Context Switch'} },
  { id:1, badge:"World's No.1 Technology", headline:['AI That','Thinks At','Infrastructure Scale.'], accent:'Infrastructure Scale.', sub:'RIXVEN AI delivers autonomous reasoning architectures that operate at the kernel layer — not as an afterthought bolted on top, but as a first-class citizen of the system.', cta:{label:'Explore RIXVEN AI',href:'/ai'}, ctaSecondary:{label:'Contact Us',href:'/contact'}, tag:'RIXVEN AI', color:'#107C10', stat:{value:'0.3ms',label:'Inference Latency'} },
  { id:2, badge:"World's No.1 Technology", headline:['A Language','With Zero','Compromise.'], accent:'Zero Compromise.', sub:'RIXVEN Lang eliminates entire categories of bugs by design. Compile-time memory safety, formal type guarantees, and C-level performance — without the complexity.', cta:{label:'Explore RIXVEN Lang',href:'/lang'}, ctaSecondary:{label:'Contact Us',href:'/contact'}, tag:'RIXVEN Lang', color:'#8764B8', stat:{value:'100%',label:'Memory Safe'} },
  { id:3, badge:"World's No.1 Technology", headline:['One Platform.','Infinite','Possibilities.'], accent:'Infinite Possibilities.', sub:"Whether you're deploying at global scale or an engineer pushing the boundaries — RIXVEN gives you the foundations to build without limits.", cta:{label:'Get Early Access',href:'/opportunities'}, ctaSecondary:{label:'Contact Us',href:'/contact'}, tag:'RIXVEN Platform', color:'#E74856', stat:{value:'Free',label:'Lifetime for Early Access'} },
];

const INTERVAL = 6000;

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((idx: number) => { setDirection(idx > current ? 1 : -1); setCurrent(idx); }, [current]);
  const next = useCallback(() => { setDirection(1); setCurrent((c) => (c + 1) % SLIDES.length); }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, INTERVAL);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, paused, next]);

  const slide = SLIDES[current];
  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 30 : -30 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -30 : 30 }),
  };

  return (
    <section className="relative w-full min-h-[110vh] overflow-hidden bg-[#FAFAFA]" suppressHydrationWarning onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage:'linear-gradient(#0078D4 1px,transparent 1px),linear-gradient(90deg,#0078D4 1px,transparent 1px)', backgroundSize:'48px 48px' }} />
      
      {/* Soft Glow - Microsoft Style */}
      <motion.div 
        key={`glow-${current}`} 
        className="absolute top-0 right-0 w-[800px] h-[600px] rounded-full blur-[200px] opacity-[0.06] pointer-events-none" 
        animate={{ backgroundColor: slide.color }} 
        transition={{ duration: 1 }} 
      />

      <AnimatePresence custom={direction} mode="wait">
        <motion.div key={current} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.8, ease: 'easeInOut' }} className="absolute inset-0 flex items-center">
          <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <motion.div 
                initial={{opacity:0,y:20}} 
                animate={{opacity:1,y:0}} 
                transition={{delay:0.15, duration:0.5}} 
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border bg-white/80 backdrop-blur-sm shadow-sm"
                style={{borderColor:`${slide.color}30`}}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{backgroundColor:slide.color}} />
                <span className="text-xs font-medium tracking-widest uppercase" style={{color:slide.color}}>{slide.badge}</span>
              </motion.div>
              
              <motion.h1 
                initial={{opacity:0,y:30}} 
                animate={{opacity:1,y:0}} 
                transition={{delay:0.25, duration:0.6}} 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-[#1a1a1a]"
              >
                {slide.headline.map((line,i) => (
                  <span key={i} className="block">
                    {line === slide.accent ? (
                      <span className="relative">
                        {line}
                        <motion.span 
                          initial={{scaleX: 0}} 
                          animate={{scaleX: 1}} 
                          transition={{delay: 0.6, duration: 0.4}}
                          className="absolute -bottom-2 left-0 right-0 h-1" 
                          style={{backgroundColor:slide.color}}
                        />
                      </span>
                    ) : line}
                  </span>
                ))}
              </motion.h1>
              
              <motion.p 
                initial={{opacity:0,y:24}} 
                animate={{opacity:1,y:0}} 
                transition={{delay:0.35}} 
                className="text-base md:text-lg text-[#5c5c5c] leading-relaxed max-w-xl"
              >
                {slide.sub}
              </motion.p>
              
              <motion.div 
                initial={{opacity:0,y:20}} 
                animate={{opacity:1,y:0}} 
                transition={{delay:0.45}} 
                className="flex flex-wrap gap-3 pt-4"
              >
                <Link 
                  href={slide.cta.href} 
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
                  style={{backgroundColor:slide.color}}
                >
                  {slide.cta.label}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                </Link>
                <Link 
                  href={slide.ctaSecondary.href} 
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg font-semibold text-[#323130] bg-white border border-[#edebe9] hover:bg-[#f3f2f1] hover:border-[#d2d0ce] transition-all duration-200 shadow-sm"
                >
                  {slide.ctaSecondary.label}
                </Link>
              </motion.div>
            </div>
            
            {/* Right - Stat Card */}
            <motion.div 
              initial={{opacity:0,scale:0.92, y:20}} 
              animate={{opacity:1,scale:1, y:0}} 
              transition={{delay:0.3, duration:0.6, ease:[0.19, 1, 0.22, 1]}} 
              className="hidden lg:flex flex-col items-end gap-6"
            >
              <div className="w-80 rounded-2xl p-8 border bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]" style={{borderColor:`${slide.color}20`}}>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-6xl font-bold" style={{color:slide.color}}>{slide.stat.value}</span>
                </div>
                <p className="text-sm font-medium text-[#605e5c] uppercase tracking-wider">{slide.stat.label}</p>
                <div className="mt-6 pt-5 border-t border-[#edebe9] flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor:slide.color}} />
                  <span className="text-sm text-[#605e5c] font-medium">{slide.tag}</span>
                </div>
              </div>
              
              {/* Decorative element */}
              <div className="w-40 h-40 opacity-[0.08]">
                <Image src="/rixven.svg" alt="RIXVEN" width={160} height={160} className="w-full h-full object-contain" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* Progress Bar */}
        <div className="h-[3px] bg-[#edebe9]">
          <motion.div 
            key={`bar-${current}`} 
            className="h-full" 
            style={{backgroundColor:slide.color}} 
            initial={{width:'0%'}} 
            animate={{width:'100%'}} 
            transition={{duration:INTERVAL/1000 * 0.9, ease:'linear'}} 
          />
        </div>
        
        {/* Navigation Controls */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between bg-white/95 backdrop-blur-md border-t border-[#edebe9]">
          {/* Slide Indicators */}
          <div className="flex items-center gap-1">
            {SLIDES.map((s,i) => (
              <button 
                key={i} 
                onClick={() => go(i)} 
                className={`group flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
                  i === current ? 'bg-black/5' : 'hover:bg-black/[0.03]'
                }`}
              >
                <div 
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'scale-125' : ''
                  }`} 
                  style={{backgroundColor: i === current ? s.color : '#c8c6c4'}} 
                />
                <span className="text-xs font-medium hidden sm:block transition-colors" style={{color: i === current ? '#1a1a1a' : '#605e5c'}}>
                  {s.tag}
                </span>
              </button>
            ))}
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#605e5c] mr-2">
              {String(current+1).padStart(2,'0')} / {String(SLIDES.length).padStart(2,'0')}
            </span>
            <button 
              onClick={() => go((current-1+SLIDES.length)%SLIDES.length)} 
              className="w-9 h-9 rounded-md border border-[#d2d0ce] flex items-center justify-center text-[#605e5c] hover:bg-[#f3f2f1] hover:border-[#c8c6c4] transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button 
              onClick={() => go((current+1)%SLIDES.length)} 
              className="w-9 h-9 rounded-md border border-[#d2d0ce] flex items-center justify-center text-[#605e5c] hover:bg-[#f3f2f1] hover:border-[#c8c6c4] transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
