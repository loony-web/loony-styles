/**
 * Interaction tests for overlay and composite form components: opening and
 * closing, keyboard support, focus management, and accessible names.
 */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer/drawer.js";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu/dropdown-menu.js";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card/hover-card.js";
import { Popover, PopoverContent, PopoverTrigger } from "./popover/popover.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select/select.js";
import { Slider } from "./slider/slider.js";
import { Textarea } from "./textarea/textarea.js";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip/tooltip.js";

describe("Popover", () => {
  it("opens from its trigger, closes on Escape and returns focus", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Details</PopoverTrigger>
        <PopoverContent aria-label="Details">
          <button type="button">Inside</button>
        </PopoverContent>
      </Popover>,
    );
    const trigger = screen.getByRole("button", { name: "Details" });

    await user.click(trigger);
    expect(screen.getByRole("dialog", { name: "Details" })).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await waitFor(() => expect(trigger).toHaveFocus());
  });
});

describe("Tooltip", () => {
  it("shows its content on keyboard focus and describes the trigger", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>Save</TooltipTrigger>
          <TooltipContent>Save your changes</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    await user.tab();
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Save your changes");
    expect(screen.getByRole("button", { name: "Save" })).toHaveAccessibleDescription(
      "Save your changes",
    );

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
  });
});

describe("Drawer", () => {
  it("is a named modal dialog with a labelled close button", async () => {
    const user = userEvent.setup();
    render(
      <Drawer>
        <DrawerTrigger>Open menu</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerDescription>Site sections</DrawerDescription>
        </DrawerContent>
      </Drawer>,
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const dialog = screen.getByRole("dialog", { name: "Navigation" });
    expect(dialog).toHaveAccessibleDescription("Site sections");

    await user.click(screen.getByRole("button", { name: "Close drawer" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveFocus();
  });
});

describe("DropdownMenu", () => {
  it("opens with the keyboard, moves with arrows and activates with Enter", async () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onEdit}>Edit</DropdownMenuItem>
          <DropdownMenuItem onSelect={onDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    screen.getByRole("button", { name: "Actions" }).focus();
    await user.keyboard("{Enter}");
    const menu = await screen.findByRole("menu");
    expect(menu).toBeInTheDocument();

    await user.keyboard("{ArrowDown}{Enter}");
    expect(onDelete).toHaveBeenCalledOnce();
    expect(onEdit).not.toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());
  });

  it("exposes checkbox items with their checked state", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>View</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked>Show grid</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByRole("button", { name: "View" }));
    expect(await screen.findByRole("menuitemcheckbox", { name: "Show grid" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });
});

describe("HoverCard", () => {
  it("opens on keyboard focus of its trigger", async () => {
    const user = userEvent.setup();
    render(
      <HoverCard openDelay={0}>
        <HoverCardTrigger href="/u/ada">@ada</HoverCardTrigger>
        <HoverCardContent>Ada Lovelace</HoverCardContent>
      </HoverCard>,
    );
    await user.tab();
    expect(await screen.findByText("Ada Lovelace")).toBeInTheDocument();
  });
});

describe("Select", () => {
  it("opens from the keyboard and selects an option", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Select onValueChange={onValueChange}>
        <SelectTrigger aria-label="Fruit">
          <SelectValue placeholder="Pick a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>,
    );
    const trigger = screen.getByRole("combobox", { name: "Fruit" });
    expect(trigger).toHaveTextContent("Pick a fruit");

    trigger.focus();
    await user.keyboard("{Enter}");
    await user.click(await screen.findByRole("option", { name: "Banana" }));

    expect(onValueChange).toHaveBeenCalledWith("banana");
    expect(trigger).toHaveTextContent("Banana");
  });
});

describe("Slider", () => {
  it("changes value with arrow keys and reports it", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<Slider label="Volume" defaultValue={[50]} step={10} onValueChange={onValueChange} />);

    const thumb = screen.getByRole("slider", { name: "Volume" });
    expect(thumb).toHaveAttribute("aria-valuenow", "50");

    thumb.focus();
    await user.keyboard("{ArrowRight}");
    expect(thumb).toHaveAttribute("aria-valuenow", "60");
    expect(onValueChange).toHaveBeenLastCalledWith([60]);

    await user.keyboard("{Home}");
    expect(thumb).toHaveAttribute("aria-valuenow", "0");
  });
});

describe("Textarea", () => {
  it("accepts input and reflects the invalid state", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Message" invalid />);
    const textarea = screen.getByRole("textbox", { name: "Message" });

    await user.type(textarea, "Hello");
    expect(textarea).toHaveValue("Hello");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
  });

  it("applies the resize mode", () => {
    render(<Textarea aria-label="Notes" resize="none" />);
    expect(screen.getByRole("textbox", { name: "Notes" })).toHaveClass("resize-none");
  });
});
