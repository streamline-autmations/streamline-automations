import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/seo/SEO';
import SectionHeader from '../components/white/ui/SectionHeader';
import PortfolioCard from '../components/white/ui/PortfolioCard';
import { portfolioProjects } from '../data/portfolio';
import FinalCTA from '../components/white/home/FinalCTA';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const OTHER_CLIENTS = [
  { name: 'JJ Glasswork', description: 'Service website + automated email lead notifications' },
  { name: 'NSA Mining', description: 'Internal gift issuing system, eligibility lookup + management reporting' },
  { name: 'Tuscany SA', description: 'Email hosting, domain management, logo + IT support' },
  { name: 'African Nomad', description: 'Logo, sublimation artwork + social media content' },
];

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <SEO
        title="Portfolio — Streamline Automations"
        description="Real SA businesses. Real results. Custom websites, automation systems, and dashboards built for growth."
      />
      <main className="bg-white min-h-screen font-['DM_Sans']">

        {/* Page hero */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="max-w-5xl mx-auto px-6">
            <SectionHeader
              eyebrow="Selected work"
              headline="The work speaks."
              subtext="Real SA businesses. Real results. No stock photos."
            />
          </div>
        </section>

        {/* Case study cards */}
        <section className="pb-16 md:pb-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolioProjects.map((project) => (
                <PortfolioCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  category={project.category}
                  tech={project.tags}
                  imageSrc={project.image}
                  href={`/portfolio/${project.id}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px bg-[#E8E8EC]" />
        </div>

        {/* Other clients — no case study yet */}
        <section className="py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.14em]
                               text-[#9E9EA8] mb-8">
                Also worked with
              </span>

              <div className="space-y-0">
                {OTHER_CLIENTS.map((client, i) => (
                  <motion.div
                    key={client.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
                    className={`flex flex-col sm:flex-row sm:items-center sm:justify-between
                                gap-1 sm:gap-8 py-5
                                ${i < OTHER_CLIENTS.length - 1 ? 'border-b border-[#F0F0F4]' : ''}`}
                  >
                    <span className="text-[16px] font-semibold text-[#0A0A0F] tracking-[-0.01em]">
                      {client.name}
                    </span>
                    <span className="text-[14px] text-[#6B6B7A] sm:text-right sm:max-w-sm leading-snug">
                      {client.description}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
