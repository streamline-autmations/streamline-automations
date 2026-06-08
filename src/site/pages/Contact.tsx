import { useState } from 'react';
import { motion } from 'framer-motion';
import Panel from '../components/craft/Panel';
import Tag from '../components/craft/Tag';
import SplitReveal from '../components/craft/SplitReveal';
import FillButton from '../components/craft/FillButton';
import { EASE_ARR, fadeUp, viewport } from '../lib/motion';
import { CONTACT, SOCIALS, STOCK } from '../data/site';

const BUDGETS = ['R5k – R20k · website', 'R10k – R35k · system', 'Monthly rental', 'Not sure yet'];

/** Underline-style input (Cuberto contacts feel). */
function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  textarea = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
}) {
  const cls =
    'w-full border-0 border-b border-site-line bg-transparent pb-3 pt-2 text-[19px] text-site-ink outline-none transition-colors duration-300 placeholder:text-site-text-muted focus:border-site-accent md:text-[22px]';
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-site-text-muted">{label}</span>
      {textarea ? (
        <textarea
          rows={2}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${cls} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      )}
    </label>
  );
}

/**
 * Contact — Cuberto-calibrated contacts page. Ink hero with a looping video bg,
 * a white form panel with large underline inputs that composes a prefilled
 * WhatsApp message (no backend yet), then an ink details panel. Alternating
 * rounded panels. No <form> element — submit is an onClick handler.
 */
export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [project, setProject] = useState('');
  const [budget, setBudget] = useState('');

  const submit = () => {
    const lines = [
      `Hi Christiaan, I'm ${name || 'someone'} and I'd like to talk about a project.`,
      project ? `\nWhat I'm building: ${project}` : '',
      budget ? `\nBudget: ${budget}` : '',
      email ? `\nEmail: ${email}` : '',
    ].join('');
    window.open(`${CONTACT.whatsappUrl}?text=${encodeURIComponent(lines)}`, '_blank', 'noopener');
  };

  return (
    <>
      {/* HERO — ink + looping video */}
      <Panel bg="ink" first className="flex min-h-[88svh] items-center overflow-hidden px-6 pt-32 pb-24 md:px-10">
        <video
          src={STOCK.ctaLoop}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.28]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-site-ink/40 via-site-ink/30 to-site-ink/80" />

        <div className="relative mx-auto w-full max-w-6xl">
          <Tag variant="white" className="mb-7">
            Get in touch
          </Tag>
          <SplitReveal
            as="h1"
            trigger="mount"
            segments={[{ text: 'Have an' }, { text: 'idea?', serif: true }, { text: "Let's build it." }]}
            className="max-w-[14ch] text-[clamp(48px,9vw,116px)] font-semibold leading-[0.96] tracking-[-0.03em] text-white"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.4 }}
            className="mt-8 max-w-lg text-[17px] leading-[1.65] text-white/60"
          >
            Tell me what you're building — a website, a system, or the automation that does the
            busywork. No pitch, no pressure. I usually reply same day.
          </motion.p>
        </div>
      </Panel>

      {/* FORM — white */}
      <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid w-full max-w-6xl gap-14 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Tag variant="outline" className="mb-6">
              Start here
            </Tag>
            <h2 className="text-[clamp(30px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.02em] text-site-ink">
              Tell me about the <span className="text-site-accent">project</span>.
            </h2>
            <p className="mt-5 max-w-sm text-[16px] leading-[1.65] text-site-text-body">
              Fill this in and it opens WhatsApp with the details ready to send. Prefer email? It's
              right below.
            </p>
          </div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col gap-9">
            <div className="grid gap-9 sm:grid-cols-2">
              <Field label="Your name" value={name} onChange={setName} placeholder="Jane Dlamini" />
              <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="jane@business.co.za" />
            </div>
            <Field
              label="What are you building?"
              value={project}
              onChange={setProject}
              placeholder="A booking site, an admin system, WhatsApp automation…"
              textarea
            />

            <div>
              <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.14em] text-site-text-muted">Budget</span>
              <div className="flex flex-wrap gap-3">
                {BUDGETS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    data-cursor="link"
                    onClick={() => setBudget((cur) => (cur === b ? '' : b))}
                    className={`min-h-[44px] rounded-full border px-5 text-[13.5px] font-medium outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-2 ${
                      budget === b
                        ? 'border-site-accent bg-site-accent text-white'
                        : 'border-site-line text-site-text-secondary hover:border-site-line-mid hover:text-site-ink'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <FillButton onClick={submit} variant="ink">
                Send on WhatsApp
              </FillButton>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-[15px] font-medium text-site-ink underline-offset-4 outline-none hover:underline focus-visible:text-site-accent focus-visible:underline"
              >
                …or email me →
              </a>
            </div>
          </motion.div>
        </div>
      </Panel>

      {/* DETAILS — ink */}
      <Panel bg="ink" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <Tag variant="outline-dark" className="mb-8">
            Or reach me directly
          </Tag>
          <a
            href={`mailto:${CONTACT.email}`}
            data-cursor="link"
            className="group block max-w-full break-words text-[clamp(28px,5vw,64px)] font-semibold tracking-[-0.02em] text-white outline-none"
          >
            <span className="bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-brand group-hover:bg-[length:100%_2px]">
              {CONTACT.email}
            </span>
          </a>

          <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">WhatsApp</div>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[16px] text-white/[0.78] hover:text-white">
                {CONTACT.whatsappDisplay}
              </a>
            </div>
            <div>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Instagram</div>
              <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" className="text-[16px] text-white/[0.78] hover:text-white">
                {CONTACT.instagram}
              </a>
            </div>
            <div>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Hours</div>
              <div className="flex flex-col gap-1 text-[15px] text-white/[0.7]">
                {CONTACT.hours.map(([d, h]) => (
                  <span key={d}>
                    {d} · {h}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Based in</div>
              <p className="text-[15px] text-white/[0.7]">{CONTACT.location}</p>
            </div>
          </div>
        </div>
      </Panel>
    </>
  );
}
