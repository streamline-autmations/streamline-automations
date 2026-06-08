import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease, delay },
});

function SiteGhost() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      {/* Nav bar ghost */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[min(900px,90vw)] flex items-center justify-between px-6">
        <div className="h-5 w-32 rounded bg-[#7B3FE4]/10" />
        <div className="flex gap-4">
          {[56, 48, 64, 40, 52].map((w, i) => (
            <div key={i} className="h-3 rounded bg-[#0A0A0F]/6" style={{ width: w }} />
          ))}
        </div>
        <div className="h-8 w-28 rounded-full bg-[#7B3FE4]/10" />
      </div>

      {/* Hero block ghost */}
      <div className="absolute top-[14%] left-1/2 -translate-x-1/2 w-[min(700px,85vw)] flex flex-col items-center gap-4">
        <div className="h-3 w-24 rounded bg-[#7B3FE4]/12" />
        <div className="h-12 w-[90%] rounded-lg bg-[#0A0A0F]/5" />
        <div className="h-12 w-[70%] rounded-lg bg-[#0A0A0F]/5" />
        <div className="h-4 w-[60%] rounded bg-[#0A0A0F]/4 mt-2" />
        <div className="h-4 w-[50%] rounded bg-[#0A0A0F]/4" />
        <div className="flex gap-3 mt-4">
          <div className="h-10 w-36 rounded-full bg-[#7B3FE4]/12" />
          <div className="h-10 w-28 rounded-full bg-[#0A0A0F]/5" />
        </div>
      </div>

      {/* Cards row ghost */}
      <div className="absolute top-[52%] left-1/2 -translate-x-1/2 w-[min(860px,90vw)] grid grid-cols-3 gap-5">
        {[0, 1, 2].map(i => (
          <div key={i} className="rounded-2xl border border-[#E8E8EC]/60 bg-[#F5F5F7]/30 p-5 flex flex-col gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#7B3FE4]/10" />
            <div className="h-4 w-3/4 rounded bg-[#0A0A0F]/6" />
            <div className="h-3 w-full rounded bg-[#0A0A0F]/4" />
            <div className="h-3 w-5/6 rounded bg-[#0A0A0F]/4" />
            <div className="h-3 w-2/3 rounded bg-[#0A0A0F]/4 mt-1" />
          </div>
        ))}
      </div>

      {/* Stats strip ghost */}
      <div className="absolute top-[76%] left-1/2 -translate-x-1/2 w-[min(860px,90vw)] grid grid-cols-4 gap-6">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="h-8 w-20 rounded bg-[#7B3FE4]/10" />
            <div className="h-3 w-16 rounded bg-[#0A0A0F]/5" />
          </div>
        ))}
      </div>

      {/* Footer strip ghost */}
      <div className="absolute bottom-0 left-0 right-0 h-20 border-t border-[#E8E8EC]/40 bg-[#FAFAFA]/20 flex items-center justify-center gap-8 px-8">
        <div className="h-3 w-28 rounded bg-[#0A0A0F]/5" />
        <div className="h-3 w-20 rounded bg-[#0A0A0F]/4" />
        <div className="h-3 w-24 rounded bg-[#0A0A0F]/4" />
        <div className="h-3 w-16 rounded bg-[#0A0A0F]/4" />
      </div>

      {/* Radial fade — keeps center readable */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 55% 60% at 50% 50%, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.4) 100%)',
        }}
      />
    </div>
  );
}

export default function ComingSoon() {
  return (
    <div className="min-h-[100svh] bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* Site skeleton in the background */}
      <SiteGhost />

      {/* Purple glow accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #7B3FE4 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #7B3FE4 0%, transparent 70%)' }}
      />

      {/* Card */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full">

        {/* Badge */}
        <motion.div {...fade(0)} className="mb-8">
          <span className="inline-flex items-center gap-2 text-[0.75rem] font-medium tracking-[0.18em] uppercase text-[#9E9EA8] border border-[#E8E8EC] rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7B3FE4] animate-pulse" />
            Under construction
          </span>
        </motion.div>

        {/* Wordmark */}
        <motion.div {...fade(0.05)} className="mb-10">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-[#6B6B7A]">
            Streamline Automations
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fade(0.1)}
          className="text-[2.6rem] sm:text-[3.2rem] leading-[1.1] font-semibold text-[#0A0A0F] mb-5"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          Something{' '}
          <em
            style={{
              fontFamily: 'Instrument Serif, serif',
              fontStyle: 'italic',
              color: '#7B3FE4',
            }}
          >
            good
          </em>{' '}
          is coming.
        </motion.h1>

        {/* Body */}
        <motion.p
          {...fade(0.2)}
          className="text-[1rem] text-[#6B6B7A] leading-relaxed mb-9"
        >
          I'm putting the finishing touches on the new site. Reach out directly in the meantime — I respond fast.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fade(0.3)}
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
        >
          <a
            href="https://wa.me/27687579940"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7B3FE4] text-white text-[0.95rem] font-medium px-7 py-3.5 transition-colors duration-200 hover:bg-[#6930D0]"
            style={{ minHeight: 44 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp me
          </a>

          <a
            href="mailto:christiaan@streamline-automations.co.za"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E8E8EC] text-[#3D3D47] text-[0.95rem] font-medium px-7 py-3.5 transition-colors duration-200 hover:border-[#D4D4DA] hover:bg-[#FAFAFA]"
            style={{ minHeight: 44 }}
          >
            Send an email
          </a>
        </motion.div>

        {/* Divider + domain */}
        <motion.div {...fade(0.4)} className="mt-14 flex flex-col items-center gap-4">
          <div className="w-10 h-px bg-[#E8E8EC]" />
          <p className="text-[0.78rem] text-[#9E9EA8]">streamline-automations.co.za</p>
        </motion.div>
      </div>
    </div>
  );
}
