"use client";

import { Toast, ToastProvider, ToastViewport } from "./toast.js";
import { useToast } from "./use-toast.js";

export function Toaster() {
  const { toasts, dismiss, remove } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, variant, duration, open }) => (
        <Toast
          key={id}
          open={open}
          onOpenChange={(isOpen) => {
            if (!isOpen) dismiss(id);
          }}
          onAnimationEnd={() => {
            if (!open) remove(id);
          }}
          duration={duration}
          variant={variant}
          title={title}
          description={description}
        />
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
