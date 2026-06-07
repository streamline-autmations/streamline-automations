import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap, useGSAP } from '../../../lib/gsap-setup';
import usePrefersReducedMotion from '../../../hooks/usePrefersReducedMotion';
import { fadeUp, viewport } from '../../../lib/motion';
import type { AutomationStage } from '../../../types/case-study';

interface Props {
  stages: AutomationStage[];
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// GPU compositing hints for every cross-fade layer.
const COMPOSITED: React.CSSProperties = {
  willChange: 'opacity, transform',
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden',
};

export default function AutomationFlow({ stages }: Props) {
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const screenRefs = useRef<(HTMLDivElement | null)[]>([]);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const stageCount = stages.length;
  const segments = stageCount - 1;

  useGSAP(
    () => {
      if (reduced) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const screens = screenRefs.current.filter(Boolean) as HTMLDivElement[];
        const captions = captionRefs.current.filter(Boolean) as HTMLDivElement[];
        if (screens.length !== stageCount || captions.length !== stageCount) return;

        gsap.set([...screens.slice(1), ...captions.slice(1)], { opacity: 0 });
        gsap.set([screens[0], captions[0]], { opacity: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${segments * 100}%`,
            pin: true,
            pinType: 'transform',
            scrub: 1,
            snap: {
              snapTo: 1 / segments,
              duration: 0.4,
              ease: 'power2.inOut',
            },
            // Fix #1 — only setState when the integer index changes.
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

        // Fix #4 — pure opacity cross-fades, no y translate.
        for (let i = 0; i < segments; i++) {
          tl.to(
            [screens[i], captions[i]],
            { opacity: 0, duration: 1, ease: 'power1.inOut' },
            i
          ).to(
            [screens[i + 1], captions[i + 1]],
            { opacity: 1, duration: 1, ease: 'power1.inOut' },
            i
          );
        }
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [reduced, stageCount] }
  );

  if (reduced) {
    return (
      <section className="relative bg-white py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader />
          <div className="mt-12 grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <PhoneFrame>
                <StageScreen stage={stages[0]} index={0} />
              </PhoneFrame>
            </div>
            <StageCaption stage={stages[0]} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* DESKTOP — pinned phone-frame cycler */}
      {/* Fix #5 — translateZ(0) promotes the pinned block to its own layer. */}
      <section
        ref={containerRef}
        className="relative hidden md:block bg-white"
        aria-label="How a Streamline automation runs end to end"
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="relative h-[100svh] flex flex-col">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(900px 540px at 30% 50%, rgba(123,63,228,0.07), transparent 65%)',
            }}
          />

          <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-12 w-full flex-1 flex flex-col">
            <SectionHeader />

            <div className="mt-10 grid grid-cols-2 gap-12 items-center flex-1">
              {/* LEFT — phone frame with cross-fading screens inside */}
              <div className="flex justify-center">
                <PhoneFrame>
                  {stages.map((stage, i) => (
                    // Fix #2 — will-change + translateZ on each screen panel.
                    <div
                      key={stage.indicator}
                      ref={(el) => (screenRefs.current[i] = el)}
                      className="absolute inset-0"
                      style={COMPOSITED}
                    >
                      <StageScreen stage={stage} index={i} />
                    </div>
                  ))}
                </PhoneFrame>
              </div>

              {/* RIGHT — cross-fading captions */}
              <div className="relative min-h-[280px]">
                {stages.map((stage, i) => (
                  <div
                    key={stage.indicator}
                    ref={(el) => (captionRefs.current[i] = el)}
                    className="absolute inset-0"
                    style={COMPOSITED}
                  >
                    <StageCaption stage={stage} />
                  </div>
                ))}
              </div>
            </div>

            <ProgressIndicator current={activeIndex + 1} total={stageCount} />
          </div>
        </div>
      </section>

      {/* MOBILE — stacked stage cards */}
      <section className="md:hidden bg-white py-20" aria-label="How a Streamline automation runs end to end">
        <div className="max-w-xl mx-auto px-6">
          <SectionHeader />
          <div className="mt-10 space-y-14">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.indicator}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="space-y-5"
              >
                <div className="flex justify-center">
                  <PhoneFrame>
                    <StageScreen stage={stage} index={i} />
                  </PhoneFrame>
                </div>
                <StageCaption stage={stage} />
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
        How it runs
      </span>
      <h2 className="text-[32px] sm:text-[42px] md:text-[52px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.03em] leading-[1.06] max-w-[22ch] mx-auto">
        Quote to delivery,{' '}
        <span className="font-['Instrument_Serif'] italic font-normal">
          on autopilot.
        </span>
      </h2>
      <p className="mt-5 text-[15.5px] md:text-[16.5px] font-['DM_Sans'] text-[#3D3D47] leading-[1.55] max-w-[52ch] mx-auto">
        The real RecklessBear flow. Six stages. No spreadsheets. No follow-up calls.
      </p>
    </motion.div>
  );
}

/**
 * Branded "app screen" panel shown inside the phone frame. The real stage
 * screenshots were never uploaded (the placeholder URLs 404), so rather than
 * show broken images we render a clean, on-brand mock screen per stage —
 * step indicator, title, skeleton UI, and a serif step numeral.
 */
function StageScreen({ stage, index }: { stage: AutomationStage; index: number }) {
  // Real captured screen, when one exists for this stage.
  if (stage.screenSrc) {
    return (
      <div className="absolute inset-0 bg-[#0A0A0F]">
        <img
          src={stage.screenSrc}
          alt={stage.screenAlt ?? stage.title}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-cover object-left-top"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 font-['JetBrains_Mono'] text-[9px] uppercase tracking-[0.14em] text-[#7B3FE4] backdrop-blur-sm">
          {stage.indicator}
        </span>
      </div>
    );
  }

  // Otherwise: a clean, on-brand mock screen (used for back-office stages
  // where no portrait screenshot exists).
  return (
    <div className="absolute inset-0 flex flex-col bg-gradient-to-br from-[#F3EEFF] to-[#F5F5F7]">
      {/* faux app top bar */}
      <div className="flex items-center gap-1.5 px-5 pt-6 pb-4">
        <span className="h-1.5 w-1.5 rounded-full bg-[#7B3FE4]/45" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#7B3FE4]/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#7B3FE4]/15" />
      </div>

      <div className="relative flex-1 px-5">
        <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.16em] text-[#7B3FE4]">
          {stage.indicator}
        </span>
        <p className="mt-2 font-['DM_Sans'] text-[19px] font-bold leading-[1.12] tracking-[-0.02em] text-[#0A0A0F]">
          {stage.title}
        </p>

        {/* skeleton content lines */}
        <div className="mt-6 space-y-2.5">
          <div className="h-2.5 w-5/6 rounded-full bg-[#E3DAFB]" />
          <div className="h-2.5 w-2/3 rounded-full bg-[#EAE3FB]" />
          <div className="h-2.5 w-[72%] rounded-full bg-[#EAE3FB]" />
        </div>

        <div className="mt-7 h-9 w-28 rounded-full bg-[#7B3FE4]" />

        {/* big serif step numeral watermark */}
        <span className="absolute bottom-5 right-5 font-['Instrument_Serif'] italic leading-none text-[#7B3FE4]/20" style={{ fontSize: 64 }}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}

function StageCaption({ stage }: { stage: AutomationStage }) {
  return (
    <div className="max-w-md mx-auto md:mx-0">
      <span className="block text-[11px] font-['DM_Sans'] font-medium uppercase tracking-[0.16em] text-[#7B3FE4]">
        {stage.indicator}
      </span>
      <h3 className="mt-3 text-[26px] md:text-[32px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em] leading-[1.15]">
        {stage.title}
      </h3>
      <p className="mt-4 text-[15px] md:text-[16px] font-['DM_Sans'] text-[#3D3D47] leading-[1.6]">
        {stage.caption}
      </p>
    </div>
  );
}

/**
 * Static phone frame. Two modes:
 *  - children (cycler): stacked screen panels composited inside
 *  - screenSrc (single): one static screenshot
 *
 * Fix #3 — shadow lives on the outer frame wrapper (never animated).
 * The inner screen div is the animated surface; painting the shadow there
 * would have forced a CPU repaint on every opacity change.
 */
function PhoneFrame({
  children,
  screenSrc,
  screenAlt,
}: {
  children?: React.ReactNode;
  screenSrc?: string;
  screenAlt?: string;
}) {
  return (
    <div
      className="relative w-[260px] md:w-[300px] aspect-[9/19.5] rounded-[44px] bg-[#0A0A0F] p-[10px] ring-1 ring-black/10"
      style={{
        boxShadow:
          '0 40px 80px -30px rgba(76,29,149,0.45), 0 10px 30px -10px rgba(0,0,0,0.18)',
      }}
    >
      {/* Dynamic island notch */}
      <div
        aria-hidden="true"
        className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[88px] h-[24px] rounded-full bg-black z-10"
      />
      {/* Screen — this is the compositing surface; no shadow here */}
      <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-[#F5F5F7]">
        {children}
        {screenSrc && (
          <img
            src={screenSrc}
            alt={screenAlt ?? ''}
            loading="lazy"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover select-none"
          />
        )}
      </div>
    </div>
  );
}

function ProgressIndicator({ current, total }: { current: number; total: number }) {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return (
    <div className="mt-8 flex items-center justify-center gap-4 text-[12px] font-['DM_Sans'] font-medium tracking-[0.12em] uppercase text-[#6B6B7A]">
      <span className="text-[#0A0A0F] tabular-nums">Step {pad(current)}</span>
      <div className="flex items-center gap-1.5" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-px transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              i < current ? 'bg-[#7B3FE4] w-6' : 'bg-[#D4D4DA] w-3'
            }`}
          />
        ))}
      </div>
      <span className="tabular-nums">{pad(total)}</span>
    </div>
  );
}
