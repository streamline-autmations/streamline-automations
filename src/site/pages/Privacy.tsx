import { CONTACT } from '../data/site';

const UPDATED = '11 June 2026';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-[22px] font-semibold tracking-[-0.01em] text-site-ink md:text-[26px]">{title}</h2>
      <div className="mt-3 space-y-3 text-[15.5px] leading-[1.7] text-site-text-body">{children}</div>
    </section>
  );
}

/** Privacy Policy (POPIA) — v2 styling. Rendered inside SiteLayout (header/footer added there). */
export default function Privacy() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-32 pb-24 md:pt-40 md:pb-32">
      <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-site-accent">Legal</span>
      <h1 className="mt-4 text-[40px] font-semibold leading-[1.07] tracking-[-0.03em] text-site-ink sm:text-[52px]">
        Privacy policy.
      </h1>
      <p className="mt-5 text-[16px] leading-[1.6] text-site-text-muted">
        Last updated {UPDATED}. How I collect, use and protect your personal information through
        streamline-automations.co.za, under the Protection of Personal Information Act (POPIA).
      </p>

      <Section title="Who I am">
        <p>
          Streamline Automations is run by Christiaan Steffen, based in the Vaal Triangle, Gauteng,
          South Africa (CIPC {CONTACT.cipc}). I'm the Information Officer for personal information
          collected here. Reach me at{' '}
          <a className="font-medium text-site-accent hover:underline" href={`mailto:${CONTACT.email}`}>
            {CONTACT.email}
          </a>{' '}
          or on WhatsApp at {CONTACT.whatsappDisplay}.
        </p>
      </Section>

      <Section title="What I collect">
        <p>
          <strong className="text-site-ink">What you send me.</strong> When you get in touch I collect
          the details you provide — typically your name, email or phone number, and your message.
        </p>
        <p>
          <strong className="text-site-ink">Collected automatically.</strong> With your consent, I use
          analytics (Google Analytics, PostHog, Apollo) that record standard usage data — pages viewed,
          approximate location, device and browser. Decline cookies and these don't load.
        </p>
      </Section>

      <Section title="How I use it">
        <p>
          To respond to your enquiry, scope your project and follow up about working together, and to
          understand how the site is used so I can improve it. I don't sell your personal information.
        </p>
      </Section>

      <Section title="Cookies & consent">
        <p>
          Cookies are used only for analytics, and only after you accept them on the banner. Analytics
          stays off until you consent. To change your choice, clear this site's data in your browser and
          reload, then choose again.
        </p>
      </Section>

      <Section title="Your rights under POPIA">
        <p>
          You can ask what information I hold, have it corrected or deleted, object to processing, and
          withdraw consent — email{' '}
          <a className="font-medium text-site-accent hover:underline" href={`mailto:${CONTACT.email}`}>
            {CONTACT.email}
          </a>
          . You may also complain to the Information Regulator of South Africa.
        </p>
      </Section>

      <Section title="Security">
        <p>
          The site is served over HTTPS and I take reasonable steps to protect your information. No
          transmission over the internet is perfectly secure, but I work to keep your data safe.
        </p>
      </Section>

      <Section title="Changes">
        <p>I may update this policy; the date above shows the latest change.</p>
      </Section>
    </section>
  );
}
