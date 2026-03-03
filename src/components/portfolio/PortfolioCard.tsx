import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PortfolioProject } from '../../data/portfolio';

interface PortfolioCardProps {
  project: PortfolioProject;
  index: number;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ project, index }) => {
  const isBigBuild = project.tags.length > 3;
  const hasCaseStudy = Boolean(project.challenge && project.solution);

  const cardContent = (
    <>
      {/* Project Image */}
      <div className="relative overflow-hidden h-56 md:h-64 bg-[color:var(--surface)]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover md:object-cover object-[center_top] scale-90 md:scale-100 transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

        {hasCaseStudy && (
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-brand-purple/90 backdrop-blur-sm border border-brand-purple/50 rounded-full">
            <span className="text-white font-ubuntu font-bold text-xs uppercase tracking-wider">
              Case Study
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-ubuntu font-bold text-white mb-3 group-hover:text-brand-purple transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-300 font-inter leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 bg-[color:var(--surface)] border border-brand-purple/30 rounded-full text-xs md:text-sm text-gray-300 font-inter"
            >
              {tag}
            </span>
          ))}
        </div>

        {hasCaseStudy && (
          <div className="flex items-center text-brand-purple font-ubuntu font-medium group-hover:text-brand-glow transition-colors">
            View Full Case Study
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        )}
      </div>
    </>
  );

  const motionDiv = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`glass-card overflow-hidden border border-white/10 hover:border-brand-purple/50 transition-all duration-300 group ${
        isBigBuild ? 'md:col-span-2' : ''
      } ${hasCaseStudy ? 'cursor-pointer' : ''}`}
    >
      {cardContent}
    </motion.div>
  );

  if (hasCaseStudy) {
    return (
      <Link to={`/portfolio/${project.id}`} className="block">
        {motionDiv}
      </Link>
    );
  }

  return motionDiv;
};

export default PortfolioCard;
