import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import MagneticCTA from '../../ui/MagneticCTA';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};
const word: Variants = {
  hidden: { y: '112%' },
  visible: { y: 0, transition: { duration: 0.85, ease: EASE } },
};

/**
 * One masked word that rises into view. Word-level masking (not SplitText)
 * so the heading wraps naturally and never overflows at large display sizes.
 */
function Word({ children, serif = false }: { children: string; serif?: boolean }) {
  return (
    <span className="inline-block overflow-hidden align-top px-[0.05em] pb-[0.04em]">
      <motion.span
        variants={word}
        className={`inline-block pb-[0.16em] ${
          serif ? "font-['Instrument_Serif'] italic font-normal text-[#7B3FE4]" : ''
        }`}
      >
        {children}
      </motion.span>
    </span>
  );
}

const LEAD = ['Ready', 'to', 'stop', 'doing', 'everything'];

/**
 * Final CTA — pure white with two soft purple orbs and one big magnetic pill.
 * Heading rises word-by-word on scroll-enter (Framer mask reveal).
 */
export default function FinalCTAOrbs() {
  return (
    <section
      data-screen-label="Final CTA"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden text-center"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute -left-[8%] -top-[10%] h-[620px] w-[620px] rounded-full blur-[60px]"
          style={{ background: 'radial-gradient(circle, rgba(123,63,228,0.16), transparent 65%)' }}
        />
        <div
          className="absolute -bottom-[12%] -right-[6%] h-[560px] w-[560px] rounded-full blur-[60px]"
          style={{ background: 'radial-gradient(circle, rgba(155,95,245,0.14), transparent 65%)' }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1000px] px-8">
        <motion.h2
          aria-label="Ready to stop doing everything manually?"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={container}
          className="mx-auto max-w-[15ch] font-['DM_Sans'] font-bold leading-[0.98] tracking-[-0.03em] text-[#0A0A0F]"
          style={{ fontSize: 'clamp(44px, 7.6vw, 116px)' }}
        >
          {LEAD.map((w) => (
            <Word key={w}>{w}</Word>
          ))}
          <Word serif>manually?</Word>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
          className="flex justify-center"
          style={{ marginTop: 52 }}
        >
          <MagneticCTA strength={18}>
            <Link
              to="/contact"
              data-cursor="view"
              className="inline-flex items-center justify-center rounded-full bg-[#7B3FE4] px-12 py-[22px] font-['DM_Sans'] text-[18px] font-semibold text-white transition-[background-color,box-shadow] duration-300 hover:bg-[#6930D0] hover:shadow-[0_14px_40px_rgba(123,63,228,0.32)]"
              style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
            >
              Book a Free Call
            </Link>
          </MagneticCTA>
        </motion.div>
      </div>
    </section>
  );
}
