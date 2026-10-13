import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./link.js";

const meta = {
  title: "Foundation/Link",
  component: Link,
  tags: ["autodocs"],
  args: { href: "#", children: "Read the docs" },
  argTypes: {
    variant: { control: "select", options: ["default", "subtle", "ghost"] },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-6">
      <Link href="#" variant="default">
        Default
      </Link>
      <Link href="#" variant="subtle">
        Subtle
      </Link>
      <Link href="#" variant="ghost">
        Ghost
      </Link>
    </div>
  ),
};

export const External: Story = {
  args: { href: "https://github.com/loony-web/loony-styles", children: "GitHub" },
};

export const InlineInText: Story = {
  render: () => (
    <p className="max-w-sm">
      Loony components are accessible by default. <Link href="#">Learn how</Link> we test them.
    </p>
  ),
};
