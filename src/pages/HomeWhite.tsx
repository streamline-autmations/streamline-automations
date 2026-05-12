import { useEffect } from 'react';
import SEO from '../components/seo/SEO';
import WhiteNavbar from '../components/white/Navbar';
import WhiteFooter from '../components/white/Footer';
import CustomCursor from '../components/white/ui/CustomCursor';
import Preloader from '../components/white/ui/Preloader';
import ScrollProgress from '../components/white/ui/ScrollProgress';
import Hero from '../components/white/home/Hero';
import ClientBar from '../components/white/home/ClientBar';
import Services from '../components/white/home/Services';
import CaseStudyCycler from '../components/white/home/CaseStudyCycler';
import StatsStrip from '../components/white/home/StatsStrip';
import FeaturedWork from '../components/white/home/FeaturedWork';
import RentalCallout from '../components/white/home/RentalCallout';
import HowItWorks from '../components/white/home/HowItWorks';
import FinalCTA from '../components/white/home/FinalCTA';
import type { CaseStudySlide, StatItem } from '../types/case-study';

// Replace these placeholder Cloudinary URLs once the real mockups are uploaded.
// See ASSET_MANIFEST.md at repo root for the upload checklist.
const BLOM_MOCKUP =
  'https://res.cloudinary.com/dnlgohkcc/image/upload/v0/streamline-site/clients/blom-mockup.png';
const RECKLESSBEAR_MOCKUP =
  'https://res.cloudinary.com/dnlgohkcc/image/upload/v0/streamline-site/clients/recklessbear-mockup.png';
const CW_MOCKUP =
  'https://res.cloudinary.com/dnlgohkcc/image/upload/v0/streamline-site/clients/cw-mockup.png';
const AMELI_MOCKUP =
  'https://res.cloudinary.com/dnlgohkcc/image/upload/v0/streamline-site/clients/ameli-mockup.png';

const SLIDES: CaseStudySlide[] = [
  {
    tag: '01 — E-commerce + Automation',
    headline: 'Not just an online shop. A complete <em>digital business.</em>',
    body:
      'Full e-commerce store with custom admin, course platform, email automation, and WhatsApp order updates — all running on one Supabase backend.',
    chips: ['E-commerce', 'Admin Dashboard', 'Course Platform', 'WhatsApp Automation', 'Owner-Editable'],
    link: { href: '/portfolio#blom', label: 'View case study →' },
    imageSrc: BLOM_MOCKUP,
    imageAlt: 'BLOM Cosmetics website and admin dashboard mockup',
  },
  {
    tag: '02 — Sales + Production System',
    headline: 'Custom orders <em>without the chaos.</em>',
    body:
      'Quote-to-production sales engine. Custom website, AI quote chatbot, CRM with auto-rep assignment, 12-stage production tracking, and automatic WhatsApp updates to customers.',
    chips: ['Quote Engine', 'CRM', 'Production Tracking', 'WhatsApp Automation'],
    link: { href: '/portfolio#recklessbear', label: 'View case study →' },
    imageSrc: RECKLESSBEAR_MOCKUP,
    imageAlt: 'RecklessBear quote engine and production dashboard mockup',
  },
  {
    tag: '03 — Wholesale E-commerce',
    headline: '700+ products live in <em>under 2 weeks.</em>',
    body:
      'Full e-commerce and admin built for a Johannesburg electronics importer. Retail and wholesale pricing on every product, automated stock analytics, order management, customer updates, and order notifications. Owner runs everything — no developer needed.',
    chips: ['E-commerce', 'Custom Admin', 'Wholesale Pricing', 'Stock Analytics', 'Owner-Editable'],
    link: { href: '/portfolio#cw', label: 'View case study →' },
    imageSrc: CW_MOCKUP,
    imageAlt: 'CW Electronics storefront and admin mockup',
  },
  {
    tag: '04 — Portfolio + Lead Capture',
    headline: 'Clean. Fast. <em>Lead-ready.</em>',
    body:
      'Portfolio site for a skin and brow studio with automated email lead capture. From brief to live in 4 days.',
    chips: ['Portfolio', 'Contact Form', 'Email Automation'],
    link: { href: '/portfolio#ameli', label: 'View case study →' },
    imageSrc: AMELI_MOCKUP,
    imageAlt: 'Ameli Designs portfolio site mockup',
  },
];

const STATS: StatItem[] = [
  { value: 60, suffix: 's', label: 'Quote-to-lead time', source: 'on RecklessBear' },
  { value: 24, suffix: '/7', label: 'Automated order updates', source: 'on BLOM' },
  { value: 12, label: 'Production stages tracked', source: 'on RecklessBear' },
  { value: 700, suffix: '+', label: 'Products live in under 2 weeks', source: 'on CW Electronics' },
];

export default function HomeWhite() {
  // Force body + html to render white while on the homepage so the existing
  // dark globals (body::after gradient, dotgrid canvas) never peek through.
  useEffect(() => {
    const prevBodyBg = document.body.style.backgroundColor;
    const prevHtmlBg = document.documentElement.style.backgroundColor;
    document.body.style.backgroundColor = '#FFFFFF';
    document.documentElement.style.backgroundColor = '#FFFFFF';
    return () => {
      document.body.style.backgroundColor = prevBodyBg;
      document.documentElement.style.backgroundColor = prevHtmlBg;
    };
  }, []);

  return (
    <div className="relative z-10 bg-white min-h-[100svh] font-['DM_Sans'] text-[#0A0A0F] antialiased overflow-x-hidden">
      {/* Page-level purple ambient — persists through all sections on scroll */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-[55%]"
          style={{
            background:
              'radial-gradient(1300px 700px at 50% 2%, rgba(123,63,228,0.10), transparent 60%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[50%]"
          style={{
            background:
              'radial-gradient(900px 600px at 70% 90%, rgba(123,63,228,0.07), transparent 65%)',
          }}
        />
      </div>

      <SEO
        title="Streamline Automations — Websites that work. Systems that scale."
        description="Custom websites and automation systems for South African businesses. Fast, clean, and ready to go. Based in the Vaal Triangle, serving all of SA."
      />

      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <WhiteNavbar />

      <main>
        <Hero />
        <ClientBar />
        <Services />
        <CaseStudyCycler slides={SLIDES} />
        <StatsStrip stats={STATS} />
        <FeaturedWork />
        <RentalCallout />
        <HowItWorks />
        <FinalCTA />
      </main>

      <WhiteFooter />
    </div>
  );
}
