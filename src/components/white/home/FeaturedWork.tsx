import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PortfolioCard from "../ui/PortfolioCard";
import AnimatedUnderline from "../ui/AnimatedUnderline";

const FEATURED = [
  {
    title: "BLOM Cosmetics",
    description:
      "Full e-commerce platform, CRM, BLOM Academy course portal, and WhatsApp + email automation — all on one Supabase backend.",
    category: "E-commerce + Automation",
    tech: ["React", "Supabase", "n8n"],
    imageSrc:
      "https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851097/Blom-hero_image_jaqcoz.png",
    href: "/portfolio/blom-cosmetics",
  },
  {
    title: "RecklessBear Apparel",
    description:
      "Website, CRM, inventory tracking, 12-stage production pipeline, and WhatsApp automation for order updates.",
    category: "Full Business System",
    tech: ["React", "Supabase", "WhatsApp API"],
    imageSrc:
      "https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851117/Reckless-hero_image_sbwhoj.png",
    href: "/portfolio/recklesbear",
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function FeaturedWork() {
  return (
    <section
      data-cursor-invert
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        // Layered deep-purple gradient — premium without going pure black.
        // Top blends from the section above; bottom anchors with violet tone.
        background:
          "linear-gradient(180deg, #1A0B30 0%, #240F45 50%, #160826 100%)",
      }}
    >
      {/* Aurora purple blooms */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full
                   bg-[#7B3FE4] blur-[150px] opacity-[0.28] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full
                   bg-[#A77BFF] blur-[140px] opacity-[0.18] pointer-events-none"
      />

      {/* Subtle grid wash for depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.85), transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.85), transparent 75%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Inverted header — center aligned, white text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12 md:mb-16 text-center"
        >
          <span className="block text-[11px] font-['DM_Sans'] font-medium uppercase tracking-[0.14em] text-white/45 mb-5">
            Selected work
          </span>
          <h2 className="text-[32px] leading-[1.1] sm:text-4xl md:text-5xl font-['DM_Sans'] font-semibold text-white tracking-[-0.02em] max-w-2xl mx-auto">
            Not just websites.{" "}
            <span className="font-['Instrument_Serif'] italic font-normal text-[#C8A8FF]">
              Whole systems.
            </span>
          </h2>
          <div className="mt-5 flex justify-center">
            <AnimatedUnderline
              width={140}
              color="#A77BFF"
              strokeWidth={2}
              className="w-[140px] h-[6px]"
            />
          </div>
          <p className="mt-5 text-[16px] md:text-[17px] font-['DM_Sans'] text-white/60 leading-[1.65] max-w-xl mx-auto">
            Real SA businesses. Real client screenshots. No stock photos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURED.map((p) => (
            <PortfolioCard key={p.title} {...p} inverted />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
          className="mt-14 flex justify-center"
        >
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-1.5 text-sm font-['DM_Sans']
                       font-medium text-white/60 hover:text-white transition-colors duration-200"
          >
            See all work
            <span className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
