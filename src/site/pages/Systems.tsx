import { motion } from 'framer-motion';
import SplitReveal from '../components/craft/SplitReveal';
import WorkCard from '../components/craft/WorkCard';
import PreFooterCTA from '../components/craft/PreFooterCTA';
import FillButton from '../components/craft/FillButton';
import Panel from '../components/craft/Panel';
import Tag from '../components/craft/Tag';
import AutomationScrolly from '../components/site/AutomationScrolly';
import { EASE_ARR, fadeUp, stagger, viewport } from '../lib/motion';

// What I build — the boring stuff, automated.
const BUILDS: string[] = [
  'Custom CRMs + admin dashboards',
  'WhatsApp automation — replies, updates, reminders',
  'n8n workflows wiring your tools together',
  'AI quote + booking engines',
  'Stock, orders + invoicing logic',
  'Integrations — PayFast, ShipLogic, email',
];

/**
 * Systems — Systems & Automation. Hero (white) → AutomationScrolly (ink,
 * pinned 6-stage flow with the 3D node scene — the page's one showpiece) →
 * what I build (white checklist) → recent build (offwhite) → end CTA.
 * Dark budget stays at two: the scrolly + the pre-footer.
 * No pricing anywhere — rental tiers live on /hosting only.
 */
export default function Systems() {
  return (
    <>
      {/* HERO — white, text-only. One idea, one CTA. */}
      <section className="flex min-h-[100svh] items-center px-6 pt-32 pb-24 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR }}
            className="mb-7"
          >
            <Tag variant="outline">Systems &amp; Automation</Tag>
          </motion.div>

          <SplitReveal
            as="h1"
            trigger="mount"
            segments={[
              { text: 'Stop doing it by hand.' },
              { text: 'Build the system' },
              { text: 'once.', serif: true },
            ]}
            className="max-w-4xl text-[clamp(44px,8vw,104px)] font-semibold leading-[0.98] tracking-[-0.02em] text-site-ink"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.5 }}
            className="mt-8 max-w-xl text-[17px] leading-[1.65] text-site-text-body"
          >
            Custom CRMs, WhatsApp automation and n8n workflows that handle the repetitive work.
            Usually 5–14 days.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.6 }}
            className="mt-10"
          >
            <FillButton to="/contact" variant="ink">
              Book a Free Call
            </FillButton>
          </motion.div>
        </div>
      </section>

      {/* THE SHOWPIECE — pinned 6-stage automation flow, 3D node scene (ink).
          Mobile / reduced-motion renders its stacked timeline fallback. */}
      <AutomationScrolly />

      {/* WHAT I BUILD — white (the scrolly owns the dark moment) */}
      <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline" className="mb-8">
            What I build
          </Tag>
          <SplitReveal
            as="h2"
            segments={[{ text: 'The boring stuff,' }, { text: 'automated.', serif: true }]}
            className="max-w-[16ch] text-[clamp(34px,5vw,68px)] font-semibold leading-[1.04] tracking-[-0.02em] text-site-ink"
          />

          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-14 grid grid-cols-1 gap-x-12 gap-y-7 border-t border-site-line pt-12 md:grid-cols-2"
          >
            {BUILDS.map((item) => (
              <motion.li key={item} variants={fadeUp} className="flex items-start gap-4">
                <span aria-hidden="true" className="mt-[2px] shrink-0 text-[18px] leading-none text-site-accent">
                  ✓
                </span>
                <span className="text-[17px] leading-[1.5] text-site-text-body md:text-[18px]">{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.15 }}
            className="mt-14 inline-flex items-center gap-3 rounded-full border border-site-line px-6 py-3"
          >
            <span className="text-[14px] font-medium text-site-text-body">Typical turnaround</span>
            <span className="text-[15px] font-semibold text-site-ink">5 to 14 days</span>
          </motion.div>
        </div>
      </Panel>

      {/* RECENT BUILD — offwhite (WorkCard caption is dark, so never ink) */}
      <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline" className="mb-12">
            Recent build
          </Tag>
          <div className="mx-auto max-w-3xl">
            <WorkCard
              to="/work/recklessbear"
              label="Site + CRM + AI"
              title="RecklessBear Apparel"
              blurb="Quote engine, 12-stage production tracking, and an AI booking bot."
              image="/assets/clients/recklessbear/cover-wide.webp"
              ratio="16/10"
            />
          </div>
        </div>
      </Panel>

      <PreFooterCTA />
    </>
  );
}
