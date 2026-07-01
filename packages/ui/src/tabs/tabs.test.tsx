import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs.js";

function TestTabs() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3" disabled>
          Tab 3
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
      <TabsContent value="tab3">Content 3</TabsContent>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("renders tabs list and triggers", () => {
    render(<TestTabs />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(3);
  });

  it("shows default tab content", () => {
    render(<TestTabs />);
    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
  });

  it("switches content on tab click", async () => {
    const user = userEvent.setup();
    render(<TestTabs />);
    await user.click(screen.getByRole("tab", { name: "Tab 2" }));
    expect(screen.getByText("Content 2")).toBeInTheDocument();
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
  });

  it("marks active tab as selected", async () => {
    const user = userEvent.setup();
    render(<TestTabs />);
    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    const tab2 = screen.getByRole("tab", { name: "Tab 2" });
    expect(tab1).toHaveAttribute("data-state", "active");
    await user.click(tab2);
    expect(tab2).toHaveAttribute("data-state", "active");
    expect(tab1).toHaveAttribute("data-state", "inactive");
  });

  it("disabled tab cannot be clicked", async () => {
    const user = userEvent.setup();
    render(<TestTabs />);
    const tab3 = screen.getByRole("tab", { name: "Tab 3" });
    expect(tab3).toBeDisabled();
    await user.click(tab3);
    expect(screen.queryByText("Content 3")).not.toBeInTheDocument();
  });

  it("navigates with arrow keys", async () => {
    const user = userEvent.setup();
    render(<TestTabs />);
    const tab1 = screen.getByRole("tab", { name: "Tab 1" });
    tab1.focus();
    await user.keyboard("[ArrowRight]");
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus();
  });
});
