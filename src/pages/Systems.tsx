import {
  Database, LayoutDashboard, MessageSquare, Calendar,
  Workflow, FileText, Filter, Mail
} from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/seo/SEO';
import SiteHeader from '../components/white/SiteHeader';
import SiteFooter from '../components/white/SiteFooter';
import SectionHeader from '../components/white/ui/SectionHeader';
import Button from '../components/white/ui/Button';
import Divider from '../components/white/ui/Divider';
import FinalCTA from '../components/white/home/FinalCTA';
import AutomationFlow from '../components/white/home/AutomationFlow';
import WordReveal from '../components/white/ui/WordReveal';
import MagneticCTA from '../components/white/ui/MagneticCTA';
import type { AutomationStage } from '../types/case-study';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Real RecklessBear mobile captures fill the customer-facing stages; the
// back-office stages (CRM, production board, weekly report) keep a clean
// branded mock screen since no portrait capture of those exists.
const STAGE_1_SCREEN = '/assets/clients/recklessbear/mobile-contact.webp';
const STAGE_2_SCREEN = '/assets/clients/recklessbear/mobile-chatbot.webp';
const STAGE_3_SCREEN = '';
const STAGE_4_SCREEN = '';
const STAGE_5_SCREEN = '/assets/clients/blom/whatsapp.webp';
const STAGE_6_SCREEN = '';

const STAGES: AutomationStage[] = [
  {
    indicator: 'Step 01 / 06',
    title: 'Customer requests a quote',
    caption:
      'Visitor lands on recklessbear.co.za, opens the quote form, fills in product, quantity, deadline, and uploads a design reference.',
    screenSrc: STAGE_1_SCREEN,
    screenAlt: 'Quote form on the RecklessBear website',
  },
  {
    indicator: 'Step 02 / 06',
    title: 'AI generates the quote',
    caption:
      'Voiceflow chatbot handles edge cases, asks clarifying questions, generates an instant pricing estimate, and routes the lead based on category.',
    screenSrc: STAGE_2_SCREEN,
    screenAlt: 'AI quote chatbot generating a price estimate',
  },
  {
    indicator: 'Step 03 / 06',
    title: 'Lead lands in the CRM',
    caption:
      'Airtable captures the lead. n8n auto-assigns it to the rep with the fewest active orders. Email + WhatsApp alerts fire to that rep instantly.',
    screenSrc: STAGE_3_SCREEN,
    screenAlt: 'Airtable CRM with a new lead auto-assigned to a sales rep',
  },
  {
    indicator: 'Step 04 / 06',
    title: 'Production starts',
    caption:
      'On confirmation, a Trello card is auto-created and moved through the 12-stage production pipeline. Stock is auto-deducted from the inventory system.',
    screenSrc: STAGE_4_SCREEN,
    screenAlt: 'Trello production board with a new card moving through stages',
  },
  {
    indicator: 'Step 05 / 06',
    title: 'Customer stays in the loop',
    caption:
      'Every Trello card move triggers an automated WhatsApp message to the customer. No follow-up phone calls. No customers chasing updates.',
    screenSrc: STAGE_5_SCREEN,
    screenAlt: 'WhatsApp conversation with automated order updates',
  },
  {
    indicator: 'Step 06 / 06',
    title: 'Order ships, CEO reports up',
    caption:
      'Customer gets delivery confirmation. CEO gets a weekly summary email — total leads, conversion rate, rep performance, production bottlenecks. The whole system reports on itself.',
    screenSrc: STAGE_6_SCREEN,
    screenAlt: 'Weekly performance summary email for the CEO',
  },
];

const features = [
  { icon: Database,        title: 'CRM Setup',          desc: 'Contacts, pipeline stages, deal tracking' },
  { icon: LayoutDashboard, title: 'Admin Dashboard',     desc: 'Your data, your control, no spreadsheets' },
  { icon: MessageSquare,   title: 'WhatsApp Automation', desc: 'Instant replies, order updates, follow-ups' },
  { icon: Calendar,        title: 'Booking Systems',     desc: 'Cal.com or custom booking flows' },
  { icon: Workflow,        title: 'n8n Workflows',       desc: 'Connect any tool, automate any process' },
  { icon: FileText,        title: 'PDF Invoicing',       desc: 'Auto-generated, professionally formatted' },
  { icon: Filter,          title: 'Lead Pipelines',      desc: 'Capture, qualify and follow up automatically' },
  { icon: Mail,            title: 'Email Sequences',     desc: 'Automated nurture flows that convert' },
];

export default function SystemsPage() {
  return (
    <>
      <SiteHeader />
      <SEO
        title="Systems & Automation"
        description="CRMs, WhatsApp bots, dashboards, workflows — I automate the work that's eating your time."
      />
      <main className="bg-white min-h-[100svh] font-['DM_Sans']">
        <section className="pt-36 md:pt-44 pb-24 md:pb-32 relative overflow-hidden">
          <div aria-hidden="true" className="gradient-mesh opacity-70" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[60%] pointer-events-none"
            style={{
              background:
                'radial-gradient(900px 500px at 50% 0%, rgba(123,63,228,0.09), transparent 70%)',
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-5"
            >
              Systems &amp; Automation
            </motion.span>
            <WordReveal
              as="h1"
              trigger="mount"
              segments={[{ text: 'Your business runs on systems.' }, { text: 'I build them.', serif: true }]}
              className="text-[40px] sm:text-[54px] md:text-[68px] font-['DM_Sans'] font-semibold
                         text-[#0A0A0F] tracking-[-0.03em] leading-[1.07] max-w-3xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.14 }}
              className="mt-6 text-[17px] md:text-[19px] font-['DM_Sans'] text-[#3D3D47] leading-[1.6] max-w-2xl"
            >
              CRMs, WhatsApp bots, dashboards, workflows — I automate the work
              that&apos;s eating your time.
            </motion.p>
          </div>
        </section>

        {/* Pinned 6-stage automation flow — RecklessBear quote-to-production */}
        <AutomationFlow stages={STAGES} />

        <section className="py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <SectionHeader
              eyebrow="What's included"
              headline="Everything that runs your business."
              subtext="Eight building blocks. Mix and match what you need."
            />

            {/* Simple bullet list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 mt-8">
              {features.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#F0EBFF] flex items-center justify-center mt-0.5 shrink-0">
                      <Icon size={12} className="text-[#7B3FE4]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#0A0A0F]">{item.title}</p>
                      <p className="text-xs text-[#6B6B7A]">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pain point callout */}
            <div className="mt-12 p-6 bg-[#FAFAFA] rounded-xl border border-[#E8E8EC]">
              <p className="text-sm text-[#6B6B7A] italic">
                Most SA businesses are still running on WhatsApps, spreadsheets, and memory. That's not a system — that's a liability.
              </p>
            </div>

            {/* Timeline */}
            <p className="mt-8 text-sm text-[#6B6B7A] max-w-md">
              Most automation projects are live in <strong>5–14 days</strong> from brief to live.
            </p>

            {/* CTA */}
            <div className="mt-8">
              <MagneticCTA strength={14}>
                <span data-cursor="view">
                  <Button href="/contact" variant="primary">Book a Free Call</Button>
                </span>
              </MagneticCTA>
            </div>
          </div>
        </section>

        <Divider className="my-16 md:my-24" />

        {/* Real systems I've built */}
        <section className="py-24 md:py-32 bg-[#FAFAFA]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="mb-12">
              <span className="block text-[11px] font-['DM_Sans'] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-4">
                Real systems
              </span>
              <WordReveal
                as="h2"
                segments={[{ text: 'Three examples from' }, { text: 'live clients.', serif: true }]}
                className="text-[28px] md:text-[40px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em] leading-[1.1]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  client: 'RecklessBear',
                  tag: 'Quote engine',
                  desc: 'Customer fills quote form → AI prices it in seconds → lead lands in CRM → rep is auto-assigned → 12-stage Trello board tracks production → WhatsApp updates fire at every stage.',
                  chips: ['Voiceflow', 'n8n', 'Airtable', 'WhatsApp API'],
                },
                {
                  client: 'BLOM Cosmetics',
                  tag: 'Order flow',
                  desc: 'Customer places order → PayFast payment captured → ShipLogic creates waybill → automated WhatsApp order confirmation fires → admin dashboard updates in real time.',
                  chips: ['PayFast', 'ShipLogic', 'n8n', 'Supabase'],
                },
                {
                  client: 'NSA Mining',
                  tag: 'Internal gift system',
                  desc: 'Employee enters ID number → system checks eligibility → generates a printable gift slip → manager gets weekly report of all claims. No spreadsheets. No manual checking.',
                  chips: ['React', 'Supabase', 'PDF generation'],
                },
              ].map((item, i) => (
                <div
                  key={item.client}
                  className="bg-white rounded-2xl border border-[#E8E8EC] p-7
                             hover:border-[#D4D4DA] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)]
                             hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-['DM_Sans'] font-semibold uppercase tracking-[0.12em] text-[#7B3FE4]
                                     bg-[#F0EBFF] rounded-full px-2.5 py-1">
                      {item.tag}
                    </span>
                    <span className="text-[11px] font-['DM_Sans'] font-medium text-[#9E9EA8]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="text-[15px] font-['DM_Sans'] font-semibold text-[#0A0A0F] mb-3">
                    {item.client}
                  </p>
                  <p className="text-[13.5px] font-['DM_Sans'] text-[#6B6B7A] leading-[1.65] mb-5">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.chips.map((chip) => (
                      <span
                        key={chip}
                        className="text-[11px] font-['DM_Sans'] px-2.5 py-1 rounded-full
                                   border border-[#E8E8EC] text-[#9E9EA8]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <FinalCTA />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
