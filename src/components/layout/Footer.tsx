import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        {/* Desktop: 4-Column Grid */}
        <div className="hidden lg:grid grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1765279919/Streamline-black_500_x_186_px_scthzc.svg"
                alt="Streamline Automations"
                className="h-8 w-auto"
              />
              <span className="font-ubuntu font-bold text-lg text-white">
                Streamline Automations
              </span>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Next-gen automation agency helping businesses modernize with AI-powered systems.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-purple transition-colors duration-300"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-purple transition-colors duration-300"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-purple transition-colors duration-300"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-ubuntu font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services' },
                { name: 'Portfolio', path: '/portfolio' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-brand-purple transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-ubuntu font-bold mb-4">Services</h4>
            <ul className="space-y-3">
              {[
                { name: 'Branding', path: '/services/branding' },
                { name: 'Web Development', path: '/services/development' },
                { name: 'Automation', path: '/services/automation' },
              ].map((service) => (
                <li key={service.path}>
                  <Link
                    to={service.path}
                    className="text-gray-400 hover:text-brand-purple transition-colors duration-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-ubuntu font-bold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:streamline.automations.hq@gmail.com"
                  className="text-gray-400 hover:text-brand-purple transition-colors duration-300 flex items-start gap-2"
                >
                  <Mail size={16} className="mt-1 flex-shrink-0" />
                  <span className="text-sm">streamline.automations.hq@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+27837797935"
                  className="text-gray-400 hover:text-brand-purple transition-colors duration-300 flex items-start gap-2"
                >
                  <Phone size={16} className="mt-1 flex-shrink-0" />
                  <span className="text-sm">+27 83 779 7935</span>
                </a>
              </li>
              <li>
                <div className="text-gray-400 flex items-start gap-2">
                  <MapPin size={16} className="mt-1 flex-shrink-0" />
                  <span className="text-sm">Gauteng, South Africa</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Tablet & Mobile Layout */}
        <div className="lg:hidden space-y-8 mb-12">
          {/* Brand Section - Centered */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img
                src="https://res.cloudinary.com/dnlgohkcc/image/upload/v1765279919/Streamline-black_500_x_186_px_scthzc.svg"
                alt="Streamline Automations"
                className="h-8 w-auto"
              />
              <span className="font-ubuntu font-bold text-lg text-white">
                Streamline Automations
              </span>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed max-w-xs mx-auto">
              Next-gen automation agency helping businesses modernize with AI-powered systems.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-purple transition-colors duration-300"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-purple transition-colors duration-300"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-purple transition-colors duration-300"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links & Services - 2 Column Grid */}
          <div className="grid grid-cols-2 gap-8 md:gap-12">
            <div>
              <h4 className="text-white font-ubuntu font-bold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Services', path: '/services' },
                  { name: 'Portfolio', path: '/portfolio' },
                  { name: 'Contact', path: '/contact' },
                ].map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-brand-purple transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-ubuntu font-bold mb-4">Services</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Branding', path: '/services/branding' },
                  { name: 'Web Development', path: '/services/development' },
                  { name: 'Automation', path: '/services/automation' },
                ].map((service) => (
                  <li key={service.path}>
                    <Link
                      to={service.path}
                      className="text-gray-400 hover:text-brand-purple transition-colors duration-300 text-sm"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Section - Centered */}
          <div className="text-center">
            <h4 className="text-white font-ubuntu font-bold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:streamline.automations.hq@gmail.com"
                  className="text-gray-400 hover:text-brand-purple transition-colors duration-300 text-sm"
                >
                  streamline.automations.hq@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+27837797935"
                  className="text-gray-400 hover:text-brand-purple transition-colors duration-300 text-sm"
                >
                  +27 83 779 7935
                </a>
              </li>
              <li>
                <div className="text-gray-400 text-sm">Gauteng, South Africa</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Streamline Automations. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;