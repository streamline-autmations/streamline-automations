import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import { EASE_ARR } from '../../lib/motion';
import type { ProjectMedia } from '../../data/site';

interface Props {
  to: string;
  label: string;
  title: string;
  blurb?: string;
  image?: string;
  video?: string;
  media?: ProjectMedia;
  ratio?: string;
  index?: number;
}

export default function WorkCard({
  to,
  label,
  title,
  blurb,
  image,
  video,
  media,
  ratio = '16/10',
  index = 0,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const resolvedImage = media?.type === 'image' ? media.src : media?.poster || image || '';
  const resolvedVideo = media?.type === 'video' ? media.src : video;
  const mobileFallback = media?.mobileFallback || resolvedImage;
  const mediaAlt = media?.alt || title;

  useEffect(() => {
    if (reduced || !resolvedVideo) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting) v.play().catch(() => undefined);
        else v.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [reduced, resolvedVideo]);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: EASE_ARR, delay: index * 0.06 }}
    >
      <Link
        to={to}
        data-cursor="view"
        data-cursor-label="Explore"
        className="group block rounded-3xl outline-none transition-transform duration-200 ease-brand active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-4"
      >
        <div
          ref={wrapRef}
          className="relative w-full overflow-hidden rounded-3xl border border-site-line bg-site-surface shadow-[0_30px_80px_-20px_rgba(76,29,149,0.18),0_10px_30px_-10px_rgba(0,0,0,0.06)]"
          style={{ aspectRatio: ratio }}
        >
          {reduced || !resolvedVideo ? (
            <picture>
              <source media="(max-width: 767px)" srcSet={mobileFallback} />
              <img
                src={resolvedImage}
                alt={mediaAlt}
                loading="lazy"
                draggable={false}
                className={`absolute inset-0 h-full w-full select-none object-cover transition-transform duration-[900ms] ease-brand will-change-transform ${
                  reduced ? '' : 'group-hover:scale-[1.04]'
                }`}
              />
            </picture>
          ) : (
            <video
              ref={videoRef}
              src={resolvedVideo}
              poster={resolvedImage}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-label={mediaAlt}
              className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-brand will-change-transform ${
                reduced ? '' : 'group-hover:scale-[1.04]'
              }`}
            />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-site-ink/0 transition-colors duration-500 ease-brand group-hover:bg-site-ink/[0.04]"
          />
        </div>

        <div className="mt-6 flex items-start justify-between gap-6">
          <div>
            <span className="block text-[14px] font-medium text-site-accent">{label}</span>
            <h3 className="mt-2 text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-site-ink md:text-[26px]">
              {title}
            </h3>
            {blurb && <p className="mt-2 max-w-md text-[15px] leading-[1.55] text-site-text-body">{blurb}</p>}
          </div>
          <span
            aria-hidden="true"
            className="mt-1 shrink-0 text-[22px] text-site-text-muted transition-all duration-300 ease-brand group-hover:translate-x-1 group-hover:text-site-accent motion-reduce:group-hover:translate-x-0"
          >
            -&gt;
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
