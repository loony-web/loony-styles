# ADR-002: Styling — Tailwind CSS v4 + CSS Variables + CVA

**Status:** Accepted  
**Date:** 2026-07-01

## Context

The design system needs a styling approach that:
1. Produces minimal CSS in production
2. Supports theming without runtime overhead
3. Is understandable to any React developer
4. Integrates naturally with user projects

## Decision

Use **Tailwind CSS v4** utility classes + **CSS custom properties** for all theming + **CVA** for variant management.

## Rationale

### Tailwind CSS v4 over v3 / CSS-in-JS / Vanilla CSS
- v4 uses `@layer` natively — eliminates specificity wars
- Config lives in CSS (`@theme`) not JS — co-located with usage
- JIT is the only mode — no config bloat
- CSS nesting is native in v4
- No runtime overhead — pure static CSS output

### CSS Variables for theming over Tailwind-only tokens
- Variables cascade — a single `:root` override changes the whole theme
- Zero runtime cost — no React context, no JS computation
- Works in any CSS context (pseudo-elements, inline styles, non-React code)
- `prefers-color-scheme` media query can override without JS

### CVA over custom variant logic
- `cva()` produces a typed callable that autocompletes variant props
- Keeps variant definitions co-located with the component file
- `defaultVariants` document the intended default usage
- Compatible with `tailwind-merge` for className override safety

### `tailwind-merge` over raw className concatenation
- Prevents duplicate Tailwind class application (e.g. `p-4 p-6` → `p-6`)
- Makes consumer className overrides safe
- Pairs with `clsx` for conditional logic

## Consequences

- Components cannot be used without Tailwind CSS in the consumer's project
- All theming happens at the CSS variable level — JavaScript themes are not supported
- Component source code contains CSS class names directly (intentional — copy-paste ownership model)
