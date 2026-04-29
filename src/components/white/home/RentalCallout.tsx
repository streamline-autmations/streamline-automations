import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedNumber from '../ui/AnimatedNumber';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function RentalCallout() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Section-level purple wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(900px 500px at 50% 50%, rgba(123,63,228,0.07), transparent 70%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="relative overflow-hidden rounded-3xl
                     p-10 md:p-14 lg:p-16 border border-[#E0D6FF]
                     shadow-[0_30px_80px_-30px_rgba(123,63,228,0.35)]"
          style={{
            background:
              'linear-gradient(135deg, #F4EEFF 0%, #ECE2FF 55%, #E5D6FF 100%)',
          }}
        >
          {/* Decorative purple aurora inside the panel */}
          <div
            aria-hidden="true"
            className="absolute -top-32 -right-20 w-[420px] h-[420px] rounded-full
                       bg-[#7B3FE4] blur-[120px] opacity-[0.18] pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 -left-20 w-[360px] h-[360px] rounded-full
                       bg-[#A77BFF] blur-[110px] opacity-[0.18] pointer-events-none"
          />

          {/* Faint dot grid for depth — only inside callout */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-[0.55]"
            style={{
              backgroundImage:
                'radial-gradient(rgba(123,63,228,0.18) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
              maskImage:
                'radial-gradient(ellipse 70% 60% at 100% 0%, rgba(0,0,0,0.6), transparent 70%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 70% 60% at 100% 0%, rgba(0,0,0,0.6), transparent 70%)',
            }}
          />

          <div className="relative grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-10 md:gap-14 items-center">
            <div>
              <span
                className="inline-flex items-center gap-2 text-[11px]
                           font-['DM_Sans'] font-medium uppercase tracking-[0.14em]
                           text-[#7B3FE4] bg-white/80 backdrop-blur-sm border border-white
                           px-3 py-1.5 rounded-full mb-6
                           shadow-[0_2px_12px_rgba(123,63,228,0.10)]"
              >
                <motion.span
                  className="inline-flex h-1.5 w-1.5 rounded-full bg-[#7B3FE4]"
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
                />
                New offering
              </span>

              <h3
                className="text-[30px] md:text-[40px] lg:text-[44px] font-['DM_Sans']
                           font-semibold text-[#0A0A0F] tracking-[-0.025em]
                           leading-[1.08] mb-5 max-w-[22ch]"
              >
                No upfront cost. Own your site after{' '}
                <span className="font-['Instrument_Serif'] italic font-normal text-[#7B3FE4]">
                  18 months.
                </span>
              </h3>

              <p className="text-[15.5px] md:text-[16.5px] font-['DM_Sans']
                            text-[#3D3D47] leading-[1.65] max-w-lg mb-8">
                Pay a small monthly fee. I build the site, handle the hosting,
                and after 18 months — it&apos;s yours. Full files, full control, no strings.
              </p>

              <Link
                to="/hosting"
                className="group inline-flex items-center gap-1.5 text-sm font-['DM_Sans']
                           font-medium text-[#7B3FE4] hover:text-[#6930D0]
                           transition-colors duration-200"
              >
                How it works
                <span
                  className="transition-transform duration-300
                             ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6 md:border-l md:border-[#D4C5FF] md:pl-10">
              <div className="flex flex-col gap-1">
                <span className="text-[34px] md:text-[44px] font-['DM_Sans'] font-semibold
                                 text-[#0A0A0F] tracking-[-0.02em] leading-none">
                  R
                  <AnimatedNumber to={699} duration={1.4} />
                  <span className="text-[#9E9EA8] text-[20px] md:text-[22px] font-normal ml-0.5">
                    /mo
                  </span>
                </span>
                <span className="text-[13px] font-['DM_Sans'] text-[#6B6B7A] mt-2.5">
                  Starting from
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[34px] md:text-[44px] font-['DM_Sans'] font-semibold
                                 text-[#0A0A0F] tracking-[-0.02em] leading-none">
                  <AnimatedNumber to={18} duration={1.2} delay={0.15} /> mo
                </span>
                <span className="text-[13px] font-['DM_Sans'] text-[#6B6B7A] mt-2.5">
                  Then you own it
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
