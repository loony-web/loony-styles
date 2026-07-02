"use client";

import { useCallback, useReducer } from "react";

type StateTransitions<TState extends string> = Record<string, TState>;
type Machine<TState extends string> = Partial<Record<TState, StateTransitions<TState>>>;

/**
 * useStateMachine — Minimal finite state machine hook.
 *
 * Internal primitive used by Presence for mount/unmount state management.
 * Not exported from the public API.
 */
export function useStateMachine<TState extends string>(
  initialState: TState,
  machine: Machine<TState>,
): { state: TState; dispatch: (event: string) => void } {
  const [state, dispatch] = useReducer((currentState: TState, event: string): TState => {
    const nextState = machine[currentState]?.[event];
    return nextState ?? currentState;
  }, initialState);

  const stableDispatch = useCallback(dispatch, []);
  return { state, dispatch: stableDispatch };
}
