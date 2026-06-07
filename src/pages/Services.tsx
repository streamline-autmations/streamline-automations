import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/seo/SEO';
import FinalCTA from '../components/white/home/FinalCTA';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SERVICES = [
  {
    number: '01',
    title: 'Web Design & Creation',
    headline: 'Sites that convert visitors into customers.',
    description:
      'Custom-coded from scratch. No page builders, no templates, no bloat. Each site is built around how your customers actually behave — and goes live in days, not months.',
    includes: [
      'Up to 5 fully responsive pages',
      'Contact forms + WhatsApp button',
      'Basic SEO + Google Maps embed',
      'Social media links',
      'Fast load times — optimised for mobile',
      'You own the code. Always.',
    ],
    clients: ['Ameli Designs', 'JJ Glasswork', 'African Nomad'],
    cta: '/packages',
  },
  {
    number: '02',
    title: 'Systems & Automation',
    headline: 'Stop doing it manually. Build the system once.',
    description:
      'CRMs, dashboards, booking flows, WhatsApp automation, AI chatbots — I connect your tools and automate the repetitive work so you can focus on what actually matters.',
    includes: [
      'Admin dashboards + CRM',
      'WhatsApp automation (order updates, follow-ups)',
      'Booking and appointment integrations',
      'AI chatbots for enquiries and lead capture',
      'Automated email and WhatsApp notifications',
      'n8n workflow automation',
    ],
    clients: ['RecklessBear Apparel', 'BLOM Cosmetics', 'NSA Mining', 'CW Electronics'],
    cta: '/packages',
  },
  {
    number: '03',
    title: 'Hosting & Maintenance',
    headline: 'Your foundation. Sorted.',
    description:
      'Domain registration, email hosting, SSL, and ongoing support. Month-to-month, no long contracts. Just a reliable person you can call when something breaks.',
    includes: [
      'Domain registration + management',
      'Professional email hosting',
      'SSL certificates + security',
      'Site speed monitoring',
      'Monthly backups',
      'Priority support for retainer clients',
    ],
    clients: ['Tuscany SA', 'All retainer clients'],
    cta: '/packages',
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <SEO
        title="Services — Streamline Automations"
        description="Web Design, Systems & Automation, and Hosting for SA businesses. Custom-built, fast, and actually works."
      />
      <main className="bg-white min-h-screen font-['DM_Sans']">

        {/* Page hero */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="max-w-5xl mx-auto px-6">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="block text-[11px] font-medium uppercase tracking-[0.14em] text-[#9E9EA8] mb-5"
            >
              What I build
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.06 }}
              className="text-[40px] sm:text-[52px] md:text-[64px] font-semibold
                         text-[#0A0A0F] tracking-[-0.03em] leading-[1.07] max-w-[18ch]"
            >
              Three ways I help SA businesses.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
              className="mt-6 text-[17px] text-[#6B6B7A] leading-[1.65] max-w-xl"
            >
              Whether you need a site, a system to stop doing things manually, or just
              hosting sorted — I build it, maintain it, and stay in your corner.
            </motion.p>
          </div>
        </section>

        {/* Top divider */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px bg-[#E8E8EC]" />
        </div>

        {/* Service sections */}
        <section>
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: EASE }}
              className="max-w-5xl mx-auto px-6"
            >
              <div
                className={`py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16
                            ${i < SERVICES.length - 1 ? 'border-b border-[#E8E8EC]' : ''}`}
              >
                {/* Left — number, title, description, clients */}
                <div className="flex flex-col gap-8">
                  <div>
                    <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#9E9EA8]">
                      {s.number}
                    </span>
                    <h2 className="mt-3 text-[26px] md:text-[32px] font-semibold
                                   text-[#0A0A0F] tracking-[-0.02em] leading-[1.15]">
                      {s.title}
                    </h2>
                    <p className="mt-4 text-[15px] text-[#6B6B7A] leading-[1.7]">
                      {s.description}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.12em]
                                  text-[#9E9EA8] mb-3">
                      Clients served
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {s.clients.map((c) => (
                        <span
                          key={c}
                          className="text-[12px] text-[#6B6B7A] border border-[#E8E8EC]
                                     px-3 py-1 rounded-full"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right — headline, includes, CTA */}
                <div className="flex flex-col gap-8">
                  <div>
                    <h3 className="text-[20px] md:text-[22px] font-semibold text-[#0A0A0F]
                                   tracking-[-0.015em] leading-[1.3] mb-7">
                      {s.headline}
                    </h3>
                    <ul className="space-y-3.5">
                      {s.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <div
                            className="w-5 h-5 rounded-full bg-[#F0EBFF] flex items-center
                                       justify-center mt-0.5 shrink-0"
                          >
                            <span className="text-[10px] text-[#7B3FE4]">✓</span>
                          </div>
                          <span className="text-[14.5px] text-[#3D3D47] leading-[1.65]">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={s.cta}
                    className="inline-flex items-center gap-1.5 text-[14px] font-medium
                               text-[#7B3FE4] hover:text-[#6930D0] transition-colors
                               duration-200 group w-fit"
                  >
                    See packages
                    <span
                      className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                                 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
