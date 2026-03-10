import React from 'react';
import { motion } from 'framer-motion';
import DigitalEcosystemStack from './DigitalEcosystemStack';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center pt-12 pb-24 overflow-hidden">
      <div className="relative z-10 w-full">
        {/* Hero Logo - Above Grid */}
        <div className="mb-10 lg:mb-12 flex justify-center">
          <div className="relative group">
            <img
              src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1765275983/Streamline-White_1_yf5ow5.svg"
              alt="Streamline Automations"
              className="h-20 md:h-28 lg:h-32 w-auto opacity-90 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105 logo-hover-glow"
            />
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="h1 mb-6 leading-tight">
                Automate Your Business.{' '}
                <span className="text-[color:var(--purple)] block mt-2">
                  Scale Without Burnout.
                </span>
              </h1>

              <p className="body text-lg sm:text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto lg:mx-0">
                We build custom systems that capture leads, automate bookings, and chase payments 24/7. 
                <span className="text-white font-medium block mt-2">
                  Stop doing the busy work. Start growing.
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <a 
                  href="/contact" 
                  className="btn btn-orange btn-xl btn-fw sm:w-auto group"
                  aria-label="Get Your Automation Audit - Book a free consultation"
                >
                  Get Your Automation Audit
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <a 
                  href="/portfolio" 
                  className="btn btn-secondary btn-xl btn-fw sm:w-auto"
                  aria-label="See Real Results - View our portfolio"
                >
                  See Real Results
                </a>
              </div>

              {/* Trusted By Section */}
              <div className="pt-8 border-t border-white/10">
                <p className="text-sm text-gray-500 uppercase tracking-widest mb-4 font-semibold">
                  Trusted by growing brands
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-8 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                  {/* Client Logos (Text representation for now, replace with SVGs later) */}
                  <span className="text-xl font-bold font-ubuntu text-white">RecklessBear</span>
                  <span className="text-xl font-bold font-serif italic text-white">BLOM Cosmetics</span>
                  <span className="text-xl font-light tracking-[0.2em] text-white">AMELI VAN ZYL</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Digital Ecosystem Stack */}
          <div className="relative">
            <div className="absolute -inset-4 bg-brand-purple/20 blur-3xl rounded-full opacity-30 animate-pulse"></div>
            <DigitalEcosystemStack />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
