"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { cn } from "@loony/utils";

const sliderVariants = cva("relative flex touch-none select-none items-center", {
  variants: {
    orientation: {
      horizontal: "w-full",
      vertical: "h-full flex-col",
    },
    size: {
      sm: "[--slider-track-size:4px] [--slider-thumb-size:14px]",
      md: "[--slider-track-size:6px] [--slider-thumb-size:18px]",
      lg: "[--slider-track-size:8px] [--slider-thumb-size:22px]",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "md",
  },
});

export interface SliderProps
  extends ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    VariantProps<typeof sliderVariants> {
  label?: string;
}

export const Slider = forwardRef<ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, size, orientation = "horizontal", label, ...props }, ref) => (
    <SliderPrimitive.Root
      ref={ref}
      orientation={orientation}
      aria-label={label}
      className={cn(sliderVariants({ orientation, size }), className)}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          "relative grow overflow-hidden rounded-full bg-[--loony-color-surface]",
          orientation === "horizontal"
            ? "h-[--slider-track-size] w-full"
            : "h-full w-[--slider-track-size]",
        )}
      >
        <SliderPrimitive.Range
          className={cn(
            "absolute rounded-full bg-[--loony-color-accent]",
            orientation === "horizontal" ? "h-full" : "w-full",
          )}
        />
      </SliderPrimitive.Track>
      {(props.value ?? props.defaultValue ?? [0]).map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className={cn(
            "block rounded-full border-2 border-[--loony-color-accent]",
            "h-[--slider-thumb-size] w-[--slider-thumb-size]",
            "bg-[--loony-color-surface]",
            "ring-offset-2 transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--loony-color-ring]",
            "disabled:pointer-events-none disabled:opacity-50",
            "shadow-sm",
          )}
        />
      ))}
    </SliderPrimitive.Root>
  ),
);
Slider.displayName = "Slider";
