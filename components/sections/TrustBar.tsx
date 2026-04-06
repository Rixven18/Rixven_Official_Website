'use client';
// RIXVEN — TrustBar — white theme
export function TrustBar() {
  const logos = ['Cloudflare','Stripe','NASA JPL','Palantir','TSMC','CERN','DeepMind','Databricks'];
  return (
    <section className="py-12 border-y border-[#F3F4F6] bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p className="text-xs font-mono text-[#9CA3AF] uppercase tracking-widest text-center mb-8">Trusted by engineers at</p>
        <div className="flex flex-wrap justify-center gap-10">
          {logos.map((name) => (
            <span key={name} className="text-[#C4C9D4] font-bold text-base tracking-tight hover:text-[#6B7280] transition-colors cursor-default select-none">{name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
