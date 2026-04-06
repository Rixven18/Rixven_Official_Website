import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Cpu, Brain, Code2, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Products — RIXVEN',
  description: 'Explore RIXVEN\'s next-generation technology products including OS, AI, and systems programming language.',
};

const PRODUCTS = [
  {
    id: 'os',
    label: 'RIXVEN OS',
    href: '/os',
    icon: Cpu,
    badge: 'Coming Soon',
    accent: '#0078D4',
    description: 'A next-generation operating system with a formally verified microkernel, deterministic memory management, and real-time guarantees.',
    features: [
      'Formally verified microkernel (~15,000 LOC)',
      'Deterministic memory management',
      '140ns kernel context switch',
      'Driver isolation & hot-reload',
      'TPM 2.0 + Remote Attestation',
    ],
    stat: { value: '140ns', label: 'Kernel Context Switch' },
  },
  {
    id: 'ai',
    label: 'RIXVEN AI',
    href: '/ai',
    icon: Brain,
    badge: 'Coming Soon',
    accent: '#107C10',
    description: 'Autonomous AI architecture for sovereign edge deployments. Operates at the kernel layer as a first-class citizen of the system.',
    features: [
      'Kernel-level AI inference',
      'Sub-millisecond latency',
      '100% data sovereignty',
      'Edge-first architecture',
      'Zero-trust security model',
    ],
    stat: { value: '0.3ms', label: 'Inference Latency' },
  },
  {
    id: 'lang',
    label: 'RIXVEN Lang',
    href: '/lang',
    icon: Code2,
    badge: 'Coming Soon',
    accent: '#8764B8',
    description: 'A high-performance systems language with provable memory safety. Compile-time guarantees with C-level performance.',
    features: [
      '100% compile-time memory safety',
      'Formal type guarantees',
      'C-level performance',
      'Zero runtime exceptions',
      'Native WASM support',
    ],
    stat: { value: '100%', label: 'Memory Safe' },
  },
];

export default function ProductsPage() {
  return (
    <>
      {/* Breadcrumb */}
      <nav className="max-w-content mx-auto px-6 lg:px-8 pt-28 pb-4" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-xs text-rixven-charcoal-400 font-sans">
          <li><Link href="/" className="hover:text-rixven-charcoal transition-colors">RIXVEN</Link></li>
          <li className="opacity-40">/</li>
          <li className="text-rixven-charcoal font-medium">Products</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="max-w-content mx-auto px-6 lg:px-8 py-12 pb-16">
        <h1 className="font-display font-800 text-5xl lg:text-6xl text-rixven-charcoal tracking-tighter mb-6">
          Our <span className="text-rixven-blue">Products</span>
        </h1>
        <p className="text-xl text-rixven-charcoal-500 max-w-2xl leading-relaxed font-sans">
          Engineering the computational foundations of tomorrow. From operating systems to autonomous AI, RIXVEN builds technology that redefines what's possible.
        </p>
      </section>

      {/* Products Grid */}
      <section className="max-w-content mx-auto px-6 lg:px-8 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-2xl border border-rixven-white-pearl p-8 hover:border-rixven-charcoal-300 hover:shadow-card-lg transition-all duration-300"
              >
                {/* Badge */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6"
                  style={{
                    color: product.accent,
                    backgroundColor: `${product.accent}12`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: product.accent }} />
                  {product.badge}
                </div>

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${product.accent}12`, border: `1px solid ${product.accent}20` }}
                >
                  <Icon className="w-7 h-7" style={{ color: product.accent }} />
                </div>

                {/* Title */}
                <h2 className="font-display font-700 text-2xl text-rixven-charcoal mb-3">
                  {product.label}
                </h2>

                {/* Description */}
                <p className="text-sm text-rixven-charcoal-500 leading-relaxed font-sans mb-6">
                  {product.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {product.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-rixven-charcoal-600 font-sans">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: product.accent }} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Stat */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold" style={{ color: product.accent }}>{product.stat.value}</span>
                  </div>
                  <p className="text-xs text-rixven-charcoal-400 font-sans">{product.stat.label}</p>
                </div>

                {/* CTA */}
                <Link
                  href={product.href}
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg font-semibold text-sm transition-colors"
                  style={{ backgroundColor: product.accent, color: 'white' }}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-rixven-charcoal py-20">
        <div className="max-w-content mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display font-700 text-3xl lg:text-4xl text-white tracking-tight mb-4">
            Ready to build the future?
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-8 font-sans">
            Join our early access program to get hands-on experience with RIXVEN technology before anyone else.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/opportunities"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-rixven-blue text-white font-semibold rounded-lg hover:bg-rixven-blue-600 transition-colors"
            >
              Get Early Access
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
