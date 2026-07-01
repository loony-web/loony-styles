/**
 * Primitive radius scale.
 *
 * Based on a multiplier system relative to a --loony-radius-base CSS variable,
 * allowing global radius personality to be changed at the theme level.
 */

export const radius = {
  none: "0px",
  xs: "0.125rem",  // 2px
  sm: "0.25rem",   // 4px
  md: "0.375rem",  // 6px
  lg: "0.5rem",    // 8px
  xl: "0.75rem",   // 12px
  "2xl": "1rem",   // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px",
} as const;

export type RadiusScale = typeof radius;
export type RadiusToken = keyof RadiusScale;
