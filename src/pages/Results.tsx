import React from 'react';
import WhiteNavbar from '../components/white/Navbar';
import WhiteFooter from '../components/white/Footer';
import SEO from '../components/seo/SEO';
import SectionHeader from '../components/white/ui/SectionHeader';
import Divider from '../components/white/ui/Divider';
import StatBlock from '../components/white/ui/StatBlock';
import Button from '../components/white/ui/Button';

const stats = [
  { value: "127+", label: "Clients delivered" },
  { value: "3yr",  label: "Building systems" },
  { value: "2wk",  label: "Avg turnaround" },
  { value: "100%", label: "Code ownership" }
];

const highlights = [
  {
    client: "RecklessBear",
    result: "3x quote conversion",
    link: "/portfolio/recklesbear"
  },
  {
    client: "BLOM Cosmetics",
    result: "15 hrs/week saved",
    link: "/portfolio/blom-cosmetics"
  },
  {
    client: "Ameli Designs",
    result: "0.5s load time",
    link: "/portfolio/ameli-van-zyl-design"
  }
];

const industries = [
  "E-commerce & Retail", "Professional Services", "Healthcare & Wellness",
  "Food & Beverage", "Real Estate", "Creative Agencies"
];

export default function ResultsPage() {
  return (
    <>
      <WhiteNavbar />
      <SEO
        title="Results"
        description="Real numbers from real projects — 127+ businesses automated, 94% lead capture, 4hr response time."
      />
      <main className="bg-white min-h-screen font-['DM_Sans']">
        <section className="py-24 md:py-32">
          <div className="max-w-5xl mx-auto px-6">
            <SectionHeader
              eyebrow="Results"
              headline="Real numbers. Real results."
              subtext="See the impact of clean, working systems — no fluff, just outcomes."
              align="center"
            />

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 mb-16">
              {stats.map((stat) => (
                <StatBlock key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>

            {/* Case highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {highlights.map((item) => (
                <div
                  key={item.client}
                  className="p-6 rounded-2xl border border-[#E8E8EC] bg-white hover:border-[#D4D4DA] transition-colors"
                >
                  <div className="text-xs font-medium uppercase tracking-[0.1em] text-[#9E9EA8] mb-2">
                    {item.client}
                  </div>
                  <div className="text-lg font-semibold text-[#0A0A0F] mb-3">
                    {item.result}
                  </div>
                  <Link
                    to={item.link}
                    className="text-sm text-[#7B3FE4] hover:text-[#6930D0] inline-flex items-center gap-1"
                  >
                    View case study →
                  </Link>
                </div>
              ))}
            </div>

            {/* Industries */}
            <div className="text-center mb-12">
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#9E9EA8] mb-3">
                Industries served
              </p>
              <p className="text-sm text-[#3D3D47]">
                {industries.join(" · ")}
              </p>
            </div>
          </div>
        </section>

        <Divider className="my-16 md:my-24" />

        <section className="py-16 bg-[#FAFAFA]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-[#0A0A0F] mb-3">
                Ready to add to these numbers?
              </h3>
              <p className="text-[#6B6B7A] mb-6">
                Book your free strategy call and see what's possible.
              </p>
              <Button href="/contact" variant="primary" size="lg">
                Book a Free Call
              </Button>
            </div>
          </div>
        </section>
      </main>
      <WhiteFooter />
    </>
  );
}
