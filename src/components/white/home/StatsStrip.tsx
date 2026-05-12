import { motion } from 'framer-motion';
import AnimatedNumber from '../ui/AnimatedNumber';
import { fadeUp, viewport } from '../../../lib/motion';
import type { StatItem } from '../../../types/case-study';

interface Props {
  stats: StatItem[];
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * "By the Numbers" — 4 count-up stats, 2x2 on mobile, 4 across on desktop.
 * Uses the existing AnimatedNumber primitive (animate() + useInView).
 */
export default function StatsStrip({ stats }: Props) {
  return (
    <section className="relative bg-white py-24 md:py-32" aria-label="By the numbers">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center"
        >
          <span className="block text-[11px] font-['DM_Sans'] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-4">
            By the numbers
          </span>
          <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em] leading-[1.1] max-w-[24ch] mx-auto">
            Real builds.{' '}
            <span className="font-['Instrument_Serif'] italic font-normal">
              Real numbers.
            </span>
          </h2>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8"
        >
          {stats.map((stat) => (
            <motion.li
              key={stat.label}
              variants={fadeUp}
              className="flex flex-col items-start md:items-center text-left md:text-center border-t border-[#E8E8EC] pt-5"
            >
              <span className="font-['DM_Sans'] font-semibold tracking-[-0.03em] text-[#0A0A0F] text-[44px] md:text-[56px] leading-[1] tabular-nums">
                <AnimatedNumber to={stat.value} suffix={stat.suffix ?? ''} duration={1.5} />
              </span>
              <span className="mt-3 text-sm font-['DM_Sans'] font-medium text-[#3D3D47] leading-[1.4]">
                {stat.label}
              </span>
              <span className="mt-1 text-xs font-['DM_Sans'] text-[#9E9EA8]">
                {stat.source}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          className="mt-14 text-center"
        >
          <p className="text-sm font-['DM_Sans'] text-[#6B6B7A]">
            Real builds. Real clients. Real numbers.
          </p>
          <p className="mt-1 text-xs font-['DM_Sans'] text-[#9E9EA8]">
            Client testimonials from BLOM, RecklessBear, Ameli, and CW Electronics — coming soon.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
