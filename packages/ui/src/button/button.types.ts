import type { WithAsChild } from "@loony/utils";
import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";
import type { buttonVariants } from "./button.styles.js";

/**
 * Button props.
 *
 * Design decisions:
 *   - `variant` controls visual style (filled, outlined, ghost, link, danger)
 *   - `size` controls dimensions (xs, sm, md, lg)
 *   - `asChild` enables polymorphism via the Slot pattern
 *   - `loading` shows a spinner and prevents interaction
 *   - `leftIcon` / `rightIcon` for icon+label buttons (prefer over nesting raw icons)
 *   - No `color` prop — use `variant="danger"` for destructive actions
 */
export interface ButtonProps
  extends ComponentPropsWithRef<"button">,
    VariantProps<typeof buttonVariants>,
    WithAsChild {
  /** Shows a loading spinner and disables interaction. */
  loading?: boolean;
  /** Icon rendered before the label. */
  leftIcon?: React.ReactNode;
  /** Icon rendered after the label. */
  rightIcon?: React.ReactNode;
}
