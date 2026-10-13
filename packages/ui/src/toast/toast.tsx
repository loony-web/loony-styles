"use client";

import { AlertCircleIcon, AlertTriangleIcon, CheckCircleIcon, InfoIcon, XIcon } from "@loony/icons";
import { cn } from "@loony/utils";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ComponentRef, ReactNode } from "react";
import { forwardRef } from "react";

export const ToastProvider = ToastPrimitive.Provider;

export const ToastViewport = forwardRef<
  ComponentRef<typeof ToastPrimitive.Viewport>,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      "fixed bottom-0 right-0 z-[100] m-0 flex max-h-screen w-full flex-col-reverse gap-2 p-4",
      "sm:max-w-[420px]",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

const toastVariants = cva(
  [
    "group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden",
    "rounded-lg border p-4 shadow-lg",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=open]:slide-in-from-bottom-5 data-[state=closed]:slide-out-to-right-full",
    "data-[state=open]:fade-in data-[state=closed]:fade-out",
    "duration-300 motion-reduce:duration-0",
    "transition-all",
  ],
  {
    variants: {
      variant: {
        default: "border-(--loony-color-border) bg-(--loony-color-surface) text-(--loony-color-fg)",
        success:
          "border-(--loony-color-success-border) bg-(--loony-color-success-subtle) text-(--loony-color-success)",
        danger:
          "border-(--loony-color-danger-border) bg-(--loony-color-danger-subtle) text-(--loony-color-danger)",
        warning:
          "border-(--loony-color-warning-border) bg-(--loony-color-warning-subtle) text-(--loony-color-warning)",
        info: "border-(--loony-color-info-border) bg-(--loony-color-info-subtle) text-(--loony-color-info)",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const VARIANT_ICONS = {
  default: null,
  success: CheckCircleIcon,
  danger: AlertCircleIcon,
  warning: AlertTriangleIcon,
  info: InfoIcon,
} as const;

export interface ToastProps
  extends Omit<ComponentPropsWithoutRef<typeof ToastPrimitive.Root>, "title">,
    VariantProps<typeof toastVariants> {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  showIcon?: boolean;
}

export const Toast = forwardRef<ComponentRef<typeof ToastPrimitive.Root>, ToastProps>(
  (
    {
      className,
      variant = "default",
      title,
      description,
      action,
      showIcon = true,
      children,
      ...props
    },
    ref,
  ) => {
    const Icon = variant ? VARIANT_ICONS[variant] : null;

    return (
      <ToastPrimitive.Root
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        {showIcon && Icon && <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />}
        <div className="flex-1 space-y-1">
          {title && (
            <ToastPrimitive.Title className="text-sm font-semibold">{title}</ToastPrimitive.Title>
          )}
          {description && (
            <ToastPrimitive.Description className="text-sm opacity-80">
              {description}
            </ToastPrimitive.Description>
          )}
          {children}
        </div>
        {action}
        <ToastPrimitive.Close
          className={cn(
            "absolute right-2 top-2 rounded-md p-1",
            "opacity-0 transition-opacity hover:opacity-100 focus:opacity-100",
            "group-hover:opacity-70",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--loony-color-ring)",
          )}
          aria-label="Dismiss"
        >
          <XIcon className="h-4 w-4" aria-hidden />
        </ToastPrimitive.Close>
      </ToastPrimitive.Root>
    );
  },
);
Toast.displayName = "Toast";

export const ToastAction = forwardRef<
  ComponentRef<typeof ToastPrimitive.Action>,
  ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(
      "inline-flex shrink-0 items-center justify-center rounded-md px-3 py-1.5",
      "text-sm font-medium transition-colors",
      "border border-(--loony-color-border) hover:bg-(--loony-color-surface-hover)",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--loony-color-ring)",
      "disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = "ToastAction";
