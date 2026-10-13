"use client";

import { cn } from "@loony/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface EmptyStateProps extends ComponentPropsWithoutRef<"div"> {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-3 py-12 text-center", className)}
      {...props}
    >
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--loony-color-surface) text-(--loony-color-fg-muted)">
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-(--loony-color-fg)">{title}</h3>
        {description && <p className="text-sm text-(--loony-color-fg-muted)">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
