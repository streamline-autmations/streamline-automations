import { useLocation } from 'react-router-dom';
import SEO from '../../components/seo/SEO';
import {
  service,
  breadcrumb,
  creativeWork,
  faqPage,
  aboutPage,
  contactPage,
  collectionPage,
} from '../../lib/structured-data';
import { FAQ_ITEMS } from '../data/faq';
import { RD_FAQ } from '../data/restaurant-direct';

type Meta = {
  title?: string;
  description?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  /** Social share image (1200×630). Defaults to the site card. */
  image?: string;
  jsonLd?: Array<Record<string, unknown>>;
};

const CASE_STUDIES: Array<{ name: string; path: string }> = [
  { name: 'BLOM Cosmetics', path: '/work/blom' },
  { name: 'RecklessBear', path: '/work/recklessbear' },
  { name: 'CW Electronics', path: '/work/cw-electronics' },
  { name: 'Ameli Designs', path: '/work/ameli' },
  { name: 'JJ Glassworks', path: '/work/jj-glass' },
];

const crumb = (...items: Array<[string, string]>) =>
  breadcrumb(items.map(([name, path]) => ({ name, path })));

const caseStudy = (
  name: string,
  title: string,
  path: string,
  description: string,
  image: string,
): Meta => ({
  title,
  description,
  type: 'article',
  image: `/og/work-${path.split('/').pop()}.jpg`,
  jsonLd: [
    creativeWork({ name: `${name} - Case Study`, description, path, image }),
    crumb(['Home', '/'], ['Work', '/portfolio'], [name, path]),
  ],
});

const ROUTES: Record<string, Meta> = {
  '/': {
    title: 'Web Design Vaal Triangle & Gauteng',
    description:
      'Professional websites, booking flows, dashboards and automations for South African small businesses. Built by Christiaan Steffen in the Vaal Triangle, Gauteng.',
  },
  '/websites': {
    title: 'Websites for SA Small Businesses',
    description:
      'Clean professional websites that turn visitors into enquiries. Built for salons, spas, gyms, contractors, shops and service businesses in South Africa.',
    jsonLd: [
      service({
        name: 'Web Design & Website Creation',
        serviceType: 'Web design and development',
        description:
          'Clean professional websites that turn visitors into enquiries for South African small businesses.',
        path: '/websites',
      }),
      crumb(['Home', '/'], ['Websites', '/websites']),
    ],
  },
  '/systems': {
    title: 'Business Systems & Automation',
    description:
      'Booking flows, smart forms, dashboards, simple CRM capture and WhatsApp/email notifications for South African small businesses.',
    jsonLd: [
      service({
        name: 'Systems & Business Automation',
        serviceType: 'Business process automation',
        description:
          'Booking flows, smart forms, dashboards, CRM capture and WhatsApp/email notifications for South African small businesses.',
        path: '/systems',
      }),
      crumb(['Home', '/'], ['Systems', '/systems']),
    ],
  },
  '/hosting': {
    title: 'Packages & Pricing',
    description:
      'Website, lead-capture and business system pricing for South African small businesses — floor prices, rent-to-own from R699/month and maintenance retainers.',
    jsonLd: [
      service({
        name: 'Website Design, Rent-to-Own & Maintenance',
        serviceType: 'Website design, business systems and maintenance',
        description:
          'Package-style pricing for professional websites, booking flows, dashboards, automation and maintenance retainers for South African small businesses.',
        path: '/hosting',
      }),
      crumb(['Home', '/'], ['Pricing', '/hosting']),
    ],
  },
  '/portfolio': {
    title: 'Work - Real Websites & Systems',
    description:
      'Real Streamline Automations builds: BLOM Cosmetics, RecklessBear, CW Electronics, Ameli Designs and more websites, dashboards and automation systems.',
    jsonLd: [
      collectionPage(
        {
          name: 'Work - Real Websites & Systems',
          path: '/portfolio',
          description: 'Case studies of websites, dashboards and automation systems built by Streamline Automations.',
        },
        CASE_STUDIES,
      ),
      crumb(['Home', '/'], ['Work', '/portfolio']),
    ],
  },
  '/about': {
    title: 'About Christiaan Steffen',
    description:
      'Christiaan Steffen is the solo founder behind Streamline Automations, building websites and business systems for South African businesses from the Vaal Triangle, Gauteng.',
    jsonLd: [
      aboutPage({
        name: 'About Christiaan Steffen',
        path: '/about',
        description: 'Christiaan Steffen, solo founder of Streamline Automations in the Vaal Triangle, Gauteng.',
      }),
      crumb(['Home', '/'], ['About', '/about']),
    ],
  },
  '/contact': {
    title: 'Book a Free Call',
    description:
      'Book a free call with Christiaan about a website, booking flow, dashboard, automation or maintenance plan for your South African small business.',
    jsonLd: [
      contactPage({
        name: 'Book a Free Call',
        path: '/contact',
        description: 'Contact Streamline Automations about a website, booking flow, dashboard or automation.',
      }),
      crumb(['Home', '/'], ['Contact', '/contact']),
      faqPage(FAQ_ITEMS),
    ],
  },
  '/restaurant-direct': {
    title: 'Restaurant Websites & Direct Ordering',
    description:
      'A managed mobile-first website, direct table bookings and collection ordering with a simple staff dashboard, for independent South African restaurants.',
    jsonLd: [
      service({
        name: 'Restaurant Direct',
        serviceType: 'Restaurant website, direct booking and collection ordering',
        description:
          'A managed mobile-first restaurant website with direct table bookings, collection ordering and a protected staff dashboard.',
        path: '/restaurant-direct',
      }),
      crumb(['Home', '/'], ['Restaurant Direct', '/restaurant-direct']),
      faqPage([...RD_FAQ]),
    ],
  },
  '/restaurant-direct/watch': {
    title: 'Restaurant Direct at Jimmy’s - 36s video',
    description:
      'See Restaurant Direct in 36 seconds: menu, collection orders and table bookings for independent restaurants, managed from one dashboard.',
    noindex: true,
  },
  '/privacy': {
    title: 'Privacy Policy',
    description:
      "How Streamline Automations collects, uses and protects your personal information — what I collect, why, and your rights under South Africa's POPIA.",
    jsonLd: [crumb(['Home', '/'], ['Privacy Policy', '/privacy'])],
  },
  '/work/blom': caseStudy(
    'BLOM Cosmetics',
    'BLOM Cosmetics: E-commerce Case Study',
    '/work/blom',
    'A full e-commerce store, custom admin dashboard, BLOM Academy course platform, and email + WhatsApp automation unified on one Supabase backend. PayFast live.',
    '/assets/clients/blom/hero.webp',
  ),
  '/work/recklessbear': caseStudy(
    'RecklessBear',
    'RecklessBear: Apparel Website & CRM',
    '/work/recklessbear',
    'A custom apparel site, admin + CRM, 12-stage production tracking, WhatsApp order automation and an AI quote engine that qualifies every lead.',
    '/assets/clients/recklessbear/hero.webp',
  ),
  '/work/cw-electronics': caseStudy(
    'CW Electronics',
    'CW Electronics: E-commerce Case Study',
    '/work/cw-electronics',
    'A full e-commerce store and custom owner-editable admin for a Johannesburg electronics importer. Retail + wholesale pricing and PayFast live.',
    '/assets/clients/cw-electronics/hero.webp',
  ),
  '/work/ameli': caseStudy(
    'Ameli Designs',
    'Ameli Designs: Portfolio Website',
    '/work/ameli',
    'A fast, mobile-first portfolio website for a graphic designer, with automated email lead capture wired through n8n. Built in four days.',
    '/assets/clients/ameli/hero.webp',
  ),
  '/work/jj-glass': caseStudy(
    'JJ Glassworks',
    'JJ Glassworks: Service Website',
    '/work/jj-glass',
    'A service site for a Gauteng glass and aluminium specialist — quote requests, WhatsApp CTA and automated email lead notifications.',
    '/assets/clients/jj-glass/hero.webp',
  ),
};

export default function SiteSEO() {
  const { pathname } = useLocation();
  const normalisedPathname =
    pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const meta = ROUTES[normalisedPathname];

  if (!meta) {
    return <SEO title="Page not found (404)" url={pathname} noindex canonical={false} />;
  }

  return (
    <SEO
      title={meta.title}
      description={meta.description}
      url={normalisedPathname}
      type={meta.type}
      image={meta.image}
      noindex={meta.noindex}
      jsonLd={meta.jsonLd}
    />
  );
}
