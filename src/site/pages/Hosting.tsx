import { motion } from 'framer-motion';
import Panel from '../components/craft/Panel';
import Tag from '../components/craft/Tag';
import SplitReveal from '../components/craft/SplitReveal';
import FillButton from '../components/craft/FillButton';
import PreFooterCTA from '../components/craft/PreFooterCTA';
import { EASE_ARR, fadeUp, stagger, viewport } from '../lib/motion';
import { MAINTENANCE_PLANS, PACKAGES, PRIMARY_CTA, RENT_TO_OWN } from '../data/site';

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
            <Tag variant="outline">Packages & Pricing</Tag>
          </motion.div>

          <SplitReveal
            as="h1"
            trigger="mount"
            segments={[{ text: 'Packages for websites that become' }, { text: 'systems.', serif: true }]}
            className="max-w-[15ch] text-[clamp(44px,8vw,104px)] font-semibold leading-[0.98] tracking-[-0.02em] text-site-ink"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.5 }}
            className="mt-8 max-w-xl text-[17px] leading-[1.65] text-site-text-body"
          >
            Clear starting points for professional websites, booking flows, dashboards and ongoing
            support. Every build is scoped properly before work starts.
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

      <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-14 max-w-2xl">
            <Tag variant="outline" className="mb-6">
              Website + system packages
            </Tag>
            <SplitReveal
              as="h2"
              segments={[{ text: 'Choose the' }, { text: 'level', serif: true }, { text: 'you need.' }]}
              className="max-w-[16ch] text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-site-ink"
            />
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 gap-6 lg:grid-cols-3"
          >
            {PACKAGES.map((plan) => (
              <motion.article
                key={plan.name}
                variants={fadeUp}
                className={`relative flex flex-col rounded-[30px] border bg-white p-7 md:p-8 ${
                  plan.popular
                    ? 'border-site-accent shadow-[0_35px_90px_-34px_rgba(123,63,228,0.4)]'
                    : 'border-site-line'
                }`}
              >
                {plan.popular && (
                  <Tag variant="outline" className="absolute right-6 top-6 border-site-accent text-site-accent">
                    Most Popular
                  </Tag>
                )}

                <h3 className="max-w-[10ch] text-[28px] font-semibold leading-[1.05] tracking-[-0.03em] text-site-ink">
                  {plan.name}
                </h3>
                <p className="mt-5 text-[clamp(28px,4vw,40px)] font-semibold leading-none tracking-[-0.03em] text-site-ink">
                  {plan.price}
                </p>
                <p className="mt-4 text-[15px] leading-[1.55] text-site-text-body">Best for: {plan.bestFor}</p>

                <ul className="mt-8 flex flex-1 flex-col gap-3.5 border-t border-site-line pt-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-[15px] leading-[1.45] text-site-text-body">
                      <Check />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-9">
                  <FillButton to={PRIMARY_CTA.href} variant="ink" className="w-full">
                    {PRIMARY_CTA.label}
                  </FillButton>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <p className="mt-8 max-w-3xl font-mono text-[12px] uppercase tracking-[0.14em] text-site-text-muted">
            Every build is scoped properly before work starts. These prices are starting points, not fixed quotes.
          </p>
        </div>
      </Panel>

      <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div>
            <Tag variant="outline" className="mb-6">
              Maintenance retainers
            </Tag>
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

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-4">
            {MAINTENANCE_PLANS.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                className={`grid gap-4 rounded-2xl border bg-white p-6 sm:grid-cols-[1fr_auto] sm:items-center ${
                  plan.popular ? 'border-site-accent' : 'border-site-line'
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-site-ink">{plan.name}</h3>
                    {plan.popular && (
                      <span className="rounded-full border border-site-accent px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-site-accent">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="mt-2 max-w-xl text-[14.5px] leading-[1.55] text-site-text-secondary">{plan.description}</p>
                </div>
                <p className="text-[22px] font-semibold tracking-[-0.02em] text-site-ink">{plan.price}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Panel>

      <Panel bg="ink" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[1fr_1fr] md:items-center">
          <div>
            <Tag variant="outline-dark" className="mb-7">
              Secondary option
            </Tag>
            <SplitReveal
              as="h2"
              segments={[{ text: 'Need the monthly' }, { text: 'route?', serif: true }]}
              className="max-w-[14ch] text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em] text-white"
            />
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-7">
            <h3 className="text-[24px] font-semibold tracking-[-0.02em] text-white">{RENT_TO_OWN.title}</h3>
            <p className="mt-4 text-[15.5px] leading-[1.65] text-white/70">{RENT_TO_OWN.note}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {RENT_TO_OWN.plans.map((plan) => (
                <span key={plan} className="rounded-full border border-white/10 px-3 py-1.5 text-[12px] text-white/65">
                  {plan}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Panel>

      <PreFooterCTA />
    </>
  );
}
