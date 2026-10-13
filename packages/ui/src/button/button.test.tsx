import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./button.js";

describe("Button", () => {
  describe("rendering", () => {
    it("renders with children", () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
    });

    it("renders as button by default", () => {
      render(<Button>Click</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("renders all variants without error", () => {
      const variants = [
        "solid",
        "outline",
        "ghost",
        "link",
        "danger",
        "danger-outline",
        "danger-ghost",
      ] as const;
      for (const variant of variants) {
        const { unmount } = render(<Button variant={variant}>Button</Button>);
        expect(screen.getByRole("button")).toBeInTheDocument();
        unmount();
      }
    });

    it("renders all sizes without error", () => {
      const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
      for (const size of sizes) {
        const { unmount } = render(<Button size={size}>Button</Button>);
        expect(screen.getByRole("button")).toBeInTheDocument();
        unmount();
      }
    });
  });

  describe("asChild", () => {
    it("renders as an anchor when asChild with <a>", () => {
      render(
        <Button asChild>
          <a href="/test">Navigate</a>
        </Button>,
      );
      expect(screen.getByRole("link", { name: "Navigate" })).toBeInTheDocument();
    });

    it("does not render type attribute on asChild", () => {
      render(
        <Button asChild>
          <a href="/test">Link</a>
        </Button>,
      );
      expect(screen.getByRole("link")).not.toHaveAttribute("type");
    });
  });

  describe("loading state", () => {
    it("shows spinner when loading", () => {
      render(<Button loading>Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("aria-disabled", "true");
    });

    it("is not interactive when loading", async () => {
      const onClick = vi.fn();
      render(
        <Button loading onClick={onClick}>
          Submit
        </Button>,
      );
      await userEvent.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("disabled state", () => {
    it("is disabled when disabled prop is true", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("does not fire onClick when disabled", async () => {
      const onClick = vi.fn();
      render(
        <Button disabled onClick={onClick}>
          Disabled
        </Button>,
      );
      await userEvent.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("icons", () => {
    it("renders leftIcon when provided", () => {
      render(<Button leftIcon={<span data-testid="left-icon" />}>Button</Button>);
      expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    });

    it("renders rightIcon when provided", () => {
      render(<Button rightIcon={<span data-testid="right-icon" />}>Button</Button>);
      expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    });

    it("hides rightIcon when loading", () => {
      render(
        <Button loading rightIcon={<span data-testid="right-icon" />}>
          Button
        </Button>,
      );
      expect(screen.queryByTestId("right-icon")).not.toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("fires onClick when clicked", async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Click me</Button>);
      await userEvent.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("is keyboard accessible", async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Press me</Button>);
      screen.getByRole("button").focus();
      await userEvent.keyboard("{Enter}");
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("className merging", () => {
    it("accepts additional className", () => {
      render(<Button className="custom-class">Button</Button>);
      expect(screen.getByRole("button")).toHaveClass("custom-class");
    });
  });
});
