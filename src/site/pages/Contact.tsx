import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import Panel from '../components/craft/Panel';
import Tag from '../components/craft/Tag';
import SplitReveal from '../components/craft/SplitReveal';
import FillButton from '../components/craft/FillButton';
import { fadeUp } from '../lib/motion';
import { CONTACT } from '../data/site';
import { FAQ_ITEMS } from '../data/faq';

const INTERESTS = [
  'New website',
  'Website redesign',
  'Booking / online store',
  'Systems & automation',
  'Hosting & maintenance',
  'Not sure yet',
];

const BUDGETS = [
  'Under R10k',
  'R10k – R25k',
  'R25k – R60k',
  'R60k+',
  'Rent-to-own · From R699/mo',
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
      <span className="mb-2 block text-[14px] font-medium text-site-text-body">
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

/** Toggle pill — shared by the "what do you need" and budget rows. */
function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      data-cursor="link"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-[44px] rounded-full border px-5 text-[15px] font-medium outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-site-accent focus-visible:ring-offset-2 ${
        active
          ? 'border-site-accent bg-site-accent text-white'
          : 'border-site-line text-site-text-body hover:border-site-line-mid hover:text-site-ink'
      }`}
    >
      {label}
    </button>
  );
}

/**
 * Contact — one long, plain white form. No hero video, no dark panel — just
 * the headline and the form, Cuberto-contacts-page simple. Submitting
 * composes a prefilled WhatsApp message (no backend). Direct email/WhatsApp/
 * location already live in the global footer, so this page doesn't repeat
 * them. FAQ stays below — it backs the FAQPage schema in SiteSEO.
 */
export default function Contact() {
  const [interest, setInterest] = useState('');
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
      interest ? `\nI'm interested in: ${interest}` : '',
      project ? `\nWhat I'm building: ${project.trim()}` : '',
      budget ? `\nBudget: ${budget}` : '',
      email ? `\nEmail: ${email.trim()}` : '',
    ].join('');
    setStatus('Opening WhatsApp with your details ready to send.');
    window.open(`${CONTACT.whatsappUrl}?text=${encodeURIComponent(lines)}`, '_blank', 'noopener');
  };

  return (
    <>
      <Panel bg="white" first className="px-6 pb-24 pt-40 md:px-10 md:pt-48">
        <div className="mx-auto w-full max-w-3xl">
          <Tag variant="outline" className="mb-6">
            Get in touch
          </Tag>
          <SplitReveal
            as="h1"
            trigger="mount"
            segments={[{ text: 'Hey — tell me what' }, { text: "you're building.", serif: true }]}
            className="max-w-[16ch] text-[clamp(40px,7vw,72px)] font-semibold leading-[1.04] tracking-[-0.02em] text-site-ink"
          />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-7 max-w-md text-[17px] leading-[1.65] text-site-text-body"
          >
            Fill this in and it opens WhatsApp with your details ready to send. I usually reply the
            same day, Mon–Fri 8–5.
          </motion.p>

          <motion.form
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-16 flex flex-col gap-14"
            noValidate
            onSubmit={submit}
          >
            <div>
              <span className="mb-4 block text-[15px] font-medium text-site-text-body">What do you need?</span>
              <div className="flex flex-wrap gap-3">
                {INTERESTS.map((i) => (
                  <Pill key={i} label={i} active={interest === i} onClick={() => setInterest((cur) => (cur === i ? '' : i))} />
                ))}
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-2">
              <Field label="Your name" name="name" value={name} onChange={setName} placeholder="Jane Dlamini" required error={errors.name} />
              <Field label="Email" name="email" type="email" value={email} onChange={setEmail} placeholder="jane@business.co.za" error={errors.email} />
            </div>

            <Field
              label="Tell me about your project"
              name="project"
              value={project}
              onChange={setProject}
              placeholder="What are you building, and what should it do?"
              textarea
              required
              error={errors.project}
            />

            <div>
              <span className="mb-4 block text-[15px] font-medium text-site-text-body">Project budget (ZAR)</span>
              <div className="flex flex-wrap gap-3">
                {BUDGETS.map((b) => (
                  <Pill key={b} label={b} active={budget === b} onClick={() => setBudget((cur) => (cur === b ? '' : b))} />
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <FillButton onClick={submit} variant="ink" className="w-full justify-center sm:w-auto">
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

      {/* FAQ — visible content paired with the FAQPage schema (SiteSEO). */}
      <Panel bg="offwhite" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto w-full max-w-3xl">
          <Tag variant="outline" className="mb-6">
            FAQ
          </Tag>
          <SplitReveal
            as="h2"
            segments={[{ text: 'Questions,' }, { text: 'answered.', serif: true }]}
            className="text-[clamp(30px,4vw,46px)] font-semibold leading-[1.05] tracking-[-0.02em] text-site-ink"
          />

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
