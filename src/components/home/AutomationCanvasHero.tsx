import { useEffect, useRef } from 'react';

const NODES = [
  { nx: 0.72, ny: 0.22, label: 'Website',   color: '#774CFC' },
  { nx: 0.91, ny: 0.38, label: 'WhatsApp',  color: '#25D366' },
  { nx: 0.88, ny: 0.62, label: 'CRM',       color: '#F26A3D' },
  { nx: 0.70, ny: 0.78, label: 'Booking',   color: '#774CFC' },
  { nx: 0.54, ny: 0.52, label: 'Email',     color: '#F26A3D' },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 4],
  [4, 3],
  [0, 2],
  [4, 1],
];

interface Packet {
  edgeIdx: number;
  t: number;
  speed: number;
}

function hexAlpha(hex: string, alpha: number): string {
  const a = Math.round(alpha * 255).toString(16).padStart(2, '0');
  return `${hex}${a}`;
}

export default function AutomationCanvasHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;
    let lastTime = 0;

    // One packet per edge, staggered start positions
    const packets: Packet[] = EDGES.map((_, i) => ({
      edgeIdx: i,
      t: (i / EDGES.length),
      speed: 0.00045 + Math.random() * 0.0003,
    }));

    // Node pulse phases
    const pulsePhasesRef = NODES.map((_, i) => (i / NODES.length) * Math.PI * 2);

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (time: number) => {
      const dt = Math.min(time - lastTime, 33);
      lastTime = time;

      const W = canvas.width;
      const H = canvas.height;

      if (W === 0 || H === 0) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, W, H);

      // On narrow screens (mobile), shift nodes leftward and reduce opacity
      const isMobile = W < 700;
      const xShift = isMobile ? -0.15 : 0;

      // Compute pixel positions
      const nodePx = NODES.map(n => ({
        x: (n.nx + xShift) * W,
        y: n.ny * H,
        color: n.color,
        label: n.label,
      }));

      const t = time / 1000; // seconds

      // --- Draw edges ---
      EDGES.forEach(([fromIdx, toIdx]) => {
        const a = nodePx[fromIdx];
        const b = nodePx[toIdx];

        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0, hexAlpha(NODES[fromIdx].color, isMobile ? 0.06 : 0.12));
        grad.addColorStop(0.5, hexAlpha('#ffffff', isMobile ? 0.03 : 0.06));
        grad.addColorStop(1, hexAlpha(NODES[toIdx].color, isMobile ? 0.06 : 0.12));

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // --- Draw packets ---
      packets.forEach((pkt) => {
        pkt.t = (pkt.t + pkt.speed * dt) % 1;

        const [fromIdx, toIdx] = EDGES[pkt.edgeIdx];
        const a = nodePx[fromIdx];
        const b = nodePx[toIdx];

        const px = a.x + (b.x - a.x) * pkt.t;
        const py = a.y + (b.y - a.y) * pkt.t;
        const color = NODES[fromIdx].color;
        const opacity = isMobile ? 0.5 : 0.9;

        // Soft glow behind packet
        const glow = ctx.createRadialGradient(px, py, 0, px, py, 8);
        glow.addColorStop(0, hexAlpha(color, opacity * 0.6));
        glow.addColorStop(1, hexAlpha(color, 0));
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = hexAlpha(color, opacity);
        ctx.fill();
      });

      // --- Draw nodes ---
      NODES.forEach((node, i) => {
        const n = nodePx[i];
        const pulse = Math.sin(t * 1.5 + pulsePhasesRef[i]) * 0.5 + 0.5; // 0..1

        // Large ambient glow
        const glowRadius = 28 + pulse * 8;
        const outerGlow = ctx.createRadialGradient(n.x, n.y, 2, n.x, n.y, glowRadius);
        outerGlow.addColorStop(0, hexAlpha(node.color, isMobile ? 0.12 : 0.22 + pulse * 0.1));
        outerGlow.addColorStop(1, hexAlpha(node.color, 0));
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = outerGlow;
        ctx.fill();

        // Ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, 9, 0, Math.PI * 2);
        ctx.strokeStyle = hexAlpha(node.color, isMobile ? 0.3 : 0.5 + pulse * 0.2);
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner fill
        ctx.beginPath();
        ctx.arc(n.x, n.y, 9, 0, Math.PI * 2);
        ctx.fillStyle = hexAlpha(node.color, 0.15);
        ctx.fill();

        // Center dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = hexAlpha(node.color, isMobile ? 0.4 : 0.8);
        ctx.fill();

        // Label
        ctx.font = '500 10px ui-monospace, monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = `rgba(255,255,255,${isMobile ? 0.2 : 0.45})`;
        ctx.fillText(node.label.toUpperCase(), n.x, n.y + 26);
      });

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
