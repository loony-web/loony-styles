import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertDescription, AlertTitle } from "./alert.js";

const VARIANTS = ["info", "success", "warning", "danger", "neutral"] as const;

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: { variant: { control: "select", options: VARIANTS } },
  decorators: [
    (Story) => (
      <div className="w-[28rem]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can change the look of this alert with `variant`.</AlertDescription>
    </Alert>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {VARIANTS.map((variant) => (
        <Alert key={variant} variant={variant}>
          <AlertTitle className="capitalize">{variant}</AlertTitle>
          <AlertDescription>This is a {variant} alert.</AlertDescription>
        </Alert>
      ))}
    </div>
  ),
};
