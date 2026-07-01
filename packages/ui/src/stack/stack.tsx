import { type ElementType, type ComponentPropsWithRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@loony/utils";

const stackVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
      "row-reverse": "flex-row-reverse",
      "column-reverse": "flex-col-reverse",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      wrap: "flex-wrap",
      nowrap: "flex-nowrap",
      "wrap-reverse": "flex-wrap-reverse",
    },
    gap: {
      0: "gap-0",
      px: "gap-px",
      0.5: "gap-0.5",
      1: "gap-1",
      1.5: "gap-1.5",
      2: "gap-2",
      2.5: "gap-2.5",
      3: "gap-3",
      3.5: "gap-3.5",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      7: "gap-7",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
      16: "gap-16",
    },
  },
  defaultVariants: {
    direction: "column",
    align: "stretch",
    justify: "start",
    wrap: "nowrap",
  },
});

interface StackProps
  extends ComponentPropsWithRef<"div">,
    VariantProps<typeof stackVariants> {
  as?: ElementType;
}

/**
 * Stack — Flexbox layout primitive for vertical or horizontal stacking.
 *
 * No Radix primitive needed — this is a pure layout utility.
 * Prefer Stack over raw flex utilities when the layout intent should be
 * explicit in the component tree.
 *
 * @example
 * // Vertical stack (default):
 * <Stack gap={4}>
 *   <Text>Item 1</Text>
 *   <Text>Item 2</Text>
 * </Stack>
 *
 * // Horizontal stack:
 * <Stack direction="row" align="center" gap={2}>
 *   <Avatar />
 *   <Text>John Doe</Text>
 * </Stack>
 */
export function Stack({
  className,
  as: Tag = "div",
  direction,
  align,
  justify,
  wrap,
  gap,
  ...props
}: StackProps) {
  return (
    <Tag
      className={cn(stackVariants({ direction, align, justify, wrap, gap }), className)}
      {...props}
    />
  );
}

Stack.displayName = "Stack";
