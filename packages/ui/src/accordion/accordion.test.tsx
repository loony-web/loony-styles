import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion.js";

function TestAccordion({ type = "single" }: { type?: "single" | "multiple" }) {
  return (
    <Accordion type={type as "single"} collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>Content 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>Content 2</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

describe("Accordion", () => {
  it("renders all accordion triggers", () => {
    render(<TestAccordion />);
    expect(screen.getByText("Section 1")).toBeInTheDocument();
    expect(screen.getByText("Section 2")).toBeInTheDocument();
  });

  it("content is hidden by default", () => {
    render(<TestAccordion />);
    expect(screen.queryByText("Content 1")).not.toBeVisible();
  });

  it("expands section on click", async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);
    await user.click(screen.getByText("Section 1"));
    expect(screen.getByText("Content 1")).toBeVisible();
  });

  it("collapses when clicked again (collapsible)", async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);
    await user.click(screen.getByText("Section 1"));
    await user.click(screen.getByText("Section 1"));
    expect(screen.getByText("Content 1")).not.toBeVisible();
  });

  it("marks open trigger with expanded state", async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);
    const trigger = screen.getByRole("button", { name: "Section 1" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "open");
  });
});
