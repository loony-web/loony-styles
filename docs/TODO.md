# Open Work, Bugs & Gaps

This is a living audit of the repository. It was last updated on 2026-10-13, after the "make CI green / fix styling / normalize packages / fix CLI" pass. Each item was verified by running the tooling or by reading the code, and file references point to the place to start.

Priority: **P0** = broken or blocks CI/consumers · **P1** = core functionality or spec gaps · **P2** = completeness/polish · **P3** = future.

Current baseline (`pnpm turbo run build typecheck lint test --concurrency=1`):

| Command | Result |
| --- | --- |
| `pnpm biome check .` | ✅ (warnings only) |
| `pnpm build` | ✅ |
| `pnpm typecheck` | ✅ |
| `pnpm lint` (ESLint) | ✅ (warnings only) |
| `pnpm test` | ✅ 278 tests: ui 106 (incl. 30 axe), cli 112, icons 34, utils 26 |
| `storybook build` | ✅ 129 stories across 39 components |
| `loony add` / `loony diff` in a non-monorepo project | ✅ files copied, consumer typechecks |

---

## P0: Bugs

- [ ] **Running `build` and `typecheck` in parallel is flaky for the Next apps.** `next build` rewrites `.next/types` while `tsc --noEmit` reads it, so `pnpm turbo run build typecheck` can fail on `@loony/docs` / `@loony/www`. CI runs them in separate jobs, so it isn't affected. Fix this by making the app `typecheck` tasks depend on `build`, or by running `next typegen` first ([turbo.json](../turbo.json)).

## P1: Architecture decisions to settle

- [ ] **ADR-007 (Motion) vs. reality.** Overlay enter/exit animations now come from CSS (`tw-animate-css`, imported in [styles/index.css](../packages/ui/src/styles/index.css)). `motion` is still a dependency of `@loony/ui`, but nothing imports it. Either amend ADR-007 to record CSS-first animation (and drop the dependency), or adopt Motion where springs and interruption matter. The ADR also says `motion` should be a *peer* dependency.
- [ ] **ADR-003 (`asChild` only) is violated by `Box`.** It takes an `as` prop ([layout/box.tsx](../packages/ui/src/layout/box.tsx)). Switch it to `asChild`, or document the exception.
- [ ] **ADR-001 rationale conflict.** `.npmrc` sets `node-linker=hoisted`, which brings back the phantom dependencies that ADR-001 says pnpm avoids. Justify the setting in an ADR, or move to the isolated linker. A real example: the docs' Next tsconfig and Storybook only work because packages are hoisted.
- [ ] **Ship the component registry with `@loony/ui`.** The CLI hard-codes it ([registry.ts](../packages/cli/src/utils/registry.ts)), so the metadata can drift from the installed sources. Generate a `registry.json` into `@loony/ui` and have the CLI read it from the resolved package. The docs fallback page ([components/[slug]/page.tsx](../apps/docs/src/app/docs/components/[slug]/page.tsx)) repeats name, description, and status and could read the same file.
- [ ] **Popover/HoverCard content is `role="dialog"` and needs an accessible name** (axe `aria-dialog-name`). Either document `aria-label` as required, or accept a `label` prop like `IconButton` does.

## P1: Missing functionality from the brief ([prompt.md](prompt.md))

### Utilities (`@loony/utils`)
- [ ] `createVariants()`
- [ ] `createPolymorphicComponent()` (or document that `createSlottable` replaces it)
- [ ] `useReducedMotion()` (roadmap #50), `useMergeRefs()` alias (#51)
- [ ] Tests for the hooks, `Portal`, `createContext`, `useFocusTrap`, and `VisuallyHidden` (`cn`, `composeRefs`, `Slot`, and `Presence` are covered)

### Components not yet built
- **Form:** Combobox, Autocomplete, OTP/PinInput, ColorPicker, DatePicker, TimePicker, FileUpload, and standalone HelperText / ErrorMessage
- **Feedback:** LoadingOverlay, circular Progress
- **Overlay:** Sheet (decide whether it is an alias of Drawer), ContextMenu
- **Navigation:** Navbar, Sidebar, NavigationMenu, Menubar, CommandPalette (only `Command` + `CommandDialog` exist)
- **Display:** Chip, List, Timeline, DataTable, TreeView, Calendar, Carousel
- **Advanced:** Data Grid, VirtualList, InfiniteScroll, Masonry, RichTextEditor, Resizable / SplitPane

### Per-component deliverables (the "Every Component Must Include" rule)

| Missing | Components |
| --- | --- |
| **Unit/interaction tests** (11/38 have them) | avatar, breadcrumb, card, command, drawer, dropdown-menu, empty-state, form-field, hover-card, icon-button, label, layout/*, link, pagination, popover, scroll-area, select, skeleton, slider, spinner, stack, table, tag, textarea, toast, tooltip, typography |
| **Axe a11y tests** | command, drawer, dropdown-menu, hover-card, scroll-area, select, toast, tooltip, layout/* (the rest are in [a11y.test.tsx](../packages/ui/src/a11y.test.tsx)) |
| **Keyboard / focus tests** | most interactive components |
| **MDX docs** | every component (no `.mdx` in `packages/ui`) |
| **`*.types.ts` / `*.styles.ts` split** | every component except Button (or amend the folder spec) |

### Icons (`@loony/icons`)
- [ ] `raw-svgs/` directory, which the generator script expects, is missing
- [ ] SVGO optimisation in the generator
- [ ] Expand the set from 26 to 200+ icons (#57), icon explorer page (#58), sizing guidelines (#59)

### Tokens / theming
- [ ] Spring presets as tokens, with docs (#183)
- [ ] Brand-token layer and documented multi-brand theming
- [ ] Interactive token explorer (#29/#145); the docs pages are static tables
- [ ] Style Dictionary / Tokens Studio export (🔮)

### Animation (Phase 19)
- [ ] Decide the ADR-007 question above, then write the fade/scale/slide/collapse/toast presets (#177–#182)

### CLI
- [ ] `sync`/`update`, `migrate` (#137), `doctor`/`validate`, `a11y`, `upgrade`, and `icons` commands
- [ ] Plugin system (🔮 #136), remote registry (🔮 #138)
- [ ] `init` only *prints* the CSS import; it could edit `globals.css` after confirmation
- [ ] `diff` shells out to the system `diff` binary, which Windows doesn't have. Use a JS diff instead.

### Docs site
- [ ] Full-text search, version switching, auto-generated prop tables, registry-driven status badges
- [ ] Keyboard-interaction diagrams and per-component accessibility sections (#147/#148)
- [ ] Playground integration (#149)
- [ ] Pages for components that exist but have no doc page (command; flex/grid/container/box/aspect-ratio/spacer are only covered by the fallback page)
- [ ] The header highlights both "Docs" and "Components" on component pages (prefix match on `/docs`) ([docs-header.tsx](../apps/docs/src/components/docs-header.tsx))

### Testing & quality (Phases 16–18)
- [ ] Run `vitest --coverage` in CI so the thresholds in `ui/vitest.config.ts` are enforced; the Codecov upload currently gets nothing
- [ ] Playwright E2E (#159), visual regression (🔮 #158)
- [ ] Bundle-size baseline and CI tracking with size-limit (#161/#167); the CI step only runs `du -sh`
- [ ] Tree-shaking verification (#162), CSS output analysis (#163)
- [ ] WCAG AA/AAA audits, screen readers (VoiceOver/NVDA), forced-colors mode, RTL, and focus-visible in every theme (#168–#175)
- [ ] Remaining lint warnings (cognitive complexity in CLI commands and `use-focus-trap`, index keys in docs/www demos)

### i18n (Phase 20)
- [ ] RTL support and RTL-aware utilities (#185/#186)
- [ ] Localisable built-in labels (Pagination "Previous/Next", Dialog "Close", Breadcrumb ellipsis) (#189)

---

## P2: Project hygiene / documentation

- [ ] `LICENSE` file (MIT is declared in `package.json`, but the file is missing)
- [ ] READMEs for each package and app (Installation, Quick Start, API, Recipes, FAQ, Troubleshooting, Migration, Changelog)
- [ ] `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md` (#210–#212)
- [ ] Issue templates for feature requests and component proposals, plus `config.yml`
- [ ] Release docs: changeset guide, semver policy, and migration-guide format. Add npm provenance to `release.yml` (canary already sets it) (#197–#201)
- [ ] Coding-standards doc (file naming, data attributes, variant conventions)
- [ ] Templates (Phase 21) and Governance docs (Phase 25)

## P3: Future

React Native adapter, Figma plugin/variable export, Vue/Solid/Svelte adapters, Web Components interop, MCP / AI component generation, codemods (#208), remote registries & marketplace, component analytics, LTS policy, edge-runtime verification, VSCode extension.

---

## Resolved (2026-10-13)

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
