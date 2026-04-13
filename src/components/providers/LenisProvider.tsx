/**
 * LenisProvider
 * Wraps the app with ultra-smooth scroll (Lenis) and syncs it to GSAP's
 * ticker so ScrollTrigger scrub values update on every frame without
 * a separate requestAnimationFrame loop.
 *
 * Disabled automatically on touch/mobile devices — native scroll
 * performs better there.
 */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../../lib/gsap-setup';

const LenisContext = createContext<Lenis | null>(null);

/** Access the Lenis instance anywhere inside the provider tree. */
export function useLenis() {
  return useContext(LenisContext);
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Keep native scroll on touch / small screens
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const instance = new Lenis({
      duration: 1.2,
      // Exponential ease — feels luxurious but never laggy
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    setLenis(instance);

    // Keep ScrollTrigger in sync with Lenis scroll position
    instance.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker — single RAF loop, no jitter
    const onTick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
