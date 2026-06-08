import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import SiteHeader from '../components/white/SiteHeader';
import SiteFooter from '../components/white/SiteFooter';
import Button from '../components/white/ui/Button';
import AnimatedNumber from '../components/white/ui/AnimatedNumber';
import FinalCTA from '../components/white/home/FinalCTA';
import WordReveal from '../components/white/ui/WordReveal';
import MagneticCTA from '../components/white/ui/MagneticCTA';
import { fadeUp, viewport } from '../lib/motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const RECENT_WORK = [
  {
    label: 'BLOM Cosmetics',
    tag: 'E-commerce + Systems',
    img: '/assets/clients/blom/tile.webp',
    href: '/portfolio/blom-cosmetics',
  },
  {
    label: 'RecklessBear',
    tag: 'Sales + Production',
    img: '/assets/clients/recklessbear/tile.webp',
    href: '/portfolio/recklessbear',
  },
  {
    label: 'CW Electronics',
    tag: 'Wholesale E-commerce',
    img: '/assets/clients/cw-electronics/tile.webp',
    href: '/portfolio/cw-electronics',
  },
  {
    label: 'Ameli Designs',
    tag: 'Portfolio + Lead Capture',
    img: '/assets/clients/ameli/tile.webp',
    href: '/portfolio/ameli',
  },
];

const TOOLS = [
  { name: 'React 18', desc: 'Frontend framework' },
  { name: 'TypeScript', desc: 'Type-safe JS' },
  { name: 'Supabase', desc: 'Backend + auth + DB' },
  { name: 'n8n', desc: 'Automation workflows' },
  { name: 'Tailwind CSS', desc: 'Utility-first styling' },
  { name: 'Framer Motion', desc: 'UI animations' },
  { name: 'GSAP + Lenis', desc: 'Scroll magic' },
  { name: 'Vercel', desc: 'Deployment + CDN' },
];

const STATS = [
  { value: 8, suffix: '+', label: 'Clients delivered' },
  { value: 3, suffix: '', label: 'Years building in SA' },
  { value: 2, suffix: '', label: 'Weeks avg turnaround' },
  { value: 24, suffix: '/7', label: 'Automations running' },
];

export default function AboutWhite() {
  const founderRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: founderRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  return (
    <>
      <SiteHeader />
      <SEO
        title="About — Streamline Automations"
        description="Christiaan Steffen — solo founder building custom websites and automation systems for South African businesses from the Vaal Triangle."
      />
      <main className="bg-white min-h-[100svh] font-['DM_Sans']">

        {/* Hero — 50vh */}
        <section className="relative pt-40 md:pt-52 pb-16 md:pb-24 min-h-[50svh] flex items-start overflow-hidden">
          <div aria-hidden="true" className="gradient-mesh opacity-70" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[70%] pointer-events-none"
            style={{
              background:
                'radial-gradient(900px 500px at 50% 0%, rgba(123,63,228,0.09), transparent 70%)',
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6 w-full">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-5"
            >
              About
            </motion.span>
            <WordReveal
              as="h1"
              trigger="mount"
              segments={[{ text: 'Bartender turned' }, { text: 'automation founder.', serif: true }]}
              className="text-[40px] sm:text-[54px] md:text-[72px] font-['DM_Sans'] font-semibold
                         text-[#0A0A0F] tracking-[-0.03em] leading-[1.06] max-w-3xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.14 }}
              className="mt-6 text-[17px] md:text-[19px] font-['DM_Sans'] text-[#3D3D47] leading-[1.6] max-w-xl"
            >
              Christiaan Steffen. Solo founder. Vaal Triangle, Gauteng, South Africa.
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
              className="mt-12 hidden md:flex items-center gap-3"
            >
              <span className="text-[10px] font-['DM_Sans'] font-medium uppercase tracking-[0.18em] text-[#9E9EA8]">
                Scroll
              </span>
              <div className="relative w-12 h-px overflow-hidden">
                <span aria-hidden="true" className="absolute inset-0 bg-[#E8E8EC]" />
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-[#7B3FE4] to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity }}
                />
              </div>
              <span className="text-[10px] font-['DM_Sans'] font-medium uppercase tracking-[0.18em] text-[#9E9EA8]">
                to explore
              </span>
            </motion.div>
          </div>
        </section>

        {/* Full-width founder image — parallax */}
        <section ref={founderRef} className="overflow-hidden">
          <div className="max-w-6xl mx-auto px-6">
            <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-[#0A0A0F] border border-[#E8E8EC]">
              {/* Real founder portrait, gently parallaxed */}
              <motion.div
                style={{ y: imgY }}
                className="absolute inset-0 -top-[7.5%] h-[115%]"
              >
                <img
                  src="/assets/about/founder.webp"
                  alt="Christiaan Steffen, founder of Streamline Automations"
                  width={1066}
                  height={1600}
                  className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
                />
                {/* soft purple wash ties the editorial B&W shot into the brand */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(120deg, rgba(123,63,228,0.18), transparent 55%)' }}
                />
              </motion.div>
              <span className="absolute bottom-5 left-6 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-white/80">
                Christiaan Steffen
              </span>
            </div>
            <p className="mt-4 text-[12px] font-['DM_Sans'] text-[#9E9EA8] text-center tracking-[0.06em]">
              Working from the Vaal Triangle, since 2023.
            </p>
          </div>
        </section>

        {/* Asymmetric story */}
        <section className="py-24 md:py-32 bg-[#FAFAFA]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-start">

              {/* Left — story text */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE }}
                className="md:col-span-2"
              >
                <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-6">
                  The story
                </span>
                <div className="space-y-5 text-[15.5px] font-['DM_Sans'] text-[#3D3D47] leading-[1.72]">
                  <p>
                    I spent years behind a bar. Good job, steady income — then COVID shut
                    everything down. No income, nowhere to go, and suddenly a lot of time
                    to figure out what came next.
                  </p>
                  <p>
                    I taught myself to code. YouTube tutorials, free courses, then freelance
                    work — building sites for people who needed them. Each project taught me
                    something new. Each client had a problem I hadn't solved before.
                  </p>
                  <p>
                    Three years later I've built full e-commerce platforms, internal admin
                    systems, and automation flows that save clients hours every week. Not in
                    spite of having no formal training — partly because of it.
                  </p>
                  <p>
                    I run Streamline solo. When you hire me, you get me — not a junior dev
                    who's never spoken to you. Every line of code, every decision, every
                    update comes through me directly.
                  </p>
                </div>
              </motion.div>

              {/* Right — workspace image, tilted */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
                className="md:col-span-3"
                style={{ transform: 'rotate(-1.5deg)' }}
              >
                <div className="relative rounded-2xl overflow-hidden border border-[#E8E8EC] aspect-[4/3] bg-gradient-to-br from-[#F5F5F7] to-[#EDE6FF]">
                  {/* Branded placeholder panel — swap for a real workspace photo when ready */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-70"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, rgba(123,63,228,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(123,63,228,0.06) 1px, transparent 1px)',
                      backgroundSize: '32px 32px',
                      maskImage: 'radial-gradient(120% 100% at 50% 40%, #000, transparent 82%)',
                      WebkitMaskImage: 'radial-gradient(120% 100% at 50% 40%, #000, transparent 82%)',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-10 -left-8 h-48 w-48 rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(123,63,228,0.2), transparent 70%)' }}
                  />
                  <span className="absolute bottom-5 left-6 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.18em] text-[#7B3FE4]/60">
                    The workspace
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="bg-white border-y border-[#E8E8EC]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#E8E8EC]">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="p-8 md:p-10 text-center">
                  <div className="flex items-baseline justify-center gap-0.5 mb-1.5">
                    <AnimatedNumber
                      to={stat.value}
                      duration={1.3}
                      delay={i * 0.1}
                      className="text-[38px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em]"
                    />
                    {stat.suffix && (
                      <span className="text-[22px] font-['DM_Sans'] font-semibold text-[#7B3FE4]">
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] font-['DM_Sans'] text-[#9E9EA8]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent work strip */}
        <section className="py-24 md:py-32 bg-[#FAFAFA]">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex items-end justify-between mb-10"
            >
              <div>
                <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-3">
                  Recent work
                </span>
                <h2 className="text-[28px] md:text-[36px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em] leading-[1.1]">
                  A few things{' '}
                  <span className="font-['Instrument_Serif'] italic font-normal">I've built.</span>
                </h2>
              </div>
              <Link
                to="/portfolio"
                className="hidden md:inline-flex items-center gap-1.5 text-[13px] font-['DM_Sans'] font-medium text-[#6B6B7A] hover:text-[#7B3FE4] transition-colors"
              >
                See all →
              </Link>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {RECENT_WORK.map((item) => (
                <motion.div key={item.label} variants={fadeUp}>
                  <Link
                    to={item.href}
                    data-cursor="view"
                    className="group block rounded-xl overflow-hidden border border-[#E8E8EC] bg-[#F5F5F7]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.label}
                        loading="lazy"
                        draggable={false}
                        className="w-full h-full object-cover group-hover:scale-[1.06]
                                   transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      />
                      <div
                        className="absolute inset-0 bg-[#0A0A0F]/0 group-hover:bg-[#0A0A0F]/55
                                   transition-all duration-500 flex items-end p-3"
                      >
                        <span
                          className="text-[9px] font-['DM_Sans'] font-semibold uppercase tracking-[0.14em]
                                     text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          {item.tag}
                        </span>
                      </div>
                    </div>
                    <div className="px-3 py-2.5">
                      <p className="text-[12.5px] font-['DM_Sans'] font-semibold text-[#0A0A0F] group-hover:text-[#7B3FE4] transition-colors">
                        {item.label}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Tool cards — 2×4 grid */}
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
                The stack
              </span>
              <h2 className="text-[28px] md:text-[38px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em] leading-[1.1]">
                Tools I actually use.
              </h2>
              <p className="mt-3 text-[15px] font-['DM_Sans'] text-[#6B6B7A] max-w-lg leading-[1.6]">
                No bloat. No agency overhead. The right tools for fast, maintainable, production-grade work.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {TOOLS.map((tool) => (
                <motion.div
                  key={tool.name}
                  variants={fadeUp}
                  className="rounded-xl border border-[#E8E8EC] bg-[#FAFAFA] p-5
                             hover:border-[#D4D4DA] hover:bg-white hover:-translate-y-0.5
                             transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  <p className="text-[14px] font-['DM_Sans'] font-semibold text-[#0A0A0F] mb-1">
                    {tool.name}
                  </p>
                  <p className="text-[12px] font-['DM_Sans'] text-[#9E9EA8]">
                    {tool.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Location + contact strip */}
        <section className="py-16 md:py-20 bg-[#FAFAFA] border-t border-[#E8E8EC]">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
            >
              <div>
                <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-3">
                  Based in
                </span>
                <h2 className="text-[22px] md:text-[28px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em] leading-[1.15]">
                  Vaal Triangle, Gauteng, South Africa.
                </h2>
                <div className="mt-4 space-y-1.5">
                  <p className="text-[15px] font-['DM_Sans'] text-[#6B6B7A]">
                    <a
                      href="mailto:christiaan@streamline-automations.co.za"
                      className="hover:text-[#7B3FE4] transition-colors"
                    >
                      christiaan@streamline-automations.co.za
                    </a>
                  </p>
                  <p className="text-[15px] font-['DM_Sans'] text-[#6B6B7A]">
                    <a
                      href="https://wa.me/27687579940"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#7B3FE4] transition-colors"
                    >
                      WhatsApp: +27 68 757 9940
                    </a>
                  </p>
                </div>
              </div>
              <MagneticCTA strength={14}>
                <span data-cursor="view">
                  <Button href="/contact" size="lg">Book a Free Call</Button>
                </span>
              </MagneticCTA>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <FinalCTA />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
