import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PackagePageLayout from '../../components/layout/PackagePageLayout';
import CircuitLine from '../../components/ui/CircuitLine';
import {
  Monitor,
  Smartphone,
  Mail,
  MapPin,
  Zap,
  Search,
  Calendar,
  Brain,
  MessageSquare,
  ClipboardCheck,
  Bell,
  RefreshCw,
  ArrowRight,
  ChevronDown,
  Check,
  TrendingUp,
  Edit,
  Settings,
  Headphones,
  FileEdit,
} from 'lucide-react';

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

// Data
const isForYouIf = [
  "You're scaling and need systems, not just a website",
  "You want a long-term partner who maintains and improves your systems monthly",
  "You need visibility into your leads, bookings, and business performance",
  "You're done duct-taping tools together and want one clean infrastructure",
];

const whatsIncluded = [
  { icon: <Monitor className="w-5 h-5" />, title: "Up to 5 Pages", desc: "Home, About, Services, Portfolio, Contact" },
  { icon: <Smartphone className="w-5 h-5" />, title: "Fully Responsive", desc: "Looks perfect on every device" },
  { icon: <Mail className="w-5 h-5" />, title: "Contact Form", desc: "Enquiries land directly in your inbox" },
  { icon: <MapPin className="w-5 h-5" />, title: "Google Maps & Socials", desc: "Linked and embedded" },
  { icon: <Zap className="w-5 h-5" />, title: "Fast Performance", desc: "Optimised load times from day one" },
  { icon: <Search className="w-5 h-5" />, title: "Basic SEO", desc: "Meta tags, titles, descriptions set up correctly" },
  { icon: <Calendar className="w-5 h-5" />, title: "Appointment Booking", desc: "Integrated calendar booking system" },
  { icon: <Brain className="w-5 h-5" />, title: "Smart Enquiry Forms", desc: "Forms that qualify leads before they reach you" },
  { icon: <ClipboardCheck className="w-5 h-5" />, title: "Simple CRM", desc: "Leads captured and organised automatically" },
  { icon: <Bell className="w-5 h-5" />, title: "WhatsApp & Email Alerts", desc: "Instant notifications when a lead comes in" },
  { icon: <Check className="w-5 h-5" />, title: "Booking Confirmations", desc: "Auto-sent the moment someone books" },
  { icon: <MessageSquare className="w-5 h-5" />, title: "Reminder Messages", desc: "Automated reminders reduce no-shows" },
  { icon: <RefreshCw className="w-5 h-5" />, title: "Basic Follow-Up Sequence", desc: "Automatic follow-ups for cold leads" },
  { icon: <Brain className="w-5 h-5" />, title: "Basic AI Chatbot", desc: "Handles FAQs and booking help 24/7" },
  { icon: <TrendingUp className="w-5 h-5" />, title: "Analytics Dashboard", desc: "See your leads, bookings, and trends in one place" },
  { icon: <Edit className="w-5 h-5" />, title: "Editable Site Sections", desc: "Update content without touching code" },
  { icon: <Settings className="w-5 h-5" />, title: "Advanced Follow-Up Logic", desc: "Multi-step sequences based on lead behaviour" },
  { icon: <Zap className="w-5 h-5" />, title: "Monthly Optimisation", desc: "We improve your system every month" },
  { icon: <Headphones className="w-5 h-5" />, title: "Priority Support", desc: "Direct line, fast response" },
  { icon: <FileEdit className="w-5 h-5" />, title: "Minor Changes Included", desc: "Small updates at no extra cost" },
];

const processSteps = [
  { number: 1, title: "Deep Strategy Session", subtitle: "Day 1", desc: "Full audit of your current systems, goals, and growth targets." },
  { number: 2, title: "Architecture Planning", subtitle: "Days 1–2", desc: "We map every automation, dashboard, and integration before we build." },
  { number: 3, title: "Design & Build", subtitle: "Days 2–6", desc: "Full system built — website, automations, CRM, dashboard, chatbot." },
  { number: 4, title: "Integration & Configuration", subtitle: "Days 6–7", desc: "Every module connected, tested individually, and configured." },
  { number: 5, title: "Full System Testing", subtitle: "Days 7–10", desc: "Minimum 1 week of thorough end-to-end testing. Real scenarios, real data, edge cases covered." },
  { number: 6, title: "Launch & Onboarding", subtitle: "Day 10+", desc: "System deployed. Full handover session. Monthly retainer begins." },
];

const whatsNotIncluded = [
  "Large-scale custom software development",
  "Paid advertising management (Google Ads, Meta Ads)",
  "Photography, videography, or content production",
];

const addOns = [
  { name: "CRM Expansion", price: "R2,000–R6,000" },
  { name: "Advanced AI Chatbot", price: "R2,000–R5,000" },
  { name: "Logo & Branding", price: "R2,000–R5,000" },
  { name: "SEO Upgrade", price: "R2,500–R8,000" },
];

const faqs = [
  {
    q: "Why is there a minimum 1-week testing period?",
    a: "At this tier, we're building interconnected systems — automations triggering other automations, dashboards pulling live data, multi-channel notifications. One untested edge case can break the whole flow. The testing week is non-negotiable and protects you."
  },
  {
    q: "What does the monthly retainer actually include?",
    a: "Monthly optimisation of your automations, minor site updates, priority support, and a monthly review of your system performance. Retainer starts at R3,500/month."
  },
  {
    q: "Do I own everything after the build?",
    a: "Yes. Full ownership of your website, database, and all automation workflows. We don't lock you into proprietary systems."
  },
  {
    q: "What if I want to cancel the retainer?",
    a: "No lock-in contracts. 30-day notice to cancel. Your system continues running — you just lose the ongoing optimisation and support."
  },
];

const BusinessAcceleratorPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PackagePageLayout
      packageName="Business Accelerator"
      packagePrice="Starting from R25,000 + R3,500-7,000/month"
      accentColor="purple"
    >
      {/* SECTION 1: Hero */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 circuit-bg opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-block px-4 py-2 bg-brand-purple/10 text-brand-purple text-sm rounded-full border border-brand-purple/20">
                Tier 3 — Business Accelerator
              </span>
            </motion.div>
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-ubuntu font-bold text-white mb-6"
            >
              A Growth Partner, Not Just a Build.
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-300 font-inter mb-4"
            >
              Your complete digital infrastructure — built, tested, optimised, 
              and maintained every month so you can focus entirely on running your business.
            </motion.p>
            <motion.p 
              variants={fadeInUp}
              className="text-2xl font-bold text-brand-purple mb-8"
            >
              Starting from R25,000 + R3,500-7,000/month
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-purple/10 hover:bg-brand-purple/20 text-brand-purple font-ubuntu font-medium rounded-lg transition-all duration-300 border border-brand-purple/20"
              >
                Let's Build Your System <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CircuitLine variant="fast" />

      {/* SECTION 2: This is for you if */}
      <section className="py-16 md:py-20 relative">
        <div className="absolute inset-0 circuit-bg opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-ubuntu font-bold text-white mb-8 text-center">
              This package is built for you if...
            </motion.h2>
            <motion.div 
              variants={fadeInUp}
              className="glass-card p-6 md:p-8 rounded-2xl border-l-4 border-brand-purple/50"
            >
              <ul className="space-y-4">
                {isForYouIf.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CircuitLine variant="slow-pulse" />

      {/* SECTION 3: What's Included */}
      <section className="py-16 md:py-20 relative">
        <div className="absolute inset-0 circuit-bg opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial="initial" animate="animate" variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-ubuntu font-bold text-white mb-12 text-center">
              What's Included
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
              {whatsIncluded.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="glass-card p-4 md:p-6 rounded-xl border border-white/10 hover:border-brand-purple/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 mb-3 rounded-lg bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                    {item.icon}
                  </div>
                  <h3 className="text-white font-ubuntu font-medium mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CircuitLine variant="fast" />

      {/* SECTION 4: The Process */}
      <section className="py-16 md:py-20 relative">
        <div className="absolute inset-0 circuit-bg opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial="initial" animate="animate" variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-ubuntu font-bold text-white mb-12 text-center">
              How It Works
            </motion.h2>
            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-2 max-w-5xl mx-auto">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex-1 text-center relative"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple font-bold text-lg border border-brand-purple/20">
                    {step.number}
                  </div>
                  <h3 className="text-white font-ubuntu font-medium mb-1">{step.title}</h3>
                  <p className="text-brand-purple/60 text-sm mb-2">{step.subtitle}</p>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CircuitLine variant="slow-pulse" />

      {/* SECTION 5: What's Not Included */}
      <section className="py-16 md:py-20 relative">
        <div className="absolute inset-0 circuit-bg opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-2xl mx-auto"
          >
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-ubuntu font-bold text-white mb-8 text-center">
              What This Package Doesn't Cover
            </motion.h2>
            <motion.div 
              variants={fadeInUp}
              className="glass-card p-6 md:p-8 rounded-2xl border-l-4 border-brand-purple/50"
            >
              <ul className="space-y-3">
                {whatsNotIncluded.map((item, i) => (
                  <li key={i} className="text-gray-400 text-sm">
                    • {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <CircuitLine variant="fast" />

      {/* SECTION 6: Relevant Add-ons */}
      <section className="py-16 md:py-20 bg-white/5 relative">
        <div className="absolute inset-0 circuit-bg opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial="initial" animate="animate" variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-ubuntu font-bold text-white mb-4 text-center">
              Enhance Your Package
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 text-center mb-8">
              Add-ons are only available when combined with a package.
            </motion.p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {addOns.map((addOn, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="glass-card p-4 rounded-xl border border-white/10 hover:border-brand-purple/30 transition-all duration-300 text-center"
                >
                  <h3 className="text-white font-ubuntu font-medium text-sm mb-1">{addOn.name}</h3>
                  <p className="text-brand-purple/60 text-xs">{addOn.price}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CircuitLine variant="slow-pulse" />

      {/* SECTION 7: FAQ */}
      <section className="py-16 md:py-20 relative">
        <div className="absolute inset-0 circuit-bg opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div initial="initial" animate="animate" variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-ubuntu font-bold text-white mb-12 text-center">
              Common Questions
            </motion.h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="glass-card rounded-xl border border-white/10 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 md:p-5 text-left"
                  >
                    <span className="text-white font-ubuntu font-medium pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-brand-purple/60 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 md:px-5 pb-4 md:pb-5 text-gray-400 text-sm">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CircuitLine variant="fast" />

      {/* SECTION 8: Final CTA */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-8 md:p-12 rounded-2xl border border-brand-purple/30 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-transparent pointer-events-none" />
              <h2 className="text-2xl md:text-3xl font-ubuntu font-bold text-white mb-4 relative z-10">
                Ready to build something that actually scales?
              </h2>
              <p className="text-gray-300 text-lg mb-8 relative z-10">
                Let's map your full system on a free strategy call. 
                No pitch. Just a plan.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-purple/10 hover:bg-brand-purple/20 text-brand-purple font-ubuntu font-medium rounded-lg transition-all duration-300 border border-brand-purple/20 relative z-10"
              >
                Book Your Free Strategy Call <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PackagePageLayout>
  );
};

export default BusinessAcceleratorPage;
