// RIXVEN — app/about/page.tsx
// About page — Founder story, mission, and vision.

import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About — RIXVEN',
  description:
    'The story behind RIXVEN. Who we are, what we build, and why we exist.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO BAND ── */}
      <section className="relative bg-[#0A0F1A] overflow-hidden">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#0887C9 1px, transparent 1px), linear-gradient(90deg, #0887C9 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Blue glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0887C9] opacity-10 blur-[120px] rounded-full" />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 pt-28 pb-24">
          <p className="text-xs font-mono tracking-[0.3em] text-[#0887C9] uppercase mb-6">
            About RIXVEN
          </p>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tight mb-8">
            Built From<br />
            <span className="text-[#0887C9]">First Principles.</span>
          </h1>
          <p className="text-lg text-[#6B7280] max-w-xl leading-relaxed">
            RIXVEN was born from a conviction that the world's computational
            foundations deserve to be rebuilt — not patched.
          </p>
        </div>
      </section>

      {/* ── FOUNDER SECTION ── */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Photo */}
          <div className="relative">
            {/* Blue accent border */}
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#0887C9]/30 rounded-2xl" />
            <div className="relative rounded-2xl overflow-hidden bg-[#0A0F1A]">
              <Image
                src="/about-photo.jpg"
                alt="RIXVEN founder"
                width={780}
                height={1040}
                className="w-full object-cover grayscale"
                priority
              />
              {/* Subtle blue tint overlay */}
              <div className="absolute inset-0 bg-[#0887C9]/5 mix-blend-color" />
              {/* Bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0F1A]/60 to-transparent" />
              {/* Caption */}
              <div className="absolute bottom-6 left-6">
                <p className="text-white text-sm font-semibold">Founder & Father</p>
                <p className="text-[#6B7280] text-xs mt-0.5">The team behind RIXVEN</p>
              </div>
            </div>
          </div>

          {/* Story */}
          <div>
            <p className="text-xs font-mono tracking-[0.3em] text-[#0887C9] uppercase mb-6">
              Our Story
            </p>
            <h2 className="text-4xl font-black text-[#0A0F1A] leading-tight mb-8">
              Engineering Tomorrow,<br />
              <span className="text-[#0887C9]">Today.</span>
            </h2>

            <div className="space-y-5 text-[#374151] leading-relaxed">
              <p>
                RIXVEN was founded on the belief that the next era of computing
                demands infrastructure built without compromise. Not inherited
                from decades of legacy decisions — but re-imagined from scratch,
                for a world running at the speed of intelligence.
              </p>
              <p>
                We are engineers, architects, and researchers building three
                interlocking pillars: a next-generation operating system, an
                autonomous AI framework, and a high-performance systems language.
                Each one designed to stand alone. Each one made stronger together.
              </p>
              <p>
                RIXVEN is not a product company chasing market trends. We are a
                technology conglomerate building the core — the layer beneath
                everything else — so that the next generation of software can
                exist at all.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-[#E5E7EB]">
              {[
                { value: '3', label: 'Core Products' },
                { value: '∞', label: 'Possibilities' },
                { value: '1', label: 'Mission' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-3xl font-black text-[#0887C9]">{value}</p>
                  <p className="text-xs text-[#6B7280] mt-1 font-medium uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION BAND ── */}
      <section className="bg-[#F8FAFC] border-y border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: '⬡',
                title: 'RIXVEN OS',
                body: 'A microkernel operating system with formal verification, deterministic memory, and real-time guarantees. Built for mission-critical environments.',
              },
              {
                icon: '◈',
                title: 'RIXVEN AI',
                body: 'Autonomous AI architectures that reason, plan, and act — designed for integration at the infrastructure layer, not as an afterthought.',
              },
              {
                icon: '◇',
                title: 'RIXVEN Lang',
                body: 'A systems programming language that eliminates entire categories of bugs by design. Performance without compromise. Safety without ceremony.',
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="group">
                <div className="w-12 h-12 rounded-xl bg-[#0887C9]/10 flex items-center justify-center text-[#0887C9] text-xl mb-5">
                  {icon}
                </div>
                <h3 className="text-lg font-bold text-[#0A0F1A] mb-3">{title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
        <p className="text-xs font-mono tracking-[0.3em] text-[#0887C9] uppercase mb-4">
          What We Stand For
        </p>
        <h2 className="text-4xl font-black text-[#0A0F1A] mb-16">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { num: '01', title: 'First Principles', body: 'We question every assumption. Nothing is inherited just because it exists.' },
            { num: '02', title: 'Zero Compromise', body: 'Performance and safety are not trade-offs. We engineer until both are achieved.' },
            { num: '03', title: 'Long-Term Thinking', body: 'We build infrastructure meant to outlast decades of technology shifts.' },
            { num: '04', title: 'Radical Transparency', body: 'Open research, open benchmarks, and honest communication — always.' },
          ].map(({ num, title, body }) => (
            <div
              key={num}
              className="flex gap-6 p-8 rounded-2xl border border-[#E5E7EB] hover:border-[#0887C9]/40 hover:bg-[#F0F9FF] transition-all duration-200"
            >
              <span className="text-xs font-mono text-[#0887C9] mt-1 shrink-0">{num}</span>
              <div>
                <h4 className="font-bold text-[#0A0F1A] mb-2">{title}</h4>
                <p className="text-sm text-[#6B7280] leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0A0F1A] py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Ready to build the future?
          </h2>
            <p className="text-[#6B7280] mb-10 leading-relaxed">
              Whether you're looking for infrastructure-grade technology,
              or an engineer who wants to work on hard problems — RIXVEN is where you belong.
            </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0887C9] text-white font-semibold rounded-xl hover:bg-[#0772AA] transition-colors"
            >
              Get in Touch →
            </a>
            
          </div>
        </div>
      </section>

    </div>
  );
}
