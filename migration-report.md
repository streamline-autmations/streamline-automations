# Trae / Claude To Codex Migration Report

Date: 2026-06-15

## Scope

This report documents the repository inspection and the Codex-compatible context structure for the Streamline Automations marketing site.

No application code was changed as part of this migration pass. Existing Trae, Claude, Continue, Kilo, Bolt, Playwright MCP, and n8n-as-code files were preserved as backups and historical context.

## Current Project Shape

This is a React 18 + TypeScript + Vite 5 marketing site for Streamline Automations.

The active shipping app is the v2 site in:

- `src/site/*`

The live app is selected by:

- `VITE_SITE_V2=true`

Do not treat `src/pages/*`, `src/components/*`, or `marketing-site/*` as the default live surface. They contain legacy builds, references, and older experiments unless a task explicitly targets them.

## Main Build And Runtime Files

- `package.json` - scripts and dependencies
- `vite.config.ts` - Vite, React, GLSL handling, compression
- `tailwind.config.js` - Tailwind tokens, including v2 `site.*` brand tokens
- `eslint.config.js` - TypeScript/React linting
- `src/main.tsx` - app bootstrap, PostHog provider, error boundary
- `src/App.tsx` - legacy shell and `VITE_SITE_V2` switch
- `src/site/SiteApp.tsx` - active v2 route shell
- `src/site/components/SiteSEO.tsx` - per-route metadata and JSON-LD
- `scripts/gen-sitemap.cjs` - sitemap route list
- `scripts/prerender.cjs` - build-time route prerender
- `vercel.json` - Vercel build, redirects, headers
- `netlify.toml` - Netlify mirror config

## AI / Agent Files Found

Canonical Codex-facing files:

- `AGENTS.md`
- `.agents/skills/*`
- `.github/agents/n8n-architect.agent.md`

Legacy or editor-specific context:

- `CLAUDE.md`
- `.claude/settings.local.json`
- `.claude/skills/*`
- `.trae/documents/*`
- `.trae/skills/*`
- `.continue/skills/*`
- `.continue/mcpServers/new-mcp-server.yaml`
- `.kilo/plans/*`
- `.bolt/config.json`
- `.bolt/prompt`
- `.mcp.json`
- `.n8nac/ai-context.json`
- `claude-overnight-log.txt`
- `skills-lock.json`

Generated or local QA artifacts:

- `.playwright-mcp/*`
- `lab-screens/*`
- root screenshot JPEGs

## Migration Decisions

1. `AGENTS.md` is the repo-level Codex operating contract.
2. `CLAUDE.md` remains a detailed historical/project memory source, but Claude-only session mechanics are not Codex rules.
3. `.agents/skills/*` is the canonical skill location for Codex.
4. `.trae/skills/*`, `.claude/skills/*`, and `.continue/skills/*` are backups/mirrors, not active sources of truth.
5. `.trae/documents/*` and `.kilo/plans/*` are historical planning artifacts. They can inform future work, but they do not override `AGENTS.md`, `CLAUDE.md`, or `streamline-site`.
6. The root `skills/`, `prompts/`, and `workflows/` folders should remain lightweight indexes. Do not duplicate full skill bodies there.
7. Keep social media, Feedbird, and unrelated client context out of this repo unless it already exists in the repository.

## Useful Trae / Legacy Plans Found

Trae documents:

- `.trae/documents/conversion-optimization-plan.md`
- `.trae/documents/intro-animation-improvement-plan.md`
- `.trae/documents/expandable_gallery_plan.md`
- `.trae/documents/page-design-featured-work-dot-grid.md`
- `.trae/documents/prd-featured-work-dot-grid.md`
- `.trae/documents/technical-featured-work-dot-grid.md`

Kilo plan:

- `.kilo/plans/1777367051608-stellar-panda.md`

Other planning/reference docs:

- `plans/phase2-conversion-optimization.md`
- `DEPLOYMENT_NOTES.md`
- `ASSET_MANIFEST.md`
- `ASSET_PLACEHOLDERS.md`
- `docs/SEO-SECURITY-CHECKLIST.md`

## Prompt Migration Notes

Raw prompt source:

- `Service c0mpeoent promt.txt`

Codex-safe normalized prompt:

- `prompts/reusable/service-component-integration.md`

Important: the raw prompt says to use Unsplash stock images. That conflicts with this repo's current rule to use real client screenshots/assets only. Use the normalized prompt, not the raw prompt, for future work.

## n8n Notes

The repo contains n8n-as-code bootstrap context.

For n8n work, use:

- `.agents/skills/n8n-architect/SKILL.md`
- `.github/agents/n8n-architect.agent.md`
- the n8n block in `AGENTS.md`

Do not hand-edit `n8nac-config.json`, n8n-manager storage, or secret files.

## Open Worktree State At Inspection

The worktree was already dirty before this migration pass.

Pre-existing modified files:

- `AGENTS.md`
- `src/components/white/home/design/HeroPortal.tsx`

Pre-existing untracked items included:

- `.mcp.json`
- `documentation/`
- `prompts/`
- `skills/`
- `workflows/`
- `skills-lock.json`
- `lab-screens/`
- `src/components/white/ui/FlowField.tsx`
- `src/components/white/ui/LiquidGradient.tsx`

These were not reverted or overwritten.

## Recommended Codex Workflow

Before any site change:

1. Read `AGENTS.md`.
2. Read `CLAUDE.md` for detailed brand, copy, pricing, and architecture memory.
3. Load `.agents/skills/streamline-site/SKILL.md`.
4. If the task is visual, use `.agents/skills/cuberto-design-review/SKILL.md`.
5. Make narrow changes in the active surface, usually `src/site/*`.
6. For route changes, update `SiteApp.tsx`, `SiteSEO.tsx`, `scripts/prerender.cjs`, and `scripts/gen-sitemap.cjs`.
7. Run the smallest relevant verification. Default: `npm run lint` and `npm run build`.
8. For visual changes, inspect desktop 1440 and mobile 390 before calling the work done.

## Do Not Migrate Directly

- Claude slash commands such as `/compact`, `/plan`, `/clear`
- Prompt tags such as `ultrathink`
- Local Claude permission settings
- Editor-specific MCP templates unless they are intentionally reconfigured
- Generated Playwright MCP logs/screens
- Raw prompt instructions that conflict with Streamline brand or asset rules

