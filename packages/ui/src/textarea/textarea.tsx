import { type ComponentPropsWithRef } from "react";
import { cn } from "@loony/utils";

interface TextareaProps extends ComponentPropsWithRef<"textarea"> {
  invalid?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

/**
 * Textarea — Multi-line text input.
 *
 * @example
 * <Label htmlFor="bio">Bio</Label>
 * <Textarea id="bio" placeholder="Tell us about yourself..." rows={4} />
 */
export function Textarea({
  className,
  invalid,
  resize = "vertical",
  ...props
}: TextareaProps) {
  const resizeClass = {
    none: "resize-none",
    vertical: "resize-y",
    horizontal: "resize-x",
    both: "resize",
  }[resize];

  return (
    <textarea
      className={cn(
        "flex min-h-20 w-full",
        "rounded-[--loony-radius-input] border border-[--loony-color-border]",
        "bg-[--loony-color-bg] px-3 py-2",
        "text-sm text-[--loony-color-fg]",
        "placeholder:text-[--loony-color-fg-subtle]",
        "outline-none transition-colors duration-[--loony-duration-fast]",
        "focus-visible:ring-2 focus-visible:ring-[--loony-color-ring] focus-visible:ring-offset-0 focus-visible:border-[--loony-color-ring]",
        "hover:border-[--loony-color-border-strong]",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[--loony-color-bg-subtle]",
        "data-[invalid=true]:border-[--loony-color-danger] data-[invalid=true]:focus-visible:ring-[--loony-color-danger]",
        resizeClass,
        className,
      )}
      aria-invalid={invalid ? true : undefined}
      data-invalid={invalid ? true : undefined}
      {...props}
    />
  );
}

Textarea.displayName = "Textarea";
