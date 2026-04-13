import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from '../providers/LenisProvider';

function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      // Use Lenis scroll — bypassing window.scrollTo avoids Lenis conflicts
      lenis.scrollTo(0, { immediate: true });
    } else {
      // Fallback for mobile (where Lenis is disabled)
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, lenis]);

  return null;
}

export default ScrollToTop;
