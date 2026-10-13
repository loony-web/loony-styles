import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "../input/input.js";
import { FormField } from "./form-field.js";

describe("FormField", () => {
  it("labels the control", () => {
    render(
      <FormField label="Email" htmlFor="email">
        <Input id="email" />
      </FormField>,
    );
    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument();
  });

  it("announces required fields without reading the asterisk", () => {
    render(
      <FormField label="Email" htmlFor="email" isRequired>
        <Input id="email" />
      </FormField>,
    );
    expect(screen.getByRole("textbox", { name: "Email (required)" })).toBeInTheDocument();
  });

  it("describes the control with the helper text", () => {
    render(
      <FormField label="Username" htmlFor="username" helperText="3–16 characters">
        <Input id="username" />
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: "Username" });
    expect(input).toHaveAccessibleDescription("3–16 characters");
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("replaces the helper with the error, describes and invalidates the control", () => {
    render(
      <FormField
        label="Username"
        htmlFor="username"
        helperText="3–16 characters"
        errorMessage="Too short"
      >
        <Input id="username" />
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: "Username" });
    expect(input).toHaveAccessibleDescription("Too short");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Too short");
    expect(screen.queryByText("3–16 characters")).not.toBeInTheDocument();
  });

  it("keeps the control's own aria-describedby", () => {
    render(
      <>
        <p id="hint">Visible on the page</p>
        <FormField label="Code" htmlFor="code" helperText="6 digits">
          <Input id="code" aria-describedby="hint" />
        </FormField>
      </>,
    );
    expect(screen.getByRole("textbox", { name: "Code" })).toHaveAccessibleDescription(
      "Visible on the page 6 digits",
    );
  });
});
