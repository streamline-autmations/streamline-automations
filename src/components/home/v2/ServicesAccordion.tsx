/**
 * ServicesAccordion — Cuberto-style numbered services list.
 * Clean full-width rows with expand/collapse animation (Framer Motion).
 * One item open at a time.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const services = [
  {
    number: '01',
    name: 'WEBSITES & DIGITAL PRESENCE',
    description:
      'Fast, mobile-first websites that rank on Google and turn visitors into enquiries. From 5-page business sites to full e-commerce stores.',
    tags: ['5-Page Sites', 'E-commerce', 'Portfolio Sites', 'Domain + Email'],
    href: '/packages',
    accent: '#774CFC',
  },
  {
    number: '02',
    name: 'SYSTEMS & AUTOMATION',
    description:
      'CRMs, booking flows, WhatsApp pipelines, invoice automation and admin dashboards that replace hours of manual work every week.',
    tags: ['n8n Workflows', 'AI Chatbots', 'Admin Dashboards', 'Lead Pipelines'],
    href: '/packages',
    accent: '#F26A3D',
  },
  {
    number: '03',
    name: 'HOSTING & INFRASTRUCTURE',
    description:
      'Domain registration, professional email, SSL, DNS management and monthly maintenance so your digital presence never sleeps.',
    tags: ['Domain Registration', 'DNS Management', 'SSL + Security', 'R250–R699/mo'],
    href: '/packages',
    accent: '#774CFC',
  },
];

export default function ServicesAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i));

  return (
    <section
      className="px-6 md:px-12 lg:px-16 py-24"
      style={{ background: '#050505' }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section label */}
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/25 mb-14">
          What we build
        </p>

        {/* Accordion list */}
        <div>
          {services.map((service, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={service.number} className="border-t border-white/8">
                {/* Row header — click to toggle */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center gap-6 py-6 md:py-8 text-left group"
                  aria-expanded={isOpen}
                >
                  {/* Number */}
                  <motion.span
                    animate={{ color: isOpen ? service.accent : 'rgba(255,255,255,0.2)' }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-[11px] tracking-widest w-8 flex-shrink-0"
                  >
                    {service.number}
                  </motion.span>

                  {/* Service name */}
                  <span
                    className="font-bebas text-white/90 group-hover:text-white transition-colors duration-200 flex-1"
                    style={{ fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.01em' }}
                  >
                    {service.name}
                  </span>

                  {/* Plus / Close icon */}
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="flex-shrink-0 text-white/30 group-hover:text-white/60 transition-colors text-2xl font-light leading-none select-none"
                  >
                    +
                  </motion.span>
                </button>

                {/* Expandable body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-14 pr-12 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <p className="text-white/50 text-sm leading-relaxed max-w-lg">
                          {service.description}
                        </p>
                        <div className="flex flex-col gap-4 md:items-end">
                          <div className="flex flex-wrap gap-2">
                            {service.tags.map(tag => (
                              <span
                                key={tag}
                                className="font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border border-white/10 text-white/35"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <Link
                            to={service.href}
                            className="font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-200"
                            style={{ color: service.accent }}
                          >
                            View Packages →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          {/* Bottom border */}
          <div className="border-t border-white/8" />
        </div>
      </div>
    </section>
  );
}
