import { useEffect } from 'react';

/**
 * Dependency-free per-route head manager.
 *
 * react-helmet-async previously wrote nothing to the head in
 * this app (data-rh count was 0 at runtime), so per-route meta never applied. This sets
 * title / meta / canonical / JSON-LD imperatively in an effect — it runs in the real
 * browser, so the post-build prerender captures it into each route's static HTML, and
 * client-side SPA navigation updates it too.
 */

const SITE_NAME = 'Streamline Automations';
const SITE_URL = 'https://streamline-automations.co.za';
const DEFAULT_OG = `${SITE_URL}/og-image.png`;

const DEFAULT_DESCRIPTION =
  'Professional websites, booking flows, dashboards and automations for South African small businesses. Built by Christiaan Steffen in the Vaal Triangle, Gauteng.';

const DEFAULT_KEYWORDS = [
  'web design',
  'business automation',
  'web design Vaal Triangle',
  'web design Vereeniging',
  'web design Vanderbijlpark',
  'web design Gauteng',
  'WhatsApp automation South Africa',
  'n8n automation',
  'website hosting South Africa',
];

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  /** Absolute URL, or a path like "/websites". If omitted, derived from the pathname. */
  url?: string;
  keywords?: string[];
  noindex?: boolean;
  type?: 'website' | 'article';
  jsonLd?: JsonLd;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_OG,
  url,
  keywords = DEFAULT_KEYWORDS,
  noindex = false,
  type = 'website',
  jsonLd,
}: SEOProps) {
  const jsonLdNodes = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const canonicalUrl = url
      ? url.startsWith('http')
        ? url
        : `${SITE_URL}${url}`
      : `${SITE_URL}${window.location.pathname}`;
    const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

    document.title = fullTitle;
    document.documentElement.lang = 'en-ZA';

    setMeta('name', 'title', fullTitle);
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords.join(', '));
    setMeta(
      'name',
      'robots',
      noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
    );
    setLink('canonical', canonicalUrl);

    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:locale', 'en_ZA');
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', absoluteImage);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', `${SITE_NAME} — web design & automation, South Africa`);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:url', canonicalUrl);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', absoluteImage);

    // Replace previously-injected per-route JSON-LD (leaves the static global graph alone).
    document.querySelectorAll('script[data-seo-jsonld]').forEach((n) => n.remove());
    for (const node of jsonLdNodes) {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-seo-jsonld', '');
      s.textContent = JSON.stringify(node);
      document.head.appendChild(s);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, image, url, noindex, type, JSON.stringify(keywords), JSON.stringify(jsonLd)]);

  return null;
}
