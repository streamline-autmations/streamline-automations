import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Zap, Globe, Search, MessageSquare } from 'lucide-react';
import { fadeUp, stagger, cardItem, viewport } from '../lib/motion';

const Packages: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* SECTION 1 — HERO */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="inline-flex mb-8">
              <span className="border border-purple-500/30 bg-purple-500/10 rounded-full px-4 py-1.5 font-mono text-xs tracking-[3px] uppercase text-purple-400">
                CHOOSE YOUR SYSTEM
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} className="h1">
              Every package is a
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-transparent bg-clip-text text-transparent">
                complete business system.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p variants={fadeUp} className="body text-center max-w-xl mx-auto mt-4">
              Not just a website. A system that captures leads, books clients, 
              and runs while you focus on your business.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — 3 PACKAGE CARDS - s-panel s-line-orange */}
      <section className="section section-panel section-line">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="grid-3 max-w-6xl mx-auto"
          >
            {/* Card 1: Online Presence */}
            <motion.div variants={cardItem} className="card card-bar-white card-interactive">
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
                <h3 className="h3">Online Presence</h3>
                <p className="body mt-1">A clean, professional website live in 3–5 days.</p>
                <p className="price mt-4">From R7,500</p>
                
                <ul className="mt-4 space-y-2">
                  {['Up to 5 pages', 'Contact form + SEO', 'Delivered in 3–5 days'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 body">
                      <Check className="w-4 h-4 text-accent" /> {item}
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/packages/online-presence"
                  className="btn btn-secondary btn-fw mt-6"
                >
                  Learn More →
                </Link>
              </div>
            </motion.div>

            {/* Card 2: Client Magnet (Elevated) - Featured */}
            <motion.div variants={cardItem} className="card card-bar card-featured card-interactive">
              {/* Most Popular Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-[color:var(--purple)] text-white text-[10px] font-mono tracking-[2px] uppercase rounded-full px-3 py-1">
                  Most Popular
                </span>
              </div>
              
              {/* Device Mockup Area */}
              <div className="h-[220px] overflow-hidden rounded-t-2xl bg-gradient-to-br from-purple-500/5 to-transparent">
                <div className="h-3 w-full bg-white/5 rounded-t-xl"></div>
                <div className="w-48 h-32 mx-auto mt-6 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="font-mono text-[10px] text-white/20 text-center leading-tight">
                    BOOKING SYSTEM<br />[Client Magnet]
                  </span>
                </div>
              </div>
              
              {/* Card Content */}
              <div className="p-6">
                <h3 className="h3">Client Magnet</h3>
                <p className="body mt-1">Automated leads, bookings, and follow-ups.</p>
                <p className="price mt-4">From R15,000</p>
                
                <ul className="mt-4 space-y-2">
                  {['Booking system + AI chatbot', 'WhatsApp & email alerts', 'Delivered in 5–7 days'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 body">
                      <Check className="w-4 h-4 text-accent" /> {item}
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/packages/client-magnet"
                  className="btn btn-secondary btn-fw mt-6"
                >
                  Learn More →
                </Link>
              </div>
            </motion.div>

            {/* Card 3: Business Accelerator */}
            <motion.div variants={cardItem} className="card card-bar card-interactive">
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
                <h3 className="h3">Business Accelerator</h3>
                <p className="body mt-1">A long-term growth partner.</p>
                <p className="price mt-4">From R30,000</p>
                
                <ul className="mt-4 space-y-2">
                  {['Analytics dashboard', 'Advanced automations', 'Monthly optimisation'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 body">
                      <Check className="w-4 h-4 text-accent" /> {item}
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/packages/business-accelerator"
                  className="btn btn-secondary btn-fw mt-6"
                >
                  Learn More →
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — STATS BAR - s-line-white */}
      <section className="section section-line-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="grid-2 md:grid-cols-4 gap-8 text-center"
          >
            <motion.div variants={cardItem} className="card">
              <div className="stat-number">&lt;7</div>
              <div className="stat-label">Days Delivery</div>
            </motion.div>
            <motion.div variants={cardItem} className="card">
              <div className="stat-number">3</div>
              <div className="stat-label">Core Packages</div>
            </motion.div>
            <motion.div variants={cardItem} className="card">
              <div className="stat-number">R6.5K</div>
              <div className="stat-label">Starting From</div>
            </motion.div>
            <motion.div variants={cardItem} className="card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Ownership</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — ADD-ONS TEASER - s-panel s-line-purple */}
      <section className="section section-panel section-line">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="text-center"
          >
            <motion.h2 variants={fadeUp} className="h2">
              Need more?
            </motion.h2>
            <motion.p variants={fadeUp} className="body mt-2">
              Extend any package with add-ons.
            </motion.p>

            {/* Teaser Tiles */}
            <motion.div variants={fadeUp} className="grid-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto mt-8">
              {[
                { icon: <MessageSquare className="w-4 h-4" />, name: 'AI Chatbot' },
                { icon: <Zap className="w-4 h-4" />, name: 'Logo & Branding' },
                { icon: <Search className="w-4 h-4" />, name: 'SEO Upgrade' },
                { icon: <Globe className="w-4 h-4" />, name: 'Social Media' },
              ].map((item, i) => (
                <div key={i} className="card card-sm card-bar card-interactive">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-accent">{item.icon}</span>
                    <span className="body">{item.name}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Link to all add-ons */}
            <motion.div variants={fadeUp} className="mt-8">
              <Link to="/add-ons" className="text-accent underline-offset-4 hover:underline transition">
                View all add-ons & branding →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — FINAL CTA BANNER - s-line-orange */}
      <section className="s s-line-orange">
        {/* Purple radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="container relative z-10 text-center max-w-2xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="h2">
              Not sure which fits you?
            </motion.h2>
            <motion.p variants={fadeUp} className="body-text mt-4">
              Book a free 20-minute call. We'll tell you exactly which package makes sense.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8">
              <Link
                to="/contact"
                className="btn btn-primary btn-lg"
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
