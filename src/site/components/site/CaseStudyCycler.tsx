import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap';
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
 * between projects as scroll progress advances. On mobile it pins too, but
 * drives a horizontal slide (scroll down → cards move sideways) instead —
 * cheap transform-only tween, no per-project canvas/video cost. Reduced-motion
 * (any width) gets a static stacked grid — no pin at all.
 *
 * Pin uses pinType:'transform' to play nice with Lenis + the overflow-x root.
 * anticipatePin:1 removes the small jump/snap the instant a pin engages.
 */
export default function CaseStudyCycler() {
  // Determine desktop/mobile/motion support synchronously so the correct
  // layout renders on the first paint — avoids a flash of the wrong variant.
  const [{ desktop, mobile }] = useState(() => {
    if (typeof window === 'undefined') return { desktop: false, mobile: false };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktopWidth = window.matchMedia('(min-width: 768px)').matches;
    return { desktop: isDesktopWidth && !reduced, mobile: !isDesktopWidth && !reduced };
  });
  const [active, setActive] = useState(0);
  const [mobileActive, setMobileActive] = useState(0);
  const scopeRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const mobileWrapRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!desktop || !pinRef.current) return;
      const st = ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: '+=' + PROJECTS.length * 100 + '%',
        pin: pinRef.current,
        pinType: 'transform',
        anticipatePin: 1,
        onUpdate: (self) => {
          const i = Math.min(PROJECTS.length - 1, Math.floor(self.progress * PROJECTS.length));
          setActive((cur) => (cur === i ? cur : i));
        },
      });
      // Fonts finishing their swap can shift text height slightly after the
      // trigger's start position was first measured — refresh once they're
      // ready so the pin doesn't visually "jump" on the first scroll into it.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return () => st.kill();
    },
    { scope: scopeRef, dependencies: [desktop] }
  );

  useGSAP(
    () => {
      if (!mobile || !mobileWrapRef.current || !mobileTrackRef.current) return;
      const wrap = mobileWrapRef.current;
      const track = mobileTrackRef.current;
      const st = ScrollTrigger.create({
        trigger: wrap,
        start: 'top top',
        end: '+=' + PROJECTS.length * 100 + '%',
        pin: wrap,
        pinType: 'transform',
        anticipatePin: 1,
        onUpdate: (self) => {
          const w = wrap.clientWidth;
          gsap.set(track, { x: -self.progress * (PROJECTS.length - 1) * w });
          const i = Math.min(
            PROJECTS.length - 1,
            Math.round(self.progress * (PROJECTS.length - 1))
          );
          setMobileActive((cur) => (cur === i ? cur : i));
        },
      });
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return () => st.kill();
    },
    { scope: scopeRef, dependencies: [mobile] }
  );

  return (
    <section
      ref={scopeRef}
      data-header-dark=""
      aria-label="Featured client work"
      className="relative z-[1] -mt-[2rem] rounded-t-[2rem] bg-site-ink md:-mt-[4rem] md:rounded-t-[4rem]"
    >
      {/* ── Desktop pinned cycler ── */}
      {desktop && (
        <div
          ref={pinRef}
          className="relative hidden h-[100svh] max-h-[100svh] w-full flex-col justify-center overflow-hidden px-10 py-12 md:flex lg:py-16"
        >
          {/* Background ambient */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 left-[10%] h-[500px] w-[500px] rounded-full bg-site-accent opacity-[0.06] blur-[140px]" />
            <div className="absolute -bottom-32 right-[8%] h-[420px] w-[420px] rounded-full bg-[#5b2bd6] opacity-[0.05] blur-[140px]" />
          </div>

          <div className="relative mx-auto grid w-full max-w-6xl grid-cols-[1fr_1fr] items-center gap-16">
            {/* Left — text */}
            <div className="flex flex-col">
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
                className="relative aspect-[3/2] max-h-[52vh] overflow-hidden rounded-[28px] border border-white/10 lg:max-h-[58vh]"
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

        </div>
      )}

      {/* ── Mobile pinned cycler: scroll down drives a horizontal slide ── */}
      {mobile && (
        <div
          ref={mobileWrapRef}
          className="relative flex h-[100svh] max-h-[100svh] w-full flex-col justify-center overflow-hidden py-10 md:hidden"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 left-[6%] h-[280px] w-[280px] rounded-full bg-site-accent opacity-[0.07] blur-[100px]" />
          </div>

          <div className="relative mb-6 flex items-center justify-between px-6" aria-hidden="true">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-site-accent">
              Project / {PROJECTS[mobileActive].no}
            </span>
            <div className="flex gap-2">
              {PROJECTS.map((_, i) => (
                <span
                  key={i}
                  className={`h-[3px] rounded-full transition-all duration-500 ease-brand ${
                    i === mobileActive ? 'w-6 bg-site-accent' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div ref={mobileTrackRef} className="flex will-change-transform">
              {PROJECTS.map((project) => (
                <div key={project.href} className="w-full shrink-0 px-6">
                  <Link
                    to={project.href}
                    data-cursor="view"
                    data-cursor-label="View"
                    className="group block overflow-hidden rounded-[22px] border border-white/10"
                  >
                    <div className="relative aspect-[4/5] max-h-[46vh] overflow-hidden bg-white/[0.035]">
                      {project.media.type === 'video' ? (
                        <video
                          src={project.media.src}
                          poster={(project.media as { poster?: string }).poster}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="none"
                          aria-label={project.media.alt}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <img
                          src={
                            (project.media as { mobileFallback?: string }).mobileFallback ??
                            project.media.src
                          }
                          alt={project.media.alt}
                          loading={project.no === PROJECTS[0].no ? 'eager' : 'lazy'}
                          draggable={false}
                          // mobileFallback assets are full phone-screenshot portraits
                          // (~9:19.5) — object-contain guarantees nothing is cropped
                          // instead of forcing them into a landscape crop.
                          className="h-full w-full object-contain"
                        />
                      )}
                    </div>
                  </Link>
                  <h3 className="mt-5 text-[24px] font-semibold leading-[1.05] tracking-[-0.02em] text-white">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.55] text-white/65">{project.outcome}</p>
                  <div className="mt-5">
                    <FillButton to={project.href} variant="on-dark">
                      View project
                    </FillButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Reduced-motion fallback: static stacked grid, no pin ── */}
      <div className={`px-6 py-20 ${desktop || mobile ? 'hidden' : ''}`}>
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-12">
            <SplitReveal
              as="h2"
              segments={[{ text: 'Serious builds, shown properly.' }]}
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
