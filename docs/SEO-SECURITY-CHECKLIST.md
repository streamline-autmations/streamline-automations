# SEO, Security & Technical Hardening — operating notes

What changed in code, what you need to do off-site, and how to undo the risky bits.

## Off-site checklist (do these outside the code)

1. **Google Search Console** — verify `streamline-automations.co.za` (DNS or HTML tag) and
   submit `https://streamline-automations.co.za/sitemap.xml`.
2. **Google Business Profile** — claim/verify (likely video verification). Add the website link
   and make the NAP match the site exactly:
   - Name: **Streamline Automations**
   - Area: **Vaal Triangle, Gauteng, South Africa** (serving Vereeniging, Vanderbijlpark,
     Three Rivers, Meyerton, Sasolburg)
   - Phone: **+27 68 757 9940**
3. **Local citations** — list the business in SA directories with the identical NAP.
4. **POPIA** — register as Information Officer with the Information Regulator; the Privacy Policy
   is live at `/privacy`.
5. **Bing Webmaster Tools** (optional) — add the site and submit the sitemap.
6. **OG image** — a branded 1200×630 card is generated at `/public/og-image.png`. Re-run
   `node scripts/gen-assets.cjs` if you change branding.

## Things you may want to configure

- **Cloudflare Turnstile (stronger spam protection):** set `VITE_TURNSTILE_SITE_KEY` in Vercel
  env. The contact form already renders the widget and blocks submit until solved when the key
  is present. Without it, the form still has honeypot + submit-timing protection. To actually
  *reject* spam server-side, validate `cf-turnstile-response` in the n8n workflow.
- **n8n webhook:** lock CORS on the `streamline-contact-form` webhook to the site origin, and
  add validation there. The webhook URL is public in the bundle (unavoidable for a client-side
  form) — Turnstile + server validation is what stops abuse.
- **Error monitoring:** wire Sentry if you want stack traces. App errors already log to console
  and to PostHog (`app_error` event) via the error boundary.

## Build / rendering notes

- **The LIVE site is the v2 build (`src/site/*`)** — it ships when `VITE_SITE_V2=true`. This MUST
  be set on whichever host builds the site (it's baked into `netlify.toml`; on Vercel it must be a
  project env var). Without it, the wrong (legacy `src/pages`) app builds.
- **Per-route `<head>`:** one place — `src/site/components/SiteSEO.tsx` maps each route to its
  title / description / JSON-LD and feeds `src/components/seo/SEO.tsx`, an imperative head manager
  (NOT react-helmet-async — that package wrote nothing to the head in this app, so per-route meta
  never worked before). Global Organization/WebSite/LocalBusiness JSON-LD lives statically in
  `index.html`. **To change a page's title/description/schema, edit `SiteSEO.tsx`.**
- **Prerendering:** `npm run build` runs `scripts/prerender.cjs` after `vite build`. Puppeteer
  snapshots every route to a static `.html` so crawlers/social scrapers get real content + meta.
  Puppeteer is a devDependency, so the host installs Chromium during `npm install`.
- **No catch-all rewrite:** routing works because every route is prerendered to its own file, and
  unknown URLs hit the real `404.html` (correct 404 status). **If you add a route in
  `src/site/SiteApp.tsx`, also add it to `ROUTES` in `scripts/prerender.cjs`, `gen-sitemap.cjs`,
  and `SiteSEO.tsx`** or it 404s on direct hit and has no meta.
- **Legacy case-study URLs:** `/portfolio/<slug>` 301-redirect to `/work/*` at the host level
  (`vercel.json` redirects + `public/_redirects`).
- **Netlify:** `netlify.toml` carries build command, `VITE_SITE_V2=true`, security headers,
  caching, and the www→apex redirect. Netlify runs Puppeteer in the build the same way Vercel does.

### If a Vercel build ever fails on Puppeteer/Chromium

Two-line fallback to ship as a plain SPA (no prerender) until fixed:

1. In `package.json`, drop `&& node scripts/prerender.cjs` from the `build` script
   (or set env `SKIP_PRERENDER=1` on the host).
2. Re-add the SPA catch-all so client routes resolve:
   - **Vercel** — add to `vercel.json`: `"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]`
   - **Netlify** — add to `public/_redirects`: `/*  /index.html  200`
   (Note: this reintroduces soft-404s until prerender is restored.)

## Known, intentionally-deferred items

- **npm audit:** the only findings are a *dev-server-only* esbuild/vite advisory
  (GHSA-67mh-4wv8-2f99). It's not exploitable in the deployed static site; the fix is a Vite 5→8
  major upgrade. Deferred — revisit when upgrading Vite.
