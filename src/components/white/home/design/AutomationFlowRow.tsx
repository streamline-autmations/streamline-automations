import { useRef } from 'react';
import { gsap, useGSAP } from '../../../../lib/gsap-setup';
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

/** Desktop-only horizontal connector arrow between nodes. */
const Arrow = () => (
  <div className="flow-arrow mt-[21px] hidden shrink-0 items-center justify-center text-[#C8C8D0] md:flex md:px-0.5">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  </div>
);

/**
 * AutomationFlowRow — pinned scrollytelling of the automation flow.
 *
 * Desktop (no-reduced-motion): the section pins; a scrubbed timeline draws the
 *   horizontal line across, lights each node on its own beat with a spark on the
 *   leading edge, then resolves the closing copy. Nodes invert to filled-purple
 *   on hover. Customer → Form → AI → CRM → WhatsApp → Done.
 * Mobile (no-reduced-motion): no pin. Nodes stack centred (icon over label) and
 *   a vertical line draws down through them, scrubbed to scroll.
 * Reduced-motion (any width): everything static at its end state.
 *
 * Transform + opacity only.
 */
export default function AutomationFlowRow() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineWrapRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const vFillRef = useRef<HTMLDivElement>(null);
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

        tl.to(fillRef.current, { scaleX: 1, ease: 'none', duration: 1 }, 0.05)
          .to(sparkRef.current, { autoAlpha: 1, duration: 0.05 }, 0.05)
          .to(
            sparkRef.current,
            { x: () => lineWrapRef.current?.offsetWidth ?? 0, ease: 'none', duration: 1 },
            0.05
          )
          .to(sparkRef.current, { autoAlpha: 0, duration: 0.08 }, 1.05);

        nodes.forEach((n, i) => {
          const at = 0.12 + i * 0.14;
          tl.to(n, { autoAlpha: 1, y: 0, ease: 'brand', duration: 0.4 }, at);
          if (arrows[i]) tl.to(arrows[i], { autoAlpha: 1, duration: 0.25 }, at + 0.08);
        });

        tl.to(paragraphRef.current, { autoAlpha: 1, y: 0, ease: 'brand', duration: 0.5 }, 0.9);
      });

      // ── Mobile: no pin, vertical line draws + nodes reveal on scroll ──
      mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set(vFillRef.current, { scaleY: 0, transformOrigin: 'top center' });
        gsap.to(vFillRef.current, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top 68%', end: 'bottom 82%', scrub: true },
        });
        // One-shot staggered reveal — always settles visible (no batch gaps).
        gsap.set(nodes, { autoAlpha: 0, y: 18 });
        gsap.to(nodes, {
          autoAlpha: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.5,
          ease: 'brand',
          scrollTrigger: { trigger: root, start: 'top 72%' },
        });
      });

      // ── Reduced-motion (any width): static end state ─────────────────
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(fillRef.current, { scaleX: 1, transformOrigin: 'left center' });
        gsap.set(vFillRef.current, { scaleY: 1, transformOrigin: 'top center' });
        gsap.set([...nodes, ...arrows, paragraphRef.current], { autoAlpha: 1, y: 0 });
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
        <div className="relative flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-0">
          {/* desktop horizontal connector — base track + drawn fill + spark */}
          <div
            ref={lineWrapRef}
            aria-hidden="true"
            className="pointer-events-none absolute left-[9%] right-[9%] top-[32px] hidden h-0.5 -translate-y-1/2 md:block"
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

          {/* mobile vertical connector — draws down through the stacked nodes */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[32px] bottom-[62px] w-[2px] -translate-x-1/2 md:hidden"
          >
            <div className="absolute inset-0 rounded-full bg-[#E8E8EC]" />
            <div
              ref={vFillRef}
              className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-[#7B3FE4]/40 via-[#7B3FE4]/70 to-[#7B3FE4]/40"
            />
          </div>

          {NODES.map((n, i) => (
            <div key={n.name} className="contents">
              <div className="flow-node group flex flex-col items-center gap-3.5 px-1.5 text-center md:flex-1 md:min-w-[130px]">
                <div
                  className={`grid h-16 w-16 shrink-0 place-items-center rounded-[18px] border transition-all duration-300 ${
                    n.end
                      ? 'border-[#7B3FE4] bg-[#7B3FE4] text-white'
                      : 'border-[#E8E8EC] bg-white text-[#7B3FE4] shadow-[0_8px_24px_rgba(123,63,228,0.08)] group-hover:-translate-y-1 group-hover:border-[#7B3FE4] group-hover:bg-[#7B3FE4] group-hover:text-white group-hover:shadow-[0_14px_32px_rgba(123,63,228,0.32)]'
                  }`}
                >
                  {n.icon}
                </div>
                <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.14em] text-[#6B6B7A] transition-colors duration-300 group-hover:text-[#0A0A0F]">
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
