import React, { useState, useEffect } from 'react';
import { X, Download, ArrowRight } from 'lucide-react';

const ExitIntentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        // Store in sessionStorage so it doesn't show again this session
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    // Check if already shown this session
    if (sessionStorage.getItem('exitIntentShown')) {
      setHasShown(true);
    }

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would submit to a service like Mailchimp
    alert('Thanks! Check your email for the free guide.');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[#1a1730] border border-brand-purple/30 rounded-2xl p-8 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-brand-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Download className="w-8 h-8 text-brand-purple" />
          </div>

          {/* Headline */}
          <h2 className="text-2xl font-ubuntu font-bold text-white mb-3">
            Wait! Don't leave yet.
          </h2>

          {/* Subheadline */}
          <p className="text-gray-300 mb-6">
            Get our free guide: <span className="text-white font-semibold">"10 Tasks Every Service Business Should Automate First"</span>
          </p>

          {/* Benefits list */}
          <ul className="text-left text-sm text-gray-400 mb-6 space-y-2">
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
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-purple transition-colors"
            />
            <button
              type="submit"
              className="w-full btn btn-primary btn-xl justify-center"
            >
              Send My Free Guide
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </form>

          {/* Disclaimer */}
          <p className="text-xs text-gray-500 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
