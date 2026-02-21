# Page Design Spec — Featured Work (Home)

## Global Styles (desktop-first)
- Layout system: CSS Grid for section layout + Flexbox within cards; background layer positioned via absolute stacking.
- Design tokens (suggested, align to existing site):
  - Background: near-black / dark neutral
  - Foreground text: white/near-white
  - Accent: single brand color for hovers/focus rings
  - Typography: H2/H3 scale for section title and project titles; body for summaries
  - Buttons/links: underline or subtle border; on hover increase contrast; on focus show 2px outline.

## Page Meta Information (Home)
- Title: Home
- Description: Portfolio homepage featuring selected work.
- Open Graph: `og:title`, `og:description`, `og:type=website` (use existing site values if already defined).

## Section: Featured Work

### Page Structure
- Full-width section with constrained content max-width.
- Two layers:
  1) Background “DotGrid” layer (decorative)
  2) Foreground content layer (heading + project cards)

### Sections & Components
1) Section header
- Elements: eyebrow (optional), H2 “Featured Work”, 1–2 lines supporting copy.
- Spacing: generous top/bottom padding; align left with content grid.

2) Featured projects list
- Layout (desktop): 2-column card grid (or 1 large + 1 secondary, if that matches existing style).
- Layout (tablet/mobile): single-column stack.
- Each project card (minimum):
  - Title
  - Short description
  - Thumbnail/visual
  - Optional metadata row (e.g., role/type) only if already present in current design
- Content requirement: include 2 projects; the second is “Ameli” design site.

3) DotGrid background
- Positioning: `position:absolute; inset:0;` behind content; clip to section bounds.
- Desktop animated behavior:
  - Trigger: pointer movement over section.
  - Response: local dot highlight/scale around cursor; subtle continuous motion is acceptable.
  - Motion limits: low amplitude; avoid distracting the card content.
- Mobile static behavior:
  - Render a non-animated dot grid (SVG or CSS background) with reduced density.
  - No pointer listeners; no animation loop.
- Accessibility:
  - `aria-hidden="true"`, `pointer-events:none`.
  - Ensure text/card surfaces remain readable (add gradient overlay or card background if needed).

### Interaction States
- Project card hover (desktop): raise elevation or border contrast; thumbnail slight zoom (optional).
- Focus (keyboard): visible focus ring on interactive card/link.
- Reduced motion: disable dot-grid animation and use static grid.

### Responsive Behavior
- Breakpoints:
  - Desktop: animated dot-grid enabled; multi-column cards.
  - Mobile: static dot-grid; single-column cards; tighter spacing.
- Maintain consistent alignment between header and card grid across breakpoints.
