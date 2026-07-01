import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button/button.js";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer.js";

const meta = {
  title: "Overlay/Drawer",
  component: DrawerContent,
  parameters: { layout: "centered" },
} satisfies Meta<typeof DrawerContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Right Drawer</Button>
      </DrawerTrigger>
      <DrawerContent side="right">
        <DrawerHeader>
          <DrawerTitle>Account Settings</DrawerTitle>
          <DrawerDescription>Manage your account preferences.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-sm text-[--loony-color-fg-muted]">Drawer content goes here.</p>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button>Save Changes</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Left: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Left Drawer</Button>
      </DrawerTrigger>
      <DrawerContent side="left">
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <nav className="flex flex-col gap-1">
            {["Dashboard", "Users", "Settings", "Analytics"].map((item) => (
              <button key={item} type="button" className="rounded px-3 py-2 text-left text-sm hover:bg-[--loony-color-surface-hover]">
                {item}
              </button>
            ))}
          </nav>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Bottom Sheet</Button>
      </DrawerTrigger>
      <DrawerContent side="bottom">
        <DrawerHeader>
          <DrawerTitle>Share</DrawerTitle>
          <DrawerDescription>Share this item with others.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div className="grid grid-cols-4 gap-4 py-2">
            {["Copy Link", "Twitter", "Email", "More"].map((opt) => (
              <button key={opt} type="button" className="flex flex-col items-center gap-1 text-xs">
                <div className="h-12 w-12 rounded-full bg-[--loony-color-surface]" />
                {opt}
              </button>
            ))}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ),
};
