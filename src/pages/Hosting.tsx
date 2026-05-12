import React from 'react';
import {
  Globe, Mail, Network, Lock, Wrench, Headphones, Activity
} from 'lucide-react';
import SEO from '../components/seo/SEO';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SectionHeader from '../components/white/ui/SectionHeader';
import Button from '../components/white/ui/Button';
import Divider from '../components/white/ui/Divider';
import FinalCTA from '../components/white/home/FinalCTA';

const features = [
  { icon: Globe,      title: 'Domain Registration', desc: 'We handle purchase, transfer and DNS' },
  { icon: Mail,       title: 'Professional Email',  desc: 'yourname@yourbusiness.com from day one' },
  { icon: Network,    title: 'DNS Management',      desc: 'Records, redirects, MX — all configured' },
  { icon: Lock,       title: 'SSL Certificate',     desc: 'HTTPS. Secure. Trusted by every browser.' },
  { icon: Wrench,     title: 'Monthly Maintenance', desc: 'Updates, backups and security patches' },
  { icon: Headphones, title: 'Priority Support',    desc: 'Direct line, fast response, no ticket queues' },
  { icon: Activity,   title: 'Uptime Monitoring',   desc: 'Instant alerts if anything goes down' },
];

export default function HostingPage() {
  return (
    <>
      <Navbar />
      <SEO
        title="Hosting & Maintenance"
        description="Domain registration, professional email, SSL and monthly maintenance for SA businesses. Your digital foundation."
      />
      <main className="bg-white min-h-screen font-['DM_Sans']">
        <section className="py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <SectionHeader
              eyebrow="Hosting & Maintenance"
              headline="Your digital foundation. Handled."
              subtext="Domain, professional email, SSL, DNS and monthly maintenance — everything managed so you never have to think about the technical side again."
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

            {/* Timeline */}
            <p className="mt-12 text-sm text-[#6B6B7A] max-w-md">
              Everything managed. Setup complete in <strong>48 hours</strong>.
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
      <Footer />
    </>
  );
}
