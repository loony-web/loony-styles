import * as TabsPrimitive from "@radix-ui/react-tabs";
import { type ComponentPropsWithRef } from "react";
import { cn } from "@loony/utils";

/**
 * Tabs — Tabbed navigation panel.
 *
 * Built on Radix UI Tabs which handles:
 *   - Keyboard navigation (Arrow keys, Home, End)
 *   - aria-selected, aria-controls, aria-labelledby
 *   - Controlled and uncontrolled state
 *
 * @example
 * <Tabs defaultValue="overview">
 *   <TabsList>
 *     <TabsTrigger value="overview">Overview</TabsTrigger>
 *     <TabsTrigger value="settings">Settings</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="overview">...</TabsContent>
 *   <TabsContent value="settings">...</TabsContent>
 * </Tabs>
 */

const Tabs = TabsPrimitive.Root;
Tabs.displayName = "Tabs";

function TabsList({
  className,
  ...props
}: ComponentPropsWithRef<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        "inline-flex h-10 items-center justify-center gap-1",
        "rounded-[--loony-radius-lg] bg-[--loony-color-bg-muted] p-1",
        "text-[--loony-color-fg-muted]",
        className,
      )}
      {...props}
    />
  );
}

TabsList.displayName = "TabsList";

function TabsTrigger({
  className,
  ...props
}: ComponentPropsWithRef<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex items-center justify-center gap-1.5",
        "whitespace-nowrap rounded-[--loony-radius-md] px-3 py-1.5",
        "text-sm font-medium",
        "transition-all duration-[--loony-duration-fast]",
        "outline-none focus-visible:ring-2 focus-visible:ring-[--loony-color-ring] focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:bg-[--loony-color-surface] data-[state=active]:text-[--loony-color-fg] data-[state=active]:shadow-[--loony-shadow-sm]",
        "data-[state=inactive]:hover:text-[--loony-color-fg]",
        className,
      )}
      {...props}
    />
  );
}

TabsTrigger.displayName = "TabsTrigger";

function TabsContent({
  className,
  ...props
}: ComponentPropsWithRef<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        "mt-2 outline-none",
        "focus-visible:ring-2 focus-visible:ring-[--loony-color-ring] focus-visible:ring-offset-2 rounded-[--loony-radius-md]",
        className,
      )}
      {...props}
    />
  );
}

TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
