import { cn } from "@loony/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface FormFieldProps extends ComponentPropsWithoutRef<"div"> {
  label?: ReactNode;
  htmlFor?: string;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  isRequired?: boolean;
  isDisabled?: boolean;
}

export function FormField({
  label,
  htmlFor,
  helperText,
  errorMessage,
  isRequired,
  isDisabled,
  className,
  children,
  ...props
}: FormFieldProps) {
  const hasError = Boolean(errorMessage);

  return (
    <div className={cn("flex flex-col gap-1.5", isDisabled && "opacity-50", className)} {...props}>
      {label && (
        <label
          htmlFor={htmlFor}
          className={cn(
            "text-sm font-medium leading-none text-(--loony-color-fg)",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          )}
        >
          {label}
          {isRequired && (
            <span className="ml-1 text-(--loony-color-danger)" aria-hidden="true">
              *
            </span>
          )}
          {isRequired && <span className="sr-only">(required)</span>}
        </label>
      )}
      {children}
      {helperText && !hasError && (
        <p className="text-xs text-(--loony-color-fg-muted)">{helperText}</p>
      )}
      {hasError && (
        <p className="text-xs text-(--loony-color-danger)" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
