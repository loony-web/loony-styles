import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Input } from "./input.js";

describe("Input", () => {
  it("renders a text input", () => {
    render(<Input aria-label="Username" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders placeholder text", () => {
    render(<Input placeholder="Enter username" aria-label="Username" />);
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="Username" />);
    const input = screen.getByRole("textbox");
    await user.type(input, "hello");
    expect(input).toHaveValue("hello");
  });

  it("calls onChange handler", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input aria-label="Username" onChange={onChange} />);
    await user.type(screen.getByRole("textbox"), "a");
    expect(onChange).toHaveBeenCalled();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Input aria-label="Username" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("is readonly when readOnly prop is set", () => {
    render(<Input aria-label="Username" readOnly defaultValue="fixed" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
  });

  it("marks as invalid with aria-invalid", () => {
    render(<Input aria-label="Username" aria-invalid />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid");
  });

  it("applies custom className", () => {
    render(<Input aria-label="Username" className="custom" />);
    expect(screen.getByRole("textbox").parentElement).toHaveClass("custom");
  });

  it("renders with leftElement", () => {
    render(<Input aria-label="Search" leftElement={<span data-testid="left-icon" />} />);
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
  });

  it("renders with rightElement", () => {
    render(<Input aria-label="Password" rightElement={<span data-testid="right-icon" />} />);
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });
});
