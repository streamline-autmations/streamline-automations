import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../../../../lib/gsap-setup';
import RevealText from '../../ui/RevealText';

const svgProps = {
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const NODES = [
  { name: 'Customer', icon: <svg {...svgProps}><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 12 0v1" /></svg> },
  { name: 'Form', icon: <svg {...svgProps}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></svg> },
  { name: 'AI', icon: <svg {...svgProps}><path d="M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M3 12h3M18 12h3M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /><circle cx="12" cy="12" r="3.2" /></svg> },
  { name: 'CRM', icon: <svg {...svgProps}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 9h4M7 13h7M16 8.5v3" /></svg> },
  { name: 'WhatsApp', icon: <svg {...svgProps}><path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.5L3 21l2.1-5.6A8.5 8.5 0 1 1 21 11.5Z" /></svg> },
  { name: 'Done', end: true, icon: <svg {...svgProps} strokeWidth={1.8}><path d="M20 6 9 17l-5-5" /></svg> },
];

const Arrow = () => (
  <div className="flow-arrow -mt-6 flex shrink-0 items-center justify-center text-[#C8C8D0] md:px-0.5">
    <span className="md:hidden ml-[30px] rotate-90">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    </span>
    <span className="hidden md:inline">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    </span>
  </div>
);

/**
 * AutomationFlowRow — pinned scrollytelling of the automation flow.
 *
 * Desktop (no-reduced-motion): the section pins and a scrubbed timeline plays
 *   it out as scenes — the current line draws across, each node lights up on
 *   its own scroll beat with a spark riding the leading edge, then the closing
 *   line resolves. Customer → Form → AI → CRM → WhatsApp → Done.
 * Mobile / reduced-motion: no pin. A light ScrollTrigger.batch reveals the
 *   nodes as they enter; everything stays fully readable and smooth.
 *
 * Transform + opacity only.
 */
export default function AutomationFlowRow() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineWrapRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;
      const nodes = gsap.utils.toArray<HTMLElement>('.flow-node', root);
      const arrows = gsap.utils.toArray<HTMLElement>('.flow-arrow', root);
      const mm = gsap.matchMedia();

      // ── Desktop: pinned scrub timeline ──────────────────────────────
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set(nodes, { autoAlpha: 0, y: 26 });
        gsap.set(arrows, { autoAlpha: 0 });
        gsap.set(fillRef.current, { scaleX: 0, transformOrigin: 'left center' });
        gsap.set(sparkRef.current, { autoAlpha: 0, x: 0 });
        gsap.set(paragraphRef.current, { autoAlpha: 0, y: 26 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: '+=1900',
            pin: true,
            pinType: 'transform',
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Current draws across the whole flow; spark rides its leading edge.
        tl.to(fillRef.current, { scaleX: 1, ease: 'none', duration: 1 }, 0.05)
          .to(sparkRef.current, { autoAlpha: 1, duration: 0.05 }, 0.05)
          .to(
            sparkRef.current,
            { x: () => lineWrapRef.current?.offsetWidth ?? 0, ease: 'none', duration: 1 },
            0.05
          )
          .to(sparkRef.current, { autoAlpha: 0, duration: 0.08 }, 1.05);

        // Each node lights up on its own beat.
        nodes.forEach((n, i) => {
          const at = 0.12 + i * 0.14;
          tl.to(n, { autoAlpha: 1, y: 0, ease: 'brand', duration: 0.4 }, at);
          if (arrows[i]) tl.to(arrows[i], { autoAlpha: 1, duration: 0.25 }, at + 0.08);
        });

        tl.to(paragraphRef.current, { autoAlpha: 1, y: 0, ease: 'brand', duration: 0.5 }, 0.9);
      });

      // ── Mobile / reduced-motion: no pin, light batched reveal ────────
      mm.add('(max-width: 767px), (prefers-reduced-motion: reduce)', () => {
        gsap.set([...nodes, ...arrows, fillRef.current, sparkRef.current, paragraphRef.current], {
          clearProps: 'all',
        });
        gsap.set(fillRef.current, { scaleX: 1, transformOrigin: 'left center' });
        ScrollTrigger.batch(nodes, {
          start: 'top 92%',
          onEnter: (els) =>
            gsap.from(els, {
              autoAlpha: 0,
              y: 18,
              stagger: 0.1,
              duration: 0.5,
              ease: 'brand',
              overwrite: true,
            }),
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="flow"
      data-screen-label="Automation"
      className="relative flex min-h-[100svh] flex-col justify-center bg-[#FAFAFA] py-[clamp(96px,14vh,200px)]"
    >
      <div className="relative mx-auto w-full max-w-[1000px] px-8">
        <span className="absolute right-8 top-0 font-['JetBrains_Mono'] text-[12px] tracking-[0.22em] text-[#9E9EA8]">
          05 — Automation
        </span>

        <div className="mb-[clamp(56px,8vh,96px)]">
          <span className="block font-['JetBrains_Mono'] text-[12px] font-medium uppercase tracking-[0.22em] text-[#7B3FE4]">
            The difference
          </span>
          <span aria-hidden="true" className="mt-3 block h-px w-12 bg-[#7B3FE4]" />
          <RevealText
            as="h2"
            className="mt-5 font-['DM_Sans'] font-bold leading-[1.0] tracking-[-0.025em] text-[#0A0A0F]"
          >
            <span style={{ fontSize: 'clamp(34px, 5vw, 72px)' }}>
              I don&apos;t just build sites.
              <br />I build{' '}
              <span className="font-['Instrument_Serif'] italic font-normal text-[#7B3FE4]">
                systems.
              </span>
            </span>
          </RevealText>
        </div>

        {/* flow diagram */}
        <div className="relative flex flex-col items-stretch gap-2 md:flex-row md:items-stretch md:gap-0">
          {/* connecting line — base track, drawn current fill + leading spark */}
          <div
            ref={lineWrapRef}
            aria-hidden="true"
            className="pointer-events-none absolute left-[9%] right-[9%] top-[42px] hidden h-0.5 -translate-y-1/2 md:block"
          >
            <div className="absolute inset-0 rounded-full bg-[#E8E8EC]" />
            <div
              ref={fillRef}
              className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-[#7B3FE4]/30 via-[#7B3FE4]/70 to-[#7B3FE4]/40"
            />
            <div
              ref={sparkRef}
              className="absolute top-1/2 -ml-6 h-3 w-12 -translate-y-1/2 rounded-full bg-[#9B5FF5] blur-[6px]"
            />
          </div>

          {NODES.map((n, i) => (
            <div key={n.name} className="contents">
              <div className="flow-node flex flex-1 flex-row items-center gap-[18px] px-1.5 py-2.5 text-left md:min-w-[130px] md:flex-col md:gap-3.5 md:text-center">
                <div
                  className={`grid h-16 w-16 shrink-0 place-items-center rounded-[18px] border ${
                    n.end
                      ? 'border-[#7B3FE4] bg-[#7B3FE4] text-white'
                      : 'border-[#E8E8EC] bg-white text-[#7B3FE4]'
                  }`}
                  style={{ boxShadow: n.end ? 'none' : '0 8px 24px rgba(123,63,228,0.08)' }}
                >
                  {n.icon}
                </div>
                <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.14em] text-[#6B6B7A]">
                  {n.name}
                </span>
              </div>
              {i < NODES.length - 1 && <Arrow />}
            </div>
          ))}
        </div>

        <div ref={paragraphRef} className="mt-[clamp(56px,8vh,90px)] max-w-[620px]">
          <p className="font-['DM_Sans'] leading-[1.5] text-[#3D3D47]" style={{ fontSize: 'clamp(18px, 2vw, 22px)' }}>
            A lead comes in. The form captures it, AI sorts and replies, your CRM
            updates itself, and the customer gets a WhatsApp before you&apos;ve even
            seen the notification.{' '}
            <em className="font-['Instrument_Serif'] italic font-normal text-[#7B3FE4]">
              No manual steps.
            </em>{' '}
            That&apos;s the part most sites skip — and the part that actually saves
            you time.
          </p>
        </div>
      </div>
    </section>
  );
}
