/** Study-time figures for Progress and the weekly review. */
import { useMemo } from 'react';
import { weekStudySeconds } from '@/domain/studyTime';
import { useSessions } from '@/store/useStore';
import { useToday } from './useToday';

export function useWeekStudySeconds(): number {
  const sessions = useSessions();
  const today = useToday();
  return useMemo(() => weekStudySeconds(sessions, today), [sessions, today]);
}

export function useTotalSessions(): number {
  const sessions = useSessions();
  return sessions.length;
}
