import { useEffect, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import usePrefersReducedMotion from '../../../../hooks/usePrefersReducedMotion';

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

// The rotating noun — keeps the line, just swaps what I build.
const NOUNS = ['websites', 'systems', 'automations', 'online stores'];

/** A single noun that swaps on a timed loop with a clean vertical word-slide. */
function RotatingNoun() {
  const reduced = usePrefersReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % NOUNS.length), 2300);
    return () => window.clearInterval(id);
  }, [reduced]);

  if (reduced) {
    return <em className={serif}>{NOUNS[0]}</em>;
  }

  return (
    <span className="relative inline-flex overflow-hidden align-bottom">
      {/* invisible spacer sizes the slot to the current word (no collapse) */}
      <span className={`${serif} invisible`} aria-hidden="true">
        {NOUNS[i]}
      </span>
      <AnimatePresence initial={false}>
        <motion.em
          key={NOUNS[i]}
          initial={{ y: '105%' }}
          animate={{ y: 0 }}
          exit={{ y: '-105%' }}
          transition={{ duration: 0.55, ease: EASE }}
          className={`${serif} absolute left-0 top-0 whitespace-nowrap`}
        >
          {NOUNS[i]}
        </motion.em>
      </AnimatePresence>
    </span>
  );
}

/**
 * Editorial intro statement — line-by-line masked reveal, with the noun on the
 * "I build …" line rotating on a timed loop (websites → systems → automations →
 * online stores). Same founder voice, same reveal — just alive.
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
          <Line>I&apos;m Christiaan. I build</Line>
          <Line>
            <RotatingNoun />
          </Line>
          <Line>that South African businesses</Line>
          <Line>
            use to <em className={serif}>stop doing</em>
          </Line>
          <Line>
            <em className={serif}>everything manually.</em>
          </Line>
          <Line>
            <span className="text-[#9E9EA8]">One person. Every build, hands-on.</span>
          </Line>
        </motion.p>
      </div>
    </section>
  );
}
