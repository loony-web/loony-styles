import { PlusIcon, SearchIcon, SettingsIcon, UserIcon } from "@loony/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../button/button.js";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./command.js";

const meta = {
  title: "Advanced/Command",
  component: Command,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Command className="rounded-lg border border-(--loony-color-border) shadow-md w-80">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <SearchIcon className="h-4 w-4" aria-hidden />
            <span>Search</span>
            <CommandShortcut>⌘K</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <UserIcon className="h-4 w-4" aria-hidden />
            <span>Profile</span>
            <CommandShortcut>⇧⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <SettingsIcon className="h-4 w-4" aria-hidden />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem>
            <PlusIcon className="h-4 w-4" aria-hidden />
            <span>New File</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

function CommandDialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <p className="text-sm text-(--loony-color-fg-muted) mb-4">
        Press{" "}
        <kbd className="rounded border border-(--loony-color-border) px-1.5 py-0.5 text-xs">⌘K</kbd>{" "}
        or click
      </p>
      <Button onClick={() => setOpen(true)}>Open Command Palette</Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => setOpen(false)}>
              <span>Go to Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <span>Go to Settings</span>
              <CommandShortcut>⌘,</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => setOpen(false)}>
              <span>Create new project</span>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <span>Invite team member</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export const CommandPalette: Story = {
  render: () => <CommandDialogDemo />,
};
