import React from 'react';
import { Layout, MessageSquare, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import WhiteNavbar from '../../components/white/Navbar';
import WhiteFooter from '../../components/white/Footer';
import SEO from '../../components/seo/SEO';
import FinalCTA from '../../components/white/home/FinalCTA';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const METRICS = [
  { value: '< 0.5s', sub: 'Load time — Global CDN' },
  { value: '100%', sub: 'Google Lighthouse mobile score' },
  { value: '+45%', sub: 'More enquiries vs old site' },
];

const TECH_TAGS = [
  { Icon: Layout, label: 'Portfolio Site' },
  { Icon: MessageSquare, label: 'Contact Form Integration' },
  { Icon: Zap, label: 'Built in 3 days' },
];

export default function AmeliVanZylPage() {
  return (
    <>
      <WhiteNavbar />
      <SEO
        title="Ameli Designs — Case Study"
        description="High-performance portfolio site for a skin & brow studio with contact form, WhatsApp button, and automated lead notifications."
        image="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772172148/Ameli_Portfolio_Mockup_2_r2tj1w.png"
      />
      <main className="bg-white min-h-screen font-['DM_Sans'] text-[#0A0A0F]">

        {/* ── HERO ── */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.14em]
                               text-[#9E9EA8] mb-5">
                Case Study
              </span>
              <h1 className="text-[42px] sm:text-[56px] md:text-[72px] font-semibold
                             tracking-[-0.03em] leading-[1.07] mb-5">
                Ameli Designs
              </h1>
              <p className="text-[17px] md:text-[19px] text-[#6B6B7A] leading-[1.6]
                            max-w-2xl mx-auto mb-10">
                A personal, high-quality portfolio for a skin &amp; brow studio. Professional,
                polished, and built to convert — delivered in 3 days.
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
                  <span className="block text-[28px] md:text-[44px] font-semibold
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
                    'Slow-loading PDF portfolio — lost mobile traffic',
                    'Manual email back-and-forth for enquiries',
                    'No visibility on who viewed the work',
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
                    'Instant load times (Global CDN)',
                    'Instant WhatsApp notification for every lead',
                    'Professional, mobile-optimised experience',
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

        {/* ── Full-width mockup ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="w-full border-t border-[#E8E8EC]"
        >
          <img
            src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772172148/Ameli_Portfolio_Mockup_2_r2tj1w.png"
            alt="Ameli portfolio homepage mockup"
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* ── Long scroll full-width ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="w-full"
        >
          <img
            src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772170847/ameli_long_scroll_fnptut.png"
            alt="Ameli portfolio full page scroll"
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* ── Section A: Curated to Convert ── */}
        <section className="py-20 md:py-28 border-t border-[#E8E8EC] bg-white">
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
                  Design approach
                </span>
                <h2 className="text-[28px] md:text-[38px] font-semibold tracking-[-0.02em]
                               leading-[1.15] text-[#0A0A0F] mb-8">
                  Curated to Convert
                </h2>

                <div className="space-y-6">
                  {[
                    {
                      title: 'Custom Colour Synthesis',
                      body: 'The palette was designed around her art style — enhancing artwork visibility without competing with it.',
                    },
                    {
                      title: 'Rapid Iteration',
                      body: 'Final build delivered in under 5 days from brief to live.',
                    },
                    {
                      title: 'Mobile-First',
                      body: 'Optimised viewing experience across every screen size — phones, tablets, and desktop.',
                    },
                  ].map(({ title, body }) => (
                    <div key={title} className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 bg-[#7B3FE4] rounded-full mt-2.5 shrink-0" />
                      <div>
                        <h3 className="text-[15px] font-semibold text-[#0A0A0F] mb-1">{title}</h3>
                        <p className="text-[14.5px] text-[#6B6B7A] leading-[1.65]">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center">
                <img
                  src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772172127/3_phone_u7sdxg.png"
                  alt="Ameli portfolio mobile view"
                  className="w-full h-auto object-contain hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Section B: Never Miss an Enquiry ── */}
        <section className="py-20 md:py-28 bg-[#FAFAFA] border-y border-[#E8E8EC]">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              {/* Image */}
              <div className="order-2 md:order-1">
                <div className="rounded-2xl border border-[#E8E8EC] overflow-hidden
                                group cursor-pointer">
                  <img
                    src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772136965/msedge_s6W5xpIiBL_c4jjuf.png"
                    alt="Ameli contact form"
                    className="w-full h-auto object-cover transition-transform
                               duration-[1.2s] ease-in-out group-hover:scale-[1.05]"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="order-1 md:order-2">
                <span className="block text-[11px] font-medium uppercase tracking-[0.14em]
                                 text-[#9E9EA8] mb-4">
                  Lead automation
                </span>
                <h2 className="text-[28px] md:text-[38px] font-semibold tracking-[-0.02em]
                               leading-[1.15] text-[#0A0A0F] mb-6">
                  Never Miss an Enquiry
                </h2>
                <p className="text-[15.5px] text-[#3D3D47] leading-[1.75] mb-5">
                  When someone fills in the contact form, two things happen automatically — she
                  gets a WhatsApp message and an email. Instantly. No checking inboxes. No missed
                  commissions.
                </p>
                <p className="text-[15.5px] text-[#3D3D47] leading-[1.75] mb-8">
                  We connected the form to n8n, which routes every submission to her WhatsApp and
                  email at the same time. She knows the moment someone's interested.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {['WhatsApp Notification', 'Email Alert', 'n8n Automation', 'Zero Manual Follow-up'].map((pill) => (
                    <span key={pill}
                      className="px-4 py-2 bg-white border border-[#E8E8EC] rounded-full
                                 text-[13px] font-medium text-[#6B6B7A]
                                 hover:border-[#C4AAFF] hover:text-[#7B3FE4]
                                 transition-colors duration-200">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <WhiteFooter />
    </>
  );
}
