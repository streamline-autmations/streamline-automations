---
name: cuberto-design-review
description: Visual quality loop for the Streamline Automations site. Use whenever Christiaan says "review the design", "match cuberto", "does this look premium", "visual check", or after any visual change that needs verification. Runs the dev server, screenshots with Playwright at desktop 1440 + mobile 390, compares against the Cuberto references in /design-refs/cuberto/, produces a ranked gap list, applies fixes, and repeats until premium. Defers to streamline-site and CLAUDE.md on ALL brand tokens.
---

# Cuberto Design Review — Visual Match Loop

Refine a page or section of the Streamline site to Cuberto-level craft. The references in
`/design-refs/cuberto/` are the **craft/feel target, NOT a pixel clone** — match the quality
and rhythm, keep the brand tokens from the streamline-site skill and CLAUDE.md.

**Brand authority:** streamline-site + CLAUDE.md win on every colour, font, spacing, and copy
decision. This skill never invents tokens. White-dominant + single purple accent (#7B3FE4) is locked.

## The loop

1. **Serve.** Make sure the dev server is running (`npm run dev`); grab the local URL.
2. **Capture.** Use the Playwright MCP (or Chrome DevTools MCP) to open the target page/section.
   Screenshot at:
   - Desktop: 1440px wide
   - Mobile: 390px wide
   Wait for animations and scroll-reveals to settle before capturing — no half-rendered shots.
   For scroll-driven sections, capture at multiple scroll positions.
3. **Compare** against `/design-refs/cuberto/` on these axes, ranked by visual impact (not nitpicks):
   - **Whitespace & breathing room** — the #1 thing separating premium from cheap
   - **Type scale, weight,** and the one Instrument Serif italic accent word
   - **Section rhythm & contrast** — is the dark ink section landing? Is it surgical (1–2 max), not overused?
   - **Motion feel** — reveals, magnetism, cursor states, scroll smoothness
   - **Alignment, grid discipline, edge consistency**
4. **Gap list.** Output a short ranked list. For each gap: the exact Tailwind/GSAP change that closes it.
5. **Fix.** Apply the changes. Re-screenshot. Compare again.
6. **Stop** after 3 passes OR when it reads as genuinely premium. Then summarise any remaining
   gaps that need a real asset or Christiaan's decision — don't fake them.

## Constraints

- Animate `transform` + `opacity` only
- Respect `prefers-reduced-motion` (skip pins/scrubs, render end state)
- `gsap.matchMedia()` simplification under 768px — mobile stays 60fps
- Custom cursor and heavy motion OFF on touch/coarse pointers
- Never invent colours or fonts outside CLAUDE.md / streamline-site
- Don't add decorative clutter to "match" Cuberto — steal the craft, not the maximalism
- Min 44px tap targets; no horizontal scroll; `min-h-[100svh]` not `min-h-screen`

## Definition of done

Seen-and-matched, not "should look right". A change is done only when the post-fix screenshot
visibly reads premium on both desktop 1440 and mobile 390.
