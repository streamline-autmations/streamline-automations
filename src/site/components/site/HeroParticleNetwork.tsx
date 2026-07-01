import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FillButton from '../craft/FillButton';
import { EASE_ARR } from '../../lib/motion';
import { PRIMARY_CTA, SECONDARY_CTA } from '../../data/site';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const ACCENT_RGB = '123, 63, 228';
const PARTICLE_DESKTOP = 80;
const PARTICLE_MOBILE = 35;
const CONN_DIST = 140;
const REPEL_DIST = 120;
const CURSOR_CONN_DIST = 160;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
}

function mkParticles(n: number, w: number, h: number): Particle[] {
  return Array.from({ length: n }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: 2 + Math.random(),
    alpha: 0.5 + Math.random() * 0.3,
  }));
}

/** Plain canvas particle network. Mouse tracking via window listener so the
 *  canvas can be pointer-events:none without blocking CTAs below. */
function useParticleCanvas(reduced: boolean) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let prevW = 0;
    let prevH = 0;
    let isTouch = false;
    let cursor: { x: number; y: number } | null = null;
    let raf = 0;
    const frameTimes: number[] = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = canvas!.offsetWidth;
      const cssH = canvas!.offsetHeight;
      canvas!.width = cssW * dpr;
      canvas!.height = cssH * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      isTouch = cssW <= 768 || !window.matchMedia('(pointer: fine)').matches;
      if (isTouch) cursor = null;

      const target = cssW <= 768 ? PARTICLE_MOBILE : PARTICLE_DESKTOP;

      if (particles.length === 0) {
        particles = mkParticles(target, cssW, cssH);
      } else {
        if (prevW > 0 && prevH > 0) {
          for (const p of particles) {
            p.x = (p.x / prevW) * cssW;
            p.y = (p.y / prevH) * cssH;
          }
        }
        if (particles.length < target) {
          particles.push(...mkParticles(target - particles.length, cssW, cssH));
        } else if (particles.length > target) {
          particles = particles.slice(0, target);
        }
      }
      prevW = cssW;
      prevH = cssH;
    }

    resize();

    // ── Reduced-motion: static dots only ──────────────────────────────────
    if (reduced) {
      const drawStatic = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const W = canvas!.width / dpr;
        const H = canvas!.height / dpr;
        ctx!.clearRect(0, 0, W, H);
        for (const p of particles) {
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${ACCENT_RGB}, ${p.alpha})`;
          ctx!.fill();
        }
      };
      drawStatic();
      let t: ReturnType<typeof setTimeout>;
      const onResize = () => { clearTimeout(t); t = setTimeout(() => { resize(); drawStatic(); }, 160); };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    // ── Animated loop ─────────────────────────────────────────────────────
    let lastTs = 0;

    function animate(ts: number) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = canvas!.width / dpr;
      const H = canvas!.height / dpr;

      if (lastTs > 0) {
        frameTimes.push(ts - lastTs);
        if (frameTimes.length > 30) {
          frameTimes.shift();
          const avg = frameTimes.reduce((a, b) => a + b, 0) / 30;
          if (avg > 20 && particles.length > 16) {
            particles = particles.slice(0, Math.floor(particles.length / 2));
            frameTimes.length = 0;
          }
        }
      }
      lastTs = ts;

      ctx!.clearRect(0, 0, W, H);

      const c = isTouch ? null : cursor;

      // Update
      for (const p of particles) {
        p.vx += (Math.random() - 0.5) * 0.022;
        p.vy += (Math.random() - 0.5) * 0.022;

        if (c) {
          const dx = p.x - c.x;
          const dy = p.y - c.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < REPEL_DIST && d > 0) {
            const f = (1 - d / REPEL_DIST) * 1.6;
            p.vx += (dx / d) * f * 0.07;
            p.vy += (dy / d) * f * 0.07;
          }
        }

        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const cap = 0.55;
        if (spd > cap) { p.vx = (p.vx / spd) * cap; p.vy = (p.vy / spd) * cap; }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx); }
        if (p.x > W) { p.x = W; p.vx = -Math.abs(p.vx); }
        if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy); }
        if (p.y > H) { p.y = H; p.vy = -Math.abs(p.vy); }
      }

      // Particle–particle connections
      ctx!.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONN_DIST) {
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(${ACCENT_RGB}, ${(1 - d / CONN_DIST) * 0.35})`;
            ctx!.stroke();
          }
        }
      }

      // Cursor connections
      if (c) {
        for (const p of particles) {
          const dx = p.x - c.x, dy = p.y - c.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CURSOR_CONN_DIST) {
            ctx!.beginPath();
            ctx!.moveTo(c.x, c.y);
            ctx!.lineTo(p.x, p.y);
            ctx!.strokeStyle = `rgba(${ACCENT_RGB}, ${(1 - d / CURSOR_CONN_DIST) * 0.5})`;
            ctx!.stroke();
          }
        }
      }

      // Dots
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${ACCENT_RGB}, ${p.alpha})`;
        ctx!.fill();
      }

      raf = requestAnimationFrame(animate);
    }

    raf = requestAnimationFrame(animate);

    // Mouse tracked at window level — canvas can stay pointer-events:none
    const onMouseMove = (e: MouseEvent) => {
      if (isTouch) return;
      const rect = canvas!.getBoundingClientRect();
      cursor = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = (e: MouseEvent) => {
      // Only clear if leaving the section (not entering a child element)
      const related = e.relatedTarget as Node | null;
      if (!canvas!.parentElement?.contains(related)) cursor = null;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    canvas.parentElement?.addEventListener('mouseleave', onMouseLeave);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 160); };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
    };
  }, [reduced]);

  return canvasRef;
}

export default function HeroParticleNetwork() {
  const reduced = usePrefersReducedMotion();
  const canvasRef = useParticleCanvas(reduced);

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-white px-6">
      {/* Canvas — background layer, does not block pointer events */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        style={{ pointerEvents: 'none' }}
      />

      {/* Copy — sits over canvas */}
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center pt-28 pb-16 text-center md:pt-36">
        {/* White radial glow — keeps text legible over particle field */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[-30%] inset-y-[-60%]"
          style={{
            background:
              'radial-gradient(ellipse 75% 85% at 50% 50%, rgba(255,255,255,0.9) 25%, rgba(255,255,255,0) 100%)',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE_ARR }}
          className="relative mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-site-text-muted"
        >
          Web Design + Automation · South Africa
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_ARR, delay: 0.1 }}
          className="relative max-w-[22ch] text-[clamp(36px,5.5vw,72px)] font-semibold leading-[1.02] tracking-[-0.03em] text-site-ink"
        >
          Websites and systems that run the{' '}
          <span className="font-instrument italic text-site-accent">business</span>{' '}
          while you sleep.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE_ARR, delay: 0.22 }}
          className="relative mt-6 max-w-[52ch] text-[clamp(15px,1.8vw,17px)] leading-[1.65] text-site-text-body"
        >
          Web design and automation for South African businesses. I build the website, the systems
          behind it, and the automations that do the busywork — so you don't have to.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.35 }}
          className="relative mt-9 flex flex-wrap items-center justify-center gap-6"
        >
          <FillButton to={PRIMARY_CTA.href} variant="solid-accent">
            {PRIMARY_CTA.label}
          </FillButton>
          <Link
            to={SECONDARY_CTA.href}
            data-cursor="link"
            className="inline-flex min-h-[44px] items-center text-[15px] font-medium text-site-ink underline-offset-4 outline-none hover:underline focus-visible:text-site-accent focus-visible:underline"
          >
            {SECONDARY_CTA.label} →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
