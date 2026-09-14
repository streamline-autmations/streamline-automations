import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Panel from '../../components/craft/Panel';
import Tag from '../../components/craft/Tag';
import SplitReveal from '../../components/craft/SplitReveal';
import FillButton from '../../components/craft/FillButton';
import ParallaxMedia from '../../components/craft/ParallaxMedia';
import PreFooterCTA from '../../components/craft/PreFooterCTA';
import WalkthroughVideo from '../../components/craft/WalkthroughVideo';
import { EASE_ARR, fadeUp, viewport } from '../../lib/motion';

const C = '/assets/clients/jj-glass';

/**
 * JJ Glassworks — compact case study (service site + lead automation).
 * Shorter than the flagship four on purpose: cover → overview (ink) →
 * walkthrough + screens (offwhite/white) → next project. Two dark moments
 * total (overview + pre-footer). Real screenshots only, from
 * /assets/clients/jj-glass/. Next project → Ameli.
 */
export default function JJGlass() {
  return (
    <>
      {/* 1 — COVER (plain section, full-bleed) */}
      <section className="px-6 pt-32 pb-20 md:px-10 md:pt-40 md:pb-24">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline" className="mb-7">
            Case study · Service site + Lead automation
          </Tag>

          <SplitReveal
            as="h1"
            trigger="mount"
            segments={[
              { text: 'A service site built to' },
              { text: 'win quotes.', serif: true },
            ]}
            className="max-w-5xl text-[clamp(40px,7.5vw,96px)] font-semibold leading-[0.99] tracking-[-0.02em] text-site-ink"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.45 }}
            className="mt-8 max-w-2xl text-[17px] leading-[1.65] text-site-text-body"
          >
            JJ Glassworks has been fitting glass and aluminium across Gauteng since 1988 — but the
            work came in by word of mouth and phone calls. I built them a clean service site where
            every path leads to a quote: a proper enquiry form, a WhatsApp button, and email alerts
            that land the second someone reaches out.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.55 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {['Service site', 'Quote requests', 'WhatsApp CTA', 'Email lead alerts'].map((t) => (
              <Tag key={t} variant="outline">{t}</Tag>
            ))}
          </motion.div>

          {/* Hero image — full-bleed rounded */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_ARR, delay: 0.5 }}
            className="mt-14 overflow-hidden rounded-2xl border border-site-line bg-site-surface shadow-[0_30px_80px_-20px_rgba(76,29,149,0.18),0_10px_30px_-10px_rgba(0,0,0,0.06)] md:mt-20 md:rounded-3xl"
          >
            <ParallaxMedia className="aspect-[16/9] w-full">
              <img
                src={`${C}/hero.webp`}
                alt="JJ Glassworks homepage on desktop — glass and aluminium specialists since 1988"
                loading="lazy"
                draggable={false}
                className="h-full w-full select-none object-cover"
              />
            </ParallaxMedia>
          </motion.div>
        </div>
      </section>

      {/* 2 — OVERVIEW (ink) */}
      <Panel bg="ink" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline-dark" className="mb-8">
            The overview
          </Tag>

          <SplitReveal
            as="h2"
            segments={[
              { text: 'Every enquiry lands in his inbox,' },
              { text: 'instantly.', serif: true },
            ]}
            className="max-w-[22ch] text-[clamp(30px,5vw,64px)] font-semibold leading-[1.04] tracking-[-0.02em] text-white"
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-16 grid gap-10 border-t border-white/10 pt-12 sm:grid-cols-2 md:grid-cols-3"
          >
            <div>
              <div className="mb-3 text-[14px] font-medium text-white/80">
                What it is
              </div>
              <p className="text-[15px] leading-[1.6] text-white/70">
                A service site for a Gauteng glass and aluminium specialist — services, completed
                projects, and a clear route to a quote on every page.
              </p>
            </div>
            <div>
              <div className="mb-3 text-[14px] font-medium text-white/80">
                Stack
              </div>
              <p className="text-[15px] leading-[1.6] text-white/70">
                React, TypeScript, Tailwind CSS. The contact form is wired to automated email lead
                notifications, with a WhatsApp button for people who'd rather message.
              </p>
            </div>
            <div>
              <div className="mb-3 text-[14px] font-medium text-white/80">
                The job it does
              </div>
              <p className="text-[15px] leading-[1.6] text-white/70">
                Quotes are the whole business. The site's one job is to catch every enquiry —
                form, WhatsApp or call — and get it in front of him before the customer moves on.
              </p>
            </div>
          </motion.div>
        </div>
      </Panel>

      {/* 3 — WALKTHROUGH (offwhite) */}
      <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline" className="mb-7">
            The walkthrough
          </Tag>
          <SplitReveal
            as="h2"
            segments={[{ text: 'See it' }, { text: 'move.', serif: true }]}
            className="text-[clamp(30px,5vw,60px)] font-semibold leading-[1.04] tracking-[-0.02em] text-site-ink"
          />
          <WalkthroughVideo
            src="/assets/videos/work/jj-glass-walkthrough.mp4"
            poster="/assets/videos/work/jj-glass-walkthrough-poster.webp"
            label="JJ Glassworks website walkthrough"
            className="mt-12"
          />

          {/* Screens — one composite + the real mobile build, side by side */}
          <div className="mt-16 grid items-start gap-6 md:grid-cols-[1.5fr_1fr] md:gap-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="overflow-hidden rounded-2xl border border-site-line bg-site-surface md:rounded-3xl"
            >
              <img
                src={`${C}/tile.webp`}
                alt="JJ Glassworks site across phone mockups"
                loading="lazy"
                draggable={false}
                className="aspect-[16/10] w-full select-none object-cover"
              />
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="overflow-hidden rounded-2xl border border-site-line bg-site-surface md:rounded-3xl"
            >
              <img
                src={`${C}/mobile-home.webp`}
                alt="JJ Glassworks home page on mobile, built mobile-first"
                loading="lazy"
                draggable={false}
                className="aspect-[9/16] w-full select-none object-cover object-top"
              />
            </motion.div>
          </div>
        </div>
      </Panel>

      {/* 4 — NEXT PROJECT (white) */}
      <Panel bg="white" className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-10 text-[14px] font-medium text-site-text-body">
            Next project
          </div>
          <Link
            to="/work/ameli"
            data-cursor="view"
            data-cursor-label="Explore"
            className="group block rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-4"
          >
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SplitReveal
                as="h2"
                segments={[{ text: 'Ameli' }, { text: 'Designs', serif: true }]}
                className="text-[clamp(40px,8vw,104px)] font-semibold leading-[0.96] tracking-[-0.03em] text-site-ink"
              />
              <span
                aria-hidden="true"
                className="mb-3 text-[clamp(30px,5vw,56px)] text-site-text-muted transition-all duration-300 ease-brand group-hover:translate-x-2 group-hover:text-site-accent motion-reduce:group-hover:translate-x-0"
              >
                →
              </span>
            </div>
            <p className="mt-4 max-w-xl text-[16px] leading-[1.6] text-site-text-body">
              A fast portfolio with automated email lead capture. Brief to live in four days.
            </p>
          </Link>

          <div className="mt-12">
            <FillButton to="/portfolio" variant="ink">
              See all work
            </FillButton>
          </div>
        </div>
      </Panel>

      {/* 5 — PRE-FOOTER CTA */}
      <PreFooterCTA />
    </>
  );
}
