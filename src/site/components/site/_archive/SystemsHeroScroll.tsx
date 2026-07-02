/**
 * SystemsHeroScroll — canvas image-sequence hero for /systems
 * v1: dormant network activating (101 frames)
 * v2: full activation, sparks flying (101 frames)
 * 202 total frames @ 20fps extracted from Kling 3.0 clips.
 */
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScrollTrigger, useGSAP } from '../../../lib/gsap-setup';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const CLIP_FRAMES: Record<string, number> = { v1: 101, v2: 101 };
const CLIPS = ['v1', 'v2'] as const;
const TOTAL_FRAMES = Object.values(CLIP_FRAMES).reduce((a, b) => a + b, 0); // 202
const SCROLL_VH = 4;

function frameSrc(clip: string, i: number) {
  return `/assets/sys-frames/${clip}/${String(i).padStart(4, '0')}.jpg`;
}

function buildFrameList() {
  const list: string[] = [];
  for (const clip of CLIPS) {
    for (let i = 1; i <= CLIP_FRAMES[clip]; i++) list.push(frameSrc(clip, i));
  }
  return list;
}

const FRAME_SRCS = buildFrameList();

export default function SystemsHeroScroll() {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef   = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef    = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const cascadeRefs = [eyebrowRef, headingRef, bodyRef, ctaRef];
  const CASCADE_STAGGER = 0.14;
  const frames    = useRef<HTMLImageElement[]>([]);
  const reduced   = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);
  const [ready,    setReady]    = useState(false);

  useEffect(() => {
    frames.current = new Array(TOTAL_FRAMES);
    let done = 0;
    FRAME_SRCS.forEach((src, idx) => {
      const img = new Image();
      img.onload = () => {
        done++;
        setProgress(Math.round((done / TOTAL_FRAMES) * 100));
        if (done === TOTAL_FRAMES) setReady(true);
      };
      img.onerror = () => { done++; };
      img.src = src;
      frames.current[idx] = img;
    });
  }, []);

  const applyCascade = (t: number) => {
    const n = cascadeRefs.length;
    cascadeRefs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;
      const span = 1 - (n - 1) * CASCADE_STAGGER;
      const local = Math.min(1, Math.max(0, (t - i * CASCADE_STAGGER) / span));
      el.style.opacity = String(local);
      el.style.transform = `translateY(${(1 - local) * 18}px)`;
    });
  };

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = frames.current[Math.max(0, Math.min(TOTAL_FRAMES - 1, index))];
    if (!canvas || !img?.complete) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

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

  useEffect(() => {
    if (ready) drawFrame(reduced ? TOTAL_FRAMES - 1 : 0);
  }, [ready, reduced]);

  useGSAP(
    () => {
      if (!ready) return;
      if (reduced) {
        drawFrame(TOTAL_FRAMES - 1);
        applyCascade(1);
        return;
      }
      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: 'top top',
        end: `+=${SCROLL_VH * 100}%`,
        pin: true,
        pinType: 'transform',
        scrub: 0.5,
        onUpdate(self) {
          drawFrame(Math.round(self.progress * (TOTAL_FRAMES - 1)));
          const t = Math.max(0, (self.progress - 0.82) / 0.18);
          applyCascade(t);
        },
      });
    },
    { scope: wrapRef, dependencies: [ready] },
  );

  return (
    <div ref={wrapRef} className="relative min-h-[100svh] w-full bg-[#0A0A0F]">
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />

      {!ready && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
          <div className="h-[1px] w-48 overflow-hidden bg-white/10">
            <div className="h-full bg-[#7B3FE4] transition-[width] duration-150" style={{ width: `${progress}%` }} />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">{progress}%</span>
        </div>
      )}

      {/* Bottom gradient into the next white section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%]"
        style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.98) 0%, rgba(10,10,15,0.6) 40%, transparent 100%)' }}
      />

      {/* Hero copy — cascades in, element by element */}
      <div
        ref={textRef}
        className="absolute inset-x-0 bottom-0 flex flex-col items-start px-6 pb-20 md:px-16 lg:px-24"
      >
        <p
          ref={eyebrowRef}
          className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9E9EA8]"
          style={{ opacity: reduced ? 1 : 0, transform: reduced ? 'none' : 'translateY(18px)' }}
        >
          Systems &amp; Automation
        </p>
        <h1
          ref={headingRef}
          className="max-w-[16ch] text-[clamp(36px,5.5vw,76px)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#F5F5F7]"
          style={{ opacity: reduced ? 1 : 0, transform: reduced ? 'none' : 'translateY(18px)' }}
        >
          Stop doing it by hand.{' '}
          <em className="not-italic text-[#7B3FE4]">Build the system</em> once.
        </h1>
        <p
          ref={bodyRef}
          className="mt-5 max-w-[40ch] text-[16px] leading-[1.65] text-[#9E9EA8]"
          style={{ opacity: reduced ? 1 : 0, transform: reduced ? 'none' : 'translateY(18px)' }}
        >
          Custom CRMs, WhatsApp automation and n8n workflows that handle the repetitive work. Usually 5-14 days.
        </p>
        <div
          ref={ctaRef}
          className="mt-8 flex flex-wrap items-center gap-4"
          style={{ opacity: reduced ? 1 : 0, transform: reduced ? 'none' : 'translateY(18px)' }}
        >
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
