import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./stack.js";

const Item = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-(--loony-radius-md) bg-(--loony-color-accent-subtle) px-4 py-2 text-sm">
    {children}
  </div>
);

const meta = {
  title: "Layout/Stack",
  component: Stack,
  tags: ["autodocs"],
  args: { gap: 3 },
  argTypes: {
    direction: { control: "select", options: ["row", "column", "row-reverse", "column-reverse"] },
    align: { control: "select", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between", "around", "evenly"],
    },
    gap: { control: "select", options: [0, 1, 2, 3, 4, 6, 8, 12] },
  },
  render: (args) => (
    <Stack {...args}>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Stack>
  ),
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {};
export const Horizontal: Story = { args: { direction: "row" } };
