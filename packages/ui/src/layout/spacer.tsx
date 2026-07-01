import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@loony/utils";

export interface SpacerProps extends ComponentPropsWithoutRef<"div"> {
  axis?: "horizontal" | "vertical" | "both";
  size?: number | string;
}

export function Spacer({ axis = "both", size, className, style, ...props }: SpacerProps) {
  const sizeValue = size !== undefined ? (typeof size === "number" ? `${size * 4}px` : size) : undefined;

  return (
    <div
      aria-hidden="true"
      className={cn(
        axis === "vertical" ? "w-0" : "h-0",
        axis === "horizontal" ? "h-0" : "",
        !sizeValue && "flex-1",
        className,
      )}
      style={{
        ...(sizeValue && axis !== "horizontal" ? { height: sizeValue } : {}),
        ...(sizeValue && axis !== "vertical" ? { width: sizeValue } : {}),
        ...style,
      }}
      {...props}
    />
  );
}
