import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SHOWCASE_IMAGE =
  "https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851097/Blom-hero_image_jaqcoz.png";

export default function ShowcaseZoom() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Device scales from small + tilted → full, then oversized for the "enter the site" moment
  const scale = useTransform(scrollYProgress, [0, 0.55, 1], [0.72, 1, 1.45]);
  const rotateX = useTransform(scrollYProgress, [0, 0.55, 1], [14, 0, 0]);

  // Heading fades in quickly, then out as you zoom into the device
  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.55, 0.7],
    [0, 1, 1, 0]
  );
  const headingY = useTransform(scrollYProgress, [0, 0.15], [20, 0]);

  // Chrome fades once the zoom passes "upright"
  const chromeOpacity = useTransform(scrollYProgress, [0.55, 0.85], [1, 0]);

  // Ambient purple glow behind the device intensifies as it grows
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.35, 0.55]);

  return (
    <section
      ref={ref}
      className="relative h-[220vh] bg-white"
      style={{ perspective: "1400px" }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Ambient purple wash — grows with the device */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: glowOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(800px 500px at 50% 50%, rgba(123,63,228,0.28), transparent 65%)",
            }}
          />
        </motion.div>

        {/* Heading */}
        <motion.div
          style={{ opacity: headingOpacity, y: headingY }}
          className="absolute top-[12%] left-0 right-0 text-center px-6 z-10"
        >
          <span className="block text-[11px] font-['DM_Sans'] font-medium uppercase tracking-[0.14em] text-[#7B3FE4] mb-4">
            Take a closer look
          </span>
          <h2 className="text-[34px] sm:text-[42px] md:text-[56px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.03em] max-w-[18ch] mx-auto leading-[1.06]">
            Real sites.{" "}
            <span className="font-['Instrument_Serif'] italic font-normal">
              Really shipped.
            </span>
          </h2>
        </motion.div>

        {/* Browser frame — scales + tilts on scroll */}
        <motion.div
          style={{
            scale,
            rotateX,
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
          }}
          className="relative w-[90%] max-w-5xl rounded-xl overflow-hidden shadow-[0_40px_100px_rgba(123,63,228,0.25)]"
        >
          {/* Chrome bar */}
          <motion.div
            style={{ opacity: chromeOpacity }}
            className="bg-[#1a1625] px-4 py-3 flex items-center gap-2 border-b border-white/5"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            <div className="mx-auto px-3 py-1 bg-white/5 rounded-md flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#28C840]" />
              <span className="text-[10px] font-['DM_Sans'] text-white/50 tracking-wide">
                blomcosmetics.co.za
              </span>
            </div>
          </motion.div>

          {/* Screen */}
          <div className="aspect-[16/10] bg-[#0D051F] overflow-hidden">
            <img
              src={SHOWCASE_IMAGE}
              alt="BLOM Cosmetics — real client site"
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
