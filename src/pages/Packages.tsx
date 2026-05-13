import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/seo/SEO';
import SectionHeader from '../components/white/ui/SectionHeader';
import Button from '../components/white/ui/Button';
import StatBlock from '../components/white/ui/StatBlock';
import { Check, Layout, Rocket, BarChart } from 'lucide-react';

const packages = [
  {
    name: 'Online Presence',
    description: 'A clean, professional website live in 3–5 days.',
    price: 'R7,500',
    detail: 'once-off',
    icon: Layout,
    features: ['Up to 5 pages', 'Contact form + SEO', 'Delivered in 3–5 days', 'Mobile responsive', 'SSL included'],
    href: '/websites'
  },
  {
    name: 'Client Magnet',
    description: 'Automated leads, bookings, and follow-ups.',
    price: 'R15,000',
    detail: 'once-off',
    icon: Rocket,
    featured: true,
    features: ['Booking system + AI chatbot', 'WhatsApp & email alerts', 'Delivered in 5–7 days', 'CRM integration', 'Automated follow-ups'],
    href: '/systems'
  },
  {
    name: 'Business Accelerator',
    description: 'A long-term growth partner & custom systems.',
    price: 'R30,000',
    detail: 'starting from',
    icon: BarChart,
    features: ['Analytics dashboard', 'Advanced custom automations', 'Monthly optimisation', 'Dedicated support', 'Custom integrations'],
    href: '/systems'
  }
];

const stats = [
  { value: '<7d',   label: 'Avg delivery' },
  { value: '3',     label: 'Core packages' },
  { value: 'R7.5K', label: 'Starting from' },
  { value: '100%',  label: 'You own it' }
];

export default function PackagesPage() {
  return (
    <>
      <Navbar />
      <SEO
        title="Packages"
        description="Choose your system: Online Presence, Client Magnet, or Business Accelerator. Websites and AI agents starting from R7,500."
      />
      <main className="bg-white min-h-screen font-['DM_Sans']">
        <section className="py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <SectionHeader
              eyebrow="Packages"
              headline="Every package is a complete business system."
              subtext="Not just a website. A system that captures leads, books clients, and runs while you focus on your business."
              align="center"
            />

            {/* Package cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {packages.map((pkg) => {
                const Icon = pkg.icon;
                return (
                  <div
                    key={pkg.name}
                    className={`relative p-8 rounded-2xl border bg-white flex flex-col
                      ${pkg.featured
                        ? 'border-[#F26A3D] shadow-[0_0_40px_rgba(242,106,61,0.12)]'
                        : 'border-[#E8E8EC] hover:border-[#D4D4DA]'
                      } transition-all duration-300`}
                  >
                    {pkg.featured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider bg-[#F26A3D] text-white px-4 py-1.5 rounded-full">
                        Most popular
                      </span>
                    )}

                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6
                      ${pkg.featured ? 'bg-[#F26A3D]/10 border border-[#F26A3D]/20' : 'bg-[#F0EBFF] border border-[#7B3FE4]/20'}`}
                    >
                      <Icon size={24} className={pkg.featured ? 'text-[#F26A3D]' : 'text-[#7B3FE4]'} />
                    </div>

                    <h3 className="text-xl font-semibold text-[#0A0A0F] mb-2">{pkg.name}</h3>
                    <p className="text-sm text-[#6B6B7A] mb-6 leading-relaxed">{pkg.description}</p>

                    <div className="mb-6">
                      <span className="text-3xl font-semibold text-[#0A0A0F]">{pkg.price}</span>
                      <span className="text-sm text-[#9E9EA8] ml-2">{pkg.detail}</span>
                    </div>

                    <ul className="space-y-3 mb-8 flex-1">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-[#3D3D47]">
                          <Check size={16} className={pkg.featured ? 'text-[#F26A3D] mt-0.5' : 'text-[#7B3FE4] mt-0.5'} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      href={pkg.href}
                      variant="primary"
                      className="w-full justify-center"
                    >
                      View details
                    </Button>
                  </div>
                );
              })}
            </div>

            {/* Stats bar */}
            <div className="mt-16 py-6 border-y border-[#E8E8EC]">
              <div className="grid grid-cols-4 gap-4 text-center">
                {stats.map((stat) => (
                  <StatBlock key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>
            </div>

            {/* CTA note */}
            <div className="mt-12 text-center">
              <p className="text-sm text-[#6B6B7A] mb-6">
                Add-ons available to extend any package. All work includes 30-day support.
              </p>
              <Button href="/contact" variant="primary" size="lg">
                Book a Free Strategy Call
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
