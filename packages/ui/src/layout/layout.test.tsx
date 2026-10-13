import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScrollArea } from "../scroll-area/scroll-area.js";
import { Stack } from "../stack/stack.js";
import { AspectRatio } from "./aspect-ratio.js";
import { Container } from "./container.js";
import { Flex } from "./flex.js";
import { Grid } from "./grid.js";
import { Spacer } from "./spacer.js";

describe("layout primitives", () => {
  it("Flex maps props to flexbox utilities", () => {
    render(
      <Flex data-testid="flex" direction="col" align="center" justify="between" gap={2}>
        <span>a</span>
      </Flex>,
    );
    expect(screen.getByTestId("flex")).toHaveClass(
      "flex",
      "flex-col",
      "items-center",
      "justify-between",
      "gap-2",
    );
  });

  it("Grid maps columns and gap", () => {
    render(<Grid data-testid="grid" cols={2} gap={4} />);
    expect(screen.getByTestId("grid")).toHaveClass("grid", "grid-cols-2", "gap-4");
  });

  it("Stack stacks vertically by default and horizontally on request", () => {
    const { rerender } = render(<Stack data-testid="stack" />);
    expect(screen.getByTestId("stack")).toHaveClass("flex-col");
    rerender(<Stack data-testid="stack" direction="row" />);
    expect(screen.getByTestId("stack")).toHaveClass("flex-row");
  });

  it("Container centres content with a max width", () => {
    render(<Container data-testid="container" size="md" />);
    expect(screen.getByTestId("container")).toHaveClass("mx-auto", "max-w-screen-md");
  });

  it("Spacer is decorative and fills space unless sized", () => {
    const { rerender } = render(<Spacer data-testid="spacer" />);
    const spacer = screen.getByTestId("spacer");
    expect(spacer).toHaveAttribute("aria-hidden", "true");
    expect(spacer).toHaveClass("flex-1");

    rerender(<Spacer data-testid="spacer" axis="vertical" size={4} />);
    expect(screen.getByTestId("spacer")).toHaveStyle({ height: "16px" });
    expect(screen.getByTestId("spacer")).not.toHaveClass("flex-1");
  });

  it("AspectRatio keeps its content at the given ratio", () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <span>Media</span>
      </AspectRatio>,
    );
    // Radix reserves the space with padding-bottom = 1 / ratio.
    const wrapper = screen.getByText("Media").parentElement?.parentElement;
    expect(wrapper?.style.paddingBottom).toBe(`${100 / (16 / 9)}%`);
  });

  it("ScrollArea renders its content in a viewport", () => {
    render(
      <ScrollArea className="h-24">
        <p>Long content</p>
      </ScrollArea>,
    );
    expect(
      screen.getByText("Long content").closest("[data-radix-scroll-area-viewport]"),
    ).not.toBeNull();
  });
});
