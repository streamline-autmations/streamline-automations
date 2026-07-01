/**
 * HeroBuilderScroll — v2 hero, canvas image-sequence scrub
 *
 * JPEG frames of the "neural network converges into the Streamline
 * Automations wordmark" clip, preloaded into Image objects. GSAP
 * ScrollTrigger drives an index into the frame array and calls
 * ctx.drawImage() — pre-decoded frames are silky smooth, no video seek lag.
 *
 * Desktop uses the full 410-frame/2K sequence; mobile (<768px) swaps to a
 * lighter 205-frame/1080x1920 sequence — same clip, half the frame rate,
 * so it doesn't blow the mobile data budget on a cellular connection.
 *
 * Pin uses GSAP's default (native position:fixed), not pinType:'transform' —
 * that override is only needed when an ancestor has a CSS transform (e.g. a
 * Lenis wrapper running in virtual-scroll mode), which doesn't apply here;
 * Lenis drives real window.scrollTo. Forcing 'transform' pinning makes GSAP
 * recompute the pin position in JS on every scroll tick instead of letting
 * the browser's compositor handle it for free — on mobile that's exactly
 * what showed up as visible shake/stutter during fast scrolling.
 */
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger, useGSAP } from '../../../lib/gsap-setup';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const MOBILE_QUERY = '(max-width: 767px)';
const IS_MOBILE = typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches;

const TOTAL_FRAMES = IS_MOBILE ? 205 : 410;
const FRAME_DIR = IS_MOBILE ? 'hero-frames-v2-mobile' : 'hero-frames-v2';

function frameSrc(i: number) {
  return `/assets/${FRAME_DIR}/${String(i).padStart(4, '0')}.jpg`;
}

const FRAME_SRCS = Array.from({ length: TOTAL_FRAMES }, (_, i) => frameSrc(i + 1));

// Scroll distance is split into three phases so the wordmark's fade-to-black
// gets to sit on its own for a beat before the hero copy cuts in, instead of
// the reveal crowding right up against the end of the frame sequence:
//   1. FRAME_VH      — plays through all frames (build → wordmark → black)
//   2. BLACK_HOLD_VH  — pure black, nothing happens, a breathing gap
//   3. REVEAL_VH      — hero copy + nav fade in
const FRAME_VH      = IS_MOBILE ? 5   : 7.5;
const BLACK_HOLD_VH = IS_MOBILE ? 2   : 3;
const REVEAL_VH     = IS_MOBILE ? 1.5 : 2;
const SCROLL_VH = FRAME_VH + BLACK_HOLD_VH + REVEAL_VH;

const FRAME_END_FRACTION = FRAME_VH / SCROLL_VH;
const TEXT_REVEAL_START  = (FRAME_VH + BLACK_HOLD_VH) / SCROLL_VH;
const TEXT_REVEAL_RANGE  = REVEAL_VH / SCROLL_VH;

// Minimum time (seconds) the sequence takes to play from 0% to 100%, even on
// a huge/violent scroll or flick — enforced via a hard rate cap, see below.
const SCRUB_SECONDS = 3.5;

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
  // Keeps the canvas bitmap in sync with its container, including when the
  // container's height changes (e.g. 100svh recalculating as a mobile
  // address bar shows/hides) — skipping that would leave the canvas frozen
  // at a stale size and looking cut off / not full-screen.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let lastW = -1;
    let lastH = -1;
    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w === lastW && h === lastH) return;
      lastW = w;
      lastH = h;
      canvas.width  = w;
      canvas.height = h;
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

      // Hard cap on how fast the sequence can advance, in progress-units per
      // second (1 / SCRUB_SECONDS = a full 0→1 pass takes at least that many
      // seconds). GSAP's `scrub` option only smooths a *linked animation's*
      // playhead — it does nothing for a raw `self.progress` read in
      // onUpdate, and even wired through a dummy tween it only approximates
      // a catch-up, not a guaranteed floor: a single huge jump (a hard fling,
      // or a precision scroll wheel) can still resolve in a fraction of a
      // second. Driving displayed progress by hand on gsap.ticker and
      // clamping its rate of change is the only way to guarantee the floor
      // holds for every jump size, while still tracking 1:1 with normal,
      // slower scrolling (the clamp never engages below the max rate).
      const MAX_RATE = 1 / SCRUB_SECONDS;

      const trigger = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: 'top top',
        end: `+=${SCROLL_VH * 100}%`,
        pin: true,
        anticipatePin: 1,
      });

      let displayed = 0;
      let lastFrame = -1;
      let lastTime = performance.now();

      const onTick = () => {
        const now = performance.now();
        const dt = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        const target = trigger.progress;
        const diff = target - displayed;
        const maxStep = MAX_RATE * dt;
        displayed = Math.abs(diff) <= maxStep ? target : displayed + Math.sign(diff) * maxStep;

        // Frames finish playing at FRAME_END_FRACTION of the total scroll —
        // the remaining distance is the black-hold gap + reveal, so nothing
        // more happens to the canvas after this point.
        const frameProgress = Math.min(1, displayed / FRAME_END_FRACTION);
        const targetFrame = Math.round(frameProgress * (TOTAL_FRAMES - 1));
        if (targetFrame !== lastFrame) {
          lastFrame = targetFrame;
          drawFrame(targetFrame);
        }

        if (displayed >= TEXT_REVEAL_START) {
          document.documentElement.removeAttribute('data-hero-loading');
        } else {
          document.documentElement.setAttribute('data-hero-loading', 'true');
        }

        // Text fades in only after the wordmark has faded to black
        if (textRef.current) {
          const t = Math.min(1, Math.max(0, (displayed - TEXT_REVEAL_START) / TEXT_REVEAL_RANGE));
          textRef.current.style.opacity = String(t);
          textRef.current.style.transform = `translateY(${(1 - t) * 22}px)`;
        }
      };

      gsap.ticker.add(onTick);

      // This pin only mounts once frames finish preloading — by then every
      // section below has already created its own ScrollTrigger and cached
      // a start position against the pre-hero layout. Inserting this pin's
      // spacer now shifts everything below it, so those cached positions go
      // stale by exactly this pin's height until we force a recompute.
      ScrollTrigger.refresh();
      // Sections below (e.g. the featured-work cycler) defer creating their
      // OWN ScrollTrigger until they hear this — creating one any earlier
      // risks it being built against this stale pre-hero layout, and since
      // refresh() doesn't safely correct an already-mid-scroll pin, that
      // section would stay permanently desynced for the rest of the visit.
      // The flag covers listeners that attach after this already fired
      // (e.g. fast/cached repeat visits where preload finishes almost
      // instantly, before the section below has mounted its effect).
      (window as unknown as { __heroPinReady?: boolean }).__heroPinReady = true;
      window.dispatchEvent(new Event('hero-pin-ready'));

      return () => {
        gsap.ticker.remove(onTick);
      };
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
