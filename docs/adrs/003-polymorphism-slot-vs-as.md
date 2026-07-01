# ADR-003: Polymorphism — `asChild` + Slot over `as` prop

**Status:** Accepted  
**Date:** 2026-07-01

## Context

Components like Button need to render as different elements in different contexts:
- As `<button>` in most cases
- As `<a>` when used for navigation
- As a framework router's `<Link>` component

Two established patterns exist: the `as` prop and the `asChild` (Slot) prop.

## Decision

Use the **`asChild` + Slot** pattern. No `as` prop.

## Rationale

### Problems with the `as` prop
1. **Type safety is extremely hard.** A generic `as: ElementType` prop requires complex TypeScript gymnastics (`ComponentPropsWithAs<T>`) that is fragile and leaks into every component's type definition.
2. **Merge conflicts.** When `as={Link}` and `href` are passed simultaneously, the component must manually forward all props correctly — implementation complexity grows with each wrapped component type.
3. **Double rendering risk.** Without careful implementation, `<Button as="a" href="...">` can end up with nested `<a>` inside `<a>`.

### Benefits of `asChild` + Slot
1. **Type safety is free.** The child component's own props are its types. `<Button asChild><a href="...">Link</a></Button>` — `a`'s types are used for `href`.
2. **Simple implementation.** The `Slot` primitive merges props and refs; the component doesn't need special-case logic for different element types.
3. **Framework-agnostic.** Works with Next.js `Link`, React Router `Link`, Remix `Link`, or any future framework — the component never needs to know about them.
4. **Composable.** Multiple `asChild` components can be nested naturally.

## Trade-offs

- Slightly more verbose at the call site: `<Button asChild><a href="...">Link</a></Button>` vs `<Button as="a" href="...">Link</Button>`
- Requires understanding the Slot pattern (documented)

## Consequences

Every component that supports polymorphism exposes `asChild?: boolean`.
The `Slot` utility in `@loony/utils` is the single implementation shared by all.
