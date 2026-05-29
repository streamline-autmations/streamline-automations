import { useEffect, useRef } from 'react';
import usePrefersReducedMotion from '../../../hooks/usePrefersReducedMotion';

// Real BLOM Cosmetics walkthrough — same source as the "See it move" section.
const HERO_VIDEO =
  'https://res.cloudinary.com/dy1gw7dr2/video/upload/q_auto/f_auto/v1778654284/Blom-Cosmetics_1_t38yyk.mp4';
const HERO_POSTER =
  'https://res.cloudinary.com/dy1gw7dr2/video/upload/q_auto,f_jpg,so_0/v1778654284/Blom-Cosmetics_1_t38yyk.jpg';

interface Props {
  /** Override the default Cloudinary video source. */
  videoSrc?: string;
  /** Override the default poster fallback. */
  posterSrc?: string;
}

export default function VideoHero({
  videoSrc = HERO_VIDEO,
  posterSrc = HERO_POSTER,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);

  // Scroll-velocity glitch. Each scroll event bumps an intensity value that
  // decays back to 0 every frame — so the RGB-split + scanline distortion
  // only shows while you're actively scrolling over the video, then settles.
  // Single <video> element (no duplicate decode): the chromatic split is a
  // pair of coloured drop-shadows, cheap to composite on the GPU.
  useEffect(() => {
    if (reduced) return;
    const video = videoRef.current;
    const scan = scanRef.current;
    if (!video || !scan) return;

    let intensity = 0;
    let lastY = window.scrollY;
    let raf = 0;

    const onScroll = () => {
      const dy = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      // Map scroll delta → intensity, clamped. Big flicks glitch harder.
      intensity = Math.min(1, intensity + dy / 120);
    };

    const tick = () => {
      intensity *= 0.88; // decay toward calm
      if (intensity < 0.01) intensity = 0;
      const o = intensity * 6; // px of channel offset
      video.style.filter =
        intensity > 0
          ? `drop-shadow(${o}px 0 0 rgba(255,0,80,0.55)) drop-shadow(${-o}px 0 0 rgba(0,200,255,0.55))`
          : 'none';
      video.style.transform = `translateZ(0) skewX(${intensity * 1.4}deg)`;
      scan.style.opacity = String(intensity * 0.5);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section
      data-cursor="reel"
      className="relative w-full min-h-[100svh] overflow-hidden bg-black"
      aria-label="Showreel"
    >
      {/* Video layer (z-0) — static poster only when reduced motion is on */}
      {reduced ? (
        <img
          src={posterSrc}
          alt="Streamline Automations client work walkthrough"
          className="absolute inset-0 z-0 w-full h-full object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 z-0 w-full h-full object-cover"
          style={{ willChange: 'transform, filter' }}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      )}

      {/* Scanline glitch overlay (z-10) — opacity driven by scroll velocity */}
      <div
        ref={scanRef}
        aria-hidden="true"
        className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay"
        style={{
          opacity: 0,
          backgroundImage:
            'repeating-linear-gradient(to bottom, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 2px, transparent 4px)',
        }}
      />

      {/* Subtle darken overlay (z-10) — keeps the video clear but readable */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.35))',
        }}
      />
    </section>
  );
}
