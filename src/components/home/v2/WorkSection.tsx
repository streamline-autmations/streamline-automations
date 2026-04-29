/**
 * WorkSection — Cuberto-style full-width project showcase.
 * Two projects displayed as full-bleed image rows with project metadata.
 * Shery.js WebGL distortion on hover (desktop only).
 * GSAP ScrollTrigger entrance + custom cursor label "VIEW →".
 */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../../../lib/gsap-setup';

const projects = [
  {
    number: '01',
    name: 'BLOM COSMETICS',
    tags: ['E-commerce', 'Admin Dashboard', 'Automation'],
    blurb:
      'Full e-commerce store, BLOM Academy, CRM, stock tracking, email + WhatsApp automation and monthly retainer.',
    image: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851097/Blom-hero_image_jaqcoz.png',
    metric: { value: 'R60K+', label: 'Sales in month 3' },
    href: '/portfolio/blom-cosmetics',
    accent: '#774CFC',
  },
  {
    number: '02',
    name: 'RECKLESSBEAR APPAREL',
    tags: ['Systems', 'Order Tracking', 'CRM'],
    blurb:
      'Website, 12-stage order pipeline, inventory admin, WhatsApp automation, AI chatbot and monthly retainer.',
    image: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851117/Reckless-hero_image_sbwhoj.png',
    metric: { value: '3×', label: 'Quote conversion' },
    href: '/portfolio/recklesbear',
    accent: '#F26A3D',
  },
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sheryInitialized = useRef(false);

  // GSAP entrance — rows slide up on scroll
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rows = section.querySelectorAll<HTMLElement>('.work-row');
    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    rows.forEach(row => {
      gsap.set(row, { opacity: 0, y: 50 });
      const trigger = ScrollTrigger.create({
        trigger: row,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(row, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' });
        },
      });
      triggers.push(trigger);
    });

    return () => triggers.forEach(t => t.kill());
  }, []);

  // Shery.js WebGL distortion — desktop only, dynamically loaded
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (sheryInitialized.current) return;

    const timer = setTimeout(async () => {
      try {
        const { default: SheryLib } = await import('sheryjs');
        sheryInitialized.current = true;
        SheryLib.imageEffect('.shery-v2-img', {
          style: 5,
          config: {
            uFrequencyX: { value: 14, range: [0, 100] },
            uFrequencyY: { value: 14, range: [0, 100] },
            uSpeed: { value: 0.3, range: [0, 2] },
          },
        });
      } catch {
        console.warn('[Shery v2] WebGL effect unavailable.');
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleImageEnter = () => {
    window.dispatchEvent(new CustomEvent('cursor-text-set', { detail: 'VIEW' }));
  };
  const handleImageLeave = () => {
    window.dispatchEvent(new CustomEvent('cursor-text-clear'));
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="px-6 md:px-12 lg:px-16 py-24"
      style={{ background: '#030303' }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="flex items-center justify-between mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/25">
            Selected work
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/15">
            02 Projects
          </p>
        </div>

        {/* Project rows */}
        <div className="flex flex-col">
          {projects.map((project, i) => (
            <div
              key={project.number}
              className={`work-row ${i < projects.length - 1 ? 'mb-20 md:mb-24' : ''}`}
            >
              {/* Project meta row */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                <div className="flex items-baseline gap-5">
                  <span className="font-mono text-[11px] text-white/20 tracking-widest">
                    {project.number}
                  </span>
                  <h2
                    className="font-bebas text-white leading-none"
                    style={{ fontSize: 'clamp(36px, 5.5vw, 80px)', letterSpacing: '-0.01em' }}
                  >
                    {project.name}
                  </h2>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] uppercase tracking-widest text-white/30"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="text-white/15 mx-1">·</span>
                  <Link
                    to={project.href}
                    className="font-mono text-[10px] uppercase tracking-widest transition-colors duration-200 hover:opacity-80"
                    style={{ color: project.accent }}
                  >
                    View Case Study →
                  </Link>
                </div>
              </div>

              {/* Full-width image — Shery.js + cursor label target */}
              <Link to={project.href}>
                <div
                  className="relative w-full overflow-hidden group"
                  style={{ aspectRatio: '16 / 7' }}
                  onMouseEnter={handleImageEnter}
                  onMouseLeave={handleImageLeave}
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="shery-v2-img w-full h-full object-cover object-top opacity-55 group-hover:opacity-70 transition-opacity duration-500"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/60 via-transparent to-transparent pointer-events-none" />

                  {/* Metric badge */}
                  <div
                    className="absolute bottom-5 right-5 px-4 py-2 border border-white/10 backdrop-blur-md"
                    style={{ backgroundColor: `${project.accent}12` }}
                  >
                    <div
                      className="font-bebas text-2xl leading-none"
                      style={{ color: project.accent }}
                    >
                      {project.metric.value}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-white/40 mt-0.5">
                      {project.metric.label}
                    </div>
                  </div>
                </div>
              </Link>

              {/* One-liner below image */}
              <p className="mt-4 text-white/30 text-sm font-mono max-w-xl">{project.blurb}</p>
            </div>
          ))}
        </div>

        {/* Footer link */}
        <div className="mt-8 pt-8 border-t border-white/5">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/30 hover:text-white/60 transition-colors duration-200"
          >
            View Full Portfolio →
          </Link>
        </div>
      </div>
    </section>
  );
}
