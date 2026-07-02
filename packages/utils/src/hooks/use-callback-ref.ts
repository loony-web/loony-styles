"use client";

import { useEffect, useMemo, useRef } from "react";

/**
 * useCallbackRef — Stable callback reference that always calls the latest version.
 *
 * Solves the exhaustive-deps problem for callbacks: components often want to
 * fire a callback that changes on every render (e.g. an inline arrow function),
 * but including it in a useEffect dep array would cause excessive re-runs.
 *
 * This hook returns a stable function identity that always delegates to the
 * current version of the callback — eliminating stale closure bugs without
 * needing useMemo or useCallback at the call site.
 *
 * This is NOT a replacement for useCallback when the callback is passed
 * to memoized child components — only use this for internal event handlers.
 *
 * @example
 * const onSelect = useCallbackRef(props.onSelect);
 * // Safe to put onSelect in effect deps — it's stable
 * useEffect(() => {
 *   someSubscription.on("select", onSelect);
 * }, [onSelect]);
 */
export function useCallbackRef<TArgs extends unknown[], TReturn>(
  callback: ((...args: TArgs) => TReturn) | undefined,
): (...args: TArgs) => TReturn {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useMemo(
    () =>
      (...args: TArgs): TReturn =>
        callbackRef.current?.(...args) as TReturn,
    [],
  );
}
