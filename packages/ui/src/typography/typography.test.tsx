import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Code, Heading, Kbd, Text } from "./typography.js";

describe("Text", () => {
  it("renders a paragraph by default", () => {
    render(<Text>Body</Text>);
    expect(screen.getByText("Body").tagName).toBe("P");
  });

  it("applies its styles to the child element with asChild", () => {
    render(
      <Text asChild weight="semibold">
        <span>Inline</span>
      </Text>,
    );
    const el = screen.getByText("Inline");
    expect(el.tagName).toBe("SPAN");
    expect(el).toHaveClass("font-semibold");
  });
});

describe("Heading", () => {
  it("renders the element matching its level", () => {
    render(<Heading level={3}>Title</Heading>);
    expect(screen.getByRole("heading", { level: 3, name: "Title" })).toBeInTheDocument();
  });

  it("lets `as` change the semantic level independently of the visual size", () => {
    render(
      <Heading level={2} as="h1">
        Page
      </Heading>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Page" })).toBeInTheDocument();
  });
});

describe("Code and Kbd", () => {
  it("renders inline code, block code and keys with the right elements", () => {
    render(
      <>
        <Code>inline</Code>
        <Code block>block</Code>
        <Kbd>K</Kbd>
      </>,
    );
    expect(screen.getByText("inline").tagName).toBe("CODE");
    expect(screen.getByText("block").closest("pre")).not.toBeNull();
    expect(screen.getByText("K").tagName).toBe("KBD");
  });
});
