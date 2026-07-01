// Core utilities
export { cn } from "./cn.js";
export { composeRefs, useComposedRefs } from "./compose-refs.js";
export { createContext, createScopedContext } from "./create-context.js";

// React primitives
export { Slot, Slottable, createSlottable } from "./slot.js";
export type { WithAsChild, AsChildProps } from "./slot.js";
export { Portal, usePortalContainer } from "./portal.js";
export { Presence, usePresence } from "./presence.js";
export { VisuallyHidden } from "./visually-hidden.js";

// Hooks (also re-exported from ./hooks)
export {
  useCallbackRef,
  useControllableState,
  useEscapeKey,
  useEvent,
  useFocusTrap,
  useId,
  useIsomorphicLayoutEffect,
  useOutsideClick,
  usePrevious,
  useSize,
} from "./hooks/index.js";
