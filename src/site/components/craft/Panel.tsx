import { ReactNode } from 'react';

type PanelBg = 'white' | 'offwhite' | 'ink';

const BG: Record<PanelBg, string> = {
  white: 'bg-white text-site-ink',
  offwhite: 'bg-site-offwhite text-site-ink',
  ink: 'bg-site-ink text-white',
};

/**
 * Panel — a stacked, alternating section (Cuberto-style). Each panel after the
 * first pulls up with a big rounded top so the PREVIOUS panel's colour shows
 * through the rounded corners — giving the continuous black↔white "card slide"
 * down the page. Set `first` on the top section (no round/overlap).
 *
 * The overlap (-mt) equals the corner radius; give panels generous vertical
 * padding so content clears the rounded zone.
 */
export default function Panel({
  bg = 'white',
  first = false,
  className = '',
  id,
  children,
}: {
  bg?: PanelBg;
  first?: boolean;
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  const shape = first ? '' : 'relative z-[1] -mt-[2rem] rounded-t-[2rem] md:-mt-[4rem] md:rounded-t-[4rem]';
  return (
    <section
      id={id}
      {...(bg === 'ink' ? { 'data-header-dark': '' } : {})}
      className={`relative ${shape} ${BG[bg]} ${className}`}
    >
      {children}
    </section>
  );
}
