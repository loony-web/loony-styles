# Build a Modern React Component System From Scratch

You are a senior staff-level frontend architect, design systems engineer, accessibility expert, library author, DevOps engineer, technical writer, and open-source maintainer.

Your objective is to build a complete production-grade React component ecosystem inspired by the developer experience of shadcn/ui, but **not a clone**.

This project must become a first-class open-source design system that developers can install, customize, own, extend, and maintain.

Think like the creators of Radix UI, shadcn/ui, Ark UI, Chakra UI, Mantine, Base UI, React Aria, Panda CSS, and Material UI—but produce an original architecture.

---

# Primary Goal

Create an entire component ecosystem including:

* UI library
* CLI
* Documentation website
* Playground
* Theme system
* Design tokens
* Icons
* Utilities
* Animations
* Accessibility layer
* Testing infrastructure
* Storybook
* Release pipeline
* Versioning
* Documentation
* Examples
* Templates
* Developer tooling

Everything should be built from scratch with production quality.

Never take shortcuts.

Every architectural decision must be justified.

---

# Non Goals

Do NOT recreate shadcn/ui line by line.

Do NOT copy:

* folder structure
* API naming
* implementation
* documentation
* code
* styling
* utilities
* CLI

Instead:

Study why those decisions work.

Then design something cleaner, more scalable, and more maintainable.

---

# Inspiration

Use ideas from:

* shadcn/ui
* Radix UI
* React Aria
* Ark UI
* Chakra UI
* Mantine
* Base UI
* Headless UI
* Material UI
* Ant Design
* Panda CSS
* Tailwind Labs

Never copy.

Always redesign.

---

# Target Audience

The library should be useful for:

* React developers
* TypeScript developers
* startup teams
* enterprise teams
* design systems
* agencies
* freelancers
* OSS maintainers

The API should prioritize:

* discoverability
* composability
* accessibility
* type safety
* extensibility
* maintainability
* performance

---

# DX Principles

Every API should feel:

* predictable
* intuitive
* composable
* tree-shakeable
* typed
* consistent
* documented
* testable

Avoid magic.

Prefer explicit APIs.

Provide excellent autocomplete.

Every public API must have documentation.

---

# Tech Stack

Framework

* React 19
* TypeScript

Styling

* Tailwind CSS v4
* CSS Variables
* CSS Layers
* CSS Nesting
* CVA
* tailwind-merge

Accessibility

* Radix UI primitives where appropriate
* Build custom implementations when Radix introduces unnecessary abstraction or bundle weight (e.g. simple layout primitives, typography, stack, flex, box, spacer, container, helper utilities)

Animation

* Motion (motion.dev)

Testing

* Vitest
* React Testing Library
* Playwright (optional for E2E)
* Axe accessibility testing

Documentation

* Storybook
* MDX
* Interactive playground

Linting

* ESLint
* Biome (preferred formatter) or Prettier (choose one and document why)

Release

* Changesets
* GitHub Actions
* npm publishing

Package Manager

* pnpm

Monorepo

* TurboRepo

---

# Monorepo Structure

```
apps/
    docs
    playground

packages/
    ui
    icons
    tokens
    cli
    utils
    eslint-config
    typescript-config
```

Design the architecture for long-term scalability.

Separate public APIs from internal utilities.

No circular dependencies.

---

# Coding Standards

Define and enforce standards for:

## Naming

* Components
* Hooks
* Utilities
* Contexts
* Files
* CSS variables
* Tokens

## Export Conventions

Prefer named exports.

Minimize default exports.

Provide clean barrel files.

Avoid namespace exports.

---

## File Naming

Use consistent kebab-case or PascalCase and justify the choice.

---

## Folder Layout

Each component should contain:

```
Button/
    button.tsx
    button.test.tsx
    button.stories.tsx
    button.mdx
    button.types.ts
    button.styles.ts
    index.ts
```

Adjust if a better architecture exists.

---

## Ref Patterns

Support:

* forwardRef (where required)
* React 19 ref model compatibility
* imperative handles only when justified

---

## Slot Usage

Design a Slot API.

Explain when Slot should be preferred.

---

## Compound Components

Support patterns such as:

Dialog

```
Dialog
DialogTrigger
DialogContent
DialogHeader
DialogBody
DialogFooter
```

Maintain consistent APIs.

---

## Polymorphism

Support:

```
as
```

or

```
asChild
```

Choose one primary strategy and explain trade-offs.

Provide utilities to implement it consistently.

---

## Data Attributes

Standardize attributes like:

```
data-state
data-disabled
data-orientation
data-size
data-variant
```

---

## CSS Variables

Everything themeable must use CSS variables.

---

## Variant Conventions

Create a consistent variant system.

Support:

* variant
* size
* tone
* color
* radius
* elevation

---

# Utility Layer

Build production-ready utilities:

* cn()
* composeRefs()
* createVariants()
* createPolymorphicComponent()
* createContext()
* createScopedContext()
* useControllableState()
* useComposedRefs()
* useId()
* useCallbackRef()
* usePrevious()
* useEvent()
* useSize()
* useIsomorphicLayoutEffect()
* useOutsideClick()
* useEscapeKey()
* useFocusTrap()
* Portal
* Presence
* Slot
* VisuallyHidden

Each utility must include:

* rationale
* implementation
* tests
* documentation
* examples
* performance notes

---

# Theme System

Design a scalable token architecture.

Support:

## Colors

Primitive tokens

Semantic tokens

State tokens

Surface tokens

Brand tokens

---

## Radius

Tokenized radius system.

---

## Typography

Families

Weights

Sizes

Line heights

Tracking

---

## Motion

Durations

Curves

Spring presets

---

## Elevation

Shadow tokens

Overlay tokens

Backdrop tokens

---

## CSS Variables

Generate all tokens as CSS variables.

---

## Dark Mode

Native support.

---

## High Contrast

Accessible themes.

---

## Custom Themes

Allow user-defined themes with zero runtime cost.

---

# Icons Package

Build an icon package with:

* tree shaking
* TypeScript
* SVG optimization
* icon generation scripts
* accessibility defaults
* sizing system
* color inheritance

---

# Animation System

Create reusable motion primitives.

Support:

* fade
* scale
* slide
* collapse
* pop
* tooltip
* modal
* accordion
* toast

Honor reduced motion.

Keep bundle size small.

---

# Accessibility Standards

Every component must comply with:

* WCAG AA (minimum), AAA where practical
* Keyboard navigation
* Correct focus management
* ARIA authoring practices
* Screen readers
* Reduced motion
* High contrast
* Touch targets
* RTL compatibility
* Internationalization readiness

Document accessibility considerations for every component.

---

# Component Taxonomy

Implement the following categories in order of dependency.

## Foundation

* Button
* IconButton
* Link
* Typography
* Text
* Heading
* Code
* Kbd

## Form

* Input
* Textarea
* Checkbox
* Switch
* Radio
* Select
* Combobox
* Autocomplete
* OTP
* PinInput
* Slider
* ColorPicker
* DatePicker
* TimePicker
* FileUpload
* FormField
* Label
* HelperText
* ErrorMessage

## Layout

* Stack
* Flex
* Grid
* Container
* Box
* AspectRatio
* Spacer

## Feedback

* Alert
* Toast
* Progress
* Spinner
* Skeleton
* EmptyState
* LoadingOverlay

## Overlay

* Dialog
* Drawer
* Sheet
* Popover
* Tooltip
* HoverCard

## Navigation

* Tabs
* Breadcrumb
* Pagination
* Navbar
* Sidebar
* NavigationMenu
* Command
* CommandPalette
* DropdownMenu
* ContextMenu
* Menubar

## Display

* Card
* Badge
* Avatar
* Chip
* Tag
* List
* Timeline
* Table
* DataTable
* Accordion
* TreeView
* Calendar
* Carousel

## Advanced

* Data Grid
* Virtual List
* Infinite Scroll
* Masonry
* Rich Text Editor
* Split Pane
* Resizable
* ScrollArea

Implement components in dependency order, avoiding duplicated logic.

---

# Every Component Must Include

Every component must contain:

* design rationale
* API philosophy
* TypeScript definitions
* accessibility documentation
* keyboard interactions
* ARIA mapping
* examples
* Storybook stories
* tests
* edge cases
* performance notes
* SSR considerations
* React Server Components compatibility notes
* styling guide
* theming guide
* migration notes (if applicable)

No exceptions.

---

# Documentation Standards

Every package must include:

* README
* Installation
* Quick Start
* API Reference
* Examples
* FAQ
* Accessibility
* Performance
* Troubleshooting
* Recipes
* Customization
* Migration
* Changelog

The documentation site should support:

* full-text search
* live playgrounds
* copyable examples
* dark mode
* version switching
* component status badges
* autogenerated prop tables
* design token explorer
* icon explorer
* accessibility notes
* keyboard interaction diagrams

---

# Testing Standards

Each component requires:

* unit tests
* interaction tests
* accessibility tests
* snapshot tests (only where justified)
* keyboard navigation tests
* focus tests
* edge case coverage
* regression tests

Aim for >95% meaningful coverage.

---

# Performance Standards

Measure and optimize:

* bundle size
* tree shaking
* render performance
* hydration
* memoization
* CSS output
* runtime allocations
* unnecessary re-renders

Document performance decisions.

---

# CLI

Create a first-class CLI capable of:

* initializing projects
* installing components
* syncing updates
* generating themes
* generating icons
* scaffolding components
* validating project configuration
* migrating between versions
* checking accessibility
* upgrading dependencies

Design the CLI to be extensible via plugins.

---

# Release Process

Use:

* Changesets
* semantic versioning
* GitHub Actions
* automated changelog generation
* npm publishing
* release previews
* canary releases

Document the full release workflow.

---

# Versioning

Follow Semantic Versioning.

Maintain migration guides for breaking changes.

Support long-term maintenance.

---

# Roadmap

Create a roadmap with **100+ milestones**, grouped into phases:

1. Foundation
2. Tooling
3. Tokens
4. Utilities
5. Theme Engine
6. Documentation
7. Core Components
8. Form Components
9. Overlay Components
10. Navigation
11. Data Display
12. Advanced Components
13. CLI
14. Playground
15. Testing
16. Performance
17. Accessibility
18. Internationalization
19. Animation
20. Ecosystem
21. Templates
22. Release
23. Community
24. Governance
25. Long-term Maintenance

Each milestone should include:

* objective
* dependencies
* acceptance criteria
* estimated complexity
* deliverables

---

# Definition of Done

A task is complete only when:

* implementation is finished
* TypeScript is fully typed
* tests pass
* accessibility verified
* Storybook stories added
* documentation complete
* examples added
* bundle impact reviewed
* performance reviewed
* lint passes
* formatting passes
* CI passes
* code reviewed
* changelog updated

---

# Code Review Checklist

Review every pull request for:

* architecture
* naming consistency
* API ergonomics
* type safety
* accessibility
* performance
* maintainability
* bundle size
* documentation
* tests
* edge cases
* backwards compatibility
* developer experience

Reject incomplete implementations.

---

# Refactoring Checklist

Before refactoring:

* identify duplicated logic
* preserve public APIs
* maintain test coverage
* benchmark before/after
* document changes
* verify accessibility
* verify bundle size
* verify performance

---

# Future Enhancements

Plan for:

* React Native compatibility
* Figma plugin
* Design token export (Style Dictionary, Tokens Studio)
* AI-assisted component generation
* Visual regression testing
* Multi-brand theming
* CSS extraction
* RSC-first components
* Edge runtime compatibility
* Web Components interoperability
* Vue/Solid/Svelte adapters
* MCP integration
* CLI plugin ecosystem
* Component analytics
* Codemods
* Remote registries
* Marketplace
* Design system governance tools

---

# Working Rules for Claude Code

1. Never generate placeholder code unless explicitly marked as a scaffold.
2. Favor maintainability over brevity.
3. Explain significant architectural decisions in Architecture Decision Records (ADRs).
4. Generate code incrementally in logical milestones rather than dumping the entire project at once.
5. Before implementing a new subsystem, produce a concise implementation plan and dependency graph.
6. Keep all public APIs stable unless a documented breaking change is required.
7. Ensure every exported symbol is fully typed and documented.
8. Enforce strict TypeScript (`"strict": true`) with no `any` unless accompanied by a documented justification.
9. Optimize for tree-shaking, minimal runtime overhead, and excellent IDE autocomplete.
10. Continuously validate accessibility, performance, and documentation as first-class deliverables—not post-development tasks.
