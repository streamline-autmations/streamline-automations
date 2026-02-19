import { useEffect, useRef } from 'react';

// ─────────────────────────────────────────────
//  CUSTOMISE HERE
// ─────────────────────────────────────────────
const CFG = {
  dotGap:       28,     // px between dot centres
  dotRadius:    1.5,    // dot size at rest
  dotBaseAlpha: 0.18,   // opacity of unlit dots  (0–1)
  dotLitAlpha:  0.85,   // opacity of fully lit dots
  litRadius:    180,    // px — how far glow lights up dots

  blobs: [
    // Mouse-follow blob — purple
    {
      x: 0.5, y: 0.4,
      r: 320,
      color: [109, 40, 217] as [number, number, number],
      alpha: 0.22,
      isMouseBlob: true,
    },
    // Scroll-triggered blob — purple, follows scroll position
    {
      x: 0.5, y: 0.5,
      r: 280,
      color: [139, 92, 246] as [number, number, number],
      alpha: 0.25,
      isScrollBlob: true,
    },
    // Drifting blob — orange, lower-right
    {
      x: 0.85, y: 0.8,
      r: 260,
      color: [249, 115, 22] as [number, number, number],
      alpha: 0.14,
      isMouseBlob: false,
      drift: { ax: 0.00007, ay: 0.00005, phase: 0 },
    },
    // Drifting blob — purple, upper-left
    {
      x: 0.15, y: 0.25,
      r: 280,
      color: [139, 92, 246] as [number, number, number],
      alpha: 0.13,
      isMouseBlob: false,
      drift: { ax: 0.00005, ay: 0.00008, phase: Math.PI },
    },
  ],
} as const;
// ─────────────────────────────────────────────

type Blob = (typeof CFG.blobs)[number] & { isScrollBlob?: boolean };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(x: number) {
  return x * x * (3 - 2 * x);
}

/**
 * InteractiveDotGrid
 *
 * A canvas-based dot grid that:
 *  - Draws uniform white dots on a dark background
 *  - Has purple/orange glowing blobs that drift autonomously
 *  - The purple blob follows the mouse (lerped for smoothness)
 *  - Dots nearest each blob are tinted and brightened
 *
 * Usage:
 *   <InteractiveDotGrid className="fixed inset-0 z-0" />
 *
 * Everything else in your layout should have relative + z-10 or higher.
 */
export default function InteractiveDotGrid({
  className = 'fixed inset-0 z-0',
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    let rafId = 0;
    let t = 0;

    // Mouse state — starts off-screen until first move
    let targetMX = 0, targetMY = 0;
    let curMX = 0, curMY = 0;
    let scrollY = 0;

    // ── Resize ──────────────────────────────────
    function resize() {
      W = canvas!.width  = window.innerWidth;
      H = canvas!.height = window.innerHeight;
      targetMX = curMX = W * 0.5;
      targetMY = curMY = H * 0.4;
    }

    // ── Event handlers ───────────────────────────
    function onMouseMove(e: MouseEvent) {
      targetMX = e.clientX;
      targetMY = e.clientY;
    }
    function onTouchMove(e: TouchEvent) {
      targetMX = e.touches[0].clientX;
      targetMY = e.touches[0].clientY;
    }
    function onScroll() {
      scrollY = window.scrollY;
    }

    window.addEventListener('resize',    resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('scroll',    onScroll,    { passive: true });

    resize();

    // ── Build radial gradient for a blob ─────────
    function blobGradient(
      wx: number, wy: number,
      r: number,
      color: readonly [number, number, number],
      alpha: number,
    ) {
      const g = ctx!.createRadialGradient(wx, wy, 0, wx, wy, r);
      const [R, G, B] = color;
      g.addColorStop(0,   `rgba(${R},${G},${B},${alpha})`);
      g.addColorStop(0.4, `rgba(${R},${G},${B},${alpha * 0.5})`);
      g.addColorStop(1,   `rgba(${R},${G},${B},0)`);
      return g;
    }

    // ── Render loop ──────────────────────────────
    function render() {
      t++;

      curMX = lerp(curMX, targetMX,            0.07);
      curMY = lerp(curMY, targetMY - scrollY,  0.07);

      ctx!.clearRect(0, 0, W, H);

      // Compute world positions for each blob this frame
      const positions = CFG.blobs.map((blob: Blob) => {
        if (blob.isMouseBlob) {
          return { wx: curMX, wy: curMY, blob };
        }
        // Scroll-triggered blob follows scroll position
        if ((blob as any).isScrollBlob) {
          const scrollPercent = Math.min(scrollY / (document.body.scrollHeight - H), 1);
          return { wx: W * 0.5, wy: (scrollPercent * H * 0.8) + (H * 0.2), blob };
        }
        const d  = (blob as any).drift;
        const dx = Math.sin(t * d.ax * 1000 + d.phase) * 0.06;
        const dy = Math.cos(t * d.ay * 1000 + d.phase) * 0.06;
        return { wx: (blob.x + dx) * W, wy: (blob.y + dy) * H, blob };
      });

      // 1. Draw soft background glows (under dots)
      positions.forEach(({ wx, wy, blob }) => {
        ctx!.fillStyle = blobGradient(wx, wy, blob.r, blob.color, blob.alpha);
        ctx!.beginPath();
        ctx!.arc(wx, wy, blob.r, 0, Math.PI * 2);
        ctx!.fill();
      });

      // 2. Draw dot grid — each dot lit by nearest blob
      const gap   = CFG.dotGap;
      const baseR = CFG.dotRadius;
      const litR  = CFG.litRadius;
      const offX  = (W % gap) / 2;
      const offY  = (H % gap) / 2;

      for (let gx = offX; gx < W; gx += gap) {
        for (let gy = offY; gy < H; gy += gap) {

          let maxInf = 0;
          let blendR = 255, blendG = 255, blendB = 255;

          positions.forEach(({ wx, wy, blob }) => {
            const dist = Math.sqrt((gx - wx) ** 2 + (gy - wy) ** 2);
            const inf  = Math.max(0, 1 - dist / litR);
            if (inf > maxInf) {
              maxInf = inf;
              [blendR, blendG, blendB] = blob.color;
            }
          });

          const eased  = smoothstep(maxInf);
          const alpha  = CFG.dotBaseAlpha + eased * (CFG.dotLitAlpha - CFG.dotBaseAlpha);
          const radius = baseR + eased * 1.0;

          ctx!.fillStyle = maxInf > 0.01
            ? `rgba(${blendR},${blendG},${blendB},${alpha})`
            : `rgba(255,255,255,${CFG.dotBaseAlpha})`;

          ctx!.beginPath();
          ctx!.arc(gx, gy, radius, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      rafId = requestAnimationFrame(render);
    }

    render();

    // ── Cleanup ──────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize',    resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('scroll',    onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
