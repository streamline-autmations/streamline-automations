import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../../../hooks/usePrefersReducedMotion';

/**
 * LiquidGradient — Awwwards-style animated mesh gradient for the hero.
 *
 * Six large gradient blobs (70-110vw each) at high opacity (0.4-0.55) drift
 * on independent paths with different durations. mix-blend-mode: multiply means
 * overlapping blobs create richer, deeper colour — giving the layered depth
 * the current subtle blobs lack.
 *
 * This is the same technique used by Stripe, Linear, Vercel, and most
 * Awwwards-featured agency hero sections.
 *
 * Skipped entirely on prefers-reduced-motion (renders null).
 */

const BLOBS = [
  {
    // Top-left — large deep purple anchor
    style: {
      width: '100vw',
      height: '100vw',
      top: '-30%',
      left: '-25%',
      background:
        'radial-gradient(circle at 40% 40%, rgba(123,63,228,0.52), rgba(123,63,228,0.10) 55%, transparent 72%)',
    },
    animate: {
      x: [0, 60, -30, 0],
      y: [0, -50, 20, 0],
      scale: [1, 1.12, 0.94, 1],
    },
    duration: 13,
  },
  {
    // Top-right — indigo/blue
    style: {
      width: '85vw',
      height: '85vw',
      top: '-20%',
      right: '-20%',
      background:
        'radial-gradient(circle at 60% 35%, rgba(139,92,246,0.45), rgba(99,72,210,0.12) 52%, transparent 70%)',
    },
    animate: {
      x: [0, -70, 40, 0],
      y: [0, 40, -55, 0],
      scale: [1, 0.93, 1.08, 1],
    },
    duration: 17,
  },
  {
    // Centre — large soft lavender, creates the middle glow
    style: {
      width: '110vw',
      height: '110vw',
      top: '-10%',
      left: '50%',
      transform: 'translateX(-50%)',
      background:
        'radial-gradient(circle at 50% 45%, rgba(168,72,206,0.38), rgba(139,92,246,0.08) 50%, transparent 68%)',
    },
    animate: {
      x: [0, 40, -40, 0],
      y: [0, -30, 50, 0],
      scale: [1, 1.07, 0.96, 1],
    },
    duration: 21,
  },
  {
    // Bottom-left — violet warmth
    style: {
      width: '75vw',
      height: '75vw',
      bottom: '-15%',
      left: '-10%',
      background:
        'radial-gradient(circle at 45% 55%, rgba(167,56,215,0.40), rgba(123,63,228,0.10) 55%, transparent 72%)',
    },
    animate: {
      x: [0, 50, -20, 0],
      y: [0, -40, 60, 0],
      scale: [1, 1.09, 0.97, 1],
    },
    duration: 15,
  },
  {
    // Bottom-right — deep indigo depth
    style: {
      width: '80vw',
      height: '80vw',
      bottom: '-20%',
      right: '-15%',
      background:
        'radial-gradient(circle at 55% 50%, rgba(109,48,200,0.42), rgba(99,72,210,0.08) 52%, transparent 70%)',
    },
    animate: {
      x: [0, -45, 30, 0],
      y: [0, 55, -35, 0],
      scale: [1, 0.95, 1.10, 1],
    },
    duration: 19,
  },
  {
    // Accent — small bright purple highlight, wanders unpredictably
    style: {
      width: '45vw',
      height: '45vw',
      top: '25%',
      left: '55%',
      background:
        'radial-gradient(circle at 50% 50%, rgba(147,51,234,0.48), transparent 65%)',
    },
    animate: {
      x: [0, -80, 60, -30, 0],
      y: [0, 50, -70, 30, 0],
      scale: [1, 1.15, 0.88, 1.05, 1],
    },
    duration: 11,
  },
];

export default function LiquidGradient() {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        zIndex: 1,
        // multiply: where blobs overlap they produce richer, deeper colour.
        // On white, each blob reads true; at overlaps they intensify.
        mixBlendMode: 'multiply',
      }}
    >
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            ...blob.style,
            filter: 'blur(55px)',
            willChange: 'transform',
          }}
          animate={blob.animate}
          transition={{
            duration: blob.duration,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'mirror',
          }}
        />
      ))}
    </div>
  );
}
