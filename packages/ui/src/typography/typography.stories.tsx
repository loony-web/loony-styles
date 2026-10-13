import type { Meta, StoryObj } from "@storybook/react";
import { Code, Heading, Kbd, Text } from "./typography.js";

const meta = {
  title: "Foundation/Typography",
  component: Text,
  tags: ["autodocs"],
  args: { children: "The quick brown fox jumps over the lazy dog." },
  argTypes: {
    size: { control: "select", options: ["2xs", "xs", "sm", "base", "lg", "xl"] },
    weight: { control: "select", options: ["normal", "medium", "semibold", "bold"] },
    color: {
      control: "select",
      options: ["default", "muted", "subtle", "disabled", "accent", "danger", "success", "warning"],
    },
    align: { control: "select", options: ["left", "center", "right"] },
    truncate: { control: "boolean" },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Headings: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {([1, 2, 3, 4, 5, 6] as const).map((level) => (
        <Heading key={level} level={level}>
          Heading {level}
        </Heading>
      ))}
    </div>
  ),
};

export const TextColors: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      {(
        [
          "default",
          "muted",
          "subtle",
          "disabled",
          "accent",
          "danger",
          "success",
          "warning",
        ] as const
      ).map((color) => (
        <Text key={color} color={color}>
          {color}
        </Text>
      ))}
    </div>
  ),
};

export const Truncate: Story = {
  render: () => (
    <div className="w-48">
      <Text truncate>This sentence is far too long to fit inside a narrow container.</Text>
    </div>
  ),
};

export const InlineCode: Story = {
  render: () => (
    <Text>
      Install with <Code>pnpm add @loony/ui</Code>.
    </Text>
  ),
};

export const CodeBlock: Story = {
  render: () => <Code block>{'import { Button } from "@loony/ui/button";'}</Code>,
};

export const Keyboard: Story = {
  render: () => (
    <Text>
      Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command menu.
    </Text>
  ),
};
