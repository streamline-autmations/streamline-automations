import { useEffect, useState } from 'react';

/**
 * Reactive boolean — true when the user has set `prefers-reduced-motion: reduce`.
 * Updates if the setting changes mid-session. SSR-safe (defaults to false).
 */
export default function usePrefersReducedMotion(): boolean {
  // Read synchronously on the FIRST render, not in the effect. Defaulting to
  // false meant every component decided "motion is allowed" for one render:
  // SplitReveal then rendered its words in the `hidden` state (translated
  // 115% down inside an overflow-hidden clip), and because MotionConfig
  // reducedMotion="user" skips transform animations, they never travelled
  // back up — headlines stayed in the DOM but permanently invisible on
  // screen for reduced-motion visitors.
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
