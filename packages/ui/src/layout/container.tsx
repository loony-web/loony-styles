import { cn } from "@loony/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
      full: "max-w-full",
    },
  },
  defaultVariants: {
    size: "xl",
  },
});

export interface ContainerProps
  extends Omit<ComponentPropsWithoutRef<"div">, "className">,
    VariantProps<typeof containerVariants> {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}

export function Container({
  as: Component = "div",
  size,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Component className={cn(containerVariants({ size }), className)} {...props}>
      {children}
    </Component>
  );
}
