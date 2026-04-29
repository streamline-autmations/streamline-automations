import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { springStagger, springFadeUp, viewport } from '../../lib/motion';

const PROJECTS = [
  {
    tag: 'E-commerce Infrastructure',
    title: 'BLOM Cosmetics',
    description: 'Full e-commerce store, admin dashboard, BLOM Academy, email + WhatsApp automation and monthly retainer.',
    image: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851097/Blom-hero_image_jaqcoz.png',
    path: '/portfolio/blom-cosmetics',
    accentColor: '#774CFC',
    metric: { value: 'R60K+', label: 'Sales in month 3' },
  },
  {
    tag: 'Systems & Automation',
    title: 'RecklessBear Apparel',
    description: 'Website, CRM, 12-stage order tracking, inventory management, WhatsApp automation and monthly retainer.',
    image: 'https://res.cloudinary.com/dnlgohkcc/image/upload/v1771851117/Reckless-hero_image_sbwhoj.png',
    path: '/portfolio/recklesbear',
    accentColor: '#F26A3D',
    metric: { value: '3×', label: 'Quote conversion' },
  },
];

export default function FeaturedBuilds() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
      variants={springStagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {PROJECTS.map((project) => (
        <motion.div key={project.path} variants={springFadeUp}>
          <Link to={project.path} className="group block">
            <div
              className="card card-interactive overflow-hidden transition-all duration-300"
              style={{ padding: 0 }}
            >
              {/* Screenshot */}
              <div className="relative w-full aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-65 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

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
              <div className="p-6 flex flex-col gap-3">
                <h3 className="font-bebas text-3xl text-white">{project.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{project.description}</p>
                <div
                  className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all duration-300"
                  style={{ color: project.accentColor }}
                >
                  View Case Study <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
