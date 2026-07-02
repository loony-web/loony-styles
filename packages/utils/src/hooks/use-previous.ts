"use client";

import { useEffect, useRef } from "react";

/**
 * usePrevious — Returns the value from the previous render.
 *
 * Useful for:
 *   - Animating from a previous state to a new one
 *   - Detecting value changes in effects
 *   - Comparing current vs previous values in components
 *
 * @example
 * const prev = usePrevious(count); // undefined on first render, then lags by 1
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
