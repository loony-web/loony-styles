# Open Work, Bugs & Gaps

This is a living audit of the repository. It was last re-checked on 2026-10-13 on branch `chore/local-dev-tasks` (off `main` at `cc16fcc`), after the local-development pass. Each item was verified by running the tooling or by reading the code, and file references point to the place to start.

Priority: **P0** = broken or blocks CI/consumers · **P1** = core functionality or spec gaps · **P2** = completeness/polish · **P3** = future.

**Focus: local development.** Publishing to npm is paused (see [Deferred: publishing](#deferred-publishing)).

Current baseline:

| Check | Result |
| --- | --- |
| `pnpm turbo run build typecheck lint test:coverage` (parallel) | ✅ 28/28 tasks, **404 tests**: ui 188 (41 axe cases), cli 132, utils 50, icons 34 |
| Coverage (ratchet floors enforced) | ui 92% stmts · utils 85% · cli 69% · icons 100% |
| `pnpm biome check .` / ESLint (packages + apps) | ✅ warnings only |
| `pnpm --filter @loony/docs smoke` | ✅ 52 docs pages return 200 |
| `storybook build` | ✅ 137 stories across 40 components |
| GitHub CI on `main` (`cc16fcc`) | ✅ [run 38340310915](https://github.com/loony-web/loony-styles/actions/runs/38340310915). This branch's workflow changes (coverage, smoke test, Node 22, action majors) haven't run on GitHub yet. |
| GitHub Release workflow | ⏸ manual-only (`workflow_dispatch`), so it no longer fails on every push |

## Next up (recommended order)

1. **Push this branch and open a PR.** That runs the updated CI for the first time, including the PR-only Storybook job.
2. **Manual GitHub settings:**
   - enable *Private vulnerability reporting* (SECURITY.md relies on it)
   - consider branch protection on `main` that requires the CI checks
3. **Fix the Storybook dark theme.** The component switches to dark but the page background stays white (see P1).
4. **Next components, using Combobox as the template** ([CONTRIBUTING.md](../CONTRIBUTING.md) Definition of Done): Sheet/ContextMenu (they reuse existing primitives), then DatePicker/Calendar and DataTable.
5. **Docs pages** for Command and the layout primitives, which currently use the fallback page, plus accessibility/keyboard sections on the other component pages (Combobox's is the model).

---

## P0: Bugs

_None known._

## P1: CI and tooling

- [ ] **The Storybook CI job has never run.** It's PR-only and every change so far went straight to `main`. The PR in "Next up" #1 fixes this.
- [ ] **Storybook dark theme only half applies.** In the dark theme, components render dark but the canvas/page background stays white, so `withThemeByDataAttribute` isn't landing `data-theme="dark"` where the body background reads it ([.storybook/preview.tsx](../apps/docs/.storybook/preview.tsx)). Verify the attribute's target element, or switch to `withThemeByClassName` with `.dark`.
- [ ] **ADR-001 vs `node-linker=hoisted`.** Hoisting brings back phantom dependencies. This pass found two (`@testing-library/user-event` and `jest-dom` used by `@loony/utils` without being declared) and fixed them. Either move to the isolated linker (the Next tsconfig and Storybook currently rely on hoisting), or record the trade-off in an ADR.
- [ ] Remaining lint warnings: cognitive complexity in CLI commands, `use-focus-trap` and the docs syntax highlighter, and array-index keys in demos.

## P1: Missing functionality from the brief ([prompt.md](prompt.md))

### Components not yet built
- **Form:** Autocomplete (or a free-text mode of Combobox), multi-select Combobox, OTP/PinInput, ColorPicker, DatePicker, TimePicker, FileUpload, standalone HelperText / ErrorMessage
- **Feedback:** LoadingOverlay, circular Progress
- **Overlay:** Sheet (decide whether it is an alias of Drawer), ContextMenu
- **Navigation:** Navbar, Sidebar, NavigationMenu, Menubar, CommandPalette (`Command` + `CommandDialog` exist)
- **Display:** Chip, List, Timeline, DataTable, TreeView, Calendar, Carousel
- **Advanced:** Data Grid, VirtualList, InfiniteScroll, Masonry, RichTextEditor, Resizable / SplitPane

### Per-component deliverables still missing

| Missing | Components |
| --- | --- |
| **Docs accessibility + keyboard section** | every component except Combobox |
| **Dedicated docs page** | Command, Flex, Grid, Container, Box, AspectRatio, Spacer (fallback page only) |
| **MDX docs** | every component (no `.mdx` in `packages/ui`), or amend the requirement now that the docs site exists |
| **`*.types.ts` / `*.styles.ts` split** | every component except Button, or amend the folder spec |

### Icons (`@loony/icons`)
- [ ] `raw-svgs/` directory, which the generator script expects, is missing
- [ ] SVGO optimisation in the generator
- [ ] Expand the set from 26 to 200+ icons (#57), add an icon explorer page (#58) and sizing guidelines (#59). Combobox needed a "chevrons-up-down" icon that doesn't exist.

### Tokens / theming
- [ ] Spring presets as tokens, with docs (#183)
- [ ] Brand-token layer and documented multi-brand theming
- [ ] Interactive token explorer (#29/#145); the docs pages are static tables
- [ ] Style Dictionary / Tokens Studio export (🔮)

### Animation (Phase 19, CSS-first per [ADR-009](adrs/009-css-first-animation.md))
- [ ] Named CSS presets (fade/scale/slide/collapse/toast) documented as utilities (#177–#182)

### CLI
- [ ] `sync`/`update`, `migrate` (#137), `doctor`/`validate`, `a11y`, `upgrade`, and `icons` commands
- [ ] Plugin system (🔮 #136), remote registry (🔮 #138)
- [ ] `init` only *prints* the CSS import; it could edit `globals.css` after confirmation
- [ ] `diff` shells out to the system `diff` binary, which Windows doesn't have. Use a JS diff instead.
- [ ] `theme --out` resolves relative to the process cwd, and there is no `--cwd` option

### Docs site
- [ ] Full-text search, version switching, auto-generated prop tables, registry-driven status badges
- [ ] Keyboard-interaction diagrams (#147/#148)
- [ ] Playground integration (#149)

### Testing & quality (Phases 16–18)
- [ ] Playwright E2E (#159), visual regression (🔮 #158). Combobox was checked in a real browser with an ad-hoc Playwright script, but nothing is committed.
- [ ] Bundle-size baseline and CI tracking with size-limit (#161/#167); the CI step only runs `du -sh`
- [ ] Tree-shaking verification (#162), CSS output analysis (#163)
- [ ] WCAG AA/AAA audits, screen readers (VoiceOver/NVDA), forced-colors mode, RTL, and focus-visible in every theme (#168–#175)
- [ ] Raise the coverage floors toward the brief's 95%. The weakest areas are the interactive CLI prompt branches and the `@loony/ui` function count (63%).

### i18n (Phase 20)
- [ ] RTL support and RTL-aware utilities (#185/#186)
- [ ] Localisable built-in labels: Pagination "Previous/Next", Dialog/Drawer "Close", Breadcrumb "More pages", Combobox defaults (#189)

---

## P2: Project hygiene / documentation

- [ ] `CODE_OF_CONDUCT.md`: adopt the Contributor Covenant once there's an enforcement contact. This needs an address from the maintainer, so it wasn't guessed.
- [ ] READMEs for each package and app (Installation, Quick Start, API, Recipes, FAQ, Troubleshooting, Migration, Changelog)
- [ ] Release docs: changeset guide, semver policy, migration-guide format (#197–#201)
- [ ] Templates (Phase 21) and Governance docs (Phase 25)

## P3: Future

React Native adapter, Figma plugin/variable export, Vue/Solid/Svelte adapters, Web Components interop, MCP / AI component generation, codemods (#208), remote registries & marketplace, component analytics, LTS policy, edge-runtime verification, VSCode extension.

## Deferred: publishing

Paused on 2026-10-13 to focus on local development. The Release and Canary workflows are manual-only until this resumes.

- [ ] **Pick a new npm scope.** The `loony` npm org exists and isn't ours, so `@loony/*` can't be published. Free candidates (checked 2026-10-13) include `@loony-web` (matches the GitHub org), `@loonykit`, and `@loonyui`, plus `loony-cli` / `create-loony` for the CLI. Renaming touches every package name, import, the registry and the docs.
- [ ] Add `NPM_TOKEN` or npm trusted publishing (OIDC), and provenance in `release.yml`
- [ ] Decide whether `@loony/eslint-config` / `@loony/typescript-config` are published
- [ ] Re-enable the `push` triggers in [release.yml](../.github/workflows/release.yml) / [canary.yml](../.github/workflows/canary.yml)

## Decided not to do

- **`createVariants()`, `createPolymorphicComponent()`, and the `useMergeRefs()` alias** from the brief. They would be second names for `cva`, `createSlottable` (ADR-003) and `useComposedRefs`. The brief also asks for explicit APIs without magic, and one name per concept follows that better.

---

## Resolved: local-development pass (2026-10-13)

### CI and workflows
- The Release and Canary workflows are now manual-only, so they no longer fail on every push.
- Coverage works:
  - added `@vitest/coverage-v8`, `test:coverage` scripts and a Turbo task
  - CI enforces per-package ratchet floors and uploads reports as an artifact; the failing Codecov step was removed
  - the earlier CLI "53%" was inflated by the registry data array living in `registry.ts`
- Workflows use Node 22 and current action majors: `checkout@v7`, `setup-node@v7`, `pnpm/action-setup@v5` (reads `packageManager`), `upload-artifact@v7`. `engines.node` is now `>=22`.
- The `build`/`typecheck` race in the Next apps is fixed with per-app Turbo overrides, so typecheck also checks the generated route types.
- **Docs smoke test:**
  - `pnpm --filter @loony/docs smoke` crawls every docs page and runs in CI
  - the first version hung because killing `pnpm exec` left `next-server` holding the stdio pipe; it now runs Next directly in its own process group, with a watchdog
- **ESLint for the apps:**
  - `docs`, `www` and `playground` now lint
  - the shared `next` config referenced `@next/next` rules without registering or installing the plugin, so it could never load

### Decisions
- [ADR-009](adrs/009-css-first-animation.md): CSS-first animation, superseding ADR-007. The unused `motion` dependency was removed from `@loony/ui`.
- ADR-003: `Box` and `Text` now use `asChild` instead of `as`. `Heading`'s semantic `as="h1…h6"` is recorded as the one exception.

### Registry
- **Single source of truth:**
  - `packages/ui/registry.json` now ships and is exported with `@loony/ui`
  - the CLI reads the installed package's registry, so the metadata always matches the sources it copies, and bundles a copy for `loony list` before install
  - the docs fallback page reads name, description, status and ARIA roles from it, and the richer docs descriptions were merged in
- **Bug while wiring the docs:** the fallback page called a function exported from a `"use client"` module, which gave a runtime 500 on 7 pages. It's fixed, and the new smoke test now guards this bug class.

### New
- **Combobox:**
  - searchable single-select built on Popover and Command
  - meets the full Definition of Done: stories, 13 unit/keyboard/axe tests, a docs page with an accessibility section, a registry entry, and a real-browser check in light and dark
- `useReducedMotion()` (SSR-safe, live updates) in `@loony/utils`.
- `toast()` / `dismissToast()` / `removeToast()` functions for raising toasts outside components.
- `LICENSE`, `SECURITY.md`, `CONTRIBUTING.md` (setup, conventions and the component Definition of Done), and issue templates for feature requests and component proposals.

### Bugs found and fixed
- **Toasts never appeared.** `useToast()` kept per-component state, so `<Toaster />` rendered its own empty list. It is now a shared store via `useSyncExternalStore`.
- **`CommandDialog`** had no accessible name (axe `aria-dialog-name`) and no `DialogTitle`. It now takes a `label`, rendered as a visually hidden title.
- **Search fields had no accessible name:** cmdk labels its input via `aria-labelledby`, which overrides `aria-label`. Combobox and CommandDialog now pass `Command`'s `label`, and Command documents it.
- **`FormField`** never connected the helper/error text to the control. It now wires `aria-describedby` and `aria-invalid`. `Input` and `Textarea` also style a native `aria-invalid`, as their docs already claimed.
- **`BreadcrumbEllipsis`** hid its "More pages" label inside `aria-hidden`.
- **`Breadcrumb`** accepted a `separator` prop that did nothing; it was removed (customise via `BreadcrumbSeparator` children).
- **Docs header:** "Components" was only active on the Button page, and "Docs" was active everywhere. It is now matched by section, with `aria-current="page"`.
- **Docs samples:**
  - wrong install paths for the layout primitives
  - unnamed `PopoverContent` examples
  - a nonexistent `Heading` `size` prop
  - Popover's own JSDoc example would have failed axe
- Missing `.js` extensions on three relative imports (breaks Node ESM resolution of `dist`).

### Tests
- From 278 to 404 tests:
  - every `@loony/ui` component now has unit/interaction tests, and the axe suite has 41 cases
  - utils hooks are covered (focus trap, outside click, escape key, controllable state, size, ids, context, portal)
  - the CLI commands are tested against temp projects with mocked prompts and processes
- jsdom gaps are stubbed in the UI test setup: `ResizeObserver`, `scrollIntoView` and pointer capture.

## Resolved: audit pass (2026-10-13)

### Merged
- The audit-fixes branch (11 commits, `48cb679..cc16fcc`) is fast-forwarded into `main` and pushed. The first green GitHub CI run is [38340310915](https://github.com/loony-web/loony-styles/actions/runs/38340310915); the previous `main` commit `b541e38` failed CI.

### CI and tooling
- `biome.json` had 3 invalid rule names. It is fixed, and the codebase is formatted and import-sorted.
- ESLint never ran because packages had no flat configs and ESLint 10 was auto-installed. ESLint is now pinned to `^9`, each package has an `eslint.config.js`, the type-aware rules use `projectService`, and `no-duplicate-imports` is off because Biome owns imports.
- `simple-git-hooks` is installed, with a pre-commit hook that runs `biome check --staged`.
- The CI a11y job passed `--grep` (invalid) and ran zero axe tests. It now runs `-t a11y` against a real axe suite.
- The canary workflow now uses Changesets snapshot releases, skips the publish when nothing is pending, and has provenance enabled.
- The placeholder `your-org/loony` was replaced with `loony-web/loony-styles`.
- Build tsconfigs compiled tests and stories into `dist/`, so they would have been published. They are now excluded.

### Tests
- 4 failing tests were fixed: the Slot style assertion, two Accordion tests that assumed visibility instead of unmounting, and the Input className target.
- Icons and the CLI had no tests, so `pnpm test` failed. There are now 34 icon tests and 112 CLI tests, including a registry-integrity suite.

### Bugs found and fixed
- **`Presence`** called `useComposedRefs` after an early return (a Rules-of-Hooks crash when `present` toggles).
- **`Slot` and `Presence`** read the deprecated `element.ref`, which made React 19 warn on every `asChild` render. They now use the internal `getElementRef`.
- **`Slider`**'s accessible name was on the root, not on the `role="slider"` thumb (axe `aria-input-field-name`). Range thumbs are now labelled "n of N".
- **`BreadcrumbPage`** used `role="link" aria-disabled` instead of `aria-current="page"`.
- **CLI registry:** 18 components were missing `class-variance-authority`.
- **`loony add`:**
  - It used `require.resolve` in an ES module.
  - The `@loony/ui` package didn't publish the component sources.
  - It never installed `@loony/*` dependencies.
  - It printed wrong import paths.
- **`loony diff`** did nothing when called without a component name.

### Styling pipeline
- About 675 Tailwind v3 `[--var]` classes compiled to invalid CSS under v4. They are migrated to `(--var)`, `text-(length:…)`, and `font-(family-name:…)`.
- `tailwind-merge` v2 couldn't merge the v4 syntax. It is upgraded to v3.
- **Cascade layer order:** the `loony.*` layers were declared after Tailwind's, so the Loony reset (for example `border-width: 0` and `a { color: inherit }`) overrode every utility. The full order is now declared up front.
- No app scanned `packages/ui` for classes. `@source` is now added to `@loony/ui/styles`.
- The playground had no Tailwind processing at all. The `@tailwindcss/vite` plugin is added.
- The overlay animation classes (`animate-in`, `zoom-in-95`, …) had no plugin behind them. `tw-animate-css` is added, with a reduced-motion override.
- Five tokens that components referenced didn't exist: `--loony-color-{danger,warning,success,info}-border` and `surface-hover`. They are added to every theme.
- **Docs app:** it used a hand-copied token set, so its dark-mode toggle never worked. It now imports `@loony/ui/styles`.
- `@loony/tokens/tailwind` exported a TS string. It is now a real `@theme inline` CSS file with v4 theme keys.

### Storybook
- **Story discovery:** the globs pointed at the wrong paths, so 0 stories were found.
- **Rendering:** every story crashed with "React is not defined" because of the classic JSX runtime.
- 24 components had no stories. Storybook now builds 129 stories.

### Package structure
- ADR-008 was violated: there was `"use client"` on every file. It is removed from 23 server-safe components, verified with a Next.js server-component build.
- Every component folder now has an `index.ts`, and the `exports` map is consistent and verified, with no missing targets.
- `@loony/tokens` `"."` export pointed at raw TS. It now points at `dist`.
- `sideEffects` is declared in every package.
