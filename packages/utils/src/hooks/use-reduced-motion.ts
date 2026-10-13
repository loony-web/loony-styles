"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

// No media queries on the server: assume motion is allowed, then correct on hydration.
const getServerSnapshot = () => false;

/**
 * useReducedMotion — Whether the user has asked the OS to minimise motion.
 *
 * CSS already honours the preference (ADR-009: motion tokens collapse and
 * `motion-reduce:` variants apply). Use this hook for motion driven from
 * JavaScript, such as auto-advancing carousels, smooth `scrollIntoView`, or
 * timed toasts. It updates live when the setting changes.
 *
 * SSR: returns `false` on the server and during hydration, then the real value.
 *
 * @example
 * const reduceMotion = useReducedMotion();
 * el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
