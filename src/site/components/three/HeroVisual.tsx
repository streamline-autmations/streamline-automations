/**
 * HeroVisual — gate + glue for the homepage 3D "liquid core".
 *
 * - Lazy-loads the R3F scene so three.js never blocks first paint.
 * - ≤768px or prefers-reduced-motion → NO WebGL at all; renders the pure-CSS
 *   OrbFallback instead (also used as the Suspense loading state).
 * - PROD INTEGRATION (graduated from /lab): a GSAP ScrollTrigger on the hero
 *   section writes its 0→1 progress into a ref; the scene reads that ref in
 *   useFrame. No drei ScrollControls — this is what lets the scene coexist
 *   with the site-wide Lenis smooth scroll.
 * - An IntersectionObserver halts the canvas frameloop once the hero has
 *   scrolled out of view, so the orb costs nothing on the rest of the page.
 */
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from '../../lib/gsap';

const HeroScene = lazy(() => import('./HeroScene'));

/** True when WebGL should NOT load: small screens or reduced-motion users. */
export function useNoWebGL() {
  const [blocked, setBlocked] = useState(
    () =>
      window.matchMedia('(max-width: 768px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const queries = [
      window.matchMedia('(max-width: 768px)'),
      window.matchMedia('(prefers-reduced-motion: reduce)'),
    ];
    const update = () => setBlocked(queries.some((q) => q.matches));
    queries.forEach((q) => q.addEventListener('change', update));
    return () => queries.forEach((q) => q.removeEventListener('change', update));
  }, []);

  return blocked;
}

/**
 * OrbFallback — pure-CSS purple sphere: gradient ball + soft halo. Position it
 * via className (it sets no position of its own); children fill the box.
 */
export function OrbFallback({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <div className="absolute left-1/2 top-1/2 aspect-square w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-site-accent opacity-[0.14] blur-[70px]" />
      <div className="absolute left-1/2 top-1/2 aspect-square w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_33%_28%,#A87BF7_0%,#7B3FE4_45%,#5B2BD6_74%,#43169E_100%)] shadow-[0_48px_90px_-24px_rgba(123,63,228,0.5)]" />
    </div>
  );
}

export default function HeroVisual({ className = '' }: { className?: string }) {
  const blocked = useNoWebGL();
  const wrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [inView, setInView] = useState(true);

  // Hero scroll progress 0→1 → ref → consumed by the scene's useFrame.
  useEffect(() => {
    if (blocked) return;
    const section = wrapRef.current?.closest('section');
    if (!section) return;
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });
    return () => st.kill();
  }, [blocked]);

  // Stop rendering frames entirely once the hero is off-screen.
  useEffect(() => {
    if (blocked) return;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [blocked]);

  if (blocked) return <OrbFallback className={className} />;

  return (
    <div ref={wrapRef} className={className} aria-hidden>
      <Suspense fallback={<OrbFallback className="absolute inset-0" />}>
        <HeroScene progressRef={progressRef} active={inView} />
      </Suspense>
    </div>
  );
}
