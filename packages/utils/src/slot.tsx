"use client";

import {
  type CSSProperties,
  type ComponentPropsWithRef,
  type ElementType,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  cloneElement,
  isValidElement,
} from "react";
import { composeRefs } from "./compose-refs.js";
import { getElementRef } from "./internal/get-element-ref.js";

interface SlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

/**
 * Slot — Merges props onto the direct child component.
 *
 * This is the core primitive for the `asChild` polymorphism pattern.
 * When a component renders `<Slot>`, it delegates its own rendered
 * element to its child — allowing the consumer to provide the actual
 * DOM element or component to render, while the library component
 * still applies its behavior, aria attributes, and event handlers.
 *
 * This is superior to the `as` prop because:
 *   1. Type safety: child component controls its own props
 *   2. No polymorphic type gymnastics in the library
 *   3. Composable: stacking asChild components works naturally
 *
 * @example
 * // Library component:
 * function Button({ asChild, ...props }) {
 *   const Comp = asChild ? Slot : "button";
 *   return <Comp data-component="button" {...props} />;
 * }
 *
 * // Consumer use — renders an <a> with all Button behavior:
 * <Button asChild>
 *   <a href="/dashboard">Dashboard</a>
 * </Button>
 */
export const Slot = ({ children, ...slotProps }: SlotProps) => {
  if (!isValidElement(children)) {
    return <>{children}</>;
  }

  if (isSlottable(children)) {
    return (
      <Slot {...mergeProps(slotProps, children.props as unknown as Record<string, unknown>)}>
        {(children.props as { children?: ReactNode }).children}
      </Slot>
    );
  }

  const childProps = children.props as Record<string, unknown>;
  const merged = mergeProps(slotProps, childProps);

  return cloneElement(children as ReactElement<Record<string, unknown>>, {
    ...merged,
    ref: composeRefs((slotProps as { ref?: React.Ref<unknown> }).ref, getElementRef(children)),
  });
};

Slot.displayName = "Slot";

/**
 * Slottable — Marks a child as the target for Slot prop merging.
 *
 * Use when a compound component has multiple children and only one
 * should receive the Slot's merged props.
 *
 * @example
 * function Icon({ children, ...props }) {
 *   return (
 *     <Slot {...props}>
 *       <Slottable>{children}</Slottable>
 *       <span aria-hidden>✓</span>
 *     </Slot>
 *   );
 * }
 */
interface SlottableProps {
  children: ReactNode;
}

export const Slottable = ({ children }: SlottableProps) => <>{children}</>;
Slottable.displayName = "Slottable";

function isSlottable(child: ReactNode): child is ReactElement<SlottableProps> {
  return isValidElement(child) && (child.type as ElementType) === Slottable;
}

type AnyProps = Record<string, unknown>;

function mergeProps(slotProps: AnyProps, childProps: AnyProps): AnyProps {
  const result: AnyProps = { ...childProps };

  for (const propName of Object.keys(slotProps)) {
    const slotVal = slotProps[propName];
    const childVal = childProps[propName];

    if (isEventHandler(propName)) {
      // Both have handlers — compose them
      if (typeof slotVal === "function" && typeof childVal === "function") {
        result[propName] = (...args: unknown[]) => {
          (childVal as (...a: unknown[]) => unknown)(...args);
          (slotVal as (...a: unknown[]) => unknown)(...args);
        };
      } else {
        result[propName] = slotVal ?? childVal;
      }
    } else if (propName === "className") {
      result[propName] = [slotVal, childVal].filter(Boolean).join(" ");
    } else if (propName === "style") {
      result[propName] = { ...(slotVal as CSSProperties), ...(childVal as CSSProperties) };
    } else {
      result[propName] = slotVal !== undefined ? slotVal : childVal;
    }
  }

  return result;
}

function isEventHandler(key: string): boolean {
  return /^on[A-Z]/.test(key);
}

/**
 * createSlottable — Factory for components that support asChild polymorphism.
 *
 * @example
 * type ButtonProps = ComponentPropsWithRef<"button"> & { asChild?: boolean };
 * const Button = createSlottable<ButtonProps>("button", (props, ref) => {
 *   const { asChild, className, ...rest } = props;
 *   const Comp = asChild ? Slot : "button";
 *   return <Comp ref={ref} className={cn("btn", className)} {...rest} />;
 * });
 */
export function createSlottable<TProps extends { asChild?: boolean; ref?: React.Ref<unknown> }>(
  displayName: string,
  render: (props: TProps) => ReactNode,
): (props: TProps) => ReactNode {
  const Component = (props: TProps) => render(props);
  Component.displayName = displayName;
  return Component;
}

/**
 * WithAsChild — Utility type that adds `asChild` to any component's props.
 */
export type WithAsChild<TProps = object> = TProps & { asChild?: boolean };

/**
 * AsChildProps — Type helper for polymorphic "asChild" props.
 * Ensures the child element type is inferred correctly.
 */
export type AsChildProps<TElement extends ElementType> = ComponentPropsWithRef<TElement> & {
  asChild?: boolean;
};
