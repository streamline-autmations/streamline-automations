import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap';
import SplitReveal from '../craft/SplitReveal';
import { FEATURED_PROJECTS, type ProjectMedia } from '../../data/site';

// Widen media to the ProjectMedia contract — the data is `as const`, which narrows
// every entry to 'image' and makes the video branch below look unreachable.
type FeaturedProject = Omit<(typeof FEATURED_PROJECTS)[number], 'media'> & { media: ProjectMedia };
const PROJECTS: readonly FeaturedProject[] = FEATURED_PROJECTS;

/**
 * CaseStudyCycler — horizontal filmstrip of cards. The section pins to the
 * viewport (any width, desktop and mobile alike) while vertical scroll
 * drives a horizontal translate on the slide track — cheap transform-only
 * tween, no per-project canvas/video swap. Cards are sized under the
 * viewport (not edge-to-edge) with a generous gap between them, so the next
 * card clearly peeks in at the edge as you scroll. Cards read as clean,
 * unlabelled images by default — the name + one-line label only appear on
 * hover (fine pointer) or tap (coarse pointer; first tap reveals, second
 * tap navigates). No numbers/tags/buttons ever.
 * Reduced-motion keeps the same filmstrip at the same scale but drops the pin
 * and the scrub: it becomes a hand-scrolled snap track with visible captions.
 * ("Skip the choreography", not "serve the small mobile layout".)
 *
 * Pin uses GSAP's default (native position:fixed), same as HeroBuilderScroll
 * and for the same reason: pinType:'transform' forces GSAP to recompute the
 * pin position in JS on every scroll tick instead of letting the browser's
 * compositor handle it for free — on mobile that shows up as visible
 * shake/stutter. Lenis drives real window.scrollTo (and is disabled outright
 * under 768px), so the default pin has nothing to conflict with here.
 * anticipatePin:1 removes the small jump/snap the instant a pin engages — but
 * only with native scroll (mobile). Under Lenis (desktop) scroll already runs
 * on the main thread in lockstep with ScrollTrigger, so anticipating makes the
 * pin engage ~30px early and snap; it's switched off there.
 */
export default function CaseStudyCycler() {
  const [enabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  // Coarse pointers have no hover — the caption is revealed by tap instead.
  // First tap on a card shows its caption (and is swallowed); tapping the
  // same card again lets the Link navigate normally.
  const [isCoarse] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  // NB: this used to wait for the canvas hero's "hero-pin-ready" signal (its
  // frame preload changed the page height under our pin). That hero was
  // archived when Home went text-only, so nothing fired the signal anymore
  // and the pin only appeared after an 8s fallback timer — reach the section
  // sooner and you scrolled straight past frozen cards, then got snapped
  // back into the late-created pin on the way up. The layout is static now:
  // pin immediately on mount.
  const scopeRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!enabled || !wrapRef.current || !trackRef.current) return;
      const wrap = wrapRef.current;
      const track = trackRef.current;
      // Mirrors LenisProvider: Lenis only runs above 768px.
      const nativeScroll = window.matchMedia('(max-width: 768px)').matches;

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
        anticipatePin: nativeScroll ? 1 : 0,
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
    { scope: scopeRef, dependencies: [enabled] }
  );

  return (
    <section
      ref={scopeRef}
      data-header-dark=""
      aria-label="Featured client work"
      className="relative z-[1] -mt-[2rem] rounded-t-[2rem] bg-site-ink md:-mt-[4rem] md:rounded-t-[4rem]"
    >
      {enabled ? (
        /* The whole 100svh viewport pins as one unit — heading at the top,
           card track filling the rest. Keeping the heading INSIDE the pin
           means the title stays on screen for the entire scrub instead of
           scrolling away and leaving a dead gap above the cards. */
        <div
          ref={wrapRef}
          className="relative flex h-[100svh] max-h-[100svh] w-full flex-col overflow-hidden"
        >
          <div className="mx-auto flex w-full max-w-6xl shrink-0 flex-col gap-4 px-6 pb-6 pt-28 sm:flex-row sm:items-end sm:justify-between md:px-10 md:pb-10 md:pt-32">
            <SplitReveal
              as="h2"
              segments={[{ text: 'Featured projects' }]}
              className="max-w-[16ch] text-[clamp(42px,7vw,88px)] font-semibold leading-[1.0] tracking-[-0.03em] text-white"
            />
            <Link
              to="/portfolio"
              className="shrink-0 text-[14px] font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
            >
              All work →
            </Link>
          </div>

          <div className="min-h-0 flex-1">
            <div
              ref={trackRef}
              className="flex h-full w-max items-center gap-10 px-4 pb-10 will-change-transform md:gap-28 md:px-16 md:pb-12"
            >
            {PROJECTS.map((project, i) => {
              const revealed = isCoarse ? activeIdx === i : undefined;
              return (
                <Link
                  key={project.href}
                  to={project.href}
                  data-cursor="view"
                  data-cursor-label="Explore"
                  onClick={(e) => {
                    if (isCoarse && activeIdx !== i) {
                      e.preventDefault();
                      setActiveIdx(i);
                    }
                  }}
                  className="group relative block aspect-[16/10] h-auto max-h-full w-[92vw] shrink-0 overflow-hidden rounded-[24px] sm:w-[76vw] md:aspect-auto md:h-full md:w-[62vw] lg:w-[52vw]"
                >
                  {/* object-cover full-bleed — the cover-wide crops are dense
                      top-view mockups made to be cropped, so every card reads
                      as a Cuberto-style case cover with no dead margins. */}
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
                      className="h-full w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.03]"
                    />
                  ) : (
                    <img
                      src={project.media.src}
                      alt={project.media.alt}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      draggable={false}
                      className="h-full w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.03]"
                    />
                  )}

                  {/* Caption stays hidden until hover (fine pointer) or tap
                      (coarse pointer) — cards read as clean, unlabelled
                      images until the visitor shows intent to look closer. */}
                  <div
                    className={`pointer-events-none absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-black/75 via-black/25 to-transparent transition-opacity duration-300 ease-brand ${
                      revealed === undefined
                        ? 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
                        : revealed
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  />
                  <div
                    className={`pointer-events-none absolute inset-x-0 bottom-0 p-5 transition-opacity duration-300 ease-brand md:p-6 ${
                      revealed === undefined
                        ? 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
                        : revealed
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  >
                    <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-white md:text-[22px]">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-[13px] text-white/65 md:text-[13.5px]">{project.label}</p>
                  </div>
                </Link>
              );
            })}
            </div>
          </div>
        </div>
      ) : (
        /* ── Reduced-motion: the SAME filmstrip, scrolled by hand ──
           Reduced motion means "skip the choreography", not "serve the small
           mobile layout": the desktop composition survives — full-bleed case
           covers at the same scale, swiped/scrolled horizontally with snap
           points instead of scrubbed by a pin. Captions sit visible, since
           there's no hover reveal to depend on. */
        <div className="pb-24">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 pb-10 pt-28 sm:flex-row sm:items-end sm:justify-between md:px-10 md:pb-12 md:pt-32">
            <SplitReveal
              as="h2"
              segments={[{ text: 'Featured projects' }]}
              className="max-w-[16ch] text-[clamp(42px,7vw,88px)] font-semibold leading-[1.0] tracking-[-0.03em] text-white"
            />
            <Link
              to="/portfolio"
              className="shrink-0 text-[14px] font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
            >
              All work →
            </Link>
          </div>

          <div className="snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max items-stretch gap-6 px-6 md:gap-10 md:px-10">
              {PROJECTS.map((project) => (
                <Link
                  key={project.href}
                  to={project.href}
                  data-cursor="view"
                  data-cursor-label="Explore"
                  className="group relative block aspect-[16/10] w-[86vw] shrink-0 snap-center overflow-hidden rounded-[24px] outline-none focus-visible:ring-2 focus-visible:ring-site-accent sm:w-[70vw] md:w-[58vw] lg:w-[46vw]"
                >
                  {project.media.type === 'video' ? (
                    <video
                      src={project.media.src}
                      poster={(project.media as { poster?: string }).poster}
                      muted
                      loop
                      playsInline
                      preload="none"
                      aria-label={project.media.alt}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src={project.media.src}
                      alt={project.media.alt}
                      loading="lazy"
                      draggable={false}
                      className="h-full w-full object-cover"
                    />
                  )}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-white md:text-[22px]">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-[13px] text-white/65 md:text-[13.5px]">{project.label}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
