/**
 * Build-time sitemap generator. Runs before `vite build` (see package.json) so the
 * file lands in /public and gets copied into /dist.
 *
 * Keep ROUTES in sync with the canonical information architecture (CLAUDE.md).
 * Internal/experimental routes (/lab, /restaurant-direct/watch) are deliberately excluded.
 *
 * lastmod is the date of the last git commit that touched the page's source files
 * (not the build date — Google ignores lastmod that changes on every build). If git
 * history is unavailable, lastmod is omitted rather than guessed. changefreq and
 * priority are not emitted: Google ignores both.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const BASE = 'https://streamline-automations.co.za';
const ROOT = path.join(__dirname, '..');
const PAGES = 'src/site/pages';
// Shared files whose changes alter every page's visible content.
const SHARED = ['src/site/data/site.ts'];

const ROUTES = [
  { path: '/', files: [`${PAGES}/Home.tsx`, 'src/site/components/site'] },
  { path: '/websites', files: [`${PAGES}/Websites.tsx`] },
  { path: '/systems', files: [`${PAGES}/Systems.tsx`] },
  { path: '/hosting', files: [`${PAGES}/Hosting.tsx`] },
  { path: '/portfolio', files: [`${PAGES}/Portfolio.tsx`] },
  { path: '/work/blom', files: [`${PAGES}/work/Blom.tsx`] },
  { path: '/work/recklessbear', files: [`${PAGES}/work/RecklessBear.tsx`] },
  { path: '/work/cw-electronics', files: [`${PAGES}/work/CWElectronics.tsx`] },
  { path: '/work/ameli', files: [`${PAGES}/work/Ameli.tsx`] },
  { path: '/work/jj-glass', files: [`${PAGES}/work/JJGlass.tsx`] },
  { path: '/restaurant-direct', files: [`${PAGES}/RestaurantDirect.tsx`, 'src/site/data/restaurant-direct.ts'] },
  { path: '/about', files: [`${PAGES}/About.tsx`] },
  { path: '/contact', files: [`${PAGES}/Contact.tsx`, 'src/site/data/faq.ts'] },
  { path: '/privacy', files: [`${PAGES}/Privacy.tsx`], shared: false },
];

function lastCommitDate(files) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...files], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
}

const body = ROUTES.map((r) => {
  const files = r.shared === false ? r.files : [...r.files, ...SHARED];
  const lastmod = lastCommitDate(files);
  return `  <url>\n    <loc>${BASE}${r.path}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''}  </url>`;
}).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

fs.writeFileSync(path.join(ROOT, 'public', 'sitemap.xml'), xml);
console.log(`sitemap.xml written — ${ROUTES.length} routes`);
