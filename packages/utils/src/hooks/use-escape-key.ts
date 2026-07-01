import { useEffect } from "react";
import { useCallbackRef } from "./use-callback-ref.js";

/**
 * useEscapeKey — Fires a callback when the Escape key is pressed.
 *
 * Listens at the document level with capture to intercept the event
 * before nested components (e.g. a combobox inside a modal can both
 * respond to Escape independently via stopPropagation).
 *
 * @example
 * useEscapeKey(() => setOpen(false));
 * useEscapeKey(() => setOpen(false), isOpen); // only active when open
 */
export function useEscapeKey(handler: (event: KeyboardEvent) => void, enabled = true): void {
  const stableHandler = useCallbackRef(handler);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        stableHandler(event);
      }
    };

    document.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => {
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [enabled, stableHandler]);
}
