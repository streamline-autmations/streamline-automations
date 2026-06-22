# Codex Setup For This Repo

## Start Here

When working in Codex on this repo:

1. Read `AGENTS.md`.
2. Read `CLAUDE.md` for detailed brand and project memory.
3. Load the relevant skill from `.agents/skills/*`.
4. Inspect the active code surface before editing.

For normal site work, the required skill is:

- `.agents/skills/streamline-site/SKILL.md`

For meaningful visual work, also use:

- `.agents/skills/cuberto-design-review/SKILL.md`

For n8n work, use:

- `.agents/skills/n8n-architect/SKILL.md`

## Active App Surface

The live site is the v2 app:

- `src/site/*`

It is enabled with:

- `VITE_SITE_V2=true`

Most new live site edits should happen in `src/site/*`, not the legacy `src/pages/*` tree.

## Route Change Checklist

If adding, removing, or renaming a live route, update all of:

- `src/site/SiteApp.tsx`
- `src/site/components/SiteSEO.tsx`
- `scripts/prerender.cjs`
- `scripts/gen-sitemap.cjs`

## Commands

Primary commands:

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

Build runs:

1. sitemap generation
2. TypeScript compile
3. Vite build
4. Puppeteer prerender

Emergency prerender bypass:

```bash
SKIP_PRERENDER=1 npm run build
```

Use that only as a temporary host/build fallback.

## Verification Defaults

For behavior or UI changes:

```bash
npm run lint
npm run build
```

For visual changes:

1. Run the dev server.
2. Inspect desktop 1440.
3. Inspect mobile 390.
4. Compare against `design-refs/cuberto/`.

## Safety Rules

- Do not delete original Trae/Claude files during normal work.
- Do not overwrite dirty user changes.
- Do not modify application code during documentation-only migrations.
- Do not install packages unless explicitly needed and approved.
- Do not add stock, placeholder, fake testimonial, or AI-generated client imagery.
- Do not move client/social-media/Feedbird context into this repo unless it already exists here.

