import React, { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionDotGrid from '../ui/SectionDotGrid';

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

function DeviceFrame({
  src,
  alt,
  className,
  frameClassName,
}: {
  src: string;
  alt: string;
  className: string;
  frameClassName?: string;
}) {
  return (
    <div
      className={
        `relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_30px_90px_rgba(0,0,0,0.65)] ${
          frameClassName || ''
        }`
      }
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-black/40" />
      <img
        src={src}
        alt={alt}
        className={`relative z-10 h-full w-full ${className}`}
        loading="lazy"
      />
    </div>
  );
}

type FeaturedWorkProject = {
  title: string;
  subtitle: string;
  tags: string[];
  linkTo: string;
  images: { laptop: string; tablet: string; phone: string };
};

function FeaturedWorkProjectBlock({ project }: { project: FeaturedWorkProject }) {
  return (
    <article className="relative">
      <div className="mx-auto max-w-md md:max-w-4xl">
        <div className="mb-8 md:mb-10 text-center" data-parallax data-speed="0.18">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-bold text-white tracking-tight">
            {project.title}
          </h3>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-white/70 font-inter leading-relaxed">
            {project.subtitle}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-mono tracking-[0.16em] uppercase text-white/60"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link to={project.linkTo} className="btn btn-primary btn-lg">
              View Case Study <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="relative" data-parallax data-speed="0.34">
          <div className="relative mx-auto h-[420px] sm:h-[520px] md:h-[560px]">
            <div className="absolute inset-0 rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.03] via-transparent to-black/30" />

            <div className="absolute left-1/2 top-1/2 hidden w-[84%] -translate-x-1/2 -translate-y-1/2 md:block">
              <DeviceFrame
                src={project.images.laptop}
                alt={`${project.title} laptop preview`}
                className="object-cover"
                frameClassName="aspect-[3/2]"
              />
            </div>

            <div className="absolute left-1/2 top-6 w-[92%] -translate-x-1/2 md:left-[18%] md:top-[12%] md:w-[58%] md:translate-x-0">
              <DeviceFrame
                src={project.images.tablet}
                alt={`${project.title} tablet preview`}
                className="object-cover"
                frameClassName="aspect-[4/3]"
              />
            </div>

            <div className="absolute left-1/2 bottom-6 w-[70%] -translate-x-1/2 md:left-auto md:right-[10%] md:bottom-[10%] md:w-[22%] md:translate-x-0">
              <DeviceFrame
                src={project.images.phone}
                alt={`${project.title} phone preview`}
                className="object-cover"
                frameClassName="aspect-[9/16]"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedWorkSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const projects = useMemo<FeaturedWorkProject[]>(
    () => [
      {
        title: 'E-commerce Command Center',
        subtitle:
          'End-to-end digital retail system with inventory synchronization, automated stock alerts, and an admin dashboard for order flow.',
        tags: ['E-commerce', 'Inventory Automation', 'Admin Dashboard'],
        linkTo: '/portfolio/blom-cosmetics',
        images: {
          laptop: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1766552022/Blom-Cover_tpxo7j.png',
          tablet: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1766552022/Blom-Cover_tpxo7j.png',
          phone: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1766552022/Blom-Cover_tpxo7j.png',
        },
      },
      {
        title: 'Ameli van Zyl Design',
        subtitle:
          'High-performance portfolio focused on gallery speed and visual impact, with streamlined commission enquiries and instant notifications.',
        tags: ['Portfolio', 'Gallery', 'UX Design'],
        linkTo: '/portfolio/ameli-van-zyl-design',
        images: {
          laptop: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1766552022/Ameli-Cover_dztneq.png',
          tablet: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1766552022/Ameli-Cover_dztneq.png',
          phone: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1766552022/Ameli-Cover_dztneq.png',
        },
      },
    ],
    []
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.matchMedia?.('(hover: none), (pointer: coarse)')?.matches || window.innerWidth < 768;
    if (!isMobile) return;

    const layers = Array.from(section.querySelectorAll<HTMLElement>('[data-parallax][data-speed]'));
    for (const el of layers) el.style.willChange = 'transform';

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const rect = section.getBoundingClientRect();
      const vh = Math.max(1, window.innerHeight);
      const total = vh + rect.height;
      const p = clamp((vh - rect.top) / total, 0, 1);
      const base = (p - 0.5) * 110;
      for (const el of layers) {
        const speed = Number(el.dataset.speed || '0');
        const y = -base * speed;
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-white/10"
      style={{ background: 'linear-gradient(180deg, rgba(5,5,10,1) 0%, rgba(2,2,7,1) 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(109,40,217,0.12),transparent_60%),radial-gradient(820px_circle_at_80%_20%,rgba(240,85,35,0.08),transparent_62%)]" />
      </div>
      <SectionDotGrid containerRef={sectionRef} />

      <div className="relative z-10">
        <div className="px-4 md:px-6 py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center mb-14 md:mb-16" data-parallax data-speed="0.10">
            <span className="label">Featured Work</span>
            <h2 className="h2 mt-4">Featured Builds</h2>
            <p className="body mt-4">Real systems. Real businesses. Real results.</p>
          </div>

          <div className="space-y-16 md:space-y-24">
            {projects.map((project) => (
              <FeaturedWorkProjectBlock key={project.title} project={project} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/portfolio" className="btn btn-orange">
              View All Work <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
