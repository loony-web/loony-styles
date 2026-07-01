import { useEffect, useLayoutEffect } from "react";

/**
 * useIsomorphicLayoutEffect — useLayoutEffect that falls back to useEffect in SSR.
 *
 * useLayoutEffect produces a React warning in SSR environments because the
 * browser layout phase doesn't exist on the server. This hook uses
 * useLayoutEffect in browsers (where it correctly fires before paint)
 * and useEffect on the server (where timing doesn't matter).
 *
 * Use this instead of useLayoutEffect in any component that may be rendered
 * on the server, which is most components in a modern React app.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
