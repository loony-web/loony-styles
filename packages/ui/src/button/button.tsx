"use client";

import { Slot } from "@loony/utils";
import { cn } from "@loony/utils";
import { Spinner } from "../spinner/spinner.js";
import { buttonVariants } from "./button.styles.js";
import type { ButtonProps } from "./button.types.js";

/**
 * Button — The primary interactive element.
 *
 * Design philosophy:
 *   All variants are expressed through the `variant` prop, not separate components.
 *   This keeps the API surface small and predictable.
 *
 * Polymorphism:
 *   Use `asChild` to render as any element or component:
 *   <Button asChild><a href="/path">Navigate</a></Button>
 *
 * Accessibility:
 *   - Renders as <button type="button"> by default (prevents accidental form submit)
 *   - Sets aria-disabled (not the disabled attr) during loading so AT still announces it
 *   - Focus ring visible on keyboard navigation only (:focus-visible)
 *   - data-state, data-loading, data-variant attributes for CSS targeting
 *
 * @example
 * <Button>Click me</Button>
 * <Button variant="outline" size="sm">Cancel</Button>
 * <Button variant="danger" onClick={handleDelete}>Delete</Button>
 * <Button loading leftIcon={<PlusIcon />}>Creating...</Button>
 * <Button asChild><a href="/dashboard">Dashboard</a></Button>
 */
export function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  leftIcon,
  rightIcon,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const isDisabled = disabled ?? loading;

  return (
    <Comp
      type={asChild ? undefined : type}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={asChild ? undefined : isDisabled}
      aria-disabled={isDisabled ? true : undefined}
      data-loading={loading ? true : undefined}
      data-variant={variant}
      data-size={size}
      {...props}
    >
      {loading ? (
        <Spinner size="sm" aria-hidden />
      ) : leftIcon != null ? (
        <span className="shrink-0" aria-hidden>
          {leftIcon}
        </span>
      ) : null}

      {children}

      {!loading && rightIcon != null ? (
        <span className="shrink-0" aria-hidden>
          {rightIcon}
        </span>
      ) : null}
    </Comp>
  );
}

Button.displayName = "Button";
