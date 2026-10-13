"use client";

import { ChevronRightIcon } from "@loony/icons";
import { cn } from "@loony/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface BreadcrumbProps extends ComponentPropsWithoutRef<"nav"> {
  separator?: ReactNode;
}

export function Breadcrumb({
  className,
  separator = <ChevronRightIcon className="h-4 w-4" aria-hidden />,
  children,
  ...props
}: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={cn(className)} {...props}>
      <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-(--loony-color-fg-muted)">
        {children}
      </ol>
    </nav>
  );
}

export interface BreadcrumbItemProps extends ComponentPropsWithoutRef<"li"> {
  isCurrentPage?: boolean;
}

export function BreadcrumbItem({
  className,
  isCurrentPage,
  children,
  ...props
}: BreadcrumbItemProps) {
  return (
    <li
      className={cn("inline-flex items-center gap-1.5", className)}
      aria-current={isCurrentPage ? "page" : undefined}
      {...props}
    >
      {children}
    </li>
  );
}

export function BreadcrumbLink({ className, children, ...props }: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      className={cn(
        "transition-colors hover:text-(--loony-color-fg)",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--loony-color-ring) rounded-sm",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function BreadcrumbPage({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn("font-normal text-(--loony-color-fg)", className)}
      aria-current="page"
      {...props}
    >
      {children}
    </span>
  );
}

export function BreadcrumbSeparator({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"li">) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn("text-(--loony-color-fg-subtle)", className)}
      {...props}
    >
      {children ?? <ChevronRightIcon className="h-3.5 w-3.5" aria-hidden />}
    </li>
  );
}

export function BreadcrumbEllipsis({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <span className="sr-only">More pages</span>
      <span>…</span>
    </span>
  );
}
