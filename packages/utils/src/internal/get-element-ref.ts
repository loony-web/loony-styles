import type { ReactElement, Ref } from "react";

interface RefDescriptor {
  get?: { isReactWarning?: boolean };
}

/** React dev builds mark deprecated `ref` accessors with `isReactWarning`. */
function hasWarningRefGetter(target: object): boolean {
  const descriptor = Object.getOwnPropertyDescriptor(target, "ref") as RefDescriptor | undefined;
  return descriptor?.get?.isReactWarning === true;
}

/**
 * getElementRef — Reads the ref attached to a React element.
 *
 * React 19 moved `ref` into `element.props.ref` and turned `element.ref` into
 * a getter that logs a deprecation warning in development. React 18 keeps the
 * ref on `element.ref` only. Detect which model we're on without tripping the
 * warning.
 *
 * Internal primitive used by Slot and Presence. Not exported from the public API.
 */
export function getElementRef<T>(element: ReactElement): Ref<T> | undefined {
  const props = element.props as { ref?: Ref<T> };

  // React 19: `element.ref` is a warning getter — the real ref lives on props.
  if (hasWarningRefGetter(element)) return props.ref;

  // React 18 (dev): `props.ref` is the warning getter — read `element.ref`.
  if (hasWarningRefGetter(props)) {
    return (element as ReactElement & { ref?: Ref<T> }).ref;
  }

  // Production builds have no warning getters: prefer the React 19 location.
  return props.ref ?? (element as ReactElement & { ref?: Ref<T> }).ref;
}
