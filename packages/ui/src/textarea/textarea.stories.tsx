import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea.js";

const meta = {
  title: "Form/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: { "aria-label": "Message", placeholder: "Write a message…" },
  argTypes: {
    resize: { control: "select", options: ["none", "vertical", "horizontal", "both"] },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoResize: Story = { args: { resize: "none" } };
export const Invalid: Story = { args: { invalid: true, defaultValue: "Too short" } };
export const Disabled: Story = { args: { disabled: true } };
