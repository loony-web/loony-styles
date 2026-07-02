"use client";

import { useCallback, useInsertionEffect, useRef } from "react";

/**
 * useEvent — A stable callback identity with always-fresh closure access.
 *
 * This is the userland implementation of the RFC proposed `useEvent` hook.
 * It uses useInsertionEffect (React 18+) instead of useLayoutEffect to
 * update the ref before any layout effects fire, avoiding the stale ref
 * problem that affects the useCallbackRef pattern in some edge cases.
 *
 * Prefer useCallbackRef for most use cases.
 * Use useEvent when the callback is used synchronously during render in
 * another hook's cleanup (the insertion effect timing is essential there).
 *
 * @example
 * const handleClick = useEvent((e: MouseEvent) => {
 *   console.log(count); // always current, never stale
 * });
 */
export function useEvent<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn,
): (...args: TArgs) => TReturn {
  const ref = useRef<(...args: TArgs) => TReturn>(fn);

  useInsertionEffect(() => {
    ref.current = fn;
  }, [fn]);

  return useCallback((...args: TArgs) => ref.current(...args), []);
}
