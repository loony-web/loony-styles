import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command.js";

function Menu({ onSelect = vi.fn() }: { onSelect?: (value: string) => void }) {
  return (
    <>
      <CommandInput placeholder="Type a command" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Account">
          <CommandItem onSelect={onSelect}>Profile</CommandItem>
          <CommandItem onSelect={onSelect}>Billing</CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  );
}

describe("Command", () => {
  it("names the search field from the `label` prop", () => {
    render(
      <Command label="Commands">
        <Menu />
      </Command>,
    );
    expect(screen.getByRole("combobox", { name: "Commands" })).toBeInTheDocument();
  });

  it("filters items and shows the empty state", async () => {
    const user = userEvent.setup();
    render(
      <Command label="Commands">
        <Menu />
      </Command>,
    );

    await user.type(screen.getByRole("combobox"), "bill");
    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual(["Billing"]);

    await user.clear(screen.getByRole("combobox"));
    await user.type(screen.getByRole("combobox"), "zzz");
    expect(screen.getByText("No results.")).toBeInTheDocument();
  });

  it("selects the highlighted item with the keyboard", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(
      <Command label="Commands">
        <Menu onSelect={onSelect} />
      </Command>,
    );

    await user.click(screen.getByRole("combobox"));
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onSelect).toHaveBeenCalledWith("Billing");
  });
});

describe("CommandDialog", () => {
  it("names the dialog and its search field", () => {
    render(
      <CommandDialog open label="Quick actions">
        <Menu />
      </CommandDialog>,
    );
    expect(screen.getByRole("dialog", { name: "Quick actions" })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Quick actions" })).toBeInTheDocument();
  });

  it("defaults the name to “Command menu”", () => {
    render(
      <CommandDialog open>
        <Menu />
      </CommandDialog>,
    );
    expect(screen.getByRole("dialog", { name: "Command menu" })).toBeInTheDocument();
  });
});
