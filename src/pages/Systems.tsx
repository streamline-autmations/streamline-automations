import React from 'react';
import {
  Database, LayoutDashboard, MessageSquare, Calendar,
  Workflow, FileText, Filter, Mail
} from 'lucide-react';
import SEO from '../components/seo/SEO';
import WhiteNavbar from '../components/white/Navbar';
import WhiteFooter from '../components/white/Footer';
import SectionHeader from '../components/white/ui/SectionHeader';
import Button from '../components/white/ui/Button';
import Divider from '../components/white/ui/Divider';
import FinalCTA from '../components/white/home/FinalCTA';

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
      <WhiteNavbar />
      <SEO
        title="Systems & Automation"
        description="CRMs, WhatsApp bots, dashboards, workflows — I automate the work that's eating your time."
      />
      <main className="bg-white min-h-screen font-['DM_Sans']">
        <section className="py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <SectionHeader
              eyebrow="Systems & Automation"
              headline="Your business runs on systems. I build them."
              subtext="CRMs, WhatsApp bots, dashboards, workflows — I automate the work that's eating your time."
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
              <Button href="/contact" variant="primary">Book a Free Call</Button>
            </div>
          </div>
        </section>

        <Divider className="my-16 md:my-24" />

        <section className="py-16 bg-[#FAFAFA]">
          <div className="max-w-5xl mx-auto px-6">
            <FinalCTA />
          </div>
        </section>
      </main>
      <WhiteFooter />
    </>
  );
}
