/**
 * FeaturedCaseStudies
 * - Shery.js WebGL image effect (style 5 = fluid ripple distortion on hover)
 *   Dynamically imported after mount. Disabled on touch devices automatically.
 * - GSAP ScrollTrigger: card entrance stagger + subtle parallax on images.
 * - Framer Motion wrappers removed — GSAP handles all animation here.
 */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap-setup';
import BracketCard from '../ui/BracketCard';

const projects = [
  {
    id: 1,
    tag: 'E-commerce Infrastructure',
    title: 'BLOM Cosmetics',
    description: 'Full e-commerce store, admin dashboard, BLOM Academy, email + WhatsApp automation and monthly retainer.',
    image: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851097/Blom-hero_image_jaqcoz.png',
    path: '/portfolio/blom-cosmetics',
    color: 'purple' as const,
    accentColor: '#774CFC',
    metric: { value: 'R60K+', label: 'Sales in month 3' },
  },
  {
    id: 2,
    tag: 'Systems & Automation',
    title: 'RecklessBear Apparel',
    description: 'Website, CRM, 12-stage order tracking, inventory management, WhatsApp automation and monthly retainer.',
    image: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851117/Reckless-hero_image_sbwhoj.png',
    path: '/portfolio/recklesbear',
    color: 'orange' as const,
    accentColor: '#F26A3D',
    metric: { value: '3×', label: 'Quote conversion' },
  },
];

export default function FeaturedCaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sheryInitialized = useRef(false);

  // ── GSAP card entrance + scroll parallax ─────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>('.case-study-card');
    const imageWrappers = container.querySelectorAll<HTMLElement>('.case-study-img-wrapper');

    // Staggered card slide-up on scroll into view
    gsap.fromTo(
      cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.18,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Parallax: image moves slightly slower than the card scroll speed
    imageWrappers.forEach(wrapper => {
      gsap.to(wrapper, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll()
        .filter(st => container.contains(st.vars.trigger as Node))
        .forEach(st => st.kill());
    };
  }, []);

  // ── Shery.js WebGL distortion on project images ───────────────────
  useEffect(() => {
    // Touch/stylus devices: skip WebGL (not designed for hover interactions)
    if (window.matchMedia('(pointer: coarse)').matches) return;
    // StrictMode guard — prevent double init
    if (sheryInitialized.current) return;

    // Small delay: ensure images are rendered + Lenis scroll is settled
    const timer = setTimeout(async () => {
      try {
        const { default: Shery } = await import('sheryjs');
        sheryInitialized.current = true;
        Shery.imageEffect('.shery-project-img', {
          style: 5,          // Fluid liquid distortion on hover
          config: {
            uFrequencyX: { value: 14, range: [0, 100] },
            uFrequencyY: { value: 14, range: [0, 100] },
            uSpeed:      { value: 0.3, range: [0, 2] },
          },
        });
      } catch {
        // Enhancement only — fail silently if WebGL unavailable
        console.warn('[Shery] WebGL effect unavailable, falling back to CSS transitions.');
      }
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
    >
      {projects.map((project) => (
        <BracketCard key={project.id} color={project.color} className="h-full case-study-card opacity-0">
          <Link to={project.path} className="group block h-full">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 h-full flex flex-col">

              {/* Image — parallax wrapper + Shery.js target */}
              <div className="relative w-full aspect-video overflow-hidden case-study-img-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="shery-project-img w-full h-full object-cover opacity-50 group-hover:opacity-65 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                {/* Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border"
                    style={{
                      color: project.accentColor,
                      borderColor: `${project.accentColor}40`,
                      backgroundColor: `${project.accentColor}12`,
                    }}
                  >
                    {project.tag}
                  </span>
                </div>

                {/* Metric badge */}
                <div className="absolute bottom-4 right-4 z-10">
                  <div
                    className="px-3 py-1.5 rounded-lg border backdrop-blur-md text-right"
                    style={{
                      borderColor: `${project.accentColor}30`,
                      backgroundColor: `${project.accentColor}15`,
                    }}
                  >
                    <div className="font-bebas text-xl leading-none" style={{ color: project.accentColor }}>
                      {project.metric.value}
                    </div>
                    <div className="text-white/50 text-[10px] font-mono leading-none mt-0.5">
                      {project.metric.label}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col gap-3">
                <h3 className="font-bebas text-3xl text-white group-hover:text-white/90 transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed flex-1">{project.description}</p>
                <div
                  className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all duration-300"
                  style={{ color: project.accentColor }}
                >
                  View Case Study <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </Link>
        </BracketCard>
      ))}
    </div>
  );
}
