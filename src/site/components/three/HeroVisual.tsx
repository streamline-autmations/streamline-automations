/**
 * HeroVisual — gate + glue for the homepage 3D "automation network".
 *
 * - Lazy-loads the R3F scene so three.js never blocks first paint.
 * - prefers-reduced-motion → NO WebGL at all; renders the static
 *   NetworkFallback image instead (also used as the Suspense loading state).
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

/** True when WebGL should NOT load: reduced-motion users only. */
export function useNoWebGL() {
  const [blocked, setBlocked] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setBlocked(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return blocked;
}

/**
 * NetworkFallback — static render of the automation network (no WebGL).
 * Position it via className (it sets no position of its own).
 */
export function NetworkFallback({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <img
        src="/hero-network.webp"
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute left-1/2 top-1/2 w-full max-w-none -translate-x-1/2 -translate-y-1/2 select-none object-contain"
      />
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

  if (blocked) return <NetworkFallback className={className} />;

  return (
    <div ref={wrapRef} className={className} aria-hidden>
      <Suspense fallback={<NetworkFallback className="absolute inset-0" />}>
        <HeroScene progressRef={progressRef} active={inView} />
      </Suspense>
    </div>
  );
}
