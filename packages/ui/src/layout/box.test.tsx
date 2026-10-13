import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Box } from "./box.js";

describe("Box", () => {
  it("renders a div by default", () => {
    render(<Box data-testid="box">Content</Box>);
    expect(screen.getByTestId("box").tagName).toBe("DIV");
  });

  it("renders its child element with asChild and merges className", () => {
    render(
      <Box asChild className="p-4">
        <section aria-label="Pricing" className="py-16">
          Content
        </section>
      </Box>,
    );
    const section = screen.getByRole("region", { name: "Pricing" });
    expect(section.tagName).toBe("SECTION");
    expect(section).toHaveClass("p-4", "py-16");
  });
});
