import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Alert, AlertDescription, AlertTitle } from "./alert.js";

describe("Alert", () => {
  it("renders with role alert", () => {
    render(<Alert>Content</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders AlertTitle and AlertDescription", () => {
    render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Something important happened.</AlertDescription>
      </Alert>,
    );
    expect(screen.getByText("Heads up")).toBeInTheDocument();
    expect(screen.getByText("Something important happened.")).toBeInTheDocument();
  });

  it("renders all variants without crashing", () => {
    const variants = ["info", "success", "warning", "danger"] as const;
    for (const variant of variants) {
      const { unmount } = render(<Alert variant={variant}>{variant}</Alert>);
      expect(screen.getByRole("alert")).toBeInTheDocument();
      unmount();
    }
  });

  it("applies custom className", () => {
    render(<Alert className="custom-alert">Content</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("custom-alert");
  });
});
