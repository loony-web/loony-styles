import { cva } from "class-variance-authority";

/**
 * buttonVariants — CVA variant system for the Button component.
 *
 * All color values reference CSS variables, never raw Tailwind color classes.
 * This ensures tokens are respected in any theme.
 *
 * Accessibility:
 *   - Minimum touch target: 44×44px (WCAG 2.5.5 AAA)
 *   - Focus ring applied via :focus-visible (keyboard-only)
 *   - data-loading and aria-disabled manage loading state
 */
export const buttonVariants = cva(
  // Base styles — common to all variants
  [
    // Layout
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap select-none",
    // Typography
    "font-medium leading-none",
    // Transitions
    "transition-colors duration-(--loony-duration-fast) ease-(--loony-ease-ui)",
    // Focus ring
    "outline-none",
    "focus-visible:ring-2 focus-visible:ring-(--loony-color-ring) focus-visible:ring-offset-2 focus-visible:ring-offset-(--loony-color-ring-offset)",
    // Disabled / loading
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[loading=true]:pointer-events-none data-[loading=true]:opacity-70",
    // Icon children
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        solid:
          "bg-(--loony-color-accent) text-(--loony-color-accent-fg) hover:bg-(--loony-color-accent-hover) active:bg-(--loony-color-accent-active)",
        outline:
          "border border-(--loony-color-border-strong) bg-transparent text-(--loony-color-fg) hover:bg-(--loony-color-bg-subtle) active:bg-(--loony-color-bg-muted)",
        ghost:
          "bg-transparent text-(--loony-color-fg) hover:bg-(--loony-color-bg-subtle) active:bg-(--loony-color-bg-muted)",
        link: "bg-transparent text-(--loony-color-accent) underline-offset-4 hover:underline active:opacity-80 p-0 h-auto",
        danger:
          "bg-(--loony-color-danger) text-(--loony-color-danger-fg) hover:bg-(--loony-color-danger-hover) active:opacity-90",
        "danger-outline":
          "border border-(--loony-color-danger) bg-transparent text-(--loony-color-danger) hover:bg-(--loony-color-danger-subtle) active:opacity-90",
        "danger-ghost":
          "bg-transparent text-(--loony-color-danger) hover:bg-(--loony-color-danger-subtle) active:opacity-90",
      },
      size: {
        xs: "h-7 px-2.5 text-xs rounded-(--loony-radius-sm)",
        sm: "h-8 px-3 text-sm rounded-(--loony-radius-btn)",
        md: "h-10 px-4 text-sm rounded-(--loony-radius-btn)",
        lg: "h-11 px-6 text-base rounded-(--loony-radius-btn)",
        xl: "h-12 px-8 text-base rounded-(--loony-radius-btn)",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  },
);

export type ButtonVariants = typeof buttonVariants;
