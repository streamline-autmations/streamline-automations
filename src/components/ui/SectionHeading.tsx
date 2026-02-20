import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  centered = false,
  className = '',
}) => {
  return (
    <div className={`mb-12 md:mb-16 px-4 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="h2 mb-6">
        {title}
      </h2>
      {subtitle && <p className="body max-w-4xl mx-auto font-inter">{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;
