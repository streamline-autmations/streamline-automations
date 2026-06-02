import { ElementType } from 'react';
import { motion, type Variants } from 'framer-motion';
import usePrefersReducedMotion from '../../../hooks/usePrefersReducedMotion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const word: Variants = {
  hidden: { y: '115%' },
  visible: { y: 0, transition: { duration: 0.85, ease: EASE } },
};

export interface Segment {
  text: string;
  /** Render this segment in the Instrument Serif italic accent style. */
  serif?: boolean;
}

interface Props {
  /** Heading content split into styled segments (joined with spaces). */
  segments: Segment[];
  as?: ElementType;
  className?: string;
  /** Override the serif accent styling if needed. */
  serifClassName?: string;
  /** 'mount' plays immediately, 'inview' plays once on scroll-enter. */
  trigger?: 'mount' | 'inview';
  stagger?: number;
  delay?: number;
}

/**
 * WordReveal — reliable masked word-by-word heading reveal (Framer).
 *
 * Each word sits in its own overflow-clip and rises into place with a staggered
 * brand ease. Word-level masking (not SplitText) means the heading wraps
 * naturally and never overflows at large display sizes — the shared, safe
 * heading-reveal primitive across every page.
 *
 * Reduced-motion renders the final state. Real words are aria-hidden and the
 * full phrase is exposed via aria-label so screen readers read it cleanly.
 */
export default function WordReveal({
  segments,
  as: Tag = 'h2',
  className = '',
  serifClassName = "font-['Instrument_Serif'] italic font-normal text-[#7B3FE4]",
  trigger = 'inview',
  stagger = 0.07,
  delay = 0.05,
}: Props) {
  const reduced = usePrefersReducedMotion();
  // Dynamic motion component for the requested semantic tag (h1/h2/p/…).
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
