import { motion } from 'framer-motion';
import Panel from '../craft/Panel';
import Tag from '../craft/Tag';
import SplitReveal from '../craft/SplitReveal';
import FillButton from '../craft/FillButton';
import { EASE_ARR } from '../../lib/motion';

/** Rental callout — the rent-to-own model in one line, on a soft purple card. */
export default function RentalSection() {
  return (
    <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] bg-site-accent-soft px-7 py-14 md:rounded-[2.5rem] md:px-16 md:py-20">
          <Tag variant="ink" className="mb-7">
            The rental model
          </Tag>
          <SplitReveal
            as="h2"
            segments={[
              { text: 'No upfront cost. Pay monthly.' },
              { text: 'Own it', serif: true },
              { text: 'after 18 months.' },
            ]}
            className="max-w-[18ch] text-[clamp(30px,4.6vw,60px)] font-semibold leading-[1.05] tracking-[-0.02em] text-site-ink"
          />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.1 }}
            className="mt-8 flex flex-col gap-7 md:flex-row md:items-center md:justify-between"
          >
            <p className="max-w-md text-[16px] leading-[1.6] text-site-text-body md:text-[17px]">
              I build the site free upfront. You pay a simple monthly fee, and after 18 months it's
              yours outright — full files, no strings.
            </p>
            <FillButton to="/hosting" variant="ink" className="shrink-0">
              See the plans
            </FillButton>
          </motion.div>
        </div>
      </div>
    </Panel>
  );
}
