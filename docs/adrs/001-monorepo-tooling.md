# ADR-001: Monorepo Tooling — TurboRepo + pnpm

**Status:** Accepted  
**Date:** 2026-07-01

## Context

A design system serves multiple audiences simultaneously: the component library consumers, the CLI users, the documentation readers, and the playground users. Separating these into distinct packages prevents consumers from loading CLI code, and vice versa.

## Decision

Use **pnpm workspaces** + **TurboRepo** as the monorepo stack.

## Rationale

### pnpm over npm/yarn
- Symlink-based node_modules avoids phantom dependencies
- Disk-efficient content-addressable store
- Workspace protocol (`workspace:*`) makes internal deps explicit
- `--frozen-lockfile` in CI ensures reproducible installs

### TurboRepo over Nx/Rush/Lerna
- Near-zero config for most operations
- Remote caching (Vercel) for CI speed
- Dependency graph is inferred from `package.json`, not hand-coded
- `--filter` makes partial builds fast in development
- TUI output is readable without scrolling

## Consequences

- All packages must declare their dependencies correctly (no implicit hoisting)
- `turbo.json` is the single source of task orchestration truth
- Adding a new package requires updating `pnpm-workspace.yaml` (trivial)
