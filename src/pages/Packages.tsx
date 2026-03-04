import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Zap, Globe, Search, MessageSquare, Layout, Rocket, BarChart } from 'lucide-react';
import { fadeUp, stagger, cardItem, viewport } from '../lib/motion';
import Button from '../components/ui/Button';

const Packages: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0d0b1a] pt-20 md:pt-24 font-inter text-white">
      {/* SECTION 1 — HERO */}
      <section className="relative pb-24 px-4 overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0d0b1a] to-[#0d0b1a] -z-10" />
        
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="inline-flex mb-8">
              <span className="border border-brand-purple/30 bg-brand-purple/10 rounded-full px-4 py-1.5 font-mono text-xs tracking-[3px] uppercase text-brand-purple">
                CHOOSE YOUR SYSTEM
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-ubuntu font-bold mb-6 tracking-tight">
              Every package is a
              <br />
              <span className="bg-gradient-to-r from-brand-purple to-white bg-clip-text text-transparent">
                complete business system.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto mt-4 leading-relaxed">
              Not just a website. A system that captures leads, books clients, 
              and runs while you focus on your business.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — 3 PACKAGE CARDS */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {/* Card 1: Online Presence */}
            <motion.div variants={cardItem} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative bg-[#13111f] border border-white/10 rounded-3xl p-8 h-full flex flex-col hover:border-white/20 transition-all duration-300 shadow-2xl">
                
                {/* Icon Header */}
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-white/30 transition-colors">
                  <Layout className="w-7 h-7 text-gray-300" />
                </div>

                <h3 className="text-2xl font-ubuntu font-bold text-white mb-2">Online Presence</h3>
                <p className="text-gray-400 text-sm mb-6 h-10">A clean, professional website live in 3–5 days.</p>
                
                <div className="mb-8">
                  <span className="text-3xl font-bold text-white">R7,500</span>
                  <span className="text-gray-500 text-sm ml-2">once-off</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {['Up to 5 pages', 'Contact form + SEO', 'Delivered in 3–5 days', 'Mobile Responsive'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check className="w-5 h-5 text-white/50 shrink-0" /> 
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button to="/packages/online-presence" variant="outline" className="w-full justify-center">
                  View Details
                </Button>
              </div>
            </motion.div>

            {/* Card 2: Client Magnet (Featured) */}
            <motion.div variants={cardItem} className="relative group md:-mt-8 md:mb-8 z-10">
              <div className="absolute inset-0 bg-gradient-to-b from-brand-orange/20 to-brand-orange/5 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="relative bg-[#13111f] border border-brand-orange/50 rounded-3xl p-8 h-full flex flex-col shadow-[0_0_50px_rgba(249,115,22,0.1)]">
                
                {/* Most Popular Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-brand-orange text-white text-[10px] font-mono tracking-[2px] uppercase rounded-full px-4 py-1.5 font-bold shadow-lg shadow-orange-500/20">
                    Most Popular
                  </span>
                </div>

                {/* Icon Header */}
                <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center mb-6 border border-brand-orange/30 group-hover:border-brand-orange/50 transition-colors">
                  <Rocket className="w-7 h-7 text-brand-orange" />
                </div>

                <h3 className="text-2xl font-ubuntu font-bold text-white mb-2">Client Magnet</h3>
                <p className="text-gray-400 text-sm mb-6 h-10">Automated leads, bookings, and follow-ups.</p>
                
                <div className="mb-8">
                  <span className="text-3xl font-bold text-white">R15,000</span>
                  <span className="text-gray-500 text-sm ml-2">once-off</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {['Booking system + AI chatbot', 'WhatsApp & email alerts', 'Delivered in 5–7 days', 'CRM Integration', 'Automated Follow-ups'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <div className="bg-brand-orange/20 rounded-full p-0.5 mt-0.5">
                        <Check className="w-3 h-3 text-brand-orange" /> 
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button to="/packages/client-magnet" variant="orange" className="w-full justify-center shadow-lg shadow-orange-500/20">
                  View Details
                </Button>
              </div>
            </motion.div>

            {/* Card 3: Business Accelerator */}
            <motion.div variants={cardItem} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-[#13111f] border border-white/10 rounded-3xl p-8 h-full flex flex-col hover:border-brand-purple/50 transition-all duration-300 shadow-2xl">
                
                {/* Icon Header */}
                <div className="w-14 h-14 bg-brand-purple/10 rounded-2xl flex items-center justify-center mb-6 border border-brand-purple/30 group-hover:border-brand-purple/50 transition-colors">
                  <BarChart className="w-7 h-7 text-brand-purple" />
                </div>

                <h3 className="text-2xl font-ubuntu font-bold text-white mb-2">Business Accelerator</h3>
                <p className="text-gray-400 text-sm mb-6 h-10">A long-term growth partner & custom systems.</p>
                
                <div className="mb-8">
                  <span className="text-3xl font-bold text-white">R30,000</span>
                  <span className="text-gray-500 text-sm ml-2">starting from</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {['Analytics dashboard', 'Advanced custom automations', 'Monthly optimisation', 'Dedicated Support', 'Custom Integrations'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check className="w-5 h-5 text-brand-purple shrink-0" /> 
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button to="/packages/business-accelerator" variant="primary" className="w-full justify-center">
                  View Details
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3 — STATS BAR */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5"
          >
            <motion.div variants={cardItem} className="px-4">
              <div className="text-3xl font-bold text-white mb-1">&lt;7</div>
              <div className="text-xs font-mono uppercase tracking-widest text-gray-500">Days Delivery</div>
            </motion.div>
            <motion.div variants={cardItem} className="px-4">
              <div className="text-3xl font-bold text-white mb-1">3</div>
              <div className="text-xs font-mono uppercase tracking-widest text-gray-500">Core Packages</div>
            </motion.div>
            <motion.div variants={cardItem} className="px-4">
              <div className="text-3xl font-bold text-white mb-1">R7.5K</div>
              <div className="text-xs font-mono uppercase tracking-widest text-gray-500">Starting From</div>
            </motion.div>
            <motion.div variants={cardItem} className="px-4">
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-xs font-mono uppercase tracking-widest text-gray-500">Ownership</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — ADD-ONS TEASER */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="text-center"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-ubuntu font-bold mb-4">
              Need more?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 mb-12">
              Extend any package with add-ons.
            </motion.p>

            {/* Teaser Tiles */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              {[
                { icon: <MessageSquare className="w-5 h-5" />, name: 'AI Chatbot' },
                { icon: <Zap className="w-5 h-5" />, name: 'Logo & Branding' },
                { icon: <Search className="w-5 h-5" />, name: 'SEO Upgrade' },
                { icon: <Globe className="w-5 h-5" />, name: 'Social Media' },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center hover:bg-white/10 transition-colors cursor-default">
                  <div className="text-brand-purple mb-3">{item.icon}</div>
                  <span className="text-sm font-medium text-gray-300">{item.name}</span>
                </div>
              ))}
            </motion.div>

            {/* Link to all add-ons */}
            <motion.div variants={fadeUp}>
              <Link to="/add-ons" className="text-brand-purple hover:text-white transition-colors underline underline-offset-4 decoration-brand-purple/30 hover:decoration-brand-purple">
                View all add-ons & branding →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — FINAL CTA BANNER */}
      <section className="py-24 relative overflow-hidden">
        {/* Purple radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="container relative z-10 text-center max-w-2xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-ubuntu font-bold mb-6">
              Not sure which fits you?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-gray-400 mb-10">
              Book a free 20-minute call. We'll tell you exactly which package makes sense.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button href="/contact" variant="primary" size="xl" className="px-12">
                Book a Free Strategy Call
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Packages;
