import React from 'react';
import CircuitLine from './CircuitLine';

interface SectionDividerProps {
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ className = '' }) => {
  return (
    <div className={`w-full py-6 md:py-10 ${className}`}>
      <div className="container">
        <CircuitLine variant="fast" />
      </div>
    </div>
  );
};

export default SectionDivider;
