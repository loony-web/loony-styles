import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button/button.js";
import { Popover, PopoverContent, PopoverTrigger } from "./popover.js";

const meta = {
  title: "Overlay/Popover",
  component: Popover,
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="outline">Show details</Button>
      </PopoverTrigger>
      {/* Popover content is role="dialog" and needs an accessible name. */}
      <PopoverContent aria-label="Details" className="w-64">
        <p className="text-sm">Popovers hold rich, interactive content anchored to a trigger.</p>
      </PopoverContent>
    </Popover>
  ),
};
