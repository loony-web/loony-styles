"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "@loony/utils";
import { XIcon } from "@loony/icons";
import { IconButton } from "../icon-button/icon-button";

export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerClose = DialogPrimitive.Close;

const drawerOverlayVariants = cva(
  [
    "fixed inset-0 z-50 bg-black/50",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=open]:fade-in data-[state=closed]:fade-out",
    "duration-300 motion-reduce:duration-0",
  ],
);

export const DrawerOverlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(drawerOverlayVariants(), className)}
    {...props}
  />
));
DrawerOverlay.displayName = "DrawerOverlay";

const drawerContentVariants = cva(
  [
    "fixed z-50 flex flex-col gap-0",
    "bg-[--loony-color-surface] shadow-xl",
    "focus:outline-none",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "duration-300 motion-reduce:duration-0",
  ],
  {
    variants: {
      side: {
        left: [
          "left-0 inset-y-0 h-full w-3/4 sm:max-w-sm",
          "data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
          "border-r border-[--loony-color-border]",
        ],
        right: [
          "right-0 inset-y-0 h-full w-3/4 sm:max-w-sm",
          "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
          "border-l border-[--loony-color-border]",
        ],
        top: [
          "top-0 inset-x-0 w-full",
          "data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
          "border-b border-[--loony-color-border]",
        ],
        bottom: [
          "bottom-0 inset-x-0 w-full",
          "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
          "border-t border-[--loony-color-border]",
        ],
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

export interface DrawerContentProps
  extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof drawerContentVariants> {
  hideClose?: boolean;
}

export const DrawerContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(({ className, side, hideClose, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DrawerOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(drawerContentVariants({ side }), className)}
      {...props}
    >
      {!hideClose && (
        <div className="absolute right-4 top-4">
          <DialogPrimitive.Close asChild>
            <IconButton
              label="Close drawer"
              variant="ghost"
              size="sm"
              icon={<XIcon aria-hidden />}
            />
          </DialogPrimitive.Close>
        </div>
      )}
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DrawerContent.displayName = "DrawerContent";

export function DrawerHeader({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 px-6 py-4 border-b border-[--loony-color-border]", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function DrawerBody({ className, children, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex-1 overflow-y-auto px-6 py-4", className)} {...props}>
      {children}
    </div>
  );
}

export function DrawerFooter({ className, children, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2 px-6 py-4",
        "border-t border-[--loony-color-border]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export const DrawerTitle = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-[--loony-color-fg]", className)}
    {...props}
  />
));
DrawerTitle.displayName = "DrawerTitle";

export const DrawerDescription = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-[--loony-color-fg-muted]", className)}
    {...props}
  />
));
DrawerDescription.displayName = "DrawerDescription";
