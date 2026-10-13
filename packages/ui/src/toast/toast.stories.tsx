import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button/button.js";
import { Toast, ToastAction, ToastProvider, ToastViewport } from "./toast.js";
import { Toaster } from "./toaster.js";
import { useToast } from "./use-toast.js";

const meta = {
  title: "Feedback/Toast",
  component: Toast,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
        <ToastViewport />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    title: "Saved successfully",
    description: "Your changes have been saved.",
    variant: "default",
  },
};

export const Success: Story = {
  args: {
    open: true,
    title: "Changes published",
    description: "Your post is now live.",
    variant: "success",
  },
};

export const Danger: Story = {
  args: {
    open: true,
    title: "Something went wrong",
    description: "We couldn't process your request. Please try again.",
    variant: "danger",
  },
};

export const Warning: Story = {
  args: {
    open: true,
    title: "Action required",
    description: "Your session will expire in 5 minutes.",
    variant: "warning",
  },
};

export const Info: Story = {
  args: {
    open: true,
    title: "New update available",
    description: "Reload the page to apply updates.",
    variant: "info",
    action: <ToastAction altText="Reload page">Reload</ToastAction>,
  },
};

function ToasterDemo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => toast({ title: "Saved", variant: "default" })}>Default</Button>
      <Button
        onClick={() =>
          toast({ title: "Success!", description: "Your changes were saved.", variant: "success" })
        }
      >
        Success
      </Button>
      <Button
        onClick={() =>
          toast({ title: "Error", description: "Something went wrong.", variant: "danger" })
        }
      >
        Danger
      </Button>
      <Button
        onClick={() =>
          toast({ title: "Warning", description: "Check your input.", variant: "warning" })
        }
      >
        Warning
      </Button>
      <Button
        onClick={() => toast({ title: "Info", description: "Updates available.", variant: "info" })}
      >
        Info
      </Button>
      <Toaster />
    </div>
  );
}

export const WithToaster: Story = {
  render: () => <ToasterDemo />,
  decorators: [],
};
