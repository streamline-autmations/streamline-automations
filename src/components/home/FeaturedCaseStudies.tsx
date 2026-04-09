import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { springStagger, bentoCard, viewport } from '../../lib/motion';
import BracketCard from '../ui/BracketCard';
import GradientText from '../ui/GradientText';

const projects = [
  {
    id: 1,
    tag: 'E-commerce Infrastructure',
    title: 'BLOM Cosmetics',
    description: 'Full e-commerce store, admin dashboard, BLOM Academy, email + WhatsApp automation and monthly retainer.',
    image: 'https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=1200',
    path: '/portfolio/blom-cosmetics',
    color: 'purple' as const,
    accentColor: '#774CFC',
  },
  {
    id: 2,
    tag: 'Systems & Automation',
    title: 'RecklessBear Apparel',
    description: 'Website, CRM, 12-stage order tracking, inventory management, WhatsApp automation and monthly retainer.',
    image: 'https://images.pexels.com/photos/3588365/pexels-photo-3588365.jpeg?auto=compress&cs=tinysrgb&w=1200',
    path: '/portfolio/recklesbear',
    color: 'orange' as const,
    accentColor: '#F26A3D',
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
                {/* Image with strong gradient overlay */}
                <div className="relative w-full aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-55 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  {/* Tag overlay on image */}
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
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col gap-3">
                  <h3 className="font-bebas text-3xl text-white group-hover:text-white/90 transition-colors">
                    <GradientText>{project.title}</GradientText>
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
