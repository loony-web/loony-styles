import { PlusIcon, SearchIcon, TrashIcon, XIcon } from "@loony/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./icon-button.js";

const meta = {
  title: "Foundation/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: { label: "Search", children: <SearchIcon /> },
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost", "danger", "danger-ghost"],
    },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    rounded: { control: "select", options: ["default", "full"] },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <IconButton variant="solid" label="Add">
        <PlusIcon />
      </IconButton>
      <IconButton variant="outline" label="Search">
        <SearchIcon />
      </IconButton>
      <IconButton variant="ghost" label="Close">
        <XIcon />
      </IconButton>
      <IconButton variant="danger" label="Delete">
        <TrashIcon />
      </IconButton>
      <IconButton variant="danger-ghost" label="Delete">
        <TrashIcon />
      </IconButton>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <IconButton key={size} size={size} variant="outline" label={`Add (${size})`}>
          <PlusIcon />
        </IconButton>
      ))}
    </div>
  ),
};

export const Round: Story = {
  args: { rounded: "full", variant: "solid", label: "Add", children: <PlusIcon /> },
};
