import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SplitReveal from '../components/craft/SplitReveal';
import WorkCard from '../components/craft/WorkCard';
import PreFooterCTA from '../components/craft/PreFooterCTA';
import FillButton from '../components/craft/FillButton';
import Panel from '../components/craft/Panel';
import Tag from '../components/craft/Tag';
import AutomationScrolly from '../components/site/AutomationScrolly';
import FAQSection from '../components/site/FAQSection';
import { ProcessSteps, ServiceRows } from '../components/site/ServiceBlocks';
import { EASE_ARR, fadeUp, stagger, viewport } from '../lib/motion';
import { PROJECT_FLOORS } from '../data/site';
import { SYSTEMS_FAQ } from '../data/service-faq';

const H2 = 'text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.02em]';
const BODY = 'text-[16px] leading-[1.65] text-site-text-body md:text-[17px]';
const TEXT_LINK =
  'inline-flex min-h-[44px] items-center font-semibold text-site-ink underline-offset-4 outline-none hover:text-site-accent hover:underline focus-visible:text-site-accent focus-visible:underline';

// What gets automated — every row backed by a live client build.
const AUTOMATED = [
  {
    title: 'Leads that can’t get lost',
    body: 'Enquiries land in one place instead of scattered across WhatsApp, email and a notebook. At RecklessBear an AI assistant qualifies leads 24/7, books appointments, and escalates any unanswered lead to the CEO’s phone.',
    link: { to: '/work/recklessbear', label: 'See the RecklessBear build →' },
  },
  {
    title: 'WhatsApp + email notifications',
    body: 'Order confirmations, status updates and instant enquiry alerts. Every BLOM order sends the customer a WhatsApp confirmation and an order-ready email on its own. Ameli Designs and JJ Glassworks get an email the second someone enquires.',
    link: { to: '/work/blom', label: 'See the BLOM build →' },
  },
  {
    title: 'Quotes, invoices + orders',
    body: 'Paperwork that sends itself. Every BLOM order generates a branded PDF invoice. RecklessBear runs a 12-stage production board from quote to delivery, and customers get a WhatsApp update as their order moves.',
  },
  {
    title: 'Dashboards + admin you own',
    body: 'Orders, stock, customers and sales in one place, built for how you work. The owner of CW Electronics runs 700+ products, retail and wholesale pricing and every order himself, with no developer in the loop.',
    link: { to: '/work/cw-electronics', label: 'See the CW Electronics build →' },
  },
];

const SIGNS = [
  'You answer the same WhatsApp questions every day.',
  'Leads live in a notebook, a spreadsheet or your head.',
  'You copy order details from one place into another.',
  'Customers message to ask where their order is.',
  'Quotes go out late because you’re busy doing the actual work.',
];

const STEPS = [
  {
    title: 'Map the process',
    body: 'On a free call we walk through how the work moves today: where enquiries come from, who does what, and where it gets stuck.',
  },
  {
    title: 'Build the system',
    body: 'I build the workflow with whatever the job needs: n8n, Supabase, the WhatsApp API, Voiceflow, PayFast or ShipLogic.',
  },
  {
    title: 'Launch + two-week check',
    body: 'It goes live. For two weeks after launch I check everything and fix any issues that come up.',
  },
  {
    title: 'Keep it running',
    body: 'After that, fixes and changes are quoted per job or covered by a monthly retainer, which is always available.',
  },
];

/**
 * Systems — the business automation service page. Hero (white) →
 * AutomationScrolly (ink, pinned 6-stage flow — the page's one showpiece) →
 * what gets automated, each row tied to a real build (white) → signs you need
 * it (offwhite) → how a project runs (white) → what it costs (purple tint) →
 * FAQ → recent build → end CTA. Dark budget stays at two: scrolly + pre-footer.
 * One floor figure only, from PROJECT_FLOORS — never a grid.
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
            segments={[{ text: 'Automation that does' }, { text: 'the admin', serif: true }, { text: 'for you.' }]}
            className="max-w-5xl text-[clamp(44px,8vw,104px)] font-semibold leading-[0.98] tracking-[-0.02em] text-site-ink"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.5 }}
            className="mt-8 max-w-xl text-[17px] leading-[1.65] text-site-text-body"
          >
            Business automation for small businesses: WhatsApp and email notifications, a CRM that
            catches every lead, and invoices and order updates that send themselves. Usually 5–14 days to
            build.
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

      {/* WHAT GETS AUTOMATED — white (the scrolly owns the dark moment) */}
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
          <ServiceRows rows={AUTOMATED} />
        </div>
      </Panel>

      {/* SIGNS YOU NEED IT — offwhite */}
      <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12">
          <SplitReveal
            as="h2"
            segments={[{ text: 'You probably need this' }, { text: 'if…', serif: true }]}
            className={`max-w-[12ch] text-site-ink ${H2}`}
          />
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="divide-y divide-site-line border-y border-site-line"
          >
            {SIGNS.map((sign) => (
              <motion.li
                key={sign}
                variants={fadeUp}
                className="py-5 text-[18px] font-medium leading-[1.45] tracking-[-0.01em] text-site-ink md:text-[20px]"
              >
                {sign}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Panel>

      {/* HOW A PROJECT RUNS — white */}
      <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <SplitReveal
            as="h2"
            segments={[{ text: 'How a project' }, { text: 'runs.', serif: true }]}
            className={`max-w-[16ch] text-site-ink ${H2}`}
          />
          <ProcessSteps steps={STEPS} />
          <p className={`mt-12 max-w-2xl ${BODY}`}>
            Most systems take 5 to 14 days. BLOM, RecklessBear and CW Electronics all run on a retainer.
            I can connect automation to the website you already
            have, but it&rsquo;s easiest to manage when I build the site and the system together.
          </p>
        </div>
      </Panel>

      {/* WHAT IT COSTS — purple tint, one floor line, no grid */}
      <Panel bg="accent" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <SplitReveal
            as="h2"
            segments={[{ text: 'What it' }, { text: 'costs.', serif: true }]}
            className={`text-site-ink ${H2}`}
          />
          <p className="mt-8 max-w-3xl text-[clamp(22px,2.8vw,32px)] font-medium leading-[1.3] tracking-[-0.015em] text-site-ink">
            A website with automation built in starts {PROJECT_FLOORS[1].floor.replace(/^From/, 'from')}.
            Every system is quoted on a free call, so you know the full price before anything starts.
          </p>
          <p className={`mt-6 max-w-2xl ${BODY}`}>
            Running costs depend on the plan and the services you choose: some tools and WhatsApp
            messaging carry their own fees. I always keep them as low as possible.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <FillButton to="/contact" variant="ink">
              Book a Free Call
            </FillButton>
            <Link to="/hosting" data-cursor="link" className={`text-[15px] ${TEXT_LINK}`}>
              See all pricing →
            </Link>
          </div>
        </div>
      </Panel>

      <FAQSection items={SYSTEMS_FAQ} bg="white" />

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
          <p className="mx-auto mt-14 max-w-3xl text-[16px] leading-[1.6] text-site-text-body">
            Need the website too?{' '}
            <Link to="/websites" data-cursor="link" className={TEXT_LINK}>
              See website design →
            </Link>{' '}
            Run a restaurant?{' '}
            <Link to="/restaurant-direct" data-cursor="link" className={TEXT_LINK}>
              See Restaurant Direct →
            </Link>
          </p>
        </div>
      </Panel>

      <PreFooterCTA />
    </>
  );
}
