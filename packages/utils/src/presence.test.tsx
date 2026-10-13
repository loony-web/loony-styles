import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Presence } from "./presence.js";
import { Slot } from "./slot.js";

describe("Presence", () => {
  it("renders the child when present", () => {
    render(
      <Presence present>
        <div>Panel</div>
      </Presence>,
    );
    expect(screen.getByText("Panel")).toBeInTheDocument();
  });

  it("renders nothing when not present", () => {
    render(
      <Presence present={false}>
        <div>Panel</div>
      </Presence>,
    );
    expect(screen.queryByText("Panel")).not.toBeInTheDocument();
  });

  // Regression: hooks used to run after an early return, so toggling `present`
  // changed the hook count and React threw "Rendered fewer hooks than expected".
  it("survives toggling present on and off", () => {
    const { rerender } = render(
      <Presence present>
        <div>Panel</div>
      </Presence>,
    );

    expect(() => {
      rerender(
        <Presence present={false}>
          <div>Panel</div>
        </Presence>,
      );
      rerender(
        <Presence present>
          <div>Panel</div>
        </Presence>,
      );
    }).not.toThrow();
    expect(screen.getByText("Panel")).toBeInTheDocument();
  });

  it("forwards the child's own ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Presence present>
        <div ref={ref}>Panel</div>
      </Presence>,
    );
    expect(ref.current).toBe(screen.getByText("Panel"));
  });

  it("passes a ref to render-function children", () => {
    render(<Presence present>{({ ref }) => <div ref={ref}>Panel</div>}</Presence>);
    expect(screen.getByText("Panel")).toBeInTheDocument();
  });
});

describe("element ref access (React 19)", () => {
  it("does not trigger React's element.ref deprecation warning", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const ref = createRef<HTMLButtonElement>();

    render(
      <Slot>
        <button type="button" ref={ref}>
          Go
        </button>
      </Slot>,
    );

    expect(ref.current).toBe(screen.getByRole("button"));
    expect(error).not.toHaveBeenCalledWith(expect.stringContaining("element.ref"));
    error.mockRestore();
  });
});
