/**
 * schema.org JSON-LD builders for Streamline Automations.
 *
 * NAP (name / area / phone) here is the single source of truth and MUST match the
 * footer, the contact page, and the Google Business Profile character-for-character.
 */

const SITE_URL = 'https://streamline-automations.co.za';
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const TELEPHONE = '+27687579940';
const EMAIL = 'christiaan@streamline-automations.co.za';
const LOGO = `${SITE_URL}/assets/logos/streamline-mark.webp`;

const SAME_AS = [
  'https://www.instagram.com/streamline_automations/',
  'https://www.facebook.com/people/Streamline-Automations/61587739632609/',
  'https://www.linkedin.com/in/christiaan-steffen-703805177/',
  'https://www.tiktok.com/@streamline_automations',
  'https://www.youtube.com/@streamline_automations',
];

const AREA_SERVED = [
  'Vereeniging',
  'Vanderbijlpark',
  'Three Rivers',
  'Meyerton',
  'Sasolburg',
  'Vaal Triangle',
  'Gauteng',
  'South Africa',
].map((name) => ({ '@type': 'City', name }));

/** Site-wide LocalBusiness / ProfessionalService. Rendered statically in index.html too. */
export const localBusiness = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: 'Streamline Automations',
  alternateName: 'Streamline Automations — Web Design & Automation',
  description:
    'Web design and business automation for South African companies. Custom websites that convert, WhatsApp automation, admin systems and hosting — built in the Vaal Triangle, Gauteng.',
  url: SITE_URL,
  logo: LOGO,
  image: LOGO,
  telephone: TELEPHONE,
  email: EMAIL,
  founder: { '@type': 'Person', name: 'Christiaan Steffen' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Vaal Triangle',
    addressRegion: 'Gauteng',
    addressCountry: 'ZA',
  },
  areaServed: AREA_SERVED,
  priceRange: 'R699–R1,799 / month',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '13:00',
    },
  ],
  sameAs: SAME_AS,
});

/** Organization node (logo + sameAs) — enables knowledge-panel + logo in results. */
export const organization = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Streamline Automations',
  url: SITE_URL,
  logo: LOGO,
  email: EMAIL,
  telephone: TELEPHONE,
  founder: { '@type': 'Person', name: 'Christiaan Steffen' },
  sameAs: SAME_AS,
});

/** WebSite node — enables sitelinks search box and ties pages to the brand. */
export const website = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_URL,
  name: 'Streamline Automations',
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-ZA',
});

/** Service offering — one per pillar (Web Design, Systems & Automation, Hosting). */
export const service = (opts: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: opts.name,
  serviceType: opts.serviceType,
  description: opts.description,
  url: `${SITE_URL}${opts.path}`,
  provider: { '@id': ORG_ID },
  areaServed: AREA_SERVED,
  inLanguage: 'en-ZA',
});

/** BreadcrumbList for inner pages and case studies. items: [{name, path}] */
export const breadcrumb = (
  items: Array<{ name: string; path: string }>,
): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

/** CreativeWork for a portfolio case study. */
export const creativeWork = (opts: {
  name: string;
  description: string;
  path: string;
  image?: string;
}): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: opts.name,
  description: opts.description,
  url: `${SITE_URL}${opts.path}`,
  ...(opts.image ? { image: `${SITE_URL}${opts.image}` } : {}),
  creator: { '@id': ORG_ID },
  inLanguage: 'en-ZA',
});

/** FAQPage — real Q&As only. */
export const faqPage = (
  items: Array<{ question: string; answer: string }>,
): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
});
