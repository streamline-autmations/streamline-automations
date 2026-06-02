import { ElementType, ReactNode, useRef } from 'react';
import { gsap, ScrollTrigger, SplitText, useGSAP } from '../../../lib/gsap-setup';
import usePrefersReducedMotion from '../../../hooks/usePrefersReducedMotion';

interface Props {
  children: ReactNode;
  /** Tag to render — defaults to an <h2>. */
  as?: ElementType;
  className?: string;
  /** Stagger between lines (seconds). */
  stagger?: number;
  /** Delay before the reveal starts (seconds). */
  delay?: number;
  /** ScrollTrigger start — when the reveal fires. */
  start?: string;
}

/**
 * RevealText — splits a heading into masked lines with GSAP SplitText and
 * staggers them up on scroll-enter (once), using the brand custom ease.
 *
 * - Animates transform + opacity only (yPercent), inside SplitText's own
 *   overflow-clip line masks.
 * - Waits for fonts so line breaks are measured correctly.
 * - prefers-reduced-motion: renders the final, un-split heading immediately.
 * - Reverts SplitText on unmount so the DOM is restored cleanly.
 *
 * Drop-in for any major section heading:
 *   <RevealText as="h2" className="...">I build <em>systems.</em></RevealText>
 */
export default function RevealText({
  children,
  as: Tag = 'h2',
  className = '',
  stagger = 0.12,
  delay = 0,
  start = 'top 85%',
}: Props) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;

      let split: SplitText | null = null;

      const run = () => {
        split = new SplitText(el, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'reveal-line',
        });
        gsap.from(split.lines, {
          yPercent: 115,
          opacity: 0,
          duration: 0.95,
          ease: 'brand',
          stagger,
          delay,
          scrollTrigger: { trigger: el, start, once: true },
        });
      };

      // Fonts must be ready or line wrapping (and thus the masks) is wrong.
      if (document.fonts && document.fonts.status !== 'loaded') {
        document.fonts.ready.then(() => {
          run();
          ScrollTrigger.refresh();
        });
      } else {
        run();
      }

      return () => {
        split?.revert();
      };
    },
    { scope: ref, dependencies: [reduced] }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
