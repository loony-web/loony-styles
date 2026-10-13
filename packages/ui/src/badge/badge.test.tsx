import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge.js";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies solid variant by default", () => {
    const { container } = render(<Badge>Label</Badge>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders all variants without crashing", () => {
    const variants = [
      "solid",
      "subtle",
      "outline",
      "danger",
      "danger-subtle",
      "success",
      "success-subtle",
      "warning",
      "warning-subtle",
      "neutral",
    ] as const;
    for (const variant of variants) {
      const { unmount } = render(<Badge variant={variant}>{variant}</Badge>);
      expect(screen.getByText(variant)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders all sizes without crashing", () => {
    const sizes = ["sm", "md", "lg"] as const;
    for (const size of sizes) {
      const { unmount } = render(<Badge size={size}>{size}</Badge>);
      expect(screen.getByText(size)).toBeInTheDocument();
      unmount();
    }
  });

  it("applies custom className", () => {
    const { container } = render(<Badge className="custom-class">Label</Badge>);
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
