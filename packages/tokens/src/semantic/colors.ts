/**
 * Semantic color tokens.
 *
 * These are CSS variable references that map PURPOSE to PRIMITIVE.
 * Components use these tokens, never raw primitives.
 *
 * Naming convention: --loony-color-{role}-{variant}-{state}
 *   role:    bg, fg, border, ring, accent, ...
 *   variant: default, subtle, muted, strong, ...
 *   state:   (omit for default), hover, active, disabled, ...
 */

export const semanticColors = {
  // --- Backgrounds ---
  "color-bg": "var(--loony-color-bg)",
  "color-bg-subtle": "var(--loony-color-bg-subtle)",
  "color-bg-muted": "var(--loony-color-bg-muted)",
  "color-bg-inverted": "var(--loony-color-bg-inverted)",
  "color-bg-overlay": "var(--loony-color-bg-overlay)",

  // --- Foreground / Text ---
  "color-fg": "var(--loony-color-fg)",
  "color-fg-muted": "var(--loony-color-fg-muted)",
  "color-fg-subtle": "var(--loony-color-fg-subtle)",
  "color-fg-disabled": "var(--loony-color-fg-disabled)",
  "color-fg-inverted": "var(--loony-color-fg-inverted)",
  "color-fg-on-accent": "var(--loony-color-fg-on-accent)",

  // --- Borders ---
  "color-border": "var(--loony-color-border)",
  "color-border-strong": "var(--loony-color-border-strong)",
  "color-border-subtle": "var(--loony-color-border-subtle)",

  // --- Focus ring ---
  "color-ring": "var(--loony-color-ring)",
  "color-ring-offset": "var(--loony-color-ring-offset)",

  // --- Brand / Accent ---
  "color-accent": "var(--loony-color-accent)",
  "color-accent-hover": "var(--loony-color-accent-hover)",
  "color-accent-active": "var(--loony-color-accent-active)",
  "color-accent-subtle": "var(--loony-color-accent-subtle)",
  "color-accent-fg": "var(--loony-color-accent-fg)",

  // --- Semantic states ---
  // Danger
  "color-danger": "var(--loony-color-danger)",
  "color-danger-hover": "var(--loony-color-danger-hover)",
  "color-danger-subtle": "var(--loony-color-danger-subtle)",
  "color-danger-fg": "var(--loony-color-danger-fg)",

  // Warning
  "color-warning": "var(--loony-color-warning)",
  "color-warning-hover": "var(--loony-color-warning-hover)",
  "color-warning-subtle": "var(--loony-color-warning-subtle)",
  "color-warning-fg": "var(--loony-color-warning-fg)",

  // Success
  "color-success": "var(--loony-color-success)",
  "color-success-hover": "var(--loony-color-success-hover)",
  "color-success-subtle": "var(--loony-color-success-subtle)",
  "color-success-fg": "var(--loony-color-success-fg)",

  // Info
  "color-info": "var(--loony-color-info)",
  "color-info-hover": "var(--loony-color-info-hover)",
  "color-info-subtle": "var(--loony-color-info-subtle)",
  "color-info-fg": "var(--loony-color-info-fg)",

  // --- Surface tones (for cards, panels, modals) ---
  "color-surface": "var(--loony-color-surface)",
  "color-surface-raised": "var(--loony-color-surface-raised)",
  "color-surface-overlay": "var(--loony-color-surface-overlay)",
  "color-surface-sunken": "var(--loony-color-surface-sunken)",
} as const;

export type SemanticColorToken = keyof typeof semanticColors;
