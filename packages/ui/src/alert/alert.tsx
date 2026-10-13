"use client";

import { AlertCircleIcon, AlertTriangleIcon, CheckCircleIcon, InfoIcon } from "@loony/icons";
import { cn } from "@loony/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";

const alertVariants = cva(
  [
    "relative w-full rounded-(--loony-radius-md)",
    "border p-4",
    "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
    "[&>svg~*]:pl-7",
  ],
  {
    variants: {
      variant: {
        info: [
          "bg-(--loony-color-info-subtle) border-(--loony-color-info)",
          "text-(--loony-color-info)",
          "[&>svg]:text-(--loony-color-info)",
        ],
        success: [
          "bg-(--loony-color-success-subtle) border-(--loony-color-success)",
          "text-(--loony-color-success)",
          "[&>svg]:text-(--loony-color-success)",
        ],
        warning: [
          "bg-(--loony-color-warning-subtle) border-(--loony-color-warning)",
          "text-(--loony-color-warning-fg)",
          "[&>svg]:text-(--loony-color-warning)",
        ],
        danger: [
          "bg-(--loony-color-danger-subtle) border-(--loony-color-danger)",
          "text-(--loony-color-danger)",
          "[&>svg]:text-(--loony-color-danger)",
        ],
        neutral: [
          "bg-(--loony-color-bg-subtle) border-(--loony-color-border)",
          "text-(--loony-color-fg)",
          "[&>svg]:text-(--loony-color-fg-muted)",
        ],
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

const defaultIcons = {
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: AlertTriangleIcon,
  danger: AlertCircleIcon,
  neutral: InfoIcon,
} as const;

interface AlertProps extends ComponentPropsWithRef<"div">, VariantProps<typeof alertVariants> {
  /** Custom icon. Pass null to suppress the default icon. */
  icon?: React.ReactNode | null;
}

/**
 * Alert — Inline status message.
 *
 * Uses role="alert" for live region announcement on dynamic insertion.
 * For static alerts (present on page load), no role is needed.
 *
 * Compound API:
 *   Alert → AlertTitle + AlertDescription
 *
 * @example
 * <Alert variant="danger">
 *   <AlertTitle>Payment failed</AlertTitle>
 *   <AlertDescription>Your card was declined. Please update your billing info.</AlertDescription>
 * </Alert>
 */
function Alert({ className, variant = "info", icon, children, ...props }: AlertProps) {
  const DefaultIcon = defaultIcons[variant ?? "info"];
  const resolvedIcon = icon === null ? null : (icon ?? <DefaultIcon size={16} aria-hidden />);

  return (
    <div role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      {resolvedIcon}
      {children}
    </div>
  );
}

Alert.displayName = "Alert";

function AlertTitle({ className, children, ...props }: ComponentPropsWithRef<"h5">) {
  return (
    <h5 className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props}>
      {children}
    </h5>
  );
}

AlertTitle.displayName = "AlertTitle";

function AlertDescription({ className, ...props }: ComponentPropsWithRef<"div">) {
  return <div className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />;
}

AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
