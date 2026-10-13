# ADR-007: Animation — Motion (motion.dev)

**Status:** Superseded by [ADR-009](009-css-first-animation.md) (2026-10-13). No component ever used Motion.  
**Date:** 2026-07-01

## Context

The design system needs animation for component state transitions (modal enter/exit, accordion expand/collapse, tooltip appear, skeleton pulse). The animation library choice affects bundle size, API ergonomics, and reduced-motion support.

## Decision

Use **Motion** (`motion.dev`, formerly Framer Motion) as the animation library.

## Rationale

### Why Motion over CSS-only animations
CSS transitions and `@keyframes` cover most use cases but have gaps:
- No way to interrupt a running animation mid-value and animate from the current position
- No spring physics — only cubic-bezier curves
- Conditional animations require class toggling or JS
- Deferred unmount (exit animations) requires manual Presence logic regardless

### Why Motion over alternatives
| Library | Bundle | Spring | Exit anim | React API |
|---------|--------|--------|-----------|-----------|
| **Motion** | 5 KB (mini) / 34 KB (full) | ✅ | ✅ | First-class |
| react-spring | 28 KB | ✅ | ⚠️ | Good |
| @react-spring/web | 20 KB | ✅ | ⚠️ | Good |
| CSS-only | 0 | ❌ | ❌ | None |

Motion's `motion/react-mini` bundle (5 KB gzip) covers the subset needed for UI components. The full bundle is only needed for advanced gestures and layout animations.

### Reduced-motion support
Motion respects `prefers-reduced-motion` automatically when using `useReducedMotion()`. We additionally enforce this at the token level — `--loony-duration-*` collapses to `1ms` under `@media (prefers-reduced-motion: reduce)` so even CSS transitions are affected.

### Where Motion is used
- Dialog / Drawer overlay fade + scale
- Toast slide-in / slide-out
- Tooltip fade
- Any component needing physics-based spring transitions

### Where Motion is NOT used
- Accordion height collapse — CSS `grid-template-rows: 0fr → 1fr` transition is simpler and performant
- Skeleton pulse — pure CSS `animate-pulse`
- Button hover/active states — CSS `transition` suffices
- Spinner rotation — pure CSS `@keyframes`

## Trade-offs

- Motion is an optional dependency. Components that use it import from `motion/react` — tree-shaking ensures consumers only pay for what they use.
- SSR: Motion components need a client boundary in RSC environments. All animated components are documented as client components.

## Consequences

- `motion` is added as a peer dependency in `@loony/ui`.
- Components with exit animations use the Loony `Presence` primitive (not AnimatePresence) to remain framework-portable.
- Animation tokens (`--loony-duration-*`, `--loony-ease-*`) drive all Motion `transition` configs.
