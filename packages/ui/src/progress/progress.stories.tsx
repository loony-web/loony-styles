import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { Progress } from "./progress.js";

const meta = {
  title: "Feedback/Progress",
  component: Progress,
  parameters: { layout: "centered" },
  args: { value: 40 },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    colorScheme: { control: "select", options: ["accent", "success", "danger", "warning"] },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <Progress size="xs" value={60} label="Extra small progress bar" />
      <Progress size="sm" value={60} label="Small progress bar" />
      <Progress size="md" value={60} label="Medium progress bar" />
      <Progress size="lg" value={60} label="Large progress bar" />
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <Progress colorScheme="accent" value={70} label="Accent progress" />
      <Progress colorScheme="success" value={100} label="Success progress" />
      <Progress colorScheme="warning" value={45} label="Warning progress" />
      <Progress colorScheme="danger" value={25} label="Danger progress" />
    </div>
  ),
};

function AnimatedProgress() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 5));
    }, 300);
    return () => clearInterval(interval);
  }, []);
  return <Progress value={value} className="w-72" label="Animated progress" />;
}

export const Animated: Story = {
  render: () => <AnimatedProgress />,
};
