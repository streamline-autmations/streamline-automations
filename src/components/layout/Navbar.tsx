import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const serviceLinks = [
    { name: 'Branding & Design', path: '/services/branding' },
    { name: 'Web Development', path: '/services/development' },
    { name: 'Automation', path: '/services/automation' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-brand-dark/80 backdrop-blur-md border-b border-white/5'
          : 'py-4 md:py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Mobile Layout: Hamburger Left, Logo Center, Empty Right */}
        <div className="flex md:hidden items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className="text-gray-200 hover:text-white p-3"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Centered Logo */}
          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
            <img
              src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1765279919/Streamline-black_500_x_186_px_scthzc.svg"
              alt="Streamline Automations"
              className="h-8 w-auto"
            />
          </Link>

          {/* Empty space for balance */}
          <div className="w-16"></div>
        </div>

        {/* Desktop Layout: Logo Left, Nav Center, Button Right */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1765279919/Streamline-black_500_x_186_px_scthzc.svg"
              alt="Streamline Automations"
              className="h-8 lg:h-10 w-auto"
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
                  className={`inline-block px-3 py-2 rounded-lg text-base font-ubuntu font-medium transition-all duration-300 ${
                    location.pathname === '/'
                      ? 'text-brand-purple bg-brand-purple/10'
                      : 'text-gray-200 hover:text-brand-purple hover:bg-brand-purple/10'
                  }`}
                >
                  Home
                </Link>
              </li>

              {/* Services with Hover Dropdown */}
              <li className="relative group">
                <Link
                  to="/packages"
                  className={`inline-block px-3 py-2 rounded-lg text-base font-ubuntu font-medium transition-all duration-300 ${
                    location.pathname === '/packages'
                      ? 'text-brand-purple bg-brand-purple/10'
                      : 'text-gray-200 hover:text-brand-purple hover:bg-brand-purple/10'
                  }`}
                >
                  Packages
                </Link>

                {/* Dropdown Menu - appears on hover */}
                <div className="absolute top-full left-0 mt-2 w-56 glass-card shadow-glass opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 -translate-y-2 group-hover:translate-y-0">
                  <div className="py-2">
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="block px-4 py-3 text-gray-300 hover:text-brand-purple hover:bg-brand-purple/10 transition-all duration-300"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>

              <li>
                <Link
                  to="/portfolio"
                  className={`inline-block px-3 py-2 rounded-lg text-base font-ubuntu font-medium transition-all duration-300 ${
                    location.pathname === '/portfolio'
                      ? 'text-brand-purple bg-brand-purple/10'
                      : 'text-gray-200 hover:text-brand-purple hover:bg-brand-purple/10'
                  }`}
                >
                  Portfolio
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className={`inline-block px-3 py-2 rounded-lg text-base font-ubuntu font-medium transition-all duration-300 ${
                    location.pathname === '/contact'
                      ? 'text-brand-purple bg-brand-purple/10'
                      : 'text-gray-200 hover:text-brand-purple hover:bg-brand-purple/10'
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Desktop CTA Button */}
          <Button to="/contact" variant="primary" size="md">
            Book a Free Call
          </Button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden bg-brand-dark border-t border-white/10 ${
            isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-6 px-2">
            <ul className="flex flex-col space-y-2">
              <li>
                <Link
                  to="/"
                  className={`block py-3 px-4 text-base font-ubuntu font-medium transition-all duration-300 rounded-lg ${
                    location.pathname === '/'
                      ? 'text-brand-purple bg-brand-purple/10'
                      : 'text-gray-200 hover:bg-white/5'
                  }`}
                >
                  Home
                </Link>
              </li>

              {/* Packages - Main Link */}
              <li>
                <Link
                  to="/packages"
                  className={`block py-3 px-4 text-base font-ubuntu font-medium transition-all duration-300 rounded-lg ${
                    location.pathname === '/packages'
                      ? 'text-brand-purple bg-brand-purple/10'
                      : 'text-gray-200 hover:bg-white/5'
                  }`}
                >
                  Packages
                </Link>
              </li>

              {/* Services - Sub Links (Always Visible) */}
              <li className="pl-6 space-y-2">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block py-2 px-4 rounded-lg text-sm text-gray-300 hover:text-brand-purple hover:bg-white/5 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                ))}
              </li>

              <li>
                <Link
                  to="/portfolio"
                  className={`block py-3 px-4 text-base font-ubuntu font-medium transition-all duration-300 rounded-lg ${
                    location.pathname === '/portfolio'
                      ? 'text-brand-purple bg-brand-purple/10'
                      : 'text-gray-200 hover:bg-white/5'
                  }`}
                >
                  Portfolio
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className={`block py-3 px-4 text-base font-ubuntu font-medium transition-all duration-300 rounded-lg ${
                    location.pathname === '/contact'
                      ? 'text-brand-purple bg-brand-purple/10'
                      : 'text-gray-200 hover:bg-white/5'
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
            <div className="mt-8 px-4">
              <Button to="/contact" variant="primary" size="lg" className="w-full">
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
