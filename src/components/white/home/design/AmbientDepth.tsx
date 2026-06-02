import { useEffect, useRef } from 'react';
import usePrefersReducedMotion from '../../../../hooks/usePrefersReducedMotion';

/**
 * AmbientDepth — the page-wide depth field that shows through the transparent
 * white sections: a clearly-present purple graph-paper grid + richer purple /
 * soft-magenta blooms. Gives the tinted panels (#FAFAFA / #F0EBFF) something to
 * sit over so the page reads as layered, not flat white.
 *
 * Desktop (fine pointer, motion ok): a soft purple glow follows the cursor and
 *   lifts/brightens the grid beneath it — a grid-lens reveal. Driven by a
 *   transform-only rAF lerp (compositor, 60fps; no per-frame repaint).
 * Mobile / no pointer: the blooms slowly auto-drift instead (CSS, cheap).
 * prefers-reduced-motion: everything static — no follow-glow, no drift.
 *
 * Purely decorative — pointer-events none, lives behind all content (z-0).
 */
export default function AmbientDepth() {
  const reduced = usePrefersReducedMotion();
  const glowRef = useRef<HTMLDivElement>(null);

  // Cursor-tracked grid-lens — desktop fine-pointer only.
  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const glow = glowRef.current;
    if (!fine || !glow) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      cx += (mx - cx) * 0.1;
      cy += (my - cy) * 0.1;
      // This layer is absolute within the (scrolling) page, so map the cursor's
      // viewport point into page space with the current scroll offset.
      const py = cy + window.scrollY;
      glow.style.transform = `translate3d(${cx - 300}px, ${py - 300}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });
    glow.style.opacity = '1';

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* graph-paper line grid — clearly present, fades toward the page foot */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(123,63,228,0.075) 1px, transparent 1px), linear-gradient(to bottom, rgba(123,63,228,0.075) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
          maskImage:
            'radial-gradient(135% 100% at 50% 0%, rgba(0,0,0,0.95), transparent 82%)',
          WebkitMaskImage:
            'radial-gradient(135% 100% at 50% 0%, rgba(0,0,0,0.95), transparent 82%)',
        }}
      />

      {/* richer purple / soft-magenta blooms — bigger + brighter, slow drift */}
      <div
        className="ambient-bloom absolute -left-[10%] top-[5%] h-[560px] w-[560px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(123,63,228,0.14), transparent 70%)' }}
      />
      <div
        className="ambient-bloom-slow absolute -right-[12%] top-[30%] h-[620px] w-[620px] rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(168,72,206,0.12), transparent 70%)' }}
      />
      <div
        className="ambient-bloom absolute left-[-6%] top-[60%] h-[520px] w-[520px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(123,63,228,0.11), transparent 70%)' }}
      />
      <div
        className="ambient-bloom-slow absolute right-[4%] top-[84%] h-[480px] w-[480px] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(190,92,200,0.09), transparent 70%)' }}
      />

      {/* cursor-tracked grid-lens (desktop). Sits over the grid → brightens it. */}
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full opacity-0"
        style={{
          background:
            'radial-gradient(circle, rgba(123,63,228,0.13) 0%, rgba(168,72,206,0.06) 38%, transparent 66%)',
          willChange: 'transform',
          transition: 'opacity 0.6s ease',
        }}
      />
    </div>
  );
}
