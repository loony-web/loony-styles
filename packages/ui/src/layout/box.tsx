import { Slot, type WithAsChild, cn } from "@loony/utils";
import type { ComponentPropsWithRef } from "react";

export interface BoxProps extends ComponentPropsWithRef<"div">, WithAsChild {}

/**
 * Box — General-purpose layout primitive. Renders a `<div>` by default.
 *
 * To render a different element, use `asChild` (ADR-003) rather than an `as`
 * prop: the child element's own props and types are kept.
 *
 * @example
 * <Box className="p-4">Content</Box>
 *
 * <Box asChild className="py-16">
 *   <section aria-labelledby="pricing">…</section>
 * </Box>
 */
export function Box({ asChild = false, className, ...props }: BoxProps) {
  const Comp = asChild ? Slot : "div";
  return <Comp className={cn(className)} {...props} />;
}
