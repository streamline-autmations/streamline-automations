# Legacy Plans Index

This folder indexes historical Trae/Kilo planning artifacts.

These files are useful context, but they are not current source-of-truth rules. They must not override:

1. `AGENTS.md`
2. `CLAUDE.md`
3. `.agents/skills/streamline-site/SKILL.md`
4. current live code in `src/site/*`

## Trae Plans

- `.trae/documents/conversion-optimization-plan.md`
  - Historical conversion plan.
  - Contains ideas such as hero proof, metrics, pricing refinements, FAQs, and trust signals.
  - Use carefully: some suggestions mention placeholders or invented metrics, which conflict with current repo rules.

- `.trae/documents/intro-animation-improvement-plan.md`
  - Historical intro animation performance and polish plan.
  - Useful for understanding older animation ambitions.
  - Must be reconciled with current reduced-motion, mobile fallback, and active v2 app rules.

- `.trae/documents/expandable_gallery_plan.md`
  - Historical plan for an expandable gallery and Ameli page updates.
  - Treat as reference only unless the current task targets that exact experience.

- `.trae/documents/page-design-featured-work-dot-grid.md`
- `.trae/documents/prd-featured-work-dot-grid.md`
- `.trae/documents/technical-featured-work-dot-grid.md`
  - Historical featured-work dot-grid specs.
  - Current brand rules discourage decorative clutter and old dark theme drift, so reuse only if explicitly requested and visually validated.

## Kilo Plan

- `.kilo/plans/1777367051608-stellar-panda.md`
  - Historical white-minimal redesign plan.
  - Many principles match the current brand direction, but the active implementation has moved to `src/site/*`.
  - Do not follow its legacy route/file instructions blindly.

## Other Related Plans

- `plans/phase2-conversion-optimization.md`
  - Older conversion optimization backlog.
  - Some claims and metrics may be outdated or conflict with "real numbers only."

## How To Use These Plans

1. Read the current repo instructions first.
2. Use legacy plans as idea history, not commands.
3. Check whether the file paths still point to the active app surface.
4. Reject anything involving fake metrics, fake testimonials, stock images, or old theme drift.
5. Verify visually if the resulting work changes the site.

