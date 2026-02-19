import React, { useEffect, useState, useRef } from 'react';

const DotGridBackground: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(hover: none)').matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Parallax effect on scroll
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Parallax offset calculation
  const parallaxOffset = isMobile ? scrollY * 0.3 : 0;

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ willChange: 'transform' }}
    >
      {/* Parallax container - moves opposite to scroll on mobile */}
      <div 
        className="absolute inset-0 transition-transform duration-100 ease-out"
        style={{ 
          transform: `translateY(${-parallaxOffset}px)`,
        }}
      >
        {/* Layer 1: Big Prominent Dot Grid - 40px spacing, 35% opacity */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.35) 2px, transparent 2px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Layer 2: Static Top Glow - Always-on purple radial blur at top center */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(800px circle at 50% 0%, rgba(139, 92, 246, 0.2), transparent 60%)',
          }}
        />

        {/* Layer 3: Bottom-Right Accent - Subtle orange warmth */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(600px circle at 100% 100%, rgba(249, 115, 22, 0.1), transparent 50%)',
          }}
        />

        {/* Layer 4: Additional depth - middle purple glow */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(500px circle at 50% 50%, rgba(139, 92, 246, 0.08), transparent 50%)',
          }}
        />
      </div>

      {/* Layer 5: Vignette - Darkens screen edges */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.5) 100%)',
        }}
      />
    </div>
  );
};

export default DotGridBackground;
