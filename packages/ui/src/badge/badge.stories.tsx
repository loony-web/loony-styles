import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge.js";

const VARIANTS = [
  "solid",
  "subtle",
  "outline",
  "danger",
  "danger-subtle",
  "success",
  "success-subtle",
  "warning",
  "warning-subtle",
  "neutral",
] as const;

const meta = {
  title: "Display/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Badge" },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex max-w-md flex-wrap gap-2">
      {VARIANTS.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};
