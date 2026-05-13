import React from 'react';
import {
  Globe, Smartphone, Mail, MapPin, Zap, Search, Palette, Shield
} from 'lucide-react';
import SEO from '../components/seo/SEO';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SectionHeader from '../components/white/ui/SectionHeader';
import Button from '../components/white/ui/Button';
import Divider from '../components/white/ui/Divider';
import FinalCTA from '../components/white/home/FinalCTA';

const features = [
  { icon: Globe,      title: '5 Pages',              desc: 'Home, About, Services, Portfolio, Contact' },
  { icon: Smartphone, title: 'Mobile-First',          desc: 'Perfect on every screen, every device' },
  { icon: Mail,       title: 'Contact Form',          desc: 'Enquiries delivered straight to your inbox' },
  { icon: MapPin,     title: 'Google Maps & Socials', desc: 'Embedded, linked and verified' },
  { icon: Zap,        title: 'Fast Load',             desc: 'Optimised performance from day one' },
  { icon: Search,     title: 'Basic SEO',             desc: 'Meta tags, titles and structured data' },
  { icon: Palette,    title: 'Custom Design',         desc: 'No Wix. No Squarespace. Fully yours.' },
  { icon: Shield,     title: 'SSL Included',          desc: 'Secure by default — HTTPS on launch day' },
];

export default function WebsitesPage() {
  return (
    <>
      <Navbar />
      <SEO
        title="Web Design & Creation"
        description="Custom websites for South African businesses. Fast, mobile-first, and built to convert. No templates."
      />
      <main className="bg-white min-h-screen font-['DM_Sans']">
        <section className="py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <SectionHeader
              eyebrow="Web Design & Creation"
              headline="Websites that do the work for you."
              subtext="Custom-coded, fast, and built to convert. Not a template in sight."
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
              Most websites ship in <strong>3–7 days</strong> from brief to live.
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
