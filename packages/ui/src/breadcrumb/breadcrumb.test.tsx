import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb.js";

function Trail({ separator }: { separator?: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbEllipsis />
      </BreadcrumbItem>
      <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbPage>Settings</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}

describe("Breadcrumb", () => {
  it("is a labelled navigation landmark containing an ordered list", () => {
    render(<Trail />);
    const nav = screen.getByRole("navigation", { name: "breadcrumb" });
    expect(within(nav).getByRole("list").tagName).toBe("OL");
  });

  it("marks the current page with aria-current and keeps links as links", () => {
    render(<Trail />);
    expect(screen.getByText("Settings")).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.queryByRole("link", { name: "Settings" })).not.toBeInTheDocument();
  });

  it("hides separators from assistive technology", () => {
    render(<Trail separator="/" />);
    // Only the three real items are list items; separators are presentational.
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getAllByText("/")[0]?.closest("li")).toHaveAttribute("aria-hidden", "true");
  });

  it("renders a chevron separator by default, or custom children", () => {
    const { container, rerender } = render(<Trail />);
    expect(container.querySelector("li[role=presentation] svg")).not.toBeNull();

    rerender(<Trail separator="/" />);
    expect(screen.getAllByText("/")).toHaveLength(2);
  });

  it("announces the collapsed ellipsis", () => {
    render(<Trail />);
    // Accessible (not inside an aria-hidden subtree) while the "…" glyph is hidden.
    const label = screen.getByText("More pages");
    expect(label.closest("[aria-hidden=true]")).toBeNull();
    expect(screen.getByText("…")).toHaveAttribute("aria-hidden", "true");
  });
});
