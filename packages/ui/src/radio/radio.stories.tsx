import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "../label/label.js";
import { RadioGroup, RadioItem } from "./radio.js";

const meta = {
  title: "Form/Radio",
  component: RadioGroup,
  parameters: { layout: "centered" },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-a">
      {[
        { value: "option-a", label: "Option A" },
        { value: "option-b", label: "Option B" },
        { value: "option-c", label: "Option C", disabled: true },
      ].map(({ value, label, disabled }) => (
        <div key={value} className="flex items-center gap-2">
          <RadioItem value={value} id={value} disabled={disabled} />
          <Label htmlFor={value} className={disabled ? "opacity-50 cursor-not-allowed" : ""}>
            {label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="sm" orientation="horizontal">
      {["sm", "md", "lg", "xl"].map((size) => (
        <div key={size} className="flex items-center gap-2">
          <RadioItem value={size} id={`size-${size}`} />
          <Label htmlFor={`size-${size}`}>{size.toUpperCase()}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <RadioGroup defaultValue="sm">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex items-center gap-2">
          <RadioItem value={size} id={`radio-${size}`} size={size} />
          <Label htmlFor={`radio-${size}`}>Size {size}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};
