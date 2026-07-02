"use client";

import {
  createContext as reactCreateContext,
  useContext,
  type Context,
  type Provider,
} from "react";

interface CreateContextOptions<T> {
  /**
   * The name of the context — used in the error message.
   */
  name: string;
  /**
   * Error to throw when the hook is used outside the provider.
   * If undefined, the context will allow undefined values (optional context).
   */
  errorMessage?: string;
  /**
   * Default context value. If provided, useContext will not throw when
   * used outside a provider.
   */
  defaultValue?: T;
}

type CreateContextReturn<T> = [Provider<T | undefined>, () => T, Context<T | undefined>];

/**
 * createContext — Typed context factory with strict provider enforcement.
 *
 * Unlike React's built-in createContext, this factory:
 *   1. Throws a descriptive error when the hook is used outside a provider
 *   2. Returns a strongly-typed tuple [Provider, useHook, Context]
 *   3. Eliminates the need for null-checks in every consumer
 *
 * @example
 * const [ThemeProvider, useTheme] = createContext<ThemeContextValue>({
 *   name: "ThemeContext",
 * });
 *
 * // Wrap your tree:
 * <ThemeProvider value={{ mode: "dark" }}>...</ThemeProvider>
 *
 * // Consume anywhere in the tree:
 * const { mode } = useTheme(); // throws if used outside ThemeProvider
 */
export function createContext<T>(
  options: CreateContextOptions<T>,
): CreateContextReturn<T> {
  const { name, errorMessage, defaultValue } = options;

  const Context = reactCreateContext<T | undefined>(defaultValue);
  Context.displayName = name;

  function useContextValue(): T {
    const value = useContext(Context);
    if (value === undefined) {
      throw new Error(
        errorMessage ?? `\`${name}\` hook must be used inside a \`${name}Provider\`.`,
      );
    }
    return value;
  }

  return [Context.Provider, useContextValue, Context] as CreateContextReturn<T>;
}

interface CreateScopedContextOptions<T> extends CreateContextOptions<T> {
  /**
   * Scope name — used to create a scoped context for compound components.
   * Enables multiple instances of the same component to have isolated state.
   */
  scope: string;
}

/**
 * createScopedContext — Context factory for compound component trees.
 *
 * Creates a context that is scoped to a specific component tree segment.
 * This is the primitive used by compound components like Dialog, Tabs, etc.
 * to ensure that nested instances don't share state.
 *
 * @example
 * const [TabsProvider, useTabs] = createScopedContext<TabsContextValue>({
 *   name: "TabsContext",
 *   scope: "Tabs",
 * });
 */
export function createScopedContext<T>(
  options: CreateScopedContextOptions<T>,
): CreateContextReturn<T> {
  const { scope, ...rest } = options;
  return createContext<T>({
    ...rest,
    name: `${scope}:${rest.name}`,
  });
}
