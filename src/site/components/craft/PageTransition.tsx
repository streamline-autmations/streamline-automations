import { ReactNode, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE_ARR } from '../../lib/motion';

// Module-scoped: persists across route swaps within a tab session, resets on
// hard reload. The root <AnimatePresence> used to carry initial={false} to
// skip this curtain's enter sweep on first load — but that also silently
// killed every whileInView scroll-reveal anywhere on the first-loaded page
// (AnimatePresence's initial prop suppresses descendants' initial variants
// tree-wide, not just this component's own). Tracking "first page" locally
// instead means only THIS component's own enter sweep is skipped for the
// visitor's first page, while whileInView reveals elsewhere work normally —
// and the AnimatePresence itself stays at its default (animates everyone).
let hasShownFirstPage = false;

/**
 * PageTransition — clean ink overlay wipe between routes (no spinny logos).
 *
 * Wrapped around each route element inside an <AnimatePresence mode="wait">
 * keyed by pathname. On exit the ink panel drops to cover; on enter it sweeps
 * up to reveal the new page while content fades in beneath it (~0.6s total).
 * The very first page a visitor lands on skips the enter sweep (nothing to
 * reveal yet) but still registers `exit`, so navigating away from it plays
 * the wipe normally. Reduced-motion renders children with no panel/motion.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const isFirstPage = useRef(!hasShownFirstPage).current;
  hasShownFirstPage = true;

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={isFirstPage ? false : { opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, ease: EASE_ARR, delay: 0.15 } }}
      exit={{ opacity: 0, transition: { duration: 0.25, ease: EASE_ARR } }}
    >
      {/* Ink curtain — covers on exit, lifts to reveal on enter. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[2000] bg-site-ink"
        initial={isFirstPage ? false : { y: 0 }}
        animate={{ y: '-100%', transition: { duration: 0.6, ease: EASE_ARR } }}
        exit={{ y: 0, transition: { duration: 0.4, ease: EASE_ARR } }}
        style={{ willChange: 'transform' }}
      />
      {children}
    </motion.div>
  );
}
