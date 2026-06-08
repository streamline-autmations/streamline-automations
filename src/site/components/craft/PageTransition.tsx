import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE_ARR } from '../../lib/motion';

/**
 * PageTransition — clean ink overlay wipe between routes (no spinny logos).
 *
 * Wrapped around each route element inside an <AnimatePresence mode="wait">
 * keyed by pathname. On exit the ink panel drops to cover; on enter it sweeps
 * up to reveal the new page while content fades in beneath it (~0.6s total).
 * Reduced-motion renders children with no panel and no motion.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, ease: EASE_ARR, delay: 0.15 } }}
      exit={{ opacity: 0, transition: { duration: 0.25, ease: EASE_ARR } }}
    >
      {/* Ink curtain — covers on exit, lifts to reveal on enter. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[2000] bg-site-ink"
        initial={{ y: 0 }}
        animate={{ y: '-100%', transition: { duration: 0.6, ease: EASE_ARR } }}
        exit={{ y: 0, transition: { duration: 0.4, ease: EASE_ARR } }}
        style={{ willChange: 'transform' }}
      />
      {children}
    </motion.div>
  );
}
