import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SectionHeader from '../components/white/ui/SectionHeader';
import Button from '../components/white/ui/Button';
import Divider from '../components/white/ui/Divider';

interface AddonItem {
  icon: string;
  name: string;
  price: string;
  description: string;
  availableOn: string;
}

const automationAddons: AddonItem[] = [
  { icon: '🤖',  name: 'Advanced AI Chatbot',     price: 'R2,000 – R5,000',   availableOn: 'Client Magnet, Business Accelerator', description: 'Multi-step conversation flows, objection handling, and custom personality.' },
  { icon: '📅',  name: 'Advanced Booking Logic',  price: 'R1,500 – R3,000',   availableOn: 'Client Magnet, Business Accelerator', description: 'Complex scheduling rules, multi-staff calendars, and buffer times.' },
  { icon: '🗄️',  name: 'CRM Expansion',           price: 'R2,000 – R6,000',   availableOn: 'All packages', description: 'Full pipeline view, deal stages, client notes, and tags.' },
  { icon: '🔍',  name: 'SEO Upgrade',             price: 'R2,500 – R8,000',   availableOn: 'All packages', description: 'Keyword research, on-page optimisation, and schema markup.' },
  { icon: '📧',  name: 'Email Marketing Setup',   price: 'R1,500 – R3,500',   availableOn: 'Client Magnet, Business Accelerator', description: 'Welcome sequences, list segmentation, and automation triggers.' },
  { icon: '📊',  name: 'Analytics Dashboard',     price: 'R2,000 – R4,000',   availableOn: 'Online Presence, Client Magnet', description: 'Custom reporting for leads, bookings, conversions, and revenue.' }
];

const brandingAddons: AddonItem[] = [
  { icon: '✏️', name: 'Logo Design',           price: 'R2,000 – R5,000', availableOn: 'All packages', description: 'Primary logo, alternate version, favicon, and all formats (SVG, PNG, PDF).' },
  { icon: '🎨', name: 'Brand Guidelines',       price: 'R1,500 – R3,000', availableOn: 'All packages', description: 'Color palette, typography, logo usage rules, and reference sheet.' },
  { icon: '🖨️', name: 'Business Card Design',   price: 'R500 – R1,200',   availableOn: 'All packages', description: 'Front and back design, print-ready files, and digital version.' },
  { icon: '📄', name: 'Proposal / Pitch Deck',  price: 'R2,000 – R4,000', availableOn: 'All packages', description: 'Branded PDF or slide deck for presenting your business.' },
  { icon: '🏷️', name: 'Brand Stationery Pack',  price: 'R1,500 – R3,500', availableOn: 'All packages', description: 'Email signature, letterhead, invoice template and document cover.' }
];

const socialAddons: AddonItem[] = [
  { icon: '📱', name: 'Profile Setup & Optimisation', price: 'R750 – R1,500', availableOn: 'All packages', description: 'Instagram and LinkedIn bios, profile photos, and link-in-bio setup.' },
  { icon: '🖼️', name: 'Branded Post Templates',      price: 'R1,500 – R3,000', availableOn: 'All packages', description: '10 Canva templates in your brand colors — tips, promos, quotes.' },
  { icon: '⭕',  name: 'Instagram Highlight Covers',  price: 'R500 – R800',   availableOn: 'All packages', description: '5–8 custom branded covers matching your site and brand identity.' },
  { icon: '📋',  name: 'Content Strategy Document',   price: 'R1,500 – R2,500', availableOn: 'All packages', description: '30-day posting plan, content pillars, caption formulas and hashtags.' },
  { icon: '🎬',  name: 'Reel / Short-Form Templates', price: 'R1,000 – R2,000', availableOn: 'All packages', description: '5 CapCut or Canva video templates with your branding.' }
];

type AccentColor = 'purple' | 'orange' | 'white';

interface AddonCardProps {
  icon: string;
  name: string;
  price: string;
  description: string;
  availableOn: string;
  accentColor: AccentColor;
}

const AddonCard: React.FC<AddonCardProps> = ({ icon, name, price, description, availableOn, accentColor }) => {
  const accentStyles = {
    purple: 'bg-[#F0EBFF] text-[#7B3FE4] border-[#E8E8EC]',
    orange: 'bg-[#FFF7ED] text-[#F26A3D] border-[#E8E8EC]',
    white:  'bg-[#F5F5F7] text-[#6B6B7A] border-[#E8E8EC]'
  }[accentColor];

  return (
    <div className={`p-6 rounded-2xl border border-[#E8E8EC] bg-white hover:border-[#D4D4DA] transition-colors`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl filter drop-shadow-md">{icon}</span>
          <h4 className="text-base font-semibold text-[#0A0A0F]">{name}</h4>
        </div>
        <span className={`text-xs font-medium px-3 py-1 rounded-full border whitespace-nowrap ${accentStyles}`}>
          {price}
        </span>
      </div>
      <p className="text-sm text-[#6B6B7A] leading-relaxed mb-2">{description}</p>
      <p className="text-[11px] text-[#9E9EA8]">Available on: {availableOn}</p>
    </div>
   );
 };

 export default function AddOnsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen font-['DM_Sans']">
        <section className="py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <SectionHeader
              eyebrow="Add-ons"
              headline="Need more?"
              subtext="Extend any package with add-ons. Only available when combined with a core package."
            />

            {/* Automation */}
            <div className="mt-16">
              <SectionHeader
                eyebrow="01 — Automation"
                headline="Automation Add-Ons"
                subtext="Extend your system with advanced logic, integrations, and AI."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {automationAddons.map((addon, i) => (
                  <AddonCard key={i} {...addon} accentColor="purple" />
                ))}
              </div>
            </div>

            {/* Branding */}
            <Divider className="my-16 md:my-24" />
            <div className="mt-16">
              <SectionHeader
                eyebrow="02 — Branding"
                headline="Branding & Identity"
                subtext="Look the part before you say a word."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {brandingAddons.map((addon, i) => (
                  <AddonCard key={i} {...addon} accentColor="orange" />
                ))}
              </div>
            </div>

            {/* Social Media */}
            <Divider className="my-16 md:my-24" />
            <div className="mt-16">
              <SectionHeader
                eyebrow="03 — Social Media"
                headline="Social Media Setup"
                subtext="Show up consistently. Look like you mean it."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {socialAddons.map((addon, i) => (
                  <AddonCard key={i} {...addon} accentColor="white" />
                ))}
              </div>
            </div>
          </div>
        </section>

        <Divider className="my-16 md:my-24" />

        <section className="py-16 bg-[#FAFAFA]">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h3 className="text-xl font-semibold text-[#0A0A0F] mb-3">
              Not sure what you need?
            </h3>
            <p className="text-[#6B6B7A] mb-6 max-w-lg mx-auto">
              Book a free 20-minute strategy call. We'll scope your package and add-ons together — no guessing.
            </p>
            <Button href="/contact" variant="primary" size="lg">
              Book a Free Call
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
