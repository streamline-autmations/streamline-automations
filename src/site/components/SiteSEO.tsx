import { useLocation } from 'react-router-dom';
import SEO from '../../components/seo/SEO';
import { service, breadcrumb, creativeWork, faqPage } from '../../lib/structured-data';
import { FAQ_ITEMS } from '../data/faq';

type Meta = {
  title?: string;
  description?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  jsonLd?: Array<Record<string, unknown>>;
};

const crumb = (...items: Array<[string, string]>) =>
  breadcrumb(items.map(([name, path]) => ({ name, path })));

const caseStudy = (name: string, path: string, description: string, image: string): Meta => ({
  title: `${name} - Case Study`,
  description,
  type: 'article',
  jsonLd: [
    creativeWork({ name: `${name} - Case Study`, description, path, image }),
    crumb(['Home', '/'], ['Work', '/portfolio'], [name, path]),
  ],
});

const ROUTES: Record<string, Meta> = {
  '/': {
    title: 'Websites & Business Systems in Gauteng',
    description:
      'Professional websites, booking flows, dashboards and automations for South African small businesses. Built by Christiaan Steffen in the Vaal Triangle, Gauteng.',
  },
  '/websites': {
    title: 'Web Design for South African Small Businesses',
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
      'Website and business system packages for South African small businesses. Online Presence, Client Magnet, Business Accelerator and maintenance retainers.',
    jsonLd: [
      service({
        name: 'Packages & Pricing',
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
    jsonLd: [crumb(['Home', '/'], ['Work', '/portfolio'])],
  },
  '/about': {
    title: 'About Christiaan Steffen',
    description:
      'Christiaan Steffen is the solo founder behind Streamline Automations, building websites and business systems for South African businesses from the Vaal Triangle, Gauteng.',
    jsonLd: [crumb(['Home', '/'], ['About', '/about'])],
  },
  '/contact': {
    title: 'Book a Free Call',
    description:
      'Book a free call with Christiaan about a website, booking flow, dashboard, automation or maintenance plan for your South African small business.',
    jsonLd: [crumb(['Home', '/'], ['Contact', '/contact']), faqPage(FAQ_ITEMS)],
  },
  '/privacy': {
    title: 'Privacy Policy',
    description:
      "How Streamline Automations collects, uses and protects your personal information, in line with South Africa's POPIA.",
    jsonLd: [crumb(['Home', '/'], ['Privacy Policy', '/privacy'])],
  },
  '/work/blom': caseStudy(
    'BLOM Cosmetics',
    '/work/blom',
    'A full e-commerce store, custom admin dashboard, BLOM Academy course platform, and email + WhatsApp automation unified on one Supabase backend. PayFast live.',
    '/assets/clients/blom/hero.webp',
  ),
  '/work/recklessbear': caseStudy(
    'RecklessBear',
    '/work/recklessbear',
    'A bold custom apparel site, a custom admin + CRM, a 12-stage production tracking pipeline, WhatsApp order automation, and an AI quote engine that qualifies every lead. Active retainer.',
    '/assets/clients/recklessbear/hero.webp',
  ),
  '/work/cw-electronics': caseStudy(
    'CW Electronics',
    '/work/cw-electronics',
    'A full e-commerce store and custom owner-editable admin for a Johannesburg electronics importer. Retail + wholesale pricing and PayFast live.',
    '/assets/clients/cw-electronics/hero.webp',
  ),
  '/work/ameli': caseStudy(
    'Ameli Designs',
    '/work/ameli',
    'A fast, mobile-first portfolio site for a graphic designer, with automated email lead capture wired through n8n.',
    '/assets/clients/ameli/hero.webp',
  ),
};

export default function SiteSEO() {
  const { pathname } = useLocation();
  const normalisedPathname =
    pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const meta = ROUTES[normalisedPathname];

  if (!meta) {
    return <SEO title="Page not found (404)" url={pathname} noindex />;
  }

  return (
    <SEO
      title={meta.title}
      description={meta.description}
      url={normalisedPathname}
      type={meta.type}
      noindex={meta.noindex}
      jsonLd={meta.jsonLd}
    />
  );
}
