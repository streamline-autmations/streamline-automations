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
    <article className="relative group">
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
          <div className="relative mx-auto max-w-4xl">
            <DeviceFrame
              src={project.images.laptop}
              alt={`${project.title} preview`}
              className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
              frameClassName="w-full aspect-[16/9]"
            />
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
        title: 'Ameli van Zyl Design',
        subtitle:
          'High-performance portfolio that loads fast, showcases the art clearly, and has a contact form wired to send instant notifications to the artist.',
        tags: ['Portfolio', 'Gallery', 'UX Design'],
        linkTo: '/portfolio/ameli-van-zyl-design',
        images: {
          laptop: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851091/Ameli-hero_image_sxtayp.png',
          tablet: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851091/Ameli-hero_image_sxtayp.png',
          phone: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851091/Ameli-hero_image_sxtayp.png',
        },
      },
      {
        title: 'RecklessBear Apparel',
        subtitle:
          'A bold service website, back-office admin system, and AI agent that collects all the details from every lead before the team steps in.',
        tags: ['Service Website', 'Admin System', 'AI Lead Capture'],
        linkTo: '/portfolio/recklesbear',
        images: {
          laptop: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851117/Reckless-hero_image_sbwhoj.png',
          tablet: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851117/Reckless-hero_image_sbwhoj.png',
          phone: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851117/Reckless-hero_image_sbwhoj.png',
        },
      },
      {
        title: 'BLOM Cosmetics',
        subtitle:
          'Custom e-commerce store with simple product management, stock tracking, and a clear dashboard for orders.',
        tags: ['E-commerce', 'Inventory Automation', 'Admin Dashboard'],
        linkTo: '/portfolio/blom-cosmetics',
        images: {
          laptop: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851097/Blom-hero_image_jaqcoz.png',
          tablet: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851097/Blom-hero_image_jaqcoz.png',
          phone: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851097/Blom-hero_image_jaqcoz.png',
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
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_10%,rgba(119,76,252,0.12),transparent_60%),radial-gradient(820px_circle_at_80%_20%,rgba(242,106,61,0.10),transparent_62%)]" />
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
