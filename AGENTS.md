# AGENTS.md - Streamline Automations Site

This repository is being worked in by Codex and other local agents. Treat this file as the
repo-level operating contract.

The goals are simple:
- preserve the real Streamline workflow;
- keep the white-minimal + single-purple-accent brand system intact;
- avoid touching legacy surfaces unless the task explicitly calls for them;
- keep n8n-as-code usage safe and backend-driven.

## Project Identity

- Business: Streamline Automations
- Owner: Christiaan Steffen
- Voice: first person singular, South African founder voice, short direct sentences
- Never use "we" in site copy unless the user explicitly requests it
- Never use lorem ipsum, fake testimonials, invented metrics, stock placeholders, or AI mockups

## Skill And Instruction Precedence

Use these local instructions in this order:

1. `streamline-site` skill is brand truth for this repo.
2. `cuberto-design-review` skill is the default review loop after meaningful visual changes.
3. `n8n-architect` is required for n8n workflow tasks.
4. `deploy-to-vercel`, `vercel-cli-with-tokens`, `vercel-optimize`, and related Vercel skills are supporting deployment and performance guidance.
5. General design skills like `ui-ux-pro-max`, `frontend-design`, `modern-web-design`, and animation skills are technique-only. They do not override Streamline brand tokens, copy voice, page structure, pricing rules, or client truth.

Before making site changes, read:
- `CLAUDE.md`
- `.agents/skills/streamline-site/SKILL.md`

Read additional skills only when the task matches them.

## Codex Migration Notes

This repo was previously operated through Claude Code. Some instructions in `CLAUDE.md` are still
useful as project rules, but the Claude-only session mechanics are not portable.

For Codex:
- Treat `CLAUDE.md` as project/domain guidance, not as a source of product-specific slash commands
- Ignore Claude-only workflow commands like `/compact`, `/plan`, `/clear`, and prompt tags like `ultrathink`
- Use plain-language requests instead: "inspect", "fix", "review", "implement", "deploy", "verify"
- Prefer this file (`AGENTS.md`) for current repo operating instructions when there is any conflict
- Keep `CLAUDE.md` as the detailed brand and product memory until or unless it is intentionally split into Codex-native docs

When working in Codex on this repo:
- start from `AGENTS.md`
- read `CLAUDE.md` for detailed brand, copy, pricing, and architecture rules
- load the matching skill for the task
- then make changes and verify them

## Active App Surface

This repo contains old experiments and legacy builds. The current live site is the v2 site in:

- `src/site/*`

The live app is selected by:

- `VITE_SITE_V2=true`

Important implications:
- Treat `src/site/SiteApp.tsx` as the active route shell.
- Treat `src/site/components/SiteSEO.tsx` as the source of per-route SEO metadata and JSON-LD mapping.
- Treat `scripts/prerender.cjs` and `scripts/gen-sitemap.cjs` as part of the shipping surface.
- `src/pages/*`, `src/components/*`, and `marketing-site/*` include legacy and reference work. Do not edit them unless the task clearly targets them.

If you add or rename a live route, update all of:
- `src/site/SiteApp.tsx`
- `src/site/components/SiteSEO.tsx`
- `scripts/prerender.cjs`
- `scripts/gen-sitemap.cjs`

## Design Direction

Active visual direction:

- Cuberto-level motion craft on a white-minimal canvas with one purple accent

Do not drift back to:
- the old dark cyberpunk/orange theme
- the older fluid.glass / brokerpilot direction
- multi-accent palettes
- cluttered or collage-heavy compositions

Locked brand tokens:
- Backgrounds: `#FFFFFF`, `#FAFAFA`, `#F5F5F7`, `#F0EBFF`
- Ink sections only as surgical contrast moments: `#0A0A0F`, `#15151C`
- Text: `#0A0A0F`, `#3D3D47`, `#6B6B7A`, `#9E9EA8`
- Borders: `#E8E8EC`, `#D4D4DA`
- Accent: `#7B3FE4`, hover `#6930D0`
- Type: DM Sans everywhere, Instrument Serif italic for a single accent word, JetBrains Mono for labels/eyebrows

Hard design rules:
- White-dominant pages
- Maximum 1-2 dark sections per page
- Primary CTAs are pill buttons (`rounded-full`)
- Minimum section padding is generous; follow the current system in `CLAUDE.md` and the `streamline-site` skill
- Minimum 44px tap targets
- No horizontal scroll
- Use `min-h-[100svh]`, not `min-h-screen`, for full-height sections

## Motion And Interaction Rules

- GSAP plugin registration belongs in `src/lib/gsap-setup.ts` only
- Use one Lenis system only; the active provider is shared through the app shell
- Framer Motion handles hover, tap, and lightweight in-view motion
- GSAP handles pinned, scrubbed, choreographed, or SplitText-heavy motion
- Do not animate the same effect with both libraries on the same element
- Prefer transform and opacity animation only
- Respect `prefers-reduced-motion` on every animated experience
- Disable custom cursor behavior on touch or coarse pointers

## Content And Offer Rules

Site structure:
- `/`
- `/websites`
- `/systems`
- `/hosting`
- `/portfolio`
- `/about`
- `/contact`
- `/privacy`

Pricing rules:
- Pricing belongs on `/hosting` only
- Other service pages should stay pricing-free and end with a quote-led CTA

Rental model truth:
- Free upfront build
- Monthly payment
- Client owns the site after 18 months
- Optional maintenance retainer after ownership

Portfolio truth:
- Use only real Streamline clients and real deliverables
- Never show Madiega Trading as a signed or live client

## Engineering Rules

Stack:
- React 18
- TypeScript
- Vite 5
- Tailwind CSS
- React Router DOM
- Framer Motion
- GSAP + `@gsap/react`
- Lenis
- Supabase
- Vercel
- PostHog

Implementation rules:
- Functional components only
- Tailwind utility classes only
- No CSS modules
- No styled-components
- No inline styles unless there is a compelling technical reason already established in the codebase
- Named imports only; do not use `import * as ...`
- Avoid unnecessary dependencies
- Prefer existing local components and patterns over new abstractions

Supabase rules:
- Never use `.select('*')`
- Never fetch inside loops when a join solves it
- Select only the columns the UI needs
- Clean up subscriptions
- Prefer transformed WebP storage URLs where relevant

Performance rules:
- Keep `vite-plugin-compression` enabled
- Lazy-load heavy components when justified
- Target 90+ mobile Lighthouse where feasible
- Preserve the reduced-motion and mobile fallback behavior for heavy sections

## Build, Run, And Verification

Primary commands:

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

Build facts:
- `npm run build` runs sitemap generation, TypeScript compilation, Vite build, and prerendering
- Prerender output is part of the deployment path
- `SKIP_PRERENDER=1` is the documented emergency fallback if Chromium/Puppeteer breaks on host builds

Before closing a task that changes behavior or UI, run the smallest relevant verification set. Default:
- `npm run lint`
- `npm run build`

For visual changes, definition of done is stricter:
- run the dev server
- inspect the changed surface at desktop 1440 and mobile 390
- compare against the Cuberto reference intent in `design-refs/cuberto/`

Code that merely "should look right" is not done.

## Deployment Notes

- Vercel is the main deployment target
- `VITE_SITE_V2=true` must be present in the build environment for the live app
- `vercel.json` and `netlify.toml` both contain important routing and hosting behavior
- The prerender setup is intentional; do not casually replace it with SPA catch-all routing

If working on SEO or routing, read:
- `docs/SEO-SECURITY-CHECKLIST.md`

If working on motion or assets, read:
- `DEPLOYMENT_NOTES.md`
- `ASSET_MANIFEST.md`
- `ASSET_PLACEHOLDERS.md`

## n8n-As-Code Rules

The section below is generated bootstrap context. Keep it intact unless regenerated by
`npx --yes n8nac update-ai`.

<!-- n8n-as-code-start -->
<!-- n8nac-version: 2.1.2 -->

## n8n-as-code Context Root

This file is generated by `npx --yes n8nac update-ai`. It is bootstrap context only, not a configuration source of truth.

- Context root: `c:\Users\User\Desktop\Streamline-Wesite\Streamline site -trae\streamline-site-main`
- n8n version at generation time: Unknown
- n8nac command: `npx --yes n8nac`
- n8n-manager command: `npx --yes @n8n-as-code/n8n-manager`
- n8n knowledge command: `npx --yes n8nac skills`

Run workspace commands from this context root. Do not `cd` into the n8n-as-code source repository, n8n-manager source repository, plugin directory, or package directory to run `npx --yes n8nac workspace ...`, `npx --yes n8nac list`, `npx --yes n8nac pull`, `npx --yes n8nac push`, or `npx --yes n8nac update-ai`.

---

## Required Local Agent

A VS Code and GitHub Copilot-compatible agent is generated here:

- `.github/agents/n8n-architect.agent.md`

A portable skill fallback is also generated for runtimes that do not read `.github/agents`:

- `.agents/skills/n8n-architect/SKILL.md`

If your agent runtime supports workspace agents, use the `.github/agents/*.agent.md` file. If it supports skills instead, load the skill file. Otherwise, treat these files as mandatory instructions.

---

## Source Of Truth

Do not infer configuration from this file. It intentionally avoids storing the effective instance, project, sync folder, or workflow directory.

n8nac backend resolution remains the only source of effective workspace state.
- Workspace environments live in `n8nac-config.json` and are managed by `npx --yes n8nac env ...`.
- Managed local runtime state and secrets live in n8n-manager storage and are managed by `npx --yes @n8n-as-code/n8n-manager ...`.
- The effective context is resolved by the backend.

Before any n8n workflow command, run migration dry-run first, then workspace status only after migration is not required or has been applied:

```bash
cd c:\Users\User\Desktop\Streamline-Wesite\Streamline site -trae\streamline-site-main
npx --yes n8nac workspace migrate --json
npx --yes n8nac workspace status --json
```

Use the returned `workflowDir` exactly as provided. Do not reconstruct paths from raw config files.

---

## Safe Commands

- Primary workspace, environment, sync, validation, push, and pull work: `npx --yes n8nac ...`
- Local managed runtime lifecycle and tunnels only: `npx --yes @n8n-as-code/n8n-manager ...`
- Workspace status and migration: `npx --yes n8nac workspace ...`
- Workflow sync and validation: `npx --yes n8nac ...`
- Node knowledge and schema lookup: `npx --yes n8nac skills ...`

Never write `n8nac-config.json`, `~/.n8n-manager`, or n8n-manager secret files by hand.
<!-- n8n-as-code-end -->

## Agent Workflow Expectations

- Start by reading the local instructions that match the task, not by improvising
- Keep edits narrow and aligned with existing architecture
- Do not refactor unrelated legacy code just because it is present
- When a task affects the site visually, verify it visually
- When a task affects n8n, follow backend-driven n8nac flow instead of guessing config
- Surface cost, deployment, or infrastructure implications before making those changes
