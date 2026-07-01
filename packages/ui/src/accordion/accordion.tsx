import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { type ComponentPropsWithRef } from "react";
import { cn } from "@loony/utils";
import { ChevronDownIcon } from "@loony/icons";

/**
 * Accordion — Vertically stacked collapsible sections.
 *
 * Supports `type="single"` (one open at a time) and `type="multiple"`.
 * Built on Radix UI Accordion which provides keyboard navigation and ARIA.
 *
 * @example
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Is it accessible?</AccordionTrigger>
 *     <AccordionContent>Yes. Follows WAI-ARIA patterns.</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 */

const Accordion = AccordionPrimitive.Root;
Accordion.displayName = "Accordion";

function AccordionItem({
  className,
  ...props
}: ComponentPropsWithRef<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b border-[--loony-color-border]", className)}
      {...props}
    />
  );
}

AccordionItem.displayName = "AccordionItem";

function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentPropsWithRef<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 items-center justify-between py-4",
          "text-sm font-medium text-left",
          "transition-all duration-[--loony-duration-fast]",
          "outline-none focus-visible:ring-2 focus-visible:ring-[--loony-color-ring] focus-visible:ring-offset-2 rounded-[--loony-radius-sm]",
          "hover:underline",
          "[&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          className="h-4 w-4 shrink-0 text-[--loony-color-fg-muted] transition-transform duration-[--loony-duration-fast]"
          aria-hidden
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

AccordionTrigger.displayName = "AccordionTrigger";

function AccordionContent({
  className,
  children,
  ...props
}: ComponentPropsWithRef<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        "overflow-hidden text-sm",
        "data-[state=closed]:animate-accordion-up",
        "data-[state=open]:animate-accordion-down",
        "motion-reduce:animate-none",
        className,
      )}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </AccordionPrimitive.Content>
  );
}

AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
