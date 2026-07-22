import { useCallback, useEffect, useRef, useState, type CSSProperties, type Ref } from 'react';
import { motion } from 'framer-motion';
import { EASE_ARR } from '../../lib/motion';

type LogoItem = { type: 'image'; name: string; src: string };
type TextItem = { type: 'text'; name: string; color: string };
type ClientItem = LogoItem | TextItem;

const CLIENTS: ClientItem[] = [
  { type: 'image', name: 'BLOM Cosmetics',       src: '/assets/clients/blom/logo.webp' },
  { type: 'image', name: 'RecklessBear Apparel', src: '/assets/clients/recklessbear/logo-word.webp' },
  { type: 'image', name: 'CW Electronics',       src: '/assets/clients/cw-electronics/logo.webp' },
  { type: 'image', name: 'Ameli Designs',        src: '/assets/clients/ameli/logo.webp' },
  { type: 'image', name: 'JJ Glasswork',         src: '/assets/clients/jj-glass/logo.webp' },
  { type: 'image', name: 'NSA Mining',           src: '/assets/clients/nsa-mining/logo.jpg' },
  { type: 'text',  name: 'TUSCANY SA',    color: '#A07244' }, // warm amber — Italian hospitality
  { type: 'text',  name: 'AFRICAN NOMAD', color: '#5C8C6A' }, // sage green — earthy/nature
];

// rAF loop tuning — a fixed px/s drift eased toward its target with an
// exponential time-constant, so hover-to-stop (and back) glides instead of
// hard-cutting like a CSS animation-play-state toggle would.
const SPEED = 28;
const SMOOTH_TAU = 0.3;
const MIN_COPIES = 2;
const COPY_HEADROOM = 1;

function ClientLogoItem({ item }: { item: ClientItem }) {
  if (item.type === 'image') {
    return (
      <div className="group flex h-10 shrink-0 cursor-default items-center">
        <img
          src={item.src}
          alt={item.name}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-auto max-w-[130px] select-none object-contain grayscale opacity-[0.45] transition-all duration-300 ease-brand group-hover:grayscale-0 group-hover:opacity-100"
        />
      </div>
    );
  }

  return (
    <div className="group flex h-10 shrink-0 cursor-default items-center">
      <span
        className="select-none whitespace-nowrap font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-site-text-muted transition-colors duration-300 ease-brand group-hover:text-[--logo-hover]"
        style={{ '--logo-hover': item.color } as CSSProperties}
      >
        {item.name}
      </span>
    </div>
  );
}

/** One repeat unit of the loop. First copy carries the a11y label; the rest are decorative. */
function LogoSet({ innerRef, hidden }: { innerRef?: Ref<HTMLDivElement>; hidden?: boolean }) {
  return (
    <div ref={innerRef} className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={hidden}>
      {CLIENTS.map((item, i) => (
        <ClientLogoItem key={i} item={item} />
      ))}
    </div>
  );
}

/**
 * ClientLogos — continuous marquee trust strip, all screen sizes.
 *
 * Mechanics borrowed from React Bits' LogoLoop (rAF drift with eased
 * velocity + dynamic copy count from measured set width so the loop never
 * gaps on any viewport) — restyled entirely to brand tokens, no library
 * markup/CSS shipped. Per-logo grayscale -> colour reveal is a plain CSS
 * hover, so it works identically whether the loop is moving or eased to a
 * stop. On touch, hover never fires and the strip just runs.
 */
export default function ClientLogos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);

  const [setWidth, setSetWidth] = useState(0);
  const [copies, setCopies] = useState(MIN_COPIES);
  const hoveredRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const measure = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const width = setRef.current?.getBoundingClientRect().width ?? 0;
    if (width > 0) {
      setSetWidth(Math.ceil(width));
      const needed = Math.ceil(containerWidth / width) + COPY_HEADROOM;
      setCopies(Math.max(MIN_COPIES, needed));
    }
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Re-measure on resize (and once images have loaded, since logo widths shift layout).
  useEffect(() => {
    measure();
    if (!window.ResizeObserver) {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    if (setRef.current) ro.observe(setRef.current);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    const imgs = setRef.current?.querySelectorAll('img') ?? [];
    if (imgs.length === 0) return;
    let remaining = imgs.length;
    const onLoad = () => {
      remaining -= 1;
      if (remaining <= 0) measure();
    };
    imgs.forEach((img) => {
      if (img.complete) onLoad();
      else {
        img.addEventListener('load', onLoad, { once: true });
        img.addEventListener('error', onLoad, { once: true });
      }
    });
  }, [measure]);

  useEffect(() => {
    if (reducedMotionRef.current) return;
    const track = trackRef.current;
    if (!track || setWidth === 0) return;

    let raf = 0;
    let last: number | null = null;
    let offset = 0;
    let velocity = 0;

    const tick = (t: number) => {
      if (last === null) last = t;
      const dt = Math.max(0, t - last) / 1000;
      last = t;

      const target = hoveredRef.current ? 0 : SPEED;
      const k = 1 - Math.exp(-dt / SMOOTH_TAU);
      velocity += (target - velocity) * k;

      offset = ((offset + velocity * dt) % setWidth + setWidth) % setWidth;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [setWidth]);

  const effectiveCopies = reducedMotionRef.current ? 1 : copies;

  return (
    <section className="border-t border-site-line bg-white py-20 md:py-24">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.1 }}
        className="overflow-hidden"
      >
        <div
          ref={containerRef}
          onMouseEnter={() => { hoveredRef.current = true; }}
          onMouseLeave={() => { hoveredRef.current = false; }}
        >
          <div
            ref={trackRef}
            className="flex w-max items-center"
            style={{ willChange: 'transform' }}
            role="group"
            aria-label="Client logos"
          >
            {Array.from({ length: effectiveCopies }, (_, i) => (
              <LogoSet key={i} innerRef={i === 0 ? setRef : undefined} hidden={i > 0} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
