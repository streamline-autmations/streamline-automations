import React from 'react';
import * as LucideIcons from 'lucide-react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { Service } from '../../types';
import Button from '../ui/Button';

interface ServiceCardProps {
  service: Service;
  className?: string;
  showLearnMore?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, className = '', showLearnMore = true }) => {
  const { title, description, icon, category, features } = service;
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>)[icon];

  const getCategoryRoute = (): string => {
    switch (category) {
      case 'branding':
        return '/services/branding';
      case 'web-development':
        return '/services/development';
      case 'automation':
        return '/services/automation';
      default:
        return '/services';
    }
  };

  const getCategoryColors = () => {
    switch (category) {
      case 'branding':
        return {
          iconBg: 'bg-brand-purple/10',
          iconBorder: 'border-brand-purple/20',
          iconColor: 'text-brand-purple',
          hoverBorder: 'hover:border-brand-purple/50',
        };
      case 'automation':
        return {
          iconBg: 'bg-brand-purple/10',
          iconBorder: 'border-brand-purple/20',
          iconColor: 'text-accent',
          hoverBorder: 'hover:border-brand-purple/50',
        };
      case 'web-development':
        return {
          iconBg: 'bg-white/5',
          iconBorder: 'border-white/10',
          iconColor: 'text-white',
          hoverBorder: 'hover:border-white/30',
        };
      default:
        return {
          iconBg: 'bg-white/5',
          iconBorder: 'border-white/10',
          iconColor: 'text-white',
          hoverBorder: 'hover:border-white/30',
        };
    }
  };

  const colors = getCategoryColors();

  return (
    <div className={`bg-[#050505] border border-white/10 ${colors.hoverBorder} transition-all duration-500 rounded-2xl group ${className}`}>
      <div className="p-8 flex flex-col h-full">
        <div className="flex items-center space-x-4 mb-6">
          <div className={`flex-shrink-0 p-4 ${colors.iconBg} rounded-xl border ${colors.iconBorder} group-hover:scale-110 transition-all duration-300`}>
            {IconComponent && <IconComponent className={`w-8 h-8 ${colors.iconColor} transition-all duration-300`} />}
          </div>

          <h3 className="text-xl md:text-2xl font-ubuntu font-bold text-white transition-all duration-300">
            {title}
          </h3>
        </div>

        <p className="text-gray-400 font-inter leading-relaxed mb-6">{description}</p>

        <div className="flex-grow mb-6">
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className={`w-5 h-5 ${colors.iconColor} mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300`} />
                <span className="text-gray-300 font-inter text-base">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {showLearnMore && (
          <div className="mt-auto pt-6">
            <Button
              to={getCategoryRoute()}
              variant="ghost"
              size="md"
              className="group/button w-full justify-center hover:text-white hover:bg-white/5"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
