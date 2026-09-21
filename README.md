# Streamline Automations

**Live:** [streamline-automations.co.za](https://streamline-automations.co.za) · **Built by:** Christiaan Steffen, Vaal Triangle, South Africa

## Overview

Streamline Automations is my software and automation business. I build websites, e-commerce stores, admin systems and workflow automation for South African small businesses.

This repository is the production code for the company's own website. It is a statically prerendered React single-page app. It presents the services and case studies, captures leads into an n8n automation pipeline, and embeds a working demo of one of my products.

## The business problem

The businesses I work with are usually run by their owners, with no in-house developer. The same problems come up again and again:

- **Manual admin that doesn't scale.** Orders, quotes and bookings get re-typed between WhatsApp, email, spreadsheets and paper.
- **Websites that don't do anything.** Brochure sites that look fine but aren't connected to how the business actually runs.
- **Upfront cost.** A proper custom build is a large once-off spend for a small business.

Streamline positions itself as one person who designs the site, builds the system behind it and wires the automation between them. It also offers a rent-to-own website model to remove the upfront cost.

## The product / site

The site is the sales surface for that offer. It has to do three jobs:

1. **Explain the three service pillars:** Websites, Systems & Automation, and Hosting & Maintenance.
2. **Prove the work.** Case studies of real client builds: BLOM Cosmetics, RecklessBear, CW Electronics, Ameli Designs and JJ Glassworks.
3. **Convert.** Every page drives to one action, a free call. Enquiries land in an automation pipeline, not a mailbox nobody checks.

## Key features

Everything below exists in this repository.

- **15 routes:** home, three service pages, portfolio, five case studies, the Restaurant Direct product page, about, contact, privacy and an isolated 3D lab route.
- **Lead capture into n8n.** The contact form validates on the client, then posts `FormData` to an n8n webhook. It has spam protection (a honeypot field plus a minimum fill time; bots get a fake success) and falls back to a pre-filled WhatsApp message.
- **A second lead flow.** The Restaurant Direct review-request form posts to the same pipeline, tagged by `source` and `interest` so n8n can route it.
- **A live product demo.** The Restaurant Direct page embeds the real demo app in two iframes, customer view and staff console. They share an origin, so an order placed in one view appears in the other. The frames stay inert until the visitor opts in, so page scroll never gets trapped.
- **A pinned 6-stage automation walkthrough on /systems.** The GSAP-scrubbed section drives a react-three-fiber node graph: the camera travels node to node as you scroll. On mobile and with reduced motion it becomes a static timeline with no WebGL.
- **A case-study cycler.** A pinned horizontal filmstrip on the home page, driven by vertical scroll.
- **Consent-gated analytics (POPIA).** Google Consent Mode v2 defaults everything to denied. PostHog starts opted out, and the Apollo tracker only loads after the visitor accepts.
- **SEO.** A prerendered HTML file per route, per-route meta and Open Graph tags, and JSON-LD structured data (`LocalBusiness`, `Service`, `BreadcrumbList`, `CreativeWork`, `FAQPage`). The sitemap is generated at build time, unknown URLs return a real 404, and legacy URLs 301-redirect.
- **Interaction.** A custom cursor that samples the real background colour under the pointer to stay legible, an ink-wipe page transition, magnetic buttons and word-by-word headline reveals.

## Architecture

```
                        ┌───────────────────────── Netlify (static) ─────────────────────────┐
  Browser ──HTTPS──▶    │  dist/  ← prerendered HTML per route + hashed, pre-compressed JS/CSS │
                        │  security headers (CSP, HSTS, frame-ancestors) · 301s · real 404     │
                        └─────────────────────────────────────────────────────────────────────┘
     │
     ├── React SPA hydrates:  main.tsx → SiteApp (Router · Lenis · Cursor · SEO · Layout)
     │
     ├── Contact / review forms ──POST FormData──▶ n8n webhook (self-hosted on Render)
     │                                               └─▶ notification + lead routing
     ├── Restaurant Direct ──iframe──▶ separately deployed demo app
     │
     └── After consent only ──▶ GTM / GA4 · PostHog · Apollo
```

- **Frontend:** React 18 + TypeScript. Every route is code-split with `React.lazy`. `src/site/` holds the whole application: `pages/`, `components/{craft,site,layout,three}`, `data/`, `hooks/`, `lib/`. Content such as projects, contact details and FAQs lives in typed modules under `src/site/data/`, not hard-coded in components.
- **Backend:** none in this repository, on purpose. The site is fully static. The only server-side step is the n8n workflow behind the webhook, which runs as a separate service.
- **Database:** none. Leads go straight into the automation pipeline.
- **Deployment:** Netlify builds from `main`, with the config in `netlify.toml`. The build installs Chrome for the prerender step.
- **Analytics:** GTM/GA4, PostHog and Apollo, all behind the consent gate.

### Motion architecture

Scroll animation is the part of this codebase most likely to go wrong, so it has firm rules:

- **One GSAP registration point.** `src/lib/gsap-setup.ts` registers ScrollTrigger, CustomEase (a named `brand` ease matching the site-wide cubic-bezier) and `useGSAP` once, and everything imports from there.
- **One smooth-scroll system.** `LenisProvider` drives Lenis from GSAP's ticker, so ScrollTrigger scrub values update in the same frame. Lenis is disabled on touch devices and when reduced motion is on.
- **Layout-drift fix.** A `ResizeObserver` on the document height refreshes ScrollTrigger (debounced) whenever lazy routes, images or fonts change the page height. Otherwise pins further down the page engage late and visibly snap.
- **3D doesn't fight the smooth scroll.** A ScrollTrigger writes progress into a ref, and `useFrame` reads it. No drei `ScrollControls`, so there's no second scroll container competing with Lenis.
- **Pay only while visible.** An `IntersectionObserver` pauses each WebGL canvas when it scrolls off-screen, and three.js is lazy-loaded so it never blocks first paint.
- **Accessibility.** `MotionConfig reducedMotion="user"` covers all Framer Motion components. Each GSAP pin has an explicit reduced-motion path that renders the end state with no pin or scrub.

## Automation & integrations

| Integration | Where | What it does |
|---|---|---|
| **n8n** (self-hosted on Render) | `src/site/data/site.ts`, `Contact.tsx`, `RestaurantReviewForm.tsx` | Receives every enquiry from both forms, tagged with `source` and `interest` for routing |
| **WhatsApp** (`wa.me` deep links) | Contact page and footer | Secondary contact path, pre-filled with what the visitor already typed |
| **Restaurant Direct demo** | `RestaurantLiveDemo.tsx` | Embeds the separately deployed product demo |
| **Google Tag Manager / GA4** | `index.html` | Consent Mode v2, denied by default |
| **PostHog** | `main.tsx`, `CookieConsent.tsx` | Product analytics, opted out until consent |
| **Apollo** | `index.html` | B2B visitor tracking, loaded only after consent |

The client systems shown in the case studies (Supabase backends, PayFast, WhatsApp Business automation, AI quote flows) were built in those clients' own codebases. This repository presents them; it doesn't contain them.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 18, TypeScript 5 (strict) |
| Build | Vite 5, `vite-plugin-compression` (Brotli + gzip), manual vendor chunking |
| Routing / head | React Router 6, react-helmet-async |
| Styling | Tailwind CSS 3 |
| Motion | GSAP 3 (ScrollTrigger, CustomEase), Framer Motion 12, Lenis |
| 3D | three.js, @react-three/fiber, @react-three/drei, @react-three/postprocessing |
| Prerender | Puppeteer (custom script) |
| Analytics | GTM/GA4, PostHog, Apollo |
| Automation | n8n |
| Hosting | Netlify |
| Quality | ESLint 9 (typescript-eslint, react-hooks), `tsc --noEmit` |

## Engineering highlights

- **A custom static prerender, not a framework migration.** `scripts/prerender.cjs` starts a small static server over `dist/`, drives headless Chrome to each route, waits for React and Helmet to finish, and writes the rendered DOM to `route/index.html`. Crawlers and link previews get real content and meta tags. It also writes a real `404.html` and skips third-party trackers so they can't stall a snapshot.
- **Security headers.** A CSP allowlist scoped to the services actually used, HSTS with preload, `frame-ancestors 'none'`, a locked-down `Permissions-Policy` and immutable caching on hashed assets.
- **Forms without a backend.** Validation, honeypot and timing spam defence, and a WhatsApp fallback that keeps what the visitor typed. No server code or database to secure.
- **Performance.** Every route is lazy-loaded. three.js sits in its own vendor chunk and is only fetched on pages with a 3D scene. Assets are pre-compressed at build time, and WebGL is skipped entirely for reduced-motion users.
- **Typed content.** Featured projects, contact details and FAQs are typed data modules. The FAQ sections and their `FAQPage` JSON-LD read from the same source, so the two can't drift apart.

## Screenshots

Suggested captures, using only public pages and the fictional demo data:

1. **Home hero** at desktop 1440, showing the headline, the single CTA and the type system.
2. **/systems automation walkthrough**, mid-scroll, with the pinned 6-stage flow and the 3D node graph.
3. **Home case-study cycler**, mid-scrub.
4. **/restaurant-direct live demo** with the customer and staff views side by side. The demo uses fictional data.
5. **/contact on mobile** at 390 wide, showing the form with its interest chips.
6. **A case study** such as `/work/blom` at desktop: full-bleed cover and walkthrough.

Store them in `docs/screenshots/` and reference them from this section.

## Running locally

Requirements: **Node 22.12+** (Puppeteer 25, used by the prerender step, requires it) and npm.

```bash
npm install
npm run dev          # Vite dev server
```

A production build runs the full pipeline: sitemap, typecheck, bundle, prerender.

```bash
npx puppeteer browsers install chrome   # once, for the prerender step
npm run build
npm run preview
```

## Environment variables

Both are optional. Without them the site runs normally and PostHog never initialises. Copy `.env.example` to `.env.local`:

```bash
VITE_PUBLIC_POSTHOG_KEY=phc_your_project_key_here
VITE_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

The site uses no private keys. Everything shipped to the browser is a public, client-side identifier.

## Testing & quality

| Command | What it checks |
|---|---|
| `npm run typecheck` | `tsc --noEmit` on the app and the Vite config (strict, no unused locals or parameters) |
| `npm run lint` | ESLint with `--max-warnings 0` |
| `npm run build` | Sitemap, typecheck, production bundle and prerender of every route |

There is no automated test suite yet. Visual changes are checked by rendering the production build at 1440 and 390 wide.

## Deployment

Netlify deploys automatically from `main` (`netlify.toml`):

1. `npx puppeteer browsers install chrome`
2. `npm run build`, which generates the sitemap, typechecks, runs `vite build`, then prerenders
3. Publishes `dist/`, with security headers and redirects from `netlify.toml` and `public/_redirects`

There's no SPA catch-all rewrite: every real route is a prerendered file, so unknown URLs return a real 404 status.

## What I built

- **As a developer:** a production React/TypeScript codebase with deliberate motion architecture (one scroll system, one GSAP registration, reduced-motion paths for every pin), WebGL integrated without hurting page load, and a custom prerender pipeline in place of a framework migration.
- **As a product builder:** a site with a job to do, built around one conversion path, real work as proof, and an embedded demo of a product I sell.
- **As an automation consultant:** the site uses the same approach I sell. Enquiries go straight into an n8n workflow and get routed, instead of sitting in an inbox.

## Related repositories

This is the canonical repository for the Streamline Automations website. Client systems live in their own repositories.
