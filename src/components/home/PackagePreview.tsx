import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { springStagger, springFadeUp, viewport } from '../../lib/motion';

const PACKAGES = [
  {
    name: 'Online Presence',
    tagline: 'Get online, get found.',
    price: 'From R6,500',
    features: ['Up to 5 pages', 'Mobile-first design', 'Contact form', 'Basic SEO', 'Google Maps'],
    path: '/websites',
    accentColor: 'rgba(255,255,255,0.65)',
    borderColor: 'rgba(255,255,255,0.10)',
    bgColor: 'rgba(255,255,255,0.02)',
  },
  {
    name: 'Client Magnet',
    tagline: 'Leads on autopilot.',
    price: 'From R12,000',
    features: ['Everything in Online Presence', 'Booking integration', 'Lead capture CRM', 'Email + WhatsApp automation', 'AI chatbot'],
    path: '/systems',
    accentColor: '#774CFC',
    borderColor: 'rgba(119,76,252,0.40)',
    bgColor: 'rgba(119,76,252,0.06)',
    featured: true,
  },
  {
    name: 'Business Accelerator',
    tagline: 'Scale without the chaos.',
    price: 'From R25,000',
    features: ['Everything in Client Magnet', 'Analytics dashboard', 'Advanced follow-up sequences', 'Monthly optimisation', 'Priority support'],
    path: '/contact',
    accentColor: '#F26A3D',
    borderColor: 'rgba(242,106,61,0.35)',
    bgColor: 'rgba(242,106,61,0.05)',
  },
];

export default function PackagePreview() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12"
      variants={springStagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {PACKAGES.map((pkg) => (
        <motion.div
          key={pkg.name}
          variants={springFadeUp}
          className="card flex flex-col gap-5"
          style={{ borderColor: pkg.borderColor, background: pkg.bgColor }}
        >
          {pkg.featured && (
            <span
              className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded w-fit"
              style={{ color: '#774CFC', background: 'rgba(119,76,252,0.12)', border: '1px solid rgba(119,76,252,0.25)' }}
            >
              Most Popular
            </span>
          )}

          <div>
            <h3 className="font-bebas text-2xl text-white">{pkg.name}</h3>
            <p className="text-white/45 text-sm">{pkg.tagline}</p>
          </div>

          <div className="font-mono text-white/85 text-sm font-semibold">{pkg.price}</div>

          <ul className="flex flex-col gap-2 flex-1">
            {pkg.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-white/55">
                <Check size={13} className="mt-0.5 shrink-0" style={{ color: pkg.accentColor }} />
                {f}
              </li>
            ))}
          </ul>

          <Link
            to={pkg.path}
            className="inline-flex items-center gap-2 text-sm font-medium mt-auto pt-2"
            style={{ color: pkg.accentColor }}
          >
            Learn more <ArrowRight size={14} />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
