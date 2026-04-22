import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EASE = [0.22, 1, 0.36, 1];

export default function RentalCallout() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="relative overflow-hidden rounded-3xl bg-[#F5F5F7]
                     p-10 md:p-14 lg:p-16 border border-[#E8E8EC]"
        >
          <div className="relative grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-10 md:gap-14 items-center">
            <div>
              <span
                className="inline-flex items-center gap-2 text-[11px]
                           font-['DM_Sans'] font-medium uppercase tracking-[0.14em]
                           text-[#7B3FE4] bg-white border border-[#E8E8EC]
                           px-3 py-1.5 rounded-full mb-6"
              >
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#7B3FE4]" />
                New offering
              </span>

              <h3
                className="text-[30px] md:text-[40px] lg:text-[44px] font-['DM_Sans']
                           font-semibold text-[#0A0A0F] tracking-[-0.025em]
                           leading-[1.08] mb-5 max-w-[22ch]"
              >
                No upfront cost. Own your site after{' '}
                <span className="font-['Instrument_Serif'] italic font-normal">
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

            <div className="grid grid-cols-2 gap-6 md:border-l md:border-[#E8E8EC] md:pl-10">
              <div className="flex flex-col gap-1">
                <span className="text-[34px] md:text-[44px] font-['DM_Sans'] font-semibold
                                 text-[#0A0A0F] tracking-[-0.02em] leading-none">
                  R699
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
                  18 mo
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
