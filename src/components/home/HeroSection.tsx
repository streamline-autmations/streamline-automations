import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { heroTextReveal, springStagger } from '../../lib/motion';
import HeroParticleField from './HeroParticleField';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center py-24 overflow-hidden noise-overlay">
      <HeroParticleField />

      {/* Purple radial glow behind text */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(119,76,252,0.18), transparent 70%)',
        }}
      />

      {/* Orange accent glow bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom right, rgba(242,106,61,0.1), transparent 70%)',
        }}
      />

      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={springStagger}
        >
          {/* Overline label */}
          <motion.p
            custom={0}
            variants={heroTextReveal}
            className="label mb-6"
          >
            Vaal Triangle · Web + Automation
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

          {/* Headline line 2 — gradient */}
          <motion.div custom={2} variants={heroTextReveal}>
            <span
              className="font-bebas leading-[0.9] bg-gradient-to-r from-[#774CFC] to-[#F26A3D] bg-clip-text text-transparent block"
              style={{ fontSize: 'clamp(56px, 10vw, 120px)' }}
            >
              NEVER SLEEPS.
            </span>
          </motion.div>

          {/* Divider line */}
          <motion.div
            custom={3}
            variants={heroTextReveal}
            className="w-full max-w-md h-px bg-white/10 my-8"
          />

          {/* Body copy */}
          <motion.p
            custom={4}
            variants={heroTextReveal}
            className="max-w-[480px] mb-10 text-white/60 text-base leading-relaxed"
          >
            We build websites, automation systems and digital infrastructure
            for local businesses that want to grow without doing everything manually.
          </motion.p>

          {/* CTA */}
          <motion.div custom={5} variants={heroTextReveal}>
            <Link
              to="/contact"
              className="btn btn-orange inline-flex items-center gap-2 text-base px-8 py-4"
            >
              Book a Free Strategy Call
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            custom={6}
            variants={heroTextReveal}
            className="flex flex-wrap items-center gap-6 mt-12 text-sm text-white/35 font-mono"
          >
            <span>7-Day Delivery</span>
            <span className="text-[#774CFC]">·</span>
            <span>Real Builds</span>
            <span className="text-[#774CFC]">·</span>
            <span>You Own Everything</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
