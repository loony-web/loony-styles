import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../checkbox/checkbox.js";
import { Input } from "../input/input.js";
import { Label } from "./label.js";

const meta = {
  title: "Form/Label",
  component: Label,
  tags: ["autodocs"],
  args: { children: "Email" },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInput: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-1.5">
      <Label htmlFor="label-input">Full name</Label>
      <Input id="label-input" />
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="label-terms" />
      <Label htmlFor="label-terms">Accept terms and conditions</Label>
    </div>
  ),
};
