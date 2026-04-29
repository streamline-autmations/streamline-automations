import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #F5F0FF 0%, #EFE6FF 50%, #F5F0FF 100%)',
      }}
    >
      {/* Soft purple ambient — anchors the section visually */}
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full
                   bg-[#A77BFF] blur-[120px] opacity-[0.18] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.5]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(123,63,228,0.15) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.5), transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.5), transparent 80%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        <SectionHeader
          eyebrow="The process"
          headline="Simple. Fast. No surprises."
          subtext="Three steps from 'we should talk' to 'it's live and running without me.'"
          align="center"
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
              stroke="#7B3FE4"
              strokeWidth="1.5"
              strokeOpacity={0.45}
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

          {STEPS.map((s, i) => (
            <motion.li
              key={s.number}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
              }}
              className="relative flex flex-col items-start group"
            >
              <motion.span
                whileHover={{ scale: 1.06, y: -2 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="flex items-center justify-center w-14 h-14 rounded-full
                           bg-white border border-[#E0D6FF]
                           shadow-[0_4px_18px_rgba(123,63,228,0.12)]
                           text-[15px] font-['DM_Sans']
                           font-semibold text-[#7B3FE4] tracking-[-0.01em] mb-6
                           relative z-10 cursor-default"
              >
                {s.number}
                {/* Pulse ring on the center step for visual emphasis */}
                {i === 1 && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border border-[#7B3FE4]"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.4, ease: 'easeOut', repeat: Infinity }}
                  />
                )}
              </motion.span>
              <h3 className="text-[22px] md:text-[24px] font-['DM_Sans'] font-semibold
                             text-[#0A0A0F] tracking-[-0.01em] mb-3">
                {s.title}
              </h3>
              <p className="text-[15px] font-['DM_Sans'] text-[#5A5A6A] leading-[1.65] max-w-sm">
                {s.body}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
