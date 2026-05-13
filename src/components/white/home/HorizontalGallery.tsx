import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap, useGSAP } from '../../../lib/gsap-setup';
import usePrefersReducedMotion from '../../../hooks/usePrefersReducedMotion';
import { fadeUp, viewport } from '../../../lib/motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PLACEHOLDER = (label: string) =>
  `https://placehold.co/1600x1200/F5F5F7/9E9EA8?text=${encodeURIComponent(label)}`;

interface GalleryCard {
  num: string;
  client: string;
  tag: string;
  image: string;
  href: string;
  /** Vertical offset — alternates to add rhythm */
  offset: string;
}

const CARDS: GalleryCard[] = [
  {
    num: '01',
    client: 'BLOM Cosmetics',
    tag: 'E-commerce + Automation',
    image: PLACEHOLDER('BLOM Cosmetics'),
    href: '/portfolio#blom',
    offset: 'mt-0',
  },
  {
    num: '02',
    client: 'RecklessBear Apparel',
    tag: 'Sales + Production System',
    image: PLACEHOLDER('RecklessBear Apparel'),
    href: '/portfolio#recklessbear',
    offset: 'mt-16',
  },
  {
    num: '03',
    client: 'CW Electronics',
    tag: 'Wholesale E-commerce',
    image: PLACEHOLDER('CW Electronics'),
    href: '/portfolio#cw-electronics',
    offset: 'mt-0',
  },
  {
    num: '04',
    client: 'Ameli Designs',
    tag: 'Portfolio + Lead Capture',
    image: PLACEHOLDER('Ameli Designs'),
    href: '/portfolio#ameli',
    offset: 'mt-16',
  },
  {
    num: '05',
    client: 'NSA Mining',
    tag: 'Internal Systems',
    image: PLACEHOLDER('NSA Mining'),
    href: '/portfolio#nsa-mining',
    offset: 'mt-0',
  },
];

function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE }}
      className="max-w-6xl mx-auto px-6 pb-16 md:pb-20 flex items-end justify-between"
    >
      <div>
        <span className="block text-[11px] font-['DM_Sans'] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-4">
          Selected work
        </span>
        <h2 className="text-[32px] sm:text-[42px] md:text-[52px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.03em] leading-[1.06]">
          Five builds.{' '}
          <span className="font-['Instrument_Serif'] italic font-normal">
            All real.
          </span>
        </h2>
      </div>
      <Link
        to="/portfolio"
        className="hidden md:inline-flex items-center gap-1.5 text-[13px] font-['DM_Sans'] font-medium text-[#6B6B7A] hover:text-[#7B3FE4] transition-colors"
      >
        View all work →
      </Link>
    </motion.div>
  );
}

export default function HorizontalGallery() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const getScrollDistance = () => track.scrollWidth - window.innerWidth + 96; // 96px breathing room

        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => '+=' + getScrollDistance(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reduced] }
  );

  // Mobile / reduced-motion: vertical stack
  if (reduced) {
    return (
      <section className="bg-white py-24 md:py-32">
        <SectionHeader />
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          {CARDS.map((card) => (
            <MobileCard key={card.num} card={card} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      {/* DESKTOP — pinned horizontal scroll */}
      <section
        ref={sectionRef}
        className="noise-overlay relative hidden md:block bg-white overflow-hidden"
        aria-label="Selected work"
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="h-[100svh] flex flex-col">
          <div className="pt-20 pb-0">
            <SectionHeader />
          </div>
          <div
            data-cursor="drag"
            ref={trackRef}
            className="flex items-start gap-8 px-16 will-change-transform flex-1"
            style={{ width: 'max-content' }}
          >
            {CARDS.map((card) => (
              <DesktopCard key={card.num} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE — vertical stack */}
      <section className="md:hidden bg-white py-20">
        <SectionHeader />
        <div className="max-w-xl mx-auto px-6 space-y-10">
          {CARDS.map((card) => (
            <MobileCard key={card.num} card={card} />
          ))}
        </div>
      </section>
    </>
  );
}

function DesktopCard({ card }: { card: GalleryCard }) {
  return (
    <Link
      to={card.href}
      className={`group relative flex-shrink-0 w-[65vw] h-[65vh] rounded-2xl overflow-hidden bg-[#F5F5F7] ${card.offset}`}
    >
      {/* Image with inner parallax */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <img
          src={card.image}
          alt={card.client}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover scale-[1.08] group-hover:scale-[1.12] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] select-none"
        />
      </div>
      {/* Overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(160deg, transparent 40%, rgba(10,10,15,0.65) 100%)' }}
      />
      {/* Top-left tag */}
      <div className="absolute top-6 left-6 z-10">
        <span className="text-[10px] font-['DM_Sans'] font-semibold uppercase tracking-[0.14em] text-white bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
          {card.num} / {card.tag}
        </span>
      </div>
      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
        <h3 className="text-[22px] font-['DM_Sans'] font-semibold text-white tracking-[-0.01em] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {card.client} →
        </h3>
      </div>
    </Link>
  );
}

function MobileCard({ card }: { card: GalleryCard }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <Link to={card.href} className="group block rounded-2xl overflow-hidden border border-[#E8E8EC] bg-[#F5F5F7]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={card.image}
            alt={card.client}
            loading="lazy"
            draggable={false}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
          />
          <div className="absolute top-4 left-4">
            <span className="text-[10px] font-['DM_Sans'] font-semibold uppercase tracking-[0.14em] text-white bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
              {card.num} / {card.tag}
            </span>
          </div>
        </div>
        <div className="p-5">
          <p className="text-[16px] font-['DM_Sans'] font-semibold text-[#0A0A0F] group-hover:text-[#7B3FE4] transition-colors">
            {card.client} →
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
