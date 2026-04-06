// RIXVEN — app/page.tsx

import type { Metadata } from 'next';
import { HeroSlider } from '@/components/sections/HeroSlider';
import { BentoGrid } from '@/components/sections/BentoGrid';
import { StatsBar } from '@/components/sections/StatsBar';
import { ArchitecturePreview } from '@/components/sections/ArchitecturePreview';
import { TrustBar } from '@/components/sections/TrustBar';

export const metadata: Metadata = {
  title: 'The Core of Modern Intelligence — RIXVEN',
  description: 'RIXVEN engineers the computational foundations of tomorrow — a next-generation OS, autonomous AI architectures, and a high-performance systems language built for scale without compromise.',
};

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <TrustBar />
      <BentoGrid />
      <StatsBar />
      <ArchitecturePreview />
    </>
  );
}
