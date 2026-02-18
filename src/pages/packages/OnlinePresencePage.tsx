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
  "You have no website or your current one looks outdated",
  "You just need something clean, fast, and professional",
  "You're not ready for automations yet — just a solid foundation",
  "You want to be found on Google and taken seriously",
];

const whatsIncluded = [
  { icon: <Monitor className="w-5 h-5" />, title: "Up to 5 Pages", desc: "Home, About, Services, Portfolio, Contact" },
  { icon: <Smartphone className="w-5 h-5" />, title: "Fully Responsive", desc: "Looks perfect on every device" },
  { icon: <Mail className="w-5 h-5" />, title: "Contact Form", desc: "Enquiries land directly in your inbox" },
  { icon: <MapPin className="w-5 h-5" />, title: "Google Maps & Socials", desc: "Linked and embedded" },
  { icon: <Zap className="w-5 h-5" />, title: "Fast Performance", desc: "Optimised load times from day one" },
  { icon: <Search className="w-5 h-5" />, title: "Basic SEO", desc: "Meta tags, titles, descriptions set up correctly" },
];

const processSteps = [
  { number: 1, title: "Strategy Call", subtitle: "Day 1", desc: "We learn your business, goals, and what your customers need to see." },
  { number: 2, title: "Design & Build", subtitle: "Days 1–3", desc: "We clone the right template, apply your branding, and write your copy." },
  { number: 3, title: "Review & Revisions", subtitle: "Days 3–4", desc: "You review a live preview. We refine until it's exactly right." },
  { number: 4, title: "Launch", subtitle: "Day 5", desc: "Domain connected, SSL live, site deployed. You're online." },
];

const whatsNotIncluded = [
  "Automation, booking systems, or CRM (upgrade to Client Magnet)",
  "Content writing or professional photography",
  "Logo design (available as an add-on)",
];

const addOns = [
  { name: "Logo & Branding", price: "R2,000–R5,000" },
  { name: "Extra Page", price: "R750" },
  { name: "Professional Email Setup", price: "R750" },
  { name: "Hosting", price: "R250–R699/month" },
  { name: "SEO Upgrade", price: "R2,500–R8,000" },
];

const faqs = [
  {
    q: "Do I need to provide the content?",
    a: "We'll guide you through exactly what we need via our onboarding form. If you're stuck on copy, we can write basic content for your pages."
  },
  {
    q: "Can I upgrade to a higher package later?",
    a: "Yes. Any Online Presence build can be upgraded to Client Magnet. The original build cost is credited toward the upgrade."
  },
  {
    q: "Do you use templates or build from scratch?",
    a: "We use proven structural templates that we fully customize with your branding, copy, and content. This is how we deliver in 3–5 days without cutting corners on quality."
  },
  {
    q: "What do I need to have ready before we start?",
    a: "Your logo (or we can design one), brand colors if you have them, and a rough idea of what pages you need. We handle the rest."
  },
];

const OnlinePresencePage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PackagePageLayout
      packageName="Online Presence"
      packagePrice="Starting from R6,500"
      accentColor="white"
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
              <span className="inline-block px-4 py-2 bg-white/10 text-white text-sm rounded-full border border-white/20">
                Tier 1 — Online Presence
              </span>
            </motion.div>
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-ubuntu font-bold text-white mb-6"
            >
              Get Found. Look Professional. Win Trust.
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-300 font-inter mb-4"
            >
              A clean, fast, conversion-ready website built for your business — 
              live in 3 to 5 working days.
            </motion.p>
            <motion.p 
              variants={fadeInUp}
              className="text-2xl font-bold text-white mb-8"
            >
              Starting from R6,500
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-ubuntu font-medium rounded-lg transition-all duration-300 border border-white/20"
              >
                Start Your Presence <ArrowRight className="w-5 h-5" />
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
              className="glass-card p-6 md:p-8 rounded-2xl border-l-4 border-white/50"
            >
              <ul className="space-y-4">
                {isForYouIf.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
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
                  className="glass-card p-4 md:p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 mb-3 rounded-lg bg-white/10 flex items-center justify-center text-white">
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
            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-2 max-w-4xl mx-auto">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex-1 text-center relative"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-lg border border-white/20">
                    {step.number}
                  </div>
                  <h3 className="text-white font-ubuntu font-medium mb-1">{step.title}</h3>
                  <p className="text-white/60 text-sm mb-2">{step.subtitle}</p>
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
              className="glass-card p-6 md:p-8 rounded-2xl border-l-4 border-white/50"
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {addOns.map((addOn, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="glass-card p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 text-center"
                >
                  <h3 className="text-white font-ubuntu font-medium text-sm mb-1">{addOn.name}</h3>
                  <p className="text-white/60 text-xs">{addOn.price}</p>
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
                    <ChevronDown className={`w-5 h-5 text-white/60 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
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
            <div className="glass-card p-8 md:p-12 rounded-2xl border border-white/30 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              <h2 className="text-2xl md:text-3xl font-ubuntu font-bold text-white mb-4 relative z-10">
                Ready to look professional online?
              </h2>
              <p className="text-gray-300 text-lg mb-8 relative z-10">
                Get a clean, fast website live in 3–5 working days. 
                No templates. No fluff.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-ubuntu font-medium rounded-lg transition-all duration-300 border border-white/20 relative z-10"
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

export default OnlinePresencePage;
