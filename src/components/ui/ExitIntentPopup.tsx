import React, { useState, useEffect } from 'react';
import { X, Download, ArrowRight } from 'lucide-react';

const ExitIntentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  // Only show on desktop (mouse exit doesn't work well on touch)
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown && window.innerWidth > 768) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    if (sessionStorage.getItem('exitIntentShown')) {
      setHasShown(true);
    }

    if (isDesktop) {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown, isDesktop]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thanks! Check your email for the free guide.');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal - Mobile Responsive */}
      <div className="relative bg-[#1a1730] border border-brand-purple/30 rounded-xl md:rounded-2xl p-5 md:p-8 max-w-md md:max-w-lg w-full shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-white transition-colors p-1"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-purple/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
            <Download className="w-6 h-6 md:w-8 md:h-8 text-brand-purple" />
          </div>

          {/* Headline */}
          <h2 className="text-xl md:text-2xl font-ubuntu font-bold text-white mb-2 md:mb-3">
            Wait! Don't leave yet.
          </h2>

          {/* Subheadline */}
          <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6">
            Get our free guide: <span className="text-white font-semibold">"10 Tasks Every Service Business Should Automate First"</span>
          </p>

          {/* Benefits list */}
          <ul className="text-left text-xs md:text-sm text-gray-400 mb-4 md:mb-6 space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-brand-green">✓</span>
              Save 5+ hours every week
            </li>
            <li className="flex items-center gap-2">
              <span className="text-brand-green">✓</span>
              Capture 30% more leads
            </li>
            <li className="flex items-center gap-2">
              <span className="text-brand-green">✓</span>
              Stop chasing payments manually
            </li>
          </ul>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple transition-colors text-sm md:text-base"
            />
            <button
              type="submit"
              className="w-full btn btn-primary btn-lg md:btn-xl justify-center text-sm md:text-base"
            >
              Send My Free Guide
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </button>
          </form>

          {/* Disclaimer */}
          <p className="text-xs text-gray-500 mt-3 md:mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
