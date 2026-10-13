/**
 * Primitive motion tokens.
 *
 * Durations and easing curves designed for UI interactions.
 * All components MUST honor prefers-reduced-motion by using the
 * --loony-duration-* and --loony-easing-* CSS variables, which
 * collapse to near-zero in the reduced-motion media query.
 */

export const duration = {
  instant: "0ms",
  "75": "75ms",
  "100": "100ms",
  "150": "150ms",
  "200": "200ms",
  "250": "250ms",
  "300": "300ms",
  "400": "400ms",
  "500": "500ms",
  "700": "700ms",
  "1000": "1000ms",
} as const;

export const easing = {
  linear: "linear",
  "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
  "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
  "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
  "spring-gentle": "cubic-bezier(0.34, 1.56, 0.64, 1)",
  "spring-snappy": "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
  "spring-bouncy": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  decelerate: "cubic-bezier(0, 0, 0.2, 1)",
  accelerate: "cubic-bezier(0.4, 0, 1, 1)",
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
} as const;

export type DurationToken = keyof typeof duration;
export type EasingToken = keyof typeof easing;
