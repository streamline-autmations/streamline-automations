import { motion, type Variants } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const line: Variants = {
  hidden: { y: '110%' },
  visible: { y: 0, transition: { duration: 1, ease: EASE } },
};

/** One masked line that rises into view on scroll. */
function Line({ children }: { children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
      <motion.span variants={line} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
}

const serif = "font-['Instrument_Serif'] italic font-normal text-[#7B3FE4]";

/**
 * Editorial intro statement — line-by-line masked reveal.
 * "I'm Christiaan. I build the websites and automation systems…"
 */
export default function IntroStatement() {
  return (
    <section
      data-screen-label="Intro"
      className="relative py-[clamp(96px,14vh,200px)]"
    >
      <div className="relative mx-auto w-full max-w-[1000px] px-8">
        <span className="absolute right-8 top-0 font-['JetBrains_Mono'] text-[12px] tracking-[0.22em] text-[#9E9EA8]">
          01 — Intro
        </span>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
          variants={container}
          className="max-w-[920px] font-['DM_Sans'] font-medium leading-[1.18] tracking-[-0.02em] text-[#0A0A0F]"
          style={{ fontSize: 'clamp(28px, 3.8vw, 52px)' }}
        >
          <Line>I&apos;m Christiaan. I build the websites</Line>
          <Line>and automation systems that South</Line>
          <Line>
            African businesses use to <em className={serif}>stop</em>
          </Line>
          <Line>
            <em className={serif}>doing everything manually.</em>
          </Line>
          <Line>
            <span className="text-[#9E9EA8]">One person. Every build, hands-on.</span>
          </Line>
        </motion.p>
      </div>
    </section>
  );
}
