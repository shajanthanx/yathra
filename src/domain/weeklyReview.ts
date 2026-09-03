/**
 * The weekly review: what a student got through, and what to point at next.
 * Calculated on demand from local data — a student never has to "generate" one.
 */
import type { LocalDate, SubjectId, SubjectSyllabus, SyllabusTopic } from '@/types/content';
import type { StudySession, Task, TopicProgressMap } from '@/types/models';
import { getCurrentFocusTopic, getTopicStatus, calculateSubjectProgress } from './progress';
import { completionOf } from './tasks';
import { totalSecondsInRange } from './studyTime';
import { endOfWeek, localDateOf, startOfWeek } from '@/utils/date';

export type SubjectVerdict = 'good' | 'attention' | 'quiet';

const GOOD_RATE = 0.7;
const ATTENTION_RATE = 0.5;
const MAX_FOCUS_TOPICS = 4;

export interface SubjectWeek {
  subjectId: SubjectId;
  planned: number;
  completed: number;
  rate: number;
  verdict: SubjectVerdict;
}

export interface WeeklyReview {
  weekStart: LocalDate;
  weekEnd: LocalDate;
  planned: number;
  completed: number;
  /** 0–1 completion across the week. */
  rate: number;
  subjects: SubjectWeek[];
  topicsCompleted: number;
  studySeconds: number;
  /** Up to four topics worth starting next week. */
  nextFocus: SyllabusTopic[];
  isEmpty: boolean;
}

export interface WeeklyReviewInput {
  /** Any date inside the week under review. */
  date: LocalDate;
  tasks: readonly Task[];
  sessions: readonly StudySession[];
  syllabi: readonly SubjectSyllabus[];
  progress: TopicProgressMap;
}

export function buildWeeklyReview(input: WeeklyReviewInput): WeeklyReview {
  const { date, tasks, sessions, syllabi, progress } = input;
  const weekStart = startOfWeek(date);
  const weekEnd = endOfWeek(date);

  const weekTasks = tasks.filter((t) => t.date >= weekStart && t.date <= weekEnd);
  const overall = completionOf(weekTasks);

  const subjects: SubjectWeek[] = syllabi.map((syllabus) => {
    const subjectTasks = weekTasks.filter((t) => t.subjectId === syllabus.subjectId);
    const { total, completed, rate } = completionOf(subjectTasks);
    return {
      subjectId: syllabus.subjectId,
      planned: total,
      completed,
      rate,
      verdict: verdictFor(total, rate),
    };
  });

  const topicsCompleted = Object.values(progress).filter((entry) => {
    if (entry.status !== 'completed') return false;
    const day = localDateOf(entry.updatedAt);
    return day >= weekStart && day <= weekEnd;
  }).length;

  const studySeconds = totalSecondsInRange(sessions, weekStart, weekEnd);
  const nextFocus = pickNextFocus(syllabi, progress);

  return {
    weekStart,
    weekEnd,
    planned: overall.total,
    completed: overall.completed,
    rate: overall.rate,
    subjects,
    topicsCompleted,
    studySeconds,
    nextFocus,
    isEmpty: overall.total === 0 && topicsCompleted === 0 && studySeconds === 0,
  };
}

function verdictFor(planned: number, rate: number): SubjectVerdict {
  if (planned === 0) return 'quiet';
  if (rate >= GOOD_RATE) return 'good';
  if (rate < ATTENTION_RATE) return 'attention';
  return 'good';
}

/**
 * Topics to suggest next: anything already half-started first (finishing beats
 * starting), then the next untouched topic from whichever subject is furthest
 * behind.
 */
function pickNextFocus(
  syllabi: readonly SubjectSyllabus[],
  progress: TopicProgressMap,
): SyllabusTopic[] {
  const started: SyllabusTopic[] = [];
  for (const syllabus of syllabi) {
    for (const unit of syllabus.units) {
      for (const topic of unit.topics) {
        const status = getTopicStatus(progress, topic.id);
        if (status === 'learning' || status === 'practising') started.push(topic);
      }
    }
  }
  if (started.length >= MAX_FOCUS_TOPICS) return started.slice(0, MAX_FOCUS_TOPICS);

  const byProgress = [...syllabi].sort(
    (a, b) => calculateSubjectProgress(a, progress) - calculateSubjectProgress(b, progress),
  );

  const result = [...started];
  const seen = new Set(result.map((t) => t.id));
  for (const syllabus of byProgress) {
    if (result.length >= MAX_FOCUS_TOPICS) break;
    const next = getCurrentFocusTopic(syllabus, progress);
    if (next && !seen.has(next.id)) {
      result.push(next);
      seen.add(next.id);
    }
  }
  return result.slice(0, MAX_FOCUS_TOPICS);
}
