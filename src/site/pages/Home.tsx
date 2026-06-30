import { motion } from 'framer-motion';
import PreFooterCTA from '../components/craft/PreFooterCTA';
import FillButton from '../components/craft/FillButton';
import Panel from '../components/craft/Panel';
import ServicesSection from '../components/site/ServicesSection';
import ClientLogos from '../components/site/ClientLogos';
import CaseStudyCycler from '../components/site/CaseStudyCycler';
import HeroVideoScroll from '../components/site/HeroVideoScroll';
import { fadeUp, viewport } from '../lib/motion';

function RentalCallout() {
  return (
    <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mx-auto w-full max-w-6xl overflow-hidden rounded-[32px] bg-site-accent-soft px-8 py-16 md:px-16 md:py-20"
      >
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[22ch]">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-site-accent">
              Website rental
            </p>
            <h2 className="mt-5 text-[clamp(34px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.03em] text-site-ink">
              No upfront cost. Pay monthly. Own it after 18 months.
            </h2>
          </div>

          <div className="flex flex-col gap-8 md:items-end">
            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
              className="flex flex-col gap-3"
            >
              {[
                'I build the site free upfront',
                'You pay a fixed monthly fee',
                "After 18 months — it's yours",
              ].map((point) => (
                <motion.div
                  key={point}
                  variants={fadeUp}
                  className="flex items-center gap-3"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-site-accent" aria-hidden="true" />
                  <span className="text-[15px] text-site-text-body">{point}</span>
                </motion.div>
              ))}
            </motion.div>
            <FillButton to="/hosting" variant="ink">
              See plans
            </FillButton>
          </div>
        </div>
      </motion.div>
    </Panel>
  );
}

export default function Home() {
  return (
    <>
      <HeroVideoScroll />
      <ClientLogos />
      <ServicesSection />
      <CaseStudyCycler />
      <RentalCallout />
      <PreFooterCTA />
    </>
  );
}
