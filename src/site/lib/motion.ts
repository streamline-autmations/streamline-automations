/**
 * Shared Framer Motion variants for src/site — all tuned to the one brand
 * easing cubic-bezier(0.22, 1, 0.36, 1). Keep v2 motion consistent by pulling
 * from here rather than redefining variants per component.
 */
import type { Variants } from 'framer-motion';

export const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
export const EASE_ARR: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Default once-only in-view trigger. */
export const viewport = { once: true, margin: '-80px' } as const;

/** Standard restrained rise-in fade. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_ARR } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_ARR } },
};

/** Parent for staggered children. */
export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
