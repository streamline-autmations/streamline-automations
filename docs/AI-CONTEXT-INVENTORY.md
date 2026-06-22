# AI Context Inventory

This file maps all AI-tool and assistant-related context found during the Trae/Claude to Codex migration.

## Canonical Codex Context

Use these first:

- `AGENTS.md` - repo-level operating contract
- `.agents/skills/streamline-site/SKILL.md` - brand truth for Streamline site work
- `.agents/skills/cuberto-design-review/SKILL.md` - visual QA loop after meaningful visual work
- `.agents/skills/n8n-architect/SKILL.md` - n8n-as-code work
- `.github/agents/n8n-architect.agent.md` - VS Code/GitHub Copilot compatible n8n agent

## Detailed Project Memory

- `CLAUDE.md`

Use it for brand, copy, pricing, portfolio truth, workflow rules, and architecture notes.

Do not treat Claude-specific slash commands or prompt tags as Codex requirements.

## Trae Context

- `.trae/documents/*` - historical plans and specs
- `.trae/skills/*` - mirrored skills

Core mirrored skills checked during inspection were identical to `.agents/skills/*`, so `.agents/skills/*` is canonical.

## Claude Context

- `.claude/settings.local.json` - local Claude permissions and MCP settings, historical only
- `.claude/skills/*` - mirrored skills
- `.claudeignore` - useful as a reference for files AI tools should avoid reading by default
- `claude-overnight-log.txt` - historical session log, not a current instruction source

## Continue Context

- `.continue/skills/*` - mirrored skills
- `.continue/mcpServers/new-mcp-server.yaml` - generic MCP server template, not active project truth

## Kilo / Bolt Context

- `.kilo/plans/*` - historical planning, especially the white-minimal redesign plan
- `.kilo/package.json` and lockfile - local Kilo plugin metadata
- `.bolt/config.json` - Bolt Vite React template marker
- `.bolt/prompt` - broad design preference prompt, superseded by Streamline brand rules

## MCP / Tooling Context

- `.mcp.json` - local MCP server config currently listing `shadcn`
- `.n8nac/ai-context.json` - generated n8n-as-code context snapshot
- `.playwright-mcp/*` - local Playwright MCP logs and snapshots; do not migrate into canonical docs

## Prompt Context

- `Service c0mpeoent promt.txt` - raw prompt with unsafe stock-image guidance
- `prompts/reusable/service-component-integration.md` - Codex-safe normalized version

Use the normalized prompt.

## Migration Decision

Keep all original tool folders for backup.

Going forward:

1. `AGENTS.md` decides the operating rules.
2. `CLAUDE.md` supplies detailed project memory.
3. `.agents/skills/*` supplies reusable task skills.
4. `docs/`, `prompts/`, `workflows/`, and `skills/` are human-readable indexes.

