import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PackagePageLayout from '../../components/layout/PackagePageLayout';
import { Button, Card, SectionLabel, IconBox, Divider } from '../../components/ui';
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

// Standard Framer Motion variants
const fadeUp = {
  initial:   { opacity: 0, y: 20 },
  animate:   { opacity: 1, y: 0 },
  transition:{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const isForYouIf = [
  "Scaling and need systems, not just a website",
  "Want long-term partner for monthly improvements",
  "Need visibility into leads, bookings, performance",
  "Done duct-taping tools — want clean infrastructure",
];

const whatsIncluded = [
  { icon: <Monitor className="w-5 h-5" />, title: "Up to 5 Pages", desc: "Home, About, Services, Portfolio, Contact" },
  { icon: <Smartphone className="w-5 h-5" />, title: "Fully Responsive", desc: "Perfect on every device" },
  { icon: <Mail className="w-5 h-5" />, title: "Contact Form", desc: "Enquiries to your inbox" },
  { icon: <MapPin className="w-5 h-5" />, title: "Google Maps & Socials", desc: "Linked and embedded" },
  { icon: <Zap className="w-5 h-5" />, title: "Fast Performance", desc: "Optimised load times" },
  { icon: <Search className="w-5 h-5" />, title: "Basic SEO", desc: "Meta tags + titles set up" },
  { icon: <Calendar className="w-5 h-5" />, title: "Appointment Booking", desc: "Integrated calendar system" },
  { icon: <Brain className="w-5 h-5" />, title: "Smart Enquiry Forms", desc: "Qualifies leads automatically" },
  { icon: <ClipboardCheck className="w-5 h-5" />, title: "Simple CRM", desc: "Leads captured + organized" },
  { icon: <Bell className="w-5 h-5" />, title: "WhatsApp & Email Alerts", desc: "Instant lead notifications" },
  { icon: <Check className="w-5 h-5" />, title: "Booking Confirmations", desc: "Auto-sent on booking" },
  { icon: <MessageSquare className="w-5 h-5" />, title: "Reminder Messages", desc: "Automated reminders" },
  { icon: <RefreshCw className="w-5 h-5" />, title: "Basic Follow-Up", desc: "Auto follow-ups for leads" },
  { icon: <Brain className="w-5 h-5" />, title: "Basic AI Chatbot", desc: "FAQ + booking, 24/7" },
  { icon: <TrendingUp className="w-5 h-5" />, title: "Analytics Dashboard", desc: "Leads, bookings, trends view" },
  { icon: <Edit className="w-5 h-5" />, title: "Editable Site Sections", desc: "Update without code" },
  { icon: <Settings className="w-5 h-5" />, title: "Advanced Follow-Up", desc: "Multi-step sequences" },
  { icon: <Zap className="w-5 h-5" />, title: "Monthly Optimisation", desc: "We improve every month" },
  { icon: <Headphones className="w-5 h-5" />, title: "Priority Support", desc: "Direct line, fast response" },
  { icon: <FileEdit className="w-5 h-5" />, title: "Minor Changes", desc: "Small updates included" },
];

const processSteps = [
  { number: 1, title: "Deep Strategy", subtitle: "Day 1", desc: "Audit systems, goals, growth targets" },
  { number: 2, title: "Architecture", subtitle: "Days 1–2", desc: "Map automations + dashboard before build" },
  { number: 3, title: "Design & Build", subtitle: "Days 2–6", desc: "Full system — all modules built" },
  { number: 4, title: "Integration", subtitle: "Days 6–7", desc: "Modules connected + configured" },
  { number: 5, title: "Testing", subtitle: "Days 7–10", desc: "End-to-end, real scenarios" },
  { number: 6, title: "Launch", subtitle: "Day 10+", desc: "Deploy + full handover" },
];

const whatsNotIncluded = [
  "Large-scale custom software development",
  "Paid advertising management",
  "Photography or content production",
];

const faqs = [
  { q: "Why 1-week testing period?", a: "Interconnected systems require thorough testing. One edge case can break the flow. This protects you." },
  { q: "What's included in monthly retainer?", a: "Ongoing optimisation, priority support, minor changes — all included." },
  { q: "Can I upgrade from Client Magnet?", a: "Yes. Original build cost credits toward Accelerator." },
  { q: "How is this different from Client Magnet?", a: "Full dashboard visibility, editable content, monthly improvements, priority support." },
];

const BusinessAcceleratorPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PackagePageLayout
      packageName="Business Accelerator"
      packagePrice="Starting from R30,000"
      accentColor="purple"
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
            <motion.div variants={fadeUp}>
              <span className="inline-block px-4 py-1.5 bg-purple-500/10 text-purple-400 text-xs font-mono tracking-[2px] rounded-full border border-purple-500/20 mb-6">
                TIER 3 — BUSINESS ACCELERATOR
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4">
                Scale with Systems.
              </h1>
              <p className="text-base md:text-lg text-white/55 mb-6 max-w-md leading-relaxed">
                Full infrastructure with dashboard, analytics, and monthly growth partner.
              </p>
              <p className="text-2xl md:text-3xl font-bold font-mono text-purple-400 mb-6">From R30,000</p>
              <Button variant="primary" size="lg" href="/contact">
                Scale Your Business <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>

            {/* Right: Mockup */}
            <motion.div variants={fadeUp} className="hidden lg:block">
              <div className="w-full max-w-sm h-64 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="font-mono text-[10px] text-white/20 text-center leading-tight">
                  DASHBOARD<br />Placeholder
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* SECTION 2: This is for you if */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="text-center mb-12 md:mb-16">
              <SectionLabel>Target Audience</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Built for you if...
              </h2>
            </div>
            <Card accent="purple" topBar hover={false}>
              <div className="p-6">
                <ul className="space-y-3">
                  {isForYouIf.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/55">
                      <Check className="w-5 h-5 text-[color:var(--purple)]" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* SECTION 3: What's Included */}
      <section className="py-24 md:py-32 px-4">
        <div className="container mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="text-center mb-12 md:mb-16 max-w-5xl mx-auto">
              <SectionLabel>Features</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                What's Included
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
              {whatsIncluded.map((item, i) => (
                <Card key={i} accent="purple" hover>
                  <div className="p-5">
                    <IconBox accent="purple" size="md">
                      {item.icon}
                    </IconBox>
                    <h3 className="text-lg md:text-xl font-semibold text-white mt-4 mb-1">{item.title}</h3>
                    <p className="text-white/55 text-sm">{item.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* SECTION 4: Process */}
      <section className="py-24 md:py-32 px-4">
        <div className="container mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="text-center mb-12 md:mb-16">
              <SectionLabel>Process</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                How It Works
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {processSteps.map((step, i) => (
                <Card key={i} accent="none" hover={false} className="text-center">
                  <div className="p-4">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold text-sm border border-purple-500/20 relative z-10">
                      {step.number}
                    </div>
                    <h3 className="text-white font-medium mb-0.5 text-sm">{step.title}</h3>
                    <p className="text-white/50 text-xs">{step.subtitle}</p>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* SECTION 5: What's Not Included */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-2xl mx-auto px-6 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="text-center mb-12 md:mb-16">
              <SectionLabel>Scope</SectionLabel>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                What This Doesn't Cover
              </h2>
            </div>
            <Card accent="none" hover={false}>
              <div className="p-6">
                <ul className="space-y-2">
                  {whatsNotIncluded.map((item, i) => (
                    <li key={i} className="text-white/55 text-sm">• {item}</li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* SECTION 6: FAQ */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <div className="text-center mb-12 md:mb-16">
              <SectionLabel>FAQ</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Common Questions
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <Card key={i} accent="none" hover={false}>
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
                          <p className="px-4 pb-4 text-white/55 text-sm">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* SECTION 7: Final CTA */}
      <section className="py-20 md:py-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto relative z-10 text-center max-w-xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <SectionLabel>Get Started</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">Ready to scale?</h2>
            <p className="text-base md:text-lg text-white/55 mb-8 leading-relaxed">Your long-term growth partner awaits.</p>
            <Button variant="primary" size="lg" href="/contact">
              Book a Free Strategy Call →
            </Button>
          </motion.div>
        </div>
      </section>
    </PackagePageLayout>
  );
};

export default BusinessAcceleratorPage;
