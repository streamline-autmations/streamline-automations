import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { useLenis } from '../../providers/LenisProvider';
import { PAGE_EXIT_EVENT } from '../craft/PageTransition';

/**
 * Resets scroll to the top on every route change. Drives Lenis directly when
 * it's active (smooth-scroll owns the scroll position), with a native fallback.
 *
 * Waits for the page transition: resetting the instant the pathname changes
 * made the outgoing page visibly jump to its own top while it was still on
 * screen. With motion allowed, the reset runs once PageTransition's ink
 * curtain has fully covered the old page (PAGE_EXIT_EVENT), with a timeout
 * fallback. The first page load and reduced-motion (no curtain) reset at once.
 *
 * Hash-aware: a deep link like /restaurant-direct#review lands on that section
 * instead of the top. The target may not exist on the first pass (routes are
 * lazy), so an unresolved hash gets one retry.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();
  const reduced = useReducedMotion();
  const firstRun = useRef(true);
  const lastPath = useRef(pathname);

  useEffect(() => {
    const targetId = hash ? hash.slice(1) : '';
    const routeChanged = lastPath.current !== pathname;
    lastPath.current = pathname;
    let retry: ReturnType<typeof setTimeout> | undefined;

    const go = () => {
      const el = targetId ? document.getElementById(targetId) : null;
      if (el) {
        if (lenis) lenis.scrollTo(el, { offset: -80, immediate: true });
        else el.scrollIntoView();
        return true;
      }
      return false;
    };

    const run = () => {
      if (targetId) {
        if (!go()) retry = setTimeout(go, 300);
        return;
      }
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo(0, 0);
    };

    // Same-page hash change, first load, or no curtain: act immediately.
    const waitForCurtain = routeChanged && !firstRun.current && !reduced;
    firstRun.current = false;
    if (!waitForCurtain) {
      run();
      return () => clearTimeout(retry);
    }

    let done = false;
    const onExit = () => {
      if (done) return;
      done = true;
      run();
    };
    window.addEventListener(PAGE_EXIT_EVENT, onExit, { once: true });
    const fallback = setTimeout(onExit, 1000);
    return () => {
      window.removeEventListener(PAGE_EXIT_EVENT, onExit);
      clearTimeout(fallback);
      clearTimeout(retry);
    };
    // lenis is deliberately not a dep: it mounts after first render, and a
    // re-run then would scroll a deep-linked page back to the top.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, hash]);

  return null;
}
