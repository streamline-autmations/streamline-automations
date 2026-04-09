import { motion } from 'framer-motion';
import { springStagger, springFadeUp, viewport } from '../../lib/motion';

const stats = [
  { value: '3×',     label: 'More Quotes',     source: 'RecklessBear' },
  { value: 'R60K+',  label: 'Sales in Month 3', source: 'BLOM Cosmetics' },
  { value: '20hrs+', label: 'Saved Monthly',    source: 'BLOM Cosmetics' },
  { value: '100%',   label: 'Lead Capture',     source: 'RecklessBear' },
];

export default function ResultsBar() {
  return (
    <section className="section py-14">
      <div className="container">
        <div className="text-center mb-8">
          <span className="label">Real Results</span>
        </div>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/8"
          variants={springStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={springFadeUp}
              className="relative flex flex-col items-center justify-center gap-1 bg-[#050508] px-6 py-8 text-center group hover:bg-white/[0.03] transition-colors duration-300"
            >
              {/* Subtle accent line on hover */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-px bg-gradient-to-r from-transparent via-[#774CFC]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span
                className="font-bebas text-4xl md:text-5xl bg-gradient-to-r from-[#774CFC] to-[#F26A3D] bg-clip-text text-transparent"
              >
                {stat.value}
              </span>
              <span className="text-white/70 text-sm font-medium">{stat.label}</span>
              <span className="text-white/25 text-xs font-mono mt-1">{stat.source}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
