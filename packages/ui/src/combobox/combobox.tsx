"use client";

import { CheckIcon, ChevronDownIcon } from "@loony/icons";
import { cn, useControllableState } from "@loony/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { KeyboardEvent, ReactNode } from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command/command.js";

export interface ComboboxOption {
  /** Value reported by `onValueChange` and submitted with forms. Must be unique. */
  value: string;
  /** Text shown in the list and the trigger, and matched by the search. */
  label: string;
  disabled?: boolean;
  /** Extra search terms, e.g. aliases or translations. */
  keywords?: string[];
}

export interface ComboboxProps {
  options: ComboboxOption[];
  /** Selected value (controlled). `null` means nothing selected. */
  value?: string | null;
  /** Initially selected value (uncontrolled). */
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  /** Allow clearing the selection by choosing the selected option again. */
  clearable?: boolean;

  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  /** Trigger text when nothing is selected. */
  placeholder?: string;
  /** Placeholder for the search field. */
  searchPlaceholder?: string;
  /** Shown when the search matches nothing. */
  emptyMessage?: ReactNode;

  /**
   * Accessible name of the field. Required unless the trigger is labelled
   * another way (a `<Label htmlFor={id}>` or `aria-labelledby`). Also names
   * the popup and its search field.
   */
  label?: string;
  id?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  /** Marks the field invalid (sets aria-invalid and error styling). */
  invalid?: boolean;
  disabled?: boolean;
  /** Submits the selected value with a native `<form>` under this name. */
  name?: string;

  /** Classes for the trigger button. */
  className?: string;
  /** Classes for the popup panel. */
  contentClassName?: string;
}

const triggerClasses = [
  "flex h-10 w-full items-center justify-between gap-2",
  "rounded-(--loony-radius-input) border border-(--loony-color-border)",
  "bg-(--loony-color-bg) px-3 py-2 text-left text-sm text-(--loony-color-fg)",
  "outline-none transition-colors duration-(--loony-duration-fast)",
  "focus-visible:ring-2 focus-visible:ring-(--loony-color-ring) focus-visible:border-(--loony-color-ring)",
  "hover:border-(--loony-color-border-strong)",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "data-[placeholder]:text-(--loony-color-fg-subtle)",
  "data-[invalid=true]:border-(--loony-color-danger) data-[invalid=true]:focus-visible:ring-(--loony-color-danger)",
];

const contentClasses = [
  "z-(--loony-z-popover) w-(--radix-popover-trigger-width) min-w-48 p-0 overflow-hidden",
  "rounded-(--loony-radius-md) border border-(--loony-color-border)",
  "bg-(--loony-color-surface) shadow-(--loony-shadow-md) outline-none",
  "data-[state=open]:animate-in data-[state=closed]:animate-out",
  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
  "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
  "duration-(--loony-duration-fast) motion-reduce:animate-none",
];

/**
 * Combobox — Select one option from a searchable list.
 *
 * Built from Popover (positioning, focus return) and Command (filtering,
 * keyboard navigation). The trigger is a button that opens a dialog popup;
 * inside it the search field is the WAI-ARIA combobox that controls the
 * listbox (editable combobox with list autocomplete pattern).
 *
 * Keyboard:
 *   Trigger    Enter / Space / ArrowDown / ArrowUp open the list
 *   Search     Type to filter · ArrowUp/ArrowDown move · Home/End jump
 *              Enter selects · Escape closes and returns focus to the trigger
 *
 * @example
 * <Label htmlFor="framework">Framework</Label>
 * <Combobox
 *   id="framework"
 *   label="Framework"
 *   options={[{ value: "next", label: "Next.js" }, { value: "remix", label: "Remix" }]}
 *   placeholder="Select a framework…"
 *   onValueChange={setFramework}
 * />
 */
export function Combobox({
  options,
  value: valueProp,
  defaultValue = null,
  onValueChange,
  clearable = false,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placeholder = "Select an option…",
  searchPlaceholder = "Search…",
  emptyMessage = "No results found.",
  label,
  id,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  invalid,
  disabled,
  name,
  className,
  contentClassName,
}: ComboboxProps) {
  const [value, setValue] = useControllableState<string | null>({
    value: valueProp,
    defaultValue,
    onChange: onValueChange,
  });
  const [open, setOpen] = useControllableState<boolean>({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const selected = options.find((option) => option.value === value);

  const select = (option: ComboboxOption) => {
    setValue(clearable && option.value === value ? null : option.value);
    setOpen(false);
  };

  // APG: ArrowDown/ArrowUp on a collapsed combobox trigger opens the list.
  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if ((event.key === "ArrowDown" || event.key === "ArrowUp") && !open) {
      event.preventDefault();
      setOpen(true);
    }
  };

  return (
    <PopoverPrimitive.Root open={open ?? false} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger
        id={id}
        type="button"
        disabled={disabled}
        aria-label={ariaLabelledBy ? undefined : label}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-invalid={invalid || undefined}
        data-invalid={invalid || undefined}
        data-placeholder={selected ? undefined : ""}
        onKeyDown={handleTriggerKeyDown}
        className={cn(triggerClasses, className)}
      >
        <span className="truncate">{selected?.label ?? placeholder}</span>
        <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
      </PopoverPrimitive.Trigger>

      {name !== undefined && <input type="hidden" name={name} value={value ?? ""} />}

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          aria-label={label ?? placeholder}
          className={cn(contentClasses, contentClassName)}
        >
          {/* cmdk labels its input via aria-labelledby from this prop (an aria-label
              on the input would be overridden). */}
          <Command label={label ? `Search ${label}` : searchPlaceholder}>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList className="p-1">
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  keywords={[option.label, ...(option.keywords ?? [])]}
                  disabled={option.disabled}
                  onSelect={() => select(option)}
                  // cmdk's aria-selected marks the highlighted option, not the chosen
                  // one, so announce the selection in the name.
                  aria-label={option.value === value ? `${option.label}, selected` : undefined}
                  className="pl-8"
                >
                  {option.value === value && (
                    <CheckIcon className="absolute left-2 h-4 w-4" aria-hidden />
                  )}
                  {option.label}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

Combobox.displayName = "Combobox";
