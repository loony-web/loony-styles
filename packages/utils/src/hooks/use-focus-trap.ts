"use client";

import { type RefObject, useEffect } from "react";
import { useCallbackRef } from "./use-callback-ref.js";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "details > summary:first-of-type",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[contenteditable]:not([contenteditable='false'])",
].join(", ");

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !(el.closest("[hidden]") || el.closest("[aria-hidden='true']")),
  );
}

/**
 * useFocusTrap — Constrains keyboard focus within a container element.
 *
 * Used by Modal, Dialog, Drawer, and other overlay components to prevent
 * users from tabbing outside the active UI region, per WCAG 2.5.3 and
 * the ARIA Authoring Practices Guide dialog pattern.
 *
 * Handles:
 *   - Tab and Shift+Tab cycling within the container
 *   - Auto-focus of the first focusable element on mount
 *   - Focus restoration to the trigger element on unmount
 *   - Dynamic content (focusable elements added after mount)
 *
 * @example
 * useFocusTrap(dialogRef, isOpen);
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  enabled = true,
  options: {
    /** Element to focus when the trap is deactivated. Defaults to previously focused element. */
    returnFocusRef?: RefObject<HTMLElement | null>;
    /** Selector or element to focus when trap activates. Defaults to first focusable. */
    initialFocus?: string | HTMLElement | null;
  } = {},
): void {
  const { returnFocusRef, initialFocus } = options;
  const getReturnFocus = useCallbackRef(() => returnFocusRef?.current);

  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Focus the initialFocus target or the first focusable element
    const focusInitial = () => {
      if (initialFocus) {
        const target =
          typeof initialFocus === "string"
            ? container.querySelector<HTMLElement>(initialFocus)
            : initialFocus;
        target?.focus({ preventScroll: true });
        return;
      }
      const focusable = getFocusable(container);
      focusable[0]?.focus({ preventScroll: true });
    };

    // Small delay to allow CSS transitions to complete before measuring
    const raf = requestAnimationFrame(focusInitial);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const focusable = getFocusable(container);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first || !container.contains(document.activeElement)) {
          event.preventDefault();
          last?.focus({ preventScroll: true });
        }
      } else if (document.activeElement === last || !container.contains(document.activeElement)) {
        event.preventDefault();
        first?.focus({ preventScroll: true });
      }
    };

    container.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("keydown", handleKeyDown);
      const returnTarget = getReturnFocus() ?? previouslyFocused;
      returnTarget?.focus({ preventScroll: true });
    };
  }, [containerRef, enabled, getReturnFocus, initialFocus]);
}
