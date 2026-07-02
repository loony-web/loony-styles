"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { type ComponentPropsWithRef } from "react";
import { cn } from "@loony/utils";

/**
 * Tooltip — Contextual text hint on hover/focus.
 *
 * Built on Radix UI Tooltip which handles:
 *   - Hover and focus triggers
 *   - Delay and open timing
 *   - aria-describedby association
 *   - Collision detection and placement
 *
 * Accessibility:
 *   - Tooltips should NOT contain interactive elements
 *   - Content must be non-essential (keyboard users can still access the function)
 *   - Do not use tooltips to convey critical information
 *
 * @example
 * <Tooltip>
 *   <TooltipTrigger asChild>
 *     <IconButton label="Settings"><SettingsIcon /></IconButton>
 *   </TooltipTrigger>
 *   <TooltipContent>Open settings</TooltipContent>
 * </Tooltip>
 */

const TooltipProvider = TooltipPrimitive.Provider;
TooltipProvider.displayName = "TooltipProvider";

const Tooltip = TooltipPrimitive.Root;
Tooltip.displayName = "Tooltip";

const TooltipTrigger = TooltipPrimitive.Trigger;
TooltipTrigger.displayName = "TooltipTrigger";

function TooltipContent({
  className,
  sideOffset = 4,
  ...props
}: ComponentPropsWithRef<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          "z-[--loony-z-tooltip]",
          "overflow-hidden rounded-[--loony-radius-tooltip]",
          "bg-[--loony-color-bg-inverted] text-[--loony-color-fg-inverted]",
          "px-3 py-1.5 text-xs font-medium",
          "shadow-[--loony-shadow-md]",
          "animate-in fade-in-0 zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          "motion-reduce:animate-none",
          className,
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
}

TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };