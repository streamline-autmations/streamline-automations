import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';

const packageLinks = [
  { name: 'Online Presence', path: '/packages/online-presence', subtext: 'From R7,500 · 3–5 days' },
  { name: 'Client Magnet', path: '/packages/client-magnet', subtext: 'From R15,000 · 5–7 days ⭐ Most Popular' },
  { name: 'Business Accelerator', path: '/packages/business-accelerator', subtext: 'From R30,000 · 7–10 days' },
];

const moreLinks = [
  { name: 'Add-Ons & Branding', path: '/add-ons' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPackagesDropdownOpen, setIsPackagesDropdownOpen] = useState(false);
  const [isMobilePackagesOpen, setIsMobilePackagesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    setIsMobilePackagesOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPackagesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isPackagesActive = location.pathname.startsWith('/packages');

  return (
    <header className="navbar">
      <div className="w-full">
        {/* Mobile Layout: Hamburger Left, Logo Center, Empty Right */}
        <div className="relative flex md:hidden items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button
            className="text-gray-200 hover:text-white p-3 z-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Centered Logo */}
          <Link to="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1765275983/Streamline-White_1_yf5ow5.svg"
              alt="Streamline Automations"
              className="h-7 w-auto"
            />
          </Link>

          {/* Empty space for balance */}
          <div className="w-16 z-10"></div>
        </div>

        {/* Desktop Layout: Logo Left, Nav Center, Button Right */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1765275983/Streamline-White_1_yf5ow5.svg"
              alt="Streamline Automations"
              className="h-6 lg:h-7 w-auto"
            />
            <span className="hidden lg:block font-ubuntu font-bold text-lg text-white">
              Streamline Automations
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="flex items-center space-x-8 lg:space-x-10">
            <ul className="flex items-center space-x-2 lg:space-x-3">
              <li>
                <Link
                  to="/"
                  className="inline-block px-3 py-2 text-base font-ubuntu font-medium border-b-2 transition-all duration-300 text-[color:var(--text-mid)] hover:text-white"
                  style={{ borderBottomColor: location.pathname === '/' ? 'var(--purple)' : 'transparent', color: location.pathname === '/' ? 'white' : 'var(--text-mid)' }}
                >
                  Home
                </Link>
              </li>

              {/* Packages with Dropdown */}
              <li className="relative">
                <button
                  onClick={() => setIsPackagesDropdownOpen(!isPackagesDropdownOpen)}
                  onMouseEnter={() => setIsPackagesDropdownOpen(true)}
                  className="inline-flex items-center gap-1 px-3 py-2 text-base font-ubuntu font-medium border-b-2 transition-all duration-300 text-[color:var(--text-mid)] hover:text-white"
                  style={{ borderBottomColor: isPackagesActive ? 'var(--purple)' : 'transparent', color: isPackagesActive ? 'white' : 'var(--text-mid)' }}
                >
                  Packages
                  <ChevronDown size={16} className={`transition-transform duration-200 ${isPackagesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isPackagesDropdownOpen && (
                    <motion.div
                      ref={dropdownRef}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-72 bg-black border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                    >
                      {/* PACKAGES Group */}
                      <div className="px-4 pt-3 pb-1">
                        <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">Packages</span>
                      </div>
                      {packageLinks.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsPackagesDropdownOpen(false)}
                          className="block px-4 py-3 mx-2 rounded-lg hover:bg-white/5 transition-colors group"
                        >
                          <div className="text-sm font-ubuntu font-medium text-gray-200 group-hover:text-white">{item.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{item.subtext}</div>
                        </Link>
                      ))}

                      {/* Divider */}
                      <div className="mx-4 my-2 h-px bg-white/10" />

                      {/* MORE Group */}
                      <div className="px-4 pt-2 pb-1">
                        <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">More</span>
                      </div>
                      {moreLinks.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsPackagesDropdownOpen(false)}
                          className="block px-4 py-3 mx-2 rounded-lg hover:bg-white/5 transition-colors group"
                        >
                          <div className="text-sm font-ubuntu font-medium text-gray-200 group-hover:text-white">{item.name}</div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              <li>
                <Link
                  to="/portfolio"
                  className="inline-block px-3 py-2 text-base font-ubuntu font-medium border-b-2 transition-all duration-300 text-[color:var(--text-mid)] hover:text-white"
                  style={{ borderBottomColor: location.pathname === '/portfolio' ? 'var(--purple)' : 'transparent', color: location.pathname === '/portfolio' ? 'white' : 'var(--text-mid)' }}
                >
                  Portfolio
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="inline-block px-3 py-2 text-base font-ubuntu font-medium border-b-2 transition-all duration-300 text-[color:var(--text-mid)] hover:text-white"
                  style={{ borderBottomColor: location.pathname === '/contact' ? 'var(--purple)' : 'transparent', color: location.pathname === '/contact' ? 'white' : 'var(--text-mid)' }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Desktop CTA Button */}
          <Button href="/contact" variant="ghost-purple" size="md" className="btn btn-nav">
            Book a Free Call
          </Button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 bg-black border-t border-white/10 ${
            isMenuOpen ? 'max-h-[calc(100vh-64px)] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <nav className="py-6 px-2">
            <ul className="flex flex-col space-y-2">
              <li>
                <Link
                  to="/"
                  className="block py-3 px-4 text-base font-ubuntu font-medium transition-all duration-300 border-l-2"
                  style={{ borderLeftColor: location.pathname === '/' ? 'var(--purple)' : 'transparent', color: location.pathname === '/' ? 'white' : 'var(--text-mid)' }}
                >
                  Home
                </Link>
              </li>

              {/* Packages with Dropdown (Mobile) */}
              <li>
                <button
                  onClick={() => setIsMobilePackagesOpen(!isMobilePackagesOpen)}
                  className="w-full flex items-center justify-between py-3 px-4 text-base font-ubuntu font-medium transition-all duration-300 border-l-2"
                  style={{ borderLeftColor: isPackagesActive ? 'var(--purple)' : 'transparent', color: isPackagesActive ? 'white' : 'var(--text-mid)' }}
                >
                  <span>Packages</span>
                  <ChevronDown size={18} className={`transition-transform duration-200 ${isMobilePackagesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isMobilePackagesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden ml-2 border-l border-white/10 ml-4"
                    >
                      {/* Package links */}
                      {packageLinks.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => { setIsMobilePackagesOpen(false); setIsMenuOpen(false); }}
                          className="block py-2.5 pl-4 pr-4 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{item.subtext}</div>
                        </Link>
                      ))}
                      
                      {/* Divider */}
                      <div className="mx-4 my-2 h-px bg-white/10" />
                      
                      {/* More links */}
                      {moreLinks.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => { setIsMobilePackagesOpen(false); setIsMenuOpen(false); }}
                          className="block py-2.5 pl-4 pr-4 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              <li>
                <Link
                  to="/portfolio"
                  className="block py-3 px-4 text-base font-ubuntu font-medium transition-all duration-300 border-l-2"
                  style={{ borderLeftColor: location.pathname === '/portfolio' ? 'var(--purple)' : 'transparent', color: location.pathname === '/portfolio' ? 'white' : 'var(--text-mid)' }}
                >
                  Portfolio
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="block py-3 px-4 text-base font-ubuntu font-medium transition-all duration-300 border-l-2"
                  style={{ borderLeftColor: location.pathname === '/contact' ? 'var(--purple)' : 'transparent', color: location.pathname === '/contact' ? 'white' : 'var(--text-mid)' }}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <div className="mt-8 px-4">
              <Button href="/contact" variant="ghost-purple" size="lg" className="btn btn-nav w-full">
                Book a Free Call
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
