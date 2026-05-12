import React, { useState } from 'react';
import { ShoppingCart, GraduationCap, Zap, Mail, FileText, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/seo/SEO';
import FinalCTA from '../../components/white/home/FinalCTA';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const METRICS = [
  { value: 'Real-time', sub: 'Stock sync across all channels' },
  { value: 'R0', sub: 'Monthly platform fees' },
  { value: '20hrs+', sub: 'Saved per month on manual work' },
];

const TECH_TAGS = [
  { Icon: ShoppingCart, label: 'E-commerce Store' },
  { Icon: MessageSquare, label: 'WhatsApp Integration' },
  { Icon: GraduationCap, label: 'BLOM Academy' },
  { Icon: Zap, label: 'Custom Admin' },
];

const ADMIN_TABS = ['Product Control', 'Inventory Intelligence'];

export default function BlomCosmeticsPage() {
  const [activeTab, setActiveTab] = useState('Product Control');

  return (
    <>
      <Navbar />
      <SEO
        title="BLOM Cosmetics — Case Study"
        description="Full-stack e-commerce with admin dashboard, CRM, WhatsApp automation, and BLOM Academy integration."
        image="https://res.cloudinary.com/dtkiwrm6u/image/upload/v1771692572/blom_hero-desktop_2_u99qeu.png"
      />
      <main className="bg-white min-h-screen font-['DM_Sans'] text-[#0A0A0F]">

        {/* ── HERO ── */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-[#9E9EA8] mb-5">
                Case Study
              </span>
              <h1 className="text-[42px] sm:text-[56px] md:text-[72px] font-semibold
                             tracking-[-0.03em] leading-[1.07] mb-5">
                BLOM Cosmetics
              </h1>
              <p className="text-[17px] md:text-[19px] text-[#6B6B7A] leading-[1.6]
                            max-w-2xl mx-auto mb-10">
                Full-stack beauty store with automated stock tracking, WhatsApp order updates,
                and a custom admin dashboard.
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
                {TECH_TAGS.map(({ Icon, label }) => (
                  <div key={label}
                    className="flex items-center gap-2 px-4 py-2 bg-[#F0EBFF]
                               border border-[#D4CAFF] rounded-full">
                    <Icon className="w-4 h-4 text-[#7B3FE4]" />
                    <span className="text-sm font-medium text-[#7B3FE4]">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
              className="rounded-2xl border border-[#E8E8EC] overflow-hidden bg-[#F5F5F7]"
            >
              <picture>
                <source media="(min-width: 768px)"
                  srcSet="https://res.cloudinary.com/dtkiwrm6u/image/upload/v1771692572/blom_hero-desktop_2_u99qeu.png" />
                <img
                  src="https://res.cloudinary.com/dtkiwrm6u/image/upload/v1771692574/blom_hero-mobile_1_lsp6zo.png"
                  alt="BLOM Cosmetics storefront"
                  className="w-full h-auto object-cover"
                />
              </picture>
            </motion.div>
          </div>
        </section>

        {/* ── METRICS ── */}
        <section className="bg-[#FAFAFA] border-y border-[#E8E8EC] py-14">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="grid grid-cols-3 gap-6 md:gap-12 text-center"
            >
              {METRICS.map((m) => (
                <div key={m.sub}>
                  <span className="block text-[32px] md:text-[48px] font-semibold
                                   tracking-[-0.025em] leading-none text-[#0A0A0F]">
                    {m.value}
                  </span>
                  <span className="block mt-2 text-[13px] text-[#6B6B7A] leading-snug">
                    {m.sub}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── BEFORE / AFTER ── */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="grid md:grid-cols-2 gap-8"
            >
              <div className="bg-red-50 border border-red-200 p-8 rounded-2xl">
                <h3 className="text-base font-semibold text-red-600 mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  Before Streamline
                </h3>
                <ul className="space-y-4">
                  {[
                    'Manual stock updates across spreadsheets',
                    'Overselling "out of stock" items',
                    'High monthly fees for Shopify plugins',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-[14.5px] text-[#6B6B7A]">
                      <span className="text-red-400 shrink-0">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl">
                <h3 className="text-base font-semibold text-emerald-700 mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  After Automation
                </h3>
                <ul className="space-y-4">
                  {[
                    'Real-time sync between store and warehouse',
                    'Automated low-stock alerts via WhatsApp',
                    'Zero platform fees (Custom Supabase Backend)',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-[14.5px] text-[#3D3D47]">
                      <span className="text-emerald-500 shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── MODULE 1: The Storefront ── */}
        <section className="py-20 md:py-28 border-t border-[#E8E8EC]">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <span className="block text-[11px] font-medium uppercase tracking-[0.14em]
                                 text-[#9E9EA8] mb-4">
                  Module 01
                </span>
                <h2 className="text-[28px] md:text-[38px] font-semibold tracking-[-0.02em]
                               leading-[1.15] text-[#0A0A0F] mb-6">
                  The Customer Experience
                </h2>
                <p className="text-[15.5px] text-[#3D3D47] leading-[1.75] mb-5">
                  A seamless shopping experience built on React and Vite. Lightning-fast product
                  browsing, instant cart updates, and a checkout flow optimised for mobile.
                </p>
                <p className="text-[15.5px] text-[#3D3D47] leading-[1.75] mb-8">
                  Real-time inventory syncing ensures customers never see "out of stock" surprises
                  at checkout.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {['Sub-1s Load Time', 'Mobile Optimised', 'Real-time Cart'].map((pill) => (
                    <span key={pill}
                      className="px-4 py-2 bg-[#F0EBFF] border border-[#D4CAFF]
                                 rounded-full text-sm font-medium text-[#7B3FE4]">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center">
                <img
                  src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772366335/M003T1514_C_long_scroll_Macbook_Mockup_08Agu25_gkqqad.png"
                  alt="BLOM storefront MacBook mockup"
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── MODULE 2: Admin OS (Tabs) ── */}
        <section className="py-20 md:py-28 bg-[#FAFAFA] border-y border-[#E8E8EC]">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-center mb-12"
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.14em]
                               text-[#9E9EA8] mb-4">
                Module 02
              </span>
              <h2 className="text-[28px] md:text-[38px] font-semibold tracking-[-0.02em]
                             leading-[1.15] text-[#0A0A0F] mb-3">
                The Admin OS
              </h2>
              <p className="text-[16px] text-[#6B6B7A] max-w-md mx-auto">
                A custom-built command centre for total business control.
              </p>
            </motion.div>

            {/* Tab switcher */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex bg-[#F0F0F4] rounded-full p-1">
                {ADMIN_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 rounded-full text-[13.5px] font-medium
                                transition-all duration-200
                                ${activeTab === tab
                                  ? 'bg-white text-[#0A0A0F] shadow-sm'
                                  : 'text-[#6B6B7A] hover:text-[#0A0A0F]'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="bg-white border border-[#E8E8EC] rounded-2xl p-8 md:p-12"
            >
              {activeTab === 'Product Control' ? (
                <div className="grid md:grid-cols-2 gap-10 items-center">
                  <div>
                    <h3 className="text-[22px] md:text-[26px] font-semibold tracking-[-0.015em]
                                   text-[#0A0A0F] mb-5">
                      Zero-Friction Product Management
                    </h3>
                    <p className="text-[15px] text-[#3D3D47] leading-[1.75] mb-4">
                      Edit prices, descriptions, and images in real-time. No fighting with generic
                      CMS dashboards.
                    </p>
                    <p className="text-[15px] text-[#3D3D47] leading-[1.75] mb-6">
                      Bulk operations let you update entire categories in seconds. Changes go live
                      instantly.
                    </p>
                    <ul className="space-y-3">
                      {['Live product editing', 'Image upload & optimisation', 'Category management', 'Bulk price updates'].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-[14.5px] text-[#3D3D47]">
                          <div className="w-1.5 h-1.5 bg-[#7B3FE4] rounded-full shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative aspect-[4/3] bg-[#F5F5F7] border border-[#E8E8EC]
                                  rounded-2xl overflow-hidden group
                                  hover:border-[#C4AAFF] transition-all duration-300">
                    <img
                      src="https://res.cloudinary.com/dtkiwrm6u/image/upload/v1771685600/2_g2i54c.png"
                      alt="Product editor"
                      className="absolute inset-0 w-full h-full object-contain
                                 transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-10 items-center">
                  <div>
                    <h3 className="text-[22px] md:text-[26px] font-semibold tracking-[-0.015em]
                                   text-[#0A0A0F] mb-5">
                      Real-Time Business Intelligence
                    </h3>
                    <p className="text-[15px] text-[#3D3D47] leading-[1.75] mb-4">
                      Live dashboards showing sales velocity, top products, and low-stock alerts.
                    </p>
                    <p className="text-[15px] text-[#3D3D47] leading-[1.75] mb-6">
                      Automated alerts ensure you never run out of bestsellers.
                    </p>
                    <ul className="space-y-3">
                      {['Sales analytics', 'Stock level monitoring', 'Low-stock alerts', 'CSV/PDF exports'].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-[14.5px] text-[#3D3D47]">
                          <div className="w-1.5 h-1.5 bg-[#7B3FE4] rounded-full shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative aspect-[4/3] bg-[#F5F5F7] border border-[#E8E8EC]
                                  rounded-2xl overflow-hidden group
                                  hover:border-[#C4AAFF] transition-all duration-300">
                    <img
                      src="https://res.cloudinary.com/dtkiwrm6u/image/upload/v1771685600/3_qdkh3g.png"
                      alt="Analytics dashboard"
                      className="absolute inset-0 w-full h-full object-contain
                                 transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* ── MODULE 3: BLOM Academy ── */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="flex items-center justify-center order-2 md:order-1">
                <img
                  src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772518479/3_phone-blom-academy_chau8b.png"
                  alt="BLOM Academy mobile"
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-5">
                  <GraduationCap className="w-7 h-7 text-[#7B3FE4]" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#9E9EA8]">
                    Module 03
                  </span>
                </div>
                <h2 className="text-[28px] md:text-[38px] font-semibold tracking-[-0.02em]
                               leading-[1.15] text-[#0A0A0F] mb-6">
                  The Academy Portal
                </h2>
                <p className="text-[15.5px] text-[#3D3D47] leading-[1.75] mb-5">
                  A full-featured course booking system built into the main platform. Customers
                  can browse makeup courses, check availability, and book sessions — all in one
                  place.
                </p>
                <p className="text-[15.5px] text-[#3D3D47] leading-[1.75] mb-8">
                  The admin dashboard includes a dedicated academy management section for
                  scheduling, student tracking, and course material uploads.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {['Calendar Integration', 'Student Management', 'Auto Reminders'].map((pill) => (
                    <span key={pill}
                      className="px-4 py-2 bg-[#F0EBFF] border border-[#D4CAFF]
                                 rounded-full text-sm font-medium text-[#7B3FE4]">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── MODULE 4: Automation Layer (Bento) ── */}
        <section className="py-20 md:py-28 bg-[#FAFAFA] border-y border-[#E8E8EC]">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-center mb-12"
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.14em]
                               text-[#9E9EA8] mb-4">
                Module 04
              </span>
              <h2 className="text-[28px] md:text-[38px] font-semibold tracking-[-0.02em]
                             leading-[1.15] text-[#0A0A0F] mb-3">
                Invisible Automation
              </h2>
              <p className="text-[16px] text-[#6B6B7A] max-w-md mx-auto">
                Systems that work silently in the background.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Auto-invoicing */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: EASE }}
                className="bg-white border border-[#E8E8EC] rounded-2xl p-7
                           hover:border-[#D4D4DA] hover:shadow-[0_4px_28px_rgba(0,0,0,0.06)]
                           transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-[#F0EBFF] rounded-xl">
                    <FileText className="w-5 h-5 text-[#7B3FE4]" />
                  </div>
                  <h3 className="text-[16px] font-semibold text-[#0A0A0F]">Auto-Invoicing</h3>
                </div>
                <p className="text-[14px] text-[#6B6B7A] leading-[1.65] mb-6">
                  Every order generates a branded PDF invoice automatically. Sent via email and
                  stored in the admin portal.
                </p>
                <div className="aspect-[4/3] bg-[#F5F5F7] border border-[#E8E8EC] rounded-xl overflow-hidden group">
                  <img
                    src="https://res.cloudinary.com/dtkiwrm6u/image/upload/v1771685602/7_xqpqys.png"
                    alt="PDF invoice"
                    className="w-full h-full object-contain transition-transform
                               duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              </motion.div>

              {/* Branded Comms — hover swap */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.06 }}
                className="bg-white border border-[#E8E8EC] rounded-2xl p-7
                           hover:border-[#D4D4DA] hover:shadow-[0_4px_28px_rgba(0,0,0,0.06)]
                           transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-[#F0EBFF] rounded-xl">
                    <Mail className="w-5 h-5 text-[#7B3FE4]" />
                  </div>
                  <h3 className="text-[16px] font-semibold text-[#0A0A0F]">Branded Comms</h3>
                </div>
                <p className="text-[14px] text-[#6B6B7A] leading-[1.65] mb-6">
                  Order confirmations, shipping updates, and Academy reminders — all sent
                  automatically with custom BLOM branding.
                </p>
                <div className="aspect-[4/3] bg-[#F5F5F7] border border-[#E8E8EC] rounded-xl overflow-hidden relative group">
                  <img
                    src="https://res.cloudinary.com/dtkiwrm6u/image/upload/v1771685601/6_bqrtys.png"
                    alt="Email screenshot"
                    className="absolute inset-0 w-full h-full object-contain transition-opacity
                               duration-300 group-hover:opacity-0"
                  />
                  <img
                    src="https://res.cloudinary.com/dtkiwrm6u/image/upload/v1771685603/6-back_kfy7zd.png"
                    alt="Email screenshot reverse"
                    className="absolute inset-0 w-full h-full object-contain transition-opacity
                               duration-300 opacity-0 group-hover:opacity-100"
                  />
                </div>
              </motion.div>

              {/* WhatsApp updates */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.12 }}
                className="bg-white border border-[#E8E8EC] rounded-2xl p-7
                           hover:border-[#D4D4DA] hover:shadow-[0_4px_28px_rgba(0,0,0,0.06)]
                           transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-[#F0EBFF] rounded-xl">
                    <MessageSquare className="w-5 h-5 text-[#7B3FE4]" />
                  </div>
                  <h3 className="text-[16px] font-semibold text-[#0A0A0F]">Instant Updates</h3>
                </div>
                <p className="text-[14px] text-[#6B6B7A] leading-[1.65] mb-6">
                  WhatsApp Business API sends real-time order updates. Customers get instant
                  confirmation and tracking info.
                </p>
                <div className="space-y-3 mt-2">
                  {['Order Placed', 'Payment Confirmed', 'Shipped', 'Delivered'].map((step) => (
                    <div key={step} className="flex items-center gap-2.5">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
                      <span className="text-[13.5px] text-[#6B6B7A]">{step}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
