import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function FinalCTA() {
  return (
    <section data-cursor-invert className="relative py-32 md:py-40 bg-[#7B3FE4] overflow-hidden">
      {/* Ambient blobs inside the purple section for depth */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full
                   bg-white blur-[130px] opacity-[0.07] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full
                   bg-white blur-[120px] opacity-[0.05] pointer-events-none"
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-[42px] leading-[1.06] sm:text-[54px] md:text-[68px] lg:text-[80px]
                     font-['DM_Sans'] font-semibold text-white
                     tracking-[-0.035em] max-w-[20ch] mx-auto"
        >
          Ready to stop doing everything{" "}
          <span className="font-['Instrument_Serif'] italic font-normal text-white/80">
            manually?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
          className="mt-7 text-[16px] md:text-[17px] font-['DM_Sans']
                     text-white/65 leading-[1.65] max-w-md mx-auto"
        >
          Book a free 30-minute call. No pitch, no pressure — just a plan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          className="mt-10 flex flex-col items-center gap-5"
        >
          <motion.span whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2
                         font-['DM_Sans'] font-semibold rounded-full
                         px-8 py-4 text-[15px] bg-white text-[#7B3FE4]
                         hover:bg-white/92 transition-colors duration-200
                         min-h-[52px] shadow-[0_4px_24px_rgba(0,0,0,0.18)]"
            >
              Book a Free Call
            </Link>
          </motion.span>

          <a
            href="https://wa.me/27687579940"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13.5px] font-['DM_Sans'] text-white/50
                       hover:text-white transition-colors duration-200"
          >
            Or WhatsApp me directly &mdash; 063 306 3861
          </a>
        </motion.div>
      </div>
    </section>
  );
}
