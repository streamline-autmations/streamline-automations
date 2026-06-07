import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  description: string;
  category: string;
  tech: string[];
  imageSrc?: string;          // real screenshot/mockup tile
  href?: string;              // case-study link (omit for static cards)
  retainerBadge?: boolean;
  monogram?: string;          // shown when there's no imageSrc (confidential / brand work)
  monogramLabel?: string;     // small caption under the monogram
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
  monogram,
  monogramLabel,
}: Props) {
  const clickable = Boolean(href);

  const inner = (
    <>
      {/* Visual block */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F5F7]">
        {imageSrc ? (
          <>
            <img
              src={imageSrc}
              alt={title}
              loading="lazy"
              draggable={false}
              className="absolute inset-0 h-full w-full select-none object-cover object-top
                         transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                         group-hover:scale-[1.05]"
            />
            <div
              className="absolute inset-0 flex items-center justify-center bg-[#0A0A0F]/0
                         transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                         group-hover:bg-[#0A0A0F]/55"
            >
              {clickable && (
                <span
                  className="translate-y-2 text-[13px] font-['DM_Sans'] font-bold uppercase tracking-[0.16em]
                             text-white opacity-0 transition-all duration-400
                             ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100"
                >
                  VIEW PROJECT →
                </span>
              )}
            </div>
          </>
        ) : (
          // Branded monogram tile — for confidential / non-website work (no fake screenshot)
          <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-[linear-gradient(150deg,#F0EBFF_0%,#F5F5F7_70%)]">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(123,63,228,0.16) 1px, transparent 0)',
                backgroundSize: '26px 26px',
                maskImage: 'radial-gradient(ellipse 80% 70% at 50% 45%, #000, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 45%, #000, transparent 80%)',
              }}
            />
            <span
              aria-hidden="true"
              className="absolute -right-6 top-6 h-40 w-40 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(123,63,228,0.18), transparent 70%)' }}
            />
            <span className="relative font-['Instrument_Serif'] italic leading-none text-[#7B3FE4]/45"
                  style={{ fontSize: 'clamp(56px,9vw,104px)' }}>
              {monogram ?? title.slice(0, 2)}
            </span>
            {monogramLabel && (
              <span className="relative mt-3 font-['JetBrains_Mono'] text-[10.5px] uppercase tracking-[0.18em] text-[#7B3FE4]/70">
                {monogramLabel}
              </span>
            )}
          </div>
        )}

        {/* Category pill */}
        <div className="absolute left-4 top-4 z-10">
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-['DM_Sans'] font-semibold uppercase tracking-[0.1em] text-[#7B3FE4] backdrop-blur-sm">
            {category}
          </span>
        </div>

        {/* Active-retainer badge */}
        {retainerBadge && (
          <div className="absolute right-4 top-4 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1.5 text-[10px] font-['DM_Sans'] font-semibold uppercase tracking-[0.1em] text-[#7B3FE4] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7B3FE4]" />
              Live
            </span>
          </div>
        )}
      </div>

      {/* Text block */}
      <div className="p-6 md:p-7">
        <h3 className="mb-2 text-[19px] font-['DM_Sans'] font-semibold tracking-[-0.01em] text-[#0A0A0F] md:text-[21px]">
          {title}
        </h3>
        <p className="mb-4 text-[13.5px] font-['DM_Sans'] leading-[1.65] text-[#6B6B7A]">
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[#E8E8EC] px-2.5 py-1 text-[11px] font-['DM_Sans'] text-[#9E9EA8]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  const shell =
    'group block overflow-hidden rounded-2xl border border-[#E8E8EC] bg-white transition-all duration-500';
  const interactive =
    'hover:border-[#D4D4DA] hover:shadow-[0_16px_48px_rgba(123,63,228,0.10)]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: EASE }}
      data-cursor={clickable ? 'view' : undefined}
    >
      {clickable ? (
        <Link to={href!} className={`${shell} ${interactive}`}>
          {inner}
        </Link>
      ) : (
        <div className={`${shell} ${interactive}`}>{inner}</div>
      )}
    </motion.div>
  );
}
