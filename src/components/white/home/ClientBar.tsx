import { motion } from "framer-motion";

const CLIENTS = [
  "BLOM Cosmetics",
  "RecklessBear Apparel",
  "Ameli Designs",
  "NSA Mining",
  "Madiega Trading",
  "JJ Glasswork",
  "Tuscany SA",
  "African Nomad",
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CIRCLE_PATH =
  "M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0";

const BADGE_TEXT = "TRUSTED ACROSS SOUTH AFRICA · TRUSTED ACROSS SOUTH AFRICA · ";

export default function ClientBar() {
  const items = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section className="relative bg-[#FAFAFA] border-y border-[#E8E8EC] overflow-hidden">
      {/* Soft purple radial behind the badge */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(480px 280px at 50% 40%, rgba(123,63,228,0.09), transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 pt-12 md:pt-16 pb-0">
        {/* Circular rotating badge with hover scale + glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: EASE }}
          whileHover={{
            scale: 1.1,
            filter: "drop-shadow(0 0 22px rgba(123,63,228,0.35))",
          }}
          style={{ transition: "filter 0.35s ease" }}
          className="relative mx-auto w-[150px] h-[150px] md:w-[170px] md:h-[170px] mb-10 md:mb-12 cursor-default"
        >
          {/* Spinning text ring */}
          <motion.svg
            viewBox="0 0 200 200"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          >
            <defs>
              <path id="cb-circle" d={CIRCLE_PATH} />
            </defs>
            <text
              fill="#6B6B7A"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "10.5px",
                fontWeight: 500,
                letterSpacing: "0.24em",
              }}
            >
              <textPath href="#cb-circle" startOffset="0">
                {BADGE_TEXT}
              </textPath>
            </text>
          </motion.svg>

          {/* Center pulsing dot */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="relative inline-flex items-center justify-center">
              <motion.span
                aria-hidden="true"
                className="absolute inline-flex w-6 h-6 rounded-full bg-[#7B3FE4]"
                animate={{ scale: [1, 2.8, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2.6, ease: "easeOut", repeat: Infinity }}
              />
              <span className="relative inline-flex w-3 h-3 rounded-full bg-[#7B3FE4]" />
            </span>
          </div>

          {/* Hairline frame */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-[#E0E0E8]"
          />
        </motion.div>
      </div>

      {/* Thin scrolling strip — edge-to-edge, faded at edges */}
      <div
        className="relative border-t border-[#E8E8EC]"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        <div
          className="flex items-center py-3.5"
          style={{
            width: "max-content",
            animation: "marquee-text 42s linear infinite",
          }}
        >
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex items-center gap-6 px-6 whitespace-nowrap"
            >
              <span className="text-[11.5px] md:text-[12.5px] font-['DM_Sans'] font-medium uppercase tracking-[0.13em] text-[#6B6B7A]">
                {name}
              </span>
              <motion.span
                aria-hidden="true"
                className="inline-block text-[#7B3FE4] text-[10px] flex-shrink-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, ease: "linear", repeat: Infinity }}
              >
                &#10022;
              </motion.span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
