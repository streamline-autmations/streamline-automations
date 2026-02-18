import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PackagePageLayout from '../../components/layout/PackagePageLayout';
import {
  Monitor,
  Smartphone,
  Mail,
  MapPin,
  Zap,
  Search,
  ArrowRight,
  ChevronDown,
  Check,
} from 'lucide-react';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const isForYouIf = [
  "No website or outdated site",
  "Need clean, fast, professional look",
  "Ready to be found on Google",
  "Foundation before automations",
];

const whatsIncluded = [
  { icon: <Monitor className="w-5 h-5" />, title: "Up to 5 Pages", desc: "Home, About, Services, Portfolio, Contact" },
  { icon: <Smartphone className="w-5 h-5" />, title: "Fully Responsive", desc: "Perfect on every device" },
  { icon: <Mail className="w-5 h-5" />, title: "Contact Form", desc: "Enquiries to your inbox" },
  { icon: <MapPin className="w-5 h-5" />, title: "Google Maps & Socials", desc: "Linked and embedded" },
  { icon: <Zap className="w-5 h-5" />, title: "Fast Performance", desc: "Optimised load times" },
  { icon: <Search className="w-5 h-5" />, title: "Basic SEO", desc: "Meta tags + titles set up" },
];

const processSteps = [
  { number: 1, title: "Strategy Call", subtitle: "Day 1", desc: "Learn your business and goals" },
  { number: 2, title: "Design & Build", subtitle: "Days 1–3", desc: "Apply branding and write copy" },
  { number: 3, title: "Review", subtitle: "Days 3–4", desc: "Live preview, refinements" },
  { number: 4, title: "Launch", subtitle: "Day 5", desc: "Domain, SSL, deployed" },
];

const whatsNotIncluded = [
  "Automation or CRM (upgrade to Client Magnet)",
  "Content writing or photography",
  "Logo design (add-on available)",
];

const faqs = [
  { q: "Do I need to provide content?", a: "We guide you through our onboarding form. Basic content writing included." },
  { q: "Can I upgrade later?", a: "Yes. Build cost credits toward Client Magnet upgrade." },
  { q: "Templates or from scratch?", a: "We customize proven templates — deliver in 3–5 days." },
  { q: "What do I need ready?", a: "Logo (or we design), brand colors, page list. We handle the rest." },
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
      <section className="pt-12 pb-16 md:pt-16 md:pb-24 px-4">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto"
          >
            {/* Left: Text */}
            <motion.div variants={fadeUpVariants}>
              <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-xs font-mono tracking-[2px] rounded-full border border-white/20 mb-6">
                TIER 1 — ONLINE PRESENCE
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Get Found. Look Professional.
              </h1>
              <p className="text-white/50 text-lg mb-6 max-w-md">
                Clean, fast website live in 3–5 days.
              </p>
              <p className="text-2xl font-bold text-white mb-6 font-mono">From R6,500</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all"
              >
                Start Your Presence <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Right: Mockup */}
            <motion.div variants={fadeUpVariants} className="hidden lg:block">
              <div className="w-full max-w-sm h-64 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="font-mono text-[10px] text-white/20 text-center leading-tight">
                  WEBSITE PREVIEW<br />Placeholder
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: This is for you if */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Built for you if...</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <ul className="space-y-3">
                {isForYouIf.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-white" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: What's Included */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants} className="text-2xl font-bold text-white mb-8 text-center">
            What's Included
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {whatsIncluded.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariants}
                className="bg-white/5 border border-white/10 rounded-xl p-5"
              >
                <div className="w-10 h-10 mb-3 rounded-lg bg-white/10 flex items-center justify-center text-white">
                  {item.icon}
                </div>
                <h3 className="text-white font-medium mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Process */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants} className="text-2xl font-bold text-white mb-10 text-center">
            How It Works
          </motion.h2>
          
          {/* Connecting line - desktop only */}
          <div className="hidden md:block absolute left-0 right-0 h-px bg-white/10" style={{ top: '50%' }}></div>
          
          <div className="flex flex-col md:flex-row justify-between gap-8 max-w-4xl mx-auto relative">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariants}
                className="flex-1 text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 mb-3 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-lg border border-white/20 relative z-10">
                  {step.number}
                </div>
                <h3 className="text-white font-medium mb-0.5">{step.title}</h3>
                <p className="text-white/50 text-sm">{step.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: What's Not Included */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <h2 className="text-xl font-bold text-white mb-6 text-center">What This Doesn't Cover</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <ul className="space-y-2">
                {whatsNotIncluded.map((item, i) => (
                  <li key={i} className="text-gray-400 text-sm">• {item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: FAQ */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants} className="text-2xl font-bold text-white mb-8 text-center">
            Common Questions
          </motion.h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariants}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="text-white font-medium pr-4">{faq.q}</span>
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
                      <p className="px-4 pb-4 text-gray-400 text-sm">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Final CTA */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto relative z-10 text-center max-w-xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <h2 className="text-3xl font-bold text-white mb-4">Ready to go live?</h2>
            <p className="text-white/50 mb-8">3–5 days to a professional online presence.</p>
            <Link
              to="/contact"
              className="inline-block bg-white text-black font-semibold rounded-full px-8 py-4 hover:bg-white/90 transition-all"
            >
              Book a Free Strategy Call →
            </Link>
          </motion.div>
        </div>
      </section>
    </PackagePageLayout>
  );
};

export default OnlinePresencePage;
