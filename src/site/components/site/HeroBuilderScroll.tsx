/**
 * HeroBuilderScroll — v2 hero, canvas image-sequence scrub
 *
 * JPEG frames of the "neural network converges into the Streamline
 * Automations wordmark" clip, preloaded into Image objects. GSAP
 * ScrollTrigger drives an index into the frame array and calls
 * ctx.drawImage() — pre-decoded frames are silky smooth, no video seek lag.
 *
 * Desktop uses the full 410-frame/2K sequence; mobile (<768px) swaps to a
 * lighter 205-frame/900x1600 sequence — same clip, half the frame rate and
 * smaller dimensions, ~14MB instead of ~54MB, so it doesn't blow the mobile
 * data budget on a cellular connection.
 *
 * pinType:'transform' — the #top overflow-x-hidden root breaks fixed pins.
 */
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScrollTrigger, useGSAP } from '../../../lib/gsap-setup';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const MOBILE_QUERY = '(max-width: 767px)';
const IS_MOBILE = typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches;

const TOTAL_FRAMES = IS_MOBILE ? 205 : 410;
const FRAME_DIR = IS_MOBILE ? 'hero-frames-v2-mobile' : 'hero-frames-v2';

function frameSrc(i: number) {
  return `/assets/${FRAME_DIR}/${String(i).padStart(4, '0')}.jpg`;
}

const FRAME_SRCS = Array.from({ length: TOTAL_FRAMES }, (_, i) => frameSrc(i + 1));
// How many viewport-heights of scroll the sequence spans (shorter on mobile)
const SCROLL_VH = IS_MOBILE ? 4 : 6;

export default function HeroBuilderScroll() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef   = useRef<HTMLDivElement>(null);
  const frames    = useRef<HTMLImageElement[]>([]);
  const loaded    = useRef(0);
  const reduced   = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0); // 0–100 load progress
  const [ready,    setReady]    = useState(false);

  // ── Hide nav during the build-up phase ───────────────────────────────────
  useEffect(() => {
    document.documentElement.setAttribute('data-hero-loading', 'true');
    return () => document.documentElement.removeAttribute('data-hero-loading');
  }, []);

  // ── Preload all frames ────────────────────────────────────────────────────
  useEffect(() => {
    frames.current = new Array(TOTAL_FRAMES);
    let done = 0;

    FRAME_SRCS.forEach((src, idx) => {
      const img = new Image();
      img.onload = () => {
        done++;
        loaded.current = done;
        setProgress(Math.round((done / TOTAL_FRAMES) * 100));
        if (done === TOTAL_FRAMES) setReady(true);
      };
      img.onerror = () => { done++; loaded.current = done; };
      img.src = src;
      frames.current[idx] = img;
    });
  }, []);

  // ── Draw a single frame to canvas ────────────────────────────────────────
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img    = frames.current[Math.max(0, Math.min(TOTAL_FRAMES - 1, index))];
    if (!canvas || !img?.complete) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  // ── Size canvas to match display ─────────────────────────────────────────
  // Only re-measure on an actual width change (orientation/breakpoint).
  // Mobile browsers fire `resize` when the address bar shows/hides on
  // scroll — resizing the canvas mid-scrub on those events is what made the
  // hero visibly shake/jump while scrolling on mobile.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let lastWidth = -1;
    const resize = () => {
      const w = canvas.offsetWidth;
      if (w === lastWidth) return;
      lastWidth = w;
      canvas.width  = w;
      canvas.height = canvas.offsetHeight;
      drawFrame(0);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // ── Draw first frame once loaded ──────────────────────────────────────────
  useEffect(() => {
    if (ready) drawFrame(reduced ? TOTAL_FRAMES - 1 : 0);
  }, [ready, reduced]);

  // ── GSAP scroll scrub ────────────────────────────────────────────────────
  useGSAP(
    () => {
      if (!ready) return;

      if (reduced) {
        // Show end frame + text + nav instantly
        document.documentElement.removeAttribute('data-hero-loading');
        drawFrame(TOTAL_FRAMES - 1);
        if (textRef.current) {
          textRef.current.style.opacity = '1';
          textRef.current.style.transform = 'none';
        }
        return;
      }

      const obj = { frame: 0 };
      // Nav and hero copy both arrive only once the wordmark has fully
      // dissolved to black, in the final ~3% of the sequence — nothing
      // appears until the whole build is done.
      const TEXT_REVEAL_START = 0.97;
      const TEXT_REVEAL_RANGE = 0.025;

      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: 'top top',
        end: `+=${SCROLL_VH * 100}%`,
        pin: true,
        pinType: 'transform',
        anticipatePin: 1,
        scrub: 0.5,
        onUpdate(self) {
          const targetFrame = Math.round(self.progress * (TOTAL_FRAMES - 1));
          if (targetFrame !== Math.round(obj.frame)) {
            obj.frame = targetFrame;
            drawFrame(targetFrame);
          }

          if (self.progress >= TEXT_REVEAL_START) {
            document.documentElement.removeAttribute('data-hero-loading');
          } else {
            document.documentElement.setAttribute('data-hero-loading', 'true');
          }

          // Text fades in only after the wordmark has faded to black
          if (textRef.current) {
            const t = Math.min(1, Math.max(0, (self.progress - TEXT_REVEAL_START) / TEXT_REVEAL_RANGE));
            textRef.current.style.opacity = String(t);
            textRef.current.style.transform = `translateY(${(1 - t) * 22}px)`;
          }
        },
      });
    },
    { scope: wrapRef, dependencies: [ready] },
  );

  return (
    <div ref={wrapRef} data-header-dark="" className="relative min-h-[100svh] w-full bg-[#0A0A0F]">

      {/* Canvas — the image sequence renders here */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />

      {/* Loading bar — hidden once ready */}
      {!ready && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
          <div className="h-[1px] w-48 overflow-hidden bg-white/10">
            <div
              className="h-full bg-[#7B3FE4] transition-[width] duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
            {progress}%
          </span>
        </div>
      )}

      {/* Bottom gradient so text is readable over the last frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%]"
        style={{
          background:
            'linear-gradient(to top, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.55) 45%, transparent 100%)',
        }}
      />

      {/* Hero copy — fades in as the wordmark forms */}
      <div
        ref={textRef}
        className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-20 text-center"
        style={{
          opacity: reduced ? 1 : 0,
          transform: reduced ? 'none' : 'translateY(22px)',
        }}
      >
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9E9EA8]">
          Web design &amp; automation
        </p>

        <h1 className="max-w-[14ch] text-[clamp(36px,5.5vw,76px)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#F5F5F7]">
          Built to work,{' '}
          <em className="not-italic text-[#7B3FE4]">not just</em> look good.
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
