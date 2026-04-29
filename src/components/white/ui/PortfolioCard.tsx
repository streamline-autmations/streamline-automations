import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Tilt from './Tilt';

interface Props {
  title: string;
  description: string;
  category: string;
  tech: string[];
  imageSrc: string;
  href: string;
  /** When true, card uses a translucent dark variant for use on dark sections. */
  inverted?: boolean;
}

export default function PortfolioCard({
  title,
  description,
  category,
  tech,
  imageSrc,
  href,
  inverted = false,
}: Props) {
  // Light variant — used on white backgrounds
  const lightCard =
    'bg-white border-[#E8E8EC] hover:border-[#D4D4DA] hover:shadow-[0_18px_60px_rgba(123,63,228,0.12)]';
  // Inverted variant — used inside the dark featured section
  const darkCard =
    'bg-white/[0.04] border-white/10 hover:border-white/20 backdrop-blur-md hover:shadow-[0_18px_60px_rgba(123,63,228,0.35)]';

  const titleClass = inverted ? 'text-white' : 'text-[#0A0A0F]';
  const bodyClass = inverted ? 'text-white/65' : 'text-[#6B6B7A]';
  const ctaClass = inverted ? 'text-white' : 'text-[#0A0A0F]';
  const techClass = inverted
    ? 'text-white/55 border-white/15'
    : 'text-[#6B6B7A] border-[#E8E8EC]';
  const categoryClass = inverted
    ? 'text-white bg-white/10 border border-white/15'
    : 'text-[#7B3FE4] bg-[#F0EBFF]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Tilt max={5} shine={inverted ? 0.28 : 0.14} className="rounded-2xl">
        <div
          className={`relative rounded-2xl border overflow-hidden
                      transition-all duration-500 ${inverted ? darkCard : lightCard}`}
        >
          <Link to={href} className="block">
            <div
              className={`aspect-[16/10] overflow-hidden relative ${
                inverted ? 'bg-[#1A0B30]' : 'bg-[#F5F5F7]'
              }`}
            >
              <img
                src={imageSrc}
                alt={title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[900ms]
                           ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
              {/* Soft purple wash on hover — adds premium tint over imagery */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 55%, rgba(123,63,228,0.18) 100%)',
                }}
              />
            </div>

            <div className="p-7 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-[11px] font-['DM_Sans'] font-medium px-3 py-1
                              rounded-full uppercase tracking-[0.08em] ${categoryClass}`}
                >
                  {category}
                </span>
                <span
                  className={`text-sm font-['DM_Sans'] font-medium ${ctaClass}
                              opacity-0 group-hover:opacity-100
                              translate-x-[-4px] group-hover:translate-x-0
                              transition-all duration-300`}
                >
                  View case study →
                </span>
              </div>

              <h3
                className={`text-[20px] md:text-[22px] font-['DM_Sans'] font-semibold
                            tracking-[-0.01em] mb-3 ${titleClass}`}
              >
                {title}
              </h3>
              <p
                className={`text-[14.5px] font-['DM_Sans'] leading-[1.65] mb-5 ${bodyClass}`}
              >
                {description}
              </p>

              <div className="flex flex-wrap gap-2">
                {tech.map((t) => (
                  <span
                    key={t}
                    className={`text-[11px] font-['DM_Sans'] px-2.5 py-1 rounded-full border ${techClass}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </div>
      </Tilt>
    </motion.div>
  );
}
