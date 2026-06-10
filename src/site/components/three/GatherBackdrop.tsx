/**
 * GatherBackdrop — mounts the gathering-network scene behind the PreFooterCTA
 * content. Same integration pattern as EngineBackdrop/HeroVisual:
 *
 * - Lazy canvas; IntersectionObserver halts the frameloop while off-screen.
 * - One GSAP ScrollTrigger (Lenis-synced via gsap-setup — never a second
 *   scroll system) maps the section's approach to gather progress 0→1, timed
 *   so the network finishes assembling right as the CTA centres in view.
 * - burstSignal is a counter ref the CTA increments on hover; the scene
 *   watches it and fires the packet burst.
 * - ≤768px / prefers-reduced-motion → renders nothing; the PreFooterCTA's
 *   CSS gradient blooms remain as the static fallback visual.
 */
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import { ScrollTrigger } from '../../lib/gsap';
import { useNoWebGL } from './HeroVisual';

const GatherScene = lazy(() => import('./GatherScene'));

export default function GatherBackdrop({
  burstSignal,
}: {
  burstSignal: MutableRefObject<number>;
}) {
  const blocked = useNoWebGL();
  const wrapRef = useRef<HTMLDivElement>(null);
  const gatherRef = useRef(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (blocked) return;
    const section = wrapRef.current?.closest('section');
    if (!section) return;
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'center 55%',
      onUpdate: (self) => {
        gatherRef.current = self.progress;
      },
    });
    return () => st.kill();
  }, [blocked]);

  useEffect(() => {
    if (blocked) return;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [blocked]);

  if (blocked) return null;

  return (
    <div ref={wrapRef} aria-hidden className="pointer-events-none absolute inset-0">
      <Suspense fallback={null}>
        <GatherScene gatherRef={gatherRef} burstSignal={burstSignal} active={inView} />
      </Suspense>
    </div>
  );
}
