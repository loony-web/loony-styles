"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";
import { cn } from "@loony/utils";

const progressVariants = cva(
  [
    "relative w-full overflow-hidden rounded-full",
    "bg-[--loony-color-surface]",
  ],
  {
    variants: {
      size: {
        xs: "h-1",
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-4",
      },
      colorScheme: {
        accent: "[--progress-fill:var(--loony-color-accent)]",
        success: "[--progress-fill:var(--loony-color-success)]",
        danger: "[--progress-fill:var(--loony-color-danger)]",
        warning: "[--progress-fill:var(--loony-color-warning)]",
      },
    },
    defaultVariants: {
      size: "md",
      colorScheme: "accent",
    },
  },
);

export interface ProgressProps
  extends ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  label?: string;
}

export const Progress = forwardRef<
  ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, size, colorScheme, label, ...props }, ref) => {
  const progress = value ?? 0;

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(progressVariants({ size, colorScheme }), className)}
      aria-label={label}
      aria-valuenow={progress}
      value={progress}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 rounded-full bg-[--progress-fill]",
          "transition-all duration-300 ease-in-out",
          "motion-reduce:transition-none",
        )}
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = "Progress";
