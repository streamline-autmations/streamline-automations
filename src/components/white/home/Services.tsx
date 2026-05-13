import { motion } from "framer-motion";
import ServiceCard from "../ui/ServiceCard";
import AnimatedUnderline from "../ui/AnimatedUnderline";

const SERVICES = [
  {
    number: "01",
    title: "Web Design & Creation",
    description:
      "Portfolio sites, e-commerce stores, service sites, landing pages. Custom-coded from scratch and live in 3–7 days.",
    href: "/websites",
    featured: false,
  },
  {
    number: "02",
    title: "Systems & Automation",
    description:
      "CRMs, WhatsApp automation, admin dashboards, booking flows, n8n workflows. Stop running on spreadsheets.",
    href: "/systems",
    featured: true,
  },
  {
    number: "03",
    title: "Hosting, Email & Maintenance",
    description:
      "Domain, email, SSL, IT support — plus a website rental option if you don't want the upfront spend.",
    href: "/hosting",
    featured: false,
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Services() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Faint dot grid for texture — fades out top + bottom so it doesn't conflict with neighbouring sections */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(123,63,228,0.13) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "linear-gradient(to bottom, transparent, rgba(0,0,0,0.55) 18%, rgba(0,0,0,0.55) 82%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, rgba(0,0,0,0.55) 18%, rgba(0,0,0,0.55) 82%, transparent)",
        }}
      />
      {/* Soft purple ambient bloom on the right edge for depth */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full
                   bg-[#7B3FE4] blur-[160px] opacity-[0.08] pointer-events-none"
      />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="mb-14 md:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center justify-between pb-5 mb-8 border-b border-[#E8E8EC]"
          >
            <span className="text-[11px] font-['DM_Sans'] font-medium uppercase tracking-[0.14em] text-[#9E9EA8]">
              What I build
            </span>
            <span className="text-[11px] font-['DM_Sans'] font-medium uppercase tracking-[0.14em] text-[#9E9EA8]">
              03 services
            </span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-8 items-end">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, ease: EASE }}
                className="text-[34px] sm:text-[42px] md:text-[50px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.025em] leading-[1.08]"
              >
                Three ways I help your{" "}
                <span className="relative inline-block">
                  business.
                  <span className="absolute -bottom-2 left-0 right-0">
                    <AnimatedUnderline
                      width={200}
                      color="#7B3FE4"
                      strokeWidth={2.5}
                      delay={0.35}
                      className="w-full h-[6px]"
                    />
                  </span>
                </span>
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
              className="text-[16px] md:text-[17px] font-['DM_Sans'] text-[#6B6B7A] leading-[1.65] max-w-md"
            >
              Whether you need a site, a full system, or just to get your
              hosting sorted — I&apos;ve got it covered.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {SERVICES.map((s) => (
            <ServiceCard key={s.number} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
