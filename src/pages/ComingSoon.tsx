import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease, delay },
});

export default function ComingSoon() {
  return (
    <div className="min-h-[100svh] bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* Subtle purple glow — top right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #7B3FE4 0%, transparent 70%)' }}
      />

      {/* Subtle purple glow — bottom left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #7B3FE4 0%, transparent 70%)' }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full">

        {/* Wordmark */}
        <motion.div {...fade(0)} className="mb-12">
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-[#9E9EA8]">
            Streamline Automations
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fade(0.1)}
          className="text-[2.8rem] sm:text-[3.5rem] leading-[1.1] font-semibold text-[#0A0A0F] mb-6"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          Something{' '}
          <em
            className="not-italic"
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
          className="text-[1.05rem] text-[#6B6B7A] leading-relaxed mb-10"
        >
          I'm putting the finishing touches on the new site. In the meantime,
          reach out directly — I respond fast.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fade(0.3)}
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
        >
          <a
            href="https://wa.me/27633063861"
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
            href="mailto:christian@streamline-automations.agency"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E8E8EC] text-[#3D3D47] text-[0.95rem] font-medium px-7 py-3.5 transition-colors duration-200 hover:border-[#D4D4DA] hover:bg-[#FAFAFA]"
            style={{ minHeight: 44 }}
          >
            Send an email
          </a>
        </motion.div>

        {/* Divider */}
        <motion.div
          {...fade(0.4)}
          className="mt-16 w-12 h-px bg-[#E8E8EC]"
        />

        {/* Footer note */}
        <motion.p
          {...fade(0.45)}
          className="mt-6 text-[0.8rem] text-[#9E9EA8]"
        >
          streamline-automations.agency
        </motion.p>
      </div>
    </div>
  );
}
