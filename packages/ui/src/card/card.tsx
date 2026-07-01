import { type ComponentPropsWithRef } from "react";
import { cn } from "@loony/utils";

/**
 * Card — Surface container for grouping related content.
 *
 * Compound component pattern:
 *   Card → CardHeader + CardBody + CardFooter
 *
 * No Radix primitive needed — Card is a pure layout component.
 * It does not manage focus or ARIA; that is the responsibility of its contents.
 *
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Account Summary</CardTitle>
 *     <CardDescription>Your billing details</CardDescription>
 *   </CardHeader>
 *   <CardBody>Content here</CardBody>
 *   <CardFooter>
 *     <Button>Save</Button>
 *   </CardFooter>
 * </Card>
 */

function Card({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn(
        "rounded-[--loony-radius-card]",
        "bg-[--loony-color-surface]",
        "border border-[--loony-color-border]",
        "shadow-[--loony-shadow-sm]",
        "text-[--loony-color-fg]",
        className,
      )}
      {...props}
    />
  );
}

Card.displayName = "Card";

function CardHeader({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  );
}

CardHeader.displayName = "CardHeader";

function CardTitle({ className, ...props }: ComponentPropsWithRef<"h3">) {
  return (
    <h3
      className={cn("text-lg font-semibold leading-tight tracking-tight", className)}
      {...props}
    />
  );
}

CardTitle.displayName = "CardTitle";

function CardDescription({ className, ...props }: ComponentPropsWithRef<"p">) {
  return (
    <p
      className={cn("text-sm text-[--loony-color-fg-muted]", className)}
      {...props}
    />
  );
}

CardDescription.displayName = "CardDescription";

function CardBody({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn("px-6 pb-6 pt-0", className)}
      {...props}
    />
  );
}

CardBody.displayName = "CardBody";

function CardFooter({ className, ...props }: ComponentPropsWithRef<"div">) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-6 pb-6 pt-0",
        className,
      )}
      {...props}
    />
  );
}

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter };
