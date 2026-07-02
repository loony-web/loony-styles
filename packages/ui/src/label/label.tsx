"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { type ComponentPropsWithRef } from "react";
import { cn } from "@loony/utils";

type LabelProps = ComponentPropsWithRef<typeof LabelPrimitive.Root>;

/**
 * Label — Accessible form label.
 *
 * Built on Radix UI's Label primitive which:
 *   - Associates the label with its control via htmlFor
 *   - Prevents text selection on double-click (via onMouseDown)
 *   - Is compatible with custom form controls via the `for` attribute
 *
 * @example
 * <Label htmlFor="email">Email address</Label>
 * <Input id="email" type="email" />
 */
export function Label({ className, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      className={cn(
        "text-sm font-medium text-[--loony-color-fg] leading-none",
        "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}

Label.displayName = "Label";