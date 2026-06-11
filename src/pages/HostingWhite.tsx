import { motion } from 'framer-motion';
import SEO from '../components/seo/SEO';
import { service, breadcrumb } from '../lib/structured-data';
import SiteHeader from '../components/white/SiteHeader';
import SiteFooter from '../components/white/SiteFooter';
import Button from '../components/white/ui/Button';
import FinalCTA from '../components/white/home/FinalCTA';
import WordReveal from '../components/white/ui/WordReveal';
import MagneticCTA from '../components/white/ui/MagneticCTA';
import { fadeUp, viewport } from '../lib/motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const INCLUDED = [
  {
    title: 'South African hosting',
    desc: 'Fast local servers. Your site loads quickly for SA visitors — not across an ocean.',
  },
  {
    title: 'SSL certificate',
    desc: "HTTPS on every domain, every site. Managed and renewed automatically — you'll never get the 'not secure' warning.",
  },
  {
    title: 'Domain management',
    desc: 'I handle the renewals. You never have to think about your domain expiring.',
  },
  {
    title: 'Monthly content updates',
    desc: "Send me what needs changing. I'll update it — no tickets, no queues, no waiting.",
  },
  {
    title: 'Uptime monitoring',
    desc: "24/7 monitoring. If your site goes down, I know before you do and fix it immediately.",
  },
  {
    title: 'Backups',
    desc: "Weekly full-site backups. If anything ever goes wrong, you're covered.",
  },
];

interface Tier {
  name: string;
  price: string;
  desc: string;
  updates: string;
  pages: string;
  features: string[];
  cta: string;
  highlight: boolean;
}

const TIERS: Tier[] = [
  {
    name: 'Essential',
    price: 'R499',
    desc: 'For small service businesses that need a clean, fast online presence.',
    updates: '1 update / month',
    pages: 'Up to 5 pages',
    features: [
      'Hosting + SSL + domain',
      '5-page custom site',
      '1 content update/month',
      'Uptime monitoring',
      'Weekly backups',
    ],
    cta: 'Get started',
    highlight: false,
  },
  {
    name: 'Growth',
    price: 'R1,199',
    desc: 'For businesses that want leads coming in — not just a brochure site.',
    updates: '2 updates / month',
    pages: '5–8 pages',
    features: [
      'Everything in Essential',
      '5–8 pages',
      'WhatsApp CTA integration',
      'Basic on-page SEO',
      '2 content updates/month',
      'Google Analytics setup',
    ],
    cta: 'Get started',
    highlight: true,
  },
  {
    name: 'Partner',
    price: 'R2,499',
    desc: 'For businesses that need bookings, e-commerce, or complex functionality.',
    updates: '4 updates / month',
    pages: 'Unlimited pages',
    features: [
      'Everything in Growth',
      'Booking system or e-commerce',
      '4 content updates/month',
      'Priority support (same-day)',
      'Monthly performance report',
      'Advanced SEO setup',
    ],
    cta: 'Get started',
    highlight: false,
  },
];

export default function HostingWhite() {
  return (
    <>
      <SiteHeader />
      <SEO
        title="Website Hosting, Email & Maintenance"
        description="South African web hosting with real support — domain, SSL, professional email and monthly maintenance. No upfront cost: rent monthly, own your site after 18 months."
        url="/hosting"
        jsonLd={[
          service({
            name: 'Website Hosting, Email & Maintenance',
            serviceType: 'Web hosting and maintenance',
            description:
              'Managed web hosting, domain, SSL, professional email and monthly maintenance for South African businesses — on a no-upfront-cost monthly plan.',
            path: '/hosting',
          }),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Hosting', path: '/hosting' },
          ]),
        ]}
      />
      <main className="bg-white min-h-[100svh] font-['DM_Sans']">

        {/* Hero */}
        <section className="pt-36 md:pt-44 pb-20 md:pb-28 relative overflow-hidden">
          <div aria-hidden="true" className="gradient-mesh opacity-70" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[60%] pointer-events-none"
            style={{
              background:
                'radial-gradient(900px 500px at 50% 0%, rgba(123,63,228,0.09), transparent 70%)',
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-5"
            >
              Hosting, email &amp; maintenance
            </motion.span>
            <WordReveal
              as="h1"
              trigger="mount"
              segments={[{ text: 'No upfront cost.' }, { text: 'Pay monthly.', serif: true }]}
              className="text-[40px] sm:text-[54px] md:text-[68px] font-['DM_Sans'] font-semibold
                         text-[#0A0A0F] tracking-[-0.03em] leading-[1.07] max-w-3xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.14 }}
              className="mt-6 text-[17px] md:text-[19px] font-['DM_Sans'] text-[#3D3D47] leading-[1.6] max-w-2xl"
            >
              I build your site for free. You pay a monthly fee that covers hosting,
              maintenance, and updates. After 18 months, the site is yours — outright.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
              className="mt-10"
            >
              <MagneticCTA strength={14}>
                <span data-cursor="view">
                  <Button href="/contact" size="lg">Book a Free Call</Button>
                </span>
              </MagneticCTA>
            </motion.div>
          </div>
        </section>

        {/* What's included */}
        <section className="py-24 md:py-32 bg-[#FAFAFA]">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-12"
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-4">
                What's included
              </span>
              <h2 className="text-[32px] md:text-[44px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em] leading-[1.1]">
                Everything managed. Nothing to worry about.
              </h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8"
            >
              {INCLUDED.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="border-t border-[#E8E8EC] pt-6"
                >
                  <p className="text-[16px] font-['DM_Sans'] font-semibold text-[#0A0A0F] mb-1.5">
                    {item.title}
                  </p>
                  <p className="text-[14.5px] font-['DM_Sans'] text-[#6B6B7A] leading-[1.6]">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing tiers */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-14 text-center"
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-4">
                Monthly plans
              </span>
              <h2 className="text-[32px] md:text-[44px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em] leading-[1.1]">
                Three tiers. One standard.
              </h2>
              <p className="mt-4 text-[16px] font-['DM_Sans'] text-[#6B6B7A] max-w-xl mx-auto leading-[1.6]">
                All plans include a free build upfront. Minimum 3 months. 1 month written notice to cancel.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TIERS.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
                  data-cursor="view"
                  className={`relative rounded-2xl border p-8 flex flex-col cursor-pointer
                    transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    tier.highlight
                      ? 'border-[#7B3FE4] bg-white shadow-[0_8px_40px_rgba(123,63,228,0.14)] hover:shadow-[0_20px_60px_rgba(123,63,228,0.22)] hover:-translate-y-1'
                      : 'border-[#E8E8EC] bg-white hover:border-[#D4D4DA] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1'
                  }`}
                >
                  {tier.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5
                                     text-[10px] font-['DM_Sans'] font-semibold uppercase tracking-[0.1em]
                                     text-white bg-[#7B3FE4] rounded-full px-3 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                      Most popular
                    </span>
                  )}
                  <div className="mb-6">
                    <p className="text-[12px] font-['DM_Sans'] font-semibold uppercase tracking-[0.12em] text-[#9E9EA8] mb-3">
                      {tier.name}
                    </p>
                    <div className="flex items-baseline gap-1.5 mb-3">
                      <span className="text-[40px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.03em]">
                        {tier.price}
                      </span>
                      <span className="text-[14px] font-['DM_Sans'] text-[#9E9EA8]">/mo</span>
                    </div>
                    <p className="text-[13.5px] font-['DM_Sans'] text-[#6B6B7A] leading-[1.55]">
                      {tier.desc}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <svg
                          aria-hidden="true"
                          className="flex-shrink-0 mt-[3px] w-4 h-4 text-[#7B3FE4]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span className="text-[13.5px] font-['DM_Sans'] text-[#3D3D47]">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="/contact"
                    className={`inline-flex items-center justify-center w-full px-6 py-3.5 rounded-full
                                text-[14px] font-['DM_Sans'] font-semibold transition-colors duration-200 min-h-[48px] ${
                      tier.highlight
                        ? 'bg-[#7B3FE4] text-white hover:bg-[#6930D0]'
                        : 'bg-[#F5F5F7] text-[#0A0A0F] hover:bg-[#EEEEEF]'
                    }`}
                  >
                    {tier.cta}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ownership section */}
        <section className="py-24 md:py-32 bg-[#F0EBFF]">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="max-w-2xl"
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-4">
                The ownership model
              </span>
              <WordReveal
                as="h2"
                segments={[{ text: 'You own it after' }, { text: '18 months.', serif: true }]}
                serifClassName="font-['Instrument_Serif'] italic font-normal"
                className="text-[32px] md:text-[44px] font-['DM_Sans'] font-semibold text-[#0A0A0F] tracking-[-0.02em] leading-[1.1]"
              />
              <div className="mt-8 space-y-5">
                {[
                  { label: 'Month 1–3', text: 'Minimum term. Cancel anytime after with 1 calendar month written notice.' },
                  { label: 'Month 3–17', text: 'Cancel with notice and access is revoked. Files stay with me.' },
                  { label: 'Month 18+', text: 'Site is yours. Full code, full files, no strings. I hand everything over.' },
                  { label: 'After ownership', text: 'Optional R399/mo maintenance retainer if you want me to keep managing it.' },
                ].map((row) => (
                  <div key={row.label} className="flex gap-6 border-t border-[#7B3FE4]/15 pt-5">
                    <span className="flex-shrink-0 text-[12px] font-['DM_Sans'] font-semibold text-[#7B3FE4] w-20 pt-0.5">
                      {row.label}
                    </span>
                    <p className="text-[15px] font-['DM_Sans'] text-[#3D3D47] leading-[1.6]">
                      {row.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Fine print */}
        <section className="py-14 bg-[#FAFAFA] border-t border-[#E8E8EC]">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-[13px] font-['DM_Sans'] text-[#9E9EA8] leading-[1.7] max-w-3xl">
              All plans require a minimum 3-month commitment. Cancellation requires 1 calendar month
              written notice. Cancellation before 18 months results in access being revoked with no
              file transfer. After 18 consecutive months of payments, all site files are transferred
              to the client outright. Prices are ZAR and exclude VAT where applicable.
            </p>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <FinalCTA />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
