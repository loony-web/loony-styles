import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — Class Name utility.
 *
 * Merges conditional class names and resolves Tailwind conflicts.
 * Uses clsx for conditional logic and tailwind-merge to resolve
 * Tailwind-specific conflicts (e.g. "p-4 p-6" → "p-6").
 *
 * @example
 * cn("flex items-center", isActive && "text-accent", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
