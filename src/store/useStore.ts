/**
 * React binding for the app store.
 *
 * Selectors must return primitives or references that already live in state.
 * Anything derived (progress percentages, filtered lists) belongs in a hook
 * with `useMemo`, so the snapshot stays referentially stable between renders.
 */
import { useCallback, useRef, useSyncExternalStore } from 'react';
import { appStore, type AppState } from './appStore';

export function useAppState(): AppState {
  return useSyncExternalStore(appStore.subscribe, appStore.getState, appStore.getState);
}

export function useStore<T>(selector: (state: AppState) => T): T {
  const cache = useRef<{ state: AppState; value: T } | null>(null);

  const getSnapshot = useCallback(() => {
    const state = appStore.getState();
    const cached = cache.current;
    if (cached && cached.state === state) return cached.value;
    const value = selector(state);
    cache.current = { state, value };
    return value;
  }, [selector]);

  return useSyncExternalStore(appStore.subscribe, getSnapshot, getSnapshot);
}

// Stable selector references so components do not rebuild them each render.
const selectSettings = (state: AppState) => state.data.settings;
const selectProfile = (state: AppState) => state.data.profile;
const selectTasks = (state: AppState) => state.data.tasks;
const selectTopicProgress = (state: AppState) => state.data.topicProgress;
const selectSessions = (state: AppState) => state.data.sessions;
const selectActiveSession = (state: AppState) => state.data.activeSession;
const selectPastPapers = (state: AppState) => state.data.pastPapers;
const selectStatus = (state: AppState) => state.status;

export const useSettings = () => useStore(selectSettings);
export const useProfile = () => useStore(selectProfile);
export const useTasks = () => useStore(selectTasks);
export const useTopicProgress = () => useStore(selectTopicProgress);
export const useSessions = () => useStore(selectSessions);
export const useActiveSession = () => useStore(selectActiveSession);
export const usePastPapers = () => useStore(selectPastPapers);
export const useAppStatus = () => useStore(selectStatus);
