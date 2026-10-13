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

// jsdom does not implement scrollIntoView; cmdk calls it to keep the
// highlighted option visible.
if (typeof Element !== "undefined" && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function scrollIntoView() {
    // no-op: jsdom has no layout to scroll
  };
}

// jsdom lacks pointer capture; Radix Select and DropdownMenu call these on pointerdown.
if (typeof Element !== "undefined" && !Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false;
  Element.prototype.setPointerCapture = () => undefined;
  Element.prototype.releasePointerCapture = () => undefined;
}
