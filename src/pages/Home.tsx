import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/seo/SEO';
import { Check } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const Home: React.FC = () => {
  const calendlyUrl = 'https://calendly.com/streamline-automation/strategy-call';

  return (
    <div className="relative overflow-hidden bg-[#050505]">
      <SEO 
        title="Streamline Automations | Johannesburg Web Design & Automation"
        description="Custom websites and automation systems for local SA businesses. Leads come in. Bookings get confirmed. Follow-ups happen. Without you lifting a finger."
      />

      {/* ── SECTION 1: HERO ───────────────────── */}
      <section className="min-h-screen flex items-center py-24 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.15em] text-text-label mb-6 font-dm-sans">
              Johannesburg · Web + Automation
            </motion.p>
            
            <motion.h1 variants={fadeUp} className="font-bebas text-[64px] md:text-[100px] lg:text-[120px] leading-[0.9] text-white mb-6">
              YOUR BUSINESS
            </motion.h1>
            <motion.h1 variants={fadeUp} className="font-bebas text-[64px] md:text-[100px] lg:text-[120px] leading-[0.9] text-accent-orange mb-8">
              NEVER SLEEPS.
            </motion.h1>

            <motion.div variants={fadeUp} className="w-full max-w-md h-px bg-white/10 mb-8" />

            <motion.p variants={fadeUp} className="text-base md:text-lg text-text-muted max-w-[480px] mb-10 font-dm-sans leading-relaxed">
              We build websites and automation systems for local service businesses.
              Leads come in. Bookings get confirmed. Follow-ups happen. Without you lifting a finger.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-12">
              <a 
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-accent-orange text-black font-semibold rounded-full px-8 py-4 hover:bg-orange-500 transition-colors"
              >
                Book a Free Strategy Call →
              </a>
              <a 
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white rounded-full px-8 py-4 hover:border-white/60 transition-colors"
              >
                See Our Work
              </a>
            </motion.div>

            {/* Stats Row */}
            <motion.div variants={fadeUp} className="flex items-center gap-8 text-sm text-text-muted font-dm-sans">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">7-Day</span>
                <span>Delivery</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">3</span>
                <span>Live Systems</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">R0</span>
                <span>Template Cost</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Decorative Number */}
          <div className="hidden lg:block relative">
            <span className="absolute right-0 top-1/2 -translate-y-1/2 font-bebas text-[300px] text-white opacity-[0.03] pointer-events-none">
              01
            </span>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: SOCIAL PROOF BAR ───────────────────── */}
      <section className="py-6 bg-surface-1">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs uppercase tracking-[0.15em] text-text-label font-dm-sans">
            Trusted by: <span className="text-white mx-2">BLOM COSMETICS</span> · <span className="text-white mx-2">RECKLESSBEAR APPAREL</span> · <span className="text-white mx-2">AMELI STUDIO</span>
          </p>
        </div>
      </section>

      {/* ── SECTION 3: PAIN SECTION ───────────────────── */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.15em] text-text-label mb-4 font-dm-sans">
              The Problem
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-bebas text-[48px] md:text-[72px] lg:text-[80px] leading-[0.95] text-white mb-16">
              MOST LOCAL BUSINESSES<br />ARE INVISIBLE ONLINE.
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Item 1 - Orange */}
              <motion.div variants={fadeUp} className="border-l-2 border-accent-orange pl-5 py-2">
                <h3 className="text-sm uppercase tracking-wider text-accent-orange font-semibold mb-3 font-dm-sans">Missed Enquiries</h3>
                <p className="text-text-muted font-dm-sans leading-relaxed">
                  A customer finds you, can't reach you, books your competitor. You never knew.
                </p>
              </motion.div>

              {/* Item 2 - Purple */}
              <motion.div variants={fadeUp} className="border-l-2 border-accent-purple pl-5 py-2">
                <h3 className="text-sm uppercase tracking-wider text-accent-purple font-semibold mb-3 font-dm-sans">Manual Follow-ups</h3>
                <p className="text-text-muted font-dm-sans leading-relaxed">
                  You follow up when you remember. When you're not swamped. Which isn't often.
                </p>
              </motion.div>

              {/* Item 3 - White */}
              <motion.div variants={fadeUp} className="border-l-2 border-white pl-5 py-2">
                <h3 className="text-sm uppercase tracking-wider text-white font-semibold mb-3 font-dm-sans">No Online Presence</h3>
                <p className="text-text-muted font-dm-sans leading-relaxed">
                  Your business doesn't exist to 90% of people who search for what you do.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 4: PACKAGES PREVIEW ───────────────────── */}
      <section className="py-24 px-4 md:px-8 bg-surface-1/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.15em] text-text-label mb-4 font-dm-sans">
              What We Build
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-bebas text-[48px] md:text-[72px] lg:text-[80px] leading-[0.95] text-white mb-6">
              PICK YOUR SYSTEM.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-text-muted max-w-[560px] mb-12 font-dm-sans">
              Starting prices. No hidden costs. No templates. Built specifically for your business.
            </motion.p>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Card 1 - Online Presence */}
              <motion.div variants={fadeUp} className="bg-surface-2 border border-border-subtle p-8 relative">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-white" />
                <span className="text-[11px] uppercase tracking-[0.15em] text-text-label font-dm-sans">Tier 01</span>
                <h3 className="font-dm-sans font-semibold text-xl text-white mt-2 mb-2">Online Presence</h3>
                <p className="font-bebas text-[48px] text-white">R6,500</p>
                <p className="text-sm text-text-muted mb-6 font-dm-sans">Starting from · 3–5 working days</p>
                <div className="w-full h-px bg-white/10 mb-6" />
                <ul className="space-y-3">
                  {['Clean 5-page website', 'Contact form + basic SEO', 'Mobile optimised'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-muted font-dm-sans">
                      <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/packages/online-presence"
                  className="mt-8 inline-block border border-white/20 text-white rounded-full px-6 py-3 hover:border-white/60 transition-colors font-dm-sans text-sm"
                >
                  Learn More →
                </Link>
              </motion.div>

              {/* Card 2 - Client Magnet (Featured) */}
              <motion.div variants={fadeUp} className="bg-[#161616] border border-border-subtle p-8 relative md:-mt-4 md:mb-4">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent-orange" />
                <span className="absolute top-4 right-4 bg-accent-orange text-black text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</span>
                <span className="text-[11px] uppercase tracking-[0.15em] text-accent-orange font-dm-sans">Tier 02</span>
                <h3 className="font-dm-sans font-semibold text-xl text-white mt-2 mb-2">Client Magnet</h3>
                <p className="font-bebas text-[48px] text-accent-orange">R12,000</p>
                <p className="text-sm text-text-muted mb-6 font-dm-sans">Starting from · 5–7 working days</p>
                <div className="w-full h-px bg-white/10 mb-6" />
                <ul className="space-y-3">
                  {['Everything in Tier 01', 'Booking + lead automation', 'AI chatbot + CRM integration'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-muted font-dm-sans">
                      <Check className="w-4 h-4 text-accent-orange mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a 
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-block bg-accent-orange text-black font-semibold rounded-full px-6 py-3 hover:bg-orange-500 transition-colors"
                >
                  Start Getting Clients →
                </a>
              </motion.div>

              {/* Card 3 - Business Accelerator */}
              <motion.div variants={fadeUp} className="bg-surface-2 border border-border-subtle p-8 relative">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent-purple" />
                <span className="text-[11px] uppercase tracking-[0.15em] text-accent-purple font-dm-sans">Tier 03</span>
                <h3 className="font-dm-sans font-semibold text-xl text-white mt-2 mb-2">Business Accelerator</h3>
                <p className="font-bebas text-[48px] text-accent-purple">R25,000</p>
                <p className="text-sm text-text-muted mb-6 font-dm-sans">Starting from · 7–10 days + retainer</p>
                <div className="w-full h-px bg-white/10 mb-6" />
                <ul className="space-y-3">
                  {['Everything in Tier 02', 'Analytics dashboard', 'Monthly optimisation + support'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-muted font-dm-sans">
                      <Check className="w-4 h-4 text-accent-purple mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/packages/business-accelerator"
                  className="mt-8 inline-block border border-accent-purple/50 text-white rounded-full px-6 py-3 hover:border-accent-purple transition-colors font-dm-sans text-sm"
                >
                  Learn More →
                </Link>
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="text-center mt-10">
              <Link to="/packages" className="text-sm text-text-muted hover:text-white transition-colors font-dm-sans">
                Compare all packages in detail →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 5: HOW IT WORKS ───────────────────── */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.15em] text-text-label mb-4 font-dm-sans">
              The Process
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-bebas text-[48px] md:text-[72px] lg:text-[80px] leading-[0.95] text-white mb-16">
              LIVE IN UNDER<br />TWO WEEKS.
            </motion.h2>

            {/* Desktop: horizontal timeline */}
            <div className="hidden md:flex items-start justify-between relative">
              {/* Dotted line */}
              <div className="absolute top-8 left-0 right-0 h-px border-t border-dashed border-white/20" />
              
              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center text-center max-w-[280px]">
                <span className="font-bebas text-[64px] text-accent-orange opacity-15">01</span>
                <h3 className="font-dm-sans font-semibold text-xl text-white -mt-8 mb-3">Strategy Call</h3>
                <p className="text-text-muted font-dm-sans text-sm">Free 30 minutes. We map what you need — and nothing you don't.</p>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center text-center max-w-[280px]">
                <span className="font-bebas text-[64px] text-accent-purple opacity-15">02</span>
                <h3 className="font-dm-sans font-semibold text-xl text-white -mt-8 mb-3">We Build</h3>
                <p className="text-text-muted font-dm-sans text-sm">Design, dev, automation setup. You get updates. We handle everything.</p>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center text-center max-w-[280px]">
                <span className="font-bebas text-[64px] text-white opacity-15">03</span>
                <h3 className="font-dm-sans font-semibold text-xl text-white -mt-8 mb-3">You Go Live</h3>
                <p className="text-text-muted font-dm-sans text-sm">Tested. Optimised. Handed over. Fully yours.</p>
              </div>
            </div>

            {/* Mobile: vertical timeline */}
            <div className="md:hidden space-y-12">
              {/* Step 1 */}
              <div className="flex gap-6">
                <span className="font-bebas text-[48px] text-accent-orange opacity-15">01</span>
                <div>
                  <h3 className="font-dm-sans font-semibold text-xl text-white mb-2">Strategy Call</h3>
                  <p className="text-text-muted font-dm-sans text-sm">Free 30 minutes. We map what you need — and nothing you don't.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6">
                <span className="font-bebas text-[48px] text-accent-purple opacity-15">02</span>
                <div>
                  <h3 className="font-dm-sans font-semibold text-xl text-white mb-2">We Build</h3>
                  <p className="text-text-muted font-dm-sans text-sm">Design, dev, automation setup. You get updates. We handle everything.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6">
                <span className="font-bebas text-[48px] text-white opacity-15">03</span>
                <div>
                  <h3 className="font-dm-sans font-semibold text-xl text-white mb-2">You Go Live</h3>
                  <p className="text-text-muted font-dm-sans text-sm">Tested. Optimised. Handed over. Fully yours.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 6: FEATURED BUILDS ───────────────────── */}
      <section id="portfolio" className="py-24 px-4 md:px-8 bg-surface-1/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.15em] text-text-label mb-4 font-dm-sans">
              Featured Builds
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-bebas text-[48px] md:text-[72px] lg:text-[80px] leading-[0.95] text-white mb-12">
              REAL SYSTEMS.<br />REAL BUSINESSES.
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* RecklessBear */}
              <Link to="/portfolio/recklesbear" className="block bg-surface-2 border border-border-subtle p-6 hover:border-white/20 transition-colors group">
                <div className="aspect-video bg-gradient-to-br from-orange-900/20 to-purple-900/20 mb-4 rounded-lg flex items-center justify-center">
                  <span className="font-bebas text-4xl text-white/30">RB</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider bg-accent-orange/10 text-accent-orange px-2 py-1 rounded font-dm-sans">Client Magnet</span>
                <h3 className="font-dm-sans font-semibold text-lg text-white mt-3 group-hover:text-accent-orange transition-colors">RecklessBear Apparel</h3>
                <p className="text-sm text-text-muted mt-2 font-dm-sans">Custom quote engine and admin app.</p>
              </Link>

              {/* BLOM Cosmetics */}
              <Link to="/portfolio/blom-cosmetics" className="block bg-surface-2 border border-border-subtle p-6 hover:border-white/20 transition-colors group">
                <div className="aspect-video bg-gradient-to-br from-purple-900/20 to-pink-900/20 mb-4 rounded-lg flex items-center justify-center">
                  <span className="font-bebas text-4xl text-white/30">BC</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider bg-accent-purple/10 text-accent-purple px-2 py-1 rounded font-dm-sans">Business Accelerator</span>
                <h3 className="font-dm-sans font-semibold text-lg text-white mt-3 group-hover:text-accent-purple transition-colors">BLOM Cosmetics</h3>
                <p className="text-sm text-text-muted mt-2 font-dm-sans">E-commerce, academy, WhatsApp automation.</p>
              </Link>

              {/* Ameli Studio - Placeholder */}
              <div className="bg-surface-2 border border-border-subtle p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5" />
                <div className="aspect-video bg-white/5 mb-4 rounded-lg flex items-center justify-center">
                  <span className="font-bebas text-4xl text-white/20">AS</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider bg-white/10 text-white px-2 py-1 rounded font-dm-sans">Tier 1 — Online Presence</span>
                <h3 className="font-dm-sans font-semibold text-lg text-white mt-3">Ameli Studio</h3>
                <p className="text-sm text-text-muted mt-2 font-dm-sans">Skin & brow studio. Clean site with booking integration.</p>
                <span className="absolute top-4 right-4 text-[10px] uppercase tracking-wider text-text-label font-dm-sans">Case study coming soon</span>
              </div>
            </div>

            <motion.div variants={fadeUp} className="mt-10">
              <Link to="/portfolio" className="text-sm text-text-muted hover:text-white transition-colors font-dm-sans">
                View all builds →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 7: REAL RESULTS ───────────────────── */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.15em] text-text-label mb-4 font-dm-sans">
              Real Results
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-bebas text-[48px] md:text-[72px] lg:text-[80px] leading-[0.95] text-white mb-16">
              WHAT CHANGES WHEN<br />YOUR SYSTEMS WORK.
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Result 1 */}
              <motion.div variants={fadeUp} className="relative">
                <span className="font-bebas text-[120px] md:text-[160px] text-accent-orange opacity-20 absolute -top-8 -left-4 pointer-events-none leading-none">
                  4 MIN
                </span>
                <div className="relative z-10 pt-16">
                  <span className="text-xs uppercase tracking-wider text-text-label font-dm-sans">Quote turnaround — was 2 days</span>
                  <h3 className="font-dm-sans font-semibold text-xl text-white mt-2">RecklessBear Apparel</h3>
                  <p className="text-text-muted mt-3 font-dm-sans leading-relaxed">
                    Custom quote engine and admin app. No more manual back-and-forth.
                  </p>
                  <span className="inline-block mt-4 text-[10px] uppercase tracking-wider bg-accent-orange/10 text-accent-orange px-3 py-1 rounded-full font-dm-sans">
                    Tier 2 — Client Magnet
                  </span>
                </div>
              </motion.div>

              {/* Result 2 */}
              <motion.div variants={fadeUp} className="relative">
                <span className="font-bebas text-[120px] md:text-[160px] text-accent-purple opacity-20 absolute -top-8 -left-4 pointer-events-none leading-none">
                  5 IN 1
                </span>
                <div className="relative z-10 pt-16">
                  <span className="text-xs uppercase tracking-wider text-text-label font-dm-sans">Systems in a single build</span>
                  <h3 className="font-dm-sans font-semibold text-xl text-white mt-2">BLOM Cosmetics</h3>
                  <p className="text-text-muted mt-3 font-dm-sans leading-relaxed">
                    E-commerce store, course academy, WhatsApp notifications, admin dashboard, custom checkout.
                  </p>
                  <span className="inline-block mt-4 text-[10px] uppercase tracking-wider bg-accent-purple/10 text-accent-purple px-3 py-1 rounded-full font-dm-sans">
                    Tier 3 — Business Accelerator
                  </span>
                </div>
              </motion.div>
            </div>

            <motion.p variants={fadeUp} className="text-center text-sm text-text-label mt-12 font-dm-sans">
              More case studies in progress.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 8: TECH STACK MARQUEE ───────────────────── */}
      <section className="py-12 border-y border-white/5 overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-12 animate-marquee whitespace-nowrap">
            {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'PostgreSQL', 'Stripe', 'WhatsApp API', 'Cal.com', 'Supabase'].map((tech, i) => (
              <span key={i} className="text-2xl font-bebas text-text-label hover:text-white transition-colors">
                {tech}
              </span>
            ))}
            {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'PostgreSQL', 'Stripe', 'WhatsApp API', 'Cal.com', 'Supabase'].map((tech, i) => (
              <span key={`dup-${i}`} className="text-2xl font-bebas text-text-label hover:text-white transition-colors">
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION 9: FINAL CTA BANNER ───────────────────── */}
      <section className="py-24 px-4 md:px-8 bg-surface-1">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUp} className="font-bebas text-[64px] md:text-[80px] leading-[0.95] text-white mb-6">
              STOP LOSING LEADS.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-text-muted mb-10 font-dm-sans text-lg">
              Book a free 30-minute strategy call. No pitch. Just a plan.
            </motion.p>
            <motion.div variants={fadeUp}>
              <a 
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent-orange text-black font-semibold rounded-full px-10 py-5 text-lg hover:bg-orange-500 transition-colors"
              >
                Book Your Free Call →
              </a>
              <p className="text-xs text-text-label mt-6 font-dm-sans">
                Free. No commitment. No sales pressure.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
