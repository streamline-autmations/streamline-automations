import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SplitReveal from '../components/craft/SplitReveal';
import WorkCard from '../components/craft/WorkCard';
import PreFooterCTA from '../components/craft/PreFooterCTA';
import FillButton from '../components/craft/FillButton';
import Panel from '../components/craft/Panel';
import Tag from '../components/craft/Tag';
import { EASE_ARR, fadeUp, stagger, viewport } from '../lib/motion';

// Real, local, optimised client tiles.
const TILE = (c: string) => `/assets/clients/${c}/tile.webp`;

// What every build includes — no templates, no upsell.
const INCLUDED = [
  'Custom design — no templates',
  'Mobile-first, built for 375px first',
  'Fast load + SEO basics baked in',
  'Contact form + WhatsApp button',
  'Copywriting in your voice',
  'Hosting, domain + SSL setup',
  'Owner-editable where it makes sense',
];

/** Small inline check mark for the "what you get" list. */
function Check() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="mt-0.5 h-[18px] w-[18px] shrink-0 text-site-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

/**
 * Websites — Web Design & Creation. Alternating stacked panels: hero (white) →
 * what you get (ink, checklist) → recent build (white, WorkCards) → end CTA.
 * Pricing-free by design — every CTA points to a free call, never a number.
 */
export default function Websites() {
  return (
    <>
      {/* HERO — white */}
      <section className="flex min-h-[100svh] items-center px-6 pt-32 pb-24 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR }}
            className="mb-7"
          >
            <Tag variant="outline">Web Design &amp; Creation</Tag>
          </motion.div>

          <SplitReveal
            as="h1"
            trigger="mount"
            segments={[
              { text: 'Websites that' },
              { text: 'convert', serif: true },
              { text: 'built in days, not months.' },
            ]}
            className="max-w-5xl text-[clamp(44px,8vw,104px)] font-semibold leading-[0.98] tracking-[-0.02em] text-site-ink"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.5 }}
            className="mt-8 max-w-xl text-[17px] leading-[1.65] text-site-text-body"
          >
            Custom-built, fast, and made to turn visitors into enquiries — not just look pretty. Most
            sites go live in 3–7 days.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <FillButton to="/contact" variant="ink">
              Book a Free Call
            </FillButton>
            <FillButton to="/portfolio" variant="ink">
              See the work →
            </FillButton>
          </motion.div>
        </div>
      </section>

      {/* WHAT YOU GET — ink */}
      <Panel bg="ink" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline-dark" className="mb-8">
            What you get
          </Tag>
          <SplitReveal
            as="h2"
            segments={[{ text: 'Everything,' }, { text: 'handled.', serif: true }]}
            className="max-w-[16ch] text-[clamp(34px,5vw,68px)] font-semibold leading-[1.02] tracking-[-0.02em] text-white"
          />

          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-12 grid gap-x-12 gap-y-5 sm:grid-cols-2"
          >
            {INCLUDED.map((item) => (
              <motion.li key={item} variants={fadeUp} className="flex items-start gap-3">
                <Check />
                <span className="text-[16px] leading-[1.5] text-white/[0.82] md:text-[17px]">{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.15 }}
            className="mt-14 flex flex-col gap-8 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-[clamp(18px,2.4vw,26px)] font-medium leading-[1.3] tracking-[-0.01em] text-white">
              Typical turnaround — <span className="text-site-accent">3 to 7 days</span>.
            </p>
            <FillButton to="/contact" variant="on-dark">
              Book a Free Call
            </FillButton>
          </motion.div>
        </div>
      </Panel>

      {/* RECENT BUILD — white */}
      <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-14 flex items-end justify-between gap-6">
            <div>
              <Tag variant="outline" className="mb-6">
                Recent build
              </Tag>
              <SplitReveal
                as="h2"
                segments={[{ text: 'Fresh out the' }, { text: 'studio', serif: true }]}
                className="max-w-[18ch] text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink"
              />
            </div>
            <Link
              to="/portfolio"
              data-cursor="link"
              className="group hidden min-h-[44px] shrink-0 items-center text-[15px] font-medium text-site-text-body outline-none md:inline-flex"
            >
              <span className="transition-colors duration-300 group-hover:text-site-accent">All work →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
            <WorkCard
              to="/work/ameli"
              label="Portfolio + Lead capture"
              title="Ameli Designs"
              blurb="A fast portfolio with automated email lead capture. 4-day build."
              image={TILE('ameli')}
              ratio="4/5"
              index={0}
            />
            <WorkCard
              to="/work/blom"
              label="E-commerce + Automation"
              title="BLOM Cosmetics"
              blurb="Full store, custom admin, and WhatsApp automation."
              image={TILE('blom')}
              ratio="4/5"
              index={1}
            />
          </div>
        </div>
      </Panel>

      <PreFooterCTA />
    </>
  );
}
