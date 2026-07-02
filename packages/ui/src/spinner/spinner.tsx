"use client";

import { type ComponentPropsWithRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@loony/utils";

const spinnerVariants = cva(
  [
    "inline-block rounded-full border-2 border-current border-t-transparent",
    "animate-spin",
    "motion-reduce:animate-[spin_1.5s_linear_infinite]",
  ],
  {
    variants: {
      size: {
        xs: "w-3 h-3",
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
        xl: "w-8 h-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

interface SpinnerProps
  extends ComponentPropsWithRef<"span">,
    VariantProps<typeof spinnerVariants> {
  /** Screen reader label. Defaults to "Loading". Pass empty string to fully hide from AT. */
  label?: string;
}

/**
 * Spinner — Loading indicator.
 *
 * Accessibility:
 *   - role="status" with aria-label announces to screen readers
 *   - Uses the "spin" animation; respects prefers-reduced-motion by slowing it down
 *     (stopping entirely can be disorienting for users who still need to know it's loading)
 *
 * @example
 * <Spinner />
 * <Spinner size="sm" label="Saving..." />
 * <Spinner aria-hidden /> // decorative, inside a button with its own label
 */
export function Spinner({ className, size, label = "Loading", ...props }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label || undefined}
      aria-hidden={label === "" ? true : undefined}
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    />
  );
}

Spinner.displayName = "Spinner";