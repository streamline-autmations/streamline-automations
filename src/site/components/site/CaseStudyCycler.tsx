import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap';
import SplitReveal from '../craft/SplitReveal';
import { EASE_ARR } from '../../lib/motion';
import { FEATURED_PROJECTS } from '../../data/site';

const PROJECTS = FEATURED_PROJECTS;

/**
 * CaseStudyCycler — full-bleed horizontal slides. The section pins to the
 * viewport (any width, desktop and mobile alike) while vertical scroll
 * drives a horizontal translate on the slide track — cheap transform-only
 * tween, no per-project canvas/video swap. Each project fills the entire
 * screen edge-to-edge; scrolling advances one full screen at a time.
 * Reduced-motion gets a static stacked grid — no pin, no horizontal scroll.
 *
 * Pin uses GSAP's default (native position:fixed), same as HeroBuilderScroll
 * and for the same reason: pinType:'transform' forces GSAP to recompute the
 * pin position in JS on every scroll tick instead of letting the browser's
 * compositor handle it for free — on mobile that shows up as visible
 * shake/stutter. Lenis drives real window.scrollTo (and is disabled outright
 * under 768px), so the default pin has nothing to conflict with here.
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
  const scopeRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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
        anticipatePin: 1,
        scrub: 0.6,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const maxX = track.scrollWidth - wrap.clientWidth;
          gsap.set(track, { x: -self.progress * maxX });
        },
      });
      return () => st.kill();
    },
    { scope: scopeRef, dependencies: [enabled, pinSafe] }
  );

  return (
    <section
      ref={scopeRef}
      data-header-dark=""
      aria-label="Featured client work"
      className="relative z-[1] -mt-[2rem] rounded-t-[2rem] bg-site-ink md:-mt-[4rem] md:rounded-t-[4rem]"
    >
      {/* Heading — scrolls in normally, ahead of the pin */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-10 pt-20 sm:flex-row sm:items-end sm:justify-between md:px-10 md:pt-28">
        <SplitReveal
          as="h2"
          segments={[{ text: 'Serious builds, shown properly.' }]}
          className="max-w-[16ch] text-[clamp(32px,5vw,56px)] font-semibold leading-[1.02] tracking-[-0.02em] text-white"
        />
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
          <div ref={trackRef} className="flex h-full w-max will-change-transform">
            {PROJECTS.map((project, i) => (
              <Link
                key={project.href}
                to={project.href}
                data-cursor="view"
                data-cursor-label="View"
                className="relative block h-full w-screen shrink-0"
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
                    className="h-full w-full object-cover transition-transform duration-700 ease-brand hover:scale-[1.03]"
                  />
                ) : (
                  <img
                    src={project.media.src}
                    alt={project.media.alt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-700 ease-brand hover:scale-[1.03]"
                  />
                )}
              </Link>
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
