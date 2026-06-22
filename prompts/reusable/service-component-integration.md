# Reusable Prompt: Service Component Integration

## Source

Derived from:
- `Service c0mpeoent promt.txt`

## Purpose

Use this when integrating an externally sourced React component into an existing TypeScript + Tailwind codebase.

## Prompt

Inspect the repository first.

Then integrate the requested React component into the existing codebase.

Requirements:
- respect the repo's existing architecture and component structure
- confirm whether the project already supports TypeScript, Tailwind CSS, and the expected component layout
- identify the correct destination for UI components in this repo before copying anything
- list all required dependencies and only add the ones that are actually needed
- identify required assets, props, state, hooks, and responsive behavior
- adapt the component to local conventions instead of pasting blindly
- replace placeholder or stock assets only if the repo rules allow them
- explain where the component should live and why
- run the smallest relevant verification after integration

Questions to resolve before implementation:
1. What props or data should drive the component?
2. Does it need external state or context?
3. Are there required assets or icons?
4. What is the expected mobile behavior?
5. What is the best placement in the app?

Expected output:
1. dependency analysis
2. integration plan
3. implementation
4. verification results
