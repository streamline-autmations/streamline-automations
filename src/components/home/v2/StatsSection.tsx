/**
 * StatsSection — Three key numbers with GSAP counter animation.
 * Counters start at 0 and count up when the section enters the viewport.
 */
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../../lib/gsap-setup';

const stats = [
  { value: 8, suffix: '+', label: 'Clients Served' },
  { value: 20, suffix: 'h+', label: 'Saved Per Client / Week' },
  { value: 100, suffix: '%', label: 'Clients Own Their Code' },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const valRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    stats.forEach((stat, i) => {
      const el = valRefs.current[i];
      if (!el) return;

      const counter = { val: 0 };
      const tween = gsap.to(counter, {
        val: stat.value,
        duration: 1.8,
        ease: 'power2.out',
        paused: true,
        onUpdate() {
          el.textContent = Math.round(counter.val).toString();
        },
        onComplete() {
          el.textContent = stat.value.toString();
        },
      });

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 82%',
        once: true,
        onEnter: () => tween.play(),
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 md:px-12 lg:px-16 py-24 border-y border-white/5"
      style={{ background: '#030303' }}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex flex-col gap-2">
            {/* Animated value */}
            <div className="flex items-end gap-1 leading-none">
              <span
                ref={el => {
                  valRefs.current[i] = el;
                }}
                className="font-bebas text-white"
                style={{ fontSize: 'clamp(64px, 8vw, 112px)', lineHeight: 1 }}
              >
                0
              </span>
              <span
                className="font-bebas text-[#774CFC] pb-1"
                style={{ fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 1 }}
              >
                {stat.suffix}
              </span>
            </div>
            {/* Label */}
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
