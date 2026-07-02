import { ElementType, Fragment } from 'react';
import { motion, type Variants } from 'framer-motion';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import { EASE_ARR } from '../../lib/motion';

const word: Variants = {
  hidden: { y: '115%' },
  visible: { y: 0, transition: { duration: 0.85, ease: EASE_ARR } },
};

export interface Segment {
  text: string;
  /** Render this segment in the purple accent colour. */
  serif?: boolean;
}

interface Props {
  /** Heading content split into styled segments. */
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
 * SplitReveal - the canonical masked heading reveal. Each word sits in its own
 * overflow-clip and rises into place with a staggered brand ease.
 *
 * Real space characters are rendered between words so copied text, browser
 * extraction and assistive tech keep the heading readable.
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

  const tokens = segments.flatMap((seg, si) =>
    seg.text
      .split(' ')
      .filter(Boolean)
      .map((w, wi) => ({ word: w, serif: seg.serif, key: `${si}-${wi}` })),
  );
  const label = segments.map((s) => s.text).join(' ').replace(/\s+([.,!?;:])/g, '$1');
  const needsSpaceAfter = (index: number) => {
    const next = tokens[index + 1]?.word;
    return Boolean(next && !/^[.,!?;:)]/.test(next));
  };

  return (
    <MotionTag
      {...animateProps}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      className={className}
      aria-label={label}
    >
      {tokens.map((token, index) => (
        <Fragment key={token.key}>
          <span
            aria-hidden="true"
            className="inline-block overflow-hidden align-top pb-[0.04em]"
            style={needsSpaceAfter(index) ? { marginRight: '0.25em' } : undefined}
          >
            <motion.span
              variants={word}
              className={`inline-block pb-[0.16em] ${token.serif ? serifClassName : ''}`}
            >
              {token.word}
            </motion.span>
          </span>
        </Fragment>
      ))}
    </MotionTag>
  );
}
