# ADR-009: Animation — CSS-first, Motion only where physics is required

**Status:** Accepted
**Date:** 2026-10-13
**Supersedes:** [ADR-007](007-animation-motion.md)

## Context

ADR-007 chose Motion (motion.dev) for component animation. In practice, every animated component was built with CSS instead:

- Radix primitives expose `data-state="open|closed"` and already defer unmounting until a CSS animation ends, so exit animations work without a JS presence layer.
- Overlays (Dialog, Drawer, Popover, Tooltip, HoverCard, Select, DropdownMenu, Toast) use `animate-in` / `animate-out` utilities (`fade-in-0`, `zoom-in-95`, `slide-in-from-*`), now provided by `tw-animate-css`.
- Accordion, Skeleton, Spinner, and Progress use CSS transitions and keyframes.

`motion` was listed as a dependency of `@loony/ui`, but no component imported it. Adopting Motion now would also conflict with ADR-008: Motion components must be client components, while CSS animations work in server-rendered markup.

## Decision

Animate with **CSS by default**:

- Enter/exit animations use `tw-animate-css` utilities keyed on Radix `data-state` / `data-side`.
- Durations and easings come from the motion tokens (`duration-(--loony-duration-*)`, `ease-(--loony-ease-*)`).
- Reduced motion is handled in CSS. The tokens collapse `--loony-duration-*` to `1ms`, components add `motion-reduce:` variants, and `@loony/ui/styles` shortens any remaining `animate-in` / `animate-out` to `1ms`. The duration is `1ms` rather than `0` so that `animationend` still fires and Radix unmounts closed content.

**Motion is not a dependency of `@loony/ui`.** A component may adopt it only when it needs something CSS cannot do. In that case the component's own ADR or PR must justify it, and Motion is added as an optional peer dependency. Acceptable reasons:

- Interruptible, velocity-preserving animation driven by gestures (for example, a swipe-to-dismiss Toast or a draggable Drawer)
- Spring physics that cannot be approximated with the `--loony-ease-spring-*` cubic-bezier tokens
- Layout/shared-element animation

## Consequences

- Zero JavaScript animation cost; animated components can stay server-renderable where nothing else requires a client boundary.
- No spring physics or mid-animation interruption for now. Overlays retarget via CSS when state flips, which is sufficient for open/close.
- `motion` was removed from `@loony/ui`. The marketing site (`apps/www`) keeps its own `motion` dependency; it is not part of the library.
- The animation-preset roadmap items (#177–#182) are implemented as CSS utilities/presets, not Motion variants.
