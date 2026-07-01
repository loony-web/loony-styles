import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RadioGroup, RadioItem } from "./radio.js";

describe("RadioGroup + RadioItem", () => {
  it("renders radio buttons", () => {
    render(
      <RadioGroup>
        <RadioItem value="a" aria-label="Option A" />
        <RadioItem value="b" aria-label="Option B" />
      </RadioGroup>,
    );
    expect(screen.getAllByRole("radio")).toHaveLength(2);
  });

  it("selects item on click", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup>
        <RadioItem value="a" aria-label="Option A" />
        <RadioItem value="b" aria-label="Option B" />
      </RadioGroup>,
    );
    const radioA = screen.getByRole("radio", { name: "Option A" });
    await user.click(radioA);
    expect(radioA).toBeChecked();
  });

  it("respects defaultValue", () => {
    render(
      <RadioGroup defaultValue="b">
        <RadioItem value="a" aria-label="Option A" />
        <RadioItem value="b" aria-label="Option B" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radio", { name: "Option B" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Option A" })).not.toBeChecked();
  });

  it("calls onValueChange when selection changes", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={onValueChange}>
        <RadioItem value="a" aria-label="Option A" />
        <RadioItem value="b" aria-label="Option B" />
      </RadioGroup>,
    );
    await user.click(screen.getByRole("radio", { name: "Option A" }));
    expect(onValueChange).toHaveBeenCalledWith("a");
  });

  it("disables individual items", () => {
    render(
      <RadioGroup>
        <RadioItem value="a" aria-label="Active" />
        <RadioItem value="b" aria-label="Disabled" disabled />
      </RadioGroup>,
    );
    expect(screen.getByRole("radio", { name: "Disabled" })).toBeDisabled();
  });
});
