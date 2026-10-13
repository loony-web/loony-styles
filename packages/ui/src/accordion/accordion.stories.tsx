import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion.js";

// Typed loosely: Accordion props are a discriminated union that StoryObj cannot infer.
const meta: Meta = {
  title: "Display/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;

const items = [
  { value: "a11y", q: "Is it accessible?", a: "Yes — it follows the WAI-ARIA accordion pattern." },
  { value: "style", q: "Can I restyle it?", a: "Yes — every color and radius is a CSS variable." },
  { value: "anim", q: "Is it animated?", a: "Yes, and it respects prefers-reduced-motion." },
];

const AccordionItems = () =>
  items.map((item) => (
    <AccordionItem key={item.value} value={item.value}>
      <AccordionTrigger>{item.q}</AccordionTrigger>
      <AccordionContent>{item.a}</AccordionContent>
    </AccordionItem>
  ));

export const Single: Story = {
  render: () => (
    <Accordion type="single" collapsible>
      <AccordionItems />
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={["a11y", "style"]}>
      <AccordionItems />
    </Accordion>
  ),
};
