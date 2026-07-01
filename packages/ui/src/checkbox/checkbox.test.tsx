import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "./checkbox.js";

describe("Checkbox", () => {
  it("renders unchecked by default", () => {
    render(<Checkbox aria-label="Accept terms" />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("can be checked on click", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Accept terms" />);
    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("respects defaultChecked", () => {
    render(<Checkbox aria-label="Accept terms" defaultChecked />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("controlled mode works", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(
      <Checkbox aria-label="Accept terms" checked={false} onCheckedChange={onCheckedChange} />,
    );
    await user.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("cannot be clicked when disabled", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Accept terms" disabled />);
    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("applies custom className", () => {
    render(<Checkbox aria-label="Accept terms" className="custom-class" />);
    expect(screen.getByRole("checkbox")).toHaveClass("custom-class");
  });
});
