import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import LogoMarquee from '../components/ui/LogoMarquee';
import FeaturedWorkSection from '../components/home/FeaturedWorkSection';
import FinalCTA from '../components/home/FinalCTA';
import CircuitLine from '../components/ui/CircuitLine';
import { Badge } from '../components/ui';
import {
  Zap,
  Layers,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { stagger, cardItem, viewport } from '../lib/motion';

// Package preview data
const packages = [
  {
    name: "Online Presence",
    outcome: "A clean, professional website live in 3–5 days.",
    price: "From R7,500",
    bullets: [
      "Up to 5 pages, fully responsive",
      "Contact form + Google Maps + social links",
      "Basic SEO setup included",
    ],
    link: "/packages/online-presence",
    accent: "white",
  },
  {
    name: "Client Magnet",
    outcome: "Automated leads, bookings, and follow-ups.",
    price: "From R15,000",
    bullets: [
      "Appointment booking + smart enquiry forms",
      "WhatsApp & email notifications",
      "Basic AI chatbot included",
    ],
    link: "/packages/client-magnet",
    accent: "orange",
    popular: true,
  },
  {
    name: "Business Accelerator",
    outcome: "A long-term growth partner, not just a build.",
    price: "From R30,000 + retainer",
    bullets: [
      "Analytics dashboard + CMS editing",
      "Advanced automations + follow-up logic",
      "Monthly optimisation & priority support",
    ],
    link: "/packages/business-accelerator",
    accent: "purple",
  },
];

// How it works data
const howItWorks = [
  {
    number: "01",
    title: "Strategy Call",
    description: "We learn your business, your goals, and exactly what your customers need to see and do.",
    badge: "Day 1 — Free",
    color: "orange",
  },
  {
    number: "02",
    title: "We Build Your System",
    description: "Design, development, automations, and integrations — all handled by us. You just review and approve.",
    badge: "Days 1–7",
    color: "purple",
  },
  {
    number: "03",
    title: "You Go Live",
    description: "Fully tested, deployed, and handed over with a walkthrough. Your system starts working from day one.",
    badge: "Day 5–10",
    color: "white",
  },
];

const Home: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* HERO */}
      <section className="section">
        <div className="container">
          <Hero />
        </div>
      </section>

      {/* SECTION 2: WHY STREAMLINE */}
      <section className="section section-panel section-line">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <div className="section-intro">
              <span className="label">Why Streamline</span>
              <h2 className="h2">
                Why businesses choose Streamline
              </h2>
              <p className="body">
                We don't sell websites. We build systems that work for you.
              </p>
            </div>

            <motion.div className="grid-3 max-w-5xl mx-auto" variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
              <motion.div variants={cardItem} className="card card-bar card-interactive card-interactive-purple">
                <div className="icon-box bg-[color:var(--purple-dim)] border-[color:var(--purple-border)] text-[color:var(--purple)]">
                  <Zap className="w-5 h-5 text-[color:var(--purple)]" />
                </div>
                <h3 className="h3 mt-4 mb-3">Built for Speed</h3>
                <p className="body">
                  From strategy call to live site in under 7 days. No back-and-forth delays, no bloated timelines.
                </p>
              </motion.div>

              <motion.div variants={cardItem} className="card card-bar-white card-interactive card-interactive-white">
                <div className="icon-box bg-[rgba(255,255,255,0.06)] border-[rgba(255,255,255,0.18)] text-white">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <h3 className="h3 mt-4 mb-3">Systems, Not Just Sites</h3>
                <p className="body">
                  Every build includes the automations, forms, and flows that actually run your business day-to-day.
                </p>
              </motion.div>

              <motion.div variants={cardItem} className="card card-bar-orange card-interactive card-interactive-orange">
                <div className="icon-box bg-[color:var(--orange-dim)] border-[color:var(--orange-border)] text-[color:var(--orange)]">
                  <ShieldCheck className="w-5 h-5 text-[color:var(--orange)]" />
                </div>
                <h3 className="h3 mt-4 mb-3">You Own Everything</h3>
                <p className="body">
                  No lock-in. No proprietary platforms. Full ownership of your site, data, and automations from day one.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: FEATURED BUILDS */}
      <FeaturedWorkSection />

      {/* SECTION 4: TECH STACK */}
      <section className="section section-panel section-line">
        <div className="container">
          <div className="pt-8 md:pt-12 text-center">
            <p className="text-sm md:text-base font-bold text-[color:var(--text-muted)] uppercase tracking-[0.2em]">
              POWERED BY
            </p>
          </div>
          <LogoMarquee />
          <div className="py-8 md:py-12">
            <CircuitLine variant="fast" />
          </div>
        </div>
      </section>

      {/* SECTION 5: PACKAGES */}
      <section className="section section-line">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <div className="section-intro">
              <span className="label">Packages</span>
              <h2 className="h2">
                Choose Your System
              </h2>
              <p className="body">
                Every package is a complete business system. Pick the one that fits where you are right now.
              </p>
            </div>

            <motion.div className="grid-3 max-w-5xl mx-auto" variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
              {packages.map((pkg, i) => (
                <motion.div 
                  key={i} 
                  variants={cardItem}
                  className={`card relative overflow-hidden ${
                    pkg.accent === 'white'
                      ? 'card-interactive card-interactive-white packages-card-white'
                      : pkg.accent === 'orange'
                        ? 'card-featured-orange card-interactive card-interactive-orange packages-card-orange'
                        : 'card-featured card-interactive card-interactive-purple packages-card-purple'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute top-3 right-4">
                      <Badge variant={pkg.accent === 'orange' ? 'orange' : 'purple'}>Most Popular</Badge>
                    </div>
                  )}

                  <h3 className="h3 mb-2">{pkg.name}</h3>
                  <p className="body mb-3">{pkg.outcome}</p>
                  <p className="price mb-4">{pkg.price}</p>

                  <ul className="space-y-2 mb-6">
                    {pkg.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-2 body">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          pkg.accent === 'white' ? 'text-white/70' :
                          pkg.accent === 'orange' ? 'text-[color:var(--orange)]' :
                          'text-[color:var(--purple)]'
                        }`} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to={pkg.link} className={`btn btn-fw ${
                    pkg.accent === 'orange' ? 'btn-orange' :
                    pkg.accent === 'purple' ? 'btn-primary' :
                    'btn-secondary'
                  }`}>
                    Learn More
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <div className="text-center mt-10">
              <p className="body">
                Not sure which fits you?{' '}
                <Link to="/contact" className="text-white underline underline-offset-4 hover:text-accent transition-colors">
                  Book a free strategy call →
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: HOW IT WORKS */}
      <section className="section section-panel section-line">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <div className="section-intro">
              <span className="label">Process</span>
              <h2 className="h2">
                How It Works
              </h2>
              <p className="body">
                Simple process. Fast delivery. No surprises.
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 max-w-4xl mx-auto">
              {howItWorks.map((step, i) => (
                <div key={i} className="card flex-1">
                  <div className="text-center relative">
                    <div className="text-7xl md:text-8xl font-bold text-white/5 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                      {step.number}
                    </div>

                    <div className="relative pt-16">
                      <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center font-bold text-lg border-2 ${
                        step.color === 'orange'
                          ? 'bg-[color:var(--orange-dim)] border-[color:var(--orange-border)] text-[color:var(--text-high)]'
                          : step.color === 'white'
                            ? 'bg-[color:var(--surface)] border-[color:var(--border)] text-[color:var(--text-high)]'
                            : 'bg-[color:var(--purple-dim)] border-[color:var(--purple-border)] text-[color:var(--text-high)]'
                      }`}>
                        {step.number}
                      </div>

                      <h3 className="h3 mb-2">{step.title}</h3>
                      <p className="body mb-3">{step.description}</p>
                      <span className="inline-block px-3 py-1 text-xs rounded-full bg-[color:var(--surface)] text-[color:var(--text-mid)] border border-[color:var(--border)]">
                        {step.badge}
                      </span>
                    </div>

                    {i < howItWorks.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 text-white/20">
                        →
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: TESTIMONIALS */}
      <section className="section section-line-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            <div className="section-intro">
              <span className="label">Testimonials</span>
              <h2 className="h2">
                What Our Clients Say
              </h2>
              <p className="body">
                Real businesses. Real results.
              </p>
            </div>

            <motion.div className="grid-3 max-w-5xl mx-auto" variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
              {/* Testimonial 1 */}
              <motion.div variants={cardItem} className="card card-bar-white card-interactive">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-[color:var(--purple)] rounded-full opacity-70" />
                  ))}
                </div>
                <p className="body mb-6 italic">
                  "Before Streamline, we were managing orders manually across three different apps. Now everything runs through one system — inventory updates automatically and customers get instant confirmation. It changed how we operate."
                </p>
                <div>
                  <p className="text-white font-medium">BLOM Cosmetics</p>
                  <p className="body-sm text-xs">E-commerce + Automation Client</p>
                </div>
              </motion.div>

              {/* Testimonial 2 */}
              <motion.div variants={cardItem} className="card card-bar-white card-interactive">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-[color:var(--purple)] rounded-full opacity-70" />
                  ))}
                </div>
                <p className="body mb-6 italic">
                  "The quote engine alone saved us hours every week. Customers build their own order, the chatbot qualifies them, and we get a clean brief — ready to action. Zero back and forth."
                </p>
                <div>
                  <p className="text-white font-medium">RecklessBear Apparel</p>
                  <p className="body-sm text-xs">Web Design + AI Agent Client</p>
                </div>
              </motion.div>

              {/* Testimonial 3 */}
              <motion.div variants={cardItem} className="card card-bar-white card-interactive">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-[color:var(--purple)] rounded-full opacity-70" />
                  ))}
                </div>
                <p className="body mb-6 italic">
                  "We went from missing enquiries to having every lead captured, confirmed, and followed up automatically. I don't touch it. It just works."
                </p>
                <div>
                  <p className="text-white font-medium">Service Business Client</p>
                  <p className="body-sm text-xs">Client Magnet Package</p>
                </div>
              </motion.div>
            </motion.div>

            <p className="text-center text-white/30 text-xs mt-8">
              * Testimonials reflect client outcomes. Real names published with permission.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 8: FINAL CTA */}
      <section className="section section-panel section-line">
        <div className="container">
          <FinalCTA />
        </div>
      </section>
    </div>
  );
};

export default Home;
