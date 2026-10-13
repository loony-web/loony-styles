import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../button/button.js";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog.js";

function TestDialog({
  open,
  onOpenChange,
}: { open?: boolean; onOpenChange?: (v: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Test Dialog</DialogTitle>
          <DialogDescription>Description text.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p>Dialog body content.</p>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

describe("Dialog", () => {
  it("is closed by default", () => {
    render(<TestDialog />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens on trigger click", async () => {
    const user = userEvent.setup();
    render(<TestDialog />);
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("shows title and description", async () => {
    const user = userEvent.setup();
    render(<TestDialog />);
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
    expect(screen.getByText("Description text.")).toBeInTheDocument();
  });

  it("closes when close button is clicked", async () => {
    const user = userEvent.setup();
    render(<TestDialog />);
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes on Escape key", async () => {
    const user = userEvent.setup();
    render(<TestDialog />);
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("[Escape]");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onOpenChange when closing", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<TestDialog open={true} onOpenChange={onOpenChange} />);
    await user.keyboard("[Escape]");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("renders in controlled open state", () => {
    render(<TestDialog open={true} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
