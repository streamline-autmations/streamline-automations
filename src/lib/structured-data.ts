/**
 * schema.org JSON-LD builders for Streamline Automations.
 *
 * NAP (name / area / phone) here is the single source of truth and MUST match the
 * footer, the contact page, and the Google Business Profile character-for-character.
 */

const SITE_URL = 'https://streamline-automations.co.za';
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const PERSON_ID = `${SITE_URL}/#christiaan`;

// Towns are City; the Vaal Triangle and Gauteng are regions; South Africa is a Country.
// Keep in step with the static @graph in index.html.
const AREA_SERVED = [
  ...['Vereeniging', 'Vanderbijlpark', 'Three Rivers', 'Meyerton', 'Sasolburg'].map((name) => ({
    '@type': 'City',
    name,
  })),
  { '@type': 'AdministrativeArea', name: 'Vaal Triangle' },
  { '@type': 'AdministrativeArea', name: 'Gauteng' },
  { '@type': 'Country', name: 'South Africa' },
];

// The ProfessionalService (#organization), Person (#christiaan) and WebSite
// (#website) nodes live statically in index.html's @graph — the single source.
// Per-route nodes below reference them by @id.

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

/** WebPage subtypes tied to the site graph (AboutPage, ContactPage, CollectionPage). */
const webPage = (type: string, opts: { name: string; path: string; description: string }, extra = {}) => ({
  '@context': 'https://schema.org',
  '@type': type,
  '@id': `${SITE_URL}${opts.path}#webpage`,
  name: opts.name,
  description: opts.description,
  url: `${SITE_URL}${opts.path}`,
  isPartOf: { '@id': WEBSITE_ID },
  inLanguage: 'en-ZA',
  ...extra,
});

export const aboutPage = (opts: { name: string; path: string; description: string }) =>
  webPage('AboutPage', opts, { mainEntity: { '@id': PERSON_ID }, about: { '@id': ORG_ID } });

export const contactPage = (opts: { name: string; path: string; description: string }) =>
  webPage('ContactPage', opts, { about: { '@id': ORG_ID } });

/** CollectionPage listing case studies in order. items: [{name, path}] */
export const collectionPage = (
  opts: { name: string; path: string; description: string },
  items: Array<{ name: string; path: string }>,
) =>
  webPage('CollectionPage', opts, {
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        url: `${SITE_URL}${item.path}`,
      })),
    },
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
