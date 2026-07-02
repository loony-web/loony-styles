"use client";

import { useState } from "react";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect.js";

interface Size {
  width: number;
  height: number;
}

/**
 * useSize — Tracks the pixel dimensions of a DOM element via ResizeObserver.
 *
 * Returns undefined until the element is mounted and measured.
 * Uses ResizeObserver for efficient, paint-free measurement.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const size = useSize(ref.current);
 */
export function useSize(element: HTMLElement | null | undefined): Size | undefined {
  const [size, setSize] = useState<Size | undefined>(undefined);

  useIsomorphicLayoutEffect(() => {
    if (!element) {
      setSize(undefined);
      return;
    }

    setSize({
      width: element.offsetWidth,
      height: element.offsetHeight,
    });

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0] ?? {
        inlineSize: entry.contentRect.width,
        blockSize: entry.contentRect.height,
      };
      setSize({ width, height });
    });

    observer.observe(element, { box: "content-box" });
    return () => observer.disconnect();
  }, [element]);

  return size;
}
