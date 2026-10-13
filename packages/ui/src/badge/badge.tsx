import { cn } from "@loony/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center gap-1",
    "rounded-(--loony-radius-badge)",
    "font-medium leading-none whitespace-nowrap",
    "border border-transparent",
  ],
  {
    variants: {
      variant: {
        solid: "bg-(--loony-color-accent) text-(--loony-color-accent-fg)",
        subtle: "bg-(--loony-color-accent-subtle) text-(--loony-color-accent)",
        outline: "bg-transparent border-(--loony-color-accent) text-(--loony-color-accent)",
        danger: "bg-(--loony-color-danger) text-(--loony-color-danger-fg)",
        "danger-subtle": "bg-(--loony-color-danger-subtle) text-(--loony-color-danger)",
        success: "bg-(--loony-color-success) text-(--loony-color-success-fg)",
        "success-subtle": "bg-(--loony-color-success-subtle) text-(--loony-color-success)",
        warning: "bg-(--loony-color-warning) text-(--loony-color-warning-fg)",
        "warning-subtle": "bg-(--loony-color-warning-subtle) text-(--loony-color-warning-fg)",
        neutral: "bg-(--loony-color-bg-muted) text-(--loony-color-fg-muted)",
      },
      size: {
        sm: "text-[10px] px-1.5 py-0.5",
        md: "text-xs px-2 py-0.5",
        lg: "text-sm px-2.5 py-1",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  },
);

interface BadgeProps extends ComponentPropsWithRef<"span">, VariantProps<typeof badgeVariants> {}

/**
 * Badge — Small status indicator or label.
 *
 * @example
 * <Badge>New</Badge>
 * <Badge variant="success-subtle">Approved</Badge>
 * <Badge variant="danger" size="sm">3</Badge>
 */
export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

Badge.displayName = "Badge";
