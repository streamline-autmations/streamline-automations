import React from 'react';
import { ShoppingBag, LayoutDashboard, Bot, CheckCircle, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import WhiteNavbar from '../../components/white/Navbar';
import WhiteFooter from '../../components/white/Footer';
import SEO from '../../components/seo/SEO';
import FinalCTA from '../../components/white/home/FinalCTA';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const METRICS = [
  { value: '3×', sub: 'More quotes closed' },
  { value: '100%', sub: 'Lead visibility for the CEO' },
  { value: '−15hrs', sub: 'Admin saved every week' },
];

const TECH_TAGS = [
  { Icon: ShoppingBag, label: 'Service Website' },
  { Icon: LayoutDashboard, label: 'Admin System' },
  { Icon: Bot, label: 'AI Lead Capture' },
];

const AI_STEPS = [
  {
    Icon: MessageSquare,
    label: 'Visitor enquires',
    body: 'A customer lands on the site and starts an order request. The AI responds immediately — no wait, no missed messages, any time of day.',
    featured: false,
  },
  {
    Icon: Bot,
    label: 'AI qualifies the lead',
    body: 'The AI asks the right questions — product type, quantity, design brief, timeline. It handles FAQs and only sends the lead through once everything is complete.',
    featured: true,
  },
  {
    Icon: CheckCircle,
    label: 'Lands in admin — ready to action',
    body: 'A fully structured lead arrives in the dashboard with the brief attached. The team can quote straight away. No chasing. No clarifying messages.',
    featured: false,
  },
];

const ADMIN_FEATURES = [
  {
    icon: '📦',
    title: 'Order Management',
    body: 'View, track, and update custom order statuses in real-time.',
  },
  {
    icon: '👥',
    title: 'Customer Database',
    body: 'Securely store and manage customer details and history.',
  },
  {
    icon: '📄',
    title: 'Export & Reports',
    body: 'Download order data for accounting and shipping processing.',
  },
];

export default function RecklessBearPage() {
  return (
    <>
      <WhiteNavbar />
      <SEO
        title="RecklessBear Apparel — Case Study"
        description="Custom website, AI chatbot, admin dashboard and 12-stage order tracking for RecklessBear Apparel."
        image="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772612036/Recklessbear_Home_Page_Mockup_gzktrh.png"
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
                RecklessBear
              </h1>
              <p className="text-[17px] md:text-[19px] text-[#6B6B7A] leading-[1.6]
                            max-w-2xl mx-auto mb-10">
                A custom clothing brand running on custom orders. We built their website, an AI
                that qualifies every lead automatically, and the admin system that runs the whole
                business.
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
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
            >
              <img
                src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772612036/Recklessbear_Home_Page_Mockup_gzktrh.png"
                alt="RecklessBear homepage mockup"
                className="w-full h-auto object-contain"
              />
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
                    'Manual quote follow-up taking 4 hours a day',
                    '30% of leads ignored due to capacity',
                    'Limited visibility on sales pipeline',
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
                    'Automated quotes handled in minutes per day',
                    '94% lead capture rate (24/7 coverage)',
                    '100% pipeline visibility via custom dashboard',
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

        {/* ── THE WEBSITE ── */}
        <section className="py-20 md:py-28 bg-[#FAFAFA] border-y border-[#E8E8EC]">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-center mb-14"
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.14em]
                               text-[#9E9EA8] mb-4">
                Module 01
              </span>
              <h2 className="text-[28px] md:text-[38px] font-semibold tracking-[-0.02em]
                             leading-[1.15] text-[#0A0A0F] mb-3">
                The Website
              </h2>
              <p className="text-[16px] text-[#6B6B7A]">Built for the brand. Designed to convert.</p>
            </motion.div>

            {/* Split A — text + long scroll */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="grid md:grid-cols-2 gap-12 items-center mb-20"
            >
              <div>
                <h3 className="text-[22px] md:text-[26px] font-semibold tracking-[-0.015em]
                               text-[#0A0A0F] mb-5">
                  Built for custom orders
                </h3>
                <p className="text-[15.5px] text-[#3D3D47] leading-[1.75] mb-5">
                  A fast, bold site that speaks to RecklessBear's audience. Products are shown
                  properly, the brand comes through clearly, and every page pushes visitors toward
                  placing a custom order.
                </p>
                <p className="text-[15.5px] text-[#3D3D47] leading-[1.75] mb-8">
                  The order request flow guides customers step by step — product type, size,
                  quantity, design brief. Clean. Structured. No DMs.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {['Custom Brand Design', 'Mobile-First', 'Order Request Flow', 'WhatsApp Integration', 'SEO Setup'].map((pill) => (
                    <span key={pill}
                      className="px-3.5 py-1.5 bg-[#F0EBFF] border border-[#D4CAFF]
                                 rounded-full text-[12px] font-medium text-[#7B3FE4]">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center">
                <img
                  src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1772612035/Reckless_long_scroll_uwe4be.png"
                  alt="RecklessBear long scroll mockup"
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>

            {/* Split B — icon card + text */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className="flex items-center justify-center">
                <div className="bg-[#F5F0FF] border border-[#D4CAFF] p-10 rounded-2xl
                                text-center w-full max-w-sm">
                  <div className="w-16 h-16 bg-[#F0EBFF] rounded-xl flex items-center
                                  justify-center mx-auto mb-6 border border-[#C4AAFF]">
                    <MessageSquare className="w-8 h-8 text-[#7B3FE4]" />
                  </div>
                  <h3 className="text-[18px] font-semibold text-[#0A0A0F] mb-3">
                    Structured Order Flow
                  </h3>
                  <p className="text-[14px] text-[#6B6B7A] leading-[1.65]">
                    Step-by-step form captures everything — no back-and-forth DMs.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-[22px] md:text-[26px] font-semibold tracking-[-0.015em]
                               text-[#0A0A0F] mb-5">
                  Every order starts here
                </h3>
                <p className="text-[15.5px] text-[#3D3D47] leading-[1.75] mb-8">
                  The order form walks customers through product type, quantity, size, and design
                  brief — step by step. When they submit, they get a confirmation automatically.
                  Their brief goes straight into the system. No back-and-forth.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {['Multi-step form', 'Design brief capture', 'Auto confirmation', 'Instant lead routing'].map((pill) => (
                    <span key={pill}
                      className="px-3.5 py-1.5 bg-[#F0EBFF] border border-[#D4CAFF]
                                 rounded-full text-[12px] font-medium text-[#7B3FE4]">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── AI LEAD FLOW ── */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-center mb-14"
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.14em]
                               text-[#9E9EA8] mb-4">
                Module 02
              </span>
              <h2 className="text-[28px] md:text-[38px] font-semibold tracking-[-0.02em]
                             leading-[1.15] text-[#0A0A0F] mb-3">
                The AI Lead Flow
              </h2>
              <p className="text-[16px] text-[#6B6B7A] max-w-lg mx-auto">
                Every lead that comes through the website is handled automatically before it
                reaches the team.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {AI_STEPS.map(({ Icon, label, body, featured }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
                  className={`rounded-2xl p-7 relative
                    ${featured
                      ? 'bg-[#F5F0FF] border border-[#C4AAFF] shadow-[0_4px_24px_rgba(123,63,228,0.12)]'
                      : 'bg-white border border-[#E8E8EC] hover:border-[#D4D4DA] hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)]'}
                    transition-all duration-300`}
                >
                  {featured && (
                    <span className="absolute top-5 right-5 text-[10px] font-medium
                                     uppercase tracking-[0.12em] text-[#7B3FE4]
                                     bg-[#E8DCFF] px-2.5 py-1 rounded-full">
                      AI Layer
                    </span>
                  )}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5
                    ${featured ? 'bg-[#E8DCFF]' : 'bg-[#F5F5F7]'}`}
                  >
                    <Icon className={`w-5 h-5 ${featured ? 'text-[#7B3FE4]' : 'text-[#6B6B7A]'}`} />
                  </div>
                  <h3 className="text-[16px] font-semibold text-[#0A0A0F] mb-3">{label}</h3>
                  <p className="text-[14px] text-[#6B6B7A] leading-[1.65]">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ADMIN SYSTEM ── */}
        <section className="py-20 md:py-28 bg-[#FAFAFA] border-y border-[#E8E8EC]">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-center mb-14"
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.14em]
                               text-[#9E9EA8] mb-4">
                Module 03
              </span>
              <h2 className="text-[28px] md:text-[38px] font-semibold tracking-[-0.02em]
                             leading-[1.15] text-[#0A0A0F] mb-4">
                Backend Administration
              </h2>
              <p className="text-[16px] text-[#6B6B7A] max-w-xl mx-auto leading-[1.65]">
                A powerful, custom-built admin panel for managing orders, tracking enquiries, and
                updating product details — no technical knowledge needed.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {ADMIN_FEATURES.map(({ icon, title, body }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
                  className="bg-white border border-[#E8E8EC] rounded-2xl p-8 text-center
                             hover:border-[#D4D4DA] hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)]
                             transition-all duration-300"
                >
                  <div className="text-3xl mb-5">{icon}</div>
                  <h3 className="text-[16px] font-semibold text-[#0A0A0F] mb-3">{title}</h3>
                  <p className="text-[14px] text-[#6B6B7A] leading-[1.65]">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <section className="py-16 bg-white border-b border-[#E8E8EC]">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.14em]
                               text-[#9E9EA8] mb-6">
                Built with
              </span>
              <div className="flex flex-wrap justify-center gap-2.5">
                {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase', 'n8n', 'OpenAI', 'Voiceflow', 'Resend', 'Vercel'].map((tech) => (
                  <span key={tech}
                    className="px-4 py-2 bg-[#F5F5F7] border border-[#E8E8EC]
                               rounded-full text-[13.5px] text-[#6B6B7A]
                               hover:border-[#D4D4DA] transition-colors duration-200">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── NEXT / PREV ── */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex justify-between items-center">
              <Link to="/portfolio/ameli-van-zyl-design"
                className="flex items-center gap-2 text-[13px] font-medium uppercase
                           tracking-[0.1em] text-[#9E9EA8] hover:text-[#0A0A0F]
                           transition-colors duration-200">
                <ArrowLeft className="w-4 h-4" /> Ameli Designs
              </Link>
              <Link to="/portfolio/blom-cosmetics"
                className="flex items-center gap-2 text-[13px] font-medium uppercase
                           tracking-[0.1em] text-[#9E9EA8] hover:text-[#0A0A0F]
                           transition-colors duration-200">
                BLOM Cosmetics <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <WhiteFooter />
    </>
  );
}
