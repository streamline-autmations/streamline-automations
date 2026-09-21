import { useRef, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import Field from '../craft/Field';
import FillButton from '../craft/FillButton';
import { EASE_ARR } from '../../lib/motion';
import { CONTACT, CONTACT_WEBHOOK_URL } from '../../data/site';

/**
 * RestaurantReviewForm — the free restaurant review request. Posts to the same
 * n8n contact pipeline as /contact, tagged source=…/restaurant-direct and
 * interest=Restaurant Direct so it can be routed. Same spam defence as the
 * contact form (honeypot + minimum fill time). WhatsApp is the secondary path.
 */
export default function RestaurantReviewForm() {
  const [restaurant, setRestaurant] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [botField, setBotField] = useState('');
  const mountedAt = useRef(Date.now());

  /** Returns the error map so the caller can focus the first invalid field. */
  const validate = () => {
    const next: Record<string, string> = {};
    if (!restaurant.trim()) next.restaurant = 'Which restaurant is this for?';
    if (!name.trim()) next.name = 'Add your name so I know who I’m speaking to.';
    if (!email.trim()) {
      next.email = 'Add your email so I can send the review.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'That email doesn’t look right — double-check it.';
    }
    if (!phone.trim()) next.phone = 'Add a number I can call or WhatsApp.';
    setErrors(next);
    return next;
  };

  const submit = async (event?: FormEvent) => {
    event?.preventDefault();
    if (sending) return;
    const invalid = validate();
    const firstInvalid = ['restaurant', 'name', 'phone', 'email'].find((f) => invalid[f]);
    if (firstInvalid) {
      setStatus('Please complete the required details first.');
      document.getElementById(`review-${firstInvalid}`)?.focus();
      return;
    }
    if (botField || Date.now() - mountedAt.current < 2500) {
      setSent(true);
      return;
    }

    setSending(true);
    setStatus('');
    try {
      const data = new FormData();
      data.append('name', name.trim());
      data.append('email', email.trim());
      data.append('phone', phone.trim());
      data.append('interest', 'Restaurant Direct');
      data.append('restaurant', restaurant.trim());
      if (link.trim()) data.append('link', link.trim());
      data.append(
        'project',
        [
          `Free restaurant review request — ${restaurant.trim()}`,
          link.trim() ? `Website / social: ${link.trim()}` : '',
          message.trim(),
        ]
          .filter(Boolean)
          .join('\n'),
      );
      data.append('source', 'streamline-automations.co.za/restaurant-direct');
      data.append('submittedAt', new Date().toISOString());
      await fetch(CONTACT_WEBHOOK_URL, { method: 'POST', body: data, mode: 'no-cors' });
      setSent(true);
    } catch {
      setStatus('That didn’t send — try again in a minute, or WhatsApp me instead.');
    } finally {
      setSending(false);
    }
  };

  const openWhatsApp = () => {
    const text = [
      `Hi Christiaan, I'd like a free restaurant review${restaurant.trim() ? ` for ${restaurant.trim()}` : ''}.`,
      link.trim() ? `\nOur website / social: ${link.trim()}` : '',
      message.trim() ? `\n${message.trim()}` : '',
    ].join('');
    window.open(`${CONTACT.whatsappUrl}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_ARR }}
        role="status"
        aria-live="polite"
        className="rounded-[2rem] bg-white px-9 py-12 md:px-12 md:py-14"
      >
        <p className="text-[clamp(28px,4vw,44px)] font-semibold leading-[1.1] tracking-[-0.02em] text-site-ink">
          Got it<span className="text-site-accent">.</span>
        </p>
        <p className="mt-4 max-w-md text-[17px] leading-[1.65] text-site-text-body">
          I’ll have a look at {restaurant.trim() || 'your restaurant'} and come back to you within 24
          hours with what I’d recommend.
        </p>
        <div className="mt-8">
          <FillButton href={CONTACT.whatsappUrl} external variant="ink">
            WhatsApp me
          </FillButton>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={submit}
      aria-busy={sending}
      className="flex flex-col gap-10 rounded-[2rem] bg-white px-7 py-10 md:gap-12 md:px-11 md:py-12"
    >
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="review-company">Company (leave blank)</label>
        <input
          id="review-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={botField}
          onChange={(e) => setBotField(e.target.value)}
        />
      </div>

      <Field idPrefix="review" label="Restaurant name" name="restaurant" value={restaurant} onChange={setRestaurant} placeholder="Jimmy’s Burger Bar" required error={errors.restaurant} />

      <div className="grid gap-10 sm:grid-cols-2">
        <Field idPrefix="review" label="Your name" name="name" value={name} onChange={setName} placeholder="Jane Dlamini" required error={errors.name} />
        <Field idPrefix="review" label="Phone / WhatsApp" name="phone" type="tel" value={phone} onChange={setPhone} placeholder="068 123 4567" required error={errors.phone} />
      </div>

      <div className="grid gap-10 sm:grid-cols-2">
        <Field idPrefix="review" label="Email" name="email" type="email" value={email} onChange={setEmail} placeholder="jane@restaurant.co.za" required error={errors.email} />
        <Field idPrefix="review" label="Website or Instagram (optional)" name="link" value={link} onChange={setLink} placeholder="instagram.com/yourrestaurant" />
      </div>

      <Field
        idPrefix="review"
        label="What’s the biggest headache right now? (optional)"
        name="message"
        value={message}
        onChange={setMessage}
        placeholder="Bookings, WhatsApp orders, an old menu PDF…"
        textarea
      />

      <div className="flex flex-wrap items-center gap-6">
        <FillButton type="submit" disabled={sending} variant="ink" className="w-full justify-center sm:w-auto">
          {sending ? 'Sending…' : 'Get my free review'}
        </FillButton>
        <button
          type="button"
          onClick={openWhatsApp}
          className="min-h-[44px] text-[15px] font-medium text-site-ink underline-offset-4 outline-none hover:underline focus-visible:text-site-accent focus-visible:underline"
        >
          …or WhatsApp me instead →
        </button>
      </div>

      {status && (
        <p
          role={Object.keys(errors).length > 0 ? 'alert' : 'status'}
          className={`text-[14px] font-medium ${Object.keys(errors).length > 0 ? 'text-site-accent' : 'text-site-text-body'}`}
        >
          {status}
        </p>
      )}
    </form>
  );
}
