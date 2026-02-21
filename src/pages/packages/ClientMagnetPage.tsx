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
  "Getting enquiries but losing them to slow responses",
  "Manually confirming bookings and sending reminders",
  "Want leads captured and handled automatically",
  "Run a service business — salon, gym, coach",
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
];

const processSteps = [
  { number: 1, title: "Strategy Call", subtitle: "Day 1", desc: "Map booking flow + automation needs" },
  { number: 2, title: "Design & Build", subtitle: "Days 1–4", desc: "Website built + modules connected" },
  { number: 3, title: "Automation Setup", subtitle: "Days 4–5", desc: "Booking, CRM, chatbot wired" },
  { number: 4, title: "Testing", subtitle: "Days 5–6", desc: "End-to-end test with real data" },
  { number: 5, title: "Launch", subtitle: "Day 7", desc: "System live + handover walkthrough" },
];

const whatsNotIncluded = [
  "Analytics dashboards or CMS (upgrade to Accelerator)",
  "Advanced multi-step automation logic",
  "Monthly maintenance (retainer add-on available)",
];

const faqs = [
  { q: "Which booking system do you use?", a: "Cal.com — reliable, free, customizable. Or integrate your existing system." },
  { q: "Do I need to manage automations?", a: "No. Everything runs automatically. Get handover walkthrough at launch." },
  { q: "What if something breaks after launch?", a: "7-day post-launch support included. Ongoing support via retainer." },
  { q: "Can chatbot handle complex questions?", a: "Basic FAQs + booking. Complex queries route to you." },
];

const ClientMagnetPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PackagePageLayout
      packageName="Client Magnet"
      packagePrice="Starting from R15,000"
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
              <span className="inline-block px-4 py-1.5 bg-[color:var(--orange-dim)] text-[color:var(--orange)] text-xs font-mono tracking-[2px] rounded-full border border-[color:var(--orange-border)] mb-6">
                TIER 2 — CLIENT MAGNET
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4">
                Automate Leads & Bookings.
              </h1>
              <p className="text-base md:text-lg text-white/55 mb-6 max-w-md leading-relaxed">
                System that captures, qualifies, and books clients 24/7.
              </p>
              <p className="text-2xl md:text-3xl font-bold font-mono text-accent mb-6">From R15,000</p>
              <Button variant="primary" size="lg" href="/contact">
                Automate Your Business <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>

            {/* Right: Mockup */}
            <motion.div variants={fadeUp} className="hidden lg:block">
              <div className="w-full max-w-sm h-64 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="font-mono text-[10px] text-white/20 text-center leading-tight">
                  BOOKING SYSTEM<br />Placeholder
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
            <Card accent="orange" topBar hover={false}>
              <div className="p-6">
                <ul className="space-y-3">
                  {isForYouIf.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/55">
                      <Check className="w-5 h-5 text-accent" /> {item}
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
                <Card key={i} accent="orange" hover>
                  <div className="p-5">
                    <IconBox accent="orange" size="md">
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
            <div className="flex flex-col md:flex-row justify-between gap-8 max-w-4xl mx-auto relative">
              {processSteps.map((step, i) => (
                <Card key={i} accent="none" hover={false} className="flex-1">
                  <div className="p-6 text-center flex flex-col items-center">
                    <div className="w-12 h-12 mb-3 rounded-full bg-[color:var(--orange-dim)] flex items-center justify-center text-[color:var(--orange)] font-bold text-lg border border-[color:var(--orange-border)] relative z-10">
                      {step.number}
                    </div>
                    <h3 className="text-white font-medium mb-0.5">{step.title}</h3>
                    <p className="text-white/50 text-sm">{step.subtitle}</p>
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[color:var(--purple-dim)] rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto relative z-10 text-center max-w-xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <SectionLabel>Get Started</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">Ready to automate?</h2>
            <p className="text-base md:text-lg text-white/55 mb-8 leading-relaxed">Book more clients while you sleep.</p>
            <Button variant="primary" size="lg" href="/contact">
              Book a Free Strategy Call →
            </Button>
          </motion.div>
        </div>
      </section>
    </PackagePageLayout>
  );
};

export default ClientMagnetPage;
