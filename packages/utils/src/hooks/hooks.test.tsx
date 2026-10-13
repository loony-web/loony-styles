import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef, useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useCallbackRef } from "./use-callback-ref.js";
import { useControllableState } from "./use-controllable-state.js";
import { useEscapeKey } from "./use-escape-key.js";
import { useEvent } from "./use-event.js";
import { useFocusTrap } from "./use-focus-trap.js";
import { useId } from "./use-id.js";
import { useOutsideClick } from "./use-outside-click.js";
import { usePrevious } from "./use-previous.js";
import { useSize } from "./use-size.js";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useControllableState", () => {
  it("manages its own state when uncontrolled and reports changes", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControllableState({ defaultValue: 1, onChange }));
    expect(result.current[0]).toBe(1);

    act(() => result.current[1](2));
    expect(result.current[0]).toBe(2);
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("follows the prop when controlled and only reports changes", () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }) => useControllableState({ value, onChange }),
      { initialProps: { value: "a" } },
    );

    act(() => result.current[1]("b"));
    expect(result.current[0]).toBe("a"); // parent hasn't accepted the change yet
    expect(onChange).toHaveBeenCalledWith("b");

    rerender({ value: "b" });
    expect(result.current[0]).toBe("b");
  });

  it("supports functional updates", () => {
    const { result } = renderHook(() => useControllableState({ defaultValue: 1 }));
    act(() => result.current[1]((n) => (n ?? 0) + 1));
    expect(result.current[0]).toBe(2);
  });
});

describe("useEscapeKey", () => {
  it("calls the handler on Escape only, and only while enabled", () => {
    const handler = vi.fn();
    const { rerender } = renderHook(({ enabled }) => useEscapeKey(handler, enabled), {
      initialProps: { enabled: true },
    });

    fireEvent.keyDown(document, { key: "Enter" });
    fireEvent.keyDown(document, { key: "Escape" });
    expect(handler).toHaveBeenCalledOnce();

    rerender({ enabled: false });
    fireEvent.keyDown(document, { key: "Escape" });
    expect(handler).toHaveBeenCalledOnce();
  });
});

describe("useOutsideClick", () => {
  function Box({ onOutside }: { onOutside: () => void }) {
    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, onOutside);
    return (
      <>
        <div ref={ref}>
          <button type="button">Inside</button>
        </div>
        <button type="button">Outside</button>
      </>
    );
  }

  it("fires for pointer-downs outside the element only", async () => {
    const onOutside = vi.fn();
    const user = userEvent.setup();
    render(<Box onOutside={onOutside} />);

    await user.click(screen.getByRole("button", { name: "Inside" }));
    expect(onOutside).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(onOutside).toHaveBeenCalledOnce();
  });
});

describe("useFocusTrap", () => {
  function Trap({ enabled }: { enabled: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    useFocusTrap(ref, enabled);
    return (
      <div ref={ref}>
        <button type="button">First</button>
        <button type="button" disabled>
          Disabled
        </button>
        <button type="button">Last</button>
      </div>
    );
  }

  function Harness() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          Open
        </button>
        {open && <Trap enabled />}
        {open && (
          <button type="button" onClick={() => setOpen(false)}>
            Close
          </button>
        )}
      </>
    );
  }

  it("focuses the first element, cycles Tab/Shift+Tab, and restores focus", async () => {
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });
    const user = userEvent.setup();
    render(<Harness />);

    const opener = screen.getByRole("button", { name: "Open" });
    await user.click(opener);
    const first = screen.getByRole("button", { name: "First" });
    const last = screen.getByRole("button", { name: "Last" });
    expect(first).toHaveFocus();

    last.focus();
    await user.tab(); // wraps forward, skipping nothing outside
    expect(first).toHaveFocus();

    await user.tab({ shift: true }); // wraps backward
    expect(last).toHaveFocus();

    // Unmounting the trap returns focus to where it was before it opened.
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(opener).toHaveFocus();
  });
});

describe("small hooks", () => {
  it("usePrevious lags one render behind", () => {
    const { result, rerender } = renderHook(({ v }) => usePrevious(v), {
      initialProps: { v: 1 },
    });
    expect(result.current).toBeUndefined();
    rerender({ v: 2 });
    expect(result.current).toBe(1);
  });

  it("useCallbackRef keeps a stable identity that calls the latest callback", () => {
    const first = vi.fn();
    const second = vi.fn();
    const { result, rerender } = renderHook(({ cb }) => useCallbackRef(cb), {
      initialProps: { cb: first },
    });
    const stable = result.current;
    rerender({ cb: second });
    expect(result.current).toBe(stable);
    result.current();
    expect(second).toHaveBeenCalledOnce();
    expect(first).not.toHaveBeenCalled();
  });

  it("useEvent keeps a stable identity that sees the latest props", () => {
    const { result, rerender } = renderHook(({ n }) => useEvent(() => n), {
      initialProps: { n: 1 },
    });
    const stable = result.current;
    rerender({ n: 2 });
    expect(result.current).toBe(stable);
    expect(result.current()).toBe(2);
  });

  it("useId is stable and applies prefix and suffix", () => {
    const { result, rerender } = renderHook(() => useId("field", "label"));
    const id = result.current;
    rerender();
    expect(result.current).toBe(id);
    expect(id).toMatch(/^field-.+-label$/);
  });

  it("useSize reports the element size and observes changes", () => {
    let callback: ResizeObserverCallback = () => undefined;
    const disconnect = vi.fn();
    vi.stubGlobal(
      "ResizeObserver",
      class {
        constructor(cb: ResizeObserverCallback) {
          callback = cb;
        }
        observe() {
          // driven manually below
        }
        disconnect = disconnect;
      },
    );
    const el = document.createElement("div");
    Object.defineProperty(el, "offsetWidth", { value: 100 });
    Object.defineProperty(el, "offsetHeight", { value: 50 });

    const { result, unmount } = renderHook(() => useSize(el));
    expect(result.current).toEqual({ width: 100, height: 50 });

    act(() => {
      callback(
        [
          {
            contentBoxSize: [{ inlineSize: 200, blockSize: 80 }],
          } as unknown as ResizeObserverEntry,
        ],
        {} as ResizeObserver,
      );
    });
    expect(result.current).toEqual({ width: 200, height: 80 });

    unmount();
    expect(disconnect).toHaveBeenCalled();
  });

  it("useSize is undefined without an element", () => {
    const { result } = renderHook(() => useSize(null));
    expect(result.current).toBeUndefined();
  });
});
