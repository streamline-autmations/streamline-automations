import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import usePrefersReducedMotion from '../../../hooks/usePrefersReducedMotion';

interface Props {
  videoSrc: string;
  posterSrc: string;
  label: string;
  headline: string;
  body: string;
  linkHref: string;
  linkLabel?: string;
}

/**
 * Reusable video card.
 *  - Lazy-mounts the <video> only when ≥50% in view.
 *  - Pauses when scrolled out.
 *  - Reduced-motion users get the poster image only — <video> never mounts.
 */
export default function VideoCard({
  videoSrc,
  posterSrc,
  label,
  headline,
  body,
  linkHref,
  linkLabel = 'View walkthrough →',
}: Props) {
  const reduced = usePrefersReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reduced) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;
        if (entry.isIntersecting) {
          // play() returns a promise — swallow autoplay rejection silently
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div className="group flex flex-col gap-6">
      <div
        ref={wrapperRef}
        className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#F5F5F7] border border-[#E8E8EC]
                   shadow-[0_30px_80px_-20px_rgba(76,29,149,0.18),0_10px_30px_-10px_rgba(0,0,0,0.06)]"
      >
        {reduced ? (
          <img
            src={posterSrc}
            alt={headline}
            loading="lazy"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover select-none"
          />
        ) : (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={headline}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>

      <div>
        <span className="block text-[10.5px] font-['DM_Sans'] font-medium uppercase tracking-[0.18em] text-[#7B3FE4]">
          {label}
        </span>
        <h3 className="mt-3 text-[22px] md:text-[26px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em] leading-[1.2]">
          {headline}
        </h3>
        <p className="mt-3 text-[15px] font-['DM_Sans'] text-[#3D3D47] leading-[1.55]">
          {body}
        </p>
        <Link
          to={linkHref}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-['DM_Sans'] font-medium text-[#0A0A0F] hover:text-[#7B3FE4] transition-colors duration-200"
        >
          {linkLabel}
        </Link>
      </div>
    </div>
  );
}
