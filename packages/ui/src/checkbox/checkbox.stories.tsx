import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "../label/label.js";
import { Checkbox } from "./checkbox.js";

const meta = {
  title: "Form/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: { "aria-label": "Accept terms" },
  argTypes: {
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Indeterminate: Story = { args: { indeterminate: true } };
export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-newsletter" defaultChecked />
      <Label htmlFor="checkbox-newsletter">Subscribe to the newsletter</Label>
    </div>
  ),
};
