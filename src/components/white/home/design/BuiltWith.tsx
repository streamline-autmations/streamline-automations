import { useState } from 'react';
import {
  SiReact,
  SiTypescript,
  SiSupabase,
  SiN8N,
  SiTailwindcss,
  SiVercel,
  SiWhatsapp,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

const EDGE_MASK =
  'linear-gradient(to right, transparent, black 6%, black 94%, transparent)';

// The real stack behind the builds. PayFast has no brand glyph in the set, so
// it rides as a wordmark — still on-brand, no asset upload.
const TECH: Array<{ name: string; Icon: IconType | null }> = [
  { name: 'React', Icon: SiReact },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'Supabase', Icon: SiSupabase },
  { name: 'n8n', Icon: SiN8N },
  { name: 'Tailwind', Icon: SiTailwindcss },
  { name: 'Vercel', Icon: SiVercel },
  { name: 'PayFast', Icon: null },
  { name: 'WhatsApp', Icon: SiWhatsapp },
];

/**
 * BuiltWith — a subtle infinite "BUILT WITH" tech-stack marquee. Monochrome at
 * rest, each item inks in on hover; the strip pauses on hover. Pure CSS marquee
 * (transform translateX), reduced-motion safe via the global media rule.
 */
export default function BuiltWith() {
  const [paused, setPaused] = useState(false);
  const items = [...TECH, ...TECH];

  return (
    <section data-screen-label="Stack" className="relative py-[clamp(60px,8vh,110px)]">
      <div className="relative mx-auto mb-9 w-full max-w-[1000px] px-8">
        <span className="block text-center font-['JetBrains_Mono'] text-[12px] font-medium uppercase tracking-[0.22em] text-[#7B3FE4]">
          Built with
        </span>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
      >
        <div
          className="flex items-center gap-14"
          style={{
            width: 'max-content',
            animation: 'marquee-text 36s linear infinite',
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {items.map(({ name, Icon }, i) => (
            <div
              key={`${name}-${i}`}
              className="group flex items-center gap-2.5 whitespace-nowrap text-[#9E9EA8] transition-colors duration-300 hover:text-[#0A0A0F]"
            >
              {Icon ? (
                <Icon className="h-[22px] w-[22px]" aria-hidden="true" />
              ) : (
                <span className="font-['DM_Sans'] text-[19px] font-bold tracking-[-0.02em]">P</span>
              )}
              <span className="font-['DM_Sans'] text-[16px] font-semibold tracking-[-0.01em]">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
