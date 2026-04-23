import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';

const EASE = [0.22, 1, 0.36, 1];

const STEPS = [
  {
    number: '01',
    title: 'We talk',
    body:
      'A quick 30-minute call. You tell me what the business needs, I map out exactly what to build.',
  },
  {
    number: '02',
    title: 'I build',
    body:
      'Design, code, automations. You get updates throughout. Most projects are live in under two weeks.',
  },
  {
    number: '03',
    title: 'You grow',
    body:
      'Site is live, systems run in the background. I stay on retainer if you need someone in your corner.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          eyebrow="The process"
          headline="Simple. Fast. No surprises."
          subtext="Three steps from 'we should talk' to 'it's live and running without me.'"
        />

        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
          }}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4"
        >
          {/* Dashed connector on desktop — draws itself in on viewport enter */}
          <svg
            aria-hidden="true"
            className="hidden md:block absolute top-7 left-[12%] right-[12%] h-[2px] w-[76%]"
            viewBox="0 0 1000 2"
            preserveAspectRatio="none"
          >
            <motion.line
              x1="0"
              y1="1"
              x2="1000"
              y2="1"
              stroke="#D4D4DA"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                pathLength: { duration: 1.4, ease: EASE, delay: 0.15 },
                opacity: { duration: 0.4, ease: 'linear' },
              }}
            />
          </svg>

          {STEPS.map((s) => (
            <motion.li
              key={s.number}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
              }}
              className="relative flex flex-col items-start"
            >
              <span
                className="flex items-center justify-center w-14 h-14 rounded-full
                           bg-white border border-[#E8E8EC] text-[15px] font-['DM_Sans']
                           font-semibold text-[#0A0A0F] tracking-[-0.01em] mb-6
                           relative z-10"
              >
                {s.number}
              </span>
              <h3 className="text-[22px] md:text-[24px] font-['DM_Sans'] font-semibold
                             text-[#0A0A0F] tracking-[-0.01em] mb-3">
                {s.title}
              </h3>
              <p className="text-[15px] font-['DM_Sans'] text-[#6B6B7A] leading-[1.65] max-w-sm">
                {s.body}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
