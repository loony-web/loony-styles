import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button/button.js";
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from "./card.js";

const meta = {
  title: "Display/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Pro plan</CardTitle>
        <CardDescription>Everything in Free, plus team features.</CardDescription>
      </CardHeader>
      <CardBody>
        <p className="text-3xl font-semibold">$12</p>
      </CardBody>
      <CardFooter>
        <Button className="w-full">Upgrade</Button>
      </CardFooter>
    </Card>
  ),
};

export const BodyOnly: Story = {
  render: () => (
    <Card className="w-80">
      <CardBody>A card with only body content.</CardBody>
    </Card>
  ),
};
