import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import LogoMarquee from '../components/ui/LogoMarquee';
import FeaturedProject from '../components/ui/FeaturedProject';
import Testimonials from '../components/home/Testimonials';
import FinalCTA from '../components/home/FinalCTA';
import CircuitLine from '../components/ui/CircuitLine';
import SectionHeading from '../components/ui/SectionHeading';
import { Button, Card, Badge, SectionLabel, IconBox, Divider } from '../components/ui';
import {
  Zap,
  Layers,
  ShieldCheck,
  ArrowRight,
  Check,
} from 'lucide-react';
import { fadeUp, stagger, cardItem, viewport } from '../lib/motion';

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
      {/* Atmospheric Orbs - keeping for now but may need to remove later */}
      <div className="absolute top-[60%] right-[-10%] w-[500px] h-[500px] bg-brand-orange/10 blur-[100px] rounded-full animate-blob pointer-events-none" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-brand-purple/10 blur-[120px] rounded-full animate-blob pointer-events-none" style={{ animationDelay: '4s' }}></div>

      {/* HERO */}
      <section className="s">
        <Hero />
      </section>

      {/* SECTION 2: WHY STREAMLINE - s-panel s-line-purple */}
      <section className="s s-panel s-line-purple">
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
              <p className="body-text">
                We don't sell websites. We build systems that work for you.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
              {/* Card 1 - Orange */}
              <motion.div variants={cardItem} className="card card-bar card-bar-orange card-h-orange">
                <div className="p-6 md:p-8">
                  <div className="icon-box icon-box-orange">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="h3 mt-4 mb-3">Built for Speed</h3>
                  <p className="body-text">
                    From strategy call to live site in under 7 days. No back-and-forth delays, no bloated timelines.
                  </p>
                </div>
              </motion.div>

              {/* Card 2 - Purple */}
              <motion.div variants={cardItem} className="card card-bar card-bar-purple card-h-purple">
                <div className="p-6 md:p-8">
                  <div className="icon-box icon-box-purple">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="h3 mt-4 mb-3">Systems, Not Just Sites</h3>
                  <p className="body-text">
                    Every build includes the automations, forms, and flows that actually run your business day-to-day.
                  </p>
                </div>
              </motion.div>

              {/* Card 3 - White */}
              <motion.div variants={cardItem} className="card card-bar card-bar-white card-h">
                <div className="p-6 md:p-8">
                  <div className="icon-box" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="h3 mt-4 mb-3">You Own Everything</h3>
                  <p className="body-text">
                    No lock-in. No proprietary platforms. Full ownership of your site, data, and automations from day one.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* SECTION 3: FEATURED BUILDS - s-line-white */}
      <section className="s s-line-white">
        <div className="absolute -right-40 top-1/3 w-[800px] h-[800px] bg-gradient-to-l from-brand-purple/20 to-brand-orange/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container">
          <div className="section-intro">
            <span className="label">Featured Work</span>
            <h2 className="h2">
              Featured Builds
            </h2>
            <p className="body-text">
              Real systems. Real businesses. Real results.
            </p>
          </div>

          <div className="space-y-8 md:space-y-12 max-w-7xl mx-auto">
            <FeaturedProject
              title="E-commerce Command Center"
              subtitle="End-to-end digital retail system. Features custom inventory synchronization, automated stock alerts, and a unified CRM for managing reviews and orders."
              tags={['Full-Stack Retail', 'Inventory Automation', 'Admin Dashboard']}
              imageSrc="https://res.cloudinary.com/dnlgohkcc/image/upload/v1765468469/Untitled_design_50_p3ibsc.png"
              color="brand-purple"
              align="left"
              linkTo="/portfolio/blom-cosmetics"
            />

            <FeaturedProject
              title="Custom Website & Quote Engine"
              subtitle="A modern, customer-facing website integrated with AI production infrastructure. Features product customization, automated quoting, and real-time job tracking."
              tags={['Web Design', 'AI Booking Agent', 'Production Workflow']}
              imageSrc="https://res.cloudinary.com/dnlgohkcc/image/upload/v1765468470/Unititled_design_51_zuhyoc.png"
              color="brand-orange"
              align="right"
              linkTo="/portfolio/recklessbear-apparel"
              objectFit="contain"
              containerHeight="h-[600px] md:h-[750px]"
            />
          </div>

          <div className="text-center mt-12">
            <Link to="/portfolio" className="btn btn-secondary">
              View All Work <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Divider />

      {/* SECTION 4: TECH STACK MARQUEE - s-panel s-line-white */}
      <section className="s s-panel s-line-white">
        <div className="pt-8 md:pt-12 text-center">
          <p className="text-sm md:text-base font-bold text-white/30 uppercase tracking-[0.2em]">
            POWERED BY
          </p>
        </div>
        <LogoMarquee />
        <div className="py-8 md:py-12">
          <CircuitLine variant="fast" />
        </div>
      </section>

      {/* SECTION 5: PACKAGE PREVIEW - s-line-orange */}
      <section className="s s-line-orange">
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
              <p className="body-text">
                Every package is a complete business system. Pick the one that fits where you are right now.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
              {packages.map((pkg, i) => (
                <motion.div 
                  key={i} 
                  variants={cardItem}
                  className={`card card-bar ${pkg.accent === 'orange' ? 'card-bar-orange' : pkg.accent === 'purple' ? 'card-bar-purple' : 'card-bar-white'} ${pkg.accent === 'orange' ? 'card-h-orange' : pkg.accent === 'purple' ? 'card-h-purple' : 'card-h'} ${pkg.popular ? 'card-featured' : ''}`}
                >
                  <div className="p-6 md:p-8">
                    {pkg.popular && (
                      <div className="absolute -top-3 right-4">
                        <Badge variant="orange">Most Popular</Badge>
                      </div>
                    )}

                    <div className={`w-2 h-8 mb-4 rounded-full ${
                      pkg.accent === 'orange' ? 'bg-brand-orange' : 
                      pkg.accent === 'purple' ? 'bg-brand-purple' : 'bg-white'
                    }`}></div>

                    <h3 className="h3 mb-2">{pkg.name}</h3>
                    <p className="body-text mb-3">{pkg.outcome}</p>
                    <p className={`price mb-4 ${
                      pkg.accent === 'orange' ? 'text-orange' : 
                      pkg.accent === 'purple' ? 'text-purple' : ''
                    }`}>{pkg.price}</p>

                    <ul className="space-y-2 mb-6">
                      {pkg.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-start gap-2 body-text">
                          <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                            pkg.accent === 'orange' ? 'text-orange' : 
                            pkg.accent === 'purple' ? 'text-purple' : ''
                          }`} />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={pkg.link}
                      className={`btn ${pkg.accent === 'orange' || pkg.accent === 'purple' ? 'btn-purple' : 'btn-secondary'} btn-md w-full`}
                    >
                      Learn More
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <p className="body-text">
                Not sure which fits you?{' '}
                <Link to="/contact" className="text-white underline underline-offset-4 hover:text-brand-orange transition-colors">
                  Book a free strategy call →
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* SECTION 6: HOW IT WORKS - s-panel s-line-purple */}
      <section className="s s-panel s-line-purple">
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
              <p className="body-text">
                Simple process. Fast delivery. No surprises.
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 max-w-4xl mx-auto">
              {howItWorks.map((step, i) => (
                <div key={i} className="card flex-1">
                  <div className="p-6 md:p-8 text-center relative">
                    {/* Step Number */}
                    <div className="text-7xl md:text-8xl font-bold text-white/5 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                      {step.number}
                    </div>
                    
                    <div className="relative pt-16">
                      <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center font-bold text-lg border-2 ${
                        step.color === 'orange' ? 'bg-brand-orange/10 border-brand-orange text-brand-orange' :
                        step.color === 'purple' ? 'bg-brand-purple/10 border-brand-purple text-brand-purple' :
                        'bg-white/10 border-white text-white'
                      }`}>
                        {step.number}
                      </div>
                      
                      <h3 className="h3 mb-2">{step.title}</h3>
                      <p className="body-text mb-3">{step.description}</p>
                      <span className={`inline-block px-3 py-1 text-xs rounded-full ${
                        step.color === 'orange' ? 'bg-brand-orange/10 text-brand-orange' :
                        step.color === 'purple' ? 'bg-brand-purple/10 text-brand-purple' :
                        'bg-white/10 text-white'
                      }`}>
                        {step.badge}
                      </span>
                    </div>

                    {/* Arrow connector (desktop only) */}
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

      <Divider />

      {/* SECTION 7: TESTIMONIALS - s-line-white */}
      <section className="s s-line-white">
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
              <p className="body-text">
                Real businesses. Real results.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
              {/* Testimonial 1 */}
              <motion.div variants={cardItem} className="card card-h">
                <div className="p-6 md:p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-brand-orange rounded-full" />
                    ))}
                  </div>
                  <p className="body-text mb-6 italic">
                    "Before Streamline, we were managing orders manually across three different apps. Now everything runs through one system — inventory updates automatically and customers get instant confirmation. It changed how we operate."
                  </p>
                  <div>
                    <p className="text-white font-medium">BLOM Cosmetics</p>
                    <p className="body-text text-xs">E-commerce + Automation Client</p>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 2 */}
              <motion.div variants={cardItem} className="card card-h">
                <div className="p-6 md:p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-brand-orange rounded-full" />
                    ))}
                  </div>
                  <p className="body-text mb-6 italic">
                    "The quote engine alone saved us hours every week. Customers build their own order, the chatbot qualifies them, and we get a clean brief — ready to action. Zero back and forth."
                  </p>
                  <div>
                    <p className="text-white font-medium">RecklessBear Apparel</p>
                    <p className="body-text text-xs">Web Design + AI Agent Client</p>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 3 */}
              <motion.div variants={cardItem} className="card card-h">
                <div className="p-6 md:p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-brand-orange rounded-full" />
                    ))}
                  </div>
                  <p className="body-text mb-6 italic">
                    "We went from missing enquiries to having every lead captured, confirmed, and followed up automatically. I don't touch it. It just works."
                  </p>
                  <div>
                    <p className="text-white font-medium">Service Business Client</p>
                    <p className="body-text text-xs">Client Magnet Package</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <p className="text-center text-white/30 text-xs mt-8">
              * Testimonials reflect client outcomes. Real names published with permission.
            </p>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* SECTION 8: FINAL CTA - s-panel s-line-orange */}
      <section className="s s-panel s-line-orange">
        <FinalCTA />
      </section>
    </div>
  );
};

export default Home;
