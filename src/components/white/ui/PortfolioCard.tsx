import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  description: string;
  category: string;
  tech: string[];
  imageSrc: string;
  href: string;
  retainerBadge?: boolean;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PortfolioCard({
  title,
  description,
  category,
  tech,
  imageSrc,
  href,
  retainerBadge = false,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: EASE }}
      data-cursor="view"
    >
      <Link to={href} className="group block rounded-2xl overflow-hidden border border-[#E8E8EC] bg-white hover:border-[#D4D4DA] hover:shadow-[0_16px_48px_rgba(123,63,228,0.10)] transition-all duration-500">

        {/* Image block */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F5F7]">
          <img
            src={imageSrc}
            alt={title}
            loading="lazy"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover
                       transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                       group-hover:scale-[1.05] select-none"
          />

          {/* Dark overlay — fades in on hover */}
          <div
            className="absolute inset-0 bg-[#0A0A0F]/0 group-hover:bg-[#0A0A0F]/55
                       transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                       flex items-center justify-center"
          >
            <span
              className="text-[13px] font-['DM_Sans'] font-bold uppercase tracking-[0.16em]
                         text-white opacity-0 group-hover:opacity-100
                         translate-y-2 group-hover:translate-y-0
                         transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              VIEW PROJECT →
            </span>
          </div>

          {/* Category pill — always visible */}
          <div className="absolute top-4 left-4 z-10">
            <span className="text-[10px] font-['DM_Sans'] font-semibold uppercase tracking-[0.1em]
                             text-[#7B3FE4] bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5">
              {category}
            </span>
          </div>

          {/* Active retainer badge */}
          {retainerBadge && (
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-['DM_Sans'] font-semibold
                               uppercase tracking-[0.1em] text-[#7B3FE4] bg-white/90 backdrop-blur-sm
                               rounded-full px-2.5 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7B3FE4] animate-pulse" />
                Live
              </span>
            </div>
          )}
        </div>

        {/* Text block */}
        <div className="p-6 md:p-7">
          <h3 className="text-[19px] md:text-[21px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.01em] mb-2">
            {title}
          </h3>
          <p className="text-[13.5px] font-['DM_Sans'] text-[#6B6B7A] leading-[1.65] mb-4">
            {description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tech.map((t) => (
              <span
                key={t}
                className="text-[11px] font-['DM_Sans'] px-2.5 py-1 rounded-full
                           border border-[#E8E8EC] text-[#9E9EA8]"
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
