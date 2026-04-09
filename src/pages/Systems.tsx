import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Database, LayoutDashboard, MessageSquare, Calendar,
  Workflow, FileText, Filter, Mail, Check, ChevronDown, ArrowRight,
} from 'lucide-react';
import SEO from '../components/seo/SEO';

import GlowDivider from '../components/ui/GlowDivider';
import BracketCard from '../components/ui/BracketCard';
import FinalCTA from '../components/home/FinalCTA';
import { springStagger, springFadeUp, heroTextReveal, bentoCard, viewport } from '../lib/motion';

const included = [
  { icon: Database,       title: 'CRM Setup',            desc: 'Contacts, pipeline stages, deal tracking' },
  { icon: LayoutDashboard,title: 'Admin Dashboard',       desc: 'Your data, your control, no spreadsheets' },
  { icon: MessageSquare,  title: 'WhatsApp Automation',   desc: 'Instant replies, order updates, follow-ups' },
  { icon: Calendar,       title: 'Booking Systems',       desc: 'Cal.com or custom booking flows' },
  { icon: Workflow,       title: 'n8n Workflows',         desc: 'Connect any tool, automate any process' },
  { icon: FileText,       title: 'PDF Invoicing',         desc: 'Auto-generated, professionally formatted' },
  { icon: Filter,         title: 'Lead Pipelines',        desc: 'Capture, qualify and follow up automatically' },
  { icon: Mail,           title: 'Email Sequences',       desc: 'Automated nurture flows that convert' },
];

const forYouIf = [
  "You're spending 2+ hours a day on tasks a system could do in seconds",
  "You have a sales or leads process that lives in your head or a spreadsheet",
  "You want to scale without hiring more people",
];

const faqs = [
  {
    q: 'What tools do you use?',
    a: 'n8n, Supabase, Cal.com, WhatsApp Business API, and custom React dashboards. We pick whatever fits your business — not whatever\'s trendy.',
  },
  {
    q: 'Do I need technical knowledge to use the system?',
    a: 'No. We build for non-technical business owners. If you can use WhatsApp, you can use what we build.',
  },
  {
    q: 'Can you integrate with my existing software?',
    a: 'Usually yes. n8n connects to 400+ apps. We\'ll assess your stack on the strategy call and confirm what\'s possible.',
  },
  {
    q: 'How long does a full automation build take?',
    a: '7–14 working days depending on complexity. Simpler automations (WhatsApp bot, booking system) land in under a week.',
  },
];

export default function Systems() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative overflow-hidden">
      <SEO
        title="Systems & Automation"
        description="CRM, WhatsApp automation, booking systems and n8n workflows for local SA businesses. Stop doing it manually. Let the system work."
      />

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center py-24 overflow-hidden noise-overlay">
        <div
          className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(242,106,61,0.12), transparent 70%)' }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top, rgba(119,76,252,0.14), transparent 70%)' }}
        />
        <div className="container relative z-10">
          <motion.div initial="hidden" animate="visible" variants={springStagger}>
            <motion.p custom={0} variants={heroTextReveal} className="label mb-6">
              Service · Systems & Automation
            </motion.p>
            <motion.h1
              custom={1}
              variants={heroTextReveal}
              className="font-bebas leading-[0.9] text-white mb-2"
              style={{ fontSize: 'clamp(48px, 8vw, 100px)' }}
            >
              Stop doing it manually.
            </motion.h1>
            <motion.div custom={2} variants={heroTextReveal}>
              <span
                className="font-bebas leading-[0.9] bg-gradient-to-r from-[#774CFC] to-[#F26A3D] bg-clip-text text-transparent block mb-8"
                style={{ fontSize: 'clamp(48px, 8vw, 100px)' }}
              >
                Let the system work.
              </span>
            </motion.div>
            <motion.p custom={3} variants={heroTextReveal} className="text-white/60 max-w-[500px] mb-10 text-base leading-relaxed">
              CRMs, WhatsApp bots, booking systems, admin dashboards and n8n workflows.
              The backend of your business, automated.
            </motion.p>
            <motion.div custom={4} variants={heroTextReveal} className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn btn-orange inline-flex items-center gap-2">
                Book a Free Strategy Call <ArrowRight size={16} />
              </Link>
              <Link to="/portfolio/recklesbear" className="btn btn-ghost-orange inline-flex items-center gap-2">
                See RecklessBear Case Study <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <GlowDivider />

      {/* ── What's included ────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-2"><span className="label">What's Included</span></div>
          <h2 className="h2 text-center mb-12">
            The full stack. Ready to deploy.
          </h2>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={springStagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {included.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={bentoCard}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 flex flex-col gap-3 hover:border-white/20 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#F26A3D]/12 border border-[#F26A3D]/25 flex items-center justify-center">
                    <Icon size={16} className="text-[#F26A3D]" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium mb-1">{item.title}</p>
                    <p className="text-white/45 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <GlowDivider color="white" />

      {/* ── Built for you if ───────────────────────────── */}
      <section className="section">
        <div className="container max-w-3xl">
          <div className="mb-2"><span className="label">Is This For You?</span></div>
          <h2 className="h2 mb-10">
            This is built for you if...
          </h2>
          <motion.ul
            className="flex flex-col gap-5"
            variants={springStagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {forYouIf.map((item, i) => (
              <motion.li key={i} variants={springFadeUp} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[#F26A3D]/15 border border-[#F26A3D]/35 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={12} className="text-[#F26A3D]" />
                </div>
                <p className="text-white/75 text-base leading-relaxed">{item}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <GlowDivider />

      {/* ── Example project ────────────────────────────── */}
      <section className="section">
        <div className="container max-w-3xl">
          <div className="mb-2"><span className="label">Example Project</span></div>
          <h2 className="h2 mb-10">
            4-minute quotes. Was 2 days.
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <BracketCard color="orange">
              <Link to="/portfolio/recklesbear" className="group block">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/3588365/pexels-photo-3588365.jpeg?auto=compress&cs=tinysrgb&w=1200"
                      alt="RecklessBear Apparel"
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-55 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border text-[#F26A3D] border-[#F26A3D]/40 bg-[#F26A3D]/12">
                        Systems & Automation
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-bebas text-2xl text-white mb-1">RecklessBear Apparel</h3>
                      <p className="text-white/50 text-sm">12-stage order tracking, CRM, WhatsApp automation and monthly retainer</p>
                    </div>
                    <div className="flex items-center gap-2 text-[#F26A3D] text-sm group-hover:gap-3 transition-all">
                      View <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </BracketCard>
          </motion.div>
        </div>
      </section>

      <GlowDivider color="white" />

      {/* ── FAQ ────────────────────────────────────────── */}
      <section className="section">
        <div className="container max-w-2xl">
          <div className="mb-2"><span className="label">FAQ</span></div>
          <h2 className="h2 mb-10">
            Common questions.
          </h2>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors"
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-white font-medium text-sm pr-4">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-white/40 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="px-5 pb-5 text-white/55 text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GlowDivider />

      <section className="section">
        <div className="container">
          <FinalCTA />
        </div>
      </section>
    </div>
  );
}
