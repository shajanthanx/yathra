/**
 * Today's date, kept correct while the app is open.
 *
 * A student can leave the app on screen across midnight, so the date is
 * refreshed when the app returns to the foreground and again shortly after the
 * next local midnight. Everything date-dependent reads from here.
 */
import { useEffect, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import type { LocalDate } from '@/types/content';
import { todayLocal } from '@/utils/date';

function msUntilNextMidnight(now = new Date()): number {
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5);
  return Math.max(1000, next.getTime() - now.getTime());
}

export function useToday(): LocalDate {
  const [today, setToday] = useState<LocalDate>(() => todayLocal());

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const sync = () => {
      setToday((current) => {
        const next = todayLocal();
        return next === current ? current : next;
      });
    };

    const scheduleMidnight = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        sync();
        scheduleMidnight();
      }, msUntilNextMidnight());
    };

    scheduleMidnight();

    const handleAppStateChange = (state: AppStateStatus) => {
      if (state === 'active') {
        sync();
        scheduleMidnight();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      if (timer) clearTimeout(timer);
      subscription.remove();
    };
  }, []);

  return today;
}
