import { PlusIcon, SearchIcon, TrashIcon } from "@loony/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button.js";

const meta: Meta<typeof Button> = {
  title: "Foundation/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The primary interactive element. Supports multiple variants, sizes, loading state, icons, and polymorphic rendering via `asChild`.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost", "link", "danger", "danger-outline", "danger-ghost"],
      description: "Visual style of the button",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size of the button",
    },
    loading: {
      control: "boolean",
      description: "Shows a loading spinner and prevents interaction",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Button" },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="danger-outline">Danger Outline</Button>
      <Button variant="danger-ghost">Danger Ghost</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button leftIcon={<PlusIcon />}>Add Item</Button>
      <Button rightIcon={<SearchIcon />}>Search</Button>
      <Button variant="danger" leftIcon={<TrashIcon />}>
        Delete
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button loading>Loading</Button>
      <Button loading variant="outline">
        Loading
      </Button>
      <Button loading variant="ghost">
        Loading
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button disabled>Disabled</Button>
      <Button disabled variant="outline">
        Disabled
      </Button>
      <Button disabled variant="ghost">
        Disabled
      </Button>
    </div>
  ),
};

export const AsChild: Story = {
  render: () => (
    <Button asChild>
      <a href="#link">Renders as Link</a>
    </Button>
  ),
};

export const AllVariantsDisabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button disabled variant="solid">
        Solid
      </Button>
      <Button disabled variant="outline">
        Outline
      </Button>
      <Button disabled variant="ghost">
        Ghost
      </Button>
      <Button disabled variant="danger">
        Danger
      </Button>
    </div>
  ),
};
