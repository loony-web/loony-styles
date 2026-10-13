import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { Toaster } from "./toaster.js";
import { dismissToast, removeToast, toast, useToast } from "./use-toast.js";

function SaveButton() {
  const { toast } = useToast();
  return (
    <button
      type="button"
      onClick={() => toast({ title: "Saved", description: "All changes saved." })}
    >
      Save
    </button>
  );
}

afterEach(() => {
  // The store is module-level: clear it between tests.
  for (const t of useToastSnapshot()) removeToast(t.id);
});

let snapshot: ReturnType<typeof useToast>["toasts"] = [];
function useToastSnapshot() {
  return snapshot;
}
function Spy() {
  snapshot = useToast().toasts;
  return null;
}

describe("Toaster + useToast", () => {
  it("shows a toast raised from anywhere in the tree", async () => {
    const user = userEvent.setup();
    render(
      <>
        <SaveButton />
        <Toaster />
      </>,
    );

    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(await screen.findByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("All changes saved.")).toBeInTheDocument();
  });

  it("supports the standalone toast() function and variants", async () => {
    render(<Toaster />);
    act(() => {
      toast({ title: "Payment failed", variant: "danger" });
    });
    expect(await screen.findByText("Payment failed")).toBeInTheDocument();
  });

  it("closes a toast with dismiss", async () => {
    render(
      <>
        <Toaster />
        <Spy />
      </>,
    );
    let id = "";
    act(() => {
      id = toast({ title: "Copied" });
    });
    expect(await screen.findByText("Copied")).toBeInTheDocument();

    act(() => dismissToast(id));
    expect(snapshot.find((t) => t.id === id)?.open).toBe(false);
    await waitFor(() => expect(screen.queryByText("Copied")).not.toBeInTheDocument());
  });

  it("shares one list between every useToast() caller", () => {
    render(<Spy />);
    act(() => {
      toast({ title: "One" });
      toast({ title: "Two" });
    });
    expect(snapshot.map((t) => t.title)).toEqual(["One", "Two"]);
  });
});
