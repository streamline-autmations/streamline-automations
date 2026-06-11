import SEO from '../components/seo/SEO';
import { breadcrumb } from '../lib/structured-data';
import SiteHeader from '../components/white/SiteHeader';
import SiteFooter from '../components/white/SiteFooter';

const UPDATED = '11 June 2026';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-['DM_Sans'] text-[22px] font-semibold tracking-[-0.01em] text-[#0A0A0F] md:text-[26px]">
        {title}
      </h2>
      <div className="mt-3 space-y-3 font-['DM_Sans'] text-[15.5px] leading-[1.7] text-[#3D3D47]">
        {children}
      </div>
    </section>
  );
}

export default function Privacy() {
  return (
    <>
      <SiteHeader />
      <SEO
        title="Privacy Policy"
        description="How Streamline Automations collects, uses and protects your personal information, in line with South Africa's POPIA."
        url="/privacy"
        jsonLd={breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy' },
        ])}
      />

      <main className="bg-white min-h-[100svh] font-['DM_Sans']">
        <section className="mx-auto max-w-3xl px-6 pt-36 pb-24 md:pt-44 md:pb-32">
          <span className="block font-['JetBrains_Mono'] text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4]">
            Legal
          </span>
          <h1 className="mt-4 font-['DM_Sans'] text-[40px] font-semibold leading-[1.07] tracking-[-0.03em] text-[#0A0A0F] sm:text-[52px]">
            Privacy <span className="font-['Instrument_Serif'] font-normal italic text-[#7B3FE4]">policy</span>.
          </h1>
          <p className="mt-5 text-[16px] leading-[1.6] text-[#6B6B7A]">
            Last updated {UPDATED}. This explains what personal information I collect through
            streamline-automations.co.za, why, and your rights under the Protection of Personal
            Information Act (POPIA).
          </p>

          <Section title="Who I am">
            <p>
              Streamline Automations is a sole proprietorship run by Christiaan Steffen, based in
              the Vaal Triangle, Gauteng, South Africa. I am the Information Officer responsible for
              the personal information collected through this site. You can reach me at{' '}
              <a className="font-medium text-[#7B3FE4] hover:underline" href="mailto:christiaan@streamline-automations.co.za">
                christiaan@streamline-automations.co.za
              </a>{' '}
              or on WhatsApp at +27&nbsp;68&nbsp;757&nbsp;9940.
            </p>
          </Section>

          <Section title="What I collect">
            <p>
              <strong className="text-[#0A0A0F]">Information you give me.</strong> When you submit
              the contact form I collect your name, email address, phone number, and optionally your
              company name, the service you're interested in, your message, and any file you choose
              to attach.
            </p>
            <p>
              <strong className="text-[#0A0A0F]">Information collected automatically.</strong> With
              your consent, I use analytics tools that collect standard usage data such as pages
              viewed, approximate location, device and browser type, and how you arrived at the site.
              These tools are Google Analytics, PostHog, and Apollo. If you decline cookies, these
              are not loaded.
            </p>
          </Section>

          <Section title="How I use it">
            <p>
              I use your contact details to respond to your enquiry, scope your project, and follow
              up about working together. I use analytics data to understand how the site is used and
              to improve it. I do not sell your personal information.
            </p>
          </Section>

          <Section title="Where it goes">
            <p>
              Contact-form submissions are delivered to me through an automation workflow (n8n) so I
              receive your enquiry by email and message. Analytics data is processed by the
              third-party providers named above, who act as operators on my behalf. These providers
              may process data outside South Africa; I only use reputable providers with their own
              data-protection commitments.
            </p>
          </Section>

          <Section title="Cookies & consent">
            <p>
              The site uses cookies only for analytics, and only after you accept them on the cookie
              banner. Analytics stays switched off until you consent, and you can decline at any time.
              To change your choice, clear this site's data in your browser and reload, then choose
              again.
            </p>
          </Section>

          <Section title="How long I keep it">
            <p>
              I keep enquiry details for as long as needed to deal with your request and for a
              reasonable period afterwards in case you get back in touch, then delete them. Analytics
              data is retained according to each provider's standard retention settings.
            </p>
          </Section>

          <Section title="Your rights under POPIA">
            <p>
              You have the right to ask what personal information I hold about you, to have it
              corrected or deleted, to object to its processing, and to withdraw consent. To exercise
              any of these, email me at{' '}
              <a className="font-medium text-[#7B3FE4] hover:underline" href="mailto:christiaan@streamline-automations.co.za">
                christiaan@streamline-automations.co.za
              </a>
              . You also have the right to lodge a complaint with the Information Regulator of South
              Africa.
            </p>
          </Section>

          <Section title="Security">
            <p>
              The site is served over HTTPS and I take reasonable steps to protect the information I
              collect. No method of transmission over the internet is completely secure, but I work
              to keep your data safe and limit who can access it.
            </p>
          </Section>

          <Section title="Changes">
            <p>
              I may update this policy from time to time. The date at the top shows when it last
              changed. Material changes will be reflected here.
            </p>
          </Section>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
