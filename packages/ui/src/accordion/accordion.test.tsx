import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion.js";

function TestAccordion({ type = "single" }: { type?: "single" | "multiple" }) {
  return (
    <Accordion type={type} collapsible>
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

  // Radix unmounts closed content, so "hidden" means "not in the document".
  it("content is hidden by default", () => {
    render(<TestAccordion />);
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Section 1" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
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
    const trigger = screen.getByRole("button", { name: "Section 1" });
    await user.click(trigger);
    await user.click(trigger);
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("marks open trigger with expanded state", async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);
    const trigger = screen.getByRole("button", { name: "Section 1" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "open");
  });
});
