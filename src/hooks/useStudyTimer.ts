/**
 * Study timer.
 *
 * Elapsed time is computed from wall-clock timestamps rather than counted by
 * the interval, so the figure stays correct when the operating system suspends
 * the app or throttles timers. The interval only drives repainting.
 */
import { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { elapsedSeconds, remainingSeconds } from '@/domain/studyTime';
import { useActiveSession } from '@/store/useStore';

export interface StudyTimerState {
  isActive: boolean;
  isRunning: boolean;
  elapsed: number;
  remaining: number;
  plannedSeconds: number;
  /** True once the planned time has been reached; the timer keeps counting up. */
  reachedTarget: boolean;
}

export function useStudyTimer(): StudyTimerState {
  const session = useActiveSession();
  const isRunning = session?.runningSince !== null && session !== null;
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => setTick((n) => n + 1), 1000);
    // Re-render immediately on foreground so a backgrounded timer never shows
    // a stale figure for up to a second.
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') setTick((n) => n + 1);
    });
    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, [isRunning]);

  if (!session) {
    return {
      isActive: false,
      isRunning: false,
      elapsed: 0,
      remaining: 0,
      plannedSeconds: 0,
      reachedTarget: false,
    };
  }

  const elapsed = elapsedSeconds(session);
  return {
    isActive: true,
    isRunning: session.runningSince !== null,
    elapsed,
    remaining: remainingSeconds(session),
    plannedSeconds: session.plannedSeconds,
    reachedTarget: session.plannedSeconds > 0 && elapsed >= session.plannedSeconds,
  };
}
