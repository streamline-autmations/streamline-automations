import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SHOWCASE_IMAGE =
  "https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851097/Blom-hero_image_jaqcoz.png";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Showcase — sticky tilted browser frame with the full client-site screenshot
 * scrolling inside it. Replaces the old viewport-locked zoom (which fought with
 * Lenis smooth-scroll and clipped at large scales).
 *
 * The browser frame is a normal element that just sits there; the scroll
 * progress drives:
 *   - Subtle entrance lift + tilt-to-flat
 *   - The screenshot's `objectPosition` from top → bottom (simulated page scroll)
 *   - Three callout pills that reveal at staggered scroll offsets
 */
export default function ShowcaseZoom() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Section header eases in/out across the section
  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.78, 0.95],
    [0, 1, 1, 0]
  );
  const headingY = useTransform(scrollYProgress, [0, 0.18], [24, 0]);

  // Browser frame — settles into upright position, then drifts up gently
  const frameY = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -40]);
  const frameRotateX = useTransform(scrollYProgress, [0, 0.5], [10, 0]);
  const frameOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.85, 1],
    [0, 1, 1, 0.6]
  );

  // The screenshot scrolls inside the screen as the section scrolls past
  const screenshotY = useTransform(scrollYProgress, [0.18, 0.85], ["0%", "-65%"]);

  // Ambient purple bloom intensifies through the middle, eases out
  const bloomOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    [0, 0.45, 0.45, 0.15]
  );

  // Callout pills reveal at staggered scroll offsets
  const calloutA = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);
  const calloutB = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  const calloutC = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative bg-white"
      style={{ perspective: "1600px" }}
    >
      {/* Section is tall so the sticky frame stays in view long enough for
          the screenshot to scroll its full height inside the screen. */}
      <div className="relative h-[260vh]">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
          {/* Ambient purple wash — soft, never overpowering */}
          <motion.div
            aria-hidden="true"
            style={{ opacity: bloomOpacity }}
            className="absolute inset-0 pointer-events-none"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(900px 540px at 50% 60%, rgba(123,63,228,0.30), transparent 65%)",
              }}
            />
          </motion.div>

          {/* Faint grid wash for tactile depth on white */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(123,63,228,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(123,63,228,0.06) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage:
                "radial-gradient(ellipse 75% 60% at 50% 50%, rgba(0,0,0,0.6), transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 75% 60% at 50% 50%, rgba(0,0,0,0.6), transparent 80%)",
            }}
          />

          {/* Heading */}
          <motion.div
            style={{ opacity: headingOpacity, y: headingY }}
            className="absolute top-[8%] md:top-[10%] left-0 right-0 text-center px-6 z-20"
          >
            <span className="block text-[11px] font-['DM_Sans'] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-4">
              Take a closer look
            </span>
            <h2 className="text-[34px] sm:text-[42px] md:text-[56px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.03em] max-w-[18ch] mx-auto leading-[1.06]">
              Real sites.{" "}
              <span className="font-['Instrument_Serif'] italic font-normal">
                Really shipped.
              </span>
            </h2>
            <p className="mt-5 text-[14.5px] md:text-[15.5px] font-['DM_Sans'] text-[#3D3D47] max-w-[44ch] mx-auto leading-[1.55]">
              Scroll through the live BLOM Cosmetics site we built &mdash; pixel-for-pixel, no mockups.
            </p>
          </motion.div>

          {/* Browser frame */}
          <motion.div
            style={{
              y: frameY,
              rotateX: frameRotateX,
              opacity: frameOpacity,
              transformStyle: "preserve-3d",
              transformOrigin: "center 70%",
            }}
            className="relative w-[92%] max-w-5xl mt-[14vh] md:mt-[18vh] rounded-[14px] overflow-hidden
                       shadow-[0_30px_80px_-20px_rgba(76,29,149,0.45),0_10px_30px_-10px_rgba(0,0,0,0.18)]
                       ring-1 ring-black/5"
          >
            {/* Chrome bar */}
            <div className="bg-[#13101F] px-4 py-3 flex items-center gap-2 border-b border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              <div className="mx-auto px-3 py-1 bg-white/[0.06] rounded-md flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#28C840]" />
                <span className="text-[10px] font-['DM_Sans'] text-white/55 tracking-wide">
                  blomcosmetics.co.za
                </span>
              </div>
            </div>

            {/* Screen — fixed aspect, screenshot translates inside via scroll */}
            <div className="relative aspect-[16/10] bg-[#0D051F] overflow-hidden">
              <motion.img
                src={SHOWCASE_IMAGE}
                alt="BLOM Cosmetics — full-page scroll preview of the live client site"
                loading="lazy"
                style={{ y: screenshotY }}
                className="absolute inset-x-0 top-0 w-full h-auto select-none"
                draggable={false}
              />
              {/* Subtle inner shadow so the image sits inside the frame */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow:
                    "inset 0 16px 30px -16px rgba(0,0,0,0.55), inset 0 -16px 30px -16px rgba(0,0,0,0.45)",
                }}
              />
            </div>
          </motion.div>

          {/* Floating callout pills — scroll-synced reveals */}
          <Callout
            opacity={calloutA}
            className="left-[6%] md:left-[10%] top-[34%] md:top-[38%]"
            label="Custom-built"
            detail="No templates. Every section coded by hand."
          />
          <Callout
            opacity={calloutB}
            className="right-[6%] md:right-[12%] top-[44%] md:top-[46%]"
            label="Mobile-first"
            detail="Designed for thumbs, perfected on desktop."
          />
          <Callout
            opacity={calloutC}
            className="left-[10%] md:left-[16%] bottom-[14%] md:bottom-[18%]"
            label="Loads in <1.4s"
            detail="Lighthouse 98+ across the board."
          />
        </div>
      </div>

      {/* Outro divider */}
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="h-px bg-[#E8E8EC]" />
      </div>
    </section>
  );
}

function Callout({
  opacity,
  className,
  label,
  detail,
}: {
  opacity: ReturnType<typeof useTransform<number, number>>;
  className: string;
  label: string;
  detail: string;
}) {
  return (
    <motion.div
      style={{ opacity }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`pointer-events-none hidden md:block absolute z-30 ${className}`}
    >
      <div className="rounded-2xl bg-white/95 backdrop-blur-xl px-4 py-3 max-w-[220px]
                      shadow-[0_20px_50px_-12px_rgba(76,29,149,0.35),0_4px_12px_-4px_rgba(0,0,0,0.1)]
                      ring-1 ring-[#EDE6FF]">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7B3FE4]" />
          <span className="text-[11px] font-['DM_Sans'] font-semibold uppercase tracking-[0.12em] text-[#4C1D95]">
            {label}
          </span>
        </div>
        <p className="text-[12.5px] font-['DM_Sans'] text-[#3D3D47] leading-[1.45]">
          {detail}
        </p>
      </div>
    </motion.div>
  );
}
