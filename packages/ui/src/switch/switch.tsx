"use client";

import { cn } from "@loony/utils";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import type { ComponentPropsWithRef } from "react";

type SwitchProps = ComponentPropsWithRef<typeof SwitchPrimitive.Root>;

/**
 * Switch — Binary toggle control.
 *
 * Semantically distinct from Checkbox:
 *   - Checkbox: represents a value in a form (checked/unchecked)
 *   - Switch: immediately triggers an action (on/off)
 *
 * Accessibility:
 *   - role="switch" with aria-checked
 *   - Keyboard: Space to toggle
 *   - Requires a visible label
 *
 * @example
 * <div className="flex items-center gap-2">
 *   <Switch id="notifications" />
 *   <Label htmlFor="notifications">Enable notifications</Label>
 * </div>
 */
export function Switch({ className, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center",
        "rounded-full border-2 border-transparent",
        "transition-colors duration-(--loony-duration-fast)",
        "outline-none focus-visible:ring-2 focus-visible:ring-(--loony-color-ring) focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=unchecked]:bg-(--loony-color-border-strong)",
        "data-[state=checked]:bg-(--loony-color-accent)",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full",
          "bg-white shadow-(--loony-shadow-sm)",
          "ring-0 transition-transform duration-(--loony-duration-fast)",
          "data-[state=unchecked]:translate-x-0",
          "data-[state=checked]:translate-x-4",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

Switch.displayName = "Switch";
