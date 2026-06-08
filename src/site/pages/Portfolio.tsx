import { motion } from 'framer-motion';
import SplitReveal from '../components/craft/SplitReveal';
import WorkCard from '../components/craft/WorkCard';
import PreFooterCTA from '../components/craft/PreFooterCTA';
import Panel from '../components/craft/Panel';
import Tag from '../components/craft/Tag';
import { EASE_ARR, fadeUp, stagger, viewport } from '../lib/motion';

// Real, local, optimised client tiles.
const TILE = (c: string) => `/assets/clients/${c}/tile.webp`;

/** Smaller jobs without a case-study page — rendered as plain (non-link) cards. */
interface MoreItem {
  type: string;
  name: string;
  blurb: string;
  /** Optional real local thumbnail; text-only card when absent. */
  image?: string;
}

const MORE: MoreItem[] = [
  {
    type: 'Service site + Automation',
    name: 'JJ Glasswork',
    blurb: 'Service site, contact form, automated email lead notifications.',
    image: TILE('jj-glass'),
  },
  {
    type: 'Internal tool',
    name: 'NSA Mining',
    blurb: 'Internal employee gift system: eligibility lookup, slip printing, reporting.',
  },
  {
    type: 'Hosting + Brand',
    name: 'Tuscany SA',
    blurb: 'Email hosting, domain management, IT support, logo + email banner.',
  },
  {
    type: 'Design',
    name: 'African Nomad',
    blurb: 'Logo, sublimation artwork, banner design, social content.',
  },
];

/**
 * Portfolio — all client work, alternating stacked panels (Cuberto card-slide).
 * Hero (white) → featured case studies as a staggered WorkCard reel (white) →
 * the smaller jobs as plain border cards (offwhite) → end CTA. No pricing.
 */
export default function Portfolio() {
  return (
    <>
      {/* HERO — white */}
      <section className="flex min-h-[100svh] items-center px-6 pt-32 pb-24 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline" className="mb-7">
            Selected work
          </Tag>

          <SplitReveal
            as="h1"
            trigger="mount"
            segments={[{ text: 'Real builds for real' }, { text: 'businesses', serif: true }, { text: '.' }]}
            className="max-w-5xl text-[clamp(44px,8vw,104px)] font-semibold leading-[0.98] tracking-[-0.02em] text-site-ink"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.5 }}
            className="mt-8 max-w-xl text-[17px] leading-[1.65] text-site-text-body"
          >
            E-commerce, admin systems, automation and portfolio sites — all live, all built solo.
          </motion.p>
        </div>
      </section>

      {/* FEATURED — white, staggered reel */}
      <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-14">
            <Tag variant="outline" className="mb-6">
              Featured
            </Tag>
            <SplitReveal
              as="h2"
              segments={[{ text: 'The work I keep' }, { text: 'building on', serif: true }]}
              className="max-w-[18ch] text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink"
            />
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
            <div className="flex flex-col gap-16 md:gap-24">
              <WorkCard
                to="/work/blom"
                label="E-commerce + Automation"
                title="BLOM Cosmetics"
                blurb="Full store, custom admin, BLOM Academy course platform, and WhatsApp automation."
                image={TILE('blom')}
                ratio="4/5"
                index={0}
              />
              <WorkCard
                to="/work/cw-electronics"
                label="E-commerce + Admin"
                title="CW Electronics"
                blurb="700+ products live in under two weeks. Retail + wholesale, PayFast."
                image={TILE('cw-electronics')}
                ratio="4/3"
                index={2}
              />
            </div>
            <div className="flex flex-col gap-16 md:mt-32 md:gap-24">
              <WorkCard
                to="/work/recklessbear"
                label="Site + CRM + AI"
                title="RecklessBear Apparel"
                blurb="Quote engine, 12-stage production tracking, and an AI booking bot."
                image={TILE('recklessbear')}
                ratio="4/3"
                index={1}
              />
              <WorkCard
                to="/work/ameli"
                label="Portfolio + Lead capture"
                title="Ameli Designs"
                blurb="A fast portfolio with automated email lead capture. 4-day build."
                image={TILE('ameli')}
                ratio="4/5"
                index={3}
              />
            </div>
          </div>
        </div>
      </Panel>

      {/* MORE WORK — offwhite (dark text), plain border cards */}
      <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-14">
            <Tag variant="outline" className="mb-6">
              More work
            </Tag>
            <SplitReveal
              as="h2"
              segments={[{ text: 'Smaller jobs, same' }, { text: 'care', serif: true }]}
              className="max-w-[18ch] text-[clamp(30px,5vw,56px)] font-semibold leading-[1.04] tracking-[-0.02em] text-site-ink"
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.1 }}
              className="mt-5 max-w-md text-[16px] leading-[1.65] text-site-text-body"
            >
              Service sites, internal tools, hosting and brand work I've shipped along the way.
            </motion.p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {MORE.map((item) => (
              <motion.div
                key={item.name}
                variants={fadeUp}
                className="rounded-2xl border border-site-line bg-white p-8"
              >
                {item.image && (
                  <div className="mb-7 overflow-hidden rounded-xl border border-site-line bg-site-surface">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      draggable={false}
                      className="aspect-[16/10] w-full select-none object-cover"
                    />
                  </div>
                )}
                <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-site-accent">
                  {item.type}
                </span>
                <h3 className="mt-2 text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-site-ink md:text-[26px]">
                  {item.name}
                </h3>
                <p className="mt-2 max-w-md text-[15px] leading-[1.55] text-site-text-body">{item.blurb}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Panel>

      <PreFooterCTA />
    </>
  );
}
