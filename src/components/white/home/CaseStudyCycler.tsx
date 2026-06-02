import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger, useGSAP } from '../../../lib/gsap-setup';
import usePrefersReducedMotion from '../../../hooks/usePrefersReducedMotion';
import { fadeUp, viewport } from '../../../lib/motion';
import type { CaseStudySlide } from '../../../types/case-study';

interface Props {
  slides: CaseStudySlide[];
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function CaseStudyCycler({ slides }: Props) {
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const railRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // The displayed slide. Updated only when the integer changes — the crisp
  // flip happens at each segment midpoint while the rail fills continuously,
  // so it reads as "loader fills → snap to the next slide".
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const slideCount = slides.length;
  const segments = slideCount - 1;

  useGSAP(
    () => {
      if (reduced) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const rails = railRefs.current.filter(Boolean) as HTMLSpanElement[];
        gsap.set(rails, { scaleX: 0 });

        const st = ScrollTriggerPin(containerRef.current!, segments, (pos) => {
          const idx = Math.min(segments, Math.max(0, Math.round(pos)));
          if (idx !== activeIndexRef.current) {
            activeIndexRef.current = idx;
            setActiveIndex(idx);
          }
          for (let i = 0; i < rails.length; i++) {
            const fill = Math.min(1, Math.max(0, pos - i));
            rails[i].style.transform = `scaleX(${fill})`;
          }
        });

        return () => st.kill();
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [reduced, slideCount] }
  );

  if (reduced) {
    return (
      <section className="relative bg-[#FAFAFA] py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1000px] px-8">
          <Header />
          <div className="mt-14 grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
            <Mockup slide={slides[0]} />
            <Detail slide={slides[0]} index={0} total={slideCount} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* DESKTOP — pinned, one-slide-per-scroll flip */}
      <section
        ref={containerRef}
        data-cursor="view"
        className="relative hidden bg-[#FAFAFA] md:block"
        aria-label="Featured case studies"
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="relative flex h-[100svh] flex-col justify-center overflow-hidden">
          <div className="relative mx-auto flex w-full max-w-[1000px] flex-1 flex-col px-8 pb-16 pt-24">
            <Header />

            <div className="mt-10 grid flex-1 items-center gap-[clamp(40px,6vw,90px)] md:grid-cols-[1.05fr_0.95fr]">
              {/* LEFT — mockup frames stacked, crisp cross-fade by index */}
              <div className="relative aspect-[4/3]">
                {slides.map((slide, i) => (
                  <div
                    key={slide.tag}
                    className="absolute inset-0"
                    style={{
                      opacity: i === activeIndex ? 1 : 0,
                      transition: 'opacity 0.55s cubic-bezier(0.22,1,0.36,1)',
                      willChange: 'opacity',
                    }}
                  >
                    <Mockup slide={slide} />
                  </div>
                ))}
              </div>

              {/* RIGHT — detail panels stacked */}
              <div className="relative min-h-[340px]">
                {slides.map((slide, i) => (
                  <div
                    key={slide.tag}
                    className="absolute inset-0"
                    style={{
                      opacity: i === activeIndex ? 1 : 0,
                      transform: i === activeIndex ? 'translateY(0)' : 'translateY(12px)',
                      transition:
                        'opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)',
                      pointerEvents: i === activeIndex ? 'auto' : 'none',
                      willChange: 'opacity, transform',
                    }}
                  >
                    <Detail slide={slide} index={i} total={slideCount} live={activeIndex} />
                  </div>
                ))}
              </div>
            </div>

            {/* progress rail — one segment per slide, fills with scroll */}
            <div className="mt-10 flex gap-2.5" aria-hidden="true">
              {Array.from({ length: slideCount }).map((_, i) => (
                <span
                  key={i}
                  className="relative h-0.5 flex-1 overflow-hidden rounded-sm bg-[#E8E8EC]"
                >
                  <span
                    ref={(el) => (railRefs.current[i] = el)}
                    className="absolute inset-0 origin-left bg-[#7B3FE4]"
                    style={{ transform: 'scaleX(0)' }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE — stacked cards */}
      <section className="bg-[#FAFAFA] py-20 md:hidden" aria-label="Featured case studies">
        <div className="mx-auto w-full max-w-xl px-6">
          <Header />
          <div className="mt-12 space-y-16">
            {slides.map((slide, i) => (
              <motion.div
                key={slide.tag}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="space-y-7"
              >
                <Mockup slide={slide} />
                <Detail slide={slide} index={i} total={slideCount} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Pins the section for `segments` viewport-heights and reports a continuous
 * position (0 → segments) on every scroll frame. One viewport of scroll ≈ one
 * slide. Transform pinning composes inside PageTransition's transformed
 * wrapper; no scrub/snap (which fight Lenis).
 */
function ScrollTriggerPin(
  trigger: HTMLElement,
  segments: number,
  onPos: (pos: number) => void
) {
  return ScrollTrigger.create({
    trigger,
    start: 'top top',
    end: `+=${segments * 100}%`,
    pin: true,
    pinType: 'transform',
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => onPos(self.progress * segments),
  });
}

function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <span className="block font-['JetBrains_Mono'] text-[12px] font-medium uppercase tracking-[0.22em] text-[#7B3FE4]">
        Selected work
      </span>
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className="mt-3 block h-px w-12 origin-left bg-[#7B3FE4]"
      />
      <h2
        className="mt-5 font-['DM_Sans'] font-bold leading-[1.0] tracking-[-0.025em] text-[#0A0A0F]"
        style={{ fontSize: 'clamp(34px, 5vw, 72px)' }}
      >
        Selected work.{' '}
        <span className="font-['Instrument_Serif'] italic font-normal text-[#7B3FE4]">
          All real.
        </span>
      </h2>
    </motion.div>
  );
}

/** Browser-chrome device frame wrapping a real client screenshot. */
function Mockup({ slide }: { slide: CaseStudySlide }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[20px] border border-[#E8E8EC] bg-[#F5F5F7] shadow-[0_30px_70px_rgba(13,8,32,0.10)]">
      <img
        src={slide.imageSrc}
        alt={slide.imageAlt}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 h-full w-full select-none object-cover object-top"
      />
      <div className="absolute inset-x-0 top-0 z-10 flex h-9 items-center gap-1.5 border-b border-white/40 bg-white/55 px-4 backdrop-blur-sm">
        <span className="h-2.5 w-2.5 rounded-full bg-[#D4D4DA]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#D4D4DA]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#D4D4DA]" />
      </div>
    </div>
  );
}

function Detail({
  slide,
  index,
  total,
  live,
}: {
  slide: CaseStudySlide;
  index: number;
  total: number;
  live?: number;
}) {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const current = live !== undefined ? live + 1 : index + 1;

  return (
    <div className="max-w-[440px]">
      <div className="mb-7 font-['JetBrains_Mono'] text-[13px] tracking-[0.16em] text-[#9E9EA8]">
        <span className="text-[#7B3FE4]">{pad(current)}</span> / {pad(total)}
      </div>

      <ul className="mb-5 flex flex-wrap gap-2">
        {slide.chips.map((chip) => (
          <li
            key={chip}
            className="rounded-full border border-[#E8E8EC] px-3.5 py-[7px] font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.1em] text-[#6B6B7A]"
          >
            {chip}
          </li>
        ))}
      </ul>

      <h3
        className="font-['DM_Sans'] font-bold leading-[1.0] tracking-[-0.025em] text-[#0A0A0F]"
        dangerouslySetInnerHTML={{
          __html: slide.headline.replace(
            /<em>(.*?)<\/em>/g,
            '<span class="font-[\'Instrument_Serif\'] italic font-normal text-[#7B3FE4]">$1</span>'
          ),
        }}
        style={{ fontSize: 'clamp(30px, 4.2vw, 54px)' }}
      />

      <p className="mt-5 max-w-[420px] font-['DM_Sans'] text-[17px] leading-[1.5] text-[#3D3D47]">
        {slide.body}
      </p>

      <Link
        to={slide.link.href}
        className="group mt-8 inline-flex items-center gap-2.5 font-['DM_Sans'] text-[16px] font-semibold text-[#0A0A0F]"
      >
        {slide.link.label.replace(/\s*→\s*$/, '')}
        <span className="text-[#7B3FE4] transition-transform duration-[400ms] group-hover:translate-x-1.5">
          →
        </span>
      </Link>
    </div>
  );
}
