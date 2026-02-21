import { useEffect, useRef, type RefObject } from 'react';

type Accent = 'purple' | 'orange';

type Activation = {
  x: number;
  y: number;
  start: number;
  life: number;
  strength: number;
  color: Accent;
};

const PURPLE: [number, number, number] = [139, 92, 246];
const ORANGE: [number, number, number] = [240, 85, 35];
const WHITE: [number, number, number] = [255, 255, 255];

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const smooth01 = (t: number) => t * t * (3 - 2 * t);

export default function SectionDotGrid({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement>;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({
    w: 0,
    h: 0,
    dpr: 1,
    activations: [] as Activation[],
    lastPointer: { x: 0, y: 0, has: false },
    lastMoveAdd: 0,
    lastScrollAdd: 0,
    inView: true,
    pulseUntil: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const canHover = window.matchMedia?.('(hover: hover) and (pointer: fine)');

    let reduced = !!prefersReduced?.matches;
    let interactive = !!canHover?.matches && !reduced;

    const draw = (now: number) => {
      const s = stateRef.current;
      const w = s.w;
      const h = s.h;
      if (w <= 0 || h <= 0) return;

      for (let i = s.activations.length - 1; i >= 0; i--) {
        if (now - s.activations[i].start > s.activations[i].life) s.activations.splice(i, 1);
      }

      ctx.clearRect(0, 0, w, h);

      const gap = Math.max(20, Math.min(44, Math.round(w / 44)));
      const baseR = w < 480 ? 0.85 : 0.95;
      const maxGrow = w < 480 ? 1.9 : 1.45;
      const influenceRadius = w < 480 ? 140 : 120;
      const invTwoSigma2 = 1 / (2 * influenceRadius * influenceRadius);

      const hoverRadius = gap * (w < 480 ? 3.0 : 3.2);
      const hoverGridRadius = 3;
      const hoverGrow = w < 480 ? 1.35 : 1.12;
      const hoverAlphaAdd = 0.12;

      const cursorX = s.lastPointer.has ? s.lastPointer.x : -99999;
      const cursorY = s.lastPointer.has ? s.lastPointer.y : -99999;
      const cix = s.lastPointer.has ? Math.round(cursorX / gap) : 0;
      const ciy = s.lastPointer.has ? Math.round(cursorY / gap) : 0;

      for (let y = -gap; y <= h + gap; y += gap) {
        for (let x = -gap; x <= w + gap; x += gap) {
          const px = x;
          const py = y;

          let intensity = 0;
          let pW = 0;
          let aW = 0;
          for (let i = 0; i < s.activations.length; i++) {
            const a = s.activations[i];
            const age = now - a.start;
            const t = 1 - age / a.life;
            const dx = px - a.x;
            const dy = py - a.y;
            const d2 = dx * dx + dy * dy;
            const falloff = Math.exp(-d2 * invTwoSigma2);
            const sV = a.strength * t * falloff;
            intensity += sV;
            if (a.color === 'purple') pW += sV;
            else aW += sV;
          }

          let hover = 0;
          if (interactive && s.lastPointer.has) {
            const ix = Math.round(px / gap);
            const iy = Math.round(py / gap);
            const dxI = Math.abs(ix - cix);
            const dyI = Math.abs(iy - ciy);
            if (dxI <= hoverGridRadius && dyI <= hoverGridRadius) {
              const dx = px - cursorX;
              const dy = py - cursorY;
              const d = Math.hypot(dx, dy);
              const t = clamp(1 - d / hoverRadius, 0, 1);
              hover = smooth01(t);
            }
          }

          const iC = clamp(intensity, 0, 0.75);
          const r = baseR + iC * maxGrow + hover * hoverGrow;
          const alphaBase = interactive ? 0.11 : 0.10;
          const alpha = clamp(alphaBase + iC * 0.26 + hover * hoverAlphaAdd, 0.06, 0.34);

          let cr = WHITE[0];
          let cg = WHITE[1];
          let cb = WHITE[2];
          const wSum = pW + aW;
          if (wSum > 0.001) {
            const t = clamp(aW / wSum, 0, 1);
            cr = Math.round(PURPLE[0] * (1 - t) + ORANGE[0] * t);
            cg = Math.round(PURPLE[1] * (1 - t) + ORANGE[1] * t);
            cb = Math.round(PURPLE[2] * (1 - t) + ORANGE[2] * t);
          }

          ctx.beginPath();
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fill();

          const glowBasis = Math.max(iC * 0.7, hover * 0.45);
          if (glowBasis > 0.18) {
            const glowA = clamp((glowBasis - 0.18) * 0.08, 0.004, 0.03);
            ctx.beginPath();
            ctx.fillStyle = `rgba(${cr},${cg},${cb},${glowA})`;
            ctx.arc(px, py, r * 1.65, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    const resize = () => {
      const s = stateRef.current;
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(2, window.devicePixelRatio || 1);

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      s.w = w;
      s.h = h;
      s.dpr = dpr;
      draw(performance.now());
    };

    const toLocal = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const addActivation = (x: number, y: number, strength: number, life: number, color: Accent) => {
      const s = stateRef.current;
      const now = performance.now();
      s.activations.push({ x, y, start: now, life, strength, color });
      if (s.activations.length > 60) s.activations.splice(0, s.activations.length - 60);
      s.pulseUntil = Math.max(s.pulseUntil, now + Math.min(life, 800));
      if ((interactive && s.inView) || !interactive) ensureLoop();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!interactive) return;
      const s = stateRef.current;
      const p = toLocal(e.clientX, e.clientY);
      s.lastPointer = { x: p.x, y: p.y, has: true };
      const now = performance.now();
      if (now - s.lastMoveAdd < 26) return;
      s.lastMoveAdd = now;
      addActivation(p.x, p.y, 0.16, 900, 'purple');
    };

    const onPointerDown = (e: PointerEvent) => {
      const s = stateRef.current;
      const p = toLocal(e.clientX, e.clientY);
      s.lastPointer = { x: p.x, y: p.y, has: true };
      const color: Accent = Math.random() < 0.22 ? 'orange' : 'purple';
      addActivation(p.x, p.y, 0.42, 950, color);
    };

    const onScroll = () => {
      const s = stateRef.current;
      if (!interactive || !s.inView) return;
      const now = performance.now();
      if (now - s.lastScrollAdd < 160) return;
      s.lastScrollAdd = now;
      const x = s.lastPointer.has ? s.lastPointer.x : s.w * 0.5;
      const y = s.lastPointer.has ? s.lastPointer.y : s.h * 0.42;
      addActivation(x, y, 0.13, 900, 'purple');
    };

    const onReduced = () => {
      reduced = !!prefersReduced?.matches;
      interactive = !!canHover?.matches && !reduced;
      stateRef.current.pulseUntil = 0;
      draw(performance.now());
      if (interactive && stateRef.current.inView) ensureLoop();
    };
    prefersReduced?.addEventListener?.('change', onReduced);

    const onHoverCap = () => {
      interactive = !!canHover?.matches && !reduced;
      stateRef.current.pulseUntil = 0;
      draw(performance.now());
      if (interactive && stateRef.current.inView) ensureLoop();
    };
    canHover?.addEventListener?.('change', onHoverCap);

    const ro = new ResizeObserver(() => resize());
    ro.observe(container);

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        stateRef.current.inView = !!e?.isIntersecting;
        if (stateRef.current.inView && interactive) ensureLoop();
      },
      { threshold: 0.02 }
    );
    io.observe(container);

    container.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    let raf = 0;
    let looping = false;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      draw(t);
      const s = stateRef.current;
      const keepGoing = interactive ? s.inView : t < s.pulseUntil;
      if (!keepGoing) {
        cancelAnimationFrame(raf);
        looping = false;
      }
    };

    const ensureLoop = () => {
      if (looping) return;
      looping = true;
      raf = requestAnimationFrame(loop);
    };

    resize();
    draw(performance.now());
    if (interactive) ensureLoop();

    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(raf);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('scroll', onScroll);
      prefersReduced?.removeEventListener?.('change', onReduced);
      canHover?.removeEventListener?.('change', onHoverCap);
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
