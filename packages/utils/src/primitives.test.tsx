import { render, renderHook, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { createContext, createScopedContext } from "./create-context.js";
import { Portal, usePortalContainer } from "./portal.js";
import { VisuallyHidden } from "./visually-hidden.js";

describe("createContext", () => {
  it("provides a value to consumers", () => {
    const [Provider, useValue] = createContext<{ n: number }>({
      name: "Counter",
      errorMessage: "useCounter must be used within <Counter>",
    });
    function Consumer() {
      return <span>{useValue().n}</span>;
    }
    render(
      <Provider value={{ n: 7 }}>
        <Consumer />
      </Provider>,
    );
    expect(screen.getByText("7")).toBeInTheDocument();
  });

  it("throws a descriptive error outside its provider", () => {
    const [, useValue] = createContext<number>({
      name: "Counter",
      errorMessage: "useCounter must be used within <Counter>",
    });
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(() => renderHook(() => useValue())).toThrow("useCounter must be used within <Counter>");
  });

  it("falls back to the default value instead of throwing", () => {
    const [, useValue] = createContext<string>({ name: "Theme", defaultValue: "light" });
    const { result } = renderHook(() => useValue());
    expect(result.current).toBe("light");
  });

  it("createScopedContext namespaces the context name", () => {
    const [, , Context] = createScopedContext<number>({ name: "Context", scope: "Tabs" });
    expect(Context.displayName).toContain("Tabs:Context");
  });
});

describe("Portal", () => {
  it("renders into document.body by default", () => {
    const { container } = render(
      <Portal>
        <p>Portalled</p>
      </Portal>,
    );
    const el = screen.getByText("Portalled");
    expect(container.contains(el)).toBe(false);
    expect(el.parentElement).toBe(document.body);
  });

  it("renders into a given container, or inline when disabled", () => {
    const target = document.createElement("div");
    document.body.appendChild(target);
    const { container, rerender } = render(
      <Portal container={target}>
        <p>Here</p>
      </Portal>,
    );
    expect(target).toHaveTextContent("Here");

    rerender(
      <Portal disabled>
        <p>Here</p>
      </Portal>,
    );
    expect(container).toHaveTextContent("Here");
    target.remove();
  });

  it("usePortalContainer creates a named container once and reuses it", () => {
    const { result, unmount } = renderHook(() => usePortalContainer("loony-test-root"));
    expect(result.current?.id).toBe("loony-test-root");
    expect(document.querySelectorAll("#loony-test-root")).toHaveLength(1);
    unmount();
  });
});

describe("VisuallyHidden", () => {
  it("stays in the accessibility tree", () => {
    render(
      <button type="button">
        <svg aria-hidden="true" />
        <VisuallyHidden>Close</VisuallyHidden>
      </button>,
    );
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });
});
