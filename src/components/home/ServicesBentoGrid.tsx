import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, Zap, Shield, ArrowRight } from 'lucide-react';
import { springStagger, bentoCard, viewport } from '../../lib/motion';


const services = [
  {
    icon: Zap,
    name: 'Systems & Automation',
    tagline: 'Stop doing it manually.',
    description: 'CRMs, WhatsApp bots, booking systems, admin dashboards and n8n workflows. The backend of your business, automated. Built for businesses that want to scale without hiring more people.',
    path: '/systems',
    color: '#F26A3D',
    colSpan: 'md:col-span-2',
    featured: true,
  },
  {
    icon: Globe,
    name: 'Web Design & Creation',
    tagline: 'Built to convert.',
    description: 'Custom websites for SA businesses. No templates. No Wix. Yours from day one.',
    path: '/websites',
    color: '#774CFC',
    colSpan: 'md:col-span-1',
    featured: false,
  },
  {
    icon: Shield,
    name: 'Hosting & Maintenance',
    tagline: 'Your digital foundation.',
    description: 'Domain, professional email, SSL, DNS and monthly maintenance. Locked in and looked after.',
    path: '/hosting',
    color: '#774CFC',
    colSpan: 'md:col-span-1',
    featured: false,
  },
];

export default function ServicesBentoGrid() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12"
      variants={springStagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {services.map((service) => {
        const Icon = service.icon;
        return (
          <motion.div
            key={service.path}
            variants={bentoCard}
            className={`group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:border-white/20 transition-colors duration-300 ${service.colSpan}`}
          >
            {/* Subtle glow on hover */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at top left, ${service.color}10, transparent 60%)` }}
            />

            <div className="relative z-10 flex flex-col gap-4 h-full">
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${service.color}18`, border: `1px solid ${service.color}30` }}
              >
                <Icon size={18} style={{ color: service.color }} />
              </div>

              {/* Name + tagline */}
              <div>
                <h3 className="font-bebas text-2xl text-white mb-1">
                  {service.name}
                </h3>
                <p className="text-white/50 text-sm font-mono tracking-wide">{service.tagline}</p>
              </div>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed flex-1">{service.description}</p>

              {/* CTA */}
              <Link
                to={service.path}
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 mt-auto"
                style={{ color: service.color }}
              >
                Learn more <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
