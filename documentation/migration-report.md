# Claude To Codex Migration Report

## Scope

This repository was inspected to migrate Claude-era workspace context into a Codex-compatible structure without deleting or modifying legacy instruction sources.

## Successfully Migrated

### Project instructions
- Preserved in root `AGENTS.md`
- Project-specific guidance still sourced from `CLAUDE.md`

### Skills
- Canonical Codex-facing skills already existed in `.agents/skills/*`
- New root `skills/` folder created as an inventory layer rather than duplicating skill bodies

### Prompts
- Reusable prompt artifact identified:
  - `Service c0mpeoent promt.txt`
- New root `prompts/` folder created with a normalized prompt document

### Workflows
- Development and design planning artifacts identified across:
  - `docs/*`
  - `plans/*`
  - `.trae/documents/*`
- New root `workflows/` folder created with categorized summaries

### Documentation
- New root `documentation/` folder created
- Preference, workflow, and migration docs added

### Claude migration analysis
- Claude-only session mechanics identified and documented as non-portable
- Editor-specific mirrors identified and excluded from canonical Codex structure

## Could Not Be Migrated Directly

### Claude-only mechanics
- `/compact`
- `/plan`
- `/clear`
- `ultrathink`

These are product-specific behaviors, not reusable repo instructions.

### Claude permissions config
- `.claude/settings.local.json`

This is useful as historical reference, but not a Codex-native workspace contract.

### Editor mirrors
- `.continue/skills/*`
- `.trae/skills/*`
- `.claude/skills/*`

These are mirrors of the same concepts, not canonical Codex content.

## Recommended Replacements

| Claude-era item | Codex replacement |
|---|---|
| Slash commands | Plain-language task requests |
| `ultrathink` | Stronger model + higher effort level |
| `.claude/settings.local.json` | Root `AGENTS.md` + Codex runtime/tool permissions |
| Mirrored skill copies | Canonical `.agents/skills/*` plus root inventory docs |

## Canonical Sources Going Forward

Use this order:
1. `AGENTS.md`
2. `CLAUDE.md`
3. `.agents/skills/*`
4. `.github/agents/*`
5. repo docs and plans

## Structure Created

```text
skills/
prompts/
workflows/
documentation/
```

## Notes

- Existing files were not deleted.
- Existing instruction sources were not overwritten.
- Duplicate mirrored content was intentionally not recopied into the new structure.
