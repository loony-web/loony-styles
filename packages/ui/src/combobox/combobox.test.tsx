import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { axe, toHaveNoViolations } from "../test/axe-helper.js";
import { Combobox, type ComboboxOption } from "./combobox.js";

const frameworks: ComboboxOption[] = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix", keywords: ["react-router"] },
  { value: "astro", label: "Astro" },
  { value: "gatsby", label: "Gatsby", disabled: true },
];

const trigger = () => screen.getByRole("button", { name: "Framework" });
const search = () => screen.getByRole("combobox", { name: "Search Framework" });

describe("Combobox", () => {
  it("shows the placeholder, then the selected label", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Framework" options={frameworks} placeholder="Pick one" />);

    expect(trigger()).toHaveTextContent("Pick one");
    expect(trigger()).toHaveAttribute("data-placeholder");

    await user.click(trigger());
    await user.click(screen.getByRole("option", { name: "Remix" }));

    expect(trigger()).toHaveTextContent("Remix");
    expect(trigger()).not.toHaveAttribute("data-placeholder");
  });

  it("filters (fuzzily) by label and by keywords", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Framework" options={frameworks} />);

    await user.click(trigger());
    // cmdk matches fuzzily ("ast" would also match "GAtSby"), so use a distinctive query.
    await user.type(search(), "astr");
    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual(["Astro"]);

    await user.clear(search());
    await user.type(search(), "react-router");
    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual(["Remix"]);
  });

  it("shows the empty message when nothing matches", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Framework" options={frameworks} emptyMessage="Nothing here" />);

    await user.click(trigger());
    await user.type(search(), "zzz");
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  describe("keyboard", () => {
    it("opens from the trigger with ArrowDown and focuses the search", async () => {
      const user = userEvent.setup();
      render(<Combobox label="Framework" options={frameworks} />);

      trigger().focus();
      await user.keyboard("{ArrowDown}");
      expect(trigger()).toHaveAttribute("aria-expanded", "true");
      await waitFor(() => expect(search()).toHaveFocus());
    });

    it("selects with arrows + Enter and returns focus to the trigger", async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();
      render(<Combobox label="Framework" options={frameworks} onValueChange={onValueChange} />);

      trigger().focus();
      await user.keyboard("{Enter}");
      await waitFor(() => expect(search()).toHaveFocus());
      await user.keyboard("{ArrowDown}{Enter}"); // first option is pre-highlighted → second

      expect(onValueChange).toHaveBeenCalledWith("remix");
      expect(trigger()).toHaveAttribute("aria-expanded", "false");
      await waitFor(() => expect(trigger()).toHaveFocus());
    });

    it("closes with Escape without changing the value", async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();
      render(
        <Combobox
          label="Framework"
          options={frameworks}
          defaultValue="next"
          onValueChange={onValueChange}
        />,
      );

      await user.click(trigger());
      await user.keyboard("{Escape}");

      expect(trigger()).toHaveAttribute("aria-expanded", "false");
      expect(trigger()).toHaveTextContent("Next.js");
      expect(onValueChange).not.toHaveBeenCalled();
      await waitFor(() => expect(trigger()).toHaveFocus());
    });
  });

  it("does not select disabled options", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<Combobox label="Framework" options={frameworks} onValueChange={onValueChange} />);

    await user.click(trigger());
    const gatsby = screen.getByRole("option", { name: "Gatsby" });
    expect(gatsby).toHaveAttribute("aria-disabled", "true");
    await user.click(gatsby);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("marks the selected option for assistive technology", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Framework" options={frameworks} defaultValue="astro" />);

    await user.click(trigger());
    expect(screen.getByRole("option", { name: "Astro, selected" })).toBeInTheDocument();
  });

  it("clears the selection when clearable and the selected option is chosen again", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Combobox
        label="Framework"
        options={frameworks}
        defaultValue="next"
        clearable
        onValueChange={onValueChange}
      />,
    );

    await user.click(trigger());
    await user.click(screen.getByRole("option", { name: "Next.js, selected" }));
    expect(onValueChange).toHaveBeenCalledWith(null);
  });

  it("supports controlled usage", async () => {
    function Controlled() {
      const [value, setValue] = useState<string | null>("astro");
      return (
        <>
          <Combobox label="Framework" options={frameworks} value={value} onValueChange={setValue} />
          <output>{value ?? "none"}</output>
        </>
      );
    }
    const user = userEvent.setup();
    render(<Controlled />);

    await user.click(trigger());
    await user.click(screen.getByRole("option", { name: "Next.js" }));
    expect(screen.getByRole("status")).toHaveTextContent("next");
  });

  it("submits the value with a native form", async () => {
    const user = userEvent.setup();
    render(
      <form aria-label="Settings">
        <Combobox label="Framework" options={frameworks} name="framework" />
      </form>,
    );

    await user.click(trigger());
    await user.click(screen.getByRole("option", { name: "Remix" }));
    const form = screen.getByRole<HTMLFormElement>("form", { name: "Settings" });
    expect(new FormData(form).get("framework")).toBe("remix");
  });

  it("reflects invalid and disabled states", () => {
    const { rerender } = render(<Combobox label="Framework" options={frameworks} invalid />);
    expect(trigger()).toHaveAttribute("aria-invalid", "true");

    rerender(<Combobox label="Framework" options={frameworks} disabled />);
    expect(trigger()).toBeDisabled();
  });

  it("has no axe violations when closed or open", async () => {
    const user = userEvent.setup();
    render(<Combobox label="Framework" options={frameworks} defaultValue="next" />);
    toHaveNoViolations(await axe(document.body));

    await user.click(trigger());
    toHaveNoViolations(await axe(document.body));
  });
});
