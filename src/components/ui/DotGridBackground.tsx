import React, { useEffect, useRef, useState } from 'react';

const DotGridBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetPosition.current = { 
          x: e.touches[0].clientX, 
          y: e.touches[0].clientY 
        };
      }
    };

    // Lerp animation for smooth cursor following
    const animate = () => {
      setMousePosition(prev => ({
        x: prev.x + (targetPosition.current.x - prev.x) * 0.08,
        y: prev.y + (targetPosition.current.y - prev.y) * 0.08,
      }));
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
    >
      {/* Layer 1: Dot Grid - CSS radial gradient dots, 30px grid spacing, 18% opacity white */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
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

      {/* Layer 4: Cursor Glow - Follows mouse with lerp, 650px radius purple */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(650px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.18), transparent 70%)`,
        }}
      />

      {/* Layer 5: Vignette - Darkens screen edges */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.4) 100%)',
        }}
      />
    </div>
  );
};

export default DotGridBackground;
