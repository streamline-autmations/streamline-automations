import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

export interface StripItem {
  src: string;
  alt: string;
  /** CSS aspect-ratio for the card, e.g. '16/10' (default) or '9/19' for phone shots. */
  aspect?: string;
}

interface Props {
  items: readonly StripItem[];
}

/**
 * ScreenStrip — a horizontal filmstrip of screenshots that breaks up the
 * vertical page rhythm. Desktop pins the strip and lets vertical scroll drive
 * a horizontal scrub (same transform-only pattern as CaseStudyCycler, default
 * pin — Lenis drives window scroll so fixed pins are safe here). Under 768px
 * and under reduced motion it's a plain swipeable horizontal scroller with
 * snap points — no pin, per the mobile-simplify rule.
 */
export default function ScreenStrip({ items }: Props) {
  const reduced = usePrefersReducedMotion();
  const scopeRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced || !wrapRef.current || !trackRef.current) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const wrap = wrapRef.current!;
        const track = trackRef.current!;
        const st = ScrollTrigger.create({
          trigger: wrap,
          start: 'top top',
          // Deliberate scroll length per card — raw pixel overflow is too
          // short and a single flick would blow through the whole strip.
          end: '+=' + items.length * 55 + '%',
          pin: wrap,
          anticipatePin: 1,
          scrub: 0.6,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const maxX = Math.max(0, track.scrollWidth - wrap.clientWidth);
            gsap.set(track, { x: -self.progress * maxX });
          },
        });
        return () => st.kill();
      });
      return () => mm.revert();
    },
    { scope: scopeRef, dependencies: [reduced, items.length] },
  );

  return (
    <div ref={scopeRef}>
      <div
        ref={wrapRef}
        className={`flex flex-col justify-center md:h-[100svh] ${
          reduced
            ? 'overflow-x-auto'
            : 'snap-x snap-mandatory overflow-x-auto md:snap-none md:overflow-hidden'
        } [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        <div
          ref={trackRef}
          className="flex w-max items-center gap-5 px-6 py-4 will-change-transform md:gap-8 md:px-10"
        >
          {items.map((item) => (
            <div
              key={item.src}
              className="h-[46vh] shrink-0 snap-center overflow-hidden rounded-2xl border border-site-line bg-site-surface md:h-[60vh] md:snap-align-none md:rounded-3xl"
              style={{ aspectRatio: item.aspect ?? '16/10' }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                draggable={false}
                className="h-full w-full select-none object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
