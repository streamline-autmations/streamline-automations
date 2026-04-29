import React from 'react';
import { Layout, MessageSquare, Zap, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import WhiteNavbar from '../../components/white/Navbar';
import WhiteFooter from '../../components/white/Footer';
import SEO from '../../components/seo/SEO';
import AnimatedNumber from '../../components/white/ui/AnimatedNumber';
import AnimatedUnderline from '../../components/white/ui/AnimatedUnderline';
import Tilt from '../../components/white/ui/Tilt';
import MagneticCTA from '../../components/white/ui/MagneticCTA';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const TECH_TAGS = [
  { Icon: Layout, label: 'Portfolio Site' },
  { Icon: MessageSquare, label: 'Lead Automation' },
  { Icon: Zap, label: 'Built in 3 days' },
];

/**
 * Subtle dot-grid texture used in white sections to add quiet depth
 * without breaking the calm/expensive feel.
 */
function DotGrid({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, rgba(123,63,228,0.18) 1px, transparent 0)',
        backgroundSize: '28px 28px',
        maskImage:
          'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        WebkitMaskImage:
          'radial-gradient(ellipse at center, black 30%, transparent 75%)',
      }}
    />
  );
}

/**
 * Ambient purple bloom — used sparingly for depth on white sections.
 * Soft enough to read as light, not as a colored block.
 */
function PurpleBloom({
  className = '',
  size = 520,
  opacity = 0.18,
}: {
  className?: string;
  size?: number;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background:
          'radial-gradient(circle at center, rgba(123,63,228,1) 0%, rgba(123,63,228,0) 70%)',
        opacity,
        filter: 'blur(40px)',
      }}
    />
  );
}

/**
 * Browser-frame chrome that wraps mockup images. Adds a tiny dot row + a
 * URL pill so the screenshot reads as a real product, not just an image.
 */
function BrowserFrame({
  url,
  children,
  className = '',
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-[20px] border border-[#E8E8EC] bg-white
                  shadow-[0_30px_80px_-30px_rgba(76,29,149,0.22),0_8px_30px_-12px_rgba(15,15,30,0.08)]
                  overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#EFEFF3] bg-[#FAFAFB]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" aria-hidden="true" />
        <div className="ml-3 flex-1">
          <div className="mx-auto max-w-xs px-3 py-1 rounded-full bg-white border border-[#E8E8EC]
                          text-[11px] font-medium text-[#9E9EA8] text-center truncate">
            {url}
          </div>
        </div>
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );
}

export default function AmeliVanZylPage() {
  return (
    <>
      <WhiteNavbar />
      <SEO
        title="Ameli Designs — Case Study"
        description="High-performance portfolio site for a skin & brow studio with contact form, WhatsApp button, and automated lead notifications."
        image="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772172148/Ameli_Portfolio_Mockup_2_r2tj1w.png"
      />
      <main className="bg-white min-h-screen font-['DM_Sans'] text-[#0A0A0F] overflow-x-hidden">

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="relative pt-32 md:pt-40 pb-20 md:pb-24 overflow-hidden">
          {/* Ambient depth — very soft, just enough to lift it off pure white */}
          <PurpleBloom className="-top-40 -right-40" size={620} opacity={0.13} />
          <DotGrid className="opacity-[0.55]" />

          <div className="relative max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              {/* Eyebrow with branded rosé accent dot — only red moment on the page */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9F1239]" aria-hidden="true" />
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#9E9EA8]">
                  Case Study &middot; Ameli Designs
                </span>
              </div>

              <h1 className="text-[44px] sm:text-[60px] md:text-[78px] font-semibold
                             tracking-[-0.035em] leading-[1.04] text-[#0A0A0F] mb-2">
                A studio that{' '}
                <span className="font-['Instrument_Serif'] italic font-normal">
                  feels
                </span>{' '}
                like her work.
              </h1>

              {/* Hand-drawn underline accent — same primitive used on home */}
              <div className="flex justify-center mb-7">
                <AnimatedUnderline width={180} className="w-[180px] h-2" delay={0.5} />
              </div>

              <p className="text-[16px] md:text-[18px] text-[#6B6B7A] leading-[1.65]
                            max-w-xl mx-auto mb-10">
                A personal, high-quality portfolio for a skin &amp; brow studio.
                Polished, mobile-first, and built to convert &mdash; delivered in 3 days.
              </p>

              {/* Smaller, more refined pills */}
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {TECH_TAGS.map(({ Icon, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.25 + i * 0.06 }}
                    className="flex items-center gap-2 pl-3 pr-3.5 py-1.5
                               bg-white border border-[#EAE3FF] rounded-full
                               shadow-[0_1px_2px_rgba(15,15,30,0.04)]
                               hover:border-[#C4AAFF] hover:shadow-[0_4px_18px_rgba(123,63,228,0.12)]
                               transition-all duration-300"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#7B3FE4]" />
                    <span className="text-[12.5px] font-medium text-[#3D3D47]">{label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── METRICS BAND ──────────────────────────────────────────── */}
        <section className="relative bg-[#FAFAFB] border-y border-[#EFEFF3] py-16">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="grid grid-cols-3 gap-6 md:gap-12 text-center"
            >
              <div>
                <span className="block text-[30px] md:text-[46px] font-semibold
                                 tracking-[-0.025em] leading-none text-[#0A0A0F]">
                  &lt; 0.5s
                </span>
                <span className="block mt-2.5 text-[12.5px] text-[#6B6B7A] leading-snug">
                  Load time &mdash; Global CDN
                </span>
              </div>
              <div>
                <span className="block text-[30px] md:text-[46px] font-semibold
                                 tracking-[-0.025em] leading-none text-[#0A0A0F]">
                  <AnimatedNumber to={100} duration={1.6} />%
                </span>
                <span className="block mt-2.5 text-[12.5px] text-[#6B6B7A] leading-snug">
                  Google Lighthouse mobile score
                </span>
              </div>
              <div>
                <span className="block text-[30px] md:text-[46px] font-semibold
                                 tracking-[-0.025em] leading-none text-[#0A0A0F]">
                  +<AnimatedNumber to={45} duration={1.4} />%
                </span>
                <span className="block mt-2.5 text-[12.5px] text-[#6B6B7A] leading-snug">
                  More enquiries vs old site
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── HERO MOCKUP — constrained, framed, with tilt ──────────── */}
        <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
          <PurpleBloom className="top-1/2 -translate-y-1/2 -left-40" size={560} opacity={0.1} />

          <div className="relative max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <Tilt max={4} shine={0.14} className="rounded-[20px]">
                <BrowserFrame url="amelidesigns.co.za">
                  <img
                    src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772172148/Ameli_Portfolio_Mockup_2_r2tj1w.png"
                    alt="Ameli portfolio homepage"
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </BrowserFrame>
              </Tilt>
            </motion.div>
          </div>
        </section>

        {/* ── BEFORE / AFTER ────────────────────────────────────────── */}
        <section className="relative py-20 md:py-28 bg-[#FAFAFB] border-y border-[#EFEFF3]">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-center mb-12 md:mb-14"
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#9E9EA8] mb-3">
                The shift
              </span>
              <h2 className="text-[28px] md:text-[40px] font-semibold tracking-[-0.025em]
                             leading-[1.12] text-[#0A0A0F] max-w-xl mx-auto">
                From PDF portfolio to{' '}
                <span className="font-['Instrument_Serif'] italic font-normal">
                  always-on
                </span>{' '}
                lead engine.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
              className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            >
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="bg-[#FDF2F4] border border-[#F4D4DC] p-7 rounded-2xl"
              >
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em]
                               text-[#9F1239] mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9F1239] shrink-0" />
                  Before Streamline
                </h3>
                <ul className="space-y-3.5">
                  {[
                    'Slow-loading PDF portfolio &mdash; lost mobile traffic',
                    'Manual email back-and-forth for enquiries',
                    'No visibility on who viewed the work',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-[14px] text-[#6B6B7A] leading-[1.6]">
                      <span className="text-[#C4536C] shrink-0 mt-0.5" aria-hidden="true">&times;</span>
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="bg-[#F0FAF5] border border-[#CCE9D9] p-7 rounded-2xl"
              >
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em]
                               text-[#0A6B3F] mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0" />
                  After Automation
                </h3>
                <ul className="space-y-3.5">
                  {[
                    'Instant load times via Global CDN',
                    'Instant WhatsApp notification for every lead',
                    'Professional, mobile-optimised experience',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-[14px] text-[#3D3D47] leading-[1.6]">
                      <span className="text-[#10B981] shrink-0 mt-0.5" aria-hidden="true">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── CURATED TO CONVERT — text + 3 phones ──────────────────── */}
        <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
          <PurpleBloom className="top-20 -right-40" size={500} opacity={0.1} />

          <div className="relative max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              <div>
                <span className="block text-[11px] font-medium uppercase tracking-[0.18em]
                                 text-[#9E9EA8] mb-4">
                  Design approach
                </span>
                <h2 className="text-[28px] md:text-[40px] font-semibold tracking-[-0.025em]
                               leading-[1.12] text-[#0A0A0F] mb-3">
                  Curated to{' '}
                  <span className="font-['Instrument_Serif'] italic font-normal">
                    convert.
                  </span>
                </h2>
                <AnimatedUnderline width={120} className="w-[120px] h-2 mb-7" delay={0.2} />

                <div className="space-y-5">
                  {[
                    {
                      title: 'Custom colour synthesis',
                      body: 'The palette was designed around her art style &mdash; enhancing artwork visibility without competing with it.',
                    },
                    {
                      title: 'Rapid iteration',
                      body: 'Final build delivered in under 5 days from brief to live, including two rounds of polish.',
                    },
                    {
                      title: 'Mobile-first',
                      body: 'Optimised viewing across every screen size &mdash; phones, tablets, and desktop.',
                    },
                  ].map(({ title, body }, i) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.08 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[#7B3FE4]
                                      group-hover:scale-150 transition-transform duration-300" />
                      <div>
                        <h3 className="text-[15px] font-semibold text-[#0A0A0F] mb-1">{title}</h3>
                        <p
                          className="text-[14px] text-[#6B6B7A] leading-[1.65]"
                          dangerouslySetInnerHTML={{ __html: body }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Phones — constrained, hover lift */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: EASE }}
                className="flex items-center justify-center"
              >
                <Tilt max={5} shine={0.12} className="w-full max-w-md">
                  <img
                    src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772172127/3_phone_u7sdxg.png"
                    alt="Ameli portfolio mobile views"
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </Tilt>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── LONG SCROLL MOCKUP — constrained centered ─────────────── */}
        <section className="relative py-20 md:py-28 bg-[#FAFAFB] border-y border-[#EFEFF3] overflow-hidden">
          <DotGrid className="opacity-40" />

          <div className="relative max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-center mb-12"
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#9E9EA8] mb-3">
                The full experience
              </span>
              <h2 className="text-[26px] md:text-[36px] font-semibold tracking-[-0.025em]
                             leading-[1.15] text-[#0A0A0F] max-w-md mx-auto">
                Every section, considered.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: EASE }}
              className="max-w-3xl mx-auto"
            >
              <Tilt max={3} shine={0.1} className="rounded-2xl">
                <div className="rounded-2xl border border-[#E8E8EC] bg-white overflow-hidden
                                shadow-[0_30px_80px_-30px_rgba(76,29,149,0.18),0_8px_30px_-12px_rgba(15,15,30,0.06)]">
                  <img
                    src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772170847/ameli_long_scroll_fnptut.png"
                    alt="Ameli portfolio full page scroll"
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                </div>
              </Tilt>
            </motion.div>
          </div>
        </section>

        {/* ── NEVER MISS AN ENQUIRY ─────────────────────────────────── */}
        <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
          <PurpleBloom className="top-1/3 -left-40" size={520} opacity={0.1} />

          <div className="relative max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              {/* Form mockup — smaller, framed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: EASE }}
                className="order-2 md:order-1"
              >
                <Tilt max={4} shine={0.12} className="w-full max-w-lg mx-auto">
                  <BrowserFrame url="amelidesigns.co.za/contact">
                    <img
                      src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772136965/msedge_s6W5xpIiBL_c4jjuf.png"
                      alt="Ameli contact form"
                      className="w-full h-auto block"
                      loading="lazy"
                    />
                  </BrowserFrame>
                </Tilt>
              </motion.div>

              {/* Text */}
              <div className="order-1 md:order-2">
                <span className="block text-[11px] font-medium uppercase tracking-[0.18em]
                                 text-[#9E9EA8] mb-4">
                  Lead automation
                </span>
                <h2 className="text-[28px] md:text-[40px] font-semibold tracking-[-0.025em]
                               leading-[1.12] text-[#0A0A0F] mb-3">
                  Never miss an{' '}
                  <span className="font-['Instrument_Serif'] italic font-normal">
                    enquiry.
                  </span>
                </h2>
                <AnimatedUnderline width={130} className="w-[130px] h-2 mb-7" delay={0.2} />

                <p className="text-[15px] text-[#3D3D47] leading-[1.7] mb-4">
                  When someone fills in the contact form, two things happen automatically &mdash;
                  she gets a WhatsApp message and an email. Instantly. No checking inboxes.
                  No missed commissions.
                </p>
                <p className="text-[15px] text-[#3D3D47] leading-[1.7] mb-7">
                  We connected the form to n8n, which routes every submission to her WhatsApp
                  and email at the same time. She knows the moment someone&apos;s interested.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['WhatsApp Notification', 'Email Alert', 'n8n Automation', 'Zero Manual Follow-up'].map((pill) => (
                    <span
                      key={pill}
                      className="px-3.5 py-1.5 bg-white border border-[#E8E8EC] rounded-full
                                 text-[12.5px] font-medium text-[#6B6B7A]
                                 hover:border-[#C4AAFF] hover:text-[#7B3FE4]
                                 hover:shadow-[0_4px_14px_rgba(123,63,228,0.1)]
                                 transition-all duration-300"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── LIGHT CTA — replaces heavy purple FinalCTA ────────────── */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative rounded-[28px] overflow-hidden
                         border border-[#EAE3FF]
                         bg-gradient-to-br from-[#F8F4FF] via-[#F2EAFF] to-[#ECE2FF]
                         shadow-[0_30px_80px_-40px_rgba(76,29,149,0.25)]"
            >
              {/* Internal ambient depth */}
              <div
                aria-hidden="true"
                className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full
                           bg-[#7B3FE4] blur-[110px] opacity-[0.18] pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-32 -left-32 w-[320px] h-[320px] rounded-full
                           bg-[#C4AAFF] blur-[100px] opacity-[0.32] pointer-events-none"
              />

              <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="text-[30px] md:text-[44px] lg:text-[52px] font-semibold
                             tracking-[-0.03em] leading-[1.08] text-[#0A0A0F]
                             max-w-2xl mx-auto"
                >
                  Want a portfolio that{' '}
                  <span className="font-['Instrument_Serif'] italic font-normal text-[#4C1D95]">
                    works
                  </span>{' '}
                  while you sleep?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
                  className="mt-5 text-[15px] md:text-[16px] text-[#3D3D47] leading-[1.65]
                             max-w-md mx-auto"
                >
                  Book a free 30-minute call. No pitch, no pressure &mdash; just a plan tailored
                  to your business.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.18 }}
                  className="mt-9 flex flex-col items-center gap-4"
                >
                  <MagneticCTA strength={10}>
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2
                                 font-['DM_Sans'] font-semibold rounded-full
                                 px-7 py-3.5 text-[14.5px] bg-[#7B3FE4] text-white
                                 hover:bg-[#6B2FD4] transition-colors duration-200
                                 min-h-[50px]
                                 shadow-[0_10px_30px_-10px_rgba(123,63,228,0.55)]"
                    >
                      Book a Free Call
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </MagneticCTA>

                  <Link
                    to="/portfolio"
                    className="text-[13px] font-['DM_Sans'] text-[#6B6B7A]
                               hover:text-[#4C1D95] transition-colors duration-200"
                  >
                    Or see more case studies &rarr;
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <WhiteFooter />
    </>
  );
}
