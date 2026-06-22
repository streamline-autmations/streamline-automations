# Project Structure

## Root

- `AGENTS.md` - Codex operating contract
- `CLAUDE.md` - detailed project and brand memory from Claude Code
- `migration-report.md` - Trae/Claude to Codex migration summary
- `package.json` - scripts and dependencies
- `vite.config.ts` - Vite setup and compression
- `tailwind.config.js` - Tailwind theme and brand tokens
- `vercel.json` - Vercel build, redirects, and headers
- `netlify.toml` - Netlify mirror config

## Active Site

- `src/site/SiteApp.tsx` - v2 route shell
- `src/site/pages/*` - live v2 pages
- `src/site/components/*` - live v2 components
- `src/site/components/SiteSEO.tsx` - per-route metadata
- `src/site/data/*` - site constants and FAQ data
- `src/site/styles/site.css` - v2 styles

## Shared Runtime

- `src/main.tsx` - React bootstrap and analytics provider
- `src/App.tsx` - legacy shell and `VITE_SITE_V2` switch
- `src/lib/gsap-setup.ts` - single GSAP plugin registration source
- `src/components/providers/LenisProvider.tsx` - shared Lenis provider
- `src/components/layout/ErrorBoundary.tsx` - app error boundary
- `src/components/layout/CookieConsent.tsx` - consent handling

## Legacy / Reference Areas

Treat these as legacy/reference unless a task explicitly targets them:

- `src/pages/*`
- `src/components/*`
- `marketing-site/*`
- `src/components/white/*`
- `src/components/home/*`

## Assets And References

- `public/assets/*` - live static assets
- `public/assets/clients/*` - real client assets
- `design-refs/cuberto/*` - visual reference screenshots
- `ASSET_MANIFEST.md` - asset upload expectations
- `ASSET_PLACEHOLDERS.md` - placeholder replacement checklist
- `DEPLOYMENT_NOTES.md` - deployment and motion fallback notes

## Scripts

- `scripts/gen-sitemap.cjs` - writes `public/sitemap.xml`
- `scripts/prerender.cjs` - prerenders live routes into `dist`
- `scripts/gen-assets.cjs` - generates static site assets
- `scripts/optimize-assets.ps1` - asset optimization helper
- `scripts/capture-intro.mjs` - intro capture helper

## Codex Documentation

- `docs/*` - current Codex-facing docs and technical checklists
- `documentation/*` - earlier migration summaries and distilled notes
- `prompts/*` - reusable prompt artifacts
- `workflows/*` - operational workflow indexes
- `skills/*` - skill inventory only; full skill bodies live in `.agents/skills/*`

