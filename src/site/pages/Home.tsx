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

/**
 * RentalCallout — same white panel + layout language as ServicesSection
 * (heading left / supporting copy right, clean bordered cards, no eyebrow
 * label, no accent glow) so the two sections read as one cohesive system
 * instead of the callout feeling like a separate, more "salesy" panel.
 */
function RentalCallout() {
  return (
    <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SplitReveal
            as="h2"
            segments={[
              { text: 'No upfront cost.' },
              { text: 'Pay monthly.' },
              { text: 'Own it after', serif: true },
              { text: '18 months.' },
            ]}
            className="max-w-[16ch] text-[clamp(38px,5.5vw,72px)] font-semibold leading-[0.98] tracking-[-0.03em] text-site-ink"
          />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="max-w-[38ch] text-[16px] leading-[1.65] text-site-text-secondary md:text-right"
          >
            I build it free. You pay a flat monthly fee. Cancel or own it outright after 18 months — your call.
          </motion.p>
        </div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {TIERS.map((tier) => (
            <motion.div
              key={tier.name}
              variants={fadeUp}
              className="rounded-[20px] border border-site-line px-6 py-6 transition-colors duration-300 ease-brand hover:border-site-line-mid"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-site-text-muted">
                {tier.name}
              </p>
              <p className="mt-2 text-[28px] font-semibold tracking-[-0.02em] text-site-ink">
                {tier.price}
                <span className="text-[14px] font-normal text-site-text-secondary">/mo</span>
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12">
          <FillButton to="/hosting" variant="ink">
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
