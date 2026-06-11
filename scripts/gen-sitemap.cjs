/**
 * Build-time sitemap generator. Runs before `vite build` (see package.json) so the
 * file lands in /public and gets copied into /dist with a fresh lastmod.
 *
 * Keep ROUTES in sync with the canonical information architecture (CLAUDE.md).
 * Internal/experimental routes (/lab, /v1–/v4, /results, /add-ons, /packages,
 * /services) are deliberately excluded from the sitemap.
 */
const fs = require('fs');
const path = require('path');

const BASE = 'https://streamline-automations.co.za';
const lastmod = new Date().toISOString().slice(0, 10);

const ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/websites', changefreq: 'monthly', priority: '0.9' },
  { path: '/systems', changefreq: 'monthly', priority: '0.9' },
  { path: '/hosting', changefreq: 'monthly', priority: '0.9' },
  { path: '/portfolio', changefreq: 'weekly', priority: '0.9' },
  { path: '/work/blom', changefreq: 'monthly', priority: '0.8' },
  { path: '/work/recklessbear', changefreq: 'monthly', priority: '0.8' },
  { path: '/work/cw-electronics', changefreq: 'monthly', priority: '0.8' },
  { path: '/work/ameli', changefreq: 'monthly', priority: '0.8' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.9' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.2' },
];

const body = ROUTES.map(
  (r) =>
    `  <url>\n    <loc>${BASE}${r.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

const out = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(out, xml);
console.log(`sitemap.xml written — ${ROUTES.length} routes, lastmod ${lastmod}`);
