import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ScrollTrigger, useGSAP } from '../../lib/gsap';
import Tag from '../craft/Tag';
import SplitReveal from '../craft/SplitReveal';
import FillButton from '../craft/FillButton';
import { EASE_ARR } from '../../lib/motion';
import { FEATURED_PROJECTS } from '../../data/site';

const PROJECTS = FEATURED_PROJECTS;

const slideVariants = {
  enter: { opacity: 0, y: 28 },
  center: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_ARR } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: EASE_ARR } },
};

const mediaVariants = {
  enter: { opacity: 0, scale: 0.96 },
  center: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_ARR } },
  exit: { opacity: 0, scale: 1.03, transition: { duration: 0.35, ease: EASE_ARR } },
};

/**
 * CaseStudyCycler — pinned GSAP scroll on desktop: the layout locks to the
 * viewport while the user scrolls through 4 projects. Text + media cross-fade
 * between projects as scroll progress advances. On mobile / reduced-motion it
 * renders as a clean stacked grid — no pin, no WebGL.
 *
 * Pin uses pinType:'transform' to play nice with Lenis + the overflow-x root.
 */
export default function CaseStudyCycler() {
  const [enhanced, setEnhanced] = useState(false);
  const [active, setActive] = useState(0);
  const scopeRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnhanced(desktop && !reduce);
  }, []);

  useGSAP(
    () => {
      if (!enhanced || !pinRef.current) return;
      const st = ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: '+=' + PROJECTS.length * 480,
        pin: pinRef.current,
        pinType: 'transform',
        onUpdate: (self) => {
          const i = Math.min(PROJECTS.length - 1, Math.floor(self.progress * PROJECTS.length));
          setActive((cur) => (cur === i ? cur : i));
        },
      });
      return () => st.kill();
    },
    { scope: scopeRef, dependencies: [enhanced] }
  );

  return (
    <section
      ref={scopeRef}
      data-header-dark=""
      aria-label="Featured client work"
      className="bg-site-ink"
    >
      {/* ── Desktop pinned cycler ── */}
      {enhanced && (
        <div
          ref={pinRef}
          className="relative hidden min-h-[100svh] w-full flex-col justify-center overflow-hidden px-10 py-24 md:flex"
        >
          {/* Background ambient */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 left-[10%] h-[500px] w-[500px] rounded-full bg-site-accent opacity-[0.06] blur-[140px]" />
            <div className="absolute -bottom-32 right-[8%] h-[420px] w-[420px] rounded-full bg-[#5b2bd6] opacity-[0.05] blur-[140px]" />
          </div>

          <div className="relative mx-auto grid w-full max-w-6xl grid-cols-[1fr_1fr] items-center gap-16">
            {/* Left — text */}
            <div className="flex flex-col">
              <Tag variant="outline-dark" className="mb-8 w-fit">
                Featured work
              </Tag>

              {/* Progress dots */}
              <div className="mb-10 flex gap-2" aria-hidden="true">
                {PROJECTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-[3px] rounded-full transition-all duration-500 ease-brand ${
                      i === active ? 'w-8 bg-site-accent' : 'w-3 bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.2em] text-site-accent">
                    Project / {PROJECTS[active].no}
                  </span>
                  <h2 className="text-[clamp(36px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.03em] text-white">
                    {PROJECTS[active].name}
                  </h2>
                  <p className="mt-5 max-w-[42ch] text-[16px] leading-[1.65] text-white/65">
                    {PROJECTS[active].outcome}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {PROJECTS[active].tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1.5 text-[12px] text-white/55"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-9">
                    <FillButton to={PROJECTS[active].href} variant="on-dark">
                      View project
                    </FillButton>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right — media */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                variants={mediaVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-white/10"
              >
                {PROJECTS[active].media.type === 'video' ? (
                  <video
                    src={PROJECTS[active].media.src}
                    poster={(PROJECTS[active].media as { poster?: string }).poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-label={PROJECTS[active].media.alt}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={PROJECTS[active].media.src}
                    alt={PROJECTS[active].media.alt}
                    loading="lazy"
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                )}
                {/* Subtle vignette */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,15,0.4)_0%,transparent_50%)]" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            aria-hidden="true"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                Scroll
              </span>
              <div className="h-8 w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      )}

      {/* ── Mobile / reduced-motion fallback: stacked grid ── */}
      <div className={`px-6 py-20 ${enhanced ? 'md:hidden' : ''}`}>
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-12">
            <Tag variant="outline-dark" className="mb-6">
              Featured work
            </Tag>
            <SplitReveal
              as="h2"
              segments={[{ text: 'Serious builds,' }, { text: 'shown properly', serif: true }, { text: '.' }]}
              className="max-w-[18ch] text-[clamp(32px,6vw,56px)] font-semibold leading-[1.02] tracking-[-0.02em] text-white"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {PROJECTS.map((project, i) => (
              <motion.article
                key={project.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE_ARR, delay: i * 0.08 }}
              >
                <Link
                  to={project.href}
                  data-cursor="view"
                  data-cursor-label="View"
                  className="group block overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.035] outline-none transition-[border-color,background-color] duration-300 ease-brand hover:border-site-accent/50 hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-site-accent"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {project.media.type === 'video' ? (
                      <video
                        src={project.media.src}
                        poster={(project.media as { poster?: string }).poster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="none"
                        className="h-full w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.04]"
                      />
                    ) : (
                      <img
                        src={project.media.src}
                        alt={project.media.alt}
                        loading="lazy"
                        draggable={false}
                        className="h-full w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.04]"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-site-accent">
                      {project.no}
                    </span>
                    <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.02em] text-white">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.55] text-white/60">{project.outcome}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/portfolio"
              className="text-[14px] font-medium text-white/60 underline-offset-4 hover:text-white hover:underline"
            >
              All work →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
