import React from 'react';

interface GlowDividerProps {
  color?: 'purple' | 'orange' | 'white';
}

const colorMap = {
  purple: 'rgba(119,76,252,0.5)',
  orange: 'rgba(242,106,61,0.5)',
  white: 'rgba(255,255,255,0.15)',
};

const GlowDivider: React.FC<GlowDividerProps> = ({ color = 'purple' }) => {
  const mid = colorMap[color];
  return (
    <div className="relative w-full py-2 flex items-center justify-center overflow-hidden">
      {/* Gradient line */}
      <div
        className="w-full max-w-2xl h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${mid}, ${mid}, transparent)`,
        }}
      />
      {/* Radial glow at centre */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-12 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${mid.replace('0.5', '0.12')}, transparent 70%)`,
        }}
      />
    </div>
  );
};

export default GlowDivider;
