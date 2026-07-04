import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import { EASE_ARR, viewport } from '../../lib/motion';

interface Props {
  src: string;
  poster: string;
  label: string;
  className?: string;
}

/**
 * WalkthroughVideo — a muted site-walkthrough reel that plays only while on
 * screen (IntersectionObserver), loops, and never asks for sound. Reduced
 * motion gets the poster with native controls instead of autoplay.
 */
export default function WalkthroughVideo({ src, poster, label, className = '' }: Props) {
  const reduced = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reduced) return;
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => undefined);
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.7, ease: EASE_ARR }}
      className={`overflow-hidden rounded-2xl border border-site-line bg-site-surface shadow-[0_30px_80px_-20px_rgba(76,29,149,0.18),0_10px_30px_-10px_rgba(0,0,0,0.06)] md:rounded-3xl ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        controls={reduced}
        aria-label={label}
        className="aspect-video h-auto w-full"
      />
    </motion.div>
  );
}
