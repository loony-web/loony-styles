import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./slider.js";

const meta = {
  title: "Form/Slider",
  component: Slider,
  parameters: { layout: "centered" },
  args: {
    defaultValue: [40],
    min: 0,
    max: 100,
    step: 1,
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-72">
      <Slider {...args} label="Volume" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-6">
      <Slider size="sm" defaultValue={[30]} label="Small slider" />
      <Slider size="md" defaultValue={[50]} label="Medium slider" />
      <Slider size="lg" defaultValue={[70]} label="Large slider" />
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div className="w-72">
      <Slider defaultValue={[25, 75]} label="Price range" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-72">
      <Slider defaultValue={[40]} disabled label="Disabled slider" />
    </div>
  ),
};

export const WithSteps: Story = {
  render: () => (
    <div className="w-72">
      <Slider defaultValue={[0]} min={0} max={100} step={25} label="Step slider (25 increments)" />
    </div>
  ),
};
