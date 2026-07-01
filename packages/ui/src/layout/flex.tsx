import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@loony/utils";

const flexVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      col: "flex-col",
      "row-reverse": "flex-row-reverse",
      "col-reverse": "flex-col-reverse",
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
      nowrap: "flex-nowrap",
      wrap: "flex-wrap",
      "wrap-reverse": "flex-wrap-reverse",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
    },
    inline: {
      true: "inline-flex",
    },
  },
  defaultVariants: {
    direction: "row",
  },
});

export interface FlexProps
  extends Omit<ComponentPropsWithoutRef<"div">, "className">,
    VariantProps<typeof flexVariants> {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}

export function Flex({
  as: Component = "div",
  direction,
  align,
  justify,
  wrap,
  gap,
  inline,
  className,
  children,
  ...props
}: FlexProps) {
  return (
    <Component
      className={cn(flexVariants({ direction, align, justify, wrap, gap, inline }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
