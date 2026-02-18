import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Zap, 
  TrendingUp, 
  Check, 
  Plus, 
  Mail, 
  Server, 
  MessageSquare, 
  Calendar, 
  Database, 
  Search,
  ArrowRight
} from 'lucide-react';
import CircuitLine from '../components/ui/CircuitLine';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Add-ons data
const addOns = [
  { icon: <Globe className="w-5 h-5" />, name: 'Logo & Branding', price: 'R2,000 – R5,000' },
  { icon: <Plus className="w-5 h-5" />, name: 'Extra Page', price: 'R750' },
  { icon: <Mail className="w-5 h-5" />, name: 'Professional Email Setup', price: 'R750' },
  { icon: <Server className="w-5 h-5" />, name: 'Hosting', price: 'R250 – R699/month' },
  { icon: <MessageSquare className="w-5 h-5" />, name: 'Advanced AI Chatbot', price: 'R2,000 – R5,000' },
  { icon: <Calendar className="w-5 h-5" />, name: 'Advanced Booking Logic', price: 'R1,500 – R3,000' },
  { icon: <Database className="w-5 h-5" />, name: 'CRM Expansion', price: 'R2,000 – R6,000' },
  { icon: <Search className="w-5 h-5" />, name: 'SEO Upgrade', price: 'R2,500 – R8,000' },
];

const Packages: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Atmospheric Orbs */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-brand-orange/10 blur-[100px] rounded-full animate-blob pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-brand-purple/10 blur-[120px] rounded-full animate-blob pointer-events-none" style={{ animationDelay: '4s' }}></div>

      {/* SECTION 1: Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 circuit-bg opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-ubuntu font-bold text-white mb-6"
            >
              Choose Your System
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-300 font-inter"
            >
              Every package is a complete business system — not just a website. 
              Pick the one that matches where you are right now.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Package Cards */}
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0 circuit-bg opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
          >
            {/* Card 1: Online Presence */}
            <motion.div
              variants={fadeInUp}
              className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-white/10 text-white text-sm rounded-full">
                  Get Found Online
                </span>
              </div>
              <h3 className="text-2xl font-ubuntu font-bold text-white mb-2">
                Online Presence
              </h3>
              <p className="text-2xl font-bold text-white mb-4">Starting from R6,500</p>
              <p className="text-gray-300 mb-6">A clean, professional website that works.</p>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Up to 5 pages',
                  'Responsive design',
                  'Contact form',
                  'Basic SEO',
                  'Google Maps & social links',
                  'Fast performance',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-sm text-gray-400 mb-6">Timeline: 3–5 working days</p>

              <Link
                to="/packages/online-presence"
                className="block w-full py-3 px-6 bg-white/10 hover:bg-white/20 text-white text-center font-ubuntu font-medium rounded-lg transition-all duration-300"
              >
                Start Here
              </Link>
            </motion.div>

            {/* Card 2: Client Magnet (Most Popular) */}
            <motion.div
              variants={fadeInUp}
              className="glass-card p-6 md:p-8 rounded-2xl border-2 border-brand-orange relative overflow-hidden"
              style={{
                boxShadow: '0 0 40px rgba(249, 115, 22, 0.3)',
                transform: 'scale(1.05)'
              }}
            >
              {/* Animated glow border */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none">
                <div className="absolute inset-0 rounded-2xl animate-pulse" style={{
                  boxShadow: 'inset 0 0 20px rgba(249, 115, 22, 0.5)'
                }} />
              </div>

              <div className="mb-4 relative z-10">
                <span className="inline-block px-3 py-1 bg-brand-orange text-white text-sm rounded-full font-medium">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-ubuntu font-bold text-white mb-2 relative z-10">
                Client Magnet
              </h3>
              <p className="text-2xl font-bold text-brand-orange mb-4 relative z-10">Starting from R12,000</p>
              <p className="text-gray-300 mb-6 relative z-10">Automate your leads, bookings, and follow-ups.</p>
              
              <ul className="space-y-3 mb-8 relative z-10">
                {[
                  'Everything in Online Presence PLUS:',
                  'Appointment booking integration',
                  'Smart enquiry forms',
                  'Lead capture into simple CRM',
                  'Email & WhatsApp notifications',
                  'Booking confirmations & reminders',
                  'Basic automated follow-ups',
                  'Basic AI chatbot (FAQ + booking help)',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-sm text-gray-400 mb-6 relative z-10">Timeline: 5–7 working days</p>

              <Link
                to="/packages/client-magnet"
                className="block w-full py-3 px-6 bg-brand-orange hover:bg-brand-orange/80 text-white text-center font-ubuntu font-medium rounded-lg transition-all duration-300 relative z-10"
              >
                Get More Clients
              </Link>
            </motion.div>

            {/* Card 3: Business Accelerator */}
            <motion.div
              variants={fadeInUp}
              className="glass-card p-6 md:p-8 rounded-2xl border border-brand-purple/50 hover:border-brand-purple transition-all duration-300"
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-brand-purple/20 text-brand-purple text-sm rounded-full">
                  Full Growth System
                </span>
              </div>
              <h3 className="text-2xl font-ubuntu font-bold text-white mb-2">
                Business Accelerator
              </h3>
              <p className="text-2xl font-bold text-brand-purple mb-4">Starting from R25,000 + R3,500–R7,000/month</p>
              <p className="text-gray-300 mb-6">A long-term growth partner, not just a build.</p>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Everything in Client Magnet PLUS:',
                  'Analytics dashboard',
                  'Lead & booking visibility',
                  'Editable site sections (CMS-style)',
                  'Advanced follow-up logic',
                  'Monthly optimisation',
                  'Priority support & minor changes included',
                  'Automation tuning',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-sm text-gray-400 mb-6">Timeline: 7–10 days setup + ongoing retainer</p>

              <Link
                to="/packages/business-accelerator"
                className="block w-full py-3 px-6 bg-brand-purple hover:bg-brand-purple/80 text-white text-center font-ubuntu font-medium rounded-lg transition-all duration-300"
              >
                Let's Build
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: What's Not Included */}
      <div className="py-8 md:py-12">
        <CircuitLine variant="fast" />
      </div>

      <section className="py-16 md:py-20">
        <div className="absolute inset-0 circuit-bg opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-ubuntu font-bold text-white mb-4">
              What's Not Included (And Why)
            </h2>
            <p className="text-gray-400 text-lg">
              We don't do templates. We don't do one-size-fits-all. 
              Every build starts with a strategy call so we scope exactly what you need — 
              nothing more, nothing less.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: Power-Ups / Add-ons */}
      <div className="py-8 md:py-12">
        <CircuitLine variant="slow-pulse" />
      </div>

      <section className="py-20 md:py-28 bg-white/5 relative">
        <div className="absolute inset-0 circuit-bg opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-ubuntu font-bold text-white mb-4">
                Power-Ups
              </h2>
              <p className="text-gray-400">
                Only available on top of a package. Never sold alone.
              </p>
            </div>

            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto"
            >
              {addOns.map((addOn, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="glass-card p-4 md:p-6 rounded-xl border border-white/10 hover:border-brand-purple/50 transition-all duration-300 text-center"
                >
                  <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-brand-purple/20 flex items-center justify-center text-brand-purple">
                    {addOn.icon}
                  </div>
                  <h3 className="text-white font-ubuntu font-medium mb-2">{addOn.name}</h3>
                  <p className="text-brand-purple font-bold text-sm">{addOn.price}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: Final CTA Banner */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 md:p-12 rounded-2xl border border-brand-orange/30 text-center relative overflow-hidden">
              {/* Subtle orange glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent pointer-events-none" />
              
              <h2 className="text-2xl md:text-3xl font-ubuntu font-bold text-white mb-4 relative z-10">
                Not sure which package fits you?
              </h2>
              <p className="text-gray-300 text-lg mb-8 relative z-10">
                Book a free 20-minute strategy call. We'll scope the right system for your business — 
                no pressure, no pitch.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 py-3 px-8 bg-brand-orange hover:bg-brand-orange/80 text-white font-ubuntu font-medium rounded-lg transition-all duration-300 relative z-10"
              >
                Book a Free Strategy Call
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;
