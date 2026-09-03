/**
 * Syllabus progress arithmetic.
 *
 * A topic contributes a fraction of its weight according to its status, so a
 * student sees movement as soon as they start learning something rather than
 * only when a topic is finished.
 */
import type { SubjectId, SubjectSyllabus, SyllabusTopic, SyllabusUnit } from '@/types/content';
import type { TopicProgressMap, TopicStatus } from '@/types/models';

export const STATUS_WEIGHTS: Record<TopicStatus, number> = {
  not_started: 0,
  learning: 0.4,
  practising: 0.75,
  completed: 1,
};

/** The order the topic-status control cycles through. */
export const STATUS_ORDER: readonly TopicStatus[] = ['not_started', 'learning', 'practising', 'completed'];

export function getTopicStatus(progress: TopicProgressMap, topicId: string): TopicStatus {
  return progress[topicId]?.status ?? 'not_started';
}

export function nextTopicStatus(status: TopicStatus): TopicStatus {
  const index = STATUS_ORDER.indexOf(status);
  return STATUS_ORDER[(index + 1) % STATUS_ORDER.length] ?? 'not_started';
}

function weightedFraction(topics: readonly SyllabusTopic[], progress: TopicProgressMap): number {
  let total = 0;
  let earned = 0;
  for (const topic of topics) {
    const weight = topic.weight > 0 ? topic.weight : 1;
    total += weight;
    earned += weight * STATUS_WEIGHTS[getTopicStatus(progress, topic.id)];
  }
  return total === 0 ? 0 : earned / total;
}

/** Fraction 0–1 for one unit. */
export function calculateUnitProgress(unit: SyllabusUnit, progress: TopicProgressMap): number {
  return weightedFraction(unit.topics, progress);
}

export function isUnitComplete(unit: SyllabusUnit, progress: TopicProgressMap): boolean {
  return unit.topics.length > 0 && unit.topics.every((t) => getTopicStatus(progress, t.id) === 'completed');
}

/**
 * Fraction 0–1 for a subject. Units are weighted by their period allocation
 * where the syllabus publishes one, so a 195-period unit counts for more than a
 * 5-period unit; otherwise every unit counts equally.
 */
export function calculateSubjectProgress(syllabus: SubjectSyllabus, progress: TopicProgressMap): number {
  let total = 0;
  let earned = 0;
  for (const unit of syllabus.units) {
    const weight = unit.periods && unit.periods > 0 ? unit.periods : unitTopicWeight(unit);
    total += weight;
    earned += weight * calculateUnitProgress(unit, progress);
  }
  return total === 0 ? 0 : earned / total;
}

function unitTopicWeight(unit: SyllabusUnit): number {
  return unit.topics.reduce((sum, topic) => sum + (topic.weight > 0 ? topic.weight : 1), 0) || 1;
}

/** Mean of the student's subjects — each subject counts the same. */
export function calculateOverallProgress(
  syllabi: readonly SubjectSyllabus[],
  progress: TopicProgressMap,
): number {
  if (syllabi.length === 0) return 0;
  const sum = syllabi.reduce((acc, syllabus) => acc + calculateSubjectProgress(syllabus, progress), 0);
  return sum / syllabi.length;
}

export function allTopics(syllabus: SubjectSyllabus): SyllabusTopic[] {
  return syllabus.units.flatMap((unit) => [...unit.topics]);
}

export function countTopics(syllabus: SubjectSyllabus): number {
  return syllabus.units.reduce((sum, unit) => sum + unit.topics.length, 0);
}

export function countIncompleteTopics(syllabus: SubjectSyllabus, progress: TopicProgressMap): number {
  return allTopics(syllabus).filter((t) => getTopicStatus(progress, t.id) !== 'completed').length;
}

export function countCompletedTopics(syllabus: SubjectSyllabus, progress: TopicProgressMap): number {
  return allTopics(syllabus).filter((t) => getTopicStatus(progress, t.id) === 'completed').length;
}

/**
 * What the student is working on in a subject: the first topic already in
 * progress, else the first topic not yet started. Undefined when everything is
 * complete.
 */
export function getCurrentFocusTopic(
  syllabus: SubjectSyllabus,
  progress: TopicProgressMap,
): SyllabusTopic | undefined {
  const topics = allTopics(syllabus);
  const inProgress = topics.find((t) => {
    const status = getTopicStatus(progress, t.id);
    return status === 'learning' || status === 'practising';
  });
  if (inProgress) return inProgress;
  return topics.find((t) => getTopicStatus(progress, t.id) === 'not_started');
}

/** Topics a student has not finished, in syllabus order — the catch-up queue. */
export function getNextTopics(
  syllabus: SubjectSyllabus,
  progress: TopicProgressMap,
  limit: number,
): SyllabusTopic[] {
  const result: SyllabusTopic[] = [];
  for (const topic of allTopics(syllabus)) {
    if (result.length >= limit) break;
    if (getTopicStatus(progress, topic.id) !== 'completed') result.push(topic);
  }
  return result;
}

export interface SubjectProgressSummary {
  subjectId: SubjectId;
  progress: number;
  completedTopics: number;
  totalTopics: number;
  incompleteTopics: number;
  focusTopic: SyllabusTopic | undefined;
}

export function summariseSubject(
  syllabus: SubjectSyllabus,
  progress: TopicProgressMap,
): SubjectProgressSummary {
  const total = countTopics(syllabus);
  const completed = countCompletedTopics(syllabus, progress);
  return {
    subjectId: syllabus.subjectId,
    progress: calculateSubjectProgress(syllabus, progress),
    completedTopics: completed,
    totalTopics: total,
    incompleteTopics: total - completed,
    focusTopic: getCurrentFocusTopic(syllabus, progress),
  };
}
