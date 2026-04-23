import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Props {
  number: string;
  title: string;
  description: string;
  href: string;
  featured?: boolean;
}

export default function ServiceCard({
  number,
  title,
  description,
  href,
  featured = false,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className={`relative p-8 md:p-10 rounded-2xl bg-white flex flex-col gap-6
                  transition-all duration-300 group overflow-hidden
                  ${featured
                    ? 'border border-[#D4D4DA] shadow-[0_2px_20px_rgba(0,0,0,0.04)]'
                    : 'border border-[#E8E8EC]'}
                  hover:border-[#C4C4CB] hover:shadow-[0_4px_28px_rgba(0,0,0,0.06)]`}
    >
      {/* Purple accent bar — slides in from top on hover */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#7B3FE4]
                   origin-top scale-y-0 group-hover:scale-y-100
                   transition-transform duration-[450ms]
                   ease-[cubic-bezier(0.22,1,0.36,1)]"
      />

      {featured && (
        <span
          className="absolute top-5 right-5 text-[10px] font-['DM_Sans'] font-medium
                     uppercase tracking-[0.12em] text-[#7B3FE4] bg-[#F0EBFF]
                     px-2.5 py-1 rounded-full"
        >
          Most built
        </span>
      )}

      <div className="flex items-center gap-3">
        <span
          className="text-[11px] font-['DM_Sans'] font-medium text-[#9E9EA8]
                     uppercase tracking-[0.14em]"
        >
          {number}
        </span>
        <div className="flex-1 h-px bg-[#E8E8EC]" />
      </div>

      <div className="flex-1">
        <h3 className="text-[20px] md:text-[22px] font-['DM_Sans'] font-semibold
                       text-[#0A0A0F] tracking-[-0.01em] mb-3">
          {title}
        </h3>
        <p className="text-[14.5px] font-['DM_Sans'] text-[#6B6B7A] leading-[1.65]">
          {description}
        </p>
      </div>

      <Link
        to={href}
        className="inline-flex items-center gap-1.5 text-sm font-['DM_Sans']
                   font-medium text-[#7B3FE4] hover:text-[#6930D0]
                   transition-colors duration-200"
      >
        View service
        <span
          className="inline-block transition-transform duration-200
                     group-hover:translate-x-0.5"
        >
          →
        </span>
      </Link>
    </motion.div>
  );
}
