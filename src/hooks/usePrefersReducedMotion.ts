import { useEffect, useState } from 'react';

/**
 * Reactive boolean — true when the user has set
 * `prefers-reduced-motion: reduce` at the OS level. Updates if the
 * setting changes mid-session. SSR-safe (defaults to false).
 */
export default function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mql.matches);

    const onChange = (event: MediaQueryListEvent) => setPrefersReduced(event.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return prefersReduced;
}
