/**
 * A very small observable store.
 *
 * The app's state is one immutable object replaced on every change, which is
 * all `useSyncExternalStore` needs. Anything heavier (Redux, a store library)
 * would be more machinery than a single-user offline app can justify.
 */
export interface Store<S> {
  getState(): S;
  setState(updater: (state: S) => S): void;
  subscribe(listener: () => void): () => void;
}

export function createStore<S>(initialState: S): Store<S> {
  let state = initialState;
  const listeners = new Set<() => void>();

  return {
    getState: () => state,
    setState(updater) {
      const next = updater(state);
      if (next === state) return;
      state = next;
      listeners.forEach((listener) => listener());
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
