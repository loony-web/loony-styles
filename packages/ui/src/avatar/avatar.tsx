"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { type ComponentPropsWithRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@loony/utils";

const avatarVariants = cva(
  "relative inline-flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-[10px]",
        sm: "h-8 w-8 text-xs",
        md: "h-9 w-9 text-sm",
        lg: "h-10 w-10 text-base",
        xl: "h-12 w-12 text-lg",
        "2xl": "h-16 w-16 text-xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

// ---- Root ----

interface AvatarProps
  extends ComponentPropsWithRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

function Avatar({ className, size, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={cn(avatarVariants({ size }), className)}
      {...props}
    />
  );
}

Avatar.displayName = "Avatar";

// ---- Image ----

type AvatarImageProps = ComponentPropsWithRef<typeof AvatarPrimitive.Image>;

function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  );
}

AvatarImage.displayName = "AvatarImage";

// ---- Fallback ----

type AvatarFallbackProps = ComponentPropsWithRef<typeof AvatarPrimitive.Fallback>;

function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "flex h-full w-full items-center justify-center",
        "bg-[--loony-color-bg-muted] text-[--loony-color-fg-muted]",
        "font-medium uppercase select-none",
        className,
      )}
      {...props}
    />
  );
}

AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };