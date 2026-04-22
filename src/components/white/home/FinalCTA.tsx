import { motion } from 'framer-motion';
import Button from '../ui/Button';

const EASE = [0.22, 1, 0.36, 1];

export default function FinalCTA() {
  return (
    <section className="py-32 md:py-40">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-[36px] leading-[1.08] sm:text-[48px] md:text-[60px] lg:text-[68px]
                     font-['DM_Sans'] font-semibold text-[#0A0A0F]
                     tracking-[-0.03em] max-w-[22ch] mx-auto"
        >
          Ready to stop doing everything{' '}
          <span className="font-['Instrument_Serif'] italic font-normal">
            manually?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
          className="mt-7 text-[16px] md:text-[17px] font-['DM_Sans']
                     text-[#6B6B7A] leading-[1.65] max-w-md mx-auto"
        >
          Book a free 30-minute call. No pitch, no pressure — just a plan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          className="mt-10 flex flex-col items-center gap-5"
        >
          <Button href="/contact" size="lg">
            Book a Free Call
          </Button>

          <a
            href="https://wa.me/27633063861"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13.5px] font-['DM_Sans'] text-[#9E9EA8]
                       hover:text-[#0A0A0F] transition-colors duration-200"
          >
            Or WhatsApp me directly — 063 306 3861
          </a>
        </motion.div>
      </div>
    </section>
  );
}
