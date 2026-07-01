import { motion } from 'framer-motion';
import PreFooterCTA from '../components/craft/PreFooterCTA';
import FillButton from '../components/craft/FillButton';
import Panel from '../components/craft/Panel';
import SplitReveal from '../components/craft/SplitReveal';
import ServicesSection from '../components/site/ServicesSection';
import ClientLogos from '../components/site/ClientLogos';
import CaseStudyCycler from '../components/site/CaseStudyCycler';
import HeroBuilderScroll from '../components/site/HeroBuilderScroll';
import { RENT_TO_OWN } from '../data/site';
import { fadeUp, viewport } from '../lib/motion';

const TIERS = RENT_TO_OWN.plans.map((p) => {
  const [name, priceRaw] = p.split(' from ');
  return { name, price: priceRaw.replace('/month', '') };
});

const POINTS = ['Free build upfront', 'Fixed monthly fee', "Yours after 18 months"];

/**
 * RentalCallout — full-bleed accent panel (not an inset card) so it reads as
 * a section in its own right, matching the scale/weight of the ink panels
 * either side of it. Tier prices give the pitch concreteness without turning
 * the homepage into a pricing page (full breakdown stays on /hosting).
 */
function RentalCallout() {
  return (
    <Panel bg="accent" className="overflow-hidden px-6 py-24 md:px-10 md:py-32">
      {/* Ambient wash — echoes the glow language of the ink panels, tuned soft for a light bg */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-[6%] h-[420px] w-[420px] rounded-full bg-site-accent opacity-[0.08] blur-[130px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-site-accent">
          Website rental
        </p>
        <SplitReveal
          as="h2"
          segments={[
            { text: 'No upfront cost.' },
            { text: 'Pay monthly.' },
            { text: 'Own it after', serif: true },
            { text: '18 months.' },
          ]}
          className="mt-5 max-w-[16ch] text-[clamp(38px,6vw,76px)] font-semibold leading-[0.98] tracking-[-0.03em] text-site-ink"
        />
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-6 max-w-[42ch] text-[16px] leading-[1.65] text-site-text-secondary"
        >
          I build it free. You pay a flat monthly fee. Cancel or own it outright after 18 months — your call.
        </motion.p>

        {/* Tier price teaser — concrete without becoming a pricing page */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {TIERS.map((tier) => (
            <motion.div
              key={tier.name}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-site-ink/8 bg-white/70 px-6 py-5 backdrop-blur-sm"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-site-text-muted">
                {tier.name}
              </p>
              <p className="mt-2 text-[26px] font-semibold tracking-[-0.02em] text-site-ink">
                {tier.price}
                <span className="text-[14px] font-normal text-site-text-secondary">/mo</span>
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Checklist chips — same rounded-pill language as the services & case-study tags */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-8 flex flex-wrap gap-2"
        >
          {POINTS.map((point) => (
            <motion.span
              key={point}
              variants={fadeUp}
              className="rounded-full border border-site-ink/10 bg-white/50 px-4 py-2 text-[13px] text-site-text-body"
            >
              {point}
            </motion.span>
          ))}
        </motion.div>

        <div className="mt-12">
          <FillButton to="/hosting" variant="solid-accent">
            See full plans
          </FillButton>
        </div>
      </div>
    </Panel>
  );
}

export default function Home() {
  return (
    <>
      <HeroBuilderScroll />
      <ClientLogos />
      <ServicesSection />
      <CaseStudyCycler />
      <RentalCallout />
      <PreFooterCTA />
    </>
  );
}
