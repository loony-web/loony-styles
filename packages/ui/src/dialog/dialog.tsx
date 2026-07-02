"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { type ComponentPropsWithRef } from "react";
import { cn } from "@loony/utils";
import { XIcon } from "@loony/icons";
import { IconButton } from "../icon-button/icon-button.js";

/**
 * Dialog — Modal overlay component.
 *
 * Compound component API:
 *   Dialog → DialogTrigger + DialogContent
 *   DialogContent → DialogHeader + DialogBody + DialogFooter
 *
 * Built on Radix UI Dialog which handles:
 *   - Focus trap within the dialog
 *   - Focus restoration to the trigger on close
 *   - Escape key to close
 *   - aria-modal, aria-labelledby, aria-describedby
 *   - Body scroll lock
 *   - Portal rendering
 *
 * Accessibility:
 *   - DialogTitle is required for aria-labelledby to work
 *   - DialogDescription is recommended
 *
 * @example
 * <Dialog>
 *   <DialogTrigger asChild>
 *     <Button>Open Dialog</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Are you sure?</DialogTitle>
 *       <DialogDescription>This action cannot be undone.</DialogDescription>
 *     </DialogHeader>
 *     <DialogBody>...</DialogBody>
 *     <DialogFooter>
 *       <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
 *       <Button variant="danger">Delete</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 */

const Dialog = DialogPrimitive.Root;
Dialog.displayName = "Dialog";

const DialogTrigger = DialogPrimitive.Trigger;
DialogTrigger.displayName = "DialogTrigger";

const DialogClose = DialogPrimitive.Close;
DialogClose.displayName = "DialogClose";

const DialogPortal = DialogPrimitive.Portal;
DialogPortal.displayName = "DialogPortal";

function DialogOverlay({
  className,
  ...props
}: ComponentPropsWithRef<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-[--loony-z-overlay]",
        "bg-[--loony-color-bg-overlay]",
        "backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  );
}

DialogOverlay.displayName = "DialogOverlay";

interface DialogContentProps
  extends ComponentPropsWithRef<typeof DialogPrimitive.Content> {
  /** Whether to show the close button in the top-right corner. */
  showClose?: boolean;
}

function DialogContent({
  className,
  children,
  showClose = true,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-[--loony-z-modal]",
          "-translate-x-1/2 -translate-y-1/2",
          "w-full max-w-lg",
          "bg-[--loony-color-surface]",
          "rounded-[--loony-radius-dialog]",
          "border border-[--loony-color-border]",
          "shadow-[--loony-shadow-xl]",
          "outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2",
          "duration-[--loony-duration-normal]",
          "motion-reduce:animate-none",
          className,
        )}
        {...props}
      >
        {children}
        {showClose && (
          <DialogClose asChild>
            <IconButton
              label="Close dialog"
              variant="ghost"
              size="sm"
              className="absolute right-4 top-4 text-[--loony-color-fg-muted]"
            >
              <XIcon />
            </IconButton>
          </DialogClose>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

DialogContent.displayName = "DialogContent";

function DialogHeader({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 p-6 pb-0", className)}
      {...props}
    />
  );
}

DialogHeader.displayName = "DialogHeader";

function DialogBody({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div className={cn("px-6 py-4", className)} {...props} />
  );
}

DialogBody.displayName = "DialogBody";

function DialogFooter({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end gap-2 px-6 pb-6 pt-2",
        className,
      )}
      {...props}
    />
  );
}

DialogFooter.displayName = "DialogFooter";

function DialogTitle({
  className,
  ...props
}: ComponentPropsWithRef<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("text-lg font-semibold leading-tight tracking-tight", className)}
      {...props}
    />
  );
}

DialogTitle.displayName = "DialogTitle";

function DialogDescription({
  className,
  ...props
}: ComponentPropsWithRef<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm text-[--loony-color-fg-muted]", className)}
      {...props}
    />
  );
}

DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};