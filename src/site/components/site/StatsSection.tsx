import { motion, type Variants } from 'framer-motion';
import Panel from '../craft/Panel';
import CountUp from './CountUp';
import { EASE_ARR } from '../../lib/motion';

const statContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const statItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_ARR } },
};

const lineReveal: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.75, ease: EASE_ARR } },
};

// Real numbers only — no invented metrics.
const STATS: { to: number; prefix?: string; suffix?: string; label: string }[] = [
  { to: 8, suffix: '+', label: 'Clients delivered, end to end' },
  { to: 700, suffix: '+', label: 'Products live in under two weeks — CW Electronics' },
  { to: 4, suffix: '-day', label: 'Portfolio build — Ameli Designs' },
  { to: 12, suffix: '-stage', label: 'Production tracking — RecklessBear' },
];

/** By the numbers — honest stats, count up on scroll-in. White treatment so
 *  ink stays reserved for the scrolly + pre-footer moments. */
export default function StatsSection() {
  return (
    <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          variants={statContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STATS.map((s) => (
            <motion.div key={s.label} variants={statItem} className="relative pt-6">
              {/* Border line draws left-to-right as the stat enters view */}
              <motion.span
                variants={lineReveal}
                aria-hidden="true"
                className="absolute inset-x-0 top-0 block h-px origin-left bg-site-line-mid"
              />
              <CountUp
                to={s.to}
                prefix={s.prefix}
                suffix={s.suffix}
                className="block text-[clamp(48px,7vw,84px)] font-semibold leading-none tracking-[-0.03em] text-site-ink"
              />
              <p className="mt-4 max-w-[24ch] text-[14px] leading-[1.5] text-site-text-body">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Panel>
  );
}
