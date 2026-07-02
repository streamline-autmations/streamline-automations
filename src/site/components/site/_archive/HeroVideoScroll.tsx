/**
 * HeroVideoScroll — Apple-style canvas image-sequence hero
 *
 * 303 JPEG frames (101 per clip) are preloaded into Image objects.
 * GSAP ScrollTrigger drives an index into the frame array and calls
 * ctx.drawImage() — pre-decoded frames are silky smooth, no video seek lag.
 *
 * pinType:'transform' — the #top overflow-x-hidden root breaks fixed pins.
 */
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScrollTrigger, useGSAP } from '../../../lib/gsap-setup';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

// v1: 101 frames, v2: 101 frames, v3: 202 frames (extended with sparking network)
const CLIP_FRAMES: Record<string, number> = { v1: 101, v2: 101, v3: 202 };
const CLIPS = ['v1', 'v2', 'v3'] as const;
const TOTAL_FRAMES = Object.values(CLIP_FRAMES).reduce((a, b) => a + b, 0); // 404

function frameSrc(clip: string, i: number) {
  return `/assets/hero-frames/${clip}/${String(i).padStart(4, '0')}.jpg`;
}

// Build the full ordered frame list: v1 0001→0101, v2 0001→0101, v3 0001→0202
function buildFrameList() {
  const list: string[] = [];
  for (const clip of CLIPS) {
    for (let i = 1; i <= CLIP_FRAMES[clip]; i++) list.push(frameSrc(clip, i));
  }
  return list;
}

const FRAME_SRCS = buildFrameList();
// How many viewport-heights of scroll the sequence spans
const SCROLL_VH = 5;

export default function HeroVideoScroll() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef   = useRef<HTMLDivElement>(null);
  const frames    = useRef<HTMLImageElement[]>([]);
  const loaded    = useRef(0);
  const reduced   = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0); // 0–100 load progress
  const [ready,    setReady]    = useState(false);
  // The GSAP pin effect only runs once, on mount (see below) — it can't
  // depend on `ready` without recreating the pin mid-scroll, so `onUpdate`
  // reads this ref instead of the `ready` state to avoid closing over the
  // stale `false` value from the effect's first (and only) run.
  const readyRef  = useRef(false);
  useEffect(() => { readyRef.current = ready; }, [ready]);

  // ── Hide nav during the laptop-zoom phase ────────────────────────────────
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
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
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
  // The pin is created synchronously on mount, independent of `ready` — if it
  // waited on frame preload, the page's real scroll height would only become
  // final once every frame had loaded, and anything below (e.g. the
  // featured-work cycler) that measures its own scroll position before then
  // would cache it against a much shorter, pre-pin layout. Since a mid-scroll
  // pin can't be safely corrected by refresh(), that section stays
  // permanently desynced and renders on top of/inside the hero. Only the
  // frame *drawing* is gated on `ready`; the pin itself never waits.
  useGSAP(
    () => {
      if (reduced) {
        // Show end frame + text + nav instantly
        document.documentElement.removeAttribute('data-hero-loading');
        if (readyRef.current) drawFrame(TOTAL_FRAMES - 1);
        if (textRef.current) {
          textRef.current.style.opacity = '1';
          textRef.current.style.transform = 'none';
        }
        return;
      }

      const obj = { frame: 0 };
      // v3 (sparking network) starts at frame 202 of 404 = 50% progress.
      // Text and nav both reveal starting at 55% so they arrive with the sparks.
      const REVEAL_START = 0.55;
      const REVEAL_RANGE = 0.20; // fully visible by 75%

      const trigger = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: 'top top',
        end: `+=${SCROLL_VH * 100}%`,
        pin: true,
        pinType: 'transform',
        scrub: 0.5,
        onUpdate(self) {
          if (readyRef.current) {
            const targetFrame = Math.round(self.progress * (TOTAL_FRAMES - 1));
            if (targetFrame !== Math.round(obj.frame)) {
              obj.frame = targetFrame;
              drawFrame(targetFrame);
            }
          }

          // Reveal nav at the same threshold
          if (self.progress >= REVEAL_START) {
            document.documentElement.removeAttribute('data-hero-loading');
          } else {
            document.documentElement.setAttribute('data-hero-loading', 'true');
          }

          // Text fades in with the sparks
          if (textRef.current) {
            const t = Math.min(1, Math.max(0, (self.progress - REVEAL_START) / REVEAL_RANGE));
            textRef.current.style.opacity = String(t);
            textRef.current.style.transform = `translateY(${(1 - t) * 22}px)`;
          }
        },
      });

      return () => trigger.kill();
    },
    { scope: wrapRef, dependencies: [reduced] },
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

      {/* Hero copy — fades in at the end of the sequence */}
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
