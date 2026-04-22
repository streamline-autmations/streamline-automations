import { motion } from 'framer-motion';

const CLIENTS = [
  'BLOM Cosmetics',
  'RecklessBear Apparel',
  'Ameli Designs',
  'NSA Mining',
  'Madiega Trading',
  'JJ Glasswork',
  'Tuscany SA',
];

const EASE = [0.22, 1, 0.36, 1];

export default function ClientBar() {
  return (
    <section className="py-16 md:py-20 bg-[#FAFAFA] border-y border-[#E8E8EC]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-[11px] font-['DM_Sans'] font-medium uppercase tracking-[0.16em]
                     text-[#9E9EA8] text-center mb-8"
        >
          Trusted by businesses across SA
        </motion.p>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
          }}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          {CLIENTS.map((name) => (
            <motion.li
              key={name}
              variants={{
                hidden: { opacity: 0, y: 6 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: EASE },
                },
              }}
              className="text-[14px] md:text-[15px] font-['DM_Sans'] font-medium
                         text-[#6B6B7A] hover:text-[#0A0A0F] transition-colors duration-200
                         cursor-default"
            >
              {name}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
