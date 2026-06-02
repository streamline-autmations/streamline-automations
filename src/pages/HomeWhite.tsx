import { useEffect } from 'react';
import SEO from '../components/seo/SEO';
import SiteHeader from '../components/white/SiteHeader';
import HeroPortal from '../components/white/home/design/HeroPortal';
import TrustBar from '../components/white/home/design/TrustBar';
import IntroStatement from '../components/white/home/design/IntroStatement';
import ServicesRows from '../components/white/home/design/ServicesRows';
import CaseStudyCycler from '../components/white/home/CaseStudyCycler';
import StatsRow from '../components/white/home/design/StatsRow';
import AutomationFlowRow from '../components/white/home/design/AutomationFlowRow';
import RentalCallout from '../components/white/home/RentalCallout';
import FinalCTAOrbs from '../components/white/home/design/FinalCTAOrbs';
import SiteFooter from '../components/white/SiteFooter';
import AmbientDepth from '../components/white/home/design/AmbientDepth';
import type { CaseStudySlide } from '../types/case-study';

const BLOM_MOCKUP =
  'https://res.cloudinary.com/dtkiwrm6u/image/upload/v1779986676/1_k68mu6.png';
const RECKLESSBEAR_MOCKUP =
  'https://res.cloudinary.com/dtkiwrm6u/image/upload/v1779986676/2_n9aw8a.png';
const CW_MOCKUP =
  'https://res.cloudinary.com/dtkiwrm6u/image/upload/v1779986676/3_py5ioc.png';
const AMELI_MOCKUP =
  'https://res.cloudinary.com/dtkiwrm6u/image/upload/v1779986676/4_b8wyjj.png';

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

export default function HomeWhite() {
  // Force body + html white while on the homepage so the dark globals
  // (body::after gradient, dotgrid canvas) never peek through.
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
    <div
      id="top"
      className="relative z-10 min-h-[100svh] overflow-x-hidden bg-white font-['DM_Sans'] text-[#0A0A0F] antialiased"
    >
      <SEO
        title="Streamline Automations — Websites that work. Systems that scale."
        description="Custom websites and automation systems for South African businesses. Built by Christiaan Steffen in the Vaal Triangle. No upfront cost — rent monthly, own after 18 months."
      />

      <SiteHeader />

      <AmbientDepth />

      <main className="relative z-10">
        <HeroPortal />
        <TrustBar />
        <IntroStatement />
        <ServicesRows />
        <div id="work">
          <CaseStudyCycler slides={SLIDES} />
        </div>
        <StatsRow />
        <AutomationFlowRow />
        <RentalCallout />
        <FinalCTAOrbs />
      </main>

      <SiteFooter />
    </div>
  );
}
