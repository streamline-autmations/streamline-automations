import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap, useGSAP } from '../../../lib/gsap-setup';
import usePrefersReducedMotion from '../../../hooks/usePrefersReducedMotion';
import { fadeUp, viewport } from '../../../lib/motion';
import type { CaseStudySlide } from '../../../types/case-study';

interface Props {
  slides: CaseStudySlide[];
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// GPU compositing hints applied to every cross-fade layer.
// Promotes each element to its own compositor layer so opacity changes
// never trigger a CPU repaint on the surrounding content.
const COMPOSITED: React.CSSProperties = {
  willChange: 'opacity, transform',
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden',
};

export default function CaseStudyCycler({ slides }: Props) {
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Tracks the displayed index. A separate ref prevents setActiveIndex from
  // being called on every frame — only fires when the integer actually changes.
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const slideCount = slides.length;
  const segments = slideCount - 1;

  useGSAP(
    () => {
      if (reduced) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const images = imageRefs.current.filter(Boolean) as HTMLDivElement[];
        const texts = textRefs.current.filter(Boolean) as HTMLDivElement[];
        if (images.length !== slideCount || texts.length !== slideCount) return;

        // Initial state — only slide 0 visible
        gsap.set([...images.slice(1), ...texts.slice(1)], { opacity: 0 });
        gsap.set([images[0], texts[0]], { opacity: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${segments * 100}%`,
            pin: true,
            // PageTransition wraps every route in a motion.div with
            // will-change:transform, which creates a containing block
            // that breaks position:fixed pinning. Use transform pinning
            // instead — composes correctly inside transformed ancestors.
            pinType: 'transform',
            // Lenis already smooths the scroll (1.2s ease). A numeric scrub
            // would stack a SECOND smoothing pass on top — compounded lag
            // that reads as mushy/laggy. scrub:true links the cross-fade
            // directly to the (already-smoothed) scroll position: responsive
            // and buttery, no double-easing.
            scrub: true,
            // NO snap. ScrollTrigger's snap tweens the scroll position, but
            // Lenis is the one that actually owns scroll — the two fight over
            // it and that tug-of-war is what felt "glitchy", especially when
            // you stop scrolling. Lenis' own easing settles the scroll cleanly.
            // anticipatePin removes the 1-frame flash when the pin engages.
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // Fix #1 — only call setState when the slide integer changes,
            // not on every frame (previously caused 60 re-renders/sec).
            onUpdate: (self) => {
              const idx = Math.min(
                segments,
                Math.max(0, Math.round(self.progress * segments))
              );
              if (idx !== activeIndexRef.current) {
                activeIndexRef.current = idx;
                setActiveIndex(idx);
              }
            },
          },
        });

        // Fix #4 — opacity-only cross-fades, no y translate.
        // Fewer CSS properties animating simultaneously = fewer compositor ops.
        for (let i = 0; i < segments; i++) {
          tl.to(
            [images[i], texts[i]],
            { opacity: 0, duration: 1, ease: 'power1.inOut' },
            i
          ).to(
            [images[i + 1], texts[i + 1]],
            { opacity: 1, duration: 1, ease: 'power1.inOut' },
            i
          );
        }
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [reduced, slideCount] }
  );

  if (reduced) {
    return (
      <section className="relative bg-white py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader />
          <div className="mt-12 grid md:grid-cols-5 gap-10 items-center">
            <div className="md:col-span-2">
              <SlideText slide={slides[0]} />
            </div>
            <div className="md:col-span-3">
              <SlideImage slide={slides[0]} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* DESKTOP — pinned cycler */}
      {/* Fix #5 — translateZ(0) on the pinned section creates a stacking
          context so the browser composites the entire block separately. */}
      <section
        ref={containerRef}
        data-cursor="view"
        className="noise-overlay relative hidden md:block bg-white"
        aria-label="Featured case studies"
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="relative h-[100svh] flex flex-col">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(900px 540px at 70% 40%, rgba(123,63,228,0.07), transparent 65%)',
            }}
          />

          <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-12 w-full flex-1 flex flex-col">
            <SectionHeader />

            <div className="mt-10 grid grid-cols-5 gap-10 items-center flex-1">
              {/* LEFT 60% — text panels stacked */}
              <div className="col-span-3 order-2 md:order-1 relative min-h-[360px]">
                {slides.map((slide, i) => (
                  // Fix #2 — will-change + translateZ promote each panel to
                  // its own GPU layer so opacity changes are composited only.
                  <div
                    key={slide.tag}
                    ref={(el) => (textRefs.current[i] = el)}
                    className="absolute inset-0"
                    style={COMPOSITED}
                  >
                    <SlideText slide={slide} />
                  </div>
                ))}
              </div>

              {/* RIGHT 40% — image panels stacked */}
              <div className="col-span-2 order-1 md:order-2 relative aspect-[4/3]">
                {slides.map((slide, i) => (
                  <div
                    key={slide.tag}
                    ref={(el) => (imageRefs.current[i] = el)}
                    className="absolute inset-0"
                    style={COMPOSITED}
                  >
                    <SlideImage slide={slide} />
                  </div>
                ))}
              </div>
            </div>

            <ProgressIndicator current={activeIndex + 1} total={slideCount} />
          </div>
        </div>
      </section>

      {/* MOBILE — stacked cards */}
      <section className="md:hidden bg-white py-20" aria-label="Featured case studies">
        <div className="max-w-xl mx-auto px-6">
          <SectionHeader />
          <div className="mt-10 space-y-16">
            {slides.map((slide) => (
              <motion.div
                key={slide.tag}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="space-y-6"
              >
                <SlideImage slide={slide} />
                <SlideText slide={slide} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE }}
      className="text-center"
    >
      <span className="block text-[11px] font-['DM_Sans'] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-4">
        Selected work
      </span>
      <h2 className="text-[32px] sm:text-[42px] md:text-[52px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.03em] leading-[1.06] max-w-[20ch] mx-auto">
        Real systems for{' '}
        <span className="font-['Instrument_Serif'] italic font-normal">
          real businesses.
        </span>
      </h2>
    </motion.div>
  );
}

function SlideText({ slide }: { slide: CaseStudySlide }) {
  return (
    <div className="max-w-xl">
      <span className="block text-[11px] font-['DM_Sans'] font-medium uppercase tracking-[0.16em] text-[#7B3FE4]">
        {slide.tag}
      </span>
      <h3
        className="mt-4 text-[28px] sm:text-[32px] md:text-[40px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em] leading-[1.1]"
        dangerouslySetInnerHTML={{
          __html: slide.headline.replace(
            /<em>(.*?)<\/em>/g,
            '<span class="font-[\'Instrument_Serif\'] italic font-normal">$1</span>'
          ),
        }}
      />
      <p className="mt-5 text-[15.5px] md:text-[16.5px] font-['DM_Sans'] text-[#3D3D47] leading-[1.6]">
        {slide.body}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {slide.chips.map((chip) => (
          <li
            key={chip}
            className="text-[11.5px] font-['DM_Sans'] font-medium tracking-[0.01em] text-[#4C1D95] bg-[#F0EBFF] border border-[#E8E0FF] rounded-full px-3 py-1"
          >
            {chip}
          </li>
        ))}
      </ul>

      <Link
        to={slide.link.href}
        className="group mt-7 inline-flex items-center gap-1.5 text-sm font-['DM_Sans'] font-medium text-[#0A0A0F] hover:text-[#7B3FE4] transition-colors duration-200"
      >
        {slide.link.label}
        <span className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>
  );
}

function SlideImage({ slide }: { slide: CaseStudySlide }) {
  return (
    // Fix #3 — shadow lives on a static wrapper that is never animated.
    // Previously the shadow was on the element being opacity-tweened, which
    // forced a CPU repaint on every frame. This wrapper stays opaque always.
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#F5F5F7] border border-[#E8E8EC]">
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        style={{
          boxShadow: '0 30px 80px -20px rgba(76,29,149,0.25), 0 10px 30px -10px rgba(0,0,0,0.08)',
        }}
      />
      <img
        src={slide.imageSrc}
        alt={slide.imageAlt}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover select-none"
      />
    </div>
  );
}

function ProgressIndicator({ current, total }: { current: number; total: number }) {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return (
    <div className="mt-8 flex items-center justify-center gap-4 text-[12px] font-['DM_Sans'] font-medium tracking-[0.12em] uppercase text-[#6B6B7A]">
      <span className="text-[#0A0A0F] tabular-nums">{pad(current)}</span>
      <div className="flex items-center gap-1.5" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-px transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              i < current ? 'bg-[#7B3FE4] w-8' : 'bg-[#D4D4DA] w-4'
            }`}
          />
        ))}
      </div>
      <span className="tabular-nums">{pad(total)}</span>
    </div>
  );
}
