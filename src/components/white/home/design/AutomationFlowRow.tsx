import { motion, type Variants } from 'framer-motion';
import { fadeUp, viewport } from '../../../../lib/motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const svgProps = {
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const NODES = [
  { name: 'Customer', icon: <svg {...svgProps}><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 12 0v1" /></svg> },
  { name: 'Form', icon: <svg {...svgProps}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></svg> },
  { name: 'AI', icon: <svg {...svgProps}><path d="M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M3 12h3M18 12h3M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /><circle cx="12" cy="12" r="3.2" /></svg> },
  { name: 'CRM', icon: <svg {...svgProps}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 9h4M7 13h7M16 8.5v3" /></svg> },
  { name: 'WhatsApp', icon: <svg {...svgProps}><path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.5L3 21l2.1-5.6A8.5 8.5 0 1 1 21 11.5Z" /></svg> },
  { name: 'Done', end: true, icon: <svg {...svgProps} strokeWidth={1.8}><path d="M20 6 9 17l-5-5" /></svg> },
];

const node: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
const arrow: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: EASE } },
};

const Arrow = () => (
  <motion.div variants={arrow} className="-mt-6 flex shrink-0 items-center justify-center text-[#C8C8D0] md:px-0.5">
    <span className="md:hidden ml-[30px] rotate-90">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    </span>
    <span className="hidden md:inline">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    </span>
  </motion.div>
);

/**
 * The "I don't just build sites — I build systems" automation flow.
 * Customer → Form → AI → CRM → WhatsApp → Done, revealed in sequence.
 */
export default function AutomationFlowRow() {
  return (
    <section
      id="flow"
      data-screen-label="Automation"
      className="relative bg-[#FAFAFA] py-[clamp(96px,14vh,200px)]"
    >
      <div className="relative mx-auto w-full max-w-[1000px] px-8">
        <span className="absolute right-8 top-0 font-['JetBrains_Mono'] text-[12px] tracking-[0.22em] text-[#9E9EA8]">
          05 — Automation
        </span>

        <div className="mb-[clamp(56px,8vh,96px)]">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="block font-['JetBrains_Mono'] text-[12px] font-medium uppercase tracking-[0.22em] text-[#7B3FE4]"
          >
            The difference
          </motion.span>
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="mt-3 block h-px w-12 origin-left bg-[#7B3FE4]"
          />
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-5 font-['DM_Sans'] font-bold leading-[1.0] tracking-[-0.025em] text-[#0A0A0F]"
            style={{ fontSize: 'clamp(34px, 5vw, 72px)' }}
          >
            I don&apos;t just build sites.
            <br />I build{' '}
            <span className="font-['Instrument_Serif'] italic font-normal text-[#7B3FE4]">
              systems.
            </span>
          </motion.h2>
        </div>

        {/* flow diagram */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          variants={{ visible: { transition: { staggerChildren: 0.18 } } }}
          className="flex flex-col items-stretch gap-2 md:flex-row md:items-stretch md:gap-0"
        >
          {NODES.map((n, i) => (
            <div key={n.name} className="contents">
              <motion.div
                variants={node}
                className="flex flex-1 flex-row items-center gap-[18px] px-1.5 py-2.5 text-left md:min-w-[130px] md:flex-col md:gap-3.5 md:text-center"
              >
                <div
                  className={`grid h-16 w-16 shrink-0 place-items-center rounded-[18px] border ${
                    n.end
                      ? 'border-[#7B3FE4] bg-[#7B3FE4] text-white'
                      : 'border-[#E8E8EC] bg-white text-[#7B3FE4]'
                  }`}
                  style={{ boxShadow: n.end ? 'none' : '0 8px 24px rgba(123,63,228,0.08)' }}
                >
                  {n.icon}
                </div>
                <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.14em] text-[#6B6B7A]">
                  {n.name}
                </span>
              </motion.div>
              {i < NODES.length - 1 && <Arrow />}
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-[clamp(56px,8vh,90px)] max-w-[620px]"
        >
          <p className="font-['DM_Sans'] leading-[1.5] text-[#3D3D47]" style={{ fontSize: 'clamp(18px, 2vw, 22px)' }}>
            A lead comes in. The form captures it, AI sorts and replies, your CRM
            updates itself, and the customer gets a WhatsApp before you&apos;ve even
            seen the notification.{' '}
            <em className="font-['Instrument_Serif'] italic font-normal text-[#7B3FE4]">
              No manual steps.
            </em>{' '}
            That&apos;s the part most sites skip — and the part that actually saves
            you time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
