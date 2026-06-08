import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SplitReveal from '../components/craft/SplitReveal';
import WorkCard from '../components/craft/WorkCard';
import PreFooterCTA from '../components/craft/PreFooterCTA';
import FillButton from '../components/craft/FillButton';
import Panel from '../components/craft/Panel';
import Tag from '../components/craft/Tag';
import { EASE_ARR } from '../lib/motion';
import { STOCK } from '../data/site';

// Real, local, optimised client tiles.
const TILE = (c: string) => `/assets/clients/${c}/tile.webp`;

/**
 * Home — alternating ink/white stacked panels (Cuberto card-slide). Hero (white)
 * → manifesto (ink) → selected work (white) → end CTA (ink, video). Phase 3
 * expands the middle with the remaining sections.
 */
export default function Home() {
  return (
    <>
      {/* HERO — white */}
      <section className="flex min-h-[100svh] items-center px-6 pt-32 pb-28 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR }}
            className="mb-6 font-mono text-[12px] uppercase tracking-[0.18em] text-site-text-muted"
          >
            Web design + automation · South Africa
          </motion.p>

          <SplitReveal
            as="h1"
            trigger="mount"
            segments={[
              { text: 'Websites and systems that run the' },
              { text: 'business', serif: true },
              { text: 'while you sleep.' },
            ]}
            className="max-w-5xl text-[clamp(44px,8vw,104px)] font-semibold leading-[0.98] tracking-[-0.02em] text-site-ink"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.5 }}
            className="mt-8 max-w-xl text-[17px] leading-[1.65] text-site-text-body"
          >
            Web design and automation for South African businesses. I build the website, the systems
            behind it, and the automations that do the busywork — so you don't have to.
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
            <Link
              to="/portfolio"
              data-cursor="link"
              className="text-[15px] font-medium text-site-ink underline-offset-4 outline-none hover:underline focus-visible:text-site-accent focus-visible:underline"
            >
              See the work →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* MANIFESTO — ink */}
      <Panel bg="ink" className="flex min-h-[70svh] items-center px-6 py-28 md:px-10 md:py-36">
        <div className="mx-auto w-full max-w-5xl">
          <Tag variant="outline-dark" className="mb-8">
            The problem
          </Tag>
          <SplitReveal
            as="h2"
            segments={[
              { text: 'Most SA businesses still run on WhatsApps and spreadsheets. I build the' },
              { text: 'system', serif: true },
              { text: 'that runs it for you.' },
            ]}
            className="max-w-[20ch] text-[clamp(30px,5vw,68px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white"
          />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.15 }}
            className="mt-10"
          >
            <FillButton to="/systems" variant="on-dark">
              See how it works
            </FillButton>
          </motion.div>
        </div>
      </Panel>

      {/* SELECTED WORK — white, staggered reel */}
      <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-14 flex items-end justify-between gap-6">
            <div>
              <Tag variant="outline" className="mb-6">
                Selected work
              </Tag>
              <SplitReveal
                as="h2"
                segments={[{ text: 'Real builds for real' }, { text: 'businesses', serif: true }]}
                className="max-w-[18ch] text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink"
              />
            </div>
            <Link
              to="/portfolio"
              data-cursor="link"
              className="group hidden shrink-0 pb-2 text-[15px] font-medium text-site-text-secondary outline-none md:inline-flex"
            >
              <span className="transition-colors duration-300 group-hover:text-site-accent">All work →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
            <div className="flex flex-col gap-16 md:gap-24">
              <WorkCard
                to="/work/blom"
                label="E-commerce + Automation"
                title="BLOM Cosmetics"
                blurb="Full store, custom admin, course platform, and WhatsApp automation."
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

      <PreFooterCTA videoSrc={STOCK.ctaLoop} />
    </>
  );
}
