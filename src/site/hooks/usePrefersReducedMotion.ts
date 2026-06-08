import { useEffect, useState } from 'react';

/**
 * Reactive boolean — true when the user has set `prefers-reduced-motion: reduce`.
 * Updates if the setting changes mid-session. SSR-safe (defaults to false).
 */
export default function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
