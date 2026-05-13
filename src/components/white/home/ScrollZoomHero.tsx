import { useEffect, useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsap-setup';
import usePrefersReducedMotion from '../../../hooks/usePrefersReducedMotion';

/**
 * ScrollZoomHero — image-sequence scroll-zoom (the viral hero moment).
 *
 * NOT YET MOUNTED — scaffold only.
 * See ASSET_PLACEHOLDERS.md for upload spec before mounting.
 *
 * Usage once assets are ready:
 *   <ScrollZoomHero
 *     framesPath="https://res.cloudinary.com/dy1gw7dr2/image/upload/streamline-site/hero-sequence/frame-"
 *     frameCount={90}
 *     staticFallback="https://res.cloudinary.com/.../frame-001.webp"
 *   />
 */
interface Props {
  /** Cloudinary base URL up to and including the frame prefix, e.g. ".../frame-" */
  framesPath: string;
  /** Total number of frames (001…N). Recommend 60–120. */
  frameCount: number;
  /** Static image for mobile / reduced-motion fallback */
  staticFallback: string;
  /** Alt text for the fallback image */
  alt?: string;
}

export default function ScrollZoomHero({
  framesPath,
  frameCount,
  staticFallback,
  alt = 'Streamline — hero sequence',
}: Props) {
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload frames + draw sequence via ScrollTrigger
  useGSAP(
    () => {
      if (reduced) return;
      const wrap = wrapRef.current;
      const canvas = canvasRef.current;
      if (!wrap || !canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Resize canvas to window
      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (imagesRef.current[frameRef.current]) {
          ctx.drawImage(imagesRef.current[frameRef.current], 0, 0, canvas.width, canvas.height);
        }
      };
      resize();
      window.addEventListener('resize', resize);

      // Preload all frames
      const images: HTMLImageElement[] = [];
      let loaded = 0;
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const n = String(i).padStart(3, '0');
        img.src = `${framesPath}${n}.webp`;
        img.onload = () => {
          loaded++;
          if (loaded === 1) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        };
        images.push(img);
      }
      imagesRef.current = images;

      // ScrollTrigger drives frame index
      const obj = { frame: 0 };
      gsap.to(obj, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: `+=${frameCount * 12}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          const idx = Math.round(obj.frame);
          if (idx !== frameRef.current && images[idx]) {
            frameRef.current = idx;
            ctx.drawImage(images[idx], 0, 0, canvas.width, canvas.height);
          }
        },
      });

      return () => {
        window.removeEventListener('resize', resize);
      };
    },
    { scope: wrapRef, dependencies: [reduced, framesPath, frameCount] }
  );

  // Mobile / reduced-motion: static image
  if (reduced) {
    return (
      <div className="relative w-full aspect-video overflow-hidden bg-[#F5F5F7]">
        <img src={staticFallback} alt={alt} className="w-full h-full object-cover" loading="eager" />
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="relative w-full" style={{ height: '100svh' }}>
      <canvas
        ref={canvasRef}
        className="sticky top-0 w-full"
        style={{ height: '100svh', display: 'block' }}
        aria-label={alt}
        role="img"
      />
    </div>
  );
}
