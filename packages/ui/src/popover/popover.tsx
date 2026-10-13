"use client";

import { cn } from "@loony/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { ComponentPropsWithRef } from "react";

/**
 * Popover — Floating panel anchored to a trigger.
 *
 * Unlike Tooltip, Popover CAN contain interactive elements (forms, buttons, links).
 *
 * Compound API:
 *   Popover → PopoverTrigger + PopoverContent
 *   Optional: PopoverArrow, PopoverClose
 *
 * @example
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button variant="outline">Filter</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     <div className="space-y-4">
 *       <Label>Date range</Label>
 *       <Input type="date" />
 *     </div>
 *   </PopoverContent>
 * </Popover>
 */

const Popover = PopoverPrimitive.Root;
Popover.displayName = "Popover";

const PopoverTrigger = PopoverPrimitive.Trigger;
PopoverTrigger.displayName = "PopoverTrigger";

const PopoverClose = PopoverPrimitive.Close;
PopoverClose.displayName = "PopoverClose";

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: ComponentPropsWithRef<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-(--loony-z-popover)",
          "w-72 rounded-(--loony-radius-dialog)",
          "bg-(--loony-color-surface)",
          "border border-(--loony-color-border)",
          "shadow-(--loony-shadow-lg)",
          "p-4 outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          "motion-reduce:animate-none",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverClose, PopoverContent };
