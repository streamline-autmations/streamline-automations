import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrambleText from '../components/white/ui/ScrambleText';
import SEO from '../components/seo/SEO';
import WhiteNavbar from '../components/white/Navbar';
import WhiteFooter from '../components/white/Footer';
import PortfolioCard from '../components/white/ui/PortfolioCard';
import FinalCTA from '../components/white/home/FinalCTA';
import { fadeUp, viewport } from '../lib/motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Cloudinary placeholder URLs — replace with real screenshots when uploaded
const BLOM_IMG = 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851097/Blom-hero_image_jaqcoz.png';
const RECKLESS_IMG = 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851117/Reckless-hero_image_sbwhoj.png';
const AMELI_IMG = 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851091/Ameli-hero_image_sxtayp.png';
const CW_IMG = 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851097/Blom-hero_image_jaqcoz.png';
const JJ_IMG = 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851097/Blom-hero_image_jaqcoz.png';
const NSA_IMG = 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851097/Blom-hero_image_jaqcoz.png';
const TUSCANY_IMG = 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851091/Ameli-hero_image_sxtayp.png';
const NOMAD_IMG = 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851091/Ameli-hero_image_sxtayp.png';

type FilterKey = 'All' | 'E-commerce' | 'Systems' | 'Portfolio' | 'Design';

interface Project {
  title: string;
  description: string;
  category: string;
  filterKey: FilterKey;
  tech: string[];
  imageSrc: string;
  href: string;
  retainer?: boolean;
}

const PROJECTS: Project[] = [
  {
    title: 'BLOM Cosmetics',
    description:
      'Full e-commerce store + admin dashboard + BLOM Academy course platform + email + WhatsApp automation. PayFast, ShipLogic, Supabase, n8n — all on one backend.',
    category: 'E-commerce + Systems',
    filterKey: 'E-commerce',
    tech: ['React', 'Supabase', 'n8n', 'PayFast', 'ShipLogic'],
    imageSrc: BLOM_IMG,
    href: '/portfolio#blom',
    retainer: true,
  },
  {
    title: 'RecklessBear Apparel',
    description:
      'Custom quote engine, CRM, 12-stage Trello production tracking, WhatsApp order updates, and an AI-powered quoting assistant via Voiceflow.',
    category: 'Systems + Web',
    filterKey: 'Systems',
    tech: ['React', 'Supabase', 'WhatsApp API', 'Voiceflow', 'n8n'],
    imageSrc: RECKLESS_IMG,
    href: '/portfolio#recklessbear',
    retainer: true,
  },
  {
    title: 'CW Electronics',
    description:
      '700+ products live in under 2 weeks. Full e-commerce with retail + wholesale pricing, stock analytics, order management, customer updates, and a custom admin panel.',
    category: 'E-commerce + Admin',
    filterKey: 'E-commerce',
    tech: ['React', 'Supabase', 'PayFast'],
    imageSrc: CW_IMG,
    href: '/portfolio#cw-electronics',
    retainer: true,
  },
  {
    title: 'Ameli Designs',
    description:
      'Portfolio site for a skin and brow studio. Clean, fast, automated lead capture. Built and handed over in 4 days.',
    category: 'Portfolio + Web',
    filterKey: 'Portfolio',
    tech: ['React', 'n8n'],
    imageSrc: AMELI_IMG,
    href: '/portfolio#ameli',
  },
  {
    title: 'JJ Glasswork',
    description:
      'Service site with contact form and automated email lead notifications. Clean, mobile-first, no fluff.',
    category: 'Service Site',
    filterKey: 'Portfolio',
    tech: ['React', 'n8n'],
    imageSrc: JJ_IMG,
    href: '/portfolio#jj-glasswork',
  },
  {
    title: 'NSA Mining',
    description:
      'Internal employee gift eligibility system — lookup by ID, printable gift slips, manager reporting dashboard. Built for a large mining operation.',
    category: 'Internal Systems',
    filterKey: 'Systems',
    tech: ['React', 'Supabase'],
    imageSrc: NSA_IMG,
    href: '/portfolio#nsa-mining',
  },
  {
    title: 'Tuscany SA',
    description:
      'Email hosting, domain management, IT support, logo design, and email banner. Full digital setup for a South African hospitality brand.',
    category: 'Design + IT',
    filterKey: 'Design',
    tech: ['Email Hosting', 'Design'],
    imageSrc: TUSCANY_IMG,
    href: '/portfolio#tuscany',
  },
  {
    title: 'African Nomad',
    description:
      'Logo design, sublimation artwork, banner design, and social media content creation for a South African lifestyle brand.',
    category: 'Brand Design',
    filterKey: 'Design',
    tech: ['Branding', 'Social Media'],
    imageSrc: NOMAD_IMG,
    href: '/portfolio#african-nomad',
  },
];

const FILTERS: FilterKey[] = ['All', 'E-commerce', 'Systems', 'Portfolio', 'Design'];

export default function PortfolioWhite() {
  const [active, setActive] = useState<FilterKey>('All');

  const visible = active === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.filterKey === active);

  return (
    <>
      <WhiteNavbar />
      <SEO
        title="Portfolio — Streamline Automations"
        description="Real client work. Custom websites, automation systems, and e-commerce builds for South African businesses."
      />
      <main className="bg-white min-h-[100svh] font-['DM_Sans']">

        {/* Hero */}
        <section className="pt-36 md:pt-44 pb-20 md:pb-28 relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[55%] pointer-events-none"
            style={{
              background:
                'radial-gradient(900px 500px at 50% 0%, rgba(123,63,228,0.08), transparent 70%)',
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-5"
            >
              Portfolio
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.06 }}
              className="text-[40px] sm:text-[54px] md:text-[68px] font-['DM_Sans'] font-semibold
                         text-[#0A0A0F] tracking-[-0.03em] leading-[1.07] max-w-3xl"
            >
              <ScrambleText text="Real sites." trigger="mount" delay={760} />{' '}
              <span className="font-['Instrument_Serif'] italic font-normal text-[#7B3FE4]">
                Real clients.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.14 }}
              className="mt-6 text-[17px] md:text-[19px] font-['DM_Sans'] text-[#3D3D47] leading-[1.6] max-w-2xl"
            >
              Eight clients. Every one of them got something custom — no templates, no
              drag-and-drop. Here's the work.
            </motion.p>
          </div>
        </section>

        {/* Filter bar */}
        <section className="sticky top-16 z-30 bg-white/90 backdrop-blur border-b border-[#E8E8EC]">
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`flex-shrink-0 text-[12px] font-['DM_Sans'] font-medium px-4 py-2 rounded-full
                            border transition-all duration-200 min-h-[36px] ${
                  active === f
                    ? 'bg-[#7B3FE4] text-white border-[#7B3FE4]'
                    : 'bg-white text-[#6B6B7A] border-[#E8E8EC] hover:border-[#D4D4DA] hover:text-[#0A0A0F]'
                }`}
              >
                {f}
              </button>
            ))}
            <span className="ml-auto flex-shrink-0 text-[12px] font-['DM_Sans'] text-[#9E9EA8]">
              {visible.length} project{visible.length !== 1 ? 's' : ''}
            </span>
          </div>
        </section>

        {/* Grid */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {visible.map((project) => (
                  <PortfolioCard
                    key={project.title}
                    {...project}
                    retainerBadge={project.retainer}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Callout */}
        <section className="py-16 md:py-20 bg-[#FAFAFA] border-t border-[#E8E8EC]">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div>
                <p className="text-[18px] md:text-[20px] font-['DM_Sans'] font-semibold text-[#0A0A0F] leading-[1.3]">
                  Want to be next?
                </p>
                <p className="mt-1.5 text-[15px] font-['DM_Sans'] text-[#6B6B7A]">
                  Book a free call and I'll scope exactly what you need.
                </p>
              </div>
              <a
                href="/contact"
                className="flex-shrink-0 inline-flex items-center justify-center px-7 py-3.5
                           bg-[#7B3FE4] hover:bg-[#6930D0] text-white text-[14px]
                           font-['DM_Sans'] font-semibold rounded-full transition-colors
                           duration-200 min-h-[48px]"
              >
                Book a Free Call
              </a>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <FinalCTA />
          </div>
        </section>
      </main>
      <WhiteFooter />
    </>
  );
}
