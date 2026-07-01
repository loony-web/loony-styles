/**
 * Loony Tailwind CSS v4 Preset
 *
 * Maps all --loony-* CSS variables to Tailwind theme utilities.
 * In Tailwind v4, theme config lives in CSS @theme blocks, not JS.
 * This file exports a CSS string to be imported in the consumer's main CSS.
 *
 * Usage in your app's CSS:
 *   @import "@loony/tokens/tailwind";
 */

export const tailwindPreset = `
@import "@loony/tokens/css";

@theme {
  /* ---- Colors ---- */
  --color-bg: var(--loony-color-bg);
  --color-bg-subtle: var(--loony-color-bg-subtle);
  --color-bg-muted: var(--loony-color-bg-muted);
  --color-bg-inverted: var(--loony-color-bg-inverted);

  --color-fg: var(--loony-color-fg);
  --color-fg-muted: var(--loony-color-fg-muted);
  --color-fg-subtle: var(--loony-color-fg-subtle);
  --color-fg-disabled: var(--loony-color-fg-disabled);
  --color-fg-inverted: var(--loony-color-fg-inverted);
  --color-fg-on-accent: var(--loony-color-fg-on-accent);

  --color-border: var(--loony-color-border);
  --color-border-strong: var(--loony-color-border-strong);
  --color-border-subtle: var(--loony-color-border-subtle);

  --color-ring: var(--loony-color-ring);
  --color-ring-offset: var(--loony-color-ring-offset);

  --color-accent: var(--loony-color-accent);
  --color-accent-hover: var(--loony-color-accent-hover);
  --color-accent-active: var(--loony-color-accent-active);
  --color-accent-subtle: var(--loony-color-accent-subtle);
  --color-accent-fg: var(--loony-color-accent-fg);

  --color-danger: var(--loony-color-danger);
  --color-danger-hover: var(--loony-color-danger-hover);
  --color-danger-subtle: var(--loony-color-danger-subtle);
  --color-danger-fg: var(--loony-color-danger-fg);

  --color-warning: var(--loony-color-warning);
  --color-warning-hover: var(--loony-color-warning-hover);
  --color-warning-subtle: var(--loony-color-warning-subtle);
  --color-warning-fg: var(--loony-color-warning-fg);

  --color-success: var(--loony-color-success);
  --color-success-hover: var(--loony-color-success-hover);
  --color-success-subtle: var(--loony-color-success-subtle);
  --color-success-fg: var(--loony-color-success-fg);

  --color-info: var(--loony-color-info);
  --color-info-hover: var(--loony-color-info-hover);
  --color-info-subtle: var(--loony-color-info-subtle);
  --color-info-fg: var(--loony-color-info-fg);

  --color-surface: var(--loony-color-surface);
  --color-surface-raised: var(--loony-color-surface-raised);
  --color-surface-overlay: var(--loony-color-surface-overlay);
  --color-surface-sunken: var(--loony-color-surface-sunken);

  /* ---- Radius ---- */
  --radius-none: var(--loony-radius-none);
  --radius-xs: var(--loony-radius-xs);
  --radius-sm: var(--loony-radius-sm);
  --radius-md: var(--loony-radius-md);
  --radius-lg: var(--loony-radius-lg);
  --radius-xl: var(--loony-radius-xl);
  --radius-2xl: var(--loony-radius-2xl);
  --radius-3xl: var(--loony-radius-3xl);
  --radius-full: var(--loony-radius-full);

  /* ---- Typography ---- */
  --font-family-sans: var(--loony-font-sans);
  --font-family-mono: var(--loony-font-mono);
  --font-family-serif: var(--loony-font-serif);

  /* ---- Shadows ---- */
  --shadow-none: var(--loony-shadow-none);
  --shadow-xs: var(--loony-shadow-xs);
  --shadow-sm: var(--loony-shadow-sm);
  --shadow-md: var(--loony-shadow-md);
  --shadow-lg: var(--loony-shadow-lg);
  --shadow-xl: var(--loony-shadow-xl);
  --shadow-2xl: var(--loony-shadow-2xl);
  --shadow-inner: var(--loony-shadow-inner);

  /* ---- Motion ---- */
  --duration-fast: var(--loony-duration-fast);
  --duration-normal: var(--loony-duration-normal);
  --duration-slow: var(--loony-duration-slow);
  --ease-ui: var(--loony-ease-ui);
  --ease-spring-gentle: var(--loony-ease-spring-gentle);
  --ease-spring-snappy: var(--loony-ease-spring-snappy);
}
`;

export default tailwindPreset;
