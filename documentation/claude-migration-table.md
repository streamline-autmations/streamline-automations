# Claude Migration Table

This table maps imported Claude-era items to their recommended Codex destination.

| Item | Purpose | Recommended destination |
|---|---|---|
| `CLAUDE.md` | Detailed project rules, brand system, copy voice, coding standards, deployment and cost notes | Keep as canonical project guidance; referenced by `AGENTS.md` and documentation |
| Claude slash-command habits in `CLAUDE.md` | Claude session mechanics | Do not migrate directly; replace with Codex plain-language workflow guidance in `AGENTS.md` |
| `.claude/settings.local.json` | Claude local permissions and MCP settings | Historical reference only; do not migrate directly |
| `.claude/skills/streamline-site/SKILL.md` | Streamline brand truth | Codex skill; canonicalized through `.agents/skills/streamline-site/SKILL.md` |
| `.claude/skills/cuberto-design-review/SKILL.md` | Visual QA loop | Codex skill; canonicalized through `.agents/skills/cuberto-design-review/SKILL.md` |
| `.claude/skills/ui-ux-pro-max/SKILL.md` | General UI/UX technique | Codex skill; canonicalized through `.agents/skills/ui-ux-pro-max/SKILL.md` |
| `.continue/skills/*` mirrors | Editor-local skill mirrors | Do not migrate; treat as duplicate mirrors |
| `.trae/skills/*` mirrors | Editor-local skill mirrors | Do not migrate; treat as duplicate mirrors |
| `.agents/skills/streamline-site/SKILL.md` | Brand truth | Codex skill |
| `.agents/skills/cuberto-design-review/SKILL.md` | Design review loop | Codex skill |
| `.agents/skills/ui-ux-pro-max/SKILL.md` | Design technique | Codex skill |
| `.agents/skills/n8n-architect/SKILL.md` | n8n workflow authoring and operations | Codex skill |
| `.github/agents/n8n-architect.agent.md` | Workspace agent for n8n | Keep as workspace agent; reference from docs |
| `.agents/skills/deploy-to-vercel/SKILL.md` | Deployment workflow | Codex skill |
| `.agents/skills/vercel-cli-with-tokens/SKILL.md` | Token-based Vercel CLI operations | Codex skill |
| `.agents/skills/vercel-optimize/SKILL.md` | Vercel cost/perf optimization | Codex skill |
| `.agents/skills/vercel-react-best-practices/SKILL.md` | React/Next performance guidance | Codex skill |
| `.agents/skills/vercel-react-view-transitions/SKILL.md` | View transition implementation guidance | Codex skill |
| `.agents/skills/vercel-composition-patterns/SKILL.md` | React composition architecture | Codex skill |
| `.agents/skills/web-design-guidelines/SKILL.md` | UI review guidance | Codex skill |
| `.agents/skills/writing-guidelines/SKILL.md` | Prose/doc review guidance | Codex skill |
| `Service c0mpeoent promt.txt` | Reusable component integration prompt | Reusable prompt |
| `.trae/documents/conversion-optimization-plan.md` | Conversion improvement workflow | Workflow document |
| `plans/phase2-conversion-optimization.md` | Conversion implementation plan | Workflow document |
| `.trae/documents/intro-animation-improvement-plan.md` | Animation improvement workflow | Workflow document |
| `.trae/documents/expandable_gallery_plan.md` | Component/design planning | Workflow document |
| `.trae/documents/page-design-featured-work-dot-grid.md` | Design planning | Workflow document |
| `.trae/documents/prd-featured-work-dot-grid.md` | Product/design planning | Workflow document |
| `.trae/documents/technical-featured-work-dot-grid.md` | Technical planning | Workflow document |
| `docs/SEO-SECURITY-CHECKLIST.md` | Deployment, SEO, and rendering operating notes | Workflow/documentation |
| `DEPLOYMENT_NOTES.md` | Motion build deployment and fallback notes | Workflow/documentation |
| `ASSET_MANIFEST.md` | Required asset inventory | Workflow/documentation |
| `ASSET_PLACEHOLDERS.md` | Asset placeholder mapping | Workflow/documentation |
| `marketing-site/README.md` | Legacy/reference UI kit description | Documentation/reference only |
| `.mcp.json` | Local MCP server definition | Keep as config; not a skill/prompt/workflow doc |
| `skills-lock.json` | Skill source lockfile | Keep as machine metadata; not human workflow content |
