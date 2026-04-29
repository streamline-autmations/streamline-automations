/**
 * ProcessSection — 3-step process with oversized dim background numbers.
 * Framer Motion springStagger + springFadeUp on scroll.
 */
import { motion } from 'framer-motion';
import { springStagger, springFadeUp, viewport } from '../../../lib/motion';

const steps = [
  {
    num: '01',
    title: 'Book a Strategy Call',
    desc: 'Free 20-minute call. We learn your business, you learn what\'s possible. No fluff.',
  },
  {
    num: '02',
    title: 'We Build',
    desc: '7–10 day turnaround. Daily updates, no surprises. You\'re involved without doing the work.',
  },
  {
    num: '03',
    title: 'You Go Live',
    desc: 'Handover, walkthrough and ongoing support. You own everything from day one.',
  },
];

export default function ProcessSection() {
  return (
    <section
      className="px-6 md:px-12 lg:px-16 py-24"
      style={{ background: '#050505' }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section label */}
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/25 mb-14">
          How it works
        </p>

        {/* Steps grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={springStagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6"
        >
          {steps.map(step => (
            <motion.div
              key={step.num}
              variants={springFadeUp}
              className="relative overflow-hidden"
            >
              {/* Giant background number — decorative */}
              <span
                aria-hidden
                className="absolute -top-4 -left-2 font-bebas text-white select-none pointer-events-none leading-none"
                style={{ fontSize: 'clamp(100px, 14vw, 180px)', opacity: 0.04 }}
              >
                {step.num}
              </span>

              {/* Content */}
              <div className="relative pt-10 pl-1">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-7 h-7 rounded-full border border-[#774CFC]/30 flex items-center justify-center font-mono text-[10px] text-[#774CFC]/60"
                  >
                    {step.num}
                  </span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>
                <h3
                  className="font-bebas text-white mb-3 leading-none"
                  style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}
                >
                  {step.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
