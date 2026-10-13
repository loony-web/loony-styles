import { SearchIcon } from "@loony/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "../label/label.js";
import { Input } from "./input.js";

const meta = {
  title: "Form/Input",
  component: Input,
  tags: ["autodocs"],
  args: { "aria-label": "Email", placeholder: "you@example.com" },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="story-email">Email</Label>
      <Input id="story-email" type="email" placeholder="you@example.com" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Input size="sm" aria-label="Small" placeholder="Small" />
      <Input size="md" aria-label="Medium" placeholder="Medium" />
      <Input size="lg" aria-label="Large" placeholder="Large" />
    </div>
  ),
};

export const WithIcon: Story = {
  args: { leftElement: <SearchIcon />, placeholder: "Search…", "aria-label": "Search" },
};

export const Invalid: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="story-invalid">Email</Label>
      <Input
        id="story-invalid"
        invalid
        aria-describedby="story-invalid-error"
        defaultValue="nope"
      />
      <p id="story-invalid-error" className="text-sm text-(--loony-color-danger)">
        Enter a valid email address.
      </p>
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true, defaultValue: "Read only" } };
