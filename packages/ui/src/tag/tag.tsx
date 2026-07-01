"use client";

import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentPropsWithoutRef, MouseEventHandler, ReactNode } from "react";
import { cn } from "@loony/utils";
import { XIcon } from "@loony/icons";

const tagVariants = cva(
  [
    "inline-flex items-center gap-1 rounded-full font-medium",
    "transition-colors duration-150",
  ],
  {
    variants: {
      variant: {
        solid: "bg-[--loony-color-accent] text-white",
        subtle: "bg-[--loony-color-accent-subtle] text-[--loony-color-accent]",
        outline:
          "border border-[--loony-color-border] bg-transparent text-[--loony-color-fg]",
        neutral:
          "bg-[--loony-color-surface] text-[--loony-color-fg-muted] border border-[--loony-color-border]",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "subtle",
      size: "md",
    },
  },
);

export interface TagProps
  extends Omit<ComponentPropsWithoutRef<"span">, "children">,
    VariantProps<typeof tagVariants> {
  children: ReactNode;
  onDismiss?: MouseEventHandler<HTMLButtonElement>;
  dismissLabel?: string;
  icon?: ReactNode;
}

export function Tag({
  variant,
  size,
  className,
  children,
  onDismiss,
  dismissLabel = "Remove",
  icon,
  ...props
}: TagProps) {
  return (
    <span className={cn(tagVariants({ variant, size }), className)} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissLabel}
          className={cn(
            "rounded-full p-0.5 opacity-70 hover:opacity-100",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current",
            "transition-opacity duration-100",
          )}
        >
          <XIcon
            aria-hidden
            className={cn("shrink-0", size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3")}
          />
        </button>
      )}
    </span>
  );
}
