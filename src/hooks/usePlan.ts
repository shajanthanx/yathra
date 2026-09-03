/**
 * Task lists for the Plan and Home screens.
 */
import { useMemo } from 'react';
import {
  dayLoad,
  groupByDay,
  laterTasks,
  overdueTasks,
  summariseWeek,
  tasksForDay,
  tasksForWeek,
  weeklyCompletion,
  type Completion,
  type DayGroup,
  type DayLoad,
  type WeekDaySummary,
} from '@/domain/tasks';
import { useTasks } from '@/store/useStore';
import type { LocalDate } from '@/types/content';
import type { Task } from '@/types/models';
import { startOfWeek, weekDates } from '@/utils/date';
import { useToday } from './useToday';

export function useTodayTasks(): Task[] {
  const tasks = useTasks();
  const today = useToday();
  return useMemo(() => tasksForDay(tasks, today), [tasks, today]);
}

export function useOverdueTasks(): Task[] {
  const tasks = useTasks();
  const today = useToday();
  return useMemo(() => overdueTasks(tasks, today), [tasks, today]);
}

export function useTasksForDay(date: LocalDate): Task[] {
  const tasks = useTasks();
  return useMemo(() => tasksForDay(tasks, date), [tasks, date]);
}

export function useWeekSummary(date?: LocalDate): WeekDaySummary[] {
  const tasks = useTasks();
  const today = useToday();
  const anchor = date ?? today;
  return useMemo(() => summariseWeek(tasks, startOfWeek(anchor)), [tasks, anchor]);
}

/** Per-day workload for the week bars and the Home day cells. */
export function useWeekLoad(date?: LocalDate): DayLoad[] {
  const tasks = useTasks();
  const today = useToday();
  const anchor = date ?? today;
  return useMemo(() => dayLoad(tasks, weekDates(startOfWeek(anchor))), [tasks, anchor]);
}

export function useWeekTasks(date?: LocalDate): Task[] {
  const tasks = useTasks();
  const today = useToday();
  const anchor = date ?? today;
  return useMemo(() => tasksForWeek(tasks, anchor), [tasks, anchor]);
}

export function useLaterTasks(): DayGroup[] {
  const tasks = useTasks();
  const today = useToday();
  return useMemo(() => groupByDay(laterTasks(tasks, today)), [tasks, today]);
}

export function useWeeklyCompletion(date?: LocalDate): Completion {
  const tasks = useTasks();
  const today = useToday();
  const anchor = date ?? today;
  return useMemo(() => weeklyCompletion(tasks, anchor), [tasks, anchor]);
}
