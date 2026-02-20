import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

const FeaturedCaseStudies: React.FC = () => {
  const projects = [
    {
      id: 1,
      tag: 'E-commerce Infrastructure',
      tagColor: 'text-brand-purple',
      title: 'BLOM Cosmetics',
      description: 'Full-stack inventory command center & custom store.',
      image: 'https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
      id: 2,
      tag: 'AI Automation System',
      tagColor: 'text-accent',
      title: 'RecklessBear Apparel',
      description: 'Automated quote-engine with 24/7 AI booking agent.',
      image: 'https://images.pexels.com/photos/3588365/pexels-photo-3588365.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
  ];

  return (
    <Section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute -left-40 top-1/2 w-[800px] h-[800px] bg-gradient-to-r from-brand-purple/20 to-transparent rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading
          title="Featured Builds"
          subtitle="Real systems solving real business problems"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project) => (
            <Link
              key={project.id}
              to="/portfolio"
              className="group"
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-brand-purple/20 to-transparent">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className={`text-xs font-ubuntu font-bold uppercase tracking-wider mb-3 ${project.tagColor}`}>
                    {project.tag}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-ubuntu font-bold text-white mb-3 group-hover:text-brand-purple transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 mb-6 flex-1">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-2 text-brand-purple group-hover:gap-3 transition-all duration-300">
                    <span className="text-sm font-ubuntu font-bold">View Case Study</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default FeaturedCaseStudies;
