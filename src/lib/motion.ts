// Standard Framer Motion variants — use everywhere, import from here
import type { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 22 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
};

export const stagger: Variants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.08 }
  },
};

// Use on individual card items inside a stagger container
export const cardItem: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.42, ease: 'easeOut' }
  },
};

// Standard viewport config
export const viewport = { once: true, margin: '-50px' };
