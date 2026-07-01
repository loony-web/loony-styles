import { useId as reactUseId } from "react";

/**
 * useId — Generates a stable, unique ID for accessibility attributes.
 *
 * Wraps React 18+'s built-in useId with:
 *   1. An optional `prefix` for semantic naming (aria-labelledby="dialog-title-:r1:")
 *   2. An optional `suffix` for related element groups
 *
 * React's useId produces hydration-safe IDs that are consistent between
 * server and client renders, which is critical for aria attributes.
 *
 * @example
 * const id = useId("input");     // "input-:r1:"
 * const id = useId("", "label"); // ":r1:-label"
 */
export function useId(prefix?: string, suffix?: string): string {
  const id = reactUseId();
  const base = prefix ? `${prefix}-${id}` : id;
  return suffix ? `${base}-${suffix}` : base;
}
