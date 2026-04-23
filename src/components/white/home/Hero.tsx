import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import AnimatedNumber from '../ui/AnimatedNumber';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const lineRise = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.85, ease: EASE } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export default function Hero() {
  const { scrollY } = useScroll();
  const blobY = useTransform(scrollY, [0, 800], [0, -120]);
  const washY = useTransform(scrollY, [0, 800], [0, -60]);

  return (
    <section className="relative pt-36 md:pt-44 pb-24 md:pb-32 overflow-hidden">
      {/* Layer 1a — top aurora sweep, two-tone purple, drifts up on scroll */}
      <motion.div
        aria-hidden="true"
        style={{ y: washY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1100px 600px at 50% -8%, rgba(123,63,228,0.18), transparent 65%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(700px 380px at 88% 12%, rgba(167,123,255,0.14), transparent 70%)',
          }}
        />
      </motion.div>

      {/* Layer 1b — fine grid wash, very faint, only the upper half */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[60%] pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(123,63,228,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(123,63,228,0.06) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 85%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 85%)',
        }}
      />

      {/* Layer 2 — slow-floating ambient blobs, parallax + endless drift */}
      <motion.div
        aria-hidden="true"
        style={{ y: blobY }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          animate={{
            x: [0, 28, -12, 0],
            y: [0, -22, 14, 0],
            scale: [1, 1.06, 0.97, 1],
          }}
          transition={{ duration: 22, ease: 'easeInOut', repeat: Infinity }}
          className="absolute -top-20 left-[54%] w-[700px] h-[700px] rounded-full
                     blur-[110px] opacity-[0.18] bg-[#7B3FE4]"
        />
        <motion.div
          animate={{
            x: [0, -22, 16, 0],
            y: [0, 12, -18, 0],
            scale: [1, 0.96, 1.05, 1],
          }}
          transition={{ duration: 28, ease: 'easeInOut', repeat: Infinity }}
          className="absolute top-32 -left-10 w-[480px] h-[480px] rounded-full
                     blur-[100px] opacity-[0.13] bg-[#7B3FE4]"
        />
        {/* Lower-right warm purple bloom — anchors the bottom of the hero */}
        <motion.div
          animate={{
            x: [0, 18, -14, 0],
            y: [0, -14, 10, 0],
            scale: [1, 1.05, 0.98, 1],
          }}
          transition={{ duration: 32, ease: 'easeInOut', repeat: Infinity }}
          className="absolute bottom-[-120px] right-[-80px] w-[560px] h-[560px] rounded-full
                     blur-[120px] opacity-[0.16] bg-[#A77BFF]"
        />
      </motion.div>

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex items-center gap-3 mb-7"
        >
          <span className="relative inline-flex h-2 w-2">
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-[#7B3FE4]"
              animate={{ scale: [1, 2.4, 1], opacity: [0.45, 0, 0.45] }}
              transition={{ duration: 2.2, ease: 'easeOut', repeat: Infinity }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7B3FE4]" />
          </span>
          <span
            className="text-[11px] font-['DM_Sans'] font-medium uppercase
                       tracking-[0.14em] text-[#9E9EA8]"
          >
            Web Design &amp; Automation · Vaal Triangle, SA
          </span>
        </motion.div>

        {/* Clip-mask line reveal */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-[44px] leading-[1.05] sm:text-[56px] md:text-[76px]
                     lg:text-[88px] font-['DM_Sans'] font-semibold text-[#0A0A0F]
                     tracking-[-0.035em] max-w-4xl"
        >
          <span className="block overflow-hidden pb-[0.12em]">
            <motion.span variants={lineRise} className="block">
              Websites that work.
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.12em]">
            <motion.span variants={lineRise} className="block">
              <span className="font-['Instrument_Serif'] italic font-normal">
                Systems
              </span>{' '}
              that scale.
            </motion.span>
          </span>
        </motion.h1>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.55 },
            },
          }}
        >
          <motion.p
            variants={fadeUp}
            className="mt-7 text-[17px] md:text-[19px] font-['DM_Sans']
                       text-[#3D3D47] leading-[1.6] max-w-2xl"
          >
            I build custom websites and automation systems for South African
            businesses that are done doing everything manually. Fast, clean,
            and ready to go.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Button href="/contact" size="lg">
              Book a Free Call
            </Button>
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-1.5 px-2 py-3 text-sm
                         font-['DM_Sans'] font-medium text-[#0A0A0F]
                         hover:text-[#7B3FE4] transition-colors duration-200"
            >
              See the work
              <span
                className="transition-transform duration-300
                           ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-16 md:mt-20 flex flex-wrap items-center gap-x-2 gap-y-3
                       text-[13px] font-['DM_Sans'] text-[#6B6B7A]"
          >
            <AnimatedNumber
              to={8}
              suffix="+"
              duration={1.4}
              className="font-medium text-[#0A0A0F]"
            />
            <span>clients delivered</span>
            <span className="text-[#D4D4DA] mx-2">·</span>
            <AnimatedNumber
              to={3}
              duration={1.2}
              delay={0.15}
              className="font-medium text-[#0A0A0F]"
            />
            <span>years building in SA</span>
            <span className="text-[#D4D4DA] mx-2">·</span>
            <AnimatedNumber
              to={2}
              duration={1.2}
              delay={0.3}
              className="font-medium text-[#0A0A0F]"
            />
            <span>weeks average turnaround</span>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 mt-24 md:mt-32">
        <div className="h-px bg-[#E8E8EC]" />
      </div>
    </section>
  );
}
