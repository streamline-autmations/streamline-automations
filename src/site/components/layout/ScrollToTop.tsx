import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from '../../providers/LenisProvider';

/**
 * Resets scroll to the top on every route change. Drives Lenis directly when
 * it's active (smooth-scroll owns the scroll position), with a native fallback.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}
