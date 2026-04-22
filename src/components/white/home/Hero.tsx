import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const EASE = [0.22, 1, 0.36, 1];

export default function Hero() {
  return (
    <section className="relative pt-36 md:pt-44 pb-24 md:pb-32 overflow-hidden">
      {/* Faint radial wash — nothing more */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.45]"
        style={{
          background:
            'radial-gradient(900px 500px at 50% -10%, rgba(123,63,228,0.07), transparent 70%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-center gap-3 mb-7"
        >
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#7B3FE4]" />
          <span className="text-[11px] font-['DM_Sans'] font-medium uppercase
                           tracking-[0.14em] text-[#9E9EA8]">
            Web Design &amp; Automation · Vaal Triangle, SA
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.05 }}
          className="text-[44px] leading-[1.05] sm:text-[56px] md:text-[76px] lg:text-[88px]
                     font-['DM_Sans'] font-semibold text-[#0A0A0F]
                     tracking-[-0.035em] max-w-4xl"
        >
          Websites that work.{' '}
          <span className="font-['Instrument_Serif'] italic font-normal text-[#0A0A0F]">
            Systems
          </span>{' '}
          that scale.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
          className="mt-7 text-[17px] md:text-[19px] font-['DM_Sans'] text-[#3D3D47]
                     leading-[1.6] max-w-2xl"
        >
          I build custom websites and automation systems for South African businesses
          that are done doing everything manually. Fast, clean, and ready to go.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <Button href="/contact" size="lg">
            Book a Free Call
          </Button>
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-1.5 px-2 py-3 text-sm
                       font-['DM_Sans'] font-medium text-[#0A0A0F]
                       hover:text-[#7B3FE4] transition-colors duration-200"
          >
            See the work
            <span
              className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                         group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.div>

        {/* Stat row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
          className="mt-16 md:mt-20 flex flex-wrap items-center gap-x-2 gap-y-3
                     text-[13px] font-['DM_Sans'] text-[#6B6B7A]"
        >
          <span className="font-medium text-[#0A0A0F]">8+</span>
          <span>clients delivered</span>
          <span className="text-[#D4D4DA] mx-2">·</span>
          <span className="font-medium text-[#0A0A0F]">3 years</span>
          <span>building in SA</span>
          <span className="text-[#D4D4DA] mx-2">·</span>
          <span className="font-medium text-[#0A0A0F]">2 weeks</span>
          <span>average turnaround</span>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="relative max-w-6xl mx-auto px-6 mt-24 md:mt-32">
        <div className="h-px bg-[#E8E8EC]" />
      </div>
    </section>
  );
}
