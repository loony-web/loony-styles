"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { cn } from "@loony/utils";

const radioGroupVariants = cva("grid gap-2", {
  variants: {
    orientation: {
      vertical: "grid-cols-1",
      horizontal: "grid-flow-col auto-cols-max items-center",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export interface RadioGroupProps
  extends Omit<ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, "orientation">,
    VariantProps<typeof radioGroupVariants> {}

export const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, orientation, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn(radioGroupVariants({ orientation }), className)}
    {...props}
  />
));
RadioGroup.displayName = "RadioGroup";

const radioItemVariants = cva(
  [
    "aspect-square h-4 w-4 rounded-full border-2 ring-offset-2",
    "border-[--loony-color-border]",
    "text-[--loony-color-accent]",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[--loony-color-ring] focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:border-[--loony-color-accent]",
    "transition-colors duration-150",
  ],
  {
    variants: {
      size: {
        sm: "h-3.5 w-3.5",
        md: "h-4 w-4",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface RadioItemProps
  extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioItemVariants> {}

export const RadioItem = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioItemProps
>(({ className, size, children, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(radioItemVariants({ size }), className)}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <span
        className={cn(
          "block rounded-full bg-[--loony-color-accent]",
          size === "sm" ? "h-1.5 w-1.5" : size === "lg" ? "h-2.5 w-2.5" : "h-2 w-2",
        )}
      />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioItem.displayName = "RadioItem";
