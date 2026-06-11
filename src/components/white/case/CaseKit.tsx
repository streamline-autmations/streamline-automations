import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../../seo/SEO';
import { creativeWork, breadcrumb } from '../../../lib/structured-data';
import SiteHeader from '../SiteHeader';
import SiteFooter from '../SiteFooter';
import FinalCTA from '../home/FinalCTA';

/**
 * CaseKit — the shared white-minimal building blocks for every case-study page.
 * One chrome (SiteHeader/SiteFooter), one hero pattern, one metric strip, one
 * alternating image/text module, one gallery, one prev/next nav. Each client
 * page composes these with its own real copy + local screenshots so the four
 * studies feel like one cohesive set, not four different layouts.
 */

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ----------------------------------------------------------------------- */
/* Ambient depth helpers                                                   */
/* ----------------------------------------------------------------------- */

export function PurpleBloom({
  className = '',
  size = 520,
  opacity = 0.14,
}: {
  className?: string;
  size?: number;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background:
          'radial-gradient(circle at center, rgba(123,63,228,1) 0%, rgba(123,63,228,0) 70%)',
        opacity,
        filter: 'blur(40px)',
      }}
    />
  );
}

export function DotGrid({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, rgba(123,63,228,0.18) 1px, transparent 0)',
        backgroundSize: '28px 28px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
      }}
    />
  );
}

/* ----------------------------------------------------------------------- */
/* Browser frame — wraps a screenshot so it reads as a live product        */
/* ----------------------------------------------------------------------- */

export function BrowserFrame({
  url,
  children,
  className = '',
}: {
  url?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[20px] border border-[#E8E8EC] bg-white
                  shadow-[0_30px_80px_-30px_rgba(76,29,149,0.22),0_8px_30px_-12px_rgba(15,15,30,0.08)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-[#EFEFF3] bg-[#FAFAFB] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" aria-hidden="true" />
        {url && (
          <div className="ml-3 flex-1">
            <div className="mx-auto max-w-xs truncate rounded-full border border-[#E8E8EC] bg-white px-3 py-1 text-center font-['JetBrains_Mono'] text-[11px] font-medium text-[#9E9EA8]">
              {url}
            </div>
          </div>
        )}
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* Shell — identical chrome + closing CTA for every case study             */
/* ----------------------------------------------------------------------- */

export function CaseShell({
  seoTitle,
  seoDescription,
  seoImage,
  path,
  clientName,
  children,
}: {
  seoTitle: string;
  seoDescription: string;
  seoImage?: string;
  /** Route path, e.g. "/portfolio/blom-cosmetics" — drives canonical + structured data. */
  path?: string;
  /** Client name for breadcrumb + CreativeWork, e.g. "BLOM Cosmetics". */
  clientName?: string;
  children: React.ReactNode;
}) {
  const jsonLd =
    path && clientName
      ? [
          creativeWork({
            name: `${clientName} — Case Study`,
            description: seoDescription,
            path,
            image: seoImage,
          }),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Portfolio', path: '/portfolio' },
            { name: clientName, path },
          ]),
        ]
      : undefined;
  return (
    <>
      <SiteHeader />
      <SEO
        title={seoTitle}
        description={seoDescription}
        image={seoImage}
        url={path}
        type="article"
        jsonLd={jsonLd}
      />
      <main className="overflow-x-hidden bg-white font-['DM_Sans'] text-[#0A0A0F] min-h-[100svh]">
        {children}
        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}

/* ----------------------------------------------------------------------- */
/* Hero                                                                    */
/* ----------------------------------------------------------------------- */

export interface CaseHeroProps {
  client: string;
  title: React.ReactNode;          // headline (may include a serif accent span)
  summary: string;
  tags: string[];
  accentDot?: string;              // small eyebrow dot colour (client brand accent)
  hero: { src: string; alt: string; w: number; h: number; url?: string; frame?: 'browser' | 'plain' };
  liveUrl?: string;                // external "Visit the live site" link
}

export function CaseHero({
  client,
  title,
  summary,
  tags,
  accentDot = '#7B3FE4',
  hero,
  liveUrl,
}: CaseHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
      <PurpleBloom className="-top-40 -right-40" size={620} opacity={0.12} />
      <DotGrid className="opacity-[0.5]" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="mb-6 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: accentDot }} aria-hidden="true" />
            <span className="font-['JetBrains_Mono'] text-[11px] font-medium uppercase tracking-[0.18em] text-[#9E9EA8]">
              Case Study · {client}
            </span>
          </div>

          <h1 className="mx-auto max-w-3xl text-[40px] font-semibold leading-[1.05] tracking-[-0.035em] text-[#0A0A0F] sm:text-[54px] md:text-[72px]">
            {title}
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-[16px] leading-[1.65] text-[#6B6B7A] md:text-[19px]">
            {summary}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
            {tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-2 rounded-full border border-[#EAE3FF] bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-[#3D3D47] shadow-[0_1px_2px_rgba(15,15,30,0.04)] transition-all duration-300 hover:border-[#C4AAFF] hover:shadow-[0_4px_18px_rgba(123,63,228,0.12)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#7B3FE4]" aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Framed hero image */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
          className="mx-auto mt-14 max-w-4xl"
        >
          {hero.frame === 'browser' ? (
            <BrowserFrame url={hero.url}>
              <img src={hero.src} alt={hero.alt} width={hero.w} height={hero.h} className="block h-auto w-full" />
            </BrowserFrame>
          ) : (
            <img
              src={hero.src}
              alt={hero.alt}
              width={hero.w}
              height={hero.h}
              className="mx-auto block h-auto w-full drop-shadow-[0_34px_70px_rgba(76,29,149,0.20)]"
            />
          )}
        </motion.div>

        {liveUrl && (
          <motion.a
            href={`https://${liveUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
            className="mt-6 inline-flex items-center gap-1.5 font-['JetBrains_Mono'] text-[12px] uppercase tracking-[0.12em] text-[#7B3FE4] hover:text-[#6930D0]"
          >
            Visit the live site
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </motion.a>
        )}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/* Metric strip — honest facts only                                        */
/* ----------------------------------------------------------------------- */

export function CaseMetrics({ items }: { items: { value: string; label: string }[] }) {
  return (
    <section className="border-y border-[#E8E8EC] bg-[#FAFAFA] py-14">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className={`grid gap-6 text-center md:gap-12 ${
            items.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3'
          }`}
        >
          {items.map((m) => (
            <div key={m.label}>
              <span className="block text-[28px] font-semibold leading-none tracking-[-0.025em] text-[#0A0A0F] md:text-[44px]">
                {m.value}
              </span>
              <span className="mt-2.5 block text-[12.5px] leading-snug text-[#6B6B7A]">
                {m.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/* Alternating image / text module                                         */
/* ----------------------------------------------------------------------- */

export interface CaseModuleProps {
  index?: string;                  // "01"
  eyebrow: string;
  title: React.ReactNode;
  body: string[];
  pills?: string[];
  image: { src: string; alt: string; w: number; h: number; url?: string };
  reverse?: boolean;
  frame?: 'browser' | 'plain';
  tone?: 'white' | 'surface';
}

export function CaseModule({
  index,
  eyebrow,
  title,
  body,
  pills = [],
  image,
  reverse = false,
  frame = 'browser',
  tone = 'white',
}: CaseModuleProps) {
  const Img = (
    <div className="flex items-center justify-center">
      {frame === 'browser' ? (
        <BrowserFrame url={image.url} className="w-full">
          <img src={image.src} alt={image.alt} width={image.w} height={image.h} loading="lazy" className="block h-auto w-full" />
        </BrowserFrame>
      ) : (
        <img src={image.src} alt={image.alt} width={image.w} height={image.h} loading="lazy" className="block h-auto w-full object-contain drop-shadow-[0_28px_60px_rgba(76,29,149,0.18)]" />
      )}
    </div>
  );

  return (
    <section className={`relative overflow-hidden py-20 md:py-28 ${tone === 'surface' ? 'border-y border-[#E8E8EC] bg-[#FAFAFA]' : 'bg-white'}`}>
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="grid items-center gap-12 md:grid-cols-2 lg:gap-16"
        >
          <div className={reverse ? 'md:order-2' : ''}>
            <div className="mb-4 flex items-center gap-3">
              {index && (
                <span className="font-['JetBrains_Mono'] text-[12px] tracking-[0.2em] text-[#7B3FE4]">{index}</span>
              )}
              <span className="font-['JetBrains_Mono'] text-[11px] font-medium uppercase tracking-[0.16em] text-[#9E9EA8]">
                {eyebrow}
              </span>
            </div>
            <h2 className="mb-6 text-[28px] font-semibold leading-[1.13] tracking-[-0.02em] text-[#0A0A0F] md:text-[40px]">
              {title}
            </h2>
            <div className="space-y-5">
              {body.map((p, i) => (
                <p key={i} className="text-[15.5px] leading-[1.75] text-[#3D3D47]">
                  {p}
                </p>
              ))}
            </div>
            {pills.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2.5">
                {pills.map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-[#D4CAFF] bg-[#F0EBFF] px-3.5 py-1.5 text-[12px] font-medium text-[#7B3FE4]"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className={reverse ? 'md:order-1' : ''}>{Img}</div>
        </motion.div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/* Gallery — responsive screenshot grid                                    */
/* ----------------------------------------------------------------------- */

export function CaseGallery({
  eyebrow = 'The build, in detail',
  title,
  items,
  tone = 'surface',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  items: { src: string; alt: string; w: number; h: number; wide?: boolean }[];
  tone?: 'white' | 'surface';
}) {
  return (
    <section className={`relative overflow-hidden py-20 md:py-28 ${tone === 'surface' ? 'border-y border-[#E8E8EC] bg-[#FAFAFA]' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12 text-center md:mb-16"
        >
          <span className="mb-3 block font-['JetBrains_Mono'] text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4]">
            {eyebrow}
          </span>
          <h2 className="mx-auto max-w-xl text-[28px] font-semibold leading-[1.12] tracking-[-0.025em] text-[#0A0A0F] md:text-[40px]">
            {title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {items.map((it, i) => (
            <motion.div
              key={it.src}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 2) * 0.08 }}
              className={`group overflow-hidden rounded-2xl border border-[#E8E8EC] bg-white shadow-[0_10px_40px_-24px_rgba(76,29,149,0.25)] ${
                it.wide ? 'md:col-span-2' : ''
              }`}
            >
              <img
                src={it.src}
                alt={it.alt}
                width={it.w}
                height={it.h}
                loading="lazy"
                className="block h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/* Phone showcase — 3-up mobile frames on a soft band                      */
/* ----------------------------------------------------------------------- */

export function PhoneShowcase({
  eyebrow = 'On every screen',
  title,
  phones,
  tone = 'white',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  phones: { src: string; alt: string; w: number; h: number }[];
  tone?: 'white' | 'surface';
}) {
  return (
    <section className={`relative overflow-hidden py-20 md:py-28 ${tone === 'surface' ? 'border-y border-[#E8E8EC] bg-[#FAFAFA]' : 'bg-white'}`}>
      <PurpleBloom className="left-1/2 top-10 -translate-x-1/2" size={560} opacity={0.08} />
      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12 text-center md:mb-16"
        >
          <span className="mb-3 block font-['JetBrains_Mono'] text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4]">
            {eyebrow}
          </span>
          <h2 className="mx-auto max-w-md text-[26px] font-semibold leading-[1.15] tracking-[-0.025em] text-[#0A0A0F] md:text-[36px]">
            {title}
          </h2>
        </motion.div>

        <div className="flex flex-wrap items-end justify-center gap-5 md:gap-8">
          {phones.map((p, i) => (
            <motion.div
              key={p.src}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.1 }}
              className={`w-[44%] max-w-[220px] overflow-hidden rounded-[26px] border-[5px] border-[#0A0A0F] bg-[#0A0A0F] shadow-[0_30px_70px_-30px_rgba(15,15,30,0.5)] sm:w-[30%] ${
                i === 1 ? 'sm:-translate-y-4' : ''
              }`}
            >
              <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" className="block h-auto w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/* Tech stack row                                                          */
/* ----------------------------------------------------------------------- */

export function CaseTech({ items }: { items: string[] }) {
  return (
    <section className="border-b border-[#E8E8EC] bg-white py-16">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="mb-6 block font-['JetBrains_Mono'] text-[11px] font-medium uppercase tracking-[0.16em] text-[#9E9EA8]">
            Built with
          </span>
          <div className="flex flex-wrap justify-center gap-2.5">
            {items.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[#E8E8EC] bg-[#F5F5F7] px-4 py-2 text-[13.5px] text-[#6B6B7A] transition-colors duration-200 hover:border-[#D4D4DA]"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- */
/* Prev / next nav                                                         */
/* ----------------------------------------------------------------------- */

export function CaseNav({
  prev,
  next,
}: {
  prev: { to: string; label: string };
  next: { to: string; label: string };
}) {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
        <Link
          to={prev.to}
          className="flex items-center gap-2 font-['JetBrains_Mono'] text-[12px] uppercase tracking-[0.1em] text-[#9E9EA8] transition-colors duration-200 hover:text-[#0A0A0F]"
        >
          <span aria-hidden="true">←</span> {prev.label}
        </Link>
        <Link
          to={next.to}
          className="flex items-center gap-2 font-['JetBrains_Mono'] text-[12px] uppercase tracking-[0.1em] text-[#9E9EA8] transition-colors duration-200 hover:text-[#0A0A0F]"
        >
          {next.label} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
