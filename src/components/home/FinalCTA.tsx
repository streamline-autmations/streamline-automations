import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const FinalCTA: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-block mb-8">
          <span className="label">Ready to Transform?</span>
        </div>

        <h2 className="h2 mb-8">Ready to stop doing everything manually?</h2>

        <p className="body text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          Book a free 20-minute strategy call. We'll map out exactly what your business needs — no pitch, no pressure.
        </p>

        <a href="/contact" className="btn btn-primary btn-xl btn-fw sm:w-auto">
          Book a Free Strategy Call →
        </a>

        <p className="body-sm mt-10">Free consultation • No commitment • Results-driven approach</p>
      </div>
    </div>
  );
};

export default FinalCTA;
