import React from 'react';
import { ArrowRight } from 'lucide-react';
import DigitalEcosystemStack from './DigitalEcosystemStack';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center pt-20 pb-24 overflow-hidden">
      <div className="relative z-10">
        {/* Hero Logo - Above Grid */}
        <div className="mb-12 lg:mb-16 flex justify-center">
          <div className="relative group">
            <img
              src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1765275983/Streamline-White_1_yf5ow5.svg"
              alt="Streamline Automations"
              className="h-20 md:h-28 lg:h-32 w-auto opacity-90 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105"
            />
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <h1 className="h1 mb-8 px-2 lg:px-0">
              Stop Trading Time for Money.{' '}
              <span className="text-accent">
                Automate It.
              </span>
            </h1>

            <p className="body text-lg sm:text-xl md:text-2xl mb-12 px-4 lg:px-0">
              We build websites and automation systems for local service businesses —
              so leads come in, bookings get confirmed, and follow-ups happen
              automatically. Without you lifting a finger.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center px-4 lg:px-0">
              <a href="/contact" className="btn btn-primary btn-xl btn-fw md:w-auto">
                Book a Free Strategy Call
              </a>

              <a href="/portfolio" className="btn btn-secondary btn-xl btn-fw md:w-auto">
                See Our Work
              </a>
            </div>
          </div>

          {/* Right Column - Digital Ecosystem Stack */}
          <DigitalEcosystemStack />
        </div>

        {/* Stats Section - Clean Grid with Dividers */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-8 md:gap-0 items-center text-center">
            <div className="group py-8 md:py-10">
              <div className="text-2xl md:text-3xl lg:text-4xl font-ubuntu font-bold text-[color:var(--text-high)] mb-4 transition-transform duration-300 group-hover:scale-110">Instant Response</div>
              <div className="text-base md:text-lg text-[color:var(--text-low)] font-inter">Never keep a lead waiting.</div>
            </div>

            {/* Vertical Divider 1 */}
            <div className="hidden md:flex items-center justify-center">
              <div className="w-[1px] h-12 bg-white/10"></div>
            </div>

            <div className="group py-8 md:py-10">
              <div className="text-2xl md:text-3xl lg:text-4xl font-ubuntu font-bold text-[color:var(--text-high)] mb-4 transition-transform duration-300 group-hover:scale-110">Eliminate Admin</div>
              <div className="text-base md:text-lg text-[color:var(--text-low)] font-inter">Stop doing repetitive work.</div>
            </div>

            {/* Vertical Divider 2 */}
            <div className="hidden md:flex items-center justify-center">
              <div className="w-[1px] h-12 bg-white/10"></div>
            </div>

            <div className="group py-8 md:py-10">
              <div className="text-2xl md:text-3xl lg:text-4xl font-ubuntu font-bold text-[color:var(--text-high)] mb-4 transition-transform duration-300 group-hover:scale-110">24/7 Capture</div>
              <div className="text-base md:text-lg text-[color:var(--text-low)] font-inter">Your business never sleeps.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
