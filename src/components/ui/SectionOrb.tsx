import React from 'react';

interface SectionOrbProps {
  position: 'left' | 'right';
  color?: 'purple' | 'orange' | 'mixed';
  className?: string;
}

const SectionOrb: React.FC<SectionOrbProps> = ({
  position,
  color = 'mixed',
  className = ''
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'purple':
        return 'bg-brand-purple/20';
      case 'orange':
        return 'bg-brand-purple/20';
      case 'mixed':
      default:
        return 'bg-gradient-to-r from-brand-purple/20 to-transparent';
    }
  };

  const positionClasses = position === 'left'
    ? 'left-0 -translate-x-1/3'
    : 'right-0 translate-x-1/3';

  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 ${positionClasses} w-[800px] h-[800px] ${getColorClasses()} rounded-full blur-[120px] pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};

export default SectionOrb;
