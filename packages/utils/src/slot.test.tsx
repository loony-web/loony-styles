import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Slot } from "./slot.js";

describe("Slot", () => {
  it("renders the child element", () => {
    render(
      <Slot>
        <button type="button">Click me</button>
      </Slot>,
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("merges classNames from slot and child", () => {
    render(
      <Slot className="slot-class">
        <button type="button" className="child-class">
          Click me
        </button>
      </Slot>,
    );
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("slot-class");
    expect(btn.className).toContain("child-class");
  });

  it("composes event handlers (slot fires after child)", () => {
    const childHandler = vi.fn();
    const slotHandler = vi.fn();
    const callOrder: string[] = [];

    render(
      <Slot
        onClick={() => {
          slotHandler();
          callOrder.push("slot");
        }}
      >
        <button
          type="button"
          onClick={() => {
            childHandler();
            callOrder.push("child");
          }}
        >
          Click
        </button>
      </Slot>,
    );

    screen.getByRole("button").click();
    expect(childHandler).toHaveBeenCalled();
    expect(slotHandler).toHaveBeenCalled();
    expect(callOrder).toEqual(["child", "slot"]);
  });

  it("merges styles from slot and child", () => {
    render(
      <Slot style={{ color: "red" }}>
        <button type="button" style={{ fontWeight: "bold" }}>
          Styled
        </button>
      </Slot>,
    );
    const btn = screen.getByRole("button");
    expect(btn).toHaveStyle({ color: "red", fontWeight: "bold" });
  });

  it("slot props override child props (except event handlers and className)", () => {
    render(
      <Slot data-testid="slot-id" aria-label="slot label">
        <button type="button" data-testid="child-id" aria-label="child label">
          Button
        </button>
      </Slot>,
    );
    // slot props win for regular props
    expect(screen.getByTestId("slot-id")).toBeInTheDocument();
    expect(screen.queryByTestId("child-id")).not.toBeInTheDocument();
  });

  it("renders raw text children as-is", () => {
    render(<Slot>Hello</Slot>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
