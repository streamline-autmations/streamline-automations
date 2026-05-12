import { motion } from 'framer-motion';
import SEO from '../components/seo/SEO';
import WhiteNavbar from '../components/white/Navbar';
import WhiteFooter from '../components/white/Footer';
import Button from '../components/white/ui/Button';
import AnimatedNumber from '../components/white/ui/AnimatedNumber';
import FinalCTA from '../components/white/home/FinalCTA';
import { fadeUp, viewport } from '../lib/motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STACK_PILLS = [
  'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion',
  'GSAP', 'Supabase', 'n8n', 'PayFast', 'Vercel', 'Cloudinary',
];

export default function AboutWhite() {
  return (
    <>
      <WhiteNavbar />
      <SEO
        title="About — Streamline Automations"
        description="Christiaan Steffen — solo founder building custom websites and automation systems for South African businesses from the Vaal Triangle."
      />
      <main className="bg-white min-h-[100svh] font-['DM_Sans']">

        {/* Hero */}
        <section className="pt-36 md:pt-44 pb-20 md:pb-28 relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[60%] pointer-events-none"
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
              About
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.06 }}
              className="text-[40px] sm:text-[54px] md:text-[68px] font-['DM_Sans'] font-semibold
                         text-[#0A0A0F] tracking-[-0.03em] leading-[1.07] max-w-3xl"
            >
              Bartender turned{' '}
              <span className="font-['Instrument_Serif'] italic font-normal text-[#7B3FE4]">
                automation founder.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.14 }}
              className="mt-6 text-[17px] md:text-[19px] font-['DM_Sans'] text-[#3D3D47] leading-[1.6] max-w-2xl"
            >
              Christiaan Steffen. Solo founder. Vaal Triangle, Gauteng, South Africa.
            </motion.p>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 md:py-32 bg-[#FAFAFA]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-6">
                  The story
                </span>
                <div className="space-y-5 text-[16px] font-['DM_Sans'] text-[#3D3D47] leading-[1.7]">
                  <p>
                    I spent years behind a bar. Good job, steady income — then COVID shut
                    everything down. No income, nowhere to go, and suddenly a lot of time
                    to figure out what came next.
                  </p>
                  <p>
                    I taught myself to code. Started with YouTube tutorials and free courses,
                    then moved into freelance work — building simple sites for people who needed
                    them. Each project taught me something new. Each client had a problem I
                    hadn't solved before.
                  </p>
                  <p>
                    Three years later I've built full e-commerce platforms, internal admin
                    systems, automation flows that save clients hours every week, and sites
                    that have genuinely changed how businesses operate. Not in spite of having
                    no formal training — partly because of it. I learned exactly what works.
                  </p>
                  <p>
                    I run Streamline as a solo agency. That means when you hire me, you get me —
                    not a junior dev who's never spoken to you. Every line of code, every
                    decision, every update comes through me directly.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                className="space-y-6"
              >
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 8, suffix: '+', label: 'Clients delivered' },
                    { value: 3, suffix: '', label: 'Years building in SA' },
                    { value: 2, suffix: '', label: 'Weeks avg turnaround' },
                    { value: 24, suffix: '/7', label: 'Systems running' },
                  ].map((stat, i) => (
                    <div
                      key={stat.label}
                      className="bg-white border border-[#E8E8EC] rounded-2xl p-6"
                    >
                      <div className="flex items-baseline gap-0.5 mb-1">
                        <AnimatedNumber
                          to={stat.value}
                          duration={1.3}
                          delay={i * 0.1}
                          className="text-[32px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em]"
                        />
                        {stat.suffix && (
                          <span className="text-[20px] font-['DM_Sans'] font-semibold text-[#7B3FE4]">
                            {stat.suffix}
                          </span>
                        )}
                      </div>
                      <p className="text-[12.5px] font-['DM_Sans'] text-[#9E9EA8] leading-snug">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Location */}
                <div className="bg-white border border-[#E8E8EC] rounded-2xl p-6">
                  <p className="text-[11px] font-['DM_Sans'] font-semibold uppercase tracking-[0.12em] text-[#9E9EA8] mb-2">
                    Based in
                  </p>
                  <p className="text-[16px] font-['DM_Sans'] font-semibold text-[#0A0A0F]">
                    Vaal Triangle, Gauteng
                  </p>
                  <p className="text-[14px] font-['DM_Sans'] text-[#6B6B7A] mt-1">
                    South Africa · Remote-first · Serve clients nationwide
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stack */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-10"
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-4">
                The stack
              </span>
              <h2 className="text-[32px] md:text-[40px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em] leading-[1.1]">
                Tools I actually use.
              </h2>
              <p className="mt-4 text-[15.5px] font-['DM_Sans'] text-[#6B6B7A] max-w-xl leading-[1.6]">
                No bloat. No agency overhead. Just the right tools for fast, maintainable,
                production-grade work.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
              className="flex flex-wrap gap-2.5"
            >
              {STACK_PILLS.map((pill) => (
                <motion.span
                  key={pill}
                  variants={fadeUp}
                  className="text-[13px] font-['DM_Sans'] font-medium text-[#3D3D47]
                             bg-[#F5F5F7] border border-[#E8E8EC] rounded-full px-4 py-2"
                >
                  {pill}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact strip */}
        <section className="py-20 md:py-24 bg-[#FAFAFA] border-t border-[#E8E8EC]">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
            >
              <div>
                <h2 className="text-[28px] md:text-[36px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em] leading-[1.15]">
                  Want to work together?
                </h2>
                <div className="mt-4 space-y-1.5">
                  <p className="text-[15px] font-['DM_Sans'] text-[#6B6B7A]">
                    <a href="mailto:christian@streamline-automations.agency"
                       className="hover:text-[#7B3FE4] transition-colors">
                      christian@streamline-automations.agency
                    </a>
                  </p>
                  <p className="text-[15px] font-['DM_Sans'] text-[#6B6B7A]">
                    <a href="https://wa.me/27633063861"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="hover:text-[#7B3FE4] transition-colors">
                      WhatsApp: +27 63 306 3861
                    </a>
                  </p>
                </div>
              </div>
              <Button href="/contact" size="lg">Book a Free Call</Button>
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
