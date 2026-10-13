import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarFallback } from "../avatar/avatar.js";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card.js";

const meta = {
  title: "Overlay/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger asChild>
        <a href="https://github.com/loony-web" className="font-medium underline underline-offset-4">
          @loony-web
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex gap-3">
          <Avatar>
            <AvatarFallback>LW</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-semibold">Loony</p>
            <p className="text-(--loony-color-fg-muted)">An accessible React component system.</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
