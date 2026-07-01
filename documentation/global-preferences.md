# Global Preferences

This file captures stable project-wide preferences that matter in Codex sessions.

## Working style
- Read local instructions before acting
- Prefer narrow edits over broad refactors
- Keep existing architecture unless a task requires change
- Verify meaningful changes instead of stopping at theory

## Coding preferences
- React + TypeScript
- Functional components only
- Tailwind utility classes only
- No CSS modules
- No styled-components
- Avoid inline styles unless already justified by local patterns
- Named imports only
- Avoid unnecessary dependencies

## Design preferences
- White-minimal visual system with a single purple accent
- Cuberto-level motion craft, not Cuberto visual maximalism
- White-dominant pages
- Max 1-2 dark sections per page
- DM Sans primary type
- Instrument Serif italic as a sparing accent
- Pill CTAs
- Large whitespace, restrained surfaces, hairline borders

## Motion preferences
- One GSAP registration source: `src/lib/gsap-setup.ts`
- One Lenis system only
- Framer Motion for light interaction
- GSAP for pinned/scrubbed choreography
- Respect `prefers-reduced-motion`
- Disable cursor enhancements on touch/coarse pointers

## Copy preferences
- First person singular
- Casual, direct South African founder voice
- No corporate fluff
- No lorem ipsum
- No fake testimonials or invented metrics

## Data and backend preferences
- Never use Supabase `.select('*')`
- Avoid N+1 fetches
- Select only needed columns
- Clean up subscriptions

## Verification preferences
- Default validation: `npm run lint`, `npm run build`
- Visual work is not done until checked at desktop and mobile sizes

## Source files
- `AGENTS.md`
- `CLAUDE.md`
- `.agents/skills/streamline-site/SKILL.md`
