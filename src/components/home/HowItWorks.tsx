import { motion } from 'framer-motion';
import { springStagger, springFadeUp, viewport } from '../../lib/motion';

const steps = [
  {
    number: '01',
    title: 'Book a Strategy Call',
    description: 'Free 30-minute call. We learn your business, your goals and what\'s holding you back.',
  },
  {
    number: '02',
    title: 'We Build',
    description: 'Design, development, automation setup — all handled. You review, we refine. No back-and-forth chaos.',
  },
  {
    number: '03',
    title: 'You Go Live',
    description: 'Launch day. Your site is live, your systems are running and your business doesn\'t sleep anymore.',
  },
];

export default function HowItWorks() {
  return (
    <motion.div
      className="relative mt-12"
      variants={springStagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {/* Dashed connecting line — desktop only */}
      <div className="hidden md:block absolute top-5 left-[16%] right-[16%] h-px border-t border-dashed border-white/15 pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {steps.map((step) => (
          <motion.div
            key={step.number}
            variants={springFadeUp}
            className="flex flex-col gap-4 text-center md:text-left"
          >
            {/* Step number circle */}
            <div className="flex justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full border border-[#774CFC]/40 flex items-center justify-center bg-[#774CFC]/8">
                <span className="font-bebas text-lg text-[#774CFC] leading-none">{step.number}</span>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bebas text-2xl mb-2">{step.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
