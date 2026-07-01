import { type ComponentPropsWithRef } from "react";
import { cn } from "./cn.js";

type VisuallyHiddenProps = ComponentPropsWithRef<"span">;

/**
 * VisuallyHidden — Renders content that is invisible but accessible to screen readers.
 *
 * The standard "visually hidden" CSS technique positions the element off-screen
 * without using display:none or visibility:hidden (which also hide from AT).
 *
 * Use for:
 *   - Screen reader-only labels ("Close dialog", "Loading...")
 *   - Icon button labels
 *   - Skip navigation links (paired with :focus-visible to show visually on focus)
 *
 * @example
 * <button>
 *   <CloseIcon aria-hidden />
 *   <VisuallyHidden>Close dialog</VisuallyHidden>
 * </button>
 */
export function VisuallyHidden({ className, ...props }: VisuallyHiddenProps) {
  return (
    <span
      className={cn(
        "absolute w-px h-px p-0 -m-px overflow-hidden clip-[rect(0,0,0,0)] whitespace-nowrap border-0",
        // CSS fallback for environments without Tailwind
        // "sr-only" is Tailwind's utility for this — below handles both
        className,
      )}
      {...props}
    />
  );
}

VisuallyHidden.displayName = "VisuallyHidden";
