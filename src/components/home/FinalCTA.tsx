import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const FinalCTA: React.FC = () => {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden">
      <div className="absolute -right-40 top-1/2 w-[800px] h-[800px] bg-gradient-to-l from-brand-orange/30 to-brand-purple/30 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute -left-40 bottom-0 w-[600px] h-[600px] bg-gradient-to-r from-brand-purple/20 to-transparent rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-8">
            <span className="text-sm md:text-base font-ubuntu font-bold text-brand-orange bg-brand-orange/10 px-4 py-2 rounded-full border border-brand-orange/20">
              Ready to Transform?
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-ubuntu font-bold text-white mb-8 leading-tight">
            Ready to stop doing everything manually?
          </h2>

          <p className="text-lg md:text-xl text-gray-300 mb-12 font-inter leading-relaxed max-w-2xl mx-auto">
            Book a free 20-minute strategy call. We'll map out exactly what your business needs — no pitch, no pressure.
          </p>

          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-brand-orange hover:bg-brand-orange/90 text-white font-ubuntu font-semibold rounded-full transition-all duration-300"
          >
            Book a Free Strategy Call →
          </a>

          <p className="text-sm md:text-base text-gray-500 mt-10 font-inter">
            Free consultation • No commitment • Results-driven approach
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent"></div>
    </section>
  );
};

export default FinalCTA;
