import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { springStagger, bentoCard, viewport } from '../../lib/motion';
import BracketCard from '../ui/BracketCard';

// Real Cloudinary images from portfolio.ts
const projects = [
  {
    id: 1,
    tag: 'E-commerce Infrastructure',
    title: 'BLOM Cosmetics',
    description: 'Full e-commerce store, admin dashboard, BLOM Academy, email + WhatsApp automation and monthly retainer.',
    image: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851097/Blom-hero_image_jaqcoz.png',
    path: '/portfolio/blom-cosmetics',
    color: 'purple' as const,
    accentColor: '#774CFC',
    metric: { value: 'R60K+', label: 'Sales in month 3' },
  },
  {
    id: 2,
    tag: 'Systems & Automation',
    title: 'RecklessBear Apparel',
    description: 'Website, CRM, 12-stage order tracking, inventory management, WhatsApp automation and monthly retainer.',
    image: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851117/Reckless-hero_image_sbwhoj.png',
    path: '/portfolio/recklesbear',
    color: 'orange' as const,
    accentColor: '#F26A3D',
    metric: { value: '3×', label: 'Quote conversion' },
  },
];

export default function FeaturedCaseStudies() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
      variants={springStagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {projects.map((project) => (
        <motion.div key={project.id} variants={bentoCard}>
          <BracketCard color={project.color} className="h-full">
            <Link to={project.path} className="group block h-full">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="relative w-full aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-65 transition-opacity duration-500 group-hover:scale-[1.02] transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Tag */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border"
                      style={{
                        color: project.accentColor,
                        borderColor: `${project.accentColor}40`,
                        backgroundColor: `${project.accentColor}12`,
                      }}
                    >
                      {project.tag}
                    </span>
                  </div>

                  {/* Metric badge */}
                  <div className="absolute bottom-4 right-4">
                    <div
                      className="px-3 py-1.5 rounded-lg border backdrop-blur-md text-right"
                      style={{
                        borderColor: `${project.accentColor}30`,
                        backgroundColor: `${project.accentColor}15`,
                      }}
                    >
                      <div className="font-bebas text-xl leading-none" style={{ color: project.accentColor }}>
                        {project.metric.value}
                      </div>
                      <div className="text-white/50 text-[10px] font-mono leading-none mt-0.5">
                        {project.metric.label}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col gap-3">
                  <h3 className="font-bebas text-3xl text-white group-hover:text-white/90 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed flex-1">{project.description}</p>
                  <div
                    className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all duration-300"
                    style={{ color: project.accentColor }}
                  >
                    View Case Study <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </BracketCard>
        </motion.div>
      ))}
    </motion.div>
  );
}
