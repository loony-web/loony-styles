# ADR-004: Formatter — Biome over Prettier

**Status:** Accepted  
**Date:** 2026-07-01

## Context

The project needs a consistent code formatter enforced in CI and pre-commit hooks.

## Decision

Use **Biome** for both formatting and linting. Prettier is not used.

## Rationale

### Speed
Biome is written in Rust. Formatting a typical monorepo is 10–50× faster than Prettier. In pre-commit hooks and CI, this matters.

### Unified tool
Biome combines formatter + linter in one binary. This eliminates the Prettier/ESLint conflict that has plagued JavaScript projects for years (e.g. conflicting opinions on trailing commas, semicolons, bracket spacing).

### Zero runtime
Biome is a single binary with no `node_modules` weight. It doesn't need a Node.js `require` chain to start.

### Trade-offs
- Biome's formatter output is slightly different from Prettier in edge cases
- Some ESLint plugins (e.g. `eslint-plugin-storybook`) are not replaceable by Biome rules yet — ESLint is still used for type-aware rules and plugin-specific rules
- The ecosystem expects Prettier in many places (`.prettierrc`, IDE extensions) — migration docs are required

## Consequences

- `biome.json` at the root configures all formatting rules
- ESLint is kept for type-aware rules (`typescript-eslint`) and framework-specific rules
- IDEs must install the Biome extension (documented in README)
- CI runs `biome check .` — both format check and lint in one command
