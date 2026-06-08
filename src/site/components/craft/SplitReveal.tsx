import { ElementType } from 'react';
import { motion, type Variants } from 'framer-motion';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import { EASE_ARR } from '../../lib/motion';

const word: Variants = {
  hidden: { y: '115%' },
  visible: { y: 0, transition: { duration: 0.85, ease: EASE_ARR } },
};

export interface Segment {
  text: string;
  /** Render this segment in the purple accent colour (same DM Sans font). */
  serif?: boolean;
}

interface Props {
  /** Heading content split into styled segments (joined with spaces). */
  segments: Segment[];
  as?: ElementType;
  className?: string;
  serifClassName?: string;
  /** 'mount' plays immediately; 'inview' plays once on scroll-enter. */
  trigger?: 'mount' | 'inview';
  stagger?: number;
  delay?: number;
}

/**
 * SplitReveal — the canonical masked heading reveal. Each word sits in its own
 * overflow-clip and rises into place with a staggered brand ease.
 *
 * Word-level masking (not GSAP SplitText line-splitting) means the heading wraps
 * naturally and never overflows at large display sizes — safe site-wide. Real
 * words are aria-hidden; the full phrase is exposed via aria-label for SR.
 * Reduced-motion renders the final state instantly.
 */
export default function SplitReveal({
  segments,
  as: Tag = 'h2',
  className = '',
  serifClassName = 'text-site-accent',
  trigger = 'inview',
  stagger = 0.07,
  delay = 0.05,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = (motion as unknown as Record<string, ElementType>)[Tag as string];

  const animateProps = reduced
    ? { initial: 'visible' as const }
    : trigger === 'mount'
      ? { initial: 'hidden' as const, animate: 'visible' as const }
      : {
          initial: 'hidden' as const,
          whileInView: 'visible' as const,
          viewport: { once: true, margin: '-80px' },
        };

  const label = segments.map((s) => s.text).join(' ');

  return (
    <MotionTag
      {...animateProps}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      className={className}
      aria-label={label}
    >
      {segments.map((seg, si) =>
        seg.text.split(' ').map((w, wi) => (
          <span
            key={`${si}-${wi}`}
            aria-hidden="true"
            className="inline-block overflow-hidden align-top px-[0.05em] pb-[0.04em]"
          >
            <motion.span
              variants={word}
              className={`inline-block pb-[0.16em] ${seg.serif ? serifClassName : ''}`}
            >
              {w}
            </motion.span>
          </span>
        ))
      )}
    </MotionTag>
  );
}
