# Loony

A React component ecosystem you install, own, and extend. It is built on React 19, TypeScript, Tailwind CSS v4, and Radix UI primitives.

Loony takes the "copy the source into your project" approach of shadcn/ui, but it uses its own architecture. That architecture includes a three-layer design-token system, a single `asChild` polymorphism strategy, and per-component entry points that keep server and client code separate.

> **Status: pre-alpha, unreleased.** Nothing is published to npm yet. Build, lint, typecheck, tests (278, including axe accessibility checks) and Storybook are all green. See [docs/TODO.md](docs/TODO.md) for open work and known gaps.

---

## What's in the box

### Packages

| Package | Description |
| --- | --- |
| [`@loony/ui`](packages/ui) | About 40 accessible components (Button, Dialog, Select, Tabs, Toast, Drawer, Command, Table, …), styled with Tailwind v4 + CVA, with Radix behaviour underneath |
| [`@loony/tokens`](packages/tokens) | Design tokens: primitive → semantic → component layers, shipped as CSS variables (light, dark, high-contrast), plus TypeScript exports |
| [`@loony/utils`](packages/utils) | `cn`, `Slot`/`Slottable`, `Portal`, `Presence`, `VisuallyHidden`, `createContext`/`createScopedContext`, `composeRefs`, and hooks (`useControllableState`, `useFocusTrap`, `useOutsideClick`, `useEscapeKey`, `useSize`, …) |
| [`@loony/icons`](packages/icons) | 26 tree-shakeable SVG icons, plus `IconBase` and `createIcon()` |
| [`@loony/cli`](packages/cli) | `loony` CLI: `init`, `add`, `list`, `diff`, `theme`, `scaffold` |
| [`@loony/typescript-config`](packages/typescript-config) | Shared `tsconfig` presets (base, react-library, next, node) |
| [`@loony/eslint-config`](packages/eslint-config) | Shared ESLint flat configs (base, react, next, storybook) |

### Apps

| App | Stack | Purpose |
| --- | --- | --- |
| [`apps/docs`](apps/docs) | Next.js 15 + Storybook 8 | Documentation site with live previews for 35+ components, token pages, theming, and a CLI guide |
| [`apps/www`](apps/www) | Next.js 15 + Motion | Marketing site (dark theme) |
| [`apps/playground`](apps/playground) | Vite + React 19 | Interactive sandbox that renders the components |

---

## Requirements

- Node.js **>= 22**
- pnpm **>= 9** (the repo pins `pnpm@9.15.0` via `packageManager`, so `corepack enable` is enough)

## Getting started

```bash
git clone <repo-url> loony && cd loony
pnpm install
pnpm build          # build every package (Turbo, dependency-ordered)
pnpm dev            # run all apps and package watchers in parallel
```

To run one app:

```bash
pnpm --filter @loony/docs dev         # docs site      → http://localhost:3000
pnpm --filter @loony/www dev          # marketing site → next free port
pnpm --filter @loony/playground dev   # playground     → http://localhost:5173
pnpm --filter @loony/docs storybook   # Storybook      → http://localhost:6006
```

### Workspace scripts

| Script | What it does |
| --- | --- |
| `pnpm build` | `turbo run build` across all packages and apps |
| `pnpm dev` | Every `dev` task, in parallel |
| `pnpm typecheck` | `tsc --noEmit` everywhere |
| `pnpm test` / `pnpm test:watch` | Vitest + React Testing Library (jsdom) |
| `pnpm test:coverage` | Tests with coverage floors enforced |
| `pnpm lint` | ESLint in each package |
| `pnpm check` / `pnpm format` | Biome lint + format (write mode) |
| `pnpm format:check` | Biome format check |
| `pnpm storybook` / `pnpm build-storybook` | Storybook |
| `pnpm changeset` | Record a change for the next release |
| `pnpm clean` | Delete build output and `node_modules` |

A pre-commit hook (installed by `pnpm install` via `simple-git-hooks`) runs `biome check --staged`.

---

## Using Loony in an app

> These steps describe the intended consumer experience. The packages are not published yet, so today they only work inside this monorepo.

### 1. Styles and tokens

In your global stylesheet (Tailwind v4):

```css
@import "@loony/ui/styles"; /* Tailwind + Loony tokens + base layer */
```

This one import sets the cascade-layer order, loads Tailwind, the tokens and `tw-animate-css`, and adds an `@source` for the component sources.

If you bring your own Tailwind entry, add the token preset and point Tailwind at the components:

```css
@import "tailwindcss";
@import "@loony/tokens/tailwind"; /* CSS variables + bg-accent, text-fg-muted, rounded-md, … */
@source "../node_modules/@loony/ui/src"; /* adjust to your stylesheet's location */
```

Tailwind v4 skips `node_modules` during automatic detection, so without `@source` none of the component classes are generated.

Theme switching is pure CSS with no runtime cost:

| Mode | How to enable |
| --- | --- |
| Dark | `class="dark"` or `data-theme="dark"` on `<html>`, or the OS `prefers-color-scheme` |
| High contrast | `class="high-contrast"` / `data-contrast="high"` |
| Reduced motion | Automatic: `--loony-duration-*` collapse under `prefers-reduced-motion` |

### 2. Components

```tsx
import { Button } from "@loony/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@loony/ui/dialog";

export function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Hello from Loony</DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
```

Each component has its own subpath export (`@loony/ui/<name>`), so bundlers and the RSC boundary only include what you import. A root barrel (`@loony/ui`) is also available.

### 3. Or own the source with the CLI

```bash
npx @loony/cli init          # writes loony.config.json
npx @loony/cli add button dialog
npx @loony/cli list
npx @loony/cli diff button   # compare your copy with upstream
npx @loony/cli theme --preset rounded --out ./src/styles/theme.css
npx @loony/cli scaffold my-widget
```

---

## Architecture

The key decisions are written up as ADRs in [`docs/adrs`](docs/adrs):

| ADR | Decision |
| --- | --- |
| [001](docs/adrs/001-monorepo-tooling.md) | pnpm workspaces + TurboRepo |
| [002](docs/adrs/002-styling-approach.md) | Tailwind CSS v4 + CSS variables + CVA + `tailwind-merge` |
| [003](docs/adrs/003-polymorphism-slot-vs-as.md) | `asChild` + `Slot` for polymorphism, no `as` prop |
| [004](docs/adrs/004-formatter-biome-vs-prettier.md) | Biome for formatting, ESLint kept for type-aware and plugin rules |
| [005](docs/adrs/005-token-layering.md) | Three token layers (primitive → semantic → component), colors in `oklch()` |
| [006](docs/adrs/006-accessibility-radix-vs-custom.md) | Radix primitives for complex widgets, native HTML for simple ones |
| [007](docs/adrs/007-animation-motion.md) | ~~Motion for animation~~, superseded by 009 |
| [008](docs/adrs/008-rsc-compatibility.md) | `"use client"` at the leaf, never in the barrel |
| [009](docs/adrs/009-css-first-animation.md) | CSS-first animation (`tw-animate-css` + motion tokens); Motion only where physics is required |

Conventions:

- **Tokens:** every themeable value is a `--loony-*` CSS variable. Components only reference the semantic and component layers.
- **Variants:** `cva()` definitions are exposed as props (`variant`, `size`, …). State is exposed through `data-*` attributes (`data-state`, `data-disabled`, `data-invalid`, …).
- **Compound components:** `Dialog` / `DialogTrigger` / `DialogContent` / `DialogHeader` / `DialogBody` / `DialogFooter`, and the same pattern for other composite widgets.
- **Exports:** named exports only, kebab-case file names, one folder per component.

### Repository layout

```
apps/
  docs/          Next.js docs site + Storybook config
  playground/    Vite sandbox
  www/           Marketing site
packages/
  ui/            Components (src/<component>/…)
  tokens/        Token sources, CSS layers, Tailwind @theme preset
  utils/         Primitives and hooks
  icons/         Icon components + generator script
  cli/           `loony` CLI and component registry
  eslint-config/ typescript-config/
docs/
  adrs/          Architecture Decision Records
  ROADMAP.md     219-milestone roadmap across 25 phases
  TODO.md        Audit of open work, bugs, and gaps
.changeset/      Changesets config
.github/         CI, release and canary workflows; PR/issue templates
```

---

## Releasing

Versioning uses [Changesets](https://github.com/changesets/changesets). `@loony/ui`, `@loony/icons`, `@loony/tokens`, and `@loony/utils` are *linked*, which means they move together.

1. Run `pnpm changeset` in your PR to describe the change.
2. When the PR merges to `main`, the **Release** workflow opens or updates a "Version Packages" PR.
3. Merging that PR publishes to npm (requires the `NPM_TOKEN` secret).
4. The **Canary** workflow publishes `@canary`-tagged builds.

---

## Project docs

- [Roadmap](docs/ROADMAP.md): phased plan (some statuses are out of date; see TODO)
- [Open work & known issues](docs/TODO.md)
- [ADRs](docs/adrs)
- [Original project brief](docs/prompt.md)
- [Contributing](CONTRIBUTING.md): setup, conventions, and the component Definition of Done
- [Security policy](SECURITY.md)

## License

[MIT](LICENSE)
