/**
 * HeroNetworkScroll — Living particle-network hero with cascading pulses.
 *
 * Canvas renders a neural-style node graph on ink (#0A0A0F):
 *  • Nodes drift, breathe (sine-wave radius), and flash when hit by a pulse.
 *  • Pulses travel between connected nodes; on arrival they spawn 1-2 new
 *    pulses, creating an organic cascade. Occasionally a bright near-white
 *    pulse fires for visual variety.
 *  • Cursor within the section attracts nearby nodes softly.
 *  • GSAP ScrollTrigger pins the hero and zooms the canvas as you scroll,
 *    revealing the headline + CTAs at ~65% progress.
 *
 * pinType:'transform' — root overflow-x:hidden breaks fixed pins.
 */
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ScrollTrigger, useGSAP } from '../../lib/gsap';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

// ── Brand colours (RGB strings for rgba()) ────────────────────────────────────
const ACCENT = '123, 63, 228';   // #7B3FE4
const BRIGHT  = '210, 185, 255'; // near-white lavender for rare pulses

// ── Tuning ────────────────────────────────────────────────────────────────────
const NODE_DESK   = 68;
const NODE_MOB    = 30;
const CONN_DIST   = 165;   // max px between nodes to draw a connection
const MAX_PULSES  = 14;    // concurrent pulses (desktop)
const PULSE_SPEED = 0.55;  // t-units per second (full path = 1/speed seconds)
const ATTRACT_R   = 200;   // cursor attraction radius in px
const SCROLL_VH   = 4;     // viewport-heights the hero is pinned for

// ── Types ─────────────────────────────────────────────────────────────────────
interface Node {
  x: number; y: number;
  vx: number; vy: number;
  baseR: number;  // base radius (px)
  depth: number;  // 0=far/dim → 1=near/bright — affects opacity + size
  phase: number;  // breathe phase offset (radians)
  energy: number; // 0→1 flash when hit by a pulse, decays to 0
}

interface Pulse {
  a: number;      // from-node index
  b: number;      // to-node index
  t: number;      // 0→1 progress
  spd: number;    // t-units per second
  bright: boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function mkNodes(n: number, W: number, H: number): Node[] {
  return Array.from({ length: n }, () => ({
    x:     W * 0.08 + Math.random() * W * 0.84,
    y:     H * 0.08 + Math.random() * H * 0.84,
    vx:    (Math.random() - 0.5) * 0.22,
    vy:    (Math.random() - 0.5) * 0.22,
    baseR: 1.0 + Math.random() * 2.4,
    depth: 0.20 + Math.random() * 0.80,
    phase: Math.random() * Math.PI * 2,
    energy: 0,
  }));
}

// ── Canvas hook ───────────────────────────────────────────────────────────────
function useNetworkCanvas(reduced: boolean) {
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const scrollProgress = useRef(0); // written by GSAP, read by canvas loop

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let nodes:  Node[]  = [];
    let pulses: Pulse[] = [];
    let raf     = 0;
    let W = 0, H = 0;
    let isMob   = false;
    let cursor: { x: number; y: number } | null = null;
    let lastTs  = 0;
    let frameN  = 0;
    const frameMs: number[] = [];
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    // ── Resize ──────────────────────────────────────────────────────────────
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = canvas!.offsetWidth;
      const cssH = canvas!.offsetHeight;
      canvas!.width  = cssW * dpr;
      canvas!.height = cssH * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      W = cssW; H = cssH;
      isMob = cssW < 768;
      const target = isMob ? NODE_MOB : NODE_DESK;
      if (nodes.length === 0) {
        nodes = mkNodes(target, W, H);
      } else {
        // Rescale positions
        for (const n of nodes) {
          n.x = Math.max(20, Math.min(W - 20, n.x));
          n.y = Math.max(20, Math.min(H - 20, n.y));
        }
      }
    }
    resize();

    // ── Pulse helpers ────────────────────────────────────────────────────────
    function getNeighbours(idx: number, exclude = -1): number[] {
      const out: number[] = [];
      const n = nodes[idx];
      for (let i = 0; i < nodes.length; i++) {
        if (i === idx || i === exclude) continue;
        const dx = n.x - nodes[i].x, dy = n.y - nodes[i].y;
        if (dx * dx + dy * dy < CONN_DIST * CONN_DIST) out.push(i);
      }
      return out;
    }

    function spawnPulse(a: number, b?: number, bright = false) {
      if (pulses.length >= (isMob ? 6 : MAX_PULSES)) return;
      const bIdx = b ?? (() => {
        const nb = getNeighbours(a);
        return nb.length ? nb[Math.floor(Math.random() * nb.length)] : -1;
      })();
      if (bIdx < 0) return;
      const exists = pulses.some(p => (p.a === a && p.b === bIdx) || (p.a === bIdx && p.b === a));
      if (exists) return;
      pulses.push({
        a, b: bIdx, t: 0,
        spd: PULSE_SPEED * (0.65 + Math.random() * 0.75),
        bright: bright || Math.random() < 0.10,
      });
    }

    // Seed initial pulses staggered so they don't all appear at once
    for (let i = 0; i < 8; i++) {
      const tid = setTimeout(() => {
        if (nodes.length) spawnPulse(Math.floor(Math.random() * nodes.length));
      }, i * 280);
      timeouts.push(tid);
    }

    // ── Reduced-motion: static snapshot ─────────────────────────────────────
    if (reduced) {
      const drawStatic = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx!.clearRect(0, 0, W, H);
        ctx!.lineWidth = 0.5;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
            const d2 = dx*dx + dy*dy;
            if (d2 < CONN_DIST * CONN_DIST) {
              const d = Math.sqrt(d2);
              ctx!.beginPath();
              ctx!.moveTo(nodes[i].x, nodes[i].y);
              ctx!.lineTo(nodes[j].x, nodes[j].y);
              ctx!.strokeStyle = `rgba(${ACCENT},${(1 - d / CONN_DIST) * 0.18})`;
              ctx!.stroke();
            }
          }
          ctx!.beginPath();
          ctx!.arc(nodes[i].x, nodes[i].y, nodes[i].baseR * nodes[i].depth, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${ACCENT},${nodes[i].depth * 0.65})`;
          ctx!.fill();
        }
      };
      drawStatic();
      const onR = () => { resize(); drawStatic(); };
      window.addEventListener('resize', onR);
      return () => { window.removeEventListener('resize', onR); timeouts.forEach(clearTimeout); };
    }

    // ── Animated loop ────────────────────────────────────────────────────────
    function draw(ts: number) {
      raf = requestAnimationFrame(draw);
      // Delta-time in seconds (cap at 100ms to survive tab-switching)
      const dt = lastTs > 0 ? Math.min((ts - lastTs) * 0.001, 0.10) : 0.0167;
      lastTs = ts;
      frameN++;

      // Auto-throttle: if avg fps < 28, shed nodes
      frameMs.push(ts);
      if (frameMs.length > 60) {
        frameMs.shift();
        const fps = 59000 / (frameMs[59] - frameMs[0]);
        if (fps < 28 && nodes.length > 18) {
          nodes = nodes.slice(0, Math.floor(nodes.length * 0.72));
          frameMs.length = 0;
        }
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, W, H);

      const now = ts * 0.001; // seconds (for breathing)

      // ── Update nodes ───────────────────────────────────────────────────────
      for (const n of nodes) {
        // Soft cursor attraction
        if (cursor && !isMob) {
          const dx = cursor.x - n.x, dy = cursor.y - n.y;
          const d2 = dx*dx + dy*dy;
          if (d2 < ATTRACT_R * ATTRACT_R && d2 > 1) {
            const d = Math.sqrt(d2);
            const f = (1 - d / ATTRACT_R) * 0.0025;
            n.vx += dx * f;
            n.vy += dy * f;
          }
        }

        // Random micro-nudge
        n.vx += (Math.random() - 0.5) * 0.012;
        n.vy += (Math.random() - 0.5) * 0.012;

        // Speed cap (very slow drift is the vibe)
        const spd = Math.sqrt(n.vx*n.vx + n.vy*n.vy);
        if (spd > 0.42) { n.vx = n.vx/spd*0.42; n.vy = n.vy/spd*0.42; }

        n.x += n.vx * (dt / 0.0167);
        n.y += n.vy * (dt / 0.0167);

        // Soft bounce at edges
        if (n.x < 18)      { n.x = 18;      n.vx =  Math.abs(n.vx); }
        if (n.x > W - 18)  { n.x = W - 18;  n.vx = -Math.abs(n.vx); }
        if (n.y < 18)      { n.y = 18;      n.vy =  Math.abs(n.vy); }
        if (n.y > H - 18)  { n.y = H - 18;  n.vy = -Math.abs(n.vy); }

        // Energy decay (~55 frames to fade)
        if (n.energy > 0) n.energy = Math.max(0, n.energy - dt * 1.6);
      }

      // ── Update pulses ──────────────────────────────────────────────────────
      const arrivals: Array<{ to: number; from: number }> = [];

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.spd * dt;
        if (p.t >= 1) {
          arrivals.push({ to: p.b, from: p.a });
          pulses.splice(i, 1);
        }
      }

      // Handle arrivals: flash node + cascade spawn
      for (const { to, from } of arrivals) {
        nodes[to].energy = 1;
        // Cascade: 1 guaranteed + chance of 2nd
        const cascades = Math.random() < 0.55 ? 1 : 2;
        const neighbours = getNeighbours(to, from);
        for (let c = 0; c < Math.min(cascades, neighbours.length); c++) {
          // Pick random neighbour, bias toward unvisited directions
          const pick = neighbours[Math.floor(Math.random() * neighbours.length)];
          spawnPulse(to, pick);
        }
      }

      // Occasional mega pulse (bright, faster) — keeps it feeling alive
      if (frameN % 420 === 0 && nodes.length > 4) {
        const a = Math.floor(Math.random() * nodes.length);
        const nb = getNeighbours(a);
        if (nb.length && pulses.length < MAX_PULSES) {
          pulses.push({
            a, b: nb[Math.floor(Math.random() * nb.length)],
            t: 0, spd: PULSE_SPEED * 1.9, bright: true,
          });
        }
      }

      // Refill if population drops below half
      const pTarget = isMob ? 5 : MAX_PULSES;
      if (pulses.length < pTarget * 0.5 && Math.random() < 0.12) {
        spawnPulse(Math.floor(Math.random() * nodes.length));
      }

      // ── Draw connections ───────────────────────────────────────────────────
      ctx!.lineWidth = 0.65;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx*dx + dy*dy;
          if (d2 < CONN_DIST * CONN_DIST) {
            const d     = Math.sqrt(d2);
            const fade  = 1 - d / CONN_DIST;
            const depth = (a.depth + b.depth) * 0.5;
            const boost = Math.max(a.energy, b.energy) * 0.18;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(${ACCENT},${Math.min(0.50, fade * depth * 0.24 + boost)})`;
            ctx!.stroke();
          }
        }
      }

      // ── Draw pulses ────────────────────────────────────────────────────────
      for (const pulse of pulses) {
        const from = nodes[pulse.a], to = nodes[pulse.b];
        const px = lerp(from.x, to.x, pulse.t);
        const py = lerp(from.y, to.y, pulse.t);
        const col = pulse.bright ? BRIGHT : ACCENT;

        // Fading trail (6 ghost dots)
        for (let i = 1; i <= 6; i++) {
          const trailT = Math.max(0, pulse.t - i * 0.032);
          const tx = lerp(from.x, to.x, trailT);
          const ty = lerp(from.y, to.y, trailT);
          ctx!.beginPath();
          ctx!.arc(tx, ty, Math.max(0.2, 1.6 - i * 0.22), 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${col},${(1 - i / 7) * 0.42})`;
          ctx!.fill();
        }

        // Glowing head
        ctx!.save();
        ctx!.shadowColor = `rgba(${col},0.88)`;
        ctx!.shadowBlur  = pulse.bright ? 24 : 16;
        ctx!.beginPath();
        ctx!.arc(px, py, pulse.bright ? 3.2 : 2.6, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${col},0.96)`;
        ctx!.fill();
        ctx!.restore();
      }

      // ── Draw nodes ─────────────────────────────────────────────────────────
      for (const n of nodes) {
        // Breathing: slow sine on radius, each node on own phase
        const breathe = 1 + Math.sin(now * 1.1 + n.phase) * 0.17;
        const r = Math.max(0.4, n.baseR * n.depth * breathe);

        // Energy glow ring (fades over ~0.6s)
        if (n.energy > 0.05) {
          ctx!.save();
          ctx!.shadowColor = `rgba(${ACCENT},${n.energy * 0.75})`;
          ctx!.shadowBlur  = 22 * n.energy;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, r + n.energy * 4.5, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${ACCENT},${n.energy * 0.38})`;
          ctx!.fill();
          ctx!.restore();
        }

        // Core dot
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${ACCENT},${Math.min(1, n.depth * 0.80 + n.energy * 0.40)})`;
        ctx!.fill();
      }
    }

    raf = requestAnimationFrame(draw);

    // Cursor tracking — at window level so canvas stays pointer-events:none
    const onMouseMove = (e: MouseEvent) => {
      if (isMob) return;
      const rect = canvas!.getBoundingClientRect();
      cursor = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { cursor = null; };
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 150); };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      timeouts.forEach(clearTimeout);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
    };
  }, [reduced]);

  return { canvasRef, scrollProgress };
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function HeroNetworkScroll() {
  const reduced = usePrefersReducedMotion();
  const { canvasRef, scrollProgress } = useNetworkCanvas(reduced);
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced) {
        if (textRef.current) {
          textRef.current.style.opacity = '1';
          textRef.current.style.transform = 'none';
        }
        return;
      }

      const REVEAL_AT    = 0.62; // scroll progress where text starts fading in
      const REVEAL_RANGE = 0.26;

      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: 'top top',
        end: `+=${SCROLL_VH * 100}%`,
        pin: true,
        pinType: 'transform',
        anticipatePin: 1,
        scrub: 0.5,
        onUpdate(self) {
          scrollProgress.current = self.progress;

          // Zoom the canvas from center — feels like flying into the network
          if (canvasRef.current) {
            const z = 1 + self.progress * 0.16;
            canvasRef.current.style.transform = `scale(${z})`;
          }

          // Text reveal
          if (textRef.current) {
            const t = Math.min(1, Math.max(0, (self.progress - REVEAL_AT) / REVEAL_RANGE));
            textRef.current.style.opacity  = String(t);
            textRef.current.style.transform = `translateY(${(1 - t) * 30}px)`;
          }
        },
      });
    },
    { scope: wrapRef, dependencies: [reduced] },
  );

  return (
    <div
      ref={wrapRef}
      data-header-dark=""
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#0A0A0F]"
    >
      {/* Live canvas network */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ pointerEvents: 'none', transformOrigin: 'center center' }}
        className="absolute inset-0 h-full w-full"
      />

      {/* Ambient purple glow at center — adds warmth + depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 60% at 50% 48%, rgba(123,63,228,0.06) 0%, transparent 68%)',
        }}
      />

      {/* Bottom gradient — text readability */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%]"
        style={{
          background:
            'linear-gradient(to top, rgba(10,10,15,0.97) 0%, rgba(10,10,15,0.52) 42%, transparent 100%)',
        }}
      />

      {/* Hero copy — fades in at the end of the scroll */}
      <div
        ref={textRef}
        className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-20 text-center"
        style={{
          opacity:   reduced ? 1 : 0,
          transform: reduced ? 'none' : 'translateY(30px)',
          willChange: 'opacity, transform',
        }}
      >
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9E9EA8]">
          Web design &amp; automation · South Africa
        </p>

        <h1 className="max-w-[14ch] text-[clamp(36px,5.5vw,76px)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#F5F5F7]">
          Built to work,{' '}
          <em className="font-instrument not-italic text-[#7B3FE4]">not just</em>{' '}
          look good.
        </h1>

        <p className="mt-6 max-w-[36ch] text-[17px] leading-[1.65] text-[#9E9EA8]">
          I build websites and automation systems for South African businesses.
          Fast. Clean. Connected.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/contact"
            className="inline-flex min-h-[48px] items-center rounded-full bg-[#7B3FE4] px-8 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-[#6930D0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B3FE4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F]"
          >
            Book a Free Call
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex min-h-[48px] items-center rounded-full border border-white/20 px-8 text-[15px] font-semibold text-[#F5F5F7] transition-colors duration-300 hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            See the work
          </Link>
        </div>
      </div>
    </div>
  );
}
