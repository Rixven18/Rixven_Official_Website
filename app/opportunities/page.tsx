'use client';

import { useState } from 'react';
import Link from 'next/link';

const PRODUCTS = [
  {
    id: 'os_key',
    name: 'RIXVEN OS',
    icon: '⬡',
    color: '#0078D4',
    value: 'FREE — 0%',
    desc: 'Full RIXVEN OS developer license with access to all releases, security patches, and kernel source — completely free forever.',
    perks: ['All OS versions — forever', 'Kernel source access', 'Priority security patches'],
  },
  {
    id: 'ai_key',
    name: 'RIXVEN AI',
    icon: '◈',
    color: '#107C10',
    value: 'FREE — 0%',
    desc: 'Unlimited inference tokens, model access, and API calls to the RIXVEN AI platform — lifetime, 100% free.',
    perks: ['Unlimited inference tokens', 'All model versions', 'Private API endpoint'],
  },
  {
    id: 'code_editor',
    name: 'RIXVEN Code',
    icon: '⌨',
    color: '#8764B8',
    value: 'FREE — 0%',
    desc: 'The RIXVEN Code editor — purpose-built for RIXVEN Lang with AI-powered completions, debugging, and kernel inspection — free forever.',
    perks: ['RIXVEN Lang LSP', 'AI code completions', 'Kernel debugger integration'],
  },
];

type FormData = {
  name: string;
  email: string;
  role: string;
  company: string;
  usecase: string;
  products: string[];
  github: string;
};

export default function OpportunitiesPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: '', email: '', role: '', company: '', usecase: '', products: [], github: '',
  });

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selected.length === 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#faf9f8] flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 rounded-full bg-[#0078D4]/10 border-2 border-[#0078D4]/40 flex items-center justify-center text-3xl mx-auto mb-8">
            ✓
          </div>
          <h2 className="text-4xl font-bold text-[#1a1a1a] mb-4">Application Received!</h2>
          <p className="text-[#5c5c5c] leading-relaxed mb-8">
            Thank you for applying to RIXVEN Early Access. Our team reviews every application personally.
            You&apos;ll receive your license keys at <strong className="text-[#0078D4]">{form.email}</strong> within 48 hours.
          </p>
          <div className="p-6 rounded-2xl border border-[#edebe9] bg-white mb-8">
            <p className="text-sm text-[#605e5c] mb-4">You requested:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {selected.map((id) => {
                const p = PRODUCTS.find((p) => p.id === id)!;
                return (
                  <span key={id} className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: `${p.color}15`, color: p.color }}>
                    {p.name} — Lifetime
                  </span>
                );
              })}
            </div>
          </div>
          <Link href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0078D4] text-white font-semibold rounded-lg hover:bg-[#006cbd] transition-all">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f8]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-[#edebe9]">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#0078D4 1px,transparent 1px),linear-gradient(90deg,#0078D4 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-[#107C10] opacity-6 blur-[150px] rounded-full pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-12 pt-28 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#107C10]/30 bg-[#107C10]/8 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#107C10] animate-pulse" />
            <span className="text-xs font-medium tracking-widest text-[#107C10] uppercase">Limited Early Access</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#1a1a1a] leading-[0.95] tracking-tight mb-6">
            Get RIXVEN<br />
            <span className="text-[#107C10]">Free. Forever.</span>
          </h1>
          <p className="text-[#5c5c5c] text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            We&apos;re giving select engineers, researchers, and builders <strong className="text-[#1a1a1a]">free lifetime licenses</strong> to every RIXVEN product — OS keys, AI access, and our Code editor. No catch. No credit card.
          </p>
          <p className="text-xs font-medium text-[#8a8886]">
            Only <strong className="text-[#5c5c5c]">500 spots</strong> remaining in this cohort.
          </p>
        </div>
      </section>

      {/* ── PRODUCT SELECTOR + FORM ── */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
        <form onSubmit={handleSubmit} className="space-y-10">

          {/* Step 1 — Choose products */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-7 rounded-full bg-[#0078D4]/10 text-[#0078D4] text-xs font-bold flex items-center justify-center">1</span>
              <h2 className="text-lg font-semibold text-[#1a1a1a]">What do you want free access to?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PRODUCTS.map((p) => {
                const active = selected.includes(p.id);
                return (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => toggle(p.id)}
                    className={`text-left p-5 rounded-xl border-2 transition-all ${
                      active ? 'scale-[1.02] shadow-md' : 'hover:border-[#c8c6c4]'
                    }`}
                    style={{
                      borderColor: active ? p.color : '#edebe9',
                      backgroundColor: active ? `${p.color}08` : 'white',
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                        style={{ backgroundColor: `${p.color}15`, color: p.color }}>
                        {p.icon}
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all`}
                        style={{ borderColor: active ? p.color : '#c8c6c4' }}>
                        {active && <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />}
                      </div>
                    </div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-1">{p.name}</h3>
                    <p className="text-xs font-medium mb-3" style={{ color: p.color }}>{p.value}</p>
                    <p className="text-xs text-[#605e5c] leading-relaxed mb-4">{p.desc}</p>
                    <ul className="space-y-1.5">
                      {p.perks.map((perk) => (
                        <li key={perk} className="flex items-center gap-2 text-xs text-[#605e5c]">
                          <svg className="w-3 h-3 shrink-0" style={{ color: p.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
            {selected.length === 0 && (
              <p className="text-xs text-[#605e5c] mt-3 ml-1">Select at least one product to continue.</p>
            )}
          </div>

          {/* Step 2 — About you */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-7 rounded-full bg-[#0078D4]/10 text-[#0078D4] text-xs font-bold flex items-center justify-center">2</span>
              <h2 className="text-lg font-semibold text-[#1a1a1a]">Tell us about yourself.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'name', label: 'Full Name', placeholder: 'Your name', type: 'text', required: true },
                { key: 'email', label: 'Email Address', placeholder: 'you@example.com', type: 'email', required: true },
                { key: 'role', label: 'Your Role', placeholder: 'e.g. Systems Engineer, Researcher, Student', type: 'text', required: true },
                { key: 'company', label: 'Company / University', placeholder: 'Optional', type: 'text', required: false },
                { key: 'github', label: 'GitHub Profile', placeholder: 'github.com/username', type: 'text', required: false },
              ].map(({ key, label, placeholder, type, required }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-[#605e5c] uppercase tracking-wider mb-2">
                    {label} {required && <span className="text-[#0078D4]">*</span>}
                  </label>
                  <input
                    type={type}
                    required={required}
                    placeholder={placeholder}
                    value={String((form as Record<string, unknown>)[key] ?? '')}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full bg-white border border-[#c8c6c4] rounded-lg px-4 py-3 text-[#1a1a1a] placeholder-[#a19f9d] text-sm focus:outline-none focus:border-[#0078D4]/50 focus:ring-1 focus:ring-[#0078D4]/20 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Step 3 — Use case */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-7 rounded-full bg-[#0078D4]/10 text-[#0078D4] text-xs font-bold flex items-center justify-center">3</span>
              <h2 className="text-lg font-semibold text-[#1a1a1a]">What will you build?</h2>
            </div>
            <textarea
              required
              rows={4}
              placeholder="Describe what you plan to build or research with RIXVEN. The more detail you give us, the faster we can review your application."
              value={form.usecase}
              onChange={(e) => setForm((f) => ({ ...f, usecase: e.target.value }))}
              className="w-full bg-white border border-[#c8c6c4] rounded-lg px-4 py-3 text-[#1a1a1a] placeholder-[#a19f9d] text-sm focus:outline-none focus:border-[#0078D4]/50 focus:ring-1 focus:ring-[#0078D4]/20 transition-all resize-none"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between pt-4 border-t border-[#edebe9]">
            <p className="text-xs text-[#605e5c] max-w-sm leading-relaxed">
              By submitting, you agree that this is for personal / non-commercial use.
            </p>
            <button
              type="submit"
              disabled={selected.length === 0 || loading}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-white transition-all shrink-0 ${
                selected.length === 0 || loading
                  ? 'bg-[#c8c6c4] text-[#605e5c] cursor-not-allowed'
                  : 'bg-[#0078D4] hover:bg-[#006cbd] hover:shadow-md'
              }`}
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Apply for Free Access
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-[#edebe9]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: 'Is this really free?', a: 'Yes. We give lifetime licenses to builders and researchers who are doing interesting work. No strings attached.' },
              { q: 'What does "lifetime" mean?', a: 'You get free access to that product version and all future updates, forever. Even if RIXVEN raises prices later.' },
              { q: 'How long does review take?', a: 'We review every application manually. Most applicants hear back within 48 hours. Research applications may take up to 5 days.' },
              { q: 'Can I use this commercially?', a: 'Early access licenses are for personal and research use. For commercial use, contact us for pricing.' },
              { q: 'What if I want all three products?', a: 'Select all three! We grant bundles frequently to engineers who are building full-stack on RIXVEN.' },
              { q: 'Do I need to be a student?', a: 'No. We accept applications from anyone — students, professionals, independent researchers, and hobbyists.' },
            ].map(({ q, a }) => (
              <div key={q} className="p-5 rounded-xl border border-[#edebe9] bg-white">
                <h3 className="font-semibold text-[#1a1a1a] mb-2 text-sm">{q}</h3>
                <p className="text-sm text-[#605e5c] leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
