"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useStateMachine } from "./internal/use-state-machine.js";
import { useComposedRefs } from "./compose-refs.js";

interface PresenceProps {
  children: ReactNode | ((props: { ref: React.RefCallback<HTMLElement> }) => ReactNode);
  /** Controls visibility. When false, animates out before unmounting. */
  present: boolean;
}

/**
 * Presence — Deferred unmounting with animation support.
 *
 * The challenge: CSS transitions run on mounted elements. If we unmount
 * the element the moment `present` becomes false, the exit animation never plays.
 *
 * Presence solves this by:
 *   1. Listening to the child element's `animationend` / `transitionend` events
 *   2. Keeping the element mounted until all animations complete
 *   3. Then unmounting
 *
 * This matches the approach used by Radix UI and Headless UI.
 *
 * State machine: mounted → { present → animating-out → unmounted }
 *
 * @example
 * <Presence present={open}>
 *   <div data-state={open ? "open" : "closed"}>Modal</div>
 * </Presence>
 */
export function Presence({ children, present }: PresenceProps) {
  const { isPresent, ref } = usePresence(present);

  if (!isPresent) return null;

  const child =
    typeof children === "function"
      ? children({ ref: ref as React.RefCallback<HTMLElement> })
      : Children.only(children);

  if (!isValidElement(child)) return null;

  return cloneElement(child as React.ReactElement<{ ref?: React.Ref<HTMLElement> }>, {
    ref: useComposedRefs(
      ref as React.Ref<HTMLElement>,
      (child as React.ReactElement & { ref?: React.Ref<HTMLElement> }).ref,
    ),
  });
}

Presence.displayName = "Presence";

type PresenceState = "mounted" | "unmounted" | "hidden";

/**
 * usePresence — Manages mount/unmount timing for animated elements.
 */
export function usePresence(present: boolean): {
  isPresent: boolean;
  ref: React.RefCallback<HTMLElement>;
} {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const stylesRef = useRef<CSSStyleDeclaration | null>(null);
  const prevPresentRef = useRef(present);
  const prevAnimationNameRef = useRef<string>("");

  const { state, dispatch } = useStateMachine<PresenceState>(
    present ? "mounted" : "unmounted",
    {
      mounted: {
        UNMOUNT: "unmounted",
        ANIMATION_OUT: "hidden",
      },
      hidden: {
        MOUNT: "mounted",
        ANIMATION_END: "unmounted",
      },
      unmounted: {
        MOUNT: "mounted",
      },
    },
  );

  const refCallback: React.RefCallback<HTMLElement> = (el) => {
    if (el) {
      stylesRef.current = getComputedStyle(el);
    }
    setNode(el);
  };

  useEffect(() => {
    const currentAnimationName = getAnimationName(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
  }, [state]);

  useEffect(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;

    if (present !== wasPresent) {
      const currentAnimationName = getAnimationName(styles);
      const isAnimating = currentAnimationName !== "none" && currentAnimationName !== "";

      if (present) {
        dispatch("MOUNT");
      } else if (isAnimating && currentAnimationName !== prevAnimationNameRef.current) {
        dispatch("ANIMATION_OUT");
      } else {
        dispatch("UNMOUNT");
      }
    }

    prevPresentRef.current = present;
  }, [dispatch, present]);

  useEffect(() => {
    if (!node) return;

    const handleAnimationEnd = (event: AnimationEvent) => {
      const currentAnimationName = getAnimationName(stylesRef.current);
      const isCurrentAnimation = currentAnimationName.includes(event.animationName);
      if (event.target === node && isCurrentAnimation) {
        dispatch("ANIMATION_END");
      }
    };

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target === node) {
        dispatch("ANIMATION_END");
      }
    };

    node.addEventListener("animationcancel", handleAnimationEnd);
    node.addEventListener("animationend", handleAnimationEnd);
    node.addEventListener("transitioncancel", handleTransitionEnd);
    node.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      node.removeEventListener("animationcancel", handleAnimationEnd);
      node.removeEventListener("animationend", handleAnimationEnd);
      node.removeEventListener("transitioncancel", handleTransitionEnd);
      node.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [dispatch, node]);

  return {
    isPresent: ["mounted", "hidden"].includes(state),
    ref: refCallback,
  };
}

function getAnimationName(styles: CSSStyleDeclaration | null): string {
  return styles?.animationName ?? "none";
}
