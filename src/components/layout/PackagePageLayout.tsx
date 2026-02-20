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

const PackagePageLayout: React.FC<PackagePageLayoutProps> = ({
  children,
  packageName,
  packagePrice,
}) => {
  return (
    <div className="relative overflow-hidden">
      {/* Breadcrumb */}
      <div className="container pt-28 md:pt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-sm text-[color:var(--text-low)] mb-6"
        >
          <Link to="/packages" className="hover:text-white transition-colors">
            Packages
          </Link>
          <ChevronRight size={16} />
          <span className="text-white">{packageName}</span>
        </motion.div>
      </div>

      {/* Main Content */}
      {children}

      {/* Compare Link */}
      <div className="container py-12 relative z-10">
        <Link
          to="/packages"
          className="inline-flex items-center gap-2 text-accent hover:underline transition-all"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Compare all packages
        </Link>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
        <div className="bg-black border-t border-[color:var(--border)] px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium text-sm">{packageName}</p>
              <p className="text-accent font-bold">{packagePrice}</p>
            </div>
            <Link
              to="/contact"
              className="btn btn-nav btn-sm"
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
