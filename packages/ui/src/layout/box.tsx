import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@loony/utils";

export interface BoxProps extends Omit<ComponentPropsWithoutRef<"div">, "className"> {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
}

export function Box({ as: Component = "div", className, children, ...props }: BoxProps) {
  return (
    <Component className={cn(className)} {...props}>
      {children}
    </Component>
  );
}
