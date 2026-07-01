import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Progress } from "./progress.js";

describe("Progress", () => {
  it("renders with value", () => {
    render(<Progress value={60} label="Loading" />);
    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toBeInTheDocument();
    expect(progressbar).toHaveAttribute("aria-valuenow", "60");
  });

  it("uses label as aria-label", () => {
    render(<Progress value={30} label="File upload progress" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-label", "File upload progress");
  });

  it("defaults value to 0 when not provided", () => {
    render(<Progress label="Empty progress" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });

  it("accepts colorScheme variants without crashing", () => {
    const { rerender } = render(<Progress value={50} colorScheme="accent" />);
    rerender(<Progress value={50} colorScheme="success" />);
    rerender(<Progress value={50} colorScheme="danger" />);
    rerender(<Progress value={50} colorScheme="warning" />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("accepts size variants without crashing", () => {
    const { rerender } = render(<Progress value={50} size="xs" />);
    rerender(<Progress value={50} size="sm" />);
    rerender(<Progress value={50} size="md" />);
    rerender(<Progress value={50} size="lg" />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Progress value={50} className="custom-class" label="Custom" />);
    expect(screen.getByRole("progressbar")).toHaveClass("custom-class");
  });
});
