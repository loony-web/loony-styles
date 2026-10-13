import { describe, expect, it } from "vitest";
import { cn } from "./cn.js";

describe("cn", () => {
  it("merges simple class strings", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  // Constant conditions are the point here: they mimic `cond && "class"` call sites.
  it("handles conditional classes", () => {
    // eslint-disable-next-line no-constant-binary-expression
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
    // eslint-disable-next-line no-constant-binary-expression
    expect(cn("foo", true && "bar")).toBe("foo bar");
  });

  it("handles undefined and null gracefully", () => {
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
  });

  it("resolves Tailwind conflicts (last wins)", () => {
    expect(cn("p-4", "p-6")).toBe("p-6");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    expect(cn("bg-white", "bg-black")).toBe("bg-black");
  });

  it("handles arrays of classes", () => {
    expect(cn(["foo", "bar"], "baz")).toBe("foo bar baz");
  });

  it("handles object syntax", () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
  });

  it("returns empty string for no valid inputs", () => {
    expect(cn()).toBe("");
    expect(cn(null, undefined, false)).toBe("");
  });

  it("preserves non-conflicting Tailwind classes", () => {
    expect(cn("p-4 m-2", "text-sm")).toBe("p-4 m-2 text-sm");
  });
});
