import { type ComponentPropsWithRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@loony/utils";

const inputVariants = cva(
  [
    "flex w-full rounded-[--loony-radius-input]",
    "border border-[--loony-color-border]",
    "bg-[--loony-color-bg]",
    "text-[--loony-color-fg]",
    "placeholder:text-[--loony-color-fg-subtle]",
    "transition-colors duration-[--loony-duration-fast]",
    "outline-none",
    "focus-visible:ring-2 focus-visible:ring-[--loony-color-ring] focus-visible:ring-offset-0 focus-visible:border-[--loony-color-ring]",
    "hover:border-[--loony-color-border-strong]",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[--loony-color-bg-subtle]",
    "read-only:bg-[--loony-color-bg-subtle] read-only:focus-visible:ring-0",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[--loony-color-fg]",
    // Validation states via data attributes
    "data-[invalid=true]:border-[--loony-color-danger] data-[invalid=true]:focus-visible:ring-[--loony-color-danger]",
  ],
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-3 text-sm",
        lg: "h-11 px-4 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

interface InputProps
  extends ComponentPropsWithRef<"input">,
    VariantProps<typeof inputVariants> {
  /** Marks the field as invalid. Also accepts the native `aria-invalid` attribute. */
  invalid?: boolean;
  /** Icon rendered inside the input on the left */
  leftElement?: React.ReactNode;
  /** Icon or text rendered inside the input on the right */
  rightElement?: React.ReactNode;
}

/**
 * Input — Text input with validation state and icon support.
 *
 * Accessibility:
 *   - Must be paired with a <Label htmlFor={id}> for an accessible name
 *   - Use `aria-describedby` to associate helper/error text
 *   - `invalid` prop sets aria-invalid and applies error styling
 *
 * @example
 * <Label htmlFor="email">Email</Label>
 * <Input id="email" type="email" placeholder="you@example.com" />
 *
 * // With error state:
 * <Input invalid aria-describedby="email-error" />
 * <p id="email-error">Please enter a valid email</p>
 */
export function Input({
  className,
  size,
  invalid,
  leftElement,
  rightElement,
  type = "text",
  ...props
}: InputProps) {
  const hasWrapper = leftElement != null || rightElement != null;

  const inputEl = (
    <input
      type={type}
      className={cn(
        inputVariants({ size }),
        hasWrapper && leftElement != null && "pl-9",
        hasWrapper && rightElement != null && "pr-9",
        className,
      )}
      aria-invalid={invalid ? true : undefined}
      data-invalid={invalid ? true : undefined}
      {...props}
    />
  );

  if (!hasWrapper) return inputEl;

  return (
    <div className="relative flex items-center">
      {leftElement != null && (
        <span className="absolute left-3 flex items-center text-[--loony-color-fg-muted] pointer-events-none">
          {leftElement}
        </span>
      )}
      {inputEl}
      {rightElement != null && (
        <span className="absolute right-3 flex items-center text-[--loony-color-fg-muted]">
          {rightElement}
        </span>
      )}
    </div>
  );
}

Input.displayName = "Input";
