import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap, TrendingUp, Globe, Search, MessageSquare } from 'lucide-react';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const Packages: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505]">
      {/* SECTION 1 — HERO */}
      <section className="py-20 md:py-32 text-center px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Badge */}
          <motion.div variants={fadeUpVariants} className="inline-flex mb-8">
            <span className="border border-purple-500/30 bg-purple-500/10 rounded-full px-4 py-1.5 font-mono text-xs tracking-[3px] uppercase text-purple-400">
              CHOOSE YOUR SYSTEM
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUpVariants} className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Every package is a
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              complete business system.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p variants={fadeUpVariants} className="text-white/50 text-lg text-center max-w-xl mx-auto mt-4">
            Not just a website. A system that captures leads, books clients, 
            and runs while you focus on your business.
          </motion.p>
        </motion.div>
      </section>

      {/* SECTION 2 — 3 PACKAGE CARDS */}
      <section className="container mx-auto px-4 md:px-6 py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {/* Card 1: Online Presence */}
          <motion.div variants={fadeUpVariants} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
            {/* Device Mockup Area */}
            <div className="h-[220px] overflow-hidden rounded-t-2xl bg-gradient-to-br from-white/5 to-transparent">
              <div className="h-3 w-full bg-white/5 rounded-t-xl"></div>
              <div className="w-48 h-32 mx-auto mt-6 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="font-mono text-[10px] text-white/20 text-center leading-tight">
                  WEBSITE MOCKUP<br />[Online Presence]
                </span>
              </div>
            </div>
            
            {/* Card Content */}
            <div className="p-6">
              <h3 className="font-bold text-xl text-white">Online Presence</h3>
              <p className="text-white/50 text-sm mt-1">A clean, professional website live in 3–5 days.</p>
              <p className="font-mono text-2xl font-bold text-white mt-4">From R6,500</p>
              
              <ul className="mt-4 space-y-2">
                {['Up to 5 pages', 'Contact form + SEO', 'Delivered in 3–5 days'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-white/70 text-sm">
                    <Check className="w-4 h-4 text-white" /> {item}
                  </li>
                ))}
              </ul>
              
              <Link
                to="/packages/online-presence"
                className="block w-full py-3 mt-6 text-center border border-white/20 text-white rounded-xl hover:bg-white/5 transition-colors"
              >
                Learn More →
              </Link>
            </div>
          </motion.div>

          {/* Card 2: Client Magnet (Elevated) */}
          <motion.div variants={fadeUpVariants} className="bg-white/5 backdrop-blur-md border-2 border-orange-500/50 rounded-2xl overflow-hidden relative lg:-mt-4 lg:mb-4" style={{ boxShadow: '0 0 40px rgba(249,115,22,0.2)' }}>
            {/* Most Popular Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-orange-500 text-white text-[10px] font-mono tracking-[2px] uppercase rounded-full px-3 py-1">
                Most Popular
              </span>
            </div>
            
            {/* Device Mockup Area */}
            <div className="h-[220px] overflow-hidden rounded-t-2xl bg-gradient-to-br from-orange-500/5 to-transparent">
              <div className="h-3 w-full bg-white/5 rounded-t-xl"></div>
              <div className="w-48 h-32 mx-auto mt-6 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="font-mono text-[10px] text-white/20 text-center leading-tight">
                  BOOKING SYSTEM<br />[Client Magnet]
                </span>
              </div>
            </div>
            
            {/* Card Content */}
            <div className="p-6">
              <h3 className="font-bold text-xl text-white">Client Magnet</h3>
              <p className="text-white/50 text-sm mt-1">Automated leads, bookings, and follow-ups.</p>
              <p className="font-mono text-2xl font-bold text-orange-400 mt-4">From R12,000</p>
              
              <ul className="mt-4 space-y-2">
                {['Booking system + AI chatbot', 'WhatsApp & email alerts', 'Delivered in 5–7 days'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-white/70 text-sm">
                    <Check className="w-4 h-4 text-orange-400" /> {item}
                  </li>
                ))}
              </ul>
              
              <Link
                to="/packages/client-magnet"
                className="block w-full py-3 mt-6 text-center bg-orange-500 text-white rounded-xl hover:bg-orange-400 transition-colors hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
              >
                Learn More →
              </Link>
            </div>
          </motion.div>

          {/* Card 3: Business Accelerator */}
          <motion.div variants={fadeUpVariants} className="bg-white/5 backdrop-blur-md border border-purple-500/30 rounded-2xl overflow-hidden">
            {/* Device Mockup Area */}
            <div className="h-[220px] overflow-hidden rounded-t-2xl bg-gradient-to-br from-purple-500/5 to-transparent">
              <div className="h-3 w-full bg-white/5 rounded-t-xl"></div>
              <div className="w-48 h-32 mx-auto mt-6 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="font-mono text-[10px] text-white/20 text-center leading-tight">
                  DASHBOARD<br />[Business Accelerator]
                </span>
              </div>
            </div>
            
            {/* Card Content */}
            <div className="p-6">
              <h3 className="font-bold text-xl text-white">Business Accelerator</h3>
              <p className="text-white/50 text-sm mt-1">A long-term growth partner.</p>
              <p className="font-mono text-2xl font-bold text-purple-400 mt-4">From R25,000</p>
              
              <ul className="mt-4 space-y-2">
                {['Analytics dashboard', 'Advanced automations', 'Monthly optimisation'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-white/70 text-sm">
                    <Check className="w-4 h-4 text-purple-400" /> {item}
                  </li>
                ))}
              </ul>
              
              <Link
                to="/packages/business-accelerator"
                className="block w-full py-3 mt-6 text-center border border-purple-500/40 text-purple-400 rounded-xl hover:bg-purple-500/10 transition-colors"
              >
                Learn More →
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 3 — STATS BAR */}
      <section className="border-y border-white/5 py-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <motion.div variants={fadeUpVariants}>
              <div className="text-4xl font-bold font-mono text-purple-400">&lt;7</div>
              <div className="text-white/40 text-xs tracking-[2px] uppercase mt-1">Days Delivery</div>
            </motion.div>
            <motion.div variants={fadeUpVariants}>
              <div className="text-4xl font-bold font-mono text-orange-400">3</div>
              <div className="text-white/40 text-xs tracking-[2px] uppercase mt-1">Core Packages</div>
            </motion.div>
            <motion.div variants={fadeUpVariants}>
              <div className="text-4xl font-bold font-mono text-purple-400">R6.5K</div>
              <div className="text-white/40 text-xs tracking-[2px] uppercase mt-1">Starting From</div>
            </motion.div>
            <motion.div variants={fadeUpVariants}>
              <div className="text-4xl font-bold font-mono text-orange-400">100%</div>
              <div className="text-white/40 text-xs tracking-[2px] uppercase mt-1">Ownership</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — ADD-ONS TEASER */}
      <section className="py-24 px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="container mx-auto text-center"
        >
          <motion.h2 variants={fadeUpVariants} className="text-2xl font-bold text-white">
            Need more?
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="text-white/50 mt-2">
            Extend any package with add-ons.
          </motion.p>

          {/* Teaser Tiles */}
          <motion.div variants={fadeUpVariants} className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto mt-8">
            {[
              { icon: <MessageSquare className="w-4 h-4" />, name: 'AI Chatbot' },
              { icon: <Zap className="w-4 h-4" />, name: 'Logo & Branding' },
              { icon: <Search className="w-4 h-4" />, name: 'SEO Upgrade' },
              { icon: <Globe className="w-4 h-4" />, name: 'Social Media' },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full py-2.5 px-4 flex items-center justify-center gap-2">
                <span className="text-purple-400">{item.icon}</span>
                <span className="text-white/70 text-sm">{item.name}</span>
              </div>
            ))}
          </motion.div>

          {/* Link to all add-ons */}
          <motion.div variants={fadeUpVariants} className="mt-8">
            <Link to="/add-ons" className="text-orange-400 text-sm hover:text-orange-300 underline-offset-4 hover:underline transition">
              View all add-ons & branding →
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 5 — FINAL CTA BANNER */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Purple radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto relative z-10 text-center max-w-2xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeUpVariants} className="text-3xl md:text-4xl font-bold text-white">
              Not sure which fits you?
            </motion.h2>
            <motion.p variants={fadeUpVariants} className="text-white/50 mt-4">
              Book a free 20-minute call. We'll tell you exactly which package makes sense.
            </motion.p>
            <motion.div variants={fadeUpVariants} className="mt-8">
              <Link
                to="/contact"
                className="inline-block bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-full px-8 py-4 transition-all duration-200 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
              >
                Book a Free Strategy Call →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Packages;
