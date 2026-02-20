import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Zap, Database, BarChart } from 'lucide-react';
import Button from '../../components/ui/Button';
import CircuitLine from '../../components/ui/CircuitLine';

const Automation: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const techStack = ['n8n', 'OpenAI (GPT-4)', 'Voiceflow', 'Supabase', 'Stripe Connect'];

  const valueCards = [
    {
      icon: Bot,
      title: 'The 24/7 Employee',
      description: 'Your AI agent never sleeps, never gets sick, and answers every customer inquiry instantly, day or night.'
    },
    {
      icon: Zap,
      title: 'Instant Lead Capture',
      description: 'Connect your forms directly to WhatsApp. Contact new leads within seconds of them signing up.'
    },
    {
      icon: Database,
      title: 'Zero Data Entry',
      description: "Stop copy-pasting between spreadsheets. We sync your website, CRM, and accounting software automatically."
    },
    {
      icon: BarChart,
      title: 'Live Metrics',
      description: 'View your sales and stock levels in real-time on a custom dashboard designed for your exact KPIs.'
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: 'Audit',
      description: 'We analyze your manual bottlenecks.'
    },
    {
      number: 2,
      title: 'Map',
      description: 'We design the logic flow and decision trees.'
    },
    {
      number: 3,
      title: 'Build',
      description: 'We develop the bots and webhooks (n8n).'
    },
    {
      number: 4,
      title: 'Handover',
      description: 'We train you on how to monitor your new system.'
    }
  ];

  return (
    <div className="relative min-h-screen bg-brand-dark overflow-hidden">
      {/* Animated Background Orbs */}

      {/* Section A: The Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
        {/* Circuit background pattern */}

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            className="max-w-5xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-ubuntu font-bold mb-6 md:mb-8 leading-tight px-2"
              variants={fadeInUp}
            >
              AI &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-transparent">Automation</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed font-inter px-4"
              variants={fadeInUp}
            >
              Systems that work while you sleep.
            </motion.p>

            {/* CircuitLine Divider */}
            <motion.div variants={fadeInUp} className="mb-10 md:mb-12">
              <CircuitLine variant="fast" />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Button to="/contact" variant="orange" size="lg" className="text-lg">
                Automate Your Workflow
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section B: The "Automation Engine" (Tech Bar) */}
      <section className="relative py-12 md:py-16 bg-brand-dark/50 border-y border-white/10">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-gray-400 text-sm md:text-base uppercase tracking-widest mb-8 md:mb-10 font-ubuntu">
              Built with enterprise-grade logic.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-center px-4 md:px-6 py-3 glass-card rounded-lg border border-white/10 hover:border-brand-purple/50 transition-all min-w-[140px]"
                >
                  <span className="text-gray-300 font-ubuntu font-medium text-sm md:text-base text-center">
                    {tech}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section C: The Value Grid (Bento Style) */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-12 md:mb-16 text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-ubuntu font-bold mb-6 text-white">
              Automation That Works While You Sleep
            </h2>
            <p className="text-lg md:text-xl text-gray-300 font-inter">
              Deploy intelligent systems that handle the heavy lifting.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {valueCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card p-8 md:p-10 border border-white/10 hover:border-brand-purple/50 transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="flex-shrink-0 p-4 bg-gradient-to-br from-brand-purple/20 to-transparent rounded-xl border border-white/10 group-hover:border-brand-purple/50 transition-all">
                      <Icon className="w-7 h-7 md:w-8 md:h-8 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-ubuntu font-bold text-white mb-3">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-300 font-inter leading-relaxed text-base md:text-lg">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section D: The "Optimization" Process (Timeline) */}
      <section className="relative py-20 md:py-32 bg-brand-purple/5 border-y border-white/10">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-12 md:mb-16 text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-ubuntu font-bold mb-6 text-white">
              The Automation Roadmap.
            </h2>
            <p className="text-lg md:text-xl text-gray-300 font-inter">
              From bottleneck analysis to autonomous operations.
            </p>
          </motion.div>

          {/* Desktop: Horizontal Timeline */}
          <div className="hidden md:grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                <div className="glass-card p-8 border border-white/10 h-full flex flex-col items-center text-center hover:border-brand-purple/50 transition-all duration-300 group">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-purple to-purple-400 flex items-center justify-center mb-6 font-ubuntu font-bold text-2xl text-white group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-ubuntu font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>

                {index < processSteps.length - 1 && (
                  <div className="absolute top-10 -right-3 w-6 h-0.5 bg-gradient-to-r from-brand-purple to-transparent"></div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile: Vertical Timeline */}
          <div className="md:hidden space-y-6 max-w-md mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="glass-card p-8 border border-white/10 hover:border-brand-purple/50 transition-all duration-300">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-brand-purple to-purple-400 flex items-center justify-center font-ubuntu font-bold text-xl text-white">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-ubuntu font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {index < processSteps.length - 1 && (
                  <div className="absolute left-11 top-[calc(100%)] w-0.5 h-6 bg-gradient-to-b from-brand-purple to-transparent"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-ubuntu font-bold text-white mb-6">
              Ready to Run on Autopilot?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10 font-inter leading-relaxed">
              Let's build intelligent systems that scale your business without scaling your team.
            </p>
            <Button to="/contact" variant="orange" size="lg" className="text-lg">
              Automate Your Workflow
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Automation;
