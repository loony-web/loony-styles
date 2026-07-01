/**
 * Token system type definitions.
 *
 * Three layers:
 *   1. Primitive  — raw scale values (zinc-500, 16px, 0.5s)
 *   2. Semantic   — purpose-driven aliases (color-background, font-size-body)
 *   3. Component  — component-scoped overrides (button-height, input-border-radius)
 *
 * This layering lets themes override semantic tokens without touching primitives,
 * and component tokens without touching semantics.
 */

export type TokenScale<T extends string | number> = Record<string, T>;

export type CSSVariable = `--loony-${string}`;

export interface TokenDefinition {
  name: string;
  value: string | number;
  cssVar: CSSVariable;
  description?: string;
}

export type ThemeMode = "light" | "dark";
export type ContrastMode = "normal" | "high";
export type ColorScheme = `${ThemeMode}-${ContrastMode}` | ThemeMode;
