import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";
import { Label } from "../label/label.js";
import { Combobox, type ComboboxOption } from "./combobox.js";

const frameworks: ComboboxOption[] = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix", keywords: ["react-router"] },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt", keywords: ["vue"] },
  { value: "sveltekit", label: "SvelteKit", keywords: ["svelte"] },
  { value: "gatsby", label: "Gatsby (deprecated)", disabled: true },
];

const meta = {
  title: "Form/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  args: {
    label: "Framework",
    options: frameworks,
    placeholder: "Select a framework…",
    onValueChange: fn(),
  },
  argTypes: {
    clearable: { control: "boolean" },
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
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithVisibleLabel: Story = {
  render: (args) => (
    <div className="flex flex-col gap-1.5">
      <Label id="framework-label">Framework</Label>
      <Combobox {...args} label={undefined} aria-labelledby="framework-label" />
    </div>
  ),
};

export const Preselected: Story = { args: { defaultValue: "astro" } };

export const Clearable: Story = { args: { defaultValue: "next", clearable: true } };

export const Invalid: Story = {
  render: (args) => (
    <div className="flex flex-col gap-1.5">
      <Combobox {...args} invalid aria-describedby="framework-error" />
      <p id="framework-error" className="text-sm text-(--loony-color-danger)">
        Choose a framework to continue.
      </p>
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true, defaultValue: "next" } };

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>("remix");
    return (
      <div className="flex flex-col gap-2">
        <Combobox {...args} value={value} onValueChange={setValue} />
        <p className="text-sm text-(--loony-color-fg-muted)">Value: {value ?? "none"}</p>
      </div>
    );
  },
};

export const ManyOptions: Story = {
  args: {
    label: "Country",
    placeholder: "Select a country…",
    options: [
      "Argentina",
      "Australia",
      "Brazil",
      "Canada",
      "Denmark",
      "Egypt",
      "Finland",
      "France",
      "Germany",
      "India",
      "Indonesia",
      "Japan",
      "Kenya",
      "Mexico",
      "Netherlands",
      "Nigeria",
      "Norway",
      "Portugal",
      "Singapore",
      "South Korea",
      "Spain",
      "Sweden",
      "United Kingdom",
      "United States",
    ].map((name) => ({ value: name.toLowerCase().replace(/\s+/g, "-"), label: name })),
  },
};
