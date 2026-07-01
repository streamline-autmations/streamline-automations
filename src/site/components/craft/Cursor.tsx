import { useEffect, useRef, useState } from 'react';

/**
 * Cursor — native OS pointer stays visible; a small solid dot rides at its tip
 * ~1:1, always filled (never an outline).
 *
 * Colour swap is a plain background-color toggle, not mix-blend-mode/
 * backdrop-filter: both of those left the dot looking like a hollow ring at
 * small sizes on a fast, continuously-transformed element (a real Chromium
 * compositing limitation, not a CSS mistake — confirmed by testing at
 * multiple sizes). Instead, on every mousemove, we walk up from the element
 * under the pointer to find its *actual* rendered background colour (a solid
 * white pill sitting on the dark footer resolves to white, not the section's
 * dark colour) and set the dot to whichever of black/white contrasts with it.
 *
 * - Dot lerp 0.9, ring lerp 0.18, both driven on one requestAnimationFrame.
 * - Hover states via event delegation (works for lazily-added nodes):
 *     a / button / [role=button] / [data-cursor="link"] → dot grows, still filled
 *     [data-cursor="view"]  → big filled purple ring + "View"  label
 *     [data-cursor="drag"]  → big filled purple ring + "Drag"  label
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

    // Walks up from `el` to find the nearest ancestor with an opaque
    // background-color and returns its relative luminance (0 = black, 1 =
    // white). Falls back to 1 (the page's own white canvas) if nothing opaque
    // is found before <body>. [data-cursor-bg="light"|"dark"] short-circuits
    // this — some buttons (FillButton, ContactPill) reveal their fill colour
    // via a translated sibling <span> on hover, which computed background-
    // color can't see, so those components state their own hover colour.
    const bgLuminance = (el: Element | null): number => {
      const explicit = el?.closest('[data-cursor-bg]')?.getAttribute('data-cursor-bg');
      if (explicit === 'light') return 1;
      if (explicit === 'dark') return 0;
      let node: Element | null = el;
      while (node && node !== document.body) {
        const bg = getComputedStyle(node).backgroundColor;
        const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (m) {
          const alpha = m[4] !== undefined ? parseFloat(m[4]) : 1;
          if (alpha > 0.5) {
            const [r, g, b] = [+m[1], +m[2], +m[3]];
            return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
          }
        }
        node = node.parentElement;
      }
      return 1;
    };

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
      const target = document.elementFromPoint(mx, my);
      document.body.classList.toggle('sc-cur-on-dark', bgLuminance(target) < 0.5);
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

    const setMode = (mode: 'link' | 'text' | 'view' | 'drag' | null, text: string) => {
      document.body.classList.remove('sc-cur-link', 'sc-cur-text', 'sc-cur-view', 'sc-cur-drag');
      if (mode) document.body.classList.add('sc-cur-' + mode);
      label.textContent = text;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t) return;
      const viewEl = t.closest('[data-cursor="view"]');
      const dragEl = t.closest('[data-cursor="drag"]');
      // [data-cursor-label] overrides the default "View"/"Drag" text.
      if (viewEl) setMode('view', viewEl.getAttribute('data-cursor-label') || 'View');
      else if (dragEl) setMode('drag', dragEl.getAttribute('data-cursor-label') || 'Drag');
      // InvertText already renders its own colour-flip circle on the letters —
      // the plain dot would just paint an opaque disc on top of that, hiding it.
      else if (t.closest('[data-cursor="text"]')) setMode('text', '');
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
      document.body.classList.remove('sc-cursor', 'sc-cur-link', 'sc-cur-view', 'sc-cur-drag', 'sc-cur-on-dark');
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
