import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/seo/SEO';
import Button from '../components/white/ui/Button';
import FinalCTA from '../components/white/home/FinalCTA';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STATS = [
  { value: '8+', label: 'Clients served' },
  { value: '3', label: 'On retainer' },
  { value: '100%', label: 'Code ownership — always' },
];

const TECH = [
  'React', 'TypeScript', 'Vite', 'Tailwind CSS',
  'Framer Motion', 'Supabase', 'PostgreSQL', 'n8n',
  'WhatsApp Business API', 'Vercel',
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <SEO
        title="About — Streamline Automations"
        description="Christiaan Steffen — self-taught developer and builder of websites and automation systems for South African businesses. Based in Vaal Triangle, Gauteng."
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
              About
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.06 }}
              className="text-[40px] sm:text-[52px] md:text-[64px] font-semibold
                         text-[#0A0A0F] tracking-[-0.03em] leading-[1.07]"
            >
              Christiaan Steffen
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
              className="mt-4 text-[18px] md:text-[20px] text-[#6B6B7A] leading-[1.5]"
            >
              Bartender turned developer. Builder of websites and business systems for SA businesses.
            </motion.p>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px bg-[#E8E8EC]" />
        </div>

        {/* Stats */}
        <section className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="grid grid-cols-3 gap-6 md:gap-12"
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <span
                    className="block text-[32px] md:text-[44px] font-semibold
                               text-[#0A0A0F] tracking-[-0.02em] leading-none"
                  >
                    {s.value}
                  </span>
                  <span className="block mt-2 text-[13px] md:text-sm text-[#6B6B7A] leading-snug">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px bg-[#E8E8EC]" />
        </div>

        {/* Bio */}
        <section className="py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16">

              {/* Left — label */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-[#9E9EA8] mb-4">
                  Background
                </span>
                <p className="text-[22px] md:text-[26px] font-semibold text-[#0A0A0F]
                              tracking-[-0.015em] leading-[1.3]">
                  I started Streamline because I kept seeing the same problem.
                </p>
              </motion.div>

              {/* Right — paragraphs */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
                className="space-y-5 text-[15.5px] text-[#3D3D47] leading-[1.75]"
              >
                <p>
                  I'm a self-taught developer based in the Vaal Triangle, Gauteng. Before I
                  built websites, I was behind a bar. I taught myself to code because I wanted
                  to build things that actually work — not just look good in a browser.
                </p>
                <p>
                  Business owners were drowning in admin, losing leads because nobody responded
                  fast enough, and paying for websites that sat there doing nothing. I fix that.
                </p>
                <p>
                  I build, I maintain, and I stay on retainer for the clients who want someone
                  in their corner long-term. Every site and system I deliver is fully yours —
                  the code, the data, everything.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px bg-[#E8E8EC]" />
        </div>

        {/* Tech stack */}
        <section className="py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.14em]
                               text-[#9E9EA8] mb-6">
                What I build with
              </span>
              <div className="flex flex-wrap gap-2.5">
                {TECH.map((t) => (
                  <span
                    key={t}
                    className="px-4 py-2 rounded-full border border-[#E8E8EC]
                               text-[13.5px] text-[#0A0A0F] bg-white hover:border-[#D4D4DA]
                               hover:bg-[#FAFAFA] transition-colors duration-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-px bg-[#E8E8EC]" />
        </div>

        {/* Location + CTA */}
        <section className="py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8"
            >
              <div>
                <p className="text-[15px] text-[#6B6B7A]">
                  Based in the Vaal Triangle, Gauteng.
                </p>
                <p className="text-[15px] text-[#6B6B7A]">
                  Working with businesses all over SA and beyond.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button href="/contact" variant="primary" size="lg">
                  Work with me
                </Button>
                <Button href="/portfolio" variant="secondary" size="lg">
                  See the work
                </Button>
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
