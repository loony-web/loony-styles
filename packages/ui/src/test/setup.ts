import "@testing-library/jest-dom";

// jsdom has no layout engine and therefore no ResizeObserver. Radix primitives
// that measure elements (Slider, ScrollArea, Popper) need it to exist.
if (typeof globalThis.ResizeObserver === "undefined") {
  globalThis.ResizeObserver = class ResizeObserver {
    observe(): void {
      // no-op: jsdom never resizes
    }
    unobserve(): void {
      // no-op
    }
    disconnect(): void {
      // no-op
    }
  };
}
