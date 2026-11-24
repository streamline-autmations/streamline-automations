import { PROJECT_FLOORS, RENT_TO_OWN, TURNAROUND } from './site';

// Service-page FAQs. Rendered visibly on the page AND emitted as FAQPage JSON-LD
// (SiteSEO), so the two can never drift. Answers come from Christiaan (2026-11-23)
// or from facts already on the site — no invented claims.

const [WEBSITE_FLOOR, LEADS_FLOOR] = PROJECT_FLOORS.map((p) => p.floor.replace(/^From/, 'from'));
const RTO_FLOOR = RENT_TO_OWN.floor.replace(/^From/, 'from');

export type FAQItem = { question: string; answer: string };

export const WEBSITES_FAQ: FAQItem[] = [
  {
    question: 'How much does a website cost?',
    answer: `Websites start ${WEBSITE_FLOOR}. If you'd rather not pay upfront, rent-to-own starts ${RTO_FLOOR} and the site is yours outright after 18 months. Every build is quoted on a free call before any work starts.`,
  },
  {
    question: 'How long does a website take?',
    answer: `Most sites go live in ${TURNAROUND} once I have your content. Bigger builds with bookings or an online shop take longer — you get a clear timeline before I start.`,
  },
  {
    question: 'Do you write the copy?',
    answer:
      'Yes. During onboarding I gather everything I need — your brand, how you speak to your customers, your services — and then write the copy in your voice.',
  },
  {
    question: 'What do I need to give you?',
    answer:
      "The onboarding basics: your logo, photos of your work or products, your services (and prices, if you want them on the site) and your contact details. I'll walk you through it so nothing gets missed.",
  },
  {
    question: 'Do I own my website?',
    answer:
      'Yes, if you pay for it upfront. On rent-to-own you pay monthly and ownership transfers to you after 18 months — full files, no strings.',
  },
  {
    question: 'Can I update the site myself?',
    answer:
      'Where it makes sense, yes — I make it owner-editable. Anything bigger is covered by a maintenance plan.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'For two weeks after launch I check the site and fix any issues that come up. After that, changes are quoted per job or covered by a maintenance plan.',
  },
  {
    question: 'Will my site show up on Google?',
    answer:
      "Every site ships fast, mobile-first and with the SEO basics done — page titles, descriptions, a sitemap and clean structure. Nobody honest can guarantee rankings, but you start on solid ground.",
  },
  {
    question: 'Do you only work with businesses in the Vaal Triangle?',
    answer:
      "No. I'm based in the Vaal Triangle in Gauteng and work with businesses across South Africa. The whole process runs over WhatsApp, email and calls.",
  },
];

export const SYSTEMS_FAQ: FAQItem[] = [
  {
    question: 'What can you automate?',
    answer:
      'The repetitive admin: enquiries into a CRM, WhatsApp and email notifications, quotes, invoices, order updates, bookings and dashboards.',
  },
  {
    question: 'How much does automation cost?',
    answer: `A website with automation built in (bookings, smart forms, WhatsApp notifications and a simple CRM) starts ${LEADS_FLOOR}. Bigger systems are scoped and quoted on a free call before any work starts.`,
  },
  {
    question: 'Are there running costs?',
    answer:
      "It depends on the plan and the services you choose — some tools and WhatsApp messaging carry their own fees. I always keep running costs as low as possible, and I'll tell you what to expect on the call.",
  },
  {
    question: 'How long does it take?',
    answer: 'Usually 5 to 14 days, depending on how many steps the process has.',
  },
  {
    question: 'Which tools do you use?',
    answer:
      'n8n, Supabase, the WhatsApp API, Voiceflow, PayFast and ShipLogic — picked for what the job actually needs.',
  },
  {
    question: 'Do I need a new WhatsApp number?',
    answer:
      "No, not to work with me. Automated WhatsApp updates — order confirmations, status updates, reminders — are a service I set up when you want them, and I'll explain what your number needs on the call.",
  },
  {
    question: 'Do I need a new website for this?',
    answer:
      "Not necessarily. I can connect automation to the site you already have, but I prefer building the site and the system together — it's one setup to manage and easier to keep running.",
  },
  {
    question: 'What happens if something breaks?',
    answer:
      "For two weeks after launch I check everything and fix any issues that come up. After that, fixes and changes are quoted per job or covered by a monthly retainer — a retainer is always available. It's how BLOM, RecklessBear and CW Electronics run.",
  },
];
