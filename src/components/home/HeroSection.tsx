/**
 * HeroSection
 * Main headline: GSAP + split-type character-by-character reveal
 *   — chars slide up from below their line (yPercent: 110 → 0)
 *   — perspective: 1200px + rotateX creates depth on entry
 * Morphing word: Framer Motion AnimatePresence (unchanged — cyclic animation)
 * Everything below the headline: Framer Motion stagger (unchanged)
 */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SplitType from 'split-type';
import { heroTextReveal, springStagger } from '../../lib/motion';
import { gsap } from '../../lib/gsap-setup';
import AutomationCanvasHero from './AutomationCanvasHero';
import MagneticButton from '../ui/MagneticButton';

const MORPHING_WORDS = ['AUTOMATED', 'UNSTOPPABLE', 'SCALING', 'AHEAD'];

export default function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  // Morphing word interval
  useEffect(() => {
    const id = setInterval(() => {
      setWordIdx(i => (i + 1) % MORPHING_WORDS.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  // GSAP char split reveal — only for the two static headline lines
  useEffect(() => {
    const el1 = line1Ref.current;
    const el2 = line2Ref.current;
    if (!el1 || !el2) return;

    // Split into chars (split-type also creates word wrappers)
    const split1 = new SplitType(el1, { types: 'chars,words' });
    const split2 = new SplitType(el2, { types: 'chars,words' });

    // Hide chars initially — parent is already opacity:0 via CSS
    gsap.set([...(split1.chars ?? []), ...(split2.chars ?? [])], {
      opacity: 0,
      yPercent: 110,
      rotateX: 20,
    });
    // Make parents visible — GSAP controls individual chars now
    gsap.set([el1, el2], { opacity: 1 });

    const tl = gsap.timeline({ delay: 0.35 });

    tl.to(split1.chars ?? [], {
      opacity: 1,
      yPercent: 0,
      rotateX: 0,
      stagger: 0.024,
      duration: 0.9,
      ease: 'power4.out',
    }).to(
      split2.chars ?? [],
      {
        opacity: 1,
        yPercent: 0,
        rotateX: 0,
        stagger: 0.022,
        duration: 0.85,
        ease: 'power4.out',
      },
      '-=0.65' // overlap with line 1 finishing
    );

    return () => {
      tl.kill();
      split1.revert();
      split2.revert();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center py-24 overflow-hidden noise-overlay">
      {/* Canvas automation network */}
      <AutomationCanvasHero />

      {/* Purple radial glow */}
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
        {/* Location label + secondary items — Framer Motion stagger unchanged */}
        <motion.div initial="hidden" animate="visible" variants={springStagger}>

          <motion.p custom={0} variants={heroTextReveal} className="label mb-6">
            Johannesburg · Pretoria · Web + Automation
          </motion.p>

          {/* ─── GSAP split-text headline — NOT wrapped in motion.* ─── */}
          {/* overflow-hidden clips chars as they slide up from below the line */}
          <div
            ref={line1Ref}
            className="font-bebas leading-[0.9] text-white hero-split-line"
            style={{ fontSize: 'clamp(56px, 10vw, 120px)', opacity: 0, perspective: '1200px' }}
          >
            YOUR BUSINESS
          </div>

          <div
            ref={line2Ref}
            className="hero-split-line"
            style={{ perspective: '1200px', opacity: 0 }}
          >
            <span
              className="font-bebas leading-[0.9] text-white/80 block"
              style={{ fontSize: 'clamp(56px, 10vw, 120px)' }}
            >
              SHOULD BE
            </span>
          </div>
          {/* ─────────────────────────────────────────────────────────── */}

          {/* Morphing gradient word — Framer Motion AnimatePresence stays */}
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

          {/* CTAs wrapped in MagneticButton for the pull effect */}
          <motion.div
            custom={6}
            variants={heroTextReveal}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton>
              <Link to="/contact" className="btn btn-orange inline-flex items-center gap-2">
                Book a Free Strategy Call <ArrowRight size={16} />
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link to="/portfolio" className="btn btn-ghost-orange inline-flex items-center gap-2">
                See Our Work <ArrowRight size={16} />
              </Link>
            </MagneticButton>
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
