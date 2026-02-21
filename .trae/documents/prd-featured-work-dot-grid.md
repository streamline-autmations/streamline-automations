## 1. Product Overview
A “Featured Work” section showcasing featured projects with a dot-grid background.
On desktop the dot-grid is interactive/animated; on mobile it is static for performance and usability.

## 2. Core Features

### 2.1 Feature Module
Our requirements consist of the following main pages:
1. **Home**: Featured Work section, dot-grid background behavior, featured project content (including a second project for “Ameli” design site).

### 2.2 Page Details
| Page Name | Module Name | Feature description |
|-----------|-------------|---------------------|
| Home | Featured Work section container | Render section heading and supporting copy; position content above decorative dot-grid; keep content readable over background. |
| Home | Featured projects list | Display at least 2 featured projects; include the new “Ameli” design site as the second item; keep a consistent content schema (title + short description + visual/thumbnail). |
| Home | Dot-grid background (desktop) | Animate dots on desktop; respond to pointer movement with a subtle interaction (e.g., local brightening/scale near cursor); run smoothly without impacting scrolling. |
| Home | Dot-grid background (mobile) | Render a static dot-grid (no animation, no pointer listeners); keep visual parity with desktop but simplified. |
| Home | Responsiveness & accessibility | Preserve layout and legibility across breakpoints; honor reduced-motion preferences; ensure decorative background is ignored by screen readers. |

## 3. Core Process
- Visitor opens the Home page and scrolls to the Featured Work section.
- On desktop, moving the cursor over the section causes the dot-grid to animate/react subtly.
- On mobile, the