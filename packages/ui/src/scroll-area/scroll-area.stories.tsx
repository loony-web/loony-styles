import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea, ScrollBar } from "./scroll-area.js";

const meta = {
  title: "Advanced/ScrollArea",
  component: ScrollArea,
  parameters: { layout: "centered" },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-64 w-48 rounded-md border border-(--loony-color-border) p-4">
      <div className="space-y-2">
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i} className="text-sm">
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-80 rounded-md border border-(--loony-color-border) p-4">
      <div className="flex gap-4" style={{ width: "max-content" }}>
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md bg-(--loony-color-surface) text-sm"
          >
            {i + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const Both: Story = {
  render: () => (
    <ScrollArea className="h-64 w-80 rounded-md border border-(--loony-color-border) p-4">
      <div style={{ width: "600px" }}>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="flex gap-4 py-1 text-sm">
            <span className="w-8 text-(--loony-color-fg-muted)">{i + 1}</span>
            <span>{"Lorem ipsum dolor sit amet consectetur ".repeat(3)}</span>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};
