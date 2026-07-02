import { Link, useLocation } from 'react-router-dom';
import { Magnetic } from './Magnetic';

/**
 * ContactOrb — the persistent floating "contact" badge (Cuberto-style): a
 * slowly-rotating "contact · contact ·" text ring around a centre badge that
 * links to /contact. Lives bottom-right on every page except /contact itself.
 * The ring spin pauses under prefers-reduced-motion (.sc-orb-spin in site.css).
 *
 * Swap the centre <ArrowMark/> for a real photo/memoji later if wanted.
 */
function ArrowMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContactOrb() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/contact')) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[900] md:bottom-7 md:right-7">
      <Magnetic strength={10}>
        <Link
          to="/contact"
          data-cursor="view"
          data-cursor-label="Contact"
          aria-label="Get in touch"
          className="group relative grid h-[88px] w-[88px] place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-2 md:h-[104px] md:w-[104px]"
        >
          <svg className="sc-orb-spin absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <path id="sc-orb-path" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
            </defs>
            <text className="fill-site-text-body font-mono text-[8.5px] uppercase tracking-[0.32em]">
              <textPath href="#sc-orb-path" startOffset="0">
                contact · let&apos;s talk · contact · let&apos;s talk ·
              </textPath>
            </text>
          </svg>
          <span className="grid h-[54px] w-[54px] place-items-center rounded-full bg-site-accent text-white shadow-[0_10px_30px_rgba(123,63,228,0.45)] transition-transform duration-500 ease-brand group-hover:scale-110 motion-reduce:group-hover:scale-100 md:h-[62px] md:w-[62px]">
            <ArrowMark />
          </span>
        </Link>
      </Magnetic>
    </div>
  );
}
