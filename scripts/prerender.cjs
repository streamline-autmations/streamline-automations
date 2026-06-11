/**
 * Post-build static prerender.
 *
 * Boots a tiny static server over /dist, drives a headless browser to each route,
 * lets React + react-helmet-async fully render, then serialises the live DOM to a
 * per-route .html file. Crawlers and social scrapers (which don't run JS) then get
 * real content + meta in the initial HTML. The SPA still hydrates/renders on top.
 *
 * Also writes a real 404.html so unknown URLs return a 404 status (no catch-all
 * rewrite in vercel.json). Runs after `vite build` (see package.json).
 *
 * Set SKIP_PRERENDER=1 to bypass (falls back to plain SPA — pair with the rewrite
 * fallback documented in vercel.json).
 */
const fs = require('fs');
const path = require('path');
const http = require('http');

const DIST = path.join(__dirname, '..', 'dist');
const PORT = 4178;

// Keep in sync with the real (non-redirect) routes in src/site/SiteApp.tsx — the LIVE
// v2 site (VITE_SITE_V2=true). The /portfolio/<slug> URLs are 301-redirected to /work/*
// at the host level (see vercel.json / netlify.toml), so they're not prerendered here.
const ROUTES = [
  '/',
  '/websites',
  '/systems',
  '/hosting',
  '/portfolio',
  '/work/blom',
  '/work/recklessbear',
  '/work/cw-electronics',
  '/work/ameli',
  '/about',
  '/contact',
  '/privacy',
  '/lab',
];

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
  '.glsl': 'text/plain',
};

// Static server with SPA fallback so the client router can render any route.
function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent(req.url.split('?')[0]);
      let filePath = path.join(DIST, urlPath);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        fs.createReadStream(filePath).pipe(res);
        return;
      }
      // SPA fallback
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.createReadStream(path.join(DIST, 'index.html')).pipe(res);
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function snapshot(page, route) {
  // 'load' (not networkidle*) — the Cal embed and trackers keep connections open, so
  // a network-idle wait never settles. We gate on the route's Helmet title instead.
  await page.goto(`http://localhost:${PORT}${route}`, {
    waitUntil: 'load',
    timeout: 45000,
  });
  // The app shell (cursor) mounts instantly, so "#root has children" is not enough —
  // wait until the lazy ROUTE chunk has mounted. Every per-route <SEO> title ends with
  // "| Streamline Automations" (the static shell title uses an em-dash), so a "|" in
  // document.title is a reliable signal that the route's Helmet has applied.
  await page
    .waitForFunction(() => document.title.includes('| Streamline Automations'), { timeout: 15000 })
    .catch(() => {});
  // Belt-and-braces: most pages render a <main>; wait for it too.
  await page.waitForSelector('main', { timeout: 8000 }).catch(() => {});
  // Let the one-time intro overlay clear.
  await page
    .waitForFunction(() => !document.body.classList.contains('intro-active'), { timeout: 12000 })
    .catch(() => {});
  await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
  await new Promise((r) => setTimeout(r, 600));

  let html = await page.content();
  if (!html.startsWith('<!')) html = '<!doctype html>\n' + html;
  return html;
}

function outPath(route) {
  if (route === '/') return path.join(DIST, 'index.html');
  return path.join(DIST, route.replace(/^\//, ''), 'index.html');
}

(async () => {
  if (process.env.SKIP_PRERENDER) {
    console.log('[prerender] SKIP_PRERENDER set — skipping.');
    return;
  }
  let puppeteer;
  try {
    puppeteer = require('puppeteer');
  } catch {
    console.error('[prerender] puppeteer not installed. Run: npm install puppeteer');
    process.exit(1);
  }

  const server = await startServer();
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  // Trim noisy third-party trackers so they can't stall the snapshot.
  await page.setRequestInterception(true);
  page.on('request', (r) => {
    const u = r.url();
    if (/googletagmanager|google-analytics|apollo\.io|posthog/.test(u)) return r.abort();
    return r.continue();
  });

  let ok = 0;
  for (const route of ROUTES) {
    try {
      const html = await snapshot(page, route);
      const file = outPath(route);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, html);
      ok++;
      console.log(`[prerender] ${route} -> ${path.relative(DIST, file)} (${(html.length / 1024).toFixed(0)}kb)`);
    } catch (e) {
      console.error(`[prerender] FAILED ${route}: ${e.message}`);
    }
  }

  // Real 404 page from the catch-all route.
  try {
    const html = await snapshot(page, '/__not_found__');
    fs.writeFileSync(path.join(DIST, '404.html'), html);
    console.log('[prerender] 404.html written');
  } catch (e) {
    console.error('[prerender] 404 snapshot failed:', e.message);
  }

  await browser.close();
  server.close();
  console.log(`[prerender] done — ${ok}/${ROUTES.length} routes.`);
  // All-or-nothing: if any route failed to snapshot, fail the build so a partial
  // prerender (which would 404 the missing routes) never deploys. A failed build
  // leaves the previous good deploy untouched.
  if (ok !== ROUTES.length) {
    console.error('[prerender] not all routes succeeded — failing the build.');
    process.exit(1);
  }
})();
