import { useLocation } from 'react-router-dom';
import SEO from '../../components/seo/SEO';
import { service, breadcrumb, creativeWork, faqPage } from '../../lib/structured-data';
import { FAQ_ITEMS } from '../data/faq';

/**
 * Centralised per-route head for the v2 site. Mounted once inside the Router; reads
 * the pathname and feeds the imperative <SEO> head manager. Keeps all titles,
 * descriptions and JSON-LD for every route in one place instead of in 11 page files.
 */

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
  title: `${name} — Case Study`,
  description,
  type: 'article',
  jsonLd: [
    creativeWork({ name: `${name} — Case Study`, description, path, image }),
    crumb(['Home', '/'], ['Portfolio', '/portfolio'], [name, path]),
  ],
});

const ROUTES: Record<string, Meta> = {
  '/': {
    title: 'Web Design & Automation in the Vaal Triangle, Gauteng',
    description:
      'Custom websites and automation systems for South African businesses. Built by Christiaan Steffen in the Vaal Triangle. No upfront cost — rent monthly, own after 18 months.',
  },
  '/websites': {
    title: 'Web Design & Website Creation, South Africa',
    description:
      'Custom websites for South African businesses — fast, mobile-first, and built to convert. No templates, no drag-and-drop. Web design in the Vaal Triangle and across Gauteng.',
    jsonLd: [
      service({
        name: 'Web Design & Website Creation',
        serviceType: 'Web design and development',
        description:
          'Custom, hand-built websites for South African businesses — fast, mobile-first and built to convert. No templates or page builders.',
        path: '/websites',
      }),
      crumb(['Home', '/'], ['Web Design', '/websites']),
    ],
  },
  '/systems': {
    title: 'Systems & Business Automation',
    description:
      "CRMs, WhatsApp bots, admin dashboards and n8n workflows — I automate the work that's eating your time. Business automation for South African companies in Gauteng.",
    jsonLd: [
      service({
        name: 'Systems & Business Automation',
        serviceType: 'Business process automation',
        description:
          'Custom CRMs, WhatsApp automation, admin dashboards, booking systems and n8n workflows that run the busywork for South African businesses.',
        path: '/systems',
      }),
      crumb(['Home', '/'], ['Systems', '/systems']),
    ],
  },
  '/hosting': {
    title: 'Website Hosting, Email & Maintenance',
    description:
      'South African web hosting with real support — domain, SSL, professional email and monthly maintenance. No upfront cost: rent monthly, own your site after 18 months.',
    jsonLd: [
      service({
        name: 'Website Hosting, Email & Maintenance',
        serviceType: 'Web hosting and maintenance',
        description:
          'Managed web hosting, domain, SSL, professional email and monthly maintenance for South African businesses — on a no-upfront-cost monthly plan.',
        path: '/hosting',
      }),
      crumb(['Home', '/'], ['Hosting', '/hosting']),
    ],
  },
  '/portfolio': {
    title: 'Portfolio — Client Work & Case Studies',
    description:
      'Real client work. Custom websites, automation systems, and e-commerce builds for South African businesses — BLOM Cosmetics, RecklessBear, CW Electronics and more.',
    jsonLd: [crumb(['Home', '/'], ['Portfolio', '/portfolio'])],
  },
  '/about': {
    title: 'About — Christiaan Steffen, Founder',
    description:
      'Christiaan Steffen — solo founder building custom websites and automation systems for South African businesses from the Vaal Triangle, Gauteng.',
    jsonLd: [crumb(['Home', '/'], ['About', '/about'])],
  },
  '/contact': {
    title: 'Contact — Book a Free Call',
    description:
      'Book a free call or send a message. No pitch deck, just a plan. Web design and automation for South African businesses, based in the Vaal Triangle.',
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
    'A full e-commerce store, custom admin dashboard, BLOM Academy course platform, and email + WhatsApp automation — unified on one Supabase backend. PayFast live.',
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
    'A full e-commerce store and custom owner-editable admin for a Johannesburg electronics importer — 700+ products live in under two weeks, retail + wholesale pricing, PayFast live.',
    '/assets/clients/cw-electronics/hero.webp',
  ),
  '/work/ameli': caseStudy(
    'Ameli Designs',
    '/work/ameli',
    'A fast, mobile-first portfolio site for a graphic designer, with automated email lead capture wired through n8n. Built and handed over in 4 days.',
    '/assets/clients/ameli/hero.webp',
  ),
};

export default function SiteSEO() {
  const { pathname } = useLocation();
  const meta = ROUTES[pathname];

  // Unknown route (incl. /lab and 404) — keep it out of the index.
  if (!meta) {
    return <SEO title="Page not found (404)" url={pathname} noindex />;
  }

  return (
    <SEO
      title={meta.title}
      description={meta.description}
      url={pathname}
      type={meta.type}
      noindex={meta.noindex}
      jsonLd={meta.jsonLd}
    />
  );
}
