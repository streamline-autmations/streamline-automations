import { useEffect, useRef, useState } from 'react';

/**
 * DotRingCursor — a fast solid dot that tracks the pointer almost 1:1 and a
 * larger hollow ring that trails behind with smooth lerp easing.
 *
 * - Dot lerp 0.9, ring lerp 0.18, driven on a single requestAnimationFrame.
 * - Hover states via event delegation (so dynamically-added nodes work):
 *     a / button / [data-cursor="link"] → ring grows, dot fades
 *     [data-cursor="view"]              → big filled ring + "View" label
 *     [data-cursor="drag"]              → big filled ring + "Drag" label
 * - Native cursor hidden only on fine pointers (body.custom-cursor + CSS);
 *   coarse/touch hide the custom cursor entirely (CSS) and the rAF never runs.
 * - prefers-reduced-motion: reduce → never initialises (renders nothing).
 *
 * Brand accent: dot/ring #A67BFF, filled state #7B3FE4. Styles live in index.css.
 */
export default function DotRingCursor() {
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

    document.body.classList.add('custom-cursor');
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
      document.body.classList.remove('cur-link', 'cur-view', 'cur-drag');
      if (mode) document.body.classList.add('cur-' + mode);
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
      document.body.classList.remove('custom-cursor', 'cur-link', 'cur-view', 'cur-drag');
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
