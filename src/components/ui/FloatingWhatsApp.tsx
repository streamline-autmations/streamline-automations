import React, { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingWhatsApp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Show after 3 seconds
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-50 flex items-end gap-4"
        >
          {/* Tooltip Message */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow-xl text-sm font-medium whitespace-nowrap hidden md:block"
              >
                Chat with us on WhatsApp
                <div className="absolute right-[-6px] bottom-4 w-3 h-3 bg-white transform rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <a
            href="https://wa.me/27633063861"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg shadow-green-500/30 transition-all duration-300 group flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <MessageSquare className="w-6 h-6 fill-current" />
            
            {/* Notification Dot */}
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0d0b1a]"></span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingWhatsApp;
