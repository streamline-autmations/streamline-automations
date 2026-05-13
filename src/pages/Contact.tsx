import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/seo/SEO';
import SectionHeader from '../components/white/ui/SectionHeader';
import StatBlock from '../components/white/ui/StatBlock';
import ContactFormWhite from '../components/white/contact/ContactFormWhite';
import FinalCTA from '../components/white/home/FinalCTA';

const stats = [
  { value: "127+", label: "Businesses automated" },
  { value: "4hrs",  label: "Avg response time" },
  { value: "94%",   label: "Lead capture rate" }
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <SEO
        title="Contact"
        description="Book a free 30-minute strategy call with Streamline Automations. Let's discuss your custom website and automation needs."
      />
      <main className="bg-white min-h-screen font-['DM_Sans']">
        <section className="py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <SectionHeader
              eyebrow="Contact"
              headline="Let's talk."
              subtext="Book a free 30-minute call or send a message. No pitch deck — just a plan."
              align="center"
            />

            {/* Trust stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-8 mb-12">
              {stats.map((stat) => (
                <StatBlock key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>

            {/* Contact form */}
            <ContactFormWhite />
          </div>
        </section>

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
