"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { type ComponentPropsWithRef } from "react";
import { cn } from "@loony/utils";
import { CheckIcon, MinusIcon } from "@loony/icons";

type CheckboxProps = ComponentPropsWithRef<typeof CheckboxPrimitive.Root> & {
  indeterminate?: boolean;
};

/**
 * Checkbox — Controlled/uncontrolled checkbox with indeterminate support.
 *
 * Built on Radix UI Checkbox which handles:
 *   - aria-checked (including "mixed" for indeterminate)
 *   - keyboard activation (Space)
 *   - focus management
 *   - form integration (native form submission)
 *
 * Accessibility:
 *   - Must be associated with a label via htmlFor or wrapping in <label>
 *   - Indeterminate state renders aria-checked="mixed" + MinusIcon
 *
 * @example
 * <div className="flex items-center gap-2">
 *   <Checkbox id="terms" />
 *   <Label htmlFor="terms">Accept terms</Label>
 * </div>
 */
export function Checkbox({ className, checked, indeterminate, ...props }: CheckboxProps) {
  const resolvedChecked = indeterminate ? "indeterminate" : checked;

  return (
    <CheckboxPrimitive.Root
      className={cn(
        "peer h-4 w-4 shrink-0",
        "rounded-[--loony-radius-xs]",
        "border border-[--loony-color-border-strong]",
        "bg-[--loony-color-bg]",
        "outline-none transition-colors duration-[--loony-duration-fast]",
        "focus-visible:ring-2 focus-visible:ring-[--loony-color-ring] focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-[--loony-color-accent] data-[state=checked]:border-[--loony-color-accent] data-[state=checked]:text-[--loony-color-accent-fg]",
        "data-[state=indeterminate]:bg-[--loony-color-accent] data-[state=indeterminate]:border-[--loony-color-accent] data-[state=indeterminate]:text-[--loony-color-accent-fg]",
        className,
      )}
      checked={resolvedChecked}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        {indeterminate ? (
          <MinusIcon size={10} strokeWidth={3} />
        ) : (
          <CheckIcon size={10} strokeWidth={3} />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

Checkbox.displayName = "Checkbox";