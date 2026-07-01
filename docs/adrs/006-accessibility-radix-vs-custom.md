# ADR-006: Accessibility — Radix UI Primitives over Custom Implementation

**Status:** Accepted  
**Date:** 2026-07-01

## Context

Complex interactive components (Dialog, Select, Tooltip, Accordion, Tabs, Popover) require a substantial amount of ARIA state management, keyboard interaction, and focus behavior to meet WCAG 2.1 AA standards. The question is whether to build these from scratch or use a headless primitive library.

## Decision

Use **Radix UI primitives** for complex components. Build simpler components (Button, Badge, Input, Checkbox, Switch) from scratch on top of native HTML elements.

## Rationale

### What Radix provides
- Correct WAI-ARIA patterns from the ARIA Authoring Practices Guide (APG)
- Keyboard navigation that matches user expectations across browsers
- Focus management (trap, restoration, initial focus) with edge case handling
- Screen reader announcements via live regions and semantic markup
- Portal rendering for correct stacking context and `inert` propagation
- Built-in support for controlled + uncontrolled state

### Why not custom implementations
Building a correct Dialog from scratch requires:
- Focus trap that handles dynamically added focusable elements
- `aria-modal="true"` with a polyfill for browsers that don't support `inert`
- Focus restoration to the trigger on close
- Body scroll lock without layout shift
- Correct `aria-haspopup`, `aria-expanded`, `aria-controls` attributes
- `Escape` key handling that doesn't conflict with nested dialogs

Getting all of this right is 500+ lines of code per complex component — and it's code that breaks in unexpected ways under edge cases. Radix has already done this work.

### Why not Headless UI / Ariakit / other alternatives
- Radix is the most widely deployed headless primitive library in the React ecosystem
- Component model (compound components with `Root`/`Trigger`/`Content`) aligns with Loony's architecture
- Tree-shakeable — each primitive is a separate package
- React 19 support is mature
- Actively maintained with security patches

### Division of responsibility
| Component type | Approach |
|---|---|
| Simple elements (Button, Badge, Input) | Native HTML + manual ARIA attrs |
| Form inputs (Checkbox, Switch, Label) | Radix (ARIA + keyboard) |
| Overlays (Dialog, Tooltip, Popover) | Radix (focus management + portal) |
| Navigation (Tabs, Accordion, Select) | Radix (keyboard nav + ARIA state) |
| Custom patterns (Toast, CommandPalette) | Radix + custom logic on top |

## Trade-offs

- Bundle size: each Radix package adds ~2–8 KB gzip. Acceptable for correctness.
- Abstraction cost: consuming Radix internals for custom behavior requires understanding their API.
- Vendor dependency: breaking changes in Radix affect our components.

## Consequences

- Radix packages are `dependencies` in `@loony/ui` (not peer dependencies) — consumers don't install them separately.
- Styling is 100% our responsibility — Radix is fully unstyled.
- Compound component structure follows Radix naming conventions where it matches ergonomics.
