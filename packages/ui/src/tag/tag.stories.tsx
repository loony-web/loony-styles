import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Tag } from "./tag.js";

const meta = {
  title: "Display/Tag",
  component: Tag,
  parameters: { layout: "centered" },
  args: { children: "Label" },
  argTypes: {
    variant: { control: "select", options: ["subtle", "solid", "outline", "neutral"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="subtle">Subtle</Tag>
      <Tag variant="solid">Solid</Tag>
      <Tag variant="outline">Outline</Tag>
      <Tag variant="neutral">Neutral</Tag>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="lg">Large</Tag>
    </div>
  ),
};

export const Dismissible: Story = {
  args: {
    children: "Dismissible",
    onDismiss: fn(),
  },
};

export const AllDismissible: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {["React", "TypeScript", "Tailwind", "Radix UI"].map((tag) => (
        <Tag key={tag} onDismiss={() => undefined} dismissLabel={`Remove ${tag}`}>
          {tag}
        </Tag>
      ))}
    </div>
  ),
};
