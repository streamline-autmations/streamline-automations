import { useEffect, useRef } from 'react';
import usePrefersReducedMotion from '../../../hooks/usePrefersReducedMotion';

// Particle count scaled by viewport — mobile gets fewer for perf
const DESKTOP_COUNT = 260;
const MOBILE_COUNT = 140;

// How fast trails fade per frame (lower = longer trails)
const FADE = 0.013;
const SPEED = 0.92;
const LINE_W = 0.45;
const LINE_ALPHA = 0.17;
const SCALE = 0.0019;
const TIME_RATE = 0.00022;

// Two tones of brand purple for slight colour variation
const COLORS = ['123,63,228', '168,72,206', '107,48,200'];

/** Smooth vector field angle from overlapping sine waves (no external noise dep) */
function fieldAngle(x: number, y: number, t: number): number {
  return (
    Math.sin(x * SCALE + t * 1.15) * Math.cos(y * SCALE * 0.85 + t * 0.9) +
    Math.cos(x * SCALE * 0.55 + y * SCALE * 0.45 + t * 0.65) * 0.55
  ) * Math.PI * 2.5;
}

type Particle = {
  x: number; y: number;
  px: number; py: number;
  life: number; maxLife: number;
  col: string;
};

function spawn(W: number, H: number): Particle {
  const x = Math.random() * W;
  const y = Math.random() * H;
  return {
    x, y, px: x, py: y,
    life: 0,
    maxLife: 320 + Math.random() * 420,
    col: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

/**
 * FlowField — canvas-based Perlin-style flow lines.
 * Thin purple hairlines follow a smooth noise vector field, leaving slow-fading
 * ribbon trails. Creates the "flowing silk" depth that the hero needs.
 *
 * Canvas is opaque white so the fade accumulates correctly; element opacity
 * lets the grain layer bleed through subtly on top.
 *
 * No external dependencies. Skipped entirely on prefers-reduced-motion.
 */
export default function FlowField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let raf = 0;
    let t = 0;
    let lastTs = 0;
    const particles: Particle[] = [];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = canvas.width = r.width;
      H = canvas.height = r.height;
      // Fill white so trail fades work correctly from the first frame
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, W, H);
    };

    const init = () => {
      particles.length = 0;
      const count = window.innerWidth >= 768 ? DESKTOP_COUNT : MOBILE_COUNT;
      for (let i = 0; i < count; i++) {
        const p = spawn(W, H);
        p.life = Math.random() * p.maxLife; // stagger so they don't all reset together
        particles.push(p);
      }
    };

    const frame = (ts: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(ts - lastTs, 40);
      lastTs = ts;
      if (dt < 1) return;
      t += TIME_RATE * dt;

      // Partial fade each frame → older lines ghost out, newer lines pop
      ctx.fillStyle = `rgba(255,255,255,${FADE})`;
      ctx.fillRect(0, 0, W, H);
      ctx.lineWidth = LINE_W;

      for (const p of particles) {
        const a = fieldAngle(p.x, p.y, t);
        p.px = p.x;
        p.py = p.y;
        p.x += Math.cos(a) * SPEED;
        p.y += Math.sin(a) * SPEED;
        p.life++;

        // Fade-in at birth, hold, fade-out near death
        const ratio = p.life / p.maxLife;
        const fade =
          ratio < 0.08 ? ratio / 0.08 :
          ratio > 0.88 ? (1 - ratio) / 0.12 :
          1;

        ctx.strokeStyle = `rgba(${p.col},${(LINE_ALPHA * fade).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        // Recycle out-of-bounds or expired particles
        if (
          p.life >= p.maxLife ||
          p.x < -4 || p.x > W + 4 ||
          p.y < -4 || p.y > H + 4
        ) {
          const n = spawn(W, H);
          p.x = n.x; p.y = n.y; p.px = n.x; p.py = n.y;
          p.life = 0; p.maxLife = n.maxLife; p.col = n.col;
        }
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    init();
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity: 0.82 }}
    />
  );
}
