import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import { EASE_ARR } from '../../lib/motion';

interface Props {
  to: string;
  label: string;
  title: string;
  blurb?: string;
  image: string;
  /** Optional muted autoplay-on-view video; falls back to image as poster. */
  video?: string;
  /** 16/10 (default), 4/3, or 1/1 — controls media aspect. */
  ratio?: string;
  index?: number;
}

/**
 * WorkCard — full-bleed case cover. Large rounded media (image or muted
 * autoplay-on-view video) that reveals with a gentle scale/clip on scroll-in
 * and lifts slightly on hover. Cursor switches to "View". Video lazy-mounts
 * only when ≥40% in view and pauses off-screen; reduced-motion → static image.
 */
export default function WorkCard({
  to,
  label,
  title,
  blurb,
  image,
  video,
  ratio = '16/10',
  index = 0,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reduced || !video) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting) v.play().catch(() => undefined);
        else v.pause();
      },
      { threshold: 0.4 }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [reduced, video]);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: EASE_ARR, delay: index * 0.06 }}
    >
      <Link to={to} data-cursor="view" className="group block outline-none">
        <div
          ref={wrapRef}
          className="relative w-full overflow-hidden rounded-3xl border border-site-line bg-site-surface shadow-[0_30px_80px_-20px_rgba(76,29,149,0.18),0_10px_30px_-10px_rgba(0,0,0,0.06)]"
          style={{ aspectRatio: ratio }}
        >
          {reduced || !video ? (
            <img
              src={image}
              alt={title}
              loading="lazy"
              draggable={false}
              className={`absolute inset-0 h-full w-full select-none object-cover transition-transform duration-[900ms] ease-brand will-change-transform ${
                reduced ? '' : 'group-hover:scale-[1.04]'
              }`}
            />
          ) : (
            <video
              ref={videoRef}
              src={video}
              poster={image}
              muted
              loop
              playsInline
              preload="none"
              aria-label={title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-brand will-change-transform group-hover:scale-[1.04]"
            />
          )}
          {/* subtle hover veil */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-site-ink/0 transition-colors duration-500 ease-brand group-hover:bg-site-ink/[0.04]"
          />
        </div>

        <div className="mt-6 flex items-start justify-between gap-6">
          <div>
            <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-site-accent">
              {label}
            </span>
            <h3 className="mt-2 text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-site-ink md:text-[26px]">
              {title}
            </h3>
            {blurb && <p className="mt-2 max-w-md text-[15px] leading-[1.55] text-site-text-body">{blurb}</p>}
          </div>
          <span
            aria-hidden="true"
            className="mt-1 shrink-0 text-[22px] text-site-text-muted transition-all duration-300 ease-brand group-hover:translate-x-1 group-hover:text-site-accent"
          >
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
