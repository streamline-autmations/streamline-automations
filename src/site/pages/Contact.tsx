import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import Panel from '../components/craft/Panel';
import Tag from '../components/craft/Tag';
import SplitReveal from '../components/craft/SplitReveal';
import FillButton from '../components/craft/FillButton';
import { EASE_ARR, fadeUp, viewport } from '../lib/motion';
import { CONTACT, SOCIALS } from '../data/site';
import { FAQ_ITEMS } from '../data/faq';
import EngineBackdrop from '../components/three/EngineBackdrop';

const BUDGETS = [
  'Online Presence - from R6,500',
  'Client Magnet - from R12,000',
  'Business Accelerator - from R25,000 + support',
  'Maintenance retainer',
  'Not sure yet',
];

/** Underline-style input (Cuberto contacts feel). */
function Field({
  label,
  value,
  onChange,
  name,
  type = 'text',
  placeholder,
  textarea = false,
  required = false,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  name: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  required?: boolean;
  error?: string;
}) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const cls =
    'w-full border-0 border-b bg-transparent pb-3 pt-2 text-[19px] text-site-ink outline-none transition-colors duration-300 placeholder:text-site-text-muted focus:border-site-accent md:text-[22px]';
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-site-text-muted">
        {label}
        {required && <span className="text-site-accent"> *</span>}
      </span>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={2}
          value={value}
          placeholder={placeholder}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => onChange(e.target.value)}
          className={`${cls} resize-none ${error ? 'border-site-accent' : 'border-site-line'}`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => onChange(e.target.value)}
          className={`${cls} ${error ? 'border-site-accent' : 'border-site-line'}`}
        />
      )}
      {error && (
        <span id={errorId} className="mt-2 block text-[13px] font-medium text-site-accent">
          {error}
        </span>
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('');

  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) nextErrors.name = 'Add your name so I know who I am speaking to.';
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Use a valid email address, or leave it blank and use WhatsApp only.';
    }
    if (!project.trim()) nextErrors.project = 'Tell me what you need built.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('Please complete the required details before WhatsApp opens.');
      return;
    }

    const lines = [
      `Hi Christiaan, I'm ${name.trim()} and I'd like to talk about a project.`,
      project ? `\nWhat I'm building: ${project.trim()}` : '',
      budget ? `\nBudget: ${budget}` : '',
      email ? `\nEmail: ${email.trim()}` : '',
    ].join('');
    setStatus('Opening WhatsApp with your details ready to send.');
    window.open(`${CONTACT.whatsappUrl}?text=${encodeURIComponent(lines)}`, '_blank', 'noopener');
  };

  return (
    <>
      {/* HERO — ink + the scroll-reactive Engine (CSS blooms on mobile/RM) */}
      <Panel bg="ink" first className="flex min-h-[88svh] items-center overflow-hidden px-6 pt-32 pb-24 md:px-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="sc-bloom-a absolute -top-40 left-[18%] h-[560px] w-[560px] rounded-full bg-site-accent opacity-[0.16] blur-[150px]" />
          <div className="sc-bloom-b absolute -bottom-44 right-[16%] h-[480px] w-[480px] rounded-full bg-[#5b2bd6] opacity-[0.12] blur-[150px]" />
        </div>
        {/* Core sits right of the left-aligned headline */}
        <EngineBackdrop corePos={[3.0, -0.2, -0.8]} />

        <div className="relative mx-auto w-full max-w-6xl">
          <Tag variant="white" className="mb-7">
            Get in touch
          </Tag>
          <SplitReveal
            as="h1"
            trigger="mount"
            segments={[{ text: 'Book a' }, { text: 'free', serif: true }, { text: 'call.' }]}
            className="max-w-[14ch] text-[clamp(48px,9vw,116px)] font-semibold leading-[0.96] tracking-[-0.03em] text-white"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_ARR, delay: 0.4 }}
            className="mt-8 max-w-lg text-[17px] leading-[1.65] text-white/70"
          >
            Tell me what you need: a professional website, a booking flow, a dashboard, or the
            automation behind it. No pitch deck. Just a clear next step.
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
              Fill this in and it opens WhatsApp with the details ready to send. Prefer email? It is
              right below.
            </p>
          </div>

          <motion.form variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-col gap-9" noValidate onSubmit={submit}>
            <div className="grid gap-9 sm:grid-cols-2">
              <Field label="Your name" name="name" value={name} onChange={setName} placeholder="Jane Dlamini" required error={errors.name} />
              <Field label="Email" name="email" type="email" value={email} onChange={setEmail} placeholder="jane@business.co.za" error={errors.email} />
            </div>
            <Field
              label="What are you building?"
              name="project"
              value={project}
              onChange={setProject}
              placeholder="A booking site, an admin system, WhatsApp automation…"
              textarea
              required
              error={errors.project}
            />

            <div>
              <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.14em] text-site-text-muted">Package or budget</span>
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
            {status && (
              <p
                role={Object.keys(errors).length > 0 ? 'alert' : 'status'}
                className={`text-[14px] font-medium ${
                  Object.keys(errors).length > 0 ? 'text-site-accent' : 'text-site-text-body'
                }`}
              >
                {status}
              </p>
            )}
          </motion.form>
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
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">WhatsApp</div>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[16px] text-white/[0.78] hover:text-white">
                {CONTACT.whatsappDisplay}
              </a>
            </div>
            <div>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">Instagram</div>
              <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" className="text-[16px] text-white/[0.78] hover:text-white">
                {CONTACT.instagram}
              </a>
            </div>
            <div>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">Hours</div>
              <div className="flex flex-col gap-1 text-[15px] text-white/[0.7]">
                {CONTACT.hours.map(([d, h]) => (
                  <span key={d}>
                    {d} · {h}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">Based in</div>
              <p className="text-[15px] text-white/[0.7]">{CONTACT.location}</p>
            </div>
          </div>
        </div>
      </Panel>

      {/* FAQ — white. Visible content paired with the FAQPage schema (SiteSEO). */}
      <Panel bg="white" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-3xl">
          <Tag variant="outline" className="mb-6">
            FAQ
          </Tag>
          <h2 className="text-[clamp(30px,4vw,46px)] font-semibold leading-[1.05] tracking-[-0.02em] text-site-ink">
            Questions, <span className="text-site-accent">answered</span>.
          </h2>

          <div className="mt-10 divide-y divide-site-line border-t border-site-line">
            {FAQ_ITEMS.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold text-site-ink outline-none transition-colors duration-200 hover:text-site-accent focus-visible:text-site-accent">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="ml-2 flex-shrink-0 text-[22px] font-normal leading-none text-site-accent transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-[15.5px] leading-[1.65] text-site-text-body">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Panel>
    </>
  );
}
