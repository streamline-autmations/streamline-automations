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
  "You're getting enquiries but losing them because of slow responses",
  "You're manually confirming bookings, sending reminders, and following up",
  "You want leads captured and handled automatically while you work",
  "You run a service business — salon, gym, coach, contractor, studio, clinic",
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
];

const processSteps = [
  { number: 1, title: "Strategy Call", subtitle: "Day 1", desc: "We map your booking flow, lead sources, and automation needs." },
  { number: 2, title: "Design & Build", subtitle: "Days 1–4", desc: "Website built and all automation modules connected and configured." },
  { number: 3, title: "Automation Setup", subtitle: "Days 4–5", desc: "Booking system, CRM, chatbot, notifications — all wired together." },
  { number: 4, title: "Testing", subtitle: "Days 5–6", desc: "Full end-to-end test. We submit real leads and bookings to verify everything fires correctly." },
  { number: 5, title: "Launch", subtitle: "Day 7", desc: "System live. You receive a handover walkthrough so you know exactly how everything works." },
];

const whatsNotIncluded = [
  "Analytics dashboards or CMS editing (upgrade to Business Accelerator)",
  "Advanced multi-step automation logic",
  "Monthly maintenance or ongoing support (available as retainer add-on)",
];

const addOns = [
  { name: "Advanced AI Chatbot", price: "R2,000–R5,000" },
  { name: "Advanced Booking Logic", price: "R1,500–R3,000" },
  { name: "CRM Expansion", price: "R2,000–R6,000" },
  { name: "Logo & Branding", price: "R2,000–R5,000" },
  { name: "Hosting", price: "R250–R699/month" },
];

const faqs = [
  {
    q: "Which booking system do you integrate?",
    a: "We primarily use Cal.com — it's reliable, free, and deeply customizable. We can also integrate with existing systems you use."
  },
  {
    q: "Will I need to manage the automations myself?",
    a: "No. Everything runs automatically. You'll receive a handover walkthrough so you understand what's happening, but nothing requires manual management from you."
  },
  {
    q: "What if something breaks after launch?",
    a: "We include a 7-day post-launch support window. After that, ongoing support is available via retainer or on request."
  },
  {
    q: "Can the chatbot handle complex questions?",
    a: "The basic chatbot handles FAQs and booking assistance. For advanced logic, objection handling, or multi-step flows, the Advanced AI Chatbot add-on covers that."
  },
];

const ClientMagnetPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PackagePageLayout
      packageName="Client Magnet"
      packagePrice="Starting from R12,000"
      accentColor="orange"
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
              <span className="inline-block px-4 py-2 bg-brand-orange/10 text-brand-orange text-sm rounded-full border border-brand-orange/20">
                Tier 2 — Client Magnet ⭐ Most Popular
              </span>
            </motion.div>
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-ubuntu font-bold text-white mb-6"
            >
              Turn Your Website Into a Booking Machine.
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-gray-300 font-inter mb-4"
            >
              A complete lead and booking system — your site captures enquiries, 
              sends confirmations, follows up automatically, and never sleeps.
            </motion.p>
            <motion.p 
              variants={fadeInUp}
              className="text-2xl font-bold text-brand-orange mb-8"
            >
              Starting from R12,000
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange/10 hover:bg-brand-orange/20 text-brand-orange font-ubuntu font-medium rounded-lg transition-all duration-300 border border-brand-orange/20"
              >
                Start Getting More Clients <ArrowRight className="w-5 h-5" />
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
              className="glass-card p-6 md:p-8 rounded-2xl border-l-4 border-brand-orange/50"
            >
              <ul className="space-y-4">
                {isForYouIf.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
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
                  className="glass-card p-4 md:p-6 rounded-xl border border-white/10 hover:border-brand-orange/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 mb-3 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange">
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
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange font-bold text-lg border border-brand-orange/20">
                    {step.number}
                  </div>
                  <h3 className="text-white font-ubuntu font-medium mb-1">{step.title}</h3>
                  <p className="text-brand-orange/60 text-sm mb-2">{step.subtitle}</p>
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
              className="glass-card p-6 md:p-8 rounded-2xl border-l-4 border-brand-orange/50"
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
                  className="glass-card p-4 rounded-xl border border-white/10 hover:border-brand-orange/30 transition-all duration-300 text-center"
                >
                  <h3 className="text-white font-ubuntu font-medium text-sm mb-1">{addOn.name}</h3>
                  <p className="text-brand-orange/60 text-xs">{addOn.price}</p>
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
                    <ChevronDown className={`w-5 h-5 text-brand-orange/60 flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
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
            <div className="glass-card p-8 md:p-12 rounded-2xl border border-brand-orange/30 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent pointer-events-none" />
              <h2 className="text-2xl md:text-3xl font-ubuntu font-bold text-white mb-4 relative z-10">
                Ready to stop losing leads?
              </h2>
              <p className="text-gray-300 text-lg mb-8 relative z-10">
                Most clients recover the cost of this package within 
                their first month from automated bookings alone.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange/10 hover:bg-brand-orange/20 text-brand-orange font-ubuntu font-medium rounded-lg transition-all duration-300 border border-brand-orange/20 relative z-10"
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

export default ClientMagnetPage;
