import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bot, Zap } from 'lucide-react';

const RogueBot: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentDistance, setCurrentDistance] = useState(1000);
  const [isCaught, setIsCaught] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(hover: none)').matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const touch = e.touches[0];
    setTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // If close enough when releasing, catch the bot
    if (currentDistance < 80) {
      catchBot();
    }
  };

  // Continuous touch tracking with progressive fear response
  useEffect(() => {
    if (!isMobile || isCaught || !isDragging) return;

    const handleTouchMove = () => {
      if (!containerRef.current) return;

      // Cancel any pending animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();

        // Bot center position
        const botCenterX = rect.left + rect.width / 2 + position.x;
        const botCenterY = rect.top + rect.height / 2 + position.y;

        // Touch position
        const touchX = touchPos.x;
        const touchY = touchPos.y;

        // Calculate distance
        const dx = botCenterX - touchX;
        const dy = botCenterY - touchY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        setCurrentDistance(distance);

        const FEAR_RADIUS = 250;
        const PANIC_ZONE = 60;
        const MAX_RADIUS = 200;
        const BASE_SPEED = 180;

        const repulsionStrength = Math.max(0, (FEAR_RADIUS - distance) / FEAR_RADIUS);

        if (repulsionStrength === 0) {
          setPosition({ x: 0, y: 0 });
        } else {
          const angle = Math.atan2(dy, dx);
          const fleeDistance = BASE_SPEED * repulsionStrength;

          let newX = Math.cos(angle) * fleeDistance;
          let newY = Math.sin(angle) * fleeDistance;

          if (distance < PANIC_ZONE) {
            const jitterIntensity = Math.max(0, (PANIC_ZONE - distance) / PANIC_ZONE);
            const jitterAmount = 15 * jitterIntensity;
            newX += (Math.random() - 0.5) * jitterAmount;
            newY += (Math.random() - 0.5) * jitterAmount;
          }

          const distanceFromOrigin = Math.sqrt(newX * newX + newY * newY);
          if (distanceFromOrigin > MAX_RADIUS) {
            const scale = MAX_RADIUS / distanceFromOrigin;
            newX *= scale;
            newY *= scale;
          }

          setPosition({ x: newX, y: newY });
        }
      });
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMobile, isCaught, isDragging, touchPos.x, touchPos.y, position.x, position.y]);

  // Mouse tracking for desktop
  useEffect(() => {
    if (isMobile || isCaught) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();

        const botCenterX = rect.left + rect.width / 2 + position.x;
        const botCenterY = rect.top + rect.height / 2 + position.y;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const dx = botCenterX - mouseX;
        const dy = botCenterY - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        setCurrentDistance(distance);

        const FEAR_RADIUS = 300;
        const PANIC_ZONE = 80;
        const MAX_RADIUS = 300;
        const BASE_SPEED = 200;

        const repulsionStrength = Math.max(0, (FEAR_RADIUS - distance) / FEAR_RADIUS);

        if (repulsionStrength === 0) {
          setPosition({ x: 0, y: 0 });
        } else {
          const angle = Math.atan2(dy, dx);
          const fleeDistance = BASE_SPEED * repulsionStrength;

          let newX = Math.cos(angle) * fleeDistance;
          let newY = Math.sin(angle) * fleeDistance;

          if (distance < PANIC_ZONE) {
            const jitterIntensity = Math.max(0, (PANIC_ZONE - distance) / PANIC_ZONE);
            const jitterAmount = 20 * jitterIntensity;
            newX += (Math.random() - 0.5) * jitterAmount;
            newY += (Math.random() - 0.5) * jitterAmount;
          }

          const distanceFromOrigin = Math.sqrt(newX * newX + newY * newY);
          if (distanceFromOrigin > MAX_RADIUS) {
            const scale = MAX_RADIUS / distanceFromOrigin;
            newX *= scale;
            newY *= scale;
          }

          setPosition({ x: newX, y: newY });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMobile, isCaught, position.x, position.y]);

  const catchBot = () => {
    setIsCaught(true);
    setShowConfetti(true);

    const alertMessage = [
      'SYSTEM BREACH DETECTED!',
      'You caught me! You win!',
      'Unauthorized access... Just kidding!',
      'Error 418: I am a teapot (and you caught me)'
    ];

    alert(alertMessage[Math.floor(Math.random() * alertMessage.length)]);

    setTimeout(() => {
      setIsCaught(false);
      setShowConfetti(false);
      setPosition({ x: 0, y: 0 });
      setCurrentDistance(1000);
    }, 3000);
  };

  const getBotState = () => {
    if (isCaught) return 'caught';
    if (currentDistance < 100) return 'panic';
    if (currentDistance < 250) return 'wary';
    return 'calm';
  };

  const state = getBotState();

  const getColorClass = () => {
    if (isCaught) return 'text-green-500';
    if (state === 'panic') return 'text-red-500';
    if (state === 'wary') return 'text-brand-orange';
    return 'text-brand-purple';
  };

  const getScale = () => {
    if (isCaught) return 1.5;
    if (state === 'panic') return 1.3;
    if (state === 'wary') return 1.15;
    return 1;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full flex items-center justify-center"
      style={{ minHeight: '120px' }}
    >
      <motion.div
        className={`absolute cursor-pointer select-none ${isMobile ? 'touch-none' : ''}`}
        onClick={() => !isMobile && catchBot()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        animate={{
          x: position.x,
          y: position.y,
          scale: getScale(),
          rotate: state === 'panic' ? [0, -5, 5, -5, 5, 0] : 0,
        }}
        transition={{
          x: { type: 'spring', stiffness: state === 'panic' ? 500 : state === 'wary' ? 350 : 250, damping: state === 'panic' ? 12 : state === 'wary' ? 20 : 30 },
          y: { type: 'spring', stiffness: state === 'panic' ? 500 : state === 'wary' ? 350 : 250, damping: state === 'panic' ? 12 : state === 'wary' ? 20 : 30 },
          scale: { duration: 0.3, ease: 'easeOut' },
          rotate: { duration: state === 'panic' ? 0.1 : 0.3, repeat: state === 'panic' ? Infinity : 0 }
        }}
      >
        <div className="relative">
          <Bot
            className={`${getColorClass()} transition-colors duration-200 ${state === 'panic' ? 'animate-pulse' : ''}`}
            size={isMobile ? 24 : 32}
          />

          {state === 'panic' && (
            <motion.div
              className="absolute -top-10 -right-3"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <Zap className="text-yellow-400 animate-pulse" size={20} />
            </motion.div>
          )}

          {showConfetti && (
            <>
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-0 left-0 w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: ['#8B5CF6', '#F97316', '#10B981', '#F59E0B'][i % 4]
                  }}
                  initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  animate={{
                    opacity: 0,
                    scale: 0,
                    x: Math.cos(i * 22.5 * Math.PI / 180) * 60,
                    y: Math.sin(i * 22.5 * Math.PI / 180) * 60
                  }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              ))}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default RogueBot;
