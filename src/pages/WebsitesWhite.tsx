import { motion } from 'framer-motion';
import ScrambleText from '../components/white/ui/ScrambleText';
import SEO from '../components/seo/SEO';
import WhiteNavbar from '../components/white/Navbar';
import WhiteFooter from '../components/white/Footer';
import Button from '../components/white/ui/Button';
import FinalCTA from '../components/white/home/FinalCTA';
import PortfolioCard from '../components/white/ui/PortfolioCard';
import { fadeUp, viewport } from '../lib/motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const WHAT_I_BUILD = [
  {
    title: 'Portfolio sites',
    desc: 'For creatives, studios, and freelancers. Clean, fast, built to impress.',
  },
  {
    title: 'Service business sites',
    desc: 'Plumbers, salons, gyms, contractors. Clear services. Clear CTAs.',
  },
  {
    title: 'E-commerce stores',
    desc: 'Full Shopify-alternative builds. Custom admin. Owner-editable.',
  },
  {
    title: 'Restaurant & hospitality',
    desc: 'Menus, bookings, location info. No outdated PDFs.',
  },
  {
    title: 'Landing pages',
    desc: 'Single-page conversion machines. Fast to ship, fast to test.',
  },
  {
    title: 'Booking pages',
    desc: 'For studios, consultants, and service businesses.',
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
    description: 'Full e-commerce + admin + course platform + WhatsApp automation on one Supabase backend.',
    category: 'E-commerce + Systems',
    tech: ['React', 'Supabase', 'n8n'],
    imageSrc: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851097/Blom-hero_image_jaqcoz.png',
    href: '/portfolio#blom',
  },
  {
    title: 'RecklessBear Apparel',
    description: 'Custom quote engine, CRM, 12-stage production tracking, and WhatsApp order updates.',
    category: 'Systems + Web',
    tech: ['React', 'Supabase', 'WhatsApp API'],
    imageSrc: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851117/Reckless-hero_image_sbwhoj.png',
    href: '/portfolio#recklessbear',
  },
  {
    title: 'Ameli Designs',
    description: 'Portfolio site for a skin and brow studio. Automated lead capture. 4-day build.',
    category: 'Portfolio + Web',
    tech: ['React', 'n8n'],
    imageSrc: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851091/Ameli-hero_image_sxtayp.png',
    href: '/portfolio#ameli',
  },
];

export default function WebsitesWhite() {
  return (
    <>
      <WhiteNavbar />
      <SEO
        title="Web Design & Creation — Streamline Automations"
        description="Custom websites for South African businesses. Fast, mobile-first, and built to convert. No templates. No drag-and-drop."
      />
      <main className="bg-white min-h-[100svh] font-['DM_Sans']">

        {/* Hero */}
        <section className="pt-36 md:pt-44 pb-24 md:pb-32 relative overflow-hidden">
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
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.06 }}
              className="text-[40px] sm:text-[54px] md:text-[68px] font-['DM_Sans'] font-semibold
                         text-[#0A0A0F] tracking-[-0.03em] leading-[1.07] max-w-3xl"
            >
              <ScrambleText text="Websites built to" trigger="mount" delay={760} />{' '}
              <span className="font-['Instrument_Serif'] italic font-normal text-[#7B3FE4]">
                convert.
              </span>
            </motion.h1>
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
              className="mt-10"
            >
              <Button href="/contact" size="lg">Book a Free Call</Button>
            </motion.div>
          </div>
        </section>

        {/* What I Build */}
        <section className="py-24 md:py-32 bg-[#FAFAFA]">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-12"
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-4">
                What I build
              </span>
              <h2 className="text-[32px] md:text-[44px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em] leading-[1.1]">
                Six types. One standard of quality.
              </h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8"
            >
              {WHAT_I_BUILD.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="border-t border-[#E8E8EC] pt-6"
                >
                  <p className="text-[16px] font-['DM_Sans'] font-semibold text-[#0A0A0F] mb-1.5">
                    {item.title}
                  </p>
                  <p className="text-[14.5px] font-['DM_Sans'] text-[#6B6B7A] leading-[1.6]">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* The Process */}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {PROCESS.map((p, i) => (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, ease: EASE, delay: i * 0.07 }}
                >
                  <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-[#9E9EA8] mb-3">
                    {p.step}
                  </span>
                  <p className="text-[18px] font-['DM_Sans'] font-semibold text-[#0A0A0F] mb-2 tracking-[-0.01em]">
                    {p.title}
                  </p>
                  <p className="text-[14px] font-['DM_Sans'] text-[#6B6B7A] leading-[1.6]">
                    {p.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Investment */}
        <section className="py-24 md:py-32 bg-[#FAFAFA]">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-4">
                What it costs
              </span>
              <h2 className="text-[32px] md:text-[44px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em] leading-[1.1] max-w-2xl">
                Most websites land between{' '}
                <span className="font-['Instrument_Serif'] italic font-normal">R5,000 – R20,000.</span>
              </h2>
              <p className="mt-6 text-[16px] font-['DM_Sans'] text-[#3D3D47] leading-[1.65] max-w-xl">
                Final price depends on scope. Simple service sites start at R5,000. Custom
                e-commerce with admin can go up to R20,000. Book a call and I'll quote you
                in 24 hours.
              </p>
              <p className="mt-5 text-[14px] font-['DM_Sans'] text-[#6B6B7A] max-w-xl leading-[1.6]">
                Don't have budget upfront? Roll it into a monthly — own the site after 18 months.{' '}
                <a href="/hosting" className="text-[#7B3FE4] underline underline-offset-2 hover:text-[#6930D0] transition-colors">
                  Ask me about rental options.
                </a>
              </p>
              <div className="mt-8">
                <Button href="/contact" variant="primary">Get a quote</Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Recent Work */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-12"
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-4">
                Recent work
              </span>
              <h2 className="text-[32px] md:text-[44px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em] leading-[1.1]">
                Real sites. Real clients.
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {RECENT_WORK.map((project) => (
                <PortfolioCard key={project.title} {...project} />
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
              className="mt-10 text-center"
            >
              <a
                href="/portfolio"
                className="group inline-flex items-center gap-1.5 text-sm font-['DM_Sans'] font-medium text-[#0A0A0F] hover:text-[#7B3FE4] transition-colors"
              >
                See all work
                <span className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">→</span>
              </a>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-[#FAFAFA]">
          <div className="max-w-5xl mx-auto px-6">
            <FinalCTA />
          </div>
        </section>
      </main>
      <WhiteFooter />
    </>
  );
}
