"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  /**
   * The DOM element to render the portal into.
   * Defaults to document.body.
   */
  container?: HTMLElement | null;
  /**
   * When true, the portal is disabled and children render in-place.
   * Useful for SSR or testing.
   */
  disabled?: boolean;
}

/**
 * Portal — Renders children outside the current DOM tree.
 *
 * Necessary for overlays (modals, tooltips, popovers, toasts) that must
 * escape overflow:hidden and z-index stacking contexts from ancestor elements.
 *
 * Features:
 *   - SSR safe: renders nothing on server, hydrates correctly on client
 *   - Custom container: can target any mounted DOM element
 *   - Disabled mode: renders inline for testing
 *
 * @example
 * <Portal>
 *   <div role="dialog">Modal content</div>
 * </Portal>
 *
 * <Portal container={document.getElementById("toast-root")}>
 *   <Toast />
 * </Portal>
 */
export function Portal({ children, container, disabled = false }: PortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (disabled) return <>{children}</>;
  if (!mounted) return null;

  const target = container ?? document.body;
  return createPortal(children, target);
}

Portal.displayName = "Portal";

/**
 * usePortalContainer — Creates and manages a dedicated portal container element.
 *
 * Useful when you want a persistent, named container for portaling
 * rather than rendering directly into document.body.
 *
 * @example
 * const container = usePortalContainer("loony-toast-root");
 * return <Portal container={container}><Toast /></Portal>;
 */
export function usePortalContainer(id?: string): HTMLElement | null {
  const containerRef = useRef<HTMLElement | null>(null);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (id) {
      let el = document.getElementById(id);
      if (!el) {
        el = document.createElement("div");
        el.id = id;
        document.body.appendChild(el);
      }
      containerRef.current = el;
    } else {
      const el = document.createElement("div");
      document.body.appendChild(el);
      containerRef.current = el;
    }

    setContainer(containerRef.current);

    return () => {
      if (!id && containerRef.current) {
        document.body.removeChild(containerRef.current);
      }
    };
  }, [id]);

  return container;
}
