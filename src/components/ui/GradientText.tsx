import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ children, className = '' }) => (
  <span
    className={`inline-block bg-gradient-to-r from-[#774CFC] to-[#F26A3D] bg-clip-text text-transparent ${className}`}
  >
    {children}
  </span>
);

export default GradientText;
