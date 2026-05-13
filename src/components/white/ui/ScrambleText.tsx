import { useEffect, useRef, useState } from 'react';
import usePrefersReducedMotion from '../../../hooks/usePrefersReducedMotion';

// Manual scramble — no GSAP ScrambleTextPlugin (Club GreenSock / paid).
// Runs on a 60ms tick per character; each char locks after ~8 cycles.

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const DIGITS  = '0123456789';

function randomChar(original: string): string {
  if (/[A-Za-z]/.test(original)) return LETTERS[Math.floor(Math.random() * LETTERS.length)];
  if (/[0-9]/.test(original)) return DIGITS[Math.floor(Math.random() * DIGITS.length)];
  return original; // punctuation / spaces stay static
}

interface Props {
  text: string;
  className?: string;
  /** Delay before scramble starts (ms). Default 0. */
  delay?: number;
  /** Duration each character scrambles before locking (ms). Default 400. */
  duration?: number;
  /** Stagger between characters starting their scramble (ms). Default 20. */
  stagger?: number;
  /** Trigger mode: 'inview' waits for IntersectionObserver, 'mount' starts immediately */
  trigger?: 'inview' | 'mount';
}

export default function ScrambleText({
  text,
  className = '',
  delay = 0,
  duration = 420,
  stagger = 20,
  trigger = 'inview',
}: Props) {
  const reduced = usePrefersReducedMotion();
  const [chars, setChars] = useState<string[]>(text.split(''));
  const lockedRef = useRef<boolean[]>(text.split('').map(() => false));
  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedRef = useRef(false);

  const startScramble = () => {
    if (startedRef.current || reduced) return;
    startedRef.current = true;

    const original = text.split('');
    lockedRef.current = original.map(() => false);

    setTimeout(() => {
      // Schedule each character to lock after (stagger * i + duration) ms
      original.forEach((ch, i) => {
        if (!/[A-Za-z0-9]/.test(ch)) {
          lockedRef.current[i] = true; // punctuation locks immediately
          return;
        }
        setTimeout(() => {
          lockedRef.current[i] = true;
        }, stagger * i + duration);
      });

      // Tick: update scrambled chars every 60ms
      intervalRef.current = setInterval(() => {
        const allLocked = lockedRef.current.every(Boolean);
        setChars(original.map((ch, i) =>
          lockedRef.current[i] ? ch : randomChar(ch)
        ));
        if (allLocked) {
          clearInterval(intervalRef.current!);
          setChars(original); // ensure final state is exact
        }
      }, 60);
    }, delay);
  };

  useEffect(() => {
    setChars(text.split(''));
    lockedRef.current = text.split('').map(() => false);
    startedRef.current = false;
  }, [text]);

  useEffect(() => {
    if (reduced) return;
    if (trigger === 'mount') {
      startScramble();
      return;
    }

    // IntersectionObserver for 'inview' trigger
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startScramble();
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [reduced, trigger, delay, duration, stagger]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // prefers-reduced-motion: render final text immediately, no scramble
  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {chars.map((ch, i) => (
        <span key={i} aria-hidden="true" style={{ display: ch === ' ' ? 'inline' : 'inline-block' }}>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  );
}
