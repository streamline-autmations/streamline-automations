import { useEffect, useState } from 'react';

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
