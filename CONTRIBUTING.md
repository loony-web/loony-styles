# Contributing to Loony

Thanks for helping. This guide covers setup, the conventions the codebase follows, and the checklist a component needs before it's done.

## Setup

Requirements: Node.js ≥ 22 and pnpm 9 (`corepack enable` picks up the pinned version).

```bash
pnpm install          # also installs the pre-commit hook (biome check --staged)
pnpm build
pnpm dev              # all apps + package watchers
```

| Task | Command |
| --- | --- |
| Lint + format (Biome) | `pnpm check` (write) / `pnpm biome check .` |
| ESLint (type-aware) | `pnpm lint` |
| Typecheck | `pnpm typecheck` |
| Tests | `pnpm test`, or `pnpm test:coverage` to enforce coverage floors |
| Storybook | `pnpm --filter @loony/docs storybook` |
| One package | `pnpm --filter @loony/ui test` |

CI runs the same commands. Run `pnpm turbo run build typecheck lint test` before opening a PR.

## Workflow

- Branch from `main`. Use [Conventional Commits](https://www.conventionalcommits.org) (`feat(ui): …`, `fix(cli): …`, `docs: …`).
- Keep PRs focused, and fill in the PR template checklist.
- Changes to the published packages need a changeset (`pnpm changeset`). Publishing to npm is paused, but the changesets become the changelog.
- Architectural decisions go in an ADR under [`docs/adrs`](docs/adrs). If a change contradicts an ADR, write a new ADR that supersedes it rather than quietly diverging.

## Conventions

These conventions are enforced by review, and partly by Biome and ESLint.

**Files and exports**

- Use kebab-case file names, one folder per component: `packages/ui/src/<name>/<name>.tsx` plus `index.ts`.
- Use named exports only. The folder `index.ts` re-exports the public API, and every component gets a subpath in the `@loony/ui` `exports` map.
- Export the props type for every component (`ButtonProps`).

**Polymorphism ([ADR-003](docs/adrs/003-polymorphism-slot-vs-as.md))**

- Use `asChild` with `Slot` from `@loony/utils`. Never add an `as` prop. The one exception is `Heading`'s semantic `as="h1"…"h6"`.

**Styling ([ADR-002](docs/adrs/002-styling-approach.md), [ADR-005](docs/adrs/005-token-layering.md))**

- Use Tailwind v4 utilities and CVA for variants. Prefer variant names `variant`, `size`, and `tone`.
- Every colour, radius, shadow, and duration comes from a `--loony-*` token, written in v4 syntax: `bg-(--loony-color-accent)`, `text-(length:--loony-text-sm)`. Never hard-code colours in components, and never use the v3 `bg-[--var]` form, which compiles to invalid CSS.
- Expose state through data attributes: `data-state`, `data-disabled`, `data-orientation`, `data-size`, `data-variant`, `data-invalid`.

**Server/client boundaries ([ADR-008](docs/adrs/008-rsc-compatibility.md))**

- Add `"use client"` only to files that use hooks, context, browser APIs, inline event handlers, or Radix/cmdk. Never put it in a barrel.
- A server component may *render* a client component but cannot *call* a function exported from a client module. Keep shared helpers in modules without the directive.

**Animation ([ADR-009](docs/adrs/009-css-first-animation.md))**

- Animate with CSS first: `tw-animate-css` utilities keyed on `data-state`, timed by the motion tokens, with a `motion-reduce:` fallback.

**Accessibility**

- Follow the WAI-ARIA Authoring Practices pattern for the widget. Use Radix for complex behaviour ([ADR-006](docs/adrs/006-accessibility-radix-vs-custom.md)).
- Icon-only controls need a `label`. Dialog-role surfaces (Dialog, Popover) need an accessible name.

## Adding a component: Definition of Done

A component is done only when every box is ticked:

- [ ] `packages/ui/src/<name>/<name>.tsx` + `index.ts`, with props and types exported
- [ ] Root barrel (`src/index.ts`) and `package.json` `exports` updated
- [ ] Entry in [`packages/ui/registry.json`](packages/ui/registry.json): files, component `dependencies`, `npmDependencies`, and ARIA roles. The CLI registry test fails if an import isn't covered.
- [ ] Stories in `<name>.stories.tsx` (`tags: ["autodocs"]`, variant controls)
- [ ] Unit and interaction tests, including keyboard behaviour and focus management
- [ ] An axe case in [`src/a11y.test.tsx`](packages/ui/src/a11y.test.tsx)
- [ ] Docs page under `apps/docs/src/app/docs/components/<name>`, with an accessibility and keyboard section
- [ ] `"use client"` only if required, and dark and high-contrast themes checked in Storybook
- [ ] `pnpm turbo run build typecheck lint test` and `pnpm test:coverage` pass

## Reporting issues

Use the issue templates. For security problems, follow [SECURITY.md](SECURITY.md) instead of opening an issue.
