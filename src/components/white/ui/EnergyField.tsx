import { useEffect, useRef } from 'react';

/**
 * EnergyField — full-bleed interactive purple energy field for the hero.
 *
 * - ~36 luminous orbs that drift slowly, with soft pulse on radius
 * - Cursor gently attracts nearby orbs (no jarring jumps)
 * - Connecting lines drawn between orbs within `LINK_DIST`
 * - Pure canvas + requestAnimationFrame, capped at the device pixel ratio
 * - Respects prefers-reduced-motion (renders a single static frame)
 */

type Orb = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseR: number;
  pulseSpeed: number;
  pulsePhase: number;
};

const ORB_COUNT = 36;
const LINK_DIST = 150;
const ATTRACT_RADIUS = 220;

export default function EnergyField({
  className = '',
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const rafRef = useRef<number>(0);
  const sizeRef = useRef<{ w: number; h: number; dpr: number }>({
    w: 0,
    h: 0,
    dpr: 1,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? window.innerWidth;
      const h = parent?.clientHeight ?? window.innerHeight;
      sizeRef.current = { w, h, dpr };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      const { w, h } = sizeRef.current;
      const orbs: Orb[] = [];
      for (let i = 0; i < ORB_COUNT; i++) {
        orbs.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          baseR: 1.4 + Math.random() * 2.6,
          pulseSpeed: 0.4 + Math.random() * 0.8,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
      orbsRef.current = orbs;
    };

    // Use window-level mousemove so the canvas can stay pointer-events: none
    // and never block clicks on overlaid CTAs.
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      mouseRef.current = { x, y, active: inside };
    };
    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    let last = performance.now();

    const draw = (now: number) => {
      const { w, h } = sizeRef.current;
      const dt = Math.min(48, now - last) / 16.6667; // normalized to ~60fps frame
      last = now;
      const orbs = orbsRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, w, h);

      // Update positions + draw connections
      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i];

        if (!reduced) {
          // Mouse attraction (very gentle)
          if (mouse.active) {
            const mdx = mouse.x - o.x;
            const mdy = mouse.y - o.y;
            const md2 = mdx * mdx + mdy * mdy;
            const r2 = ATTRACT_RADIUS * ATTRACT_RADIUS;
            if (md2 < r2 && md2 > 1) {
              const md = Math.sqrt(md2);
              const f = (1 - md / ATTRACT_RADIUS) * 0.12;
              o.vx += (mdx / md) * f * dt;
              o.vy += (mdy / md) * f * dt;
            }
          }

          // Drift + soft damping so velocity doesn't accumulate forever
          o.x += o.vx * dt;
          o.y += o.vy * dt;
          o.vx *= 0.985;
          o.vy *= 0.985;

          // Wrap-around bounds — keeps the field continuous
          if (o.x < -20) o.x = w + 20;
          if (o.x > w + 20) o.x = -20;
          if (o.y < -20) o.y = h + 20;
          if (o.y > h + 20) o.y = -20;

          o.pulsePhase += o.pulseSpeed * 0.018 * dt;
        }
      }

      // Draw connecting lines
      ctx.lineWidth = 1;
      for (let i = 0; i < orbs.length; i++) {
        const a = orbs[i];
        for (let j = i + 1; j < orbs.length; j++) {
          const b = orbs[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / LINK_DIST) * 0.18;
            ctx.strokeStyle = `rgba(123,63,228,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw orbs (radial gradient halos)
      for (let i = 0; i < orbs.length; i++) {
        const o = orbs[i];
        const pulse = 1 + Math.sin(o.pulsePhase) * 0.18;
        const r = o.baseR * pulse;
        const haloR = r * 7;

        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, haloR);
        grad.addColorStop(0, 'rgba(167,123,255,0.6)');
        grad.addColorStop(0.35, 'rgba(123,63,228,0.18)');
        grad.addColorStop(1, 'rgba(123,63,228,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x, o.y, haloR, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.beginPath();
        ctx.arc(o.x, o.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    resize();
    seed();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseLeave);

    if (reduced) {
      // Single static frame — no animation
      draw(performance.now());
    } else {
      rafRef.current = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    />
  );
}
