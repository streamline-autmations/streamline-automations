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
import { fadeUp, stagger, cardItem, viewport } from '../../lib/motion';

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
      packagePrice="Starting from R7,500"
      accentColor="white"
    >
      {/* SECTION 1: Hero - s */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto"
          >
            {/* Left: Text */}
            <motion.div variants={fadeUp}>
              <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-xs font-mono tracking-[2px] rounded-full border border-white/20 mb-6">
                TIER 1 — ONLINE PRESENCE
              </span>
              <h1 className="h1 mb-4">
                Get Found. Look Professional.
              </h1>
              <p className="body mb-6 max-w-md">
                Clean, fast website live in 3–5 days.
              </p>
              <p className="price mb-6">From R7,500</p>
              <Link to="/contact" className="btn btn-primary btn-lg">
                Start Your Presence <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Right: Mockup */}
            <motion.div variants={fadeUp} className="hidden lg:block">
              <div className="w-full max-w-sm h-64 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="font-mono text-[10px] text-white/20 text-center leading-tight">
                  WEBSITE PREVIEW<br />Placeholder
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: This is for you if - s-panel s-line-purple */}
      <section className="section section-panel section-line">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
            <div className="section-intro">
              <span className="label">Target Audience</span>
              <h2 className="h2">
                Built for you if...
              </h2>
            </div>
            <div className="max-w-2xl mx-auto">
              <motion.div variants={cardItem} className="card card-bar-white">
                <ul className="space-y-3">
                  {isForYouIf.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 body">
                      <Check className="w-5 h-5 text-accent" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: What's Included - s-line-white */}
      <section className="section section-line-white">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
            <div className="section-intro">
              <span className="label">Features</span>
              <h2 className="h2 mb-4">
                What's Included
              </h2>
            </div>
            <motion.div className="grid-3 max-w-5xl mx-auto" variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
              {whatsIncluded.map((item, i) => (
                <motion.div key={i} variants={cardItem} className="card card-bar-white card-interactive">
                  <div className="icon-box" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)' }}>
                    {item.icon}
                  </div>
                  <h3 className="h3 mt-4 mb-1">{item.title}</h3>
                  <p className="body">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Process - s-panel s-line-orange */}
      <section className="section section-panel section-line">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
            <div className="section-intro">
              <span className="label">Process</span>
              <h2 className="h2">
                How It Works
              </h2>
            </div>
          
            {/* Connecting line - desktop only */}
            <div className="hidden md:block absolute left-0 right-0 h-px bg-white/10" style={{ top: '50%' }}></div>
          
            <div className="flex flex-col md:flex-row justify-between gap-8 max-w-4xl mx-auto relative">
              {processSteps.map((step, i) => (
                <motion.div key={i} variants={cardItem} className="card flex-1">
                  <div className="text-center flex flex-col items-center">
                    <div className="w-12 h-12 mb-3 rounded-full bg-[color:var(--surface)] flex items-center justify-center text-white font-bold text-lg border border-[color:var(--border)] relative z-10">
                      {step.number}
                    </div>
                    <h3 className="text-white font-medium mb-0.5">{step.title}</h3>
                    <p className="body-sm">{step.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: What's Not Included - s-line-white */}
      <section className="section section-line-white">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
            <div className="section-intro">
              <span className="label">Scope</span>
              <h2 className="h2">
                What This Doesn't Cover
              </h2>
            </div>
            <div className="max-w-xl mx-auto">
              <motion.div variants={cardItem} className="card">
                <ul className="space-y-2">
                  {whatsNotIncluded.map((item, i) => (
                    <li key={i} className="body">• {item}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: FAQ - s-line-white */}
      <section className="section section-line-white">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
            <div className="section-intro">
              <span className="label">FAQ</span>
              <h2 className="h2">
                Common Questions
              </h2>
            </div>
            <div className="space-y-3 max-w-2xl mx-auto">
              {faqs.map((faq, i) => (
                <motion.div key={i} variants={cardItem} className="card card-sm">
                  <div className="overflow-hidden">
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
                          <p className="px-4 pb-4 body">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: Final CTA - s-panel s-line-orange */}
      <section className="section section-panel section-line">
        <div className="container text-center max-w-xl">
          <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
            <span className="label">Get Started</span>
            <h2 className="h2 mb-4">Ready to go live?</h2>
            <p className="body mb-8">3–5 days to a professional online presence.</p>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Book a Free Strategy Call →
            </Link>
          </motion.div>
        </div>
      </section>
    </PackagePageLayout>
  );
};

export default OnlinePresencePage;
