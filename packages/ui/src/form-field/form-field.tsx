import { cn } from "@loony/utils";
import { type ComponentPropsWithoutRef, type ReactNode, cloneElement, isValidElement } from "react";

export interface FormFieldProps extends ComponentPropsWithoutRef<"div"> {
  label?: ReactNode;
  /**
   * id of the control. Connects the label, and derives the ids that link the
   * helper/error text to the control via aria-describedby.
   */
  htmlFor?: string;
  helperText?: ReactNode;
  errorMessage?: ReactNode;
  isRequired?: boolean;
  isDisabled?: boolean;
}

interface ControlProps {
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "true" | "false";
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
  const helperId = htmlFor && helperText && !hasError ? `${htmlFor}-helper` : undefined;
  const errorId = htmlFor && hasError ? `${htmlFor}-error` : undefined;

  // Link the hint or error to the control so it's announced on focus, and mark
  // the control invalid. Only a single element child can be wired up.
  let control = children;
  if (isValidElement<ControlProps>(children)) {
    const describedBy = [children.props["aria-describedby"], helperId ?? errorId]
      .filter(Boolean)
      .join(" ");
    control = cloneElement(children, {
      "aria-describedby": describedBy || undefined,
      ...(hasError && { "aria-invalid": true }),
    });
  }

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
      {control}
      {helperText && !hasError && (
        <p id={helperId} className="text-xs text-(--loony-color-fg-muted)">
          {helperText}
        </p>
      )}
      {hasError && (
        <p id={errorId} className="text-xs text-(--loony-color-danger)" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
