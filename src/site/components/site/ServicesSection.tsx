import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Panel from '../craft/Panel';
import SplitReveal from '../craft/SplitReveal';
import FillButton from '../craft/FillButton';
import { OFFER_PILLARS } from '../../data/site';
import { fadeUp, viewport } from '../../lib/motion';

const [WEBSITES, SYSTEMS, CARE] = OFFER_PILLARS;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
// Snappy ease-in for exits — collapses feel intentional, not sluggish
const EASE_IN: [number, number, number, number] = [0.4, 0, 0.6, 1];

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
          <span
            key={i}
            style={{ transition: 'color 0.45s cubic-bezier(0.22,1,0.36,1)' }}
            className={dark ? 'text-white' : 'text-site-ink'}
          >
            {part}
          </span>
        ) : (
          <em key={i} className="font-instrument not-italic text-site-accent">
            {part.serif}
          </em>
        ),
      )}
    </>
  );
}

function ServiceRow({
  svc,
  isOpen,
  isDimmed,
  onToggle,
}: {
  svc: ServiceItem;
  isOpen: boolean;
  isDimmed: boolean;
  onToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  // Hover preview only applies when nothing is open
  const showHoverHint = hovered && !isOpen && !isDimmed;

  return (
    <motion.div
      layout
      layoutRoot
      onClick={onToggle}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        x: isOpen ? 16 : showHoverHint ? 6 : isDimmed ? -4 : 0,
        y: isOpen ? -10 : 0,
        opacity: isDimmed ? 0.38 : 1,
        backgroundColor: isOpen ? '#0A0A0F' : '#FFFFFF',
        borderColor: isOpen
          ? 'rgba(255,255,255,0.07)'
          : showHoverHint
          ? '#D4D4DA'
          : '#E8E8EC',
        boxShadow: isOpen
          ? '0 32px 80px -16px rgba(0,0,0,0.38), 0 0 0 1px rgba(255,255,255,0.06) inset'
          : showHoverHint
          ? '0 8px 28px -8px rgba(0,0,0,0.10)'
          : '0 0px 0px 0px transparent',
      }}
      transition={{
        x:           { duration: isOpen ? 0.52 : 0.38, ease: isOpen ? EASE : EASE },
        y:           { duration: isOpen ? 0.52 : 0.38, ease: isOpen ? EASE : EASE },
        opacity:     { duration: 0.28, ease: EASE },
        backgroundColor: { duration: isOpen ? 0.48 : 0.34, ease: EASE },
        borderColor: { duration: 0.3, ease: EASE },
        boxShadow:   { duration: isOpen ? 0.5 : 0.28, ease: EASE },
      }}
      className="cursor-pointer select-none overflow-hidden rounded-[20px] border px-8 py-6 outline-none md:px-10 md:py-7"
      tabIndex={0}
      role="button"
      aria-expanded={isOpen}
      aria-label={`${svc.pillar.label}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); }
      }}
    >
      {/* ── Always-visible header row ── */}
      <div className="flex items-center gap-6 md:gap-10">
        {/* Number */}
        <motion.span
          animate={{ color: isOpen ? '#7B3FE4' : showHoverHint ? '#6B6B7A' : '#9E9EA8' }}
          transition={{ duration: 0.32, ease: EASE }}
          className="shrink-0 font-mono text-[12px] uppercase tracking-[0.18em]"
        >
          {svc.no}
        </motion.span>

        {/* Title */}
        <h3 className="flex-1 text-[clamp(20px,2.8vw,38px)] font-semibold leading-[1.05] tracking-[-0.025em]">
          <TitleLine parts={svc.title} dark={isOpen} />
        </h3>

        {/* Arrow — rotates to × on open */}
        <motion.span
          animate={{
            rotate: isOpen ? -45 : showHoverHint ? 8 : 0,
            color: isOpen ? '#7B3FE4' : showHoverHint ? '#6B6B7A' : '#9E9EA8',
          }}
          transition={{ duration: 0.38, ease: EASE }}
          className="shrink-0 text-[22px] leading-none"
          aria-hidden="true"
        >
          →
        </motion.span>
      </div>

      {/* ── Expandable body ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ opacity: 0, y: 22 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.42, ease: EASE, delay: 0.14 },
            }}
            exit={{
              opacity: 0,
              y: 6,
              transition: { duration: 0.16, ease: EASE_IN },
            }}
            className="mt-6 border-t border-white/10 pt-6"
          >
            {/* Body copy — slight extra delay so bg flip lands first */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.38, ease: EASE, delay: 0.22 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="max-w-[52ch] text-[15.5px] leading-[1.65] text-white/65"
            >
              {svc.body}
            </motion.p>

            {/* Tags — staggered after copy */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.36, ease: EASE, delay: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="mt-5 flex flex-wrap gap-2"
            >
              {svc.pillar.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/12 px-3 py-1.5 text-[12px] text-white/45"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA — last to arrive */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.36, ease: EASE, delay: 0.38 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="mt-7"
            >
              <FillButton to={svc.pillar.href} variant="on-dark">
                Learn more
              </FillButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ServicesSection() {
  const [selected, setSelected] = useState<number | null>(null);

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
            Click any row to see what's included. Each service is a complete offering — not an upsell.
          </motion.p>
        </div>

        {/* Accordion rows */}
        <div className="flex flex-col gap-3">
          {SERVICES.map((svc, i) => (
            <ServiceRow
              key={svc.no}
              svc={svc}
              isOpen={selected === i}
              isDimmed={selected !== null && selected !== i}
              onToggle={() => setSelected((s) => (s === i ? null : i))}
            />
          ))}
        </div>

      </div>
    </Panel>
  );
}
