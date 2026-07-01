# Loony Design System — Roadmap

**100+ milestones across 25 phases.**

Legend: ✅ Done · 🚧 In Progress · 📋 Planned · 🔮 Future

---

## Phase 1: Foundation (Monorepo)

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 1 | Initialize git repository | ✅ | XS |
| 2 | Configure pnpm workspaces | ✅ | XS |
| 3 | Configure TurboRepo with task pipeline | ✅ | S |
| 4 | Root `.gitignore` and `.npmrc` | ✅ | XS |
| 5 | Root `package.json` with workspace scripts | ✅ | S |
| 6 | Define monorepo package structure | ✅ | S |

## Phase 2: Tooling

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 7 | `@loony/typescript-config` — shared TS configs (base, react-library, next, node) | ✅ | S |
| 8 | `@loony/eslint-config` — shared ESLint configs (base, react, next, storybook) | ✅ | M |
| 9 | Biome config (formatter + linter) | ✅ | M |
| 10 | Changesets configuration | ✅ | S |
| 11 | GitHub Actions CI workflow (lint, typecheck, test, build) | ✅ | M |
| 12 | GitHub Actions release workflow (Changesets → npm publish) | ✅ | M |
| 13 | GitHub Actions canary release workflow | ✅ | M |
| 14 | PR template and issue templates | ✅ | S |
| 15 | Architecture Decision Records (ADR) framework | ✅ | S |

## Phase 3: Design Tokens

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 16 | `@loony/tokens` package scaffolding | ✅ | S |
| 17 | Primitive color scales (oklch, full palettes) | ✅ | M |
| 18 | Primitive radius scale | ✅ | XS |
| 19 | Primitive spacing scale | ✅ | XS |
| 20 | Primitive typography tokens | ✅ | S |
| 21 | Primitive motion tokens | ✅ | S |
| 22 | Primitive elevation tokens | ✅ | S |
| 23 | Semantic color tokens (backgrounds, foregrounds, borders, states) | ✅ | L |
| 24 | CSS variable declarations — light mode (base.css) | ✅ | L |
| 25 | CSS variable declarations — dark mode (dark.css) | ✅ | M |
| 26 | CSS variable declarations — high contrast (high-contrast.css) | ✅ | M |
| 27 | Tailwind CSS v4 `@theme` preset | ✅ | M |
| 28 | TypeScript exports for all token scales | ✅ | S |
| 29 | Token documentation (design explorer) | 📋 | M |
| 30 | Style Dictionary integration (token export) | 🔮 | L |

## Phase 4: Utilities

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 31 | `@loony/utils` package scaffolding | ✅ | S |
| 32 | `cn()` — Tailwind-aware class merger | ✅ | XS |
| 33 | `composeRefs()` / `useComposedRefs()` | ✅ | S |
| 34 | `createContext()` / `createScopedContext()` | ✅ | M |
| 35 | `useCallbackRef()` | ✅ | S |
| 36 | `useControllableState()` | ✅ | M |
| 37 | `useEscapeKey()` | ✅ | S |
| 38 | `useEvent()` (useInsertionEffect-based) | ✅ | S |
| 39 | `useFocusTrap()` | ✅ | L |
| 40 | `useId()` | ✅ | XS |
| 41 | `useIsomorphicLayoutEffect()` | ✅ | XS |
| 42 | `useOutsideClick()` | ✅ | S |
| 43 | `usePrevious()` | ✅ | XS |
| 44 | `useSize()` (ResizeObserver) | ✅ | S |
| 45 | `Slot` / `Slottable` (asChild primitive) | ✅ | L |
| 46 | `Portal` + `usePortalContainer()` | ✅ | M |
| 47 | `Presence` (deferred unmount for animations) | ✅ | XL |
| 48 | `VisuallyHidden` | ✅ | S |
| 49 | Utility tests (>95% coverage) | 🚧 | M |
| 50 | `useReducedMotion()` hook | 📋 | S |
| 51 | `useMergeRefs()` alias | 📋 | XS |

## Phase 5: Icons

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 52 | `@loony/icons` package scaffolding | ✅ | S |
| 53 | `IconBase` SVG wrapper with a11y contract | ✅ | M |
| 54 | `createIcon()` factory | ✅ | S |
| 55 | Core icon set (26 icons) | ✅ | M |
| 56 | Icon generation script for bulk SVG import | ✅ | M |
| 57 | 200+ icon set (from open-source SVG set) | 📋 | L |
| 58 | Icon explorer documentation page | 📋 | M |
| 59 | Icon size guidelines documentation | 📋 | S |

## Phase 6: Core Components — Foundation

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 60 | `Button` — all variants, sizes, loading, asChild | ✅ | M |
| 61 | `IconButton` — accessible square icon button | ✅ | M |
| 62 | `Link` — accessible anchor with external link support | ✅ | M |
| 63 | `Text` — body text primitive | ✅ | S |
| 64 | `Heading` — semantic heading 1–6 | ✅ | S |
| 65 | `Code` — inline + block code | ✅ | S |
| 66 | `Kbd` — keyboard key indicator | ✅ | S |
| 67 | `Spinner` — loading indicator | ✅ | S |
| 68 | Button Storybook stories | ✅ | M |
| 69 | Button unit + a11y tests | ✅ | M |

## Phase 7: Form Components

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 70 | `Label` (Radix) | ✅ | S |
| 71 | `Input` — validation state, icons | ✅ | M |
| 72 | `Textarea` — resize control, validation | ✅ | S |
| 73 | `Checkbox` — indeterminate support | ✅ | M |
| 74 | `Switch` | ✅ | M |
| 75 | `Select` — full keyboard nav | ✅ | L |
| 76 | `Radio` / `RadioGroup` | 📋 | M |
| 77 | `Slider` | 📋 | L |
| 78 | `OTP` / `PinInput` | 📋 | L |
| 79 | `Combobox` / `Autocomplete` | 📋 | XL |
| 80 | `FileUpload` | 📋 | L |
| 81 | `DatePicker` | 🔮 | XL |
| 82 | `ColorPicker` | 🔮 | XL |
| 83 | `FormField` — wrapper with label, helper, error | 📋 | M |

## Phase 8: Layout

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 84 | `Stack` — flex layout primitive | ✅ | S |
| 85 | `Flex` — explicit flex utility | 📋 | S |
| 86 | `Grid` — CSS grid primitive | 📋 | S |
| 87 | `Container` — max-width centered wrapper | 📋 | XS |
| 88 | `Box` — general-purpose div primitive | 📋 | XS |
| 89 | `AspectRatio` | 📋 | S |
| 90 | `Spacer` — flexible space fill | 📋 | XS |

## Phase 9: Display Components

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 91 | `Badge` | ✅ | S |
| 92 | `Avatar` + `AvatarImage` + `AvatarFallback` | ✅ | M |
| 93 | `Card` + `CardHeader` + `CardBody` + `CardFooter` | ✅ | S |
| 94 | `Accordion` | ✅ | M |
| 95 | `Skeleton` | ✅ | S |
| 96 | `Table` — responsive data table | 📋 | L |
| 97 | `DataTable` — sortable, filterable | 📋 | XL |
| 98 | `List` | 📋 | S |
| 99 | `Tag` / `Chip` | 📋 | S |
| 100 | `Timeline` | 📋 | M |
| 101 | `Calendar` | 🔮 | XL |
| 102 | `Carousel` | 📋 | XL |
| 103 | `TreeView` | 📋 | XL |

## Phase 10: Feedback Components

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 104 | `Alert` — inline status messages | ✅ | M |
| 105 | `Toast` / Toaster — global notification system | 📋 | XL |
| 106 | `Progress` — linear + circular | 📋 | M |
| 107 | `EmptyState` — zero-data placeholder | 📋 | S |
| 108 | `LoadingOverlay` | 📋 | M |

## Phase 11: Overlay Components

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 109 | `Dialog` — modal with focus trap | ✅ | L |
| 110 | `Tooltip` | ✅ | M |
| 111 | `Popover` | ✅ | M |
| 112 | `Drawer` / `Sheet` | 📋 | L |
| 113 | `HoverCard` | 📋 | M |
| 114 | `ContextMenu` | 📋 | L |
| 115 | `DropdownMenu` | 📋 | L |

## Phase 12: Navigation

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 116 | `Tabs` | ✅ | M |
| 117 | `Breadcrumb` | 📋 | S |
| 118 | `Pagination` | 📋 | M |
| 119 | `Menubar` | 📋 | L |
| 120 | `NavigationMenu` (Radix) | 📋 | L |
| 121 | `Command` / `CommandPalette` | 📋 | XL |
| 122 | `Navbar` | 📋 | M |
| 123 | `Sidebar` | 📋 | L |

## Phase 13: Advanced Components

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 124 | `ScrollArea` | 📋 | M |
| 125 | `ResizablePanels` (SplitPane) | 📋 | L |
| 126 | `VirtualList` | 🔮 | XL |
| 127 | `InfiniteScroll` | 🔮 | L |
| 128 | `Masonry` | 🔮 | L |
| 129 | `RichTextEditor` | 🔮 | XL |

## Phase 14: CLI

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 130 | `loony init` command | ✅ | M |
| 131 | `loony add` command with dependency resolution | ✅ | L |
| 132 | `loony list` command | ✅ | S |
| 133 | `loony diff` command | ✅ | M |
| 134 | `loony theme` command | ✅ | M |
| 135 | `loony scaffold` command | ✅ | M |
| 136 | CLI plugin system | 🔮 | XL |
| 137 | `loony migrate` command | 📋 | L |
| 138 | Remote registry support | 🔮 | XL |

## Phase 15: Documentation

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 139 | Storybook configuration | ✅ | M |
| 140 | Storybook a11y addon integration | ✅ | S |
| 141 | Storybook themes addon (dark mode toggle) | ✅ | S |
| 142 | Introduction MDX page | ✅ | S |
| 143 | Button Storybook stories | ✅ | M |
| 144 | All component Storybook stories | 📋 | XL |
| 145 | Design token explorer | 📋 | L |
| 146 | Icon explorer | 📋 | M |
| 147 | Accessibility documentation per component | 📋 | L |
| 148 | Keyboard interaction diagrams | 📋 | M |
| 149 | Live playground integration | 📋 | XL |

## Phase 16: Testing

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 150 | Vitest setup across all packages | ✅ | M |
| 151 | axe-core integration helper | ✅ | S |
| 152 | `cn()` unit tests | ✅ | S |
| 153 | `composeRefs()` unit tests | ✅ | S |
| 154 | `Slot` unit tests | ✅ | M |
| 155 | `Button` unit + a11y tests | ✅ | M |
| 156 | All form component tests | 📋 | XL |
| 157 | All overlay component tests | 📋 | L |
| 158 | Visual regression tests (Chromatic) | 🔮 | L |
| 159 | E2E tests with Playwright | 📋 | XL |
| 160 | Coverage thresholds in CI | 📋 | S |

## Phase 17: Performance

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 161 | Bundle size baseline measurement | 📋 | S |
| 162 | Tree-shaking verification | 📋 | M |
| 163 | CSS output size analysis | 📋 | S |
| 164 | Lighthouse accessibility audit | 📋 | M |
| 165 | React DevTools profiler audit | 📋 | M |
| 166 | `sideEffects: false` verification | 📋 | S |
| 167 | Bundle size tracking in CI | 📋 | M |

## Phase 18: Accessibility Hardening

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 168 | WCAG 2.1 AA audit on all components | 📋 | XL |
| 169 | WCAG 2.1 AAA audit (where feasible) | 📋 | XL |
| 170 | VoiceOver (macOS) testing | 📋 | L |
| 171 | NVDA (Windows) testing | 📋 | L |
| 172 | High contrast mode testing (Windows) | 📋 | M |
| 173 | RTL layout support audit | 📋 | L |
| 174 | Focus visible in all themes | 📋 | M |
| 175 | Reduced motion in all animated components | 📋 | M |

## Phase 19: Animation

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 176 | Motion library integration | ✅ | S |
| 177 | Fade animation preset | 📋 | S |
| 178 | Scale animation preset | 📋 | S |
| 179 | Slide animation presets (4 directions) | 📋 | S |
| 180 | Collapse animation (accordion height) | 📋 | M |
| 181 | Modal enter/exit animation | ✅ | S |
| 182 | Toast slide-in animation | 📋 | M |
| 183 | Spring presets documentation | 📋 | S |
| 184 | Reduced-motion fallbacks for all animations | ✅ | M |

## Phase 20: Internationalization

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 185 | RTL CSS support (`dir="rtl"`) | 📋 | L |
| 186 | RTL-aware utilities | 📋 | M |
| 187 | Locale-aware date/number formatting hooks | 🔮 | L |
| 188 | i18n provider context | 🔮 | L |
| 189 | Accessible labels for icon-only components (i18n) | 📋 | M |

## Phase 21: Templates

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 190 | Next.js app template | 📋 | L |
| 191 | Vite + React template | 📋 | M |
| 192 | Dashboard layout template | 📋 | L |
| 193 | Landing page template | 📋 | M |
| 194 | Authentication forms template | 📋 | M |
| 195 | Settings page template | 📋 | S |

## Phase 22: Release

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 196 | v0.1.0 alpha release (all stable components) | 📋 | M |
| 197 | Changeset documentation | 📋 | S |
| 198 | npm provenance publishing | 📋 | S |
| 199 | Automated changelog | ✅ | S |
| 200 | Semantic versioning policy documentation | 📋 | S |
| 201 | Breaking change migration guide format | 📋 | S |

## Phase 23: Ecosystem

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 202 | Figma variable export | 🔮 | XL |
| 203 | Style Dictionary integration | 🔮 | L |
| 204 | Tokens Studio compatibility | 🔮 | L |
| 205 | VSCode extension (prop autocomplete) | 🔮 | XL |
| 206 | AI component generation (MCP integration) | 🔮 | XL |
| 207 | React Native adapter | 🔮 | XL |
| 208 | Codemods for breaking changes | 📋 | L |
| 209 | Web Components interop | 🔮 | XL |

## Phase 24: Community

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 210 | CONTRIBUTING.md | 📋 | S |
| 211 | CODE_OF_CONDUCT.md | 📋 | XS |
| 212 | Security policy | 📋 | S |
| 213 | Discord / discussion community | 🔮 | M |
| 214 | Office hours / issue triage cadence | 🔮 | M |

## Phase 25: Governance

| # | Milestone | Status | Complexity |
|---|-----------|--------|------------|
| 215 | Maintainer handbook | 📋 | M |
| 216 | Component acceptance criteria | 📋 | S |
| 217 | Deprecation policy | 📋 | S |
| 218 | LTS (Long Term Support) policy | 🔮 | M |
| 219 | Public roadmap publishing | 📋 | S |

---

## Summary

| Phase | Total | Done | In Progress | Planned | Future |
|-------|-------|------|-------------|---------|--------|
| Foundation + Tooling | 15 | 15 | 0 | 0 | 0 |
| Tokens | 15 | 13 | 0 | 2 | 1 |
| Utilities | 21 | 18 | 1 | 2 | 0 |
| Icons | 8 | 5 | 0 | 3 | 0 |
| Core UI | 80+ | 30 | 0 | 40 | 10+ |
| CLI | 9 | 6 | 0 | 1 | 2 |
| **Total** | **219** | **87** | **1** | **97** | **34** |
