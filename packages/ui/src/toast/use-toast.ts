"use client";

import { useSyncExternalStore } from "react";

export type ToastVariant = "default" | "success" | "danger" | "warning" | "info";

export interface ToastItem {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  open: boolean;
}

export type ToastInput = Omit<ToastItem, "id" | "open">;

// ── Store ────────────────────────────────────────────────────────────────────
// One module-level list shared by every useToast() caller and the <Toaster />.
// (Per-component state would give each caller its own invisible list.)

const EMPTY: ToastItem[] = [];
let toasts: ToastItem[] = EMPTY;
const listeners = new Set<() => void>();

function update(next: (prev: ToastItem[]) => ToastItem[]) {
  toasts = next(toasts);
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

let toastCount = 0;

function generateId() {
  toastCount = (toastCount + 1) % Number.MAX_SAFE_INTEGER;
  return `toast-${toastCount}`;
}

/**
 * Show a toast. Works anywhere on the client, including outside components.
 * Requires a mounted <Toaster /> to render. Returns the toast id.
 */
export function toast(input: ToastInput): string {
  const id = generateId();
  update((prev) => [...prev, { ...input, id, open: true }]);
  return id;
}

/** Start closing a toast (plays its exit animation). */
export function dismissToast(id: string): void {
  update((prev) => prev.map((t) => (t.id === id ? { ...t, open: false } : t)));
}

/** Remove a toast immediately, without an exit animation. */
export function removeToast(id: string): void {
  update((prev) => prev.filter((t) => t.id !== id));
}

/**
 * useToast — Read the toast list and get the toast actions.
 *
 * SSR: the server always sees an empty list; call `toast()` from client code only.
 *
 * @example
 * const { toast } = useToast();
 * toast({ title: "Saved", variant: "success" });
 */
export function useToast() {
  const list = useSyncExternalStore(
    subscribe,
    () => toasts,
    () => EMPTY,
  );
  return { toasts: list, toast, dismiss: dismissToast, remove: removeToast };
}
