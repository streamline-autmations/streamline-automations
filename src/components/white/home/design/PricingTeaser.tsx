import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeUp, viewport } from '../../../../lib/motion';

const STEPS = ['I build it', 'You pay monthly', 'Own it after 18 months'];

/**
 * Rental-model teaser on a soft purple-tint background.
 * "No upfront cost. Pay monthly." → links to /hosting for the full tiers.
 */
export default function PricingTeaser() {
  return (
    <section
      data-screen-label="Pricing"
      className="relative bg-[#F0EBFF] py-[clamp(96px,14vh,200px)]"
    >
      <div className="relative mx-auto w-full max-w-[820px] px-8 text-center">
        <span className="absolute left-8 top-0 font-['JetBrains_Mono'] text-[12px] tracking-[0.22em] text-[#7B3FE4]">
          06 — Rental
        </span>

        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="block font-['JetBrains_Mono'] text-[12px] font-medium uppercase tracking-[0.22em] text-[#7B3FE4]"
        >
          The rental model
        </motion.span>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-5 font-['DM_Sans'] font-bold leading-[1.0] tracking-[-0.025em] text-[#0A0A0F]"
          style={{ fontSize: 'clamp(34px, 5.4vw, 76px)' }}
        >
          No upfront cost.{' '}
          <span className="font-['Instrument_Serif'] italic font-normal text-[#7B3FE4]">
            Pay monthly.
          </span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto mt-8 max-w-[560px] font-['DM_Sans'] leading-[1.5] text-[#3D3D47]"
          style={{ fontSize: 'clamp(18px, 2vw, 23px)' }}
        >
          I build it. You pay monthly. You own it outright after 18 months — no
          balloon payment, no catch.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="my-11 flex flex-wrap justify-center gap-3.5"
        >
          {STEPS.map((step) => (
            <span
              key={step}
              className="rounded-full border border-[#7B3FE4]/[0.16] bg-white/70 px-5 py-3 font-['JetBrains_Mono'] text-[12px] uppercase tracking-[0.14em] text-[#7B3FE4]"
            >
              {step}
            </span>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <Link
            to="/hosting"
            className="group inline-flex items-center justify-center gap-2.5 font-['DM_Sans'] text-[16px] font-semibold text-[#0A0A0F]"
          >
            See how it works
            <span className="text-[#7B3FE4] transition-transform duration-[400ms] group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
