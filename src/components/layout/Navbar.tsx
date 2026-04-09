import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';

const navLinks = [
  { name: 'Home',      path: '/' },
  { name: 'Websites',  path: '/websites' },
  { name: 'Systems',   path: '/systems' },
  { name: 'Hosting',   path: '/hosting' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Contact',   path: '/contact' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header className="navbar">
      <div className="w-full">
        {/* ── Mobile layout ─────────────────────────────── */}
        <div className="relative flex md:hidden items-center justify-between h-16">
          <button
            className="text-gray-200 hover:text-white p-3 z-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <Link to="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1765275983/Streamline-White_1_yf5ow5.svg"
              alt="Streamline Automations"
              className="h-9 w-auto"
            />
          </Link>

          <div className="w-16 z-10" />
        </div>

        {/* ── Desktop layout ─────────────────────────────── */}
        <div className="hidden md:flex items-center justify-between">
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

          <nav>
            <ul className="flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="inline-block px-3 py-2 text-base font-ubuntu font-medium border-b-2 transition-all duration-300 hover:text-white"
                    style={{
                      borderBottomColor: isActive(link.path) ? 'var(--purple)' : 'transparent',
                      color: isActive(link.path) ? 'white' : 'var(--text-mid)',
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Button href="/contact" variant="orange" size="md">
            Book a Free Call
          </Button>
        </div>

        {/* ── Mobile menu ─────────────────────────────── */}
        <div
          className={`md:hidden transition-all duration-300 bg-black border-t border-white/10 ${
            isMenuOpen
              ? 'max-h-[calc(100vh-64px)] opacity-100 overflow-y-auto'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <nav className="py-6 px-2">
            <ul className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="block py-3 px-4 text-base font-ubuntu font-medium transition-all duration-300 border-l-2 min-h-[44px] flex items-center"
                    style={{
                      borderLeftColor: isActive(link.path) ? 'var(--purple)' : 'transparent',
                      color: isActive(link.path) ? 'white' : 'var(--text-mid)',
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 px-4">
              <Button href="/contact" variant="orange" size="lg" className="w-full">
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
