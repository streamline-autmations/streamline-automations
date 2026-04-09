import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/ui/SectionHeading';
import SEO from '../components/seo/SEO';
import { portfolioProjects, testimonials, PortfolioCategory, PortfolioProject } from '../data/portfolio';
import { DeviceFrame } from '../components/ui/DeviceFrame';

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

function PortfolioProjectBlock({ project }: { project: PortfolioProject }) {
  return (
    <article className="relative group">
      <div className="mx-auto max-w-md md:max-w-4xl">
        <div className="mb-8 md:mb-10 text-center" data-parallax data-speed="0.18">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-bold text-white tracking-tight">
            {project.title}
          </h3>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-white/70 font-inter leading-relaxed max-w-2xl mx-auto">
            {project.description}
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
            <Link to={`/portfolio/${project.id}`} className="btn btn-primary btn-lg">
              View Case Study <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="relative" data-parallax data-speed="0.34">
          <div className="relative mx-auto max-w-4xl">
            <Link to={`/portfolio/${project.id}`} className="block cursor-pointer">
              <DeviceFrame
                src={project.image}
                alt={`${project.title} preview`}
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                frameClassName="w-full aspect-[16/9]"
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

const Portfolio: React.FC = () => {
  const [activeFilter] = useState<PortfolioCategory | 'all'>('all');
  const sectionRef = useRef<HTMLDivElement | null>(null);

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

  // Removed filter buttons as requested
  const filteredProjects = activeFilter === 'all'
    ? portfolioProjects
    : portfolioProjects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen" ref={sectionRef}>
      <SEO 
        title="Portfolio"
        description="See how we've helped businesses like RecklessBear and BLOM Cosmetics scale with custom web and automation systems."
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/10 rounded-full filter blur-3xl"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <SectionHeading
            title="Our Featured Projects"
            subtitle="From custom code to corporate identity — real projects, real results."
            centered={true}
            className="max-w-4xl mx-auto"
          />

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-400 text-sm font-mono tracking-wide uppercase">Web Apps</span>
            <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-400 text-sm font-mono tracking-wide uppercase">Admin Systems</span>
            <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-400 text-sm font-mono tracking-wide uppercase">Websites</span>
            <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-400 text-sm font-mono tracking-wide uppercase">E-Commerce</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-purple/50 to-transparent"></div>
      </section>

      {/* Projects List */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-24 md:space-y-32">
            {filteredProjects.map((project) => (
              <PortfolioProjectBlock key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl font-inter">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Client Trust Section */}
      <section className="relative py-20 md:py-32 bg-brand-purple/5 border-y border-white/10">

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-12 md:mb-16 text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-ubuntu font-bold mb-6 text-white">
              Client Trust
            </h2>
            <p className="text-lg md:text-xl text-gray-300 font-inter">
              Real feedback from businesses we've transformed.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="glass-card p-8 md:p-10 border border-white/10 hover:border-brand-purple/50 transition-all duration-300 group"
              >
                <div className="flex items-start mb-6">
                  <div className="p-3 bg-brand-purple/20 rounded-lg border border-brand-purple/30 group-hover:bg-brand-purple/30 transition-all">
                    <Quote className="w-6 h-6 text-brand-purple" />
                  </div>
                </div>

                <p className="text-gray-300 font-inter text-lg md:text-xl leading-relaxed mb-8">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center">
                  <div className="w-1 h-12 bg-gradient-to-b from-brand-purple to-transparent rounded-full mr-4"></div>
                  <div>
                    <p className="font-ubuntu font-bold text-white text-lg">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
