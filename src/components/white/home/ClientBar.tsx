import { motion } from 'framer-motion';

const CLIENTS = [
  'BLOM Cosmetics',
  'RecklessBear Apparel',
  'Ameli Designs',
  'NSA Mining',
  'Madiega Trading',
  'JJ Glasswork',
  'Tuscany SA',
  'African Nomad',
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Curved path for the rotating badge text — full circle, started at top, swept clockwise.
const CIRCLE_PATH =
  'M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0';

const BADGE_TEXT = 'TRUSTED ACROSS SOUTH AFRICA · TRUSTED ACROSS SOUTH AFRICA · ';

export default function ClientBar() {
  // Duplicate the list so the CSS marquee can loop seamlessly at -50%.
  const marqueeItems = [...CLIENTS, ...CLIENTS];

  return (
    <section
      className="relative py-20 md:py-24 bg-[#FAFAFA] border-y border-[#E8E8EC] overflow-hidden"
    >
      {/* Soft purple radial wash behind the badge — gives the section life */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(520px 320px at 50% 38%, rgba(123,63,228,0.10), transparent 70%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Rotating circular badge — the "spinning thing" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative mx-auto w-[170px] h-[170px] md:w-[190px] md:h-[190px] mb-12 md:mb-14"
        >
          {/* Spinning text ring */}
          <motion.svg
            viewBox="0 0 200 200"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 26, ease: 'linear', repeat: Infinity }}
          >
            <defs>
              <path id="badge-circle" d={CIRCLE_PATH} />
            </defs>
            <text
              fill="#6B6B7A"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
              }}
            >
              <textPath href="#badge-circle" startOffset="0">
                {BADGE_TEXT}
              </textPath>
            </text>
          </motion.svg>

          {/* Static center mark — purple dot with pulsing ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="relative inline-flex items-center justify-center">
              <motion.span
                aria-hidden="true"
                className="absolute inline-flex w-5 h-5 rounded-full bg-[#7B3FE4]"
                animate={{ scale: [1, 2.6, 1], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 2.4, ease: 'easeOut', repeat: Infinity }}
              />
              <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-[#7B3FE4]" />
            </span>
          </div>

          {/* Subtle hairline circle frame */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-[#E8E8EC]"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-[11px] font-['DM_Sans'] font-medium uppercase tracking-[0.16em]
                     text-[#9E9EA8] text-center mb-10"
        >
          Real businesses · Real systems · Built across SA
        </motion.p>
      </div>

      {/* Edge-to-edge marquee, faded at both edges */}
      <div
        className="relative"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div
          className="flex items-center"
          style={{
            width: 'max-content',
            animation: 'marquee-text 38s linear infinite',
          }}
        >
          {marqueeItems.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex items-center gap-8 px-6 whitespace-nowrap
                         text-[15px] md:text-[17px] font-['DM_Sans'] font-medium
                         text-[#3D3D47]"
            >
              {name}
              <span aria-hidden="true" className="text-[#7B3FE4] text-[12px]">
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
