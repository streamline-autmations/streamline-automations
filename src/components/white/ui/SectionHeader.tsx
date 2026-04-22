import { motion } from 'framer-motion';

interface Props {
  eyebrow?: string;
  headline: string;
  subtext?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  headline,
  subtext,
  align = 'left',
  className = '',
}: Props) {
  const a = align === 'center' ? 'text-center mx-auto' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 md:mb-16 ${a} ${className}`}
    >
      {eyebrow && (
        <span
          className="block text-[11px] font-['DM_Sans'] font-medium uppercase
                     tracking-[0.14em] text-[#9E9EA8] mb-5"
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-[32px] leading-[1.1] sm:text-4xl md:text-5xl
                    font-['DM_Sans'] font-semibold text-[#0A0A0F]
                    tracking-[-0.02em] max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}
      >
        {headline}
      </h2>
      {subtext && (
        <p
          className={`mt-5 text-[16px] md:text-[17px] font-['DM_Sans']
                      text-[#6B6B7A] leading-[1.65] max-w-xl
                      ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {subtext}
        </p>
      )}
    </motion.div>
  );
}
