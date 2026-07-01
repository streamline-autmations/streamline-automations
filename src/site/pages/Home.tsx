import { motion } from 'framer-motion';
import PreFooterCTA from '../components/craft/PreFooterCTA';
import FillButton from '../components/craft/FillButton';
import Panel from '../components/craft/Panel';
import SplitReveal from '../components/craft/SplitReveal';
import ServicesSection from '../components/site/ServicesSection';
import ClientLogos from '../components/site/ClientLogos';
import CaseStudyCycler from '../components/site/CaseStudyCycler';
import StatsSection from '../components/site/StatsSection';
import HeroBuilderScroll from '../components/site/HeroBuilderScroll';
import { RENT_TO_OWN } from '../data/site';
import { fadeUp, viewport } from '../lib/motion';

/**
 * RentalCallout — one strong idea: headline making the offer plainly, paired
 * with a single bold price card so the section isn't text-only. No small
 * mono labels carrying the message — the price and the payoff are both big.
 */
function RentalCallout() {
  return (
    <Panel bg="white" className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-16">
        <div>
          <SplitReveal
            as="h2"
            segments={[
              { text: 'I build it.' },
              { text: 'You pay monthly.' },
              { text: "It's yours", serif: true },
              { text: 'in 18 months.' },
            ]}
            className="max-w-[14ch] text-[clamp(38px,5.5vw,72px)] font-semibold leading-[0.98] tracking-[-0.03em] text-site-ink"
          />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-8 max-w-[42ch] text-[18px] leading-[1.65] text-site-text-body"
          >
            No deposit, no upfront invoice. Just a flat monthly fee for the build and hosting —
            and after 18 months the site is yours outright, full files, no strings.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-10"
          >
            <FillButton to="/hosting" variant="ink">
              See how it works
            </FillButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2rem] bg-site-accent-soft px-9 py-11 md:px-11 md:py-14"
        >
          <p className="text-[15px] font-medium text-site-text-secondary">Starting from</p>
          <p className="mt-2 text-[clamp(48px,7vw,80px)] font-semibold leading-none tracking-[-0.03em] text-site-ink">
            {RENT_TO_OWN.floor.replace('From ', '').replace('/month', '')}
            <span className="text-[clamp(20px,2.4vw,28px)] font-medium text-site-text-secondary">/mo</span>
          </p>
          <p className="mt-5 border-t border-site-ink/10 pt-6 text-[19px] font-semibold leading-[1.4] text-site-ink">
            Own it outright at 18 months.
          </p>
        </motion.div>
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
      <StatsSection />
      <RentalCallout />
      <PreFooterCTA />
    </>
  );
}
