/**
 * EngineBackdrop — the /lab "Engine/Core" graduated into the PreFooterCTA ink
 * section as an ambient, scroll-reactive backdrop (replaces the old stock
 * video). Same integration pattern as HeroVisual:
 *
 * - Lazy canvas, transparent over the section's ink background.
 * - GSAP ScrollTrigger tracks the section through the viewport (0→1) and the
 *   scene spins up as you approach the CTA — the engine "running".
 * - IntersectionObserver halts the frameloop while off-screen.
 * - prefers-reduced-motion → renders nothing; the PreFooterCTA's CSS
 *   gradient blooms remain as the fallback visual. Runs on all screen sizes
 *   otherwise, mobile included.
 */
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from '../../lib/gsap';
import { useNoWebGL } from './HeroVisual';

const EngineScene = lazy(() => import('./EngineScene'));

export default function EngineBackdrop({
  corePos,
  drift = false,
}: {
  /** Passed through to the scene — position the core clear of the text. */
  corePos?: [number, number, number];
  /** Passed through to the scene — let the stream carry the orb. */
  drift?: boolean;
}) {
  const blocked = useNoWebGL();
  const wrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (blocked) return;
    const section = wrapRef.current?.closest('section');
    if (!section) return;
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        progressRef.current = self.progress;
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
    <div ref={wrapRef} aria-hidden className="absolute inset-0 opacity-[0.9]">
      <Suspense fallback={null}>
        <EngineScene progressRef={progressRef} active={inView} corePos={corePos} drift={drift} />
      </Suspense>
    </div>
  );
}
