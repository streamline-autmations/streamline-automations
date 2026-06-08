import { useEffect, useRef } from 'react';
import usePrefersReducedMotion from '../../../../hooks/usePrefersReducedMotion';

/**
 * AmbientDepth — the page-wide depth field that shows through the transparent
 * white sections: a purple graph-paper grid + breathing purple / soft-magenta
 * blooms. Designed to feel alive without breaking the white-minimal calm.
 *
 * Three layers of life (all GPU-cheap, all reduced-motion aware):
 *  1. Blooms slowly drift AND breathe (scale) — CSS, never in lockstep.
 *  2. Scroll-reactive: a --sd (0→1 scroll progress) var gently parallaxes the
 *     bloom field and rotates its hue + lifts saturation, so the background
 *     EVOLVES top-to-bottom instead of reading as one flat field.
 *  3. Desktop cursor grid-lens: a soft glow follows the pointer and brightens
 *     the grid beneath it (transform-only rAF lerp, compositor, 60fps).
 *
 * Purely decorative — pointer-events none, lives behind all content (z-0).
 */
export default function AmbientDepth() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Scroll-progress → --sd (0..1). Drives parallax + hue/saturation evolution.
  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return;

    let raf = 0;
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      root.style.setProperty('--sd', p.toFixed(4));
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, [reduced]);

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
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden [--sd:0]"
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

      {/* Bloom field — parallaxes + shifts hue/saturation with scroll so the
          background evolves down the page instead of reading as one flat field. */}
      <div
        className="absolute inset-0"
        style={{
          transform: 'translate3d(0, calc(var(--sd, 0) * -48px), 0)',
          filter:
            'hue-rotate(calc(var(--sd, 0) * 34deg)) saturate(calc(1 + var(--sd, 0) * 0.18))',
          willChange: 'transform, filter',
        }}
      >
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
      </div>

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
