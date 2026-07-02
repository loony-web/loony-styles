"use client";

import { type RefObject, useEffect } from "react";
import { useCallbackRef } from "./use-callback-ref.js";

/**
 * useOutsideClick — Fires a callback when a pointer/touch event occurs outside an element.
 *
 * Uses `pointerdown` (not `click`) to catch the intent before focus shifts.
 * Checks composed path to handle clicks inside shadow DOM correctly.
 *
 * @example
 * useOutsideClick(popoverRef, () => setOpen(false));
 */
export function useOutsideClick(
  ref: RefObject<HTMLElement | null>,
  handler: (event: PointerEvent) => void,
  enabled = true,
): void {
  const stableHandler = useCallbackRef(handler);

  useEffect(() => {
    if (!enabled) return;

    const handlePointerDown = (event: PointerEvent) => {
      const element = ref.current;
      if (!element || element.contains(event.target as Node)) return;
      // composedPath handles clicks inside shadow DOM
      if (event.composedPath().includes(element)) return;
      stableHandler(event);
    };

    document.addEventListener("pointerdown", handlePointerDown, { capture: true });
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, { capture: true });
    };
  }, [enabled, ref, stableHandler]);
}
