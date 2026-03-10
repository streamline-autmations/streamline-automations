import React from 'react';
import { motion } from 'framer-motion';
import DigitalEcosystemStack from './DigitalEcosystemStack';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center pt-12 pb-24 overflow-hidden">
      {/* Ambient background glow */}
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-orange/10 rounded-full blur-[100px]" />
      </motion.div>

      <div className="relative z-10 w-full">
        {/* Hero Logo - Above Grid */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 lg:mb-12 flex justify-center"
        >
          <div className="relative group">
            <motion.img
              src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1765275983/Streamline-White_1_yf5ow5.svg"
              alt="Streamline Automations"
              className="h-20 md:h-28 lg:h-32 w-auto opacity-90 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105 logo-hover-glow"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            {/* Glow ring */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 bg-brand-purple/30 blur-xl rounded-full -z-10"
            />
          </div>
        </motion.div>

        {/* Two Column Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="h1 mb-6 leading-tight">
                Automate Your Business.{' '}
                <span className="text-[color:var(--purple)] block mt-2">
                  Scale Without Burnout.
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="body text-lg sm:text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto lg:mx-0">
                We build custom systems that capture leads, automate bookings, and chase payments 24/7. 
                <span className="text-white font-medium block mt-2">
                  Stop doing the busy work. Start growing.
                </span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-10"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.a 
                  href="/contact" 
                  className="btn btn-orange btn-xl btn-fw sm:w-auto group relative overflow-hidden"
                  aria-label="Get Your Automation Audit - Book a free consultation"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center">
                    Get Your Automation Audit
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  {/* Shine effect */}
                  <motion.div
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  />
                </motion.a>

                <motion.a 
                  href="/portfolio" 
                  className="btn btn-secondary btn-xl btn-fw sm:w-auto"
                  aria-label="See Real Results - View our portfolio"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  See Real Results
                </motion.a>
              </div>
            </motion.div>

            {/* Trusted By Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-8 border-t border-white/10"
            >
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-4 font-semibold">
                Trusted by growing brands
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 items-center">
                {[
                  { name: 'RecklessBear', delay: 0.5 },
                  { name: 'BLOM Cosmetics', delay: 0.6 },
                  { name: 'AMELI VAN ZYL', delay: 0.7 }
                ].map((client) => (
                  <motion.span
                    key={client.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.7, y: 0 }}
                    transition={{ delay: client.delay }}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                    className="text-xl font-bold text-white cursor-default"
                  >
                    {client.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Digital Ecosystem Stack - Hidden on mobile */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:block relative"
          >
            <motion.div
              animate={{
                y: [-10, 10, -10]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="relative z-10"
            >
              <div className="absolute -inset-4 bg-brand-purple/20 blur-3xl rounded-full opacity-30"></div>
              <DigitalEcosystemStack />
            </motion.div>
            
            {/* Floating particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.5, 0],
                  y: [0, -30, 0]
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeInOut'
                }}
                className="absolute w-2 h-2 bg-brand-purple/50 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
