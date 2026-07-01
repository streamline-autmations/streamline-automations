import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap';
import SplitReveal from '../craft/SplitReveal';
import FillButton from '../craft/FillButton';
import { EASE_ARR } from '../../lib/motion';
import { FEATURED_PROJECTS } from '../../data/site';

const PROJECTS = FEATURED_PROJECTS;

/**
 * CaseStudyCycler — horizontal filmstrip. The section pins to the viewport
 * (any width, desktop and mobile alike) while vertical scroll drives a
 * horizontal translate on the card track — cheap transform-only tween, no
 * per-project canvas/video swap. Cards are sized so the next one peeks in at
 * the edge (filmstrip feel, not one-at-a-time). Reduced-motion gets a static
 * wrapped grid — no pin, no horizontal scroll at all.
 *
 * Pin uses pinType:'transform' to play nice with Lenis + the overflow-x root.
 * anticipatePin:1 removes the small jump/snap the instant a pin engages.
 */
export default function CaseStudyCycler() {
  const [enabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  // The hero above pins itself only once its frame sequence finishes
  // preloading, and only then does the page reach its true (much taller)
  // height. If we create our own ScrollTrigger before that, it caches a
  // start/end against the short pre-hero layout — a fast scroller can reach
  // this section while that's still true, and since refreshing mid-pin
  // doesn't safely correct it, the whole cycler stays permanently stuck
  // (looks like a big dead gap, cards frozen mid-track). So: wait for the
  // hero's "I've pinned and the layout is now final" signal before creating
  // ours. The window flag covers the case where that already fired before
  // this effect attached its listener (fast/cached preload).
  const [pinSafe, setPinSafe] = useState(
    () => typeof window !== 'undefined' && (window as unknown as { __heroPinReady?: boolean }).__heroPinReady === true
  );
  useEffect(() => {
    if (pinSafe) return;
    const onReady = () => setPinSafe(true);
    window.addEventListener('hero-pin-ready', onReady);
    // Safety net: pages/situations where the hero never fires this (e.g. it
    // errors out) shouldn't leave this section dead forever.
    const fallback = window.setTimeout(() => setPinSafe(true), 8000);
    return () => {
      window.removeEventListener('hero-pin-ready', onReady);
      window.clearTimeout(fallback);
    };
  }, [pinSafe]);
  const [active, setActive] = useState(0);
  const scopeRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      if (!enabled || !pinSafe || !wrapRef.current || !trackRef.current) return;
      const wrap = wrapRef.current;
      const track = trackRef.current;

      const st = ScrollTrigger.create({
        trigger: wrap,
        start: 'top top',
        // Fixed scroll distance (vh multiples), NOT the raw pixel overflow —
        // the overflow between card track and viewport is often only a few
        // hundred px, which a single scroll flick blows straight through,
        // making the whole pin feel broken/instant. Scaling by project count
        // guarantees a deliberate, controllable scroll length regardless of
        // how little the cards actually overflow.
        end: '+=' + PROJECTS.length * 100 + '%',
        pin: wrap,
        pinType: 'transform',
        anticipatePin: 1,
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const maxX = track.scrollWidth - wrap.clientWidth;
          gsap.set(track, { x: -self.progress * maxX });
          const i = Math.min(
            PROJECTS.length - 1,
            Math.round(self.progress * (PROJECTS.length - 1))
          );
          setActive((cur) => (cur === i ? cur : i));
        },
      });
      stRef.current = st;
      return () => {
        st.kill();
        stRef.current = null;
      };
    },
    { scope: scopeRef, dependencies: [enabled, pinSafe] }
  );

  const goTo = (i: number) => {
    const st = stRef.current;
    if (!st) return;
    const progress = i / (PROJECTS.length - 1);
    const target = st.start + progress * (st.end - st.start);
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <section
      ref={scopeRef}
      data-header-dark=""
      aria-label="Featured client work"
      className="relative z-[1] -mt-[2rem] rounded-t-[2rem] bg-site-ink md:-mt-[4rem] md:rounded-t-[4rem]"
    >
      {/* Ambient glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-[10%] h-[500px] w-[500px] rounded-full bg-site-accent opacity-[0.06] blur-[140px]" />
        <div className="absolute -bottom-32 right-[8%] h-[420px] w-[420px] rounded-full bg-[#5b2bd6] opacity-[0.05] blur-[140px]" />
      </div>

      {/* Heading — scrolls in normally, ahead of the pin */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-10 pt-20 sm:flex-row sm:items-end sm:justify-between md:px-10 md:pt-28">
        <div>
          <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.2em] text-site-accent">
            Selected work
          </span>
          <SplitReveal
            as="h2"
            segments={[{ text: 'Serious builds, shown properly.' }]}
            className="max-w-[16ch] text-[clamp(32px,5vw,56px)] font-semibold leading-[1.02] tracking-[-0.02em] text-white"
          />
        </div>
        <Link
          to="/portfolio"
          className="shrink-0 text-[14px] font-medium text-white/60 underline-offset-4 hover:text-white hover:underline"
        >
          All work →
        </Link>
      </div>

      {enabled ? (
        <div
          ref={wrapRef}
          className="relative h-[100svh] max-h-[100svh] w-full overflow-hidden"
        >
          <div className="flex h-full flex-col justify-center">
            <div ref={trackRef} className="flex w-max gap-5 will-change-transform pl-6 md:gap-8 md:pl-10">
              {PROJECTS.map((project, i) => (
                <div key={project.href} className="group w-[78vw] shrink-0 sm:w-[56vw] md:w-[42vw] lg:w-[34vw] xl:w-[30vw]">
                  <Link
                    to={project.href}
                    data-cursor="view"
                    data-cursor-label="View"
                    className="relative block aspect-[4/3] overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.035] transition-[border-color,background-color] duration-300 ease-brand group-hover:border-site-accent/50 group-hover:bg-white/[0.06]"
                  >
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
                        className="h-full w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.04]"
                      />
                    ) : (
                      <img
                        src={project.media.src}
                        alt={project.media.alt}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        draggable={false}
                        className="h-full w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.04]"
                      />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,15,0.45)_0%,transparent_55%)]" />
                    <span className="absolute left-4 top-4 font-mono text-[11px] uppercase tracking-[0.2em] text-site-accent">
                      Project / {project.no}
                    </span>
                  </Link>
                  <h3 className="mt-6 text-[22px] font-semibold leading-[1.05] tracking-[-0.02em] text-white md:text-[26px]">
                    {project.name}
                  </h3>
                  <p className="mt-2 max-w-[38ch] text-[14px] leading-[1.55] text-white/65">
                    {project.outcome}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5">
                    <FillButton to={project.href} variant="on-dark">
                      View project
                    </FillButton>
                  </div>
                </div>
              ))}
              {/* Trailing spacer mirrors the leading pl-* inset so the last card can reach it */}
              <div className="w-1 shrink-0 md:w-4" aria-hidden="true" />
            </div>
          </div>

          {/* Progress dots */}
          <div className="pointer-events-auto absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2 md:bottom-10">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`h-[3px] rounded-full transition-all duration-500 ease-brand ${
                  i === active ? 'w-8 bg-site-accent' : 'w-3 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* ── Reduced-motion fallback: static stacked grid, no pin ── */
        <div className="px-6 pb-20 md:px-10">
          <div className="mx-auto w-full max-w-6xl">
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
          </div>
        </div>
      )}
    </section>
  );
}
