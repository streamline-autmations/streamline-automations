import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Target, Lightbulb, TrendingUp } from 'lucide-react';
import { portfolioProjects } from '../data/portfolio';
import Button from '../components/ui/Button';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = portfolioProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark">
        <div className="text-center">
          <h1 className="text-4xl font-ubuntu font-bold text-white mb-4">Project Not Found</h1>
          <Link to="/portfolio" className="text-brand-purple hover:text-brand-orange transition-colors">
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  if (!project.challenge || !project.solution || !project.results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark">
        <div className="text-center">
          <h1 className="text-4xl font-ubuntu font-bold text-white mb-4">Case Study Not Available</h1>
          <Link to="/portfolio" className="text-brand-purple hover:text-brand-orange transition-colors">
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const resultIcons = [CheckCircle2, Target, Lightbulb, TrendingUp];

  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero Header */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-brand-dark/40"></div>
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 md:px-6 pb-12 md:pb-16">
            <Link
              to="/portfolio"
              className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors group"
            >
              <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              Back to Portfolio
            </Link>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-ubuntu font-bold text-white mb-4"
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl font-inter"
            >
              {project.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* The Stack */}
      <section className="py-12 md:py-16 bg-brand-dark/50 border-y border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-gray-400 text-sm md:text-base uppercase tracking-widest mb-6 font-ubuntu">
              Technology Stack
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {project.tags.map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card px-6 py-3 border border-white/10 hover:border-brand-purple/50 transition-all"
                >
                  <span className="text-gray-300 font-ubuntu font-medium text-base md:text-lg">
                    {tag}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Story - Two Column Layout */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 max-w-7xl mx-auto">
            {/* The Challenge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 md:p-10 border border-white/10 hover:border-brand-orange/50 transition-all"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-lg bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-brand-orange" />
                </div>
                <h2 className="text-3xl md:text-4xl font-ubuntu font-bold text-white">
                  The Challenge
                </h2>
              </div>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-inter">
                {project.challenge}
              </p>
            </motion.div>

            {/* The Solution */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 md:p-10 border border-white/10 hover:border-brand-purple/50 transition-all"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-lg bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center mr-4">
                  <Lightbulb className="w-6 h-6 text-brand-purple" />
                </div>
                <h2 className="text-3xl md:text-4xl font-ubuntu font-bold text-white">
                  The Solution
                </h2>
              </div>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-inter">
                {project.solution}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features - Bento Grid */}
      <section className="py-20 md:py-32 bg-brand-purple/5 border-y border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-12 md:mb-16 text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-bold mb-6 bg-gradient-to-r from-brand-purple to-brand-orange bg-clip-text text-transparent">
              Key Results
            </h2>
            <p className="text-lg md:text-xl text-gray-300 font-inter">
              Measurable outcomes that transformed their business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {project.results.map((result, index) => {
              const Icon = resultIcons[index % resultIcons.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card p-8 md:p-10 border border-white/10 hover:border-brand-purple/50 transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-4 bg-gradient-to-br from-brand-purple/30 to-brand-orange/30 rounded-xl border border-brand-purple/30 group-hover:from-brand-purple/40 group-hover:to-brand-orange/40 transition-all">
                      <Icon className="w-7 h-7 md:w-8 md:h-8 text-brand-purple" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xl md:text-2xl font-ubuntu font-bold text-white leading-relaxed">
                        {result}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto mb-12 md:mb-16 text-center"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-bold mb-6 text-white">
                Project Showcase
              </h2>
              <p className="text-lg md:text-xl text-gray-300 font-inter">
                A closer look at the system in action.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
              {project.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card overflow-hidden border border-white/10 hover:border-brand-purple/50 transition-all group"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 bg-brand-dark border-t border-white/10">
        <div className="absolute inset-0 circuit-bg opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-bold text-white mb-6">
              Ready to Build a System Like This?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10 font-inter leading-relaxed">
              Let's discuss how we can create a custom solution tailored to your business needs.
            </p>
            <Button to="/contact" variant="orange" size="lg" className="text-lg">
              Book a Free Call
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;
