import { ReactNode, useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

/**
 * ParallaxMedia — an overflow-hidden frame whose contents drift vertically as
 * the frame crosses the viewport (classic inside-the-mask parallax). The inner
 * layer is pre-scaled just past the drift range so edges never show.
 *
 * - Frame owns the crop: pass rounding/border/aspect via className.
 * - Children should fill the inner layer (h-full w-full object-cover).
 * - Desktop-only (gsap.matchMedia ≥768px) and skipped under reduced motion —
 *   mobile and RM users just get the static framed media.
 * - Transform-only, scrubbed at 0.4 so it trails the scroll a touch.
 */
export default function ParallaxMedia({
  children,
  className = '',
  /** Vertical drift in percent — the inner layer travels ±strength. */
  strength = 6,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  // Cover the drift range with a hair of margin so edges never peek through.
  const scale = 1 + (strength * 2 + 2) / 100;

  useGSAP(
    () => {
      if (reduced || !frameRef.current || !innerRef.current) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const tween = gsap.fromTo(
          innerRef.current,
          { yPercent: -strength, scale },
          {
            yPercent: strength,
            scale,
            ease: 'none',
            scrollTrigger: {
              trigger: frameRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.4,
            },
          },
        );
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: frameRef, dependencies: [reduced, strength] },
  );

  return (
    <div ref={frameRef} className={`overflow-hidden ${className}`}>
      <div ref={innerRef} className="h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
