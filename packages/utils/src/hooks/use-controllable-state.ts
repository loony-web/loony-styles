"use client";

import { type Dispatch, type SetStateAction, useCallback, useRef, useState } from "react";
import { useCallbackRef } from "./use-callback-ref.js";

interface UseControllableStateParams<T> {
  /** The controlled value (from props). If provided, component is controlled. */
  value?: T;
  /** Default uncontrolled value. Only used when `value` is undefined. */
  defaultValue?: T | (() => T);
  /** Called when state changes — always fired, even in controlled mode. */
  onChange?: (value: T) => void;
}

/**
 * useControllableState — Unified controlled/uncontrolled state management.
 *
 * Enables a component to be either controlled (value from props) or
 * uncontrolled (internally managed state) with the same API.
 *
 * This is the pattern used by Radix UI, Headless UI, and React Aria
 * for all interactive primitives. It handles:
 *   - Controlled: state is owned by the parent
 *   - Uncontrolled: state is owned internally
 *   - Transition: component switches from uncontrolled → controlled
 *
 * @example
 * // In a component that accepts optional `value` and `onChange` props:
 * const [open, setOpen] = useControllableState({
 *   value: props.open,
 *   defaultValue: props.defaultOpen ?? false,
 *   onChange: props.onOpenChange,
 * });
 */
export function useControllableState<T>({
  value: controlledValue,
  defaultValue,
  onChange,
}: UseControllableStateParams<T>): [T | undefined, Dispatch<SetStateAction<T | undefined>>] {
  const [uncontrolledValue, setUncontrolledValue] = useState<T | undefined>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = useCallbackRef(onChange);
  const isControlledRef = useRef(isControlled);

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const wasControlled = useRef(isControlled);
    if (wasControlled.current !== isControlled) {
      console.warn(
        `[Loony] A component changed from ${wasControlled.current ? "controlled" : "uncontrolled"} to ${isControlled ? "controlled" : "uncontrolled"}. Components should not switch between controlled and uncontrolled states.`,
      );
    }
  }

  const setValue: Dispatch<SetStateAction<T | undefined>> = useCallback(
    (nextValue) => {
      const setter = nextValue as (prevState: T | undefined) => T;
      const resolved =
        typeof nextValue === "function"
          ? setter(isControlledRef.current ? controlledValue : uncontrolledValue)
          : nextValue;

      if (!isControlledRef.current) {
        setUncontrolledValue(resolved);
      }
      if (resolved !== value) {
        handleChange(resolved as T);
      }
    },
    [controlledValue, handleChange, uncontrolledValue, value],
  );

  return [value, setValue];
}
