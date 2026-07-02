"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { type ComponentPropsWithRef } from "react";
import { cn } from "@loony/utils";
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from "@loony/icons";

/**
 * Select — Accessible custom select with search-free option list.
 *
 * For searchable selects (combobox pattern), see the Combobox component.
 *
 * Built on Radix UI Select which handles:
 *   - Keyboard navigation (arrows, type-ahead)
 *   - aria-expanded, aria-haspopup, aria-activedescendant
 *   - Viewport scrolling with scroll buttons
 *   - Form integration
 *
 * @example
 * <Select defaultValue="light">
 *   <SelectTrigger>
 *     <SelectValue placeholder="Select theme" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="light">Light</SelectItem>
 *     <SelectItem value="dark">Dark</SelectItem>
 *     <SelectItem value="system">System</SelectItem>
 *   </SelectContent>
 * </Select>
 */

const Select = SelectPrimitive.Root;
Select.displayName = "Select";

const SelectGroup = SelectPrimitive.Group;
SelectGroup.displayName = "SelectGroup";

const SelectValue = SelectPrimitive.Value;
SelectValue.displayName = "SelectValue";

function SelectTrigger({
  className,
  children,
  ...props
}: ComponentPropsWithRef<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "flex h-10 w-full items-center justify-between gap-2",
        "rounded-[--loony-radius-input] border border-[--loony-color-border]",
        "bg-[--loony-color-bg] px-3 py-2 text-sm",
        "text-[--loony-color-fg] placeholder:text-[--loony-color-fg-subtle]",
        "outline-none transition-colors duration-[--loony-duration-fast]",
        "focus-visible:ring-2 focus-visible:ring-[--loony-color-ring] focus-visible:ring-offset-0 focus-visible:border-[--loony-color-ring]",
        "hover:border-[--loony-color-border-strong]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[placeholder]:text-[--loony-color-fg-subtle]",
        "[&>span]:line-clamp-1",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

SelectTrigger.displayName = "SelectTrigger";

function SelectScrollUpButton({
  className,
  ...props
}: ComponentPropsWithRef<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronUpIcon className="h-4 w-4" aria-hidden />
    </SelectPrimitive.ScrollUpButton>
  );
}

SelectScrollUpButton.displayName = "SelectScrollUpButton";

function SelectScrollDownButton({
  className,
  ...props
}: ComponentPropsWithRef<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronDownIcon className="h-4 w-4" aria-hidden />
    </SelectPrimitive.ScrollDownButton>
  );
}

SelectScrollDownButton.displayName = "SelectScrollDownButton";

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: ComponentPropsWithRef<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position={position}
        className={cn(
          "relative z-[--loony-z-dropdown] min-w-32 overflow-hidden",
          "rounded-[--loony-radius-lg]",
          "bg-[--loony-color-surface]",
          "border border-[--loony-color-border]",
          "shadow-[--loony-shadow-md]",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          "motion-reduce:animate-none",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

SelectContent.displayName = "SelectContent";

function SelectLabel({
  className,
  ...props
}: ComponentPropsWithRef<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn("px-2 py-1.5 text-xs font-medium text-[--loony-color-fg-muted]", className)}
      {...props}
    />
  );
}

SelectLabel.displayName = "SelectLabel";

function SelectItem({
  className,
  children,
  ...props
}: ComponentPropsWithRef<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex w-full cursor-default select-none items-center",
        "rounded-[--loony-radius-sm] py-1.5 pl-8 pr-2 text-sm",
        "text-[--loony-color-fg]",
        "outline-none",
        "focus:bg-[--loony-color-bg-subtle] focus:text-[--loony-color-fg]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" aria-hidden />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

SelectItem.displayName = "SelectItem";

function SelectSeparator({
  className,
  ...props
}: ComponentPropsWithRef<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      className={cn("-mx-1 my-1 h-px bg-[--loony-color-border]", className)}
      {...props}
    />
  );
}

SelectSeparator.displayName = "SelectSeparator";

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};