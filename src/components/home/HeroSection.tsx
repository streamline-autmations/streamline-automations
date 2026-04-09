import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { heroTextReveal, springStagger } from '../../lib/motion';
import AutomationCanvasHero from './AutomationCanvasHero';

const MORPHING_WORDS = ['AUTOMATED', 'UNSTOPPABLE', 'SCALING', 'AHEAD'];

export default function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIdx(i => (i + 1) % MORPHING_WORDS.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center py-24 overflow-hidden noise-overlay">
      {/* Canvas automation network */}
      <AutomationCanvasHero />

      {/* Purple radial glow behind text */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top, rgba(119,76,252,0.16), transparent 70%)' }}
      />

      {/* Orange accent glow bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(242,106,61,0.08), transparent 70%)' }}
      />

      <div className="container relative z-10">
        <motion.div initial="hidden" animate="visible" variants={springStagger}>

          {/* Location label */}
          <motion.p custom={0} variants={heroTextReveal} className="label mb-6">
            Johannesburg · Pretoria · Web + Automation
          </motion.p>

          {/* Headline line 1 */}
          <motion.h1
            custom={1}
            variants={heroTextReveal}
            className="font-bebas leading-[0.9] text-white"
            style={{ fontSize: 'clamp(56px, 10vw, 120px)' }}
          >
            YOUR BUSINESS
          </motion.h1>

          {/* Headline line 2 — static white */}
          <motion.div custom={2} variants={heroTextReveal}>
            <span
              className="font-bebas leading-[0.9] text-white/80 block"
              style={{ fontSize: 'clamp(56px, 10vw, 120px)' }}
            >
              SHOULD BE
            </span>
          </motion.div>

          {/* Headline line 3 — morphing gradient word */}
          <motion.div custom={3} variants={heroTextReveal} className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={MORPHING_WORDS[wordIdx]}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -32 }}
                transition={{ type: 'spring', stiffness: 120, damping: 20, duration: 0.35 }}
                className="font-bebas leading-[0.9] bg-gradient-to-r from-[#774CFC] to-[#F26A3D] bg-clip-text text-transparent block"
                style={{ fontSize: 'clamp(56px, 10vw, 120px)' }}
              >
                {MORPHING_WORDS[wordIdx]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Divider */}
          <motion.div
            custom={4}
            variants={heroTextReveal}
            className="w-full max-w-md h-px bg-white/10 my-8"
          />

          {/* Body copy */}
          <motion.p
            custom={5}
            variants={heroTextReveal}
            className="max-w-[460px] mb-10 text-white/60 text-base leading-relaxed"
          >
            Websites, automation systems and digital infrastructure for JHB &amp; Pretoria
            businesses that want to grow without doing everything manually.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={6}
            variants={heroTextReveal}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/contact"
              className="btn btn-orange inline-flex items-center gap-2"
            >
              Book a Free Strategy Call <ArrowRight size={16} />
            </Link>
            <Link
              to="/portfolio"
              className="btn btn-ghost-orange inline-flex items-center gap-2"
            >
              See Our Work <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Trust micro-copy */}
          <motion.div
            custom={7}
            variants={heroTextReveal}
            className="flex flex-wrap items-center gap-6 mt-10 text-xs text-white/30 font-mono uppercase tracking-widest"
          >
            <span>7-Day Delivery</span>
            <span className="text-[#774CFC]/60">·</span>
            <span>No Templates</span>
            <span className="text-[#774CFC]/60">·</span>
            <span>You Own Everything</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
