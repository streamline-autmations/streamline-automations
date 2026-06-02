import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import SiteHeader from '../components/white/SiteHeader';
import SiteFooter from '../components/white/SiteFooter';
import Button from '../components/white/ui/Button';
import FinalCTA from '../components/white/home/FinalCTA';
import PortfolioCard from '../components/white/ui/PortfolioCard';
import WordReveal from '../components/white/ui/WordReveal';
import MagneticCTA from '../components/white/ui/MagneticCTA';
import ShowcaseZoom from '../components/white/home/ShowcaseZoom';
import { fadeUp, viewport } from '../lib/motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Brand-tinted gradient panels for the "What I build" cards — no stock /
// placeholder imagery (real screenshots only live in the portfolio).
const PANELS = [
  'linear-gradient(135deg, #F0EBFF 0%, #F5F5F7 100%)',
  'linear-gradient(135deg, #F5F5F7 0%, #EDE6FF 100%)',
  'linear-gradient(135deg, #F3EEFF 0%, #FAFAFA 100%)',
];

const WHAT_I_BUILD = [
  {
    title: 'Portfolio sites',
    desc: 'For creatives, studios, and freelancers. Clean, fast, built to impress.',
    image: 'https://placehold.co/800x600/F0EBFF/7B3FE4?text=Portfolio',
  },
  {
    title: 'Service business sites',
    desc: 'Plumbers, salons, gyms, contractors. Clear services. Clear CTAs.',
    image: 'https://placehold.co/800x600/F5F5F7/9E9EA8?text=Service+Business',
  },
  {
    title: 'E-commerce stores',
    desc: 'Full Shopify-alternative builds. Custom admin. Owner-editable.',
    image: 'https://placehold.co/800x600/F0EBFF/7B3FE4?text=E-commerce',
  },
  {
    title: 'Restaurant & hospitality',
    desc: 'Menus, bookings, location info. No outdated PDFs.',
    image: 'https://placehold.co/800x600/F5F5F7/9E9EA8?text=Restaurant',
  },
  {
    title: 'Landing pages',
    desc: 'Single-page conversion machines. Fast to ship, fast to test.',
    image: 'https://placehold.co/800x600/F0EBFF/7B3FE4?text=Landing+Page',
  },
  {
    title: 'Booking pages',
    desc: 'For studios, consultants, and service businesses.',
    image: 'https://placehold.co/800x600/F5F5F7/9E9EA8?text=Booking',
  },
];

const PROCESS = [
  {
    step: '01',
    title: 'We talk',
    desc: 'Free 30-minute call to scope exactly what you need. No fluff.',
  },
  {
    step: '02',
    title: 'I design + build',
    desc: 'You get updates throughout. Nothing ships without your sign-off.',
  },
  {
    step: '03',
    title: 'You review',
    desc: 'One round of revisions included. We get it right.',
  },
  {
    step: '04',
    title: 'Goes live',
    desc: "Site launches. I'm on retainer if you want ongoing support.",
  },
];

const RECENT_WORK = [
  {
    title: 'BLOM Cosmetics',
    description:
      'Full e-commerce + admin + course platform + WhatsApp automation on one Supabase backend.',
    category: 'E-commerce + Systems',
    tech: ['React', 'Supabase', 'n8n'],
    imageSrc:
      'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851097/Blom-hero_image_jaqcoz.png',
    href: '/portfolio#blom',
    retainerBadge: true,
  },
  {
    title: 'RecklessBear Apparel',
    description:
      'Custom quote engine, CRM, 12-stage production tracking, and WhatsApp order updates.',
    category: 'Systems + Web',
    tech: ['React', 'Supabase', 'WhatsApp API'],
    imageSrc:
      'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851117/Reckless-hero_image_sbwhoj.png',
    href: '/portfolio#recklessbear',
    retainerBadge: true,
  },
  {
    title: 'Ameli Designs',
    description:
      'Portfolio site for a skin and brow studio. Automated lead capture. 4-day build.',
    category: 'Portfolio + Web',
    tech: ['React', 'n8n'],
    imageSrc:
      'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851091/Ameli-hero_image_sxtayp.png',
    href: '/portfolio#ameli',
  },
];

export default function WebsitesWhite() {
  return (
    <>
      <SiteHeader />
      <SEO
        title="Web Design & Creation — Streamline Automations"
        description="Custom websites for South African businesses. Fast, mobile-first, and built to convert. No templates. No drag-and-drop."
      />
      <main className="bg-white min-h-[100svh] font-['DM_Sans']">

        {/* Hero */}
        <section className="pt-36 md:pt-44 pb-24 md:pb-32 relative overflow-hidden">
          <div aria-hidden="true" className="gradient-mesh opacity-70" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[60%] pointer-events-none"
            style={{
              background:
                'radial-gradient(900px 500px at 50% 0%, rgba(123,63,228,0.09), transparent 70%)',
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-5"
            >
              Web design &amp; creation
            </motion.span>
            <WordReveal
              as="h1"
              trigger="mount"
              segments={[{ text: 'Websites built to' }, { text: 'convert.', serif: true }]}
              className="text-[40px] sm:text-[54px] md:text-[68px] font-['DM_Sans'] font-semibold
                         text-[#0A0A0F] tracking-[-0.03em] leading-[1.07] max-w-3xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.14 }}
              className="mt-6 text-[17px] md:text-[19px] font-['DM_Sans'] text-[#3D3D47] leading-[1.6] max-w-2xl"
            >
              Clean, fast, custom-coded sites for South African businesses. No templates. No
              drag-and-drop. Just real code that ranks and sells.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <MagneticCTA strength={14}>
                <span data-cursor="view">
                  <Button href="/contact" size="lg">Book a Free Call</Button>
                </span>
              </MagneticCTA>
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-1.5 px-2 py-4 text-[15px]
                           font-['DM_Sans'] font-medium text-[#6B6B7A] hover:text-[#7B3FE4] transition-colors"
              >
                See the work
                <span className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* What I Build — image cards */}
        <section className="py-24 md:py-32 bg-[#FAFAFA]">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-14"
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-4">
                What I build
              </span>
              <h2 className="text-[32px] md:text-[44px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em] leading-[1.1]">
                Six types.{' '}
                <span className="font-['Instrument_Serif'] italic font-normal">One standard</span>
                {' '}of quality.
              </h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
            >
              {WHAT_I_BUILD.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="group rounded-2xl border border-[#E8E8EC] bg-white overflow-hidden
                             hover:border-[#D4D4DA] hover:shadow-[0_8px_32px_rgba(123,63,228,0.08)]
                             hover:-translate-y-0.5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* brand gradient panel (scales on hover) */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                      style={{ background: PANELS[i % PANELS.length] }}
                    />
                    {/* faint graph-paper grid for depth */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-70"
                      style={{
                        backgroundImage:
                          'linear-gradient(to right, rgba(123,63,228,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(123,63,228,0.07) 1px, transparent 1px)',
                        backgroundSize: '26px 26px',
                        maskImage: 'radial-gradient(120% 90% at 50% 30%, #000, transparent 80%)',
                        WebkitMaskImage: 'radial-gradient(120% 90% at 50% 30%, #000, transparent 80%)',
                      }}
                    />
                    {/* soft purple bloom */}
                    <div
                      aria-hidden="true"
                      className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full blur-2xl"
                      style={{ background: 'radial-gradient(circle, rgba(123,63,228,0.22), transparent 70%)' }}
                    />
                    {/* serif index numeral */}
                    <span className="absolute left-5 top-4 font-['Instrument_Serif'] italic text-[34px] leading-none text-[#7B3FE4]/45">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-[15px] font-['DM_Sans'] font-semibold text-[#0A0A0F] mb-1.5">
                      {item.title}
                    </p>
                    <p className="text-[13.5px] font-['DM_Sans'] text-[#6B6B7A] leading-[1.6]">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Signature scroll moment — real client build in a tilted browser frame */}
        <ShowcaseZoom />

        {/* The Process — vertical timeline */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-14"
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-4">
                The process
              </span>
              <h2 className="text-[32px] md:text-[44px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em] leading-[1.1]">
                Four steps. No surprises.
              </h2>
            </motion.div>

            <div className="relative max-w-2xl">
              {/* Dashed connector line */}
              <div
                aria-hidden="true"
                className="absolute left-7 top-8 bottom-8 w-px"
                style={{
                  borderLeft: '2px dashed #E8E8EC',
                }}
              />

              <div className="space-y-0">
                {PROCESS.map((p, i) => (
                  <motion.div
                    key={p.step}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
                    className="flex gap-8 pb-12 last:pb-0"
                  >
                    {/* Step dot */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white border-2 border-[#E8E8EC]
                                     flex items-center justify-center z-10 relative
                                     shadow-[0_0_0_4px_white]">
                      <span className="text-[12px] font-['DM_Sans'] font-bold text-[#7B3FE4] tracking-[0.04em]">
                        {p.step}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="pt-3.5">
                      <p className="text-[17px] font-['DM_Sans'] font-semibold text-[#0A0A0F] mb-1.5 tracking-[-0.01em]">
                        {p.title}
                      </p>
                      <p className="text-[14.5px] font-['DM_Sans'] text-[#6B6B7A] leading-[1.65]">
                        {p.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Rental model callout — no pricing numbers */}
        <section className="py-24 md:py-32 bg-[#F0EBFF]">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="max-w-2xl"
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-4">
                How it works
              </span>
              <h2 className="text-[32px] md:text-[44px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em] leading-[1.1]">
                No upfront cost.{' '}
                <span className="font-['Instrument_Serif'] italic font-normal">Pay monthly.</span>
              </h2>
              <div className="mt-8 space-y-4">
                {[
                  'I build your site for free. You pay a flat monthly fee.',
                  'Hosting, SSL, domain, and updates are all included.',
                  'After 18 months, the site is yours — outright. Full files, no strings.',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 mt-0.5 w-4 h-4 text-[#7B3FE4]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <p className="text-[15.5px] font-['DM_Sans'] text-[#3D3D47] leading-[1.6]">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button href="/hosting">See rental tiers</Button>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-1.5 px-2 py-4 text-[15px]
                             font-['DM_Sans'] font-medium text-[#6B6B7A] hover:text-[#7B3FE4] transition-colors"
                >
                  Get a custom quote
                  <span className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Recent Work — 2-col editorial grid */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex items-end justify-between mb-12"
            >
              <div>
                <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-4">
                  Recent work
                </span>
                <h2 className="text-[32px] md:text-[44px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em] leading-[1.1]">
                  Real sites. Real clients.
                </h2>
              </div>
              <Link
                to="/portfolio"
                className="hidden md:inline-flex items-center gap-1.5 text-[13px] font-['DM_Sans'] font-medium text-[#6B6B7A] hover:text-[#7B3FE4] transition-colors"
              >
                See all →
              </Link>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RECENT_WORK.map((project) => (
                <PortfolioCard key={project.title} {...project} />
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
              className="mt-8 md:hidden text-center"
            >
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-1.5 text-sm font-['DM_Sans'] font-medium text-[#6B6B7A] hover:text-[#7B3FE4] transition-colors"
              >
                See all work
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-[#FAFAFA]">
          <div className="max-w-5xl mx-auto px-6">
            <FinalCTA />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
