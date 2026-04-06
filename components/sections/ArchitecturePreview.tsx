'use client';
// RIXVEN — ArchitecturePreview — white theme
import Link from 'next/link';
const LAYERS = [
  { name: 'Application Layer', color: '#A855F7', items: ['User Apps', 'Enterprise Services', 'RIXVEN Code IDE'] },
  { name: 'RIXVEN AI', color: '#F5B543', items: ['Autonomous Agents', 'Inference Engine', 'Model Registry'] },
  { name: 'RIXVEN Lang Runtime', color: '#22C55E', items: ['Memory Manager', 'Type System', 'Concurrency Model'] },
  { name: 'RIXVEN OS Kernel', color: '#0887C9', items: ['Microkernel Core', 'HAL', 'Formal Verifier'] },
  { name: 'Hardware', color: '#6B7280', items: ['CPU / GPU', 'Memory', 'I/O Devices'] },
];
export function ArchitecturePreview() {
  return (
    <section className="py-24 bg-[#FAFAFA] border-y border-[#F3F4F6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-mono text-[#0887C9] uppercase tracking-widest mb-4">Architecture</p>
            <h2 className="text-4xl font-black text-[#0A0F1A] mb-6">One unified stack.<br /><span className="text-[#0887C9]">Every layer verified.</span></h2>
            <p className="text-[#6B7280] leading-relaxed mb-8">RIXVEN is not a collection of isolated products. Every layer is designed to integrate with every other layer — sharing memory primitives, scheduling guarantees, and formal safety proofs.</p>
            
          </div>
          <div className="space-y-3">
            {LAYERS.map((layer, i) => (
              <div key={layer.name} className="flex items-center gap-4 p-4 rounded-xl border border-[#F3F4F6] bg-white hover:border-[#E5E7EB] hover:shadow-sm transition-all"
                style={{ opacity: 1 - i * 0.04 }}>
                <div className="w-3 h-8 rounded-sm shrink-0" style={{ backgroundColor: layer.color }} />
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#0A0F1A] mb-1">{layer.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {layer.items.map((item) => (
                      <span key={item} className="text-xs px-2 py-0.5 rounded font-mono text-[#6B7280] bg-[#F3F4F6]">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
