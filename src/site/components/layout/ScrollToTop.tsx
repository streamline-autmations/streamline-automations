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
 *
 * A single scrollTo(0,0) isn't enough on its own: the incoming route is
 * lazy-loaded and often still growing (images decoding, web fonts swapping,
 * GSAP-pinned sections measuring) for a few hundred ms after it mounts —
 * especially on slower mobile connections. If that growth happens after the
 * one-shot reset, the page ends up sitting mid-scroll despite this component
 * having "already" run. So the reset holds the top for a short window,
 * re-asserting scrollY 0 every frame, and only stops early if the visitor
 * actually scrolls or touches the screen themselves.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();
  const reduced = useReducedMotion();
  const firstRun = useRef(true);
  const lastPath = useRef(pathname);

  // Without this the browser re-imposes its own remembered scroll offset for
  // a URL on back/forward nav (and sometimes on reload) after this component
  // has already reset it — so the page still lands mid-scroll despite the
  // logic below running correctly.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      const prev = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      return () => {
        window.history.scrollRestoration = prev;
      };
    }
  }, []);

  useEffect(() => {
    const targetId = hash ? hash.slice(1) : '';
    const routeChanged = lastPath.current !== pathname;
    lastPath.current = pathname;
    let retry: ReturnType<typeof setTimeout> | undefined;
    let stopHold: (() => void) | undefined;

    const go = () => {
      const el = targetId ? document.getElementById(targetId) : null;
      if (el) {
        if (lenis) lenis.scrollTo(el, { offset: -80, immediate: true });
        else el.scrollIntoView();
        return true;
      }
      return false;
    };

    // Re-asserts scrollY 0 every frame for HOLD_MS, so a late-arriving image,
    // font swap or GSAP measurement that grows the page can't leave it sitting
    // mid-scroll. Stops the instant the visitor scrolls/touches/uses a key.
    const HOLD_MS = 700;
    const holdAtTop = () => {
      let cancelled = false;
      const release = () => {
        cancelled = true;
        window.removeEventListener('wheel', release);
        window.removeEventListener('touchstart', release);
        window.removeEventListener('keydown', release);
      };
      window.addEventListener('wheel', release, { passive: true, once: true });
      window.addEventListener('touchstart', release, { passive: true, once: true });
      window.addEventListener('keydown', release, { once: true });

      const start = performance.now();
      const tick = () => {
        if (cancelled) return;
        if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
        else window.scrollTo(0, 0);
        if (performance.now() - start < HOLD_MS) requestAnimationFrame(tick);
      };
      tick();

      return release;
    };

    const run = () => {
      if (targetId) {
        if (!go()) retry = setTimeout(go, 300);
        return;
      }
      stopHold = holdAtTop();
    };

    // Same-page hash change, first load, or no curtain: act immediately.
    const waitForCurtain = routeChanged && !firstRun.current && !reduced;
    firstRun.current = false;
    if (!waitForCurtain) {
      run();
      return () => {
        clearTimeout(retry);
        stopHold?.();
      };
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
      stopHold?.();
    };
    // lenis is deliberately not a dep: it mounts after first render, and a
    // re-run then would scroll a deep-linked page back to the top.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, hash]);

  return null;
}
