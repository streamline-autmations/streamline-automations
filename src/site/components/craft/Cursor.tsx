import { useEffect, useRef, useState } from 'react';

/**
 * Cursor — a fast solid dot tracking the pointer ~1:1 plus a larger hollow ring
 * that trails with smooth lerp. The signature craft piece.
 *
 * - Dot lerp 0.9, ring lerp 0.18, both driven on one requestAnimationFrame.
 * - Hover states via event delegation (works for lazily-added nodes):
 *     a / button / [role=button] / [data-cursor="link"] → ring grows, dot hides
 *     [data-cursor="view"]  → big filled purple ring + "View"  label
 *     [data-cursor="drag"]  → big filled purple ring + "Drag"  label
 * - Native cursor hidden only on fine pointers (body.sc-cursor + CSS in site.css).
 * - Coarse/touch pointers: the rAF never starts and the CSS hides it entirely.
 * - prefers-reduced-motion: reduce → never initialises (renders nothing).
 *
 * Styles live in src/site/styles/site.css (.sc-cur-*). Mount once, app-wide.
 */
export default function Cursor() {
  const [active, setActive] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  // Only activate on a fine pointer with motion allowed.
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (fine && !reduce) setActive(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    document.body.classList.add('sc-cursor');
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx;
    let dy = my;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      dx = lerp(dx, mx, 0.9);
      dy = lerp(dy, my, 0.9);
      rx = lerp(rx, mx, 0.18);
      ry = lerp(ry, my, 0.18);
      dot.style.transform = `translate(${dx}px,${dy}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });

    const setMode = (mode: 'link' | 'view' | 'drag' | null, text: string) => {
      document.body.classList.remove('sc-cur-link', 'sc-cur-view', 'sc-cur-drag');
      if (mode) document.body.classList.add('sc-cur-' + mode);
      label.textContent = text;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t) return;
      if (t.closest('[data-cursor="view"]')) setMode('view', 'View');
      else if (t.closest('[data-cursor="drag"]')) setMode('drag', 'Drag');
      else if (t.closest('a, button, [role="button"], [data-cursor="link"]')) setMode('link', '');
      else setMode(null, '');
    };
    document.addEventListener('mouseover', onOver);

    const onLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };
    const onEnter = () => {
      dot.style.opacity = '';
      ring.style.opacity = '';
    };
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      document.body.classList.remove('sc-cursor', 'sc-cur-link', 'sc-cur-view', 'sc-cur-drag');
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      <div ref={ringRef} className="sc-cur-ring" aria-hidden="true">
        <span ref={labelRef} className="sc-cur-label" />
      </div>
      <div ref={dotRef} className="sc-cur-dot" aria-hidden="true" />
    </>
  );
}
