import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { composeRefs } from "./compose-refs.js";

describe("composeRefs", () => {
  it("sets value on a ref object", () => {
    const ref = createRef<HTMLElement>();
    const composed = composeRefs(ref);
    composed(document.createElement("div"));
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it("calls a callback ref with the value", () => {
    const fn = vi.fn();
    const composed = composeRefs(fn);
    const el = document.createElement("div");
    composed(el);
    expect(fn).toHaveBeenCalledWith(el);
  });

  it("sets multiple refs", () => {
    const ref1 = createRef<HTMLElement>();
    const ref2 = createRef<HTMLElement>();
    const composed = composeRefs(ref1, ref2);
    const el = document.createElement("div");
    composed(el);
    expect(ref1.current).toBe(el);
    expect(ref2.current).toBe(el);
  });

  it("handles null refs gracefully", () => {
    const ref = createRef<HTMLElement>();
    expect(() => composeRefs(null, ref)(document.createElement("div"))).not.toThrow();
  });

  it("handles undefined refs gracefully", () => {
    expect(() => composeRefs(undefined)(document.createElement("div"))).not.toThrow();
  });

  it("mixes ref objects and callback refs", () => {
    const ref = createRef<HTMLElement>();
    const fn = vi.fn();
    const composed = composeRefs(ref, fn);
    const el = document.createElement("div");
    composed(el);
    expect(ref.current).toBe(el);
    expect(fn).toHaveBeenCalledWith(el);
  });
});
