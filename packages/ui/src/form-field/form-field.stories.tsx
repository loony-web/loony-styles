import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../input/input.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select/select.js";
import { FormField } from "./form-field.js";

const meta = {
  title: "Form/FormField",
  component: FormField,
  parameters: { layout: "centered" },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <FormField label="Full name" htmlFor="name" helperText="As it appears on your ID.">
        <Input id="name" placeholder="John Doe" />
      </FormField>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="w-80">
      <FormField label="Email address" htmlFor="email" isRequired>
        <Input id="email" type="email" placeholder="hello@example.com" />
      </FormField>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-80">
      <FormField
        label="Username"
        htmlFor="username"
        errorMessage="This username is already taken."
      >
        <Input id="username" defaultValue="johndoe" aria-invalid />
      </FormField>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <FormField
        label="Account type"
        htmlFor="account-type"
        helperText="Contact support to change your account type."
        isDisabled
      >
        <Select disabled>
          <SelectTrigger id="account-type">
            <SelectValue placeholder="Free" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
    </div>
  ),
};

export const Complete: Story = {
  render: () => (
    <form className="w-80 space-y-4">
      <FormField label="Full name" htmlFor="c-name" isRequired>
        <Input id="c-name" placeholder="John Doe" />
      </FormField>
      <FormField label="Email" htmlFor="c-email" isRequired helperText="We'll never share your email.">
        <Input id="c-email" type="email" placeholder="hello@example.com" />
      </FormField>
      <FormField label="Username" htmlFor="c-username" errorMessage="Username already taken.">
        <Input id="c-username" defaultValue="johndoe" aria-invalid />
      </FormField>
    </form>
  ),
};
