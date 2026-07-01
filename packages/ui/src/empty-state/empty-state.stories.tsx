import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button/button.js";
import { SearchIcon } from "@loony/icons";
import { EmptyState } from "./empty-state.js";

const meta = {
  title: "Feedback/EmptyState",
  component: EmptyState,
  parameters: { layout: "centered" },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "No items found",
    description: "There are no items to display yet.",
  },
};

export const WithAction: Story = {
  args: {
    title: "No results found",
    description: "Try adjusting your search or filters.",
    action: <Button size="sm">Clear Filters</Button>,
  },
};

export const WithIcon: Story = {
  args: {
    icon: <SearchIcon className="h-6 w-6" />,
    title: "No search results",
    description: 'No results for "component library". Try a different search term.',
    action: <Button size="sm" variant="outline">Browse All</Button>,
  },
};

export const Minimal: Story = {
  args: {
    title: "Nothing here yet",
  },
};
