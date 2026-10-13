import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "../label/label.js";
import { Switch } from "./switch.js";

const meta = {
  title: "Form/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: { "aria-label": "Notifications" },
  argTypes: { disabled: { control: "boolean" } },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const On: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Switch id="switch-airplane" />
      <Label htmlFor="switch-airplane">Airplane mode</Label>
    </div>
  ),
};
