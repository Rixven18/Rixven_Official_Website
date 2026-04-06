// RIXVEN — components/providers/MotionProvider.tsx
// Framer Motion AnimatePresence wrapper.
// Note: LazyMotion removed — incompatible with React 19 / Next.js 15.

'use client';

import { AnimatePresence } from 'framer-motion';

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="sync">
      {children}
    </AnimatePresence>
  );
}
