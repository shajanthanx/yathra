/**
 * Catch-up planning.
 *
 * When a student falls behind, the worst thing the app could do is hand them an
 * impossible list. This builds a deliberately small seven-day plan: overdue
 * work is moved first, then the next few unfinished topics per subject, spread
 * out under a firm daily ceiling. It is fully deterministic — the same inputs
 * always produce the same plan — and uses no network or model.
 */
import type { LocalDate, SubjectId, SubjectSyllabus, SyllabusTopic } from '@/types/content';
import type { Task, TopicProgressMap } from '@/types/models';
import { getNextTopics, calculateSubjectProgress } from './progress';
import { overdueTasks } from './tasks';
import { addDays } from '@/utils/date';

/** Nothing bigger than this ever lands on one day. */
export const MAX_TASKS_PER_DAY = 3;
export const MAX_MINUTES_PER_DAY = 150;
export const PLAN_DAYS = 7;
export const DEFAULT_TOPIC_MINUTES = 45;

const MAX_TOPICS_PER_SUBJECT_MILD = 2;
const MAX_TOPICS_PER_SUBJECT_HARD = 4;

export interface CatchUpSubjectPlan {
  subjectId: SubjectId;
  topics: SyllabusTopic[];
}

export interface CatchUpDay {
  date: LocalDate;
  items: CatchUpItem[];
}

export interface CatchUpItem {
  kind: 'reschedule' | 'topic';
  /** Present when an existing overdue task is being moved. */
  taskId?: string;
  subjectId: SubjectId;
  topicId?: string;
  title: string;
  durationMinutes: number;
}

export interface CatchUpPlan {
  /** Overdue tasks that will be moved into the next seven days. */
  rescheduledTaskIds: string[];
  /** New topic-study tasks, grouped by subject, for the preview. */
  subjects: CatchUpSubjectPlan[];
  days: CatchUpDay[];
  totalItems: number;
  isEmpty: boolean;
}

export interface CatchUpInput {
  today: LocalDate;
  syllabi: readonly SubjectSyllabus[];
  progress: TopicProgressMap;
  tasks: readonly Task[];
  /** How far behind the student is overall, 0–1. Larger means more topics. */
  gap: number;
  /** Localised name for a topic-study task title. */
  topicTitle: (topic: SyllabusTopic) => string;
}

export function generateCatchUpPlan(input: CatchUpInput): CatchUpPlan {
  const { today, syllabi, progress, tasks, gap, topicTitle } = input;

  const overdue = overdueTasks(tasks, today);
  const perSubjectLimit = gap > 0.15 ? MAX_TOPICS_PER_SUBJECT_HARD : MAX_TOPICS_PER_SUBJECT_MILD;

  // A topic that already has an unfinished task planned does not need another.
  const topicsWithOpenTasks = new Set(
    tasks.filter((t) => !t.completed && t.topicId).map((t) => t.topicId as string),
  );

  // Subjects furthest behind are served first, so the plan targets the real gap.
  const ranked = [...syllabi]
    .map((syllabus) => ({ syllabus, progress: calculateSubjectProgress(syllabus, progress) }))
    .sort((a, b) => {
      if (a.progress !== b.progress) return a.progress - b.progress;
      return a.syllabus.subjectId.localeCompare(b.syllabus.subjectId);
    });

  const subjects: CatchUpSubjectPlan[] = ranked.map(({ syllabus }) => {
    const candidates = getNextTopics(syllabus, progress, perSubjectLimit + topicsWithOpenTasks.size);
    const topics = candidates.filter((t) => !topicsWithOpenTasks.has(t.id)).slice(0, perSubjectLimit);
    return { subjectId: syllabus.subjectId, topics };
  });

  // Round-robin across subjects so one subject never monopolises the week.
  const topicQueue: CatchUpItem[] = [];
  const maxRounds = Math.max(0, ...subjects.map((s) => s.topics.length));
  for (let round = 0; round < maxRounds; round += 1) {
    for (const subject of subjects) {
      const topic = subject.topics[round];
      if (!topic) continue;
      topicQueue.push({
        kind: 'topic',
        subjectId: subject.subjectId,
        topicId: topic.id,
        title: topicTitle(topic),
        durationMinutes: DEFAULT_TOPIC_MINUTES,
      });
    }
  }

  const rescheduleQueue: CatchUpItem[] = overdue.map((task) => ({
    kind: 'reschedule',
    taskId: task.id,
    subjectId: task.subjectId,
    ...(task.topicId === undefined ? {} : { topicId: task.topicId }),
    title: task.title,
    durationMinutes: task.durationMinutes ?? DEFAULT_TOPIC_MINUTES,
  }));

  // Overdue work is placed first: it is already late, and moving it is the
  // single most useful thing the plan can do.
  const queue = [...rescheduleQueue, ...topicQueue];

  const days: CatchUpDay[] = [];
  const usedMinutes: number[] = [];
  for (let i = 0; i < PLAN_DAYS; i += 1) {
    days.push({ date: addDays(today, i), items: [] });
    usedMinutes.push(0);
  }

  const placed: CatchUpItem[] = [];
  for (const item of queue) {
    const dayIndex = findDayWithRoom(days, usedMinutes, item.durationMinutes);
    if (dayIndex === -1) break; // The week is full; the rest waits rather than piling up.
    days[dayIndex]?.items.push(item);
    usedMinutes[dayIndex] = (usedMinutes[dayIndex] ?? 0) + item.durationMinutes;
    placed.push(item);
  }

  const placedIds = new Set(placed.map((item) => item.taskId).filter(Boolean) as string[]);
  const placedTopicIds = new Set(placed.filter((i) => i.kind === 'topic').map((i) => i.topicId));

  return {
    rescheduledTaskIds: [...placedIds],
    subjects: subjects
      .map((s) => ({ ...s, topics: s.topics.filter((t) => placedTopicIds.has(t.id)) }))
      .filter((s) => s.topics.length > 0),
    days: days.filter((day) => day.items.length > 0),
    totalItems: placed.length,
    isEmpty: placed.length === 0,
  };
}

/** First day with room for another task, respecting both daily ceilings. */
function findDayWithRoom(days: CatchUpDay[], usedMinutes: number[], minutes: number): number {
  for (let i = 0; i < days.length; i += 1) {
    const day = days[i];
    if (!day) continue;
    if (day.items.length >= MAX_TASKS_PER_DAY) continue;
    if ((usedMinutes[i] ?? 0) + minutes > MAX_MINUTES_PER_DAY && day.items.length > 0) continue;
    return i;
  }
  return -1;
}
