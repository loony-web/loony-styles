import { ChevronLeftIcon, ChevronRightIcon } from "@loony/icons";
import { cn } from "@loony/utils";
import type { ComponentPropsWithoutRef } from "react";

export function Pagination({ className, ...props }: ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

export function PaginationContent({ className, ...props }: ComponentPropsWithoutRef<"ul">) {
  return <ul className={cn("flex flex-row items-center gap-1", className)} {...props} />;
}

export function PaginationItem({ className, ...props }: ComponentPropsWithoutRef<"li">) {
  return <li className={cn(className)} {...props} />;
}

const pageLinkBase = cn(
  "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-3 py-2 text-sm",
  "border border-(--loony-color-border)",
  "transition-colors duration-150",
  "hover:bg-(--loony-color-surface-hover) hover:text-(--loony-color-fg)",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--loony-color-ring)",
  "disabled:pointer-events-none disabled:opacity-50",
  "aria-[current=page]:bg-(--loony-color-accent) aria-[current=page]:text-white aria-[current=page]:border-(--loony-color-accent)",
);

export interface PaginationLinkProps extends ComponentPropsWithoutRef<"a"> {
  isActive?: boolean;
}

export function PaginationLink({ isActive, className, ...props }: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(pageLinkBase, className)}
      {...props}
    />
  );
}

export function PaginationPrevious({ className, ...props }: ComponentPropsWithoutRef<"a">) {
  return (
    <PaginationLink aria-label="Go to previous page" className={cn("gap-1", className)} {...props}>
      <ChevronLeftIcon className="h-4 w-4" aria-hidden />
      <span>Previous</span>
    </PaginationLink>
  );
}

export function PaginationNext({ className, ...props }: ComponentPropsWithoutRef<"a">) {
  return (
    <PaginationLink aria-label="Go to next page" className={cn("gap-1", className)} {...props}>
      <span>Next</span>
      <ChevronRightIcon className="h-4 w-4" aria-hidden />
    </PaginationLink>
  );
}

export function PaginationEllipsis({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex h-9 w-9 items-center justify-center text-(--loony-color-fg-muted)",
        className,
      )}
      {...props}
    >
      …<span className="sr-only">More pages</span>
    </span>
  );
}
