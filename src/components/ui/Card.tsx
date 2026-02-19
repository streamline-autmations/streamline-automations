import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import Button from './Button';

interface CardProps {
  title: string;
  description?: string;
  icon?: string;
  children?: React.ReactNode;
  className?: string;
  ctaText?: string;
  ctaLink?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  children,
  className = '',
  ctaText,
  ctaLink,
}) => {
  const IconComponent = icon
    ? (LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>)[icon]
    : null;

  return (
    <div className={`relative glass-card p-6 md:p-8 transition-all duration-300 tech-glow-hover group card-interactive ${className}`}>
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-brand-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
      
      <div className="relative z-10">
        {IconComponent && (
          <div className="mb-6">
            <div className="w-12 h-12 rounded-lg bg-brand-purple/20 flex items-center justify-center">
              <IconComponent className="w-6 h-6 text-brand-purple" />
            </div>
          </div>
        )}
        <h3 className="text-xl md:text-2xl font-ubuntu font-bold mb-4 text-white">{title}</h3>
        {description && <p className="text-gray-300 mb-6 font-inter">{description}</p>}
        {children}
        {ctaText && ctaLink && (
          <div className="mt-8">
            <Button variant="outline" to={ctaLink}>
              {ctaText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
