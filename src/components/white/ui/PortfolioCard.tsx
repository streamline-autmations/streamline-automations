import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  description: string;
  category: string;
  tech: string[];
  imageSrc: string;
  href: string;
}

export default function PortfolioCard({
  title,
  description,
  category,
  tech,
  imageSrc,
  href,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="group rounded-2xl border border-[#E8E8EC] bg-white overflow-hidden
                 hover:border-[#D4D4DA] hover:shadow-[0_8px_36px_rgba(0,0,0,0.07)]
                 transition-all duration-300"
    >
      <Link to={href} className="block">
        <div className="aspect-[16/10] bg-[#F5F5F7] overflow-hidden relative">
          <img
            src={imageSrc}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[900ms]
                       ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent
                       to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        </div>

        <div className="p-7 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-[11px] font-['DM_Sans'] font-medium text-[#7B3FE4]
                         bg-[#F0EBFF] px-3 py-1 rounded-full uppercase tracking-[0.08em]"
            >
              {category}
            </span>
            <span
              className="text-sm font-['DM_Sans'] font-medium text-[#0A0A0F]
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              View case study →
            </span>
          </div>

          <h3 className="text-[20px] md:text-[22px] font-['DM_Sans'] font-semibold
                         text-[#0A0A0F] tracking-[-0.01em] mb-3">
            {title}
          </h3>
          <p className="text-[14.5px] font-['DM_Sans'] text-[#6B6B7A] leading-[1.65] mb-5">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="text-[11px] font-['DM_Sans'] text-[#6B6B7A]
                           border border-[#E8E8EC] px-2.5 py-1 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
