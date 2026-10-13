import { Slot, type WithAsChild, cn } from "@loony/utils";
import { VisuallyHidden } from "@loony/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";

const iconButtonVariants = cva(
  [
    "inline-flex items-center justify-center shrink-0",
    "rounded-(--loony-radius-btn)",
    "transition-colors duration-(--loony-duration-fast) ease-(--loony-ease-ui)",
    "outline-none focus-visible:ring-2 focus-visible:ring-(--loony-color-ring) focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        solid:
          "bg-(--loony-color-accent) text-(--loony-color-accent-fg) hover:bg-(--loony-color-accent-hover) active:bg-(--loony-color-accent-active)",
        outline:
          "border border-(--loony-color-border-strong) text-(--loony-color-fg) hover:bg-(--loony-color-bg-subtle) active:bg-(--loony-color-bg-muted)",
        ghost:
          "text-(--loony-color-fg) hover:bg-(--loony-color-bg-subtle) active:bg-(--loony-color-bg-muted)",
        danger:
          "bg-(--loony-color-danger) text-(--loony-color-danger-fg) hover:bg-(--loony-color-danger-hover)",
        "danger-ghost": "text-(--loony-color-danger) hover:bg-(--loony-color-danger-subtle)",
      },
      size: {
        xs: "h-6 w-6 [&_svg]:w-3 [&_svg]:h-3",
        sm: "h-8 w-8 [&_svg]:w-4 [&_svg]:h-4",
        md: "h-9 w-9 [&_svg]:w-4 [&_svg]:h-4",
        lg: "h-10 w-10 [&_svg]:w-5 [&_svg]:h-5",
        xl: "h-12 w-12 [&_svg]:w-6 [&_svg]:h-6",
      },
      rounded: {
        default: "rounded-(--loony-radius-btn)",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
      rounded: "default",
    },
  },
);

interface IconButtonProps
  extends ComponentPropsWithRef<"button">,
    VariantProps<typeof iconButtonVariants>,
    WithAsChild {
  /** Accessible label — required. Announced by screen readers. */
  label: string;
}

/**
 * IconButton — A square button containing only an icon.
 *
 * The `label` prop is REQUIRED. It renders via VisuallyHidden so screen readers
 * can announce the button's purpose without a visible text label.
 *
 * Never render an icon without a label — that's an accessibility failure.
 *
 * @example
 * <IconButton label="Close dialog" onClick={onClose}>
 *   <XIcon />
 * </IconButton>
 */
export function IconButton({
  className,
  variant,
  size,
  rounded,
  asChild = false,
  label,
  children,
  type = "button",
  ...props
}: IconButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      type={asChild ? undefined : type}
      aria-label={label}
      className={cn(iconButtonVariants({ variant, size, rounded }), className)}
      {...props}
    >
      {children}
      {/* VisuallyHidden provides the accessible name when icon has aria-hidden */}
      <VisuallyHidden>{label}</VisuallyHidden>
    </Comp>
  );
}

IconButton.displayName = "IconButton";
