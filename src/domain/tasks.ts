/**
 * Task queries. Pure helpers over the task list — no storage, no React.
 */
import type { LocalDate, SubjectId } from '@/types/content';
import type { Task } from '@/types/models';
import { addDays, endOfWeek, startOfWeek, weekDates } from '@/utils/date';

export function isOverdue(task: Task, today: LocalDate): boolean {
  return !task.completed && task.date < today;
}

export function tasksForDay(tasks: readonly Task[], date: LocalDate): Task[] {
  return sortTasks(tasks.filter((t) => t.date === date));
}

export function overdueTasks(tasks: readonly Task[], today: LocalDate): Task[] {
  return sortTasks(tasks.filter((t) => isOverdue(t, today)));
}

/** Tasks in the week containing `date`, whether or not they are complete. */
export function tasksForWeek(tasks: readonly Task[], date: LocalDate): Task[] {
  const start = startOfWeek(date);
  const end = endOfWeek(date);
  return sortTasks(tasks.filter((t) => t.date >= start && t.date <= end));
}

/** Tasks after this week — the "Later" list. */
export function laterTasks(tasks: readonly Task[], today: LocalDate): Task[] {
  const end = endOfWeek(today);
  return sortTasks(tasks.filter((t) => t.date > end));
}

export function upcomingTasks(tasks: readonly Task[], today: LocalDate, days: number): Task[] {
  const limit = addDays(today, days);
  return sortTasks(tasks.filter((t) => t.date >= today && t.date <= limit));
}

/** Incomplete first, then by duration (short tasks first), then by title. */
export function sortTasks(tasks: readonly Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    if (a.date !== b.date) return a.date < b.date ? -1 : 1;
    const durA = a.durationMinutes ?? Number.MAX_SAFE_INTEGER;
    const durB = b.durationMinutes ?? Number.MAX_SAFE_INTEGER;
    if (durA !== durB) return durA - durB;
    return a.title.localeCompare(b.title);
  });
}

export interface DayGroup {
  date: LocalDate;
  tasks: Task[];
}

export function groupByDay(tasks: readonly Task[]): DayGroup[] {
  const map = new Map<LocalDate, Task[]>();
  for (const task of tasks) {
    const list = map.get(task.date);
    if (list) list.push(task);
    else map.set(task.date, [task]);
  }
  return [...map.entries()]
    .sort((a, b) => (a[0] < b[0] ? -1 : 1))
    .map(([date, list]) => ({ date, tasks: sortTasks(list) }));
}

export interface WeekDaySummary {
  date: LocalDate;
  total: number;
  completed: number;
}

export function summariseWeek(tasks: readonly Task[], weekStart: LocalDate): WeekDaySummary[] {
  return weekDates(weekStart).map((date) => {
    const dayTasks = tasks.filter((t) => t.date === date);
    return {
      date,
      total: dayTasks.length,
      completed: dayTasks.filter((t) => t.completed).length,
    };
  });
}

export interface Completion {
  total: number;
  completed: number;
  /** 0–1; zero when nothing was planned. */
  rate: number;
}

export function completionOf(tasks: readonly Task[]): Completion {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  return { total, completed, rate: total === 0 ? 0 : completed / total };
}

export function weeklyCompletion(tasks: readonly Task[], date: LocalDate): Completion {
  return completionOf(tasksForWeek(tasks, date));
}

/** Completion over the days leading up to today — feeds the on-track model. */
export function recentCompletion(tasks: readonly Task[], today: LocalDate, days: number): Completion {
  const from = addDays(today, -days);
  return completionOf(tasks.filter((t) => t.date >= from && t.date <= today));
}

export function tasksBySubject(tasks: readonly Task[], subjectId: SubjectId): Task[] {
  return tasks.filter((t) => t.subjectId === subjectId);
}

export function countPlannedMinutes(tasks: readonly Task[]): number {
  return tasks.reduce((sum, task) => sum + (task.durationMinutes ?? 0), 0);
}

export interface DayLoad {
  date: LocalDate;
  tasks: number;
  completed: number;
  minutes: number;
  /** Height relative to the busiest day in the range, 0-1. */
  intensity: number;
}

/**
 * Per-day workload across a set of dates, for the week bars on Plan and
 * Progress.
 *
 * Intensity is normalised against the busiest day in the range and is driven
 * by planned minutes. When no task in the range carries a duration it falls
 * back to task counts rather than inventing a length for them.
 */
export function dayLoad(tasks: readonly Task[], dates: readonly LocalDate[]): DayLoad[] {
  const rows = dates.map((date) => {
    const forDay = tasksForDay(tasks, date);
    return {
      date,
      tasks: forDay.length,
      completed: forDay.filter((task) => task.completed).length,
      minutes: countPlannedMinutes(forDay),
    };
  });

  const peakMinutes = rows.reduce((peak, row) => Math.max(peak, row.minutes), 0);
  const peakTasks = rows.reduce((peak, row) => Math.max(peak, row.tasks), 0);

  return rows.map((row) => ({
    ...row,
    intensity:
      peakMinutes > 0 ? row.minutes / peakMinutes : peakTasks > 0 ? row.tasks / peakTasks : 0,
  }));
}
