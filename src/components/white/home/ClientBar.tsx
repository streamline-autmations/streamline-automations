import { useState } from "react";
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
  const [paused, setPaused] = useState(false);
  const items = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#2E1065] via-[#4C1D95] to-[#6B21A8] border-y border-white/10">
      {/* Ambient bloom layers — pull the gradient out of flat-color territory */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(560px 320px at 50% 35%, rgba(167,123,255,0.22), transparent 70%), radial-gradient(420px 260px at 12% 90%, rgba(123,63,228,0.18), transparent 75%), radial-gradient(420px 260px at 88% 90%, rgba(167,123,255,0.14), transparent 75%)",
        }}
      />
      {/* Faint dot grid for tactile depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.45) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(0,0,0,0.7), transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(0,0,0,0.7), transparent 80%)",
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
            filter: "drop-shadow(0 0 28px rgba(167,123,255,0.55))",
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
              fill="rgba(255,255,255,0.7)"
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
                className="absolute inline-flex w-6 h-6 rounded-full bg-white"
                animate={{ scale: [1, 2.8, 1], opacity: [0.45, 0, 0.45] }}
                transition={{ duration: 2.6, ease: "easeOut", repeat: Infinity }}
              />
              <span className="relative inline-flex w-3 h-3 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.7)]" />
            </span>
          </div>

          {/* Hairline frame */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-white/20"
          />
        </motion.div>
      </div>

      {/* Thin scrolling strip — edge-to-edge, faded at edges, pauses on hover */}
      <div
        className="relative border-t border-white/10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
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
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex items-center gap-6 px-6 whitespace-nowrap"
            >
              <span className="text-[11.5px] md:text-[12.5px] font-['DM_Sans'] font-medium uppercase tracking-[0.13em] text-white/65 hover:text-white transition-colors duration-200">
                {name}
              </span>
              <motion.span
                aria-hidden="true"
                className="inline-block text-[#C4A8FF] text-[10px] flex-shrink-0"
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
