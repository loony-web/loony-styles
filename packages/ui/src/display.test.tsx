/**
 * Behaviour tests for the presentational components: semantics, accessible
 * names, and the small amount of interaction they have.
 */
import { PlusIcon } from "@loony/icons";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar/avatar.js";
import { Card, CardBody, CardDescription, CardFooter, CardHeader, CardTitle } from "./card/card.js";
import { EmptyState } from "./empty-state/empty-state.js";
import { IconButton } from "./icon-button/icon-button.js";
import { Label } from "./label/label.js";
import { Link } from "./link/link.js";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination/pagination.js";
import { Skeleton } from "./skeleton/skeleton.js";
import { Spinner } from "./spinner/spinner.js";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table/table.js";
import { Tag } from "./tag/tag.js";

describe("Link", () => {
  it("renders an anchor", () => {
    render(<Link href="/docs">Docs</Link>);
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("href", "/docs");
  });

  it("opens external links safely and says so to screen readers", () => {
    render(
      <Link href="https://example.com" external>
        Example
      </Link>,
    );
    const link = screen.getByRole("link", { name: /Example/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAccessibleName(/opens in new tab/i);
  });

  it("renders the child element with asChild", () => {
    render(
      <Link asChild>
        <button type="button">Action</button>
      </Link>,
    );
    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
  });
});

describe("IconButton", () => {
  it("is named by its label, not its icon", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <IconButton label="Add item" onClick={onClick}>
        <PlusIcon />
      </IconButton>,
    );
    await user.click(screen.getByRole("button", { name: "Add item" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe("Tag", () => {
  it("has no dismiss button unless onDismiss is given", () => {
    render(<Tag>React</Tag>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("calls onDismiss from a labelled button", async () => {
    const onDismiss = vi.fn();
    const user = userEvent.setup();
    render(
      <Tag onDismiss={onDismiss} dismissLabel="Remove React">
        React
      </Tag>,
    );
    await user.click(screen.getByRole("button", { name: "Remove React" }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });
});

describe("Spinner and Skeleton", () => {
  it("Spinner announces loading with a configurable label", () => {
    render(<Spinner label="Saving" />);
    expect(screen.getByRole("status", { name: "Saving" })).toBeInTheDocument();
  });

  it("Spinner can be purely decorative", () => {
    render(<Spinner label="" data-testid="spinner" />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByTestId("spinner")).toHaveAttribute("aria-hidden", "true");
  });

  it("Skeleton is a busy loading status", () => {
    render(<Skeleton />);
    expect(screen.getByRole("status", { name: "Loading" })).toHaveAttribute("aria-busy", "true");
  });
});

describe("EmptyState", () => {
  it("renders title, description and action", () => {
    render(
      <EmptyState
        title="No projects"
        description="Create one to get started."
        action={<button type="button">New project</button>}
      />,
    );
    expect(screen.getByRole("heading", { name: "No projects" })).toBeInTheDocument();
    expect(screen.getByText("Create one to get started.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "New project" })).toBeInTheDocument();
  });
});

describe("Card", () => {
  it("renders its parts with a heading title", () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Pro</CardTitle>
          <CardDescription>For teams</CardDescription>
        </CardHeader>
        <CardBody>Body</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByRole("heading", { name: "Pro" })).toBeInTheDocument();
    expect(screen.getByTestId("card")).toHaveTextContent("ProFor teamsBodyFooter");
  });
});

describe("Avatar", () => {
  it("shows the fallback when there is no loaded image", () => {
    render(
      <Avatar>
        <AvatarImage src="/missing.png" alt="Ada Lovelace" />
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>,
    );
    // jsdom never loads images, so Radix keeps the fallback.
    expect(screen.getByText("AL")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});

describe("Label", () => {
  it("names its control and focuses it on click", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Label htmlFor="name">Name</Label>
        <input id="name" />
      </>,
    );
    await user.click(screen.getByText("Name"));
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveFocus();
  });
});

describe("Table", () => {
  it("keeps native table semantics", () => {
    render(
      <Table>
        <TableCaption>Invoices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV-001</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    const table = screen.getByRole("table", { name: "Invoices" });
    expect(table).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Invoice" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "INV-001" })).toBeInTheDocument();
  });
});

describe("Pagination", () => {
  it("is a labelled nav with the current page marked", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="?page=1" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="?page=2" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="?page=3" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(screen.getByRole("navigation", { name: "pagination" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "2" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Go to previous page" })).toHaveAttribute(
      "href",
      "?page=1",
    );
    expect(screen.getByRole("link", { name: "Go to next page" })).toHaveAttribute(
      "href",
      "?page=3",
    );
  });
});
