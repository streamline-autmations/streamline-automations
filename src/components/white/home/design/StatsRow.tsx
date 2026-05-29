import { motion } from 'framer-motion';
import AnimatedNumber from '../../ui/AnimatedNumber';
import { fadeUp, viewport } from '../../../../lib/motion';

const STATS = [
  { value: 8, suffix: '+', label: 'Clients delivered across SA' },
  { value: 3, suffix: '', label: 'Years building in South Africa' },
  { value: 700, suffix: '+', label: 'Products live for CW — under 2 weeks' },
  { value: 24, suffix: '/7', label: 'Automated systems running' },
];

/**
 * "By the numbers" — four count-up stats in mono numerals, each on a hairline
 * top border. Real builds, real numbers (no fake metrics).
 */
export default function StatsRow() {
  return (
    <section
      data-screen-label="Stats"
      className="relative py-[clamp(96px,14vh,200px)]"
    >
      <div className="relative mx-auto w-full max-w-[1000px] px-8">
        <span className="absolute right-8 top-0 font-['JetBrains_Mono'] text-[12px] tracking-[0.22em] text-[#9E9EA8]">
          04 — Numbers
        </span>

        <div className="mb-[clamp(56px,8vh,96px)]">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="block font-['JetBrains_Mono'] text-[12px] font-medium uppercase tracking-[0.22em] text-[#7B3FE4]"
          >
            By the numbers
          </motion.span>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-5 font-['DM_Sans'] font-bold leading-[1.0] tracking-[-0.025em] text-[#0A0A0F]"
            style={{ fontSize: 'clamp(34px, 5vw, 72px)' }}
          >
            Real builds.{' '}
            <span className="font-['Instrument_Serif'] italic font-normal text-[#7B3FE4]">
              Real numbers.
            </span>
          </motion.h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {STATS.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="border-t border-[#E8E8EC] pt-7">
              <div
                className="flex items-baseline font-['JetBrains_Mono'] font-bold leading-[0.9] tracking-[-0.03em] text-[#0A0A0F]"
                style={{ fontSize: 'clamp(46px, 6vw, 92px)' }}
              >
                <AnimatedNumber to={s.value} duration={1.6} />
                {s.suffix && <span className="text-[#7B3FE4]">{s.suffix}</span>}
              </div>
              <p className="mt-4 max-w-[200px] font-['DM_Sans'] text-[15px] leading-[1.4] text-[#6B6B7A]">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
