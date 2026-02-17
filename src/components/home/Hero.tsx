import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import DigitalEcosystemStack from './DigitalEcosystemStack';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden">
      {/* High-tech background with circuit pattern */}
      <div className="absolute inset-0 bg-brand-dark">
        {/* Circuit pattern overlay */}
        <div className="absolute inset-0 circuit-bg opacity-30"></div>

        {/* Organic gradient blurs */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-brand-orange/30 to-brand-purple/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-bl from-brand-purple/30 to-brand-orange/20 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Hero Logo - Above Grid */}
        <div className="mb-12 lg:mb-16 flex justify-center">
          <div className="relative group">
            <img
              src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1765275983/Streamline-White_1_yf5ow5.svg"
              alt="Streamline Automations"
              className="h-20 md:h-28 lg:h-32 w-auto opacity-90 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 to-brand-orange/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-ubuntu font-bold mb-8 px-2 lg:px-0 leading-tight text-white">
              Stop Trading Time for Money.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-glow">
                Automate It.
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 px-4 lg:px-0 font-inter leading-relaxed">
              We build the digital infrastructure that runs your business for you. From high-performance websites to AI sales agents—scale without the chaos.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-16 lg:mb-0 justify-center lg:justify-start px-4 lg:px-0">
              <Button variant="orange" to="/contact" size="lg" className="w-full sm:w-auto text-lg">
                Start Your Build
              </Button>

              <Button
                variant="ghost"
                to="/portfolio"
                size="lg"
                className="w-full sm:w-auto text-lg"
              >
                View Our Work
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right Column - Digital Ecosystem Stack */}
          <DigitalEcosystemStack />
        </div>

        {/* Stats Section - Clean Grid with Dividers */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-8 md:gap-0 items-center text-center">
            <div className="group py-8 md:py-10">
              <div className="text-2xl md:text-3xl lg:text-4xl font-ubuntu font-bold text-white mb-4 transition-transform duration-300 group-hover:scale-110">Instant Response</div>
              <div className="text-base md:text-lg text-gray-500 font-inter">Never keep a lead waiting.</div>
            </div>

            {/* Vertical Divider 1 */}
            <div className="hidden md:flex items-center justify-center">
              <div className="w-[1px] h-12 bg-white/10"></div>
            </div>

            <div className="group py-8 md:py-10">
              <div className="text-2xl md:text-3xl lg:text-4xl font-ubuntu font-bold text-white mb-4 transition-transform duration-300 group-hover:scale-110">Eliminate Admin</div>
              <div className="text-base md:text-lg text-gray-500 font-inter">Stop doing repetitive work.</div>
            </div>

            {/* Vertical Divider 2 */}
            <div className="hidden md:flex items-center justify-center">
              <div className="w-[1px] h-12 bg-white/10"></div>
            </div>

            <div className="group py-8 md:py-10">
              <div className="text-2xl md:text-3xl lg:text-4xl font-ubuntu font-bold text-white mb-4 transition-transform duration-300 group-hover:scale-110">24/7 Capture</div>
              <div className="text-base md:text-lg text-gray-500 font-inter">Your business never sleeps.</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-purple/50 to-transparent animate-pulse"></div>
    </section>
  );
};

export default Hero;
