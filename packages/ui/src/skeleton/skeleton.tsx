import { type ComponentPropsWithRef } from "react";
import { cn } from "@loony/utils";

interface SkeletonProps extends ComponentPropsWithRef<"div"> {}

/**
 * Skeleton — Placeholder loading state.
 *
 * Uses CSS animation for the shimmer effect.
 * Respects prefers-reduced-motion: reduces the shimmer to a static state.
 *
 * @example
 * <Skeleton className="h-4 w-32 rounded" />
 * <Skeleton className="h-10 w-full rounded-md" />
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      aria-busy="true"
      className={cn(
        "animate-pulse rounded-[--loony-radius-sm]",
        "bg-[--loony-color-bg-muted]",
        "motion-reduce:animate-none motion-reduce:opacity-70",
        className,
      )}
      {...props}
    />
  );
}

Skeleton.displayName = "Skeleton";
