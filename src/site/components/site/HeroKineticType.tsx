import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SplitReveal from '../craft/SplitReveal';
import FillButton from '../craft/FillButton';
import { EASE_ARR } from '../../lib/motion';
import { PRIMARY_CTA, SECONDARY_CTA } from '../../data/site';

const TICKER_ITEMS = [
  'WhatsApp automation',
  'Booking systems',
  'Custom dashboards',
  'E-commerce',
  'Admin portals',
  'Email flows',
  'CRM integrations',
  'Voiceflow AI',
];

function Ticker({ reverse = false }: { reverse?: boolean }) {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden" aria-hidden="true">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      >
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.18em] text-site-text-muted">
            {item}
            <span className="h-px w-6 bg-site-line-mid" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function HeroKineticType() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-white px-6 py-32">
      {/* Breathing purple glow behind "sell." — positioned bottom-right of the headline */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-[20%] -translate-y-[60%] rounded-full bg-site-accent/10 blur-[120px]"
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
      />

      <div className="relative z-10 flex w-full max-w-[1400px] flex-col items-center text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_ARR }}
          className="mb-10 font-mono text-[11px] uppercase tracking-[0.22em] text-site-text-muted"
        >
          Web design + business systems · Vaal Triangle, SA
        </motion.p>

        {/* Massive headline */}
        <SplitReveal
          as="h1"
          trigger="mount"
          stagger={0.05}
          delay={0.1}
          segments={[
            { text: 'I build systems' },
            { text: 'that' },
            { text: 'sell.', serif: true },
          ]}
          className="w-full text-[clamp(58px,10.5vw,148px)] font-semibold leading-[0.92] tracking-[-0.04em] text-site-ink"
        />

        {/* Hairline rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: EASE_ARR, delay: 0.8 }}
          className="my-12 h-px w-full max-w-2xl origin-left bg-site-line"
          aria-hidden="true"
        />

        {/* Sub-copy + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.85 }}
          className="flex flex-col items-center gap-8"
        >
          <p className="max-w-[480px] text-[17px] leading-[1.65] text-site-text-body">
            Professional websites, booking flows and automations that keep South African small businesses organised.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <FillButton to={PRIMARY_CTA.href} variant="ink">
              {PRIMARY_CTA.label}
            </FillButton>
            <Link
              to={SECONDARY_CTA.href}
              data-cursor="link"
              className="inline-flex min-h-[44px] items-center text-[15px] font-medium text-site-ink underline-offset-4 outline-none hover:underline focus-visible:text-site-accent focus-visible:underline"
            >
              {SECONDARY_CTA.label} →
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Bottom ticker strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="absolute bottom-10 left-0 right-0 flex flex-col gap-3 motion-reduce:hidden"
        aria-hidden="true"
      >
        <Ticker />
        <Ticker reverse />
      </motion.div>
    </section>
  );
}
