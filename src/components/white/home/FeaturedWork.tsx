import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PortfolioCard from "../ui/PortfolioCard";

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
    <section className="relative py-24 md:py-32 bg-[#0D051F] overflow-hidden">
      {/* Ambient purple glow in the corner */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full
                   bg-[#7B3FE4] blur-[140px] opacity-[0.18] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full
                   bg-[#7B3FE4] blur-[130px] opacity-[0.12] pointer-events-none"
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
          <span className="block text-[11px] font-['DM_Sans'] font-medium uppercase tracking-[0.14em] text-white/40 mb-5">
            Selected work
          </span>
          <h2 className="text-[32px] leading-[1.1] sm:text-4xl md:text-5xl font-['DM_Sans'] font-semibold text-white tracking-[-0.02em] max-w-2xl mx-auto">
            Not just websites.{" "}
            <span className="font-['Instrument_Serif'] italic font-normal">
              Whole systems.
            </span>
          </h2>
          <p className="mt-5 text-[16px] md:text-[17px] font-['DM_Sans'] text-white/55 leading-[1.65] max-w-xl mx-auto">
            Real SA businesses. Real client screenshots. No stock photos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURED.map((p) => (
            <PortfolioCard key={p.title} {...p} />
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
