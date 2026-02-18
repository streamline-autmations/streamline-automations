import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';

interface PackagePageLayoutProps {
  children: React.ReactNode;
  packageName: string;
  packagePrice: string;
  accentColor: 'white' | 'orange' | 'purple';
}

const accentColors = {
  white: {
    bg: 'bg-white/10',
    text: 'text-white',
    border: 'border-white/20',
    glow: 'rgba(255, 255, 255, 0.3)',
    badge: 'bg-white/10',
  },
  orange: {
    bg: 'bg-brand-orange/10',
    text: 'text-brand-orange',
    border: 'border-brand-orange/20',
    glow: 'rgba(249, 115, 22, 0.3)',
    badge: 'bg-brand-orange/10',
  },
  purple: {
    bg: 'bg-brand-purple/10',
    text: 'text-brand-purple',
    border: 'border-brand-purple/20',
    glow: 'rgba(168, 85, 247, 0.3)',
    badge: 'bg-brand-purple/10',
  },
};

const PackagePageLayout: React.FC<PackagePageLayoutProps> = ({
  children,
  packageName,
  packagePrice,
  accentColor,
}) => {
  const colors = accentColors[accentColor];

  return (
    <div className="relative overflow-hidden">
      {/* Atmospheric Orbs */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-brand-orange/10 blur-[100px] rounded-full animate-blob pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-brand-purple/10 blur-[120px] rounded-full animate-blob pointer-events-none" style={{ animationDelay: '4s' }}></div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-6 pt-28 md:pt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-sm text-gray-400 mb-6"
        >
          <Link to="/packages" className="hover:text-white transition-colors">
            Packages
          </Link>
          <ChevronRight size={16} />
          <span className={colors.text}>{packageName}</span>
        </motion.div>
      </div>

      {/* Main Content */}
      {children}

      {/* Compare Link */}
      <div className="container mx-auto px-4 md:px-6 py-12 relative z-10">
        <Link
          to="/packages"
          className={`inline-flex items-center gap-2 ${colors.text} hover:underline transition-all`}
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Compare all packages
        </Link>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
        <div className={`${colors.bg} backdrop-blur-md border-t ${colors.border} px-4 py-3`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium text-sm">{packageName}</p>
              <p className={`${colors.text} font-bold`}>{packagePrice}</p>
            </div>
            <Link
              to="/contact"
              className={`px-4 py-2 ${colors.bg.replace('/10', '/20')} ${colors.text} rounded-lg font-medium text-sm`}
            >
              Book a Call
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer for mobile bottom bar */}
      <div className="md:hidden h-20"></div>
    </div>
  );
};

export default PackagePageLayout;
