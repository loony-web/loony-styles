import { type MutableRefObject, type RefCallback, useCallback } from "react";

type PossibleRef<T> = MutableRefObject<T> | RefCallback<T> | null | undefined;

/**
 * Sets a ref to a given value — handles both callback refs and ref objects.
 */
function setRef<T>(ref: PossibleRef<T>, value: T): void {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    ref.current = value;
  }
}

/**
 * composeRefs — Merges multiple refs into one callback ref.
 *
 * Essential for forwarding refs while also keeping a local ref.
 * Handles React 19's ref-as-prop model and the legacy forwardRef pattern.
 *
 * @example
 * const ref = composeRefs(forwardedRef, localRef);
 * <div ref={ref} />
 */
export function composeRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
  return (value: T) => {
    for (const ref of refs) {
      setRef(ref, value);
    }
  };
}

/**
 * useComposedRefs — Memoized version of composeRefs for use in render.
 *
 * Re-creates the composed ref only when the ref array changes.
 * Use this inside render functions; use composeRefs for one-off composition.
 */
export function useComposedRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(composeRefs(...refs), refs);
}
