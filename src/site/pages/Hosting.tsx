import { motion } from 'framer-motion';
import Panel from '../components/craft/Panel';
import Tag from '../components/craft/Tag';
import SplitReveal from '../components/craft/SplitReveal';
import FillButton from '../components/craft/FillButton';
import PreFooterCTA from '../components/craft/PreFooterCTA';
import { EASE_ARR, fadeUp, stagger, viewport } from '../lib/motion';
import { MAINTENANCE_PLANS, PRIMARY_CTA, PROJECT_FLOORS, RENT_TO_OWN } from '../data/site';

function Check() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="mt-[3px] h-[18px] w-[18px] shrink-0 text-site-accent"
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
 * /hosting — the pricing page. Structure (in order of business priority):
 *   1. Hero — honest quote-based framing.
 *   2. Rent-to-own — THE differentiator, so it leads. Purple-tint panel.
 *   3. Custom builds — floor prices as stacked editorial rows (hairline
 *      dividers, no columns, no feature checklists). Every project is quoted
 *      individually; the rows are anchors, not a menu.
 *   4. Maintenance retainer — single floor figure.
 * Hard rule respected throughout: floor figures only, never a side-by-side
 * tier-comparison grid.
 */
export default function Hosting() {
  return (
    <>
      <section className="flex min-h-[100svh] items-center bg-white px-6 pt-32 pb-24 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR }}
            className="mb-7"
          >
            <Tag variant="outline">Pricing</Tag>
          </motion.div>

          <SplitReveal
            as="h1"
            trigger="mount"
            segments={[{ text: 'What it' }, { text: 'costs.', serif: true }]}
            className="max-w-[15ch] text-[clamp(44px,8vw,104px)] font-semibold leading-[0.98] tracking-[-0.02em] text-site-ink"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.5 }}
            className="mt-8 max-w-xl text-[17px] leading-[1.65] text-site-text-body"
          >
            Every build is scoped and quoted individually — no fixed menus. These are honest
            starting points so you know where you stand before we talk.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.6 }}
            className="mt-10"
          >
            <FillButton to={PRIMARY_CTA.href} variant="ink">
              {PRIMARY_CTA.label}
            </FillButton>
          </motion.div>
        </div>
      </section>

      {/* ── Rent-to-own — the differentiator leads ── */}
      <Panel bg="accent" className="px-6 py-28 md:px-10 md:py-36">
        <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-16">
          <div>
            <SplitReveal
              as="h2"
              segments={[
                { text: 'No upfront cost.' },
                { text: 'Pay monthly.' },
                { text: "It's yours", serif: true },
                { text: 'in 18 months.' },
              ]}
              className="max-w-[14ch] text-[clamp(38px,5.5vw,72px)] font-semibold leading-[0.98] tracking-[-0.03em] text-site-ink"
            />
            <motion.ul
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-9 flex flex-col gap-3.5"
            >
              {RENT_TO_OWN.terms.map((term) => (
                <motion.li
                  key={term}
                  variants={fadeUp}
                  className="flex gap-3 text-[16px] leading-[1.5] text-site-text-body"
                >
                  <Check />
                  <span>{term}</span>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-10"
            >
              <FillButton to={PRIMARY_CTA.href} variant="ink">
                {PRIMARY_CTA.label}
              </FillButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: EASE_ARR }}
            className="rounded-[2rem] bg-white px-9 py-11 shadow-[0_30px_80px_-30px_rgba(123,63,228,0.35)] md:px-11 md:py-14"
          >
            <p className="text-[15px] font-medium text-site-text-body">Starting from</p>
            <p className="mt-2 text-[clamp(48px,7vw,80px)] font-semibold leading-none tracking-[-0.03em] text-site-ink">
              {RENT_TO_OWN.floor.replace('From ', '').replace('/month', '')}
              <span className="text-[clamp(20px,2.4vw,28px)] font-medium text-site-text-body">/mo</span>
            </p>
            <p className="mt-5 border-t border-site-ink/10 pt-6 text-[19px] font-semibold leading-[1.4] text-site-ink">
              Own it outright at 18 months.
            </p>
            <p className="mt-2 text-[14px] text-site-text-secondary">
              Tier and scope confirmed on a call.
            </p>
          </motion.div>
        </div>
      </Panel>

      {/* ── Custom builds — floor prices as editorial rows, not a grid ── */}
      <Panel bg="white" className="px-6 py-28 md:px-10 md:py-36">
        <div className="mx-auto w-full max-w-6xl">
          <SplitReveal
            as="h2"
            segments={[{ text: 'Rather own it' }, { text: 'outright?', serif: true }]}
            className="max-w-[16ch] text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink"
          />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-6 max-w-xl text-[16px] leading-[1.65] text-site-text-body"
          >
            One quote, one invoice, yours from day one. Where builds usually start:
          </motion.p>

          <div className="mt-16 md:mt-20">
            {PROJECT_FLOORS.map((row, i) => (
              <motion.div
                key={row.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: EASE_ARR, delay: i * 0.06 }}
                className="flex flex-col gap-3 border-t border-site-line py-9 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10 md:py-12"
              >
                <div className="max-w-xl">
                  <h3 className="text-[clamp(24px,3.2vw,40px)] font-semibold leading-[1.1] tracking-[-0.025em] text-site-ink">
                    {row.title}
                  </h3>
                  <p className="mt-3 text-[15.5px] leading-[1.6] text-site-text-body">{row.desc}</p>
                </div>
                <p className="shrink-0 text-[clamp(22px,2.8vw,34px)] font-semibold tracking-[-0.02em] text-site-ink">
                  {row.floor}
                </p>
              </motion.div>
            ))}
            <div className="border-t border-site-line" />
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10"
          >
            <FillButton to={PRIMARY_CTA.href} variant="ink">
              {PRIMARY_CTA.label}
            </FillButton>
            <p className="max-w-md text-[14px] leading-[1.6] text-site-text-secondary">
              Starting points, not fixed quotes — your build is scoped properly on the call before
              work starts.
            </p>
          </motion.div>
        </div>
      </Panel>

      {/* ── Maintenance retainer ── */}
      <Panel bg="offwhite" className="px-6 py-28 md:px-10 md:py-32">
        <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div>
            <SplitReveal
              as="h2"
              segments={[{ text: 'Keep the site' }, { text: 'looked after.', serif: true }]}
              className="max-w-[15ch] text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink"
            />
            <p className="mt-6 max-w-md text-[16px] leading-[1.65] text-site-text-body">
              Useful for hosting, updates, small changes, support and ongoing improvements after the
              build is live.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: EASE_ARR }}
            className="grid gap-4 rounded-2xl border border-site-line bg-white p-6 sm:grid-cols-[1fr_auto] sm:items-center"
          >
            <div>
              <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-site-ink">Maintenance retainer</h3>
              <p className="mt-2 max-w-xl text-[14.5px] leading-[1.55] text-site-text-body">
                {MAINTENANCE_PLANS.description}
              </p>
            </div>
            <p className="text-[22px] font-semibold tracking-[-0.02em] text-site-ink">{MAINTENANCE_PLANS.floor}</p>
          </motion.div>
        </div>
      </Panel>

      <PreFooterCTA />
    </>
  );
}
