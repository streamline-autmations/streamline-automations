import { motion } from 'framer-motion';
import SEO from '../components/seo/SEO';
import { breadcrumb, faqPage } from '../lib/structured-data';
import SiteHeader from '../components/white/SiteHeader';
import SiteFooter from '../components/white/SiteFooter';
import ContactFormWhite from '../components/white/contact/ContactFormWhite';
import WordReveal from '../components/white/ui/WordReveal';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Real Q&As — kept in sync with the visible FAQ section below and the FAQPage schema.
const FAQ_ITEMS = [
  {
    question: 'How much does a website cost?',
    answer:
      "There's no upfront cost. I build the site for free and you pay monthly — from R699/mo on the Starter plan up to R1,799/mo on Pro. Minimum three months, one month's notice to cancel. Pricing lives on the hosting page.",
  },
  {
    question: 'Do I actually own my website?',
    answer:
      'Yes. After 18 months of paying monthly, the site is yours outright — full files, no strings. Before 18 months, cancelling means access is revoked and the files do not transfer.',
  },
  {
    question: 'How long does a build take?',
    answer:
      'It depends on scope. A clean portfolio or service site can be handed over in about 4 days; a full e-commerce store with automation takes a couple of weeks. I give you a clear timeline before we start.',
  },
  {
    question: 'Do you only work with businesses in the Vaal Triangle?',
    answer:
      "No. I'm based in the Vaal Triangle in Gauteng and work with businesses right across South Africa — Vereeniging, Vanderbijlpark, Johannesburg, Pretoria and beyond. The whole process runs remotely over WhatsApp, email and call.",
  },
  {
    question: 'Can you automate my admin and WhatsApp?',
    answer:
      'Yes — that\'s half of what I do. Custom CRMs, WhatsApp order and lead automation, admin dashboards, booking systems and n8n workflows that handle the repetitive work so you don\'t have to.',
  },
  {
    question: "What's included in hosting?",
    answer:
      'Hosting covers your domain, SSL certificate, professional email and monthly maintenance updates — all wrapped into the monthly plan, with real support when you need it.',
  },
];

export default function ContactWhite() {
  return (
    <>
      <SiteHeader />
      <SEO
        title="Contact — Book a Free Call"
        description="Book a free 30-minute call or send a message. No pitch deck, just a plan. Web design and automation for South African businesses, based in the Vaal Triangle."
        url="/contact"
        jsonLd={[
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
          faqPage(FAQ_ITEMS),
        ]}
      />
      <main className="bg-white min-h-[100svh] font-['DM_Sans']">

        {/* Hero */}
        <section className="pt-36 md:pt-44 pb-16 md:pb-20 relative overflow-hidden">
          <div aria-hidden="true" className="gradient-mesh opacity-70" />
          {/* Ambient gradient — top centre */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[65%] pointer-events-none"
            style={{
              background:
                'radial-gradient(900px 500px at 50% 0%, rgba(123,63,228,0.08), transparent 70%)',
            }}
          />
          {/* Ambient gradient — top right accent */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
            style={{
              background:
                'radial-gradient(500px 500px at 100% 0%, rgba(123,63,228,0.07), transparent 70%)',
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4] mb-5"
            >
              Get in touch
            </motion.span>
            <WordReveal
              as="h1"
              trigger="mount"
              segments={[{ text: "Let's" }, { text: 'talk.', serif: true }]}
              className="text-[40px] sm:text-[54px] md:text-[68px] font-['DM_Sans'] font-semibold
                         text-[#0A0A0F] tracking-[-0.03em] leading-[1.07] max-w-3xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.14 }}
              className="mt-6 text-[17px] md:text-[19px] font-['DM_Sans'] text-[#3D3D47] leading-[1.6] max-w-xl"
            >
              Free 30-minute call to scope what you need. No pitch deck. No fluff. Just a
              direct conversation about your project.
            </motion.p>
          </div>
        </section>

        {/* Two-column layout */}
        <section className="pb-24 md:pb-32">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">

              {/* Left — form (3 cols) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: EASE, delay: 0.18 }}
                className="md:col-span-3"
              >
                <ContactFormWhite />
              </motion.div>

              {/* Right — direct contact options (2 cols) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: EASE, delay: 0.28 }}
                className="md:col-span-2 space-y-4 md:pt-2"
              >
                {/* WhatsApp */}
                <a
                  href="https://wa.me/27687579940"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="view"
                  className="group flex items-start gap-4 bg-white border border-[#E8E8EC]
                             hover:border-[#D4D4DA] hover:shadow-[0_8px_32px_rgba(123,63,228,0.08)]
                             hover:-translate-y-0.5 rounded-2xl p-6
                             transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-[#25D366]/10 rounded-xl flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.535 5.862L.057 23.428a.5.5 0 00.609.61l5.675-1.49A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.898 0-3.671-.526-5.178-1.438l-.37-.22-3.833 1.006 1.03-3.72-.241-.383A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-['DM_Sans'] font-semibold uppercase tracking-[0.1em] text-[#9E9EA8] mb-1">
                      WhatsApp
                    </p>
                    <p className="text-[15px] font-['DM_Sans'] font-semibold text-[#0A0A0F] group-hover:text-[#7B3FE4] transition-colors">
                      +27 68 757 9940
                    </p>
                    <p className="text-[13px] font-['DM_Sans'] text-[#9E9EA8] mt-1">
                      Fastest way to reach me
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:christiaan@streamline-automations.co.za"
                  data-cursor="view"
                  className="group flex items-start gap-4 bg-white border border-[#E8E8EC]
                             hover:border-[#D4D4DA] hover:shadow-[0_8px_32px_rgba(123,63,228,0.08)]
                             hover:-translate-y-0.5 rounded-2xl p-6
                             transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-[#F0EBFF] rounded-xl flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#7B3FE4" strokeWidth={1.75} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-['DM_Sans'] font-semibold uppercase tracking-[0.1em] text-[#9E9EA8] mb-1">
                      Email
                    </p>
                    <p className="text-[14px] font-['DM_Sans'] font-semibold text-[#0A0A0F] group-hover:text-[#7B3FE4] transition-colors break-all">
                      christiaan@streamline-automations.co.za
                    </p>
                  </div>
                </a>

                {/* Response time */}
                <div className="bg-[#FAFAFA] border border-[#E8E8EC] rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#7B3FE4] animate-pulse" />
                    <p className="text-[12px] font-['DM_Sans'] font-semibold uppercase tracking-[0.1em] text-[#7B3FE4]">
                      Response time
                    </p>
                  </div>
                  <p className="text-[15px] font-['DM_Sans'] font-semibold text-[#0A0A0F]">
                    Within 24 hours
                  </p>
                  <p className="text-[13px] font-['DM_Sans'] text-[#9E9EA8] mt-1">
                    Usually same day. Based in Vaal Triangle, SA.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ — visible content paired with the FAQPage schema above */}
        <section className="border-t border-[#E8E8EC] bg-[#FAFAFA] py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6">
            <span className="block font-['JetBrains_Mono'] text-[11px] font-medium uppercase tracking-[0.16em] text-[#7B3FE4]">
              FAQ
            </span>
            <h2 className="mt-4 font-['DM_Sans'] text-[30px] font-semibold tracking-[-0.02em] text-[#0A0A0F] sm:text-[38px]">
              Questions, <span className="font-['Instrument_Serif'] font-normal italic text-[#7B3FE4]">answered</span>.
            </h2>

            <div className="mt-10 divide-y divide-[#E8E8EC] border-t border-[#E8E8EC]">
              {FAQ_ITEMS.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-['DM_Sans'] text-[17px] font-semibold text-[#0A0A0F] outline-none transition-colors duration-200 hover:text-[#7B3FE4] focus-visible:text-[#7B3FE4]">
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="ml-2 flex-shrink-0 text-[22px] font-normal leading-none text-[#7B3FE4] transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl font-['DM_Sans'] text-[15.5px] leading-[1.65] text-[#3D3D47]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
