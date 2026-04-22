import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeader from '../ui/SectionHeader';
import PortfolioCard from '../ui/PortfolioCard';

const FEATURED = [
  {
    title: 'BLOM Cosmetics',
    description:
      'Full e-commerce platform, CRM, BLOM Academy course portal, and WhatsApp + email automation — all on one Supabase backend.',
    category: 'E-commerce + Automation',
    tech: ['React', 'Supabase', 'n8n'],
    imageSrc:
      'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851097/Blom-hero_image_jaqcoz.png',
    href: '/portfolio/blom-cosmetics',
  },
  {
    title: 'RecklessBear Apparel',
    description:
      'Website, CRM, inventory tracking, 12-stage production pipeline, and WhatsApp automation for order updates.',
    category: 'Full Business System',
    tech: ['React', 'Supabase', 'WhatsApp API'],
    imageSrc:
      'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851117/Reckless-hero_image_sbwhoj.png',
    href: '/portfolio/recklesbear',
  },
];

export default function FeaturedWork() {
  return (
    <section className="py-24 md:py-32 bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader
          eyebrow="Selected work"
          headline="Not just websites. Whole systems."
          subtext="Real SA businesses. Real client screenshots. No stock photos."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURED.map((p) => (
            <PortfolioCard key={p.title} {...p} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-14 flex justify-center"
        >
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-1.5 text-sm font-['DM_Sans']
                       font-medium text-[#0A0A0F] hover:text-[#7B3FE4]
                       transition-colors duration-200"
          >
            See all work
            <span
              className="transition-transform duration-300
                         ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
