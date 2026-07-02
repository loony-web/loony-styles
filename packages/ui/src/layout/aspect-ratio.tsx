"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@loony/utils";

export interface AspectRatioProps
  extends ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  className?: string;
}

export function AspectRatio({ className, ...props }: AspectRatioProps) {
  return <AspectRatioPrimitive.Root className={cn("overflow-hidden", className)} {...props} />;
}