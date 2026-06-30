import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Panel from '../craft/Panel';
import SplitReveal from '../craft/SplitReveal';
import FillButton from '../craft/FillButton';
import { OFFER_PILLARS } from '../../data/site';
import { fadeUp, viewport } from '../../lib/motion';

const [WEBSITES, SYSTEMS, CARE] = OFFER_PILLARS;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SERVICES = [
  {
    no: '01',
    pillar: WEBSITES,
    title: ['Websites that ', { serif: 'convert.' }],
    body: 'Custom-built, mobile-first, fast. Most sites go live in 3–7 days. Made to turn visitors into enquiries — not just look good.',
  },
  {
    no: '02',
    pillar: SYSTEMS,
    title: ['Boring stuff, ', { serif: 'automated.' }],
    body: 'Booking flows, WhatsApp automation, dashboards and CRMs. The admin that eats your day — handled.',
  },
  {
    no: '03',
    pillar: CARE,
    title: ['Keep it ', { serif: 'running.' }],
    body: 'Hosting, domain, SSL, monthly updates and ongoing support. The site stays live, current and looked after.',
  },
] as const;

type ServiceItem = (typeof SERVICES)[number];
type TitlePart = string | { serif: string };

function TitleLine({ parts, dark }: { parts: readonly TitlePart[]; dark: boolean }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === 'string' ? (
          <span key={i} className={`transition-colors duration-400 ${dark ? 'text-white' : 'text-site-ink'}`}>
            {part}
          </span>
        ) : (
          <em
            key={i}
            className={`font-instrument not-italic transition-colors duration-400 ${dark ? 'text-site-accent' : 'text-site-accent'}`}
          >
            {part.serif}
          </em>
        ),
      )}
    </>
  );
}

function ServiceRow({
  svc,
  isActive,
  isDimmed,
  onEnter,
  onLeave,
}: {
  svc: ServiceItem;
  isActive: boolean;
  isDimmed: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      layout
      onHoverStart={onEnter}
      onHoverEnd={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      animate={{
        x: isActive ? 14 : isDimmed ? -3 : 0,
        y: isActive ? -8 : 0,
        opacity: isDimmed ? 0.45 : 1,
        backgroundColor: isActive ? '#0A0A0F' : '#FFFFFF',
        boxShadow: isActive
          ? '0 24px 64px -12px rgba(0,0,0,0.30), 0 0 0 1px rgba(255,255,255,0.06)'
          : '0 0 0 0 transparent',
      }}
      transition={{ duration: 0.45, ease: EASE }}
      className="cursor-pointer select-none overflow-hidden rounded-[20px] border border-site-line px-8 py-6 outline-none md:px-10 md:py-7"
      tabIndex={0}
      role="button"
      aria-expanded={isActive}
      aria-label={`${svc.pillar.label} — ${svc.body.slice(0, 40)}…`}
    >
      {/* ── Always-visible header row ── */}
      <div className="flex items-center gap-6 md:gap-10">
        {/* Number */}
        <motion.span
          animate={{ color: isActive ? '#7B3FE4' : '#9E9EA8' }}
          transition={{ duration: 0.35, ease: EASE }}
          className="shrink-0 font-mono text-[12px] uppercase tracking-[0.18em]"
        >
          {svc.no}
        </motion.span>

        {/* Title */}
        <h3 className="flex-1 text-[clamp(20px,2.8vw,38px)] font-semibold leading-[1.05] tracking-[-0.025em]">
          <TitleLine parts={svc.title} dark={isActive} />
        </h3>

        {/* Arrow */}
        <motion.span
          animate={{
            rotate: isActive ? -45 : 0,
            color: isActive ? '#7B3FE4' : '#9E9EA8',
          }}
          transition={{ duration: 0.35, ease: EASE }}
          className="shrink-0 text-[22px] leading-none"
          aria-hidden="true"
        >
          →
        </motion.span>
      </div>

      {/* ── Expandable body ── */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="body"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE, delay: 0.08 } }}
            exit={{ opacity: 0, y: 10, transition: { duration: 0.2, ease: EASE } }}
            className="mt-6 border-t border-white/10 pt-6"
          >
            <p className="max-w-[52ch] text-[15.5px] leading-[1.65] text-white/65">
              {svc.body}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {svc.pillar.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/12 px-3 py-1.5 text-[12px] text-white/45"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-7">
              <FillButton to={svc.pillar.href} variant="on-dark">
                Learn more
              </FillButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ServicesSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full max-w-6xl">

        {/* Section intro */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SplitReveal
            as="h2"
            segments={[
              { text: 'Three ways I can' },
              { text: 'help.', serif: true },
            ]}
            className="max-w-[14ch] text-[clamp(38px,5.5vw,72px)] font-semibold leading-[0.98] tracking-[-0.03em] text-site-ink"
          />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="max-w-[38ch] text-[16px] leading-[1.65] text-site-text-secondary md:text-right"
          >
            Hover any row to see what's included. Each service is a complete offering — not an upsell.
          </motion.p>
        </div>

        {/* Accordion rows */}
        <div className="flex flex-col gap-3">
          {SERVICES.map((svc, i) => (
            <ServiceRow
              key={svc.no}
              svc={svc}
              isActive={hovered === i}
              isDimmed={hovered !== null && hovered !== i}
              onEnter={() => setHovered(i)}
              onLeave={() => setHovered(null)}
            />
          ))}
        </div>

      </div>
    </Panel>
  );
}
