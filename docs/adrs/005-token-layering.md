# ADR-005: Token Layering — Primitives → Semantic → Component

**Status:** Accepted  
**Date:** 2026-07-01

## Context

Design tokens need to support theming (brand colors, dark mode, high contrast) without requiring component-level changes. A flat token structure (`--blue-500`) maps too tightly to specific values and breaks when themes change.

## Decision

Use a **3-layer token architecture**:
1. **Primitive tokens** — raw values (`--loony-radius-md: 0.375rem`, primitive color scales)
2. **Semantic tokens** — purpose aliases (`--loony-color-accent`, `--loony-color-danger`)
3. **Component tokens** — component-scoped overrides (`--loony-radius-btn`, `--loony-radius-card`)

## Rationale

### Layer 1: Primitives
- Immutable scale values. Colors in `oklch()` for perceptually uniform interpolation.
- Never used directly by components.
- Provide the raw material for semantic aliases.

### Layer 2: Semantic
- Communicate intent: `--loony-color-accent` means "the brand color" not "blue-600".
- Components use only semantic tokens. A complete theme swap only touches this layer.
- Dark mode is implemented by overriding semantic tokens (not primitives) in `.dark {}`.

### Layer 3: Component
- Per-component overrides for personality: `--loony-radius-btn` defaults to `var(--loony-radius-md)` but can be set to `var(--loony-radius-full)` for pill-shaped buttons.
- Allows component customization without touching semantic colors.

### oklch() for colors
- Perceptually uniform — oklch lightness correlates with perceived brightness
- Allows `color-mix(in oklch, ...)` for on-the-fly hover/active variants
- Better dark mode handling — linear lightness adjustments look natural
- Wide gamut capable for P3 displays

## Consequences

- Theme files only need to define the semantic layer (~40 variables)
- Components never hardcode colors — `--loony-color-accent` works in any theme
- Design tools can export Style Dictionary JSON → primitives → semantic layer
