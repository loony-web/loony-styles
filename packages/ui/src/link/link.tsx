"use client";

import { type ComponentPropsWithRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, Slot, type WithAsChild } from "@loony/utils";
import { ExternalLinkIcon } from "@loony/icons";
import { VisuallyHidden } from "@loony/utils";

const linkVariants = cva(
  [
    "inline-flex items-center gap-1",
    "underline-offset-4",
    "transition-colors duration-[--loony-duration-fast]",
    "outline-none focus-visible:ring-2 focus-visible:ring-[--loony-color-ring] focus-visible:ring-offset-2 rounded-[--loony-radius-xs]",
  ],
  {
    variants: {
      variant: {
        default:
          "text-[--loony-color-accent] underline hover:text-[--loony-color-accent-hover]",
        subtle:
          "text-[--loony-color-fg-muted] hover:text-[--loony-color-fg] hover:underline",
        ghost: "text-[--loony-color-fg] hover:text-[--loony-color-accent] hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface LinkProps
  extends ComponentPropsWithRef<"a">,
    VariantProps<typeof linkVariants>,
    WithAsChild {
  /** Show external link indicator icon and adds "(opens in new tab)" for screen readers */
  external?: boolean;
}

/**
 * Link — Accessible anchor element.
 *
 * When `external` is true:
 *   - Adds rel="noopener noreferrer" (security)
 *   - Adds target="_blank"
 *   - Shows external link icon (aria-hidden)
 *   - Appends "(opens in new tab)" via VisuallyHidden for screen readers
 *
 * @example
 * <Link href="/about">About us</Link>
 * <Link href="https://example.com" external>External site</Link>
 */
export function Link({
  className,
  variant,
  asChild = false,
  external = false,
  children,
  rel,
  target,
  ...props
}: LinkProps) {
  const Comp = asChild ? Slot : "a";

  const externalProps = external
    ? {
        target: target ?? "_blank",
        rel: rel ?? "noopener noreferrer",
      }
    : { rel, target };

  return (
    <Comp
      className={cn(linkVariants({ variant }), className)}
      {...externalProps}
      {...props}
    >
      {children}
      {external && (
        <>
          <ExternalLinkIcon size="0.75em" aria-hidden />
          <VisuallyHidden>(opens in new tab)</VisuallyHidden>
        </>
      )}
    </Comp>
  );
}

Link.displayName = "Link";