# Development Workflows

## Core app workflow

Active shipping surface:
- `src/site/*`

Supporting files that must stay aligned:
- `src/site/SiteApp.tsx`
- `src/site/components/SiteSEO.tsx`
- `scripts/prerender.cjs`
- `scripts/gen-sitemap.cjs`

If a route is added or renamed, update all four.

## Local development

Primary commands:

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

Build behavior:
- sitemap generation
- TypeScript check
- Vite build
- static prerender

## Verification workflow

Default:
1. make change
2. run `npm run lint`
3. run `npm run build`

Visual change:
1. run dev server
2. inspect changed surface
3. verify desktop 1440
4. verify mobile 390
5. compare against `design-refs/cuberto/` intent

## SEO and prerender workflow

Source:
- `docs/SEO-SECURITY-CHECKLIST.md`

Rules:
- `VITE_SITE_V2=true` must be set on build host
- prerender is intentional, not optional by default
- emergency fallback is `SKIP_PRERENDER=1`
- SPA catch-all rewrites are fallback-only, not the preferred mode

## Deployment workflow

Primary target:
- Vercel

Supporting config:
- `vercel.json`
- `netlify.toml`

## n8n workflow

Canonical sources:
- `.github/agents/n8n-architect.agent.md`
- `.agents/skills/n8n-architect/SKILL.md`

Operating loop:
1. run `npx --yes n8nac update-ai`
2. read `AGENTS.md`
3. run migration dry-run
4. resolve environment from backend
5. pull before modifying existing workflows
6. validate
7. push with verify
8. test
9. present workflow via `n8nac workflow present`

## Supporting sources
- `DEPLOYMENT_NOTES.md`
- `docs/SEO-SECURITY-CHECKLIST.md`
- `package.json`
