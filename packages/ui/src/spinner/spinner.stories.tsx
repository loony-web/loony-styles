import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./spinner.js";

const meta = {
  title: "Feedback/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Spinner key={size} size={size} />
      ))}
    </div>
  ),
};

export const InheritsColor: Story = {
  render: () => (
    <div className="flex items-center gap-2 text-(--loony-color-accent)">
      <Spinner /> Loading…
    </div>
  ),
};
