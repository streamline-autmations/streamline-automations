import { motion } from 'framer-motion';
import SplitReveal from '../components/craft/SplitReveal';
import SystemsHeroScroll from '../components/site/SystemsHeroScroll';
import WorkCard from '../components/craft/WorkCard';
import PreFooterCTA from '../components/craft/PreFooterCTA';
import FillButton from '../components/craft/FillButton';
import Panel from '../components/craft/Panel';
import Tag from '../components/craft/Tag';
import { EASE_ARR, fadeUp, stagger, viewport } from '../lib/motion';

// Real, local, optimised client tiles.
const TILE = (c: string) => `/assets/clients/${c}/tile.webp`;

// What I build — the boring stuff, automated.
const BUILDS: string[] = [
  'Custom CRMs + admin dashboards',
  'WhatsApp automation — replies, updates, reminders',
  'n8n workflows wiring your tools together',
  'AI quote + booking engines',
  'Stock, orders + invoicing logic',
  'Integrations — PayFast, ShipLogic, email',
];

// A typical flow — enquiry to done, hands-off.
const FLOW: { n: string; title: string; line: string }[] = [
  { n: '01', title: 'Enquiry on WhatsApp', line: 'A customer messages your business number.' },
  { n: '02', title: 'Auto-reply + capture', line: 'They get an instant reply. Details are saved.' },
  { n: '03', title: 'Into the CRM', line: 'The lead lands in your dashboard, sorted.' },
  { n: '04', title: 'Quote or booking', line: 'A quote or a slot goes out automatically.' },
  { n: '05', title: 'Invoice sent', line: 'Accepted? The invoice fires off on its own.' },
  { n: '06', title: 'Done', line: 'You did nothing. The system handled all of it.' },
];

/**
 * Systems — Systems & Automation. Alternating ink/white/offwhite stacked panels.
 * Hero (white) → what I build (ink) → a typical flow (white) → recent build
 * (offwhite) → end CTA. No pricing anywhere — rental tiers live on /hosting only.
 */
export default function Systems() {
  return (
    <>
      {/* HERO — scroll sequence */}
      <SystemsHeroScroll />

      {/* WHAT I BUILD — ink */}
      <Panel bg="ink" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline-dark" className="mb-8">
            What I build
          </Tag>
          <SplitReveal
            as="h2"
            segments={[{ text: 'The boring stuff,' }, { text: 'automated.', serif: true }]}
            className="max-w-[16ch] text-[clamp(34px,5vw,68px)] font-semibold leading-[1.04] tracking-[-0.02em] text-white"
          />

          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-14 grid grid-cols-1 gap-x-12 gap-y-7 border-t border-white/10 pt-12 md:grid-cols-2"
          >
            {BUILDS.map((item) => (
              <motion.li key={item} variants={fadeUp} className="flex items-start gap-4">
                <span aria-hidden="true" className="mt-[2px] shrink-0 text-[18px] leading-none text-site-accent">
                  ✓
                </span>
                <span className="text-[17px] leading-[1.5] text-white/[0.82] md:text-[18px]">{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.15 }}
            className="mt-14 inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
              Typical turnaround
            </span>
            <span className="text-[15px] font-semibold text-white">5 to 14 days</span>
          </motion.div>
        </div>
      </Panel>

      {/* A TYPICAL FLOW — white */}
      <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline" className="mb-6">
            A typical flow
          </Tag>
          <SplitReveal
            as="h2"
            segments={[{ text: 'From enquiry to' }, { text: 'done', serif: true }, { text: '— without you.' }]}
            className="max-w-[20ch] text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink"
          />

          {/* A GSAP pinned-scroll version of these six stages replaces this static
              grid later (RecklessBear quote-to-production, scrub-pinned). */}
          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {FLOW.map((step) => (
              <motion.li
                key={step.n}
                variants={fadeUp}
                className="rounded-2xl border border-site-line bg-site-surface p-7 transition-colors duration-300 ease-brand hover:border-site-line-mid"
              >
                <span className="block font-mono text-[clamp(34px,4vw,48px)] font-semibold leading-none tracking-[-0.02em] text-site-accent">
                  {step.n}
                </span>
                <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.01em] text-site-ink md:text-[20px]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.55] text-site-text-body">{step.line}</p>
              </motion.li>
            ))}
          </motion.ol>
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
              image={TILE('recklessbear')}
              ratio="16/10"
            />
          </div>
        </div>
      </Panel>

      <PreFooterCTA />
    </>
  );
}
