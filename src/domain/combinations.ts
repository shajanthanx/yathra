/**
 * Subject-combination rules.
 *
 * Enough validation to stop a student picking a combination their stream does
 * not offer, and no more: the app greys out choices that cannot lead to a valid
 * set of three rather than showing error messages after the fact.
 */
import type { Stream, SubjectId } from '@/types/content';

export const SUBJECTS_REQUIRED = 3;

export type CombinationError = 'incomplete' | 'not_enough_core';

/** Subjects chosen automatically because the stream requires them. */
export function coreSubjects(stream: Stream): SubjectId[] {
  return [...stream.rule.core];
}

/** Subjects the student picks from, in the order the stream lists them. */
export function optionalSubjects(stream: Stream): SubjectId[] {
  const core = new Set(stream.rule.core);
  return stream.subjectIds.filter((id) => !core.has(id));
}

export function isCoreSubject(stream: Stream, subjectId: SubjectId): boolean {
  return stream.rule.core.includes(subjectId);
}

/** How many more subjects the student still has to choose. */
export function remainingChoices(stream: Stream, selected: readonly SubjectId[]): number {
  return Math.max(0, SUBJECTS_REQUIRED - selected.length);
}

export function validateSelection(
  stream: Stream,
  selected: readonly SubjectId[],
): CombinationError | null {
  if (selected.length !== SUBJECTS_REQUIRED) return 'incomplete';
  if (!stream.rule.core.every((id) => selected.includes(id))) return 'incomplete';

  const allowed = new Set<SubjectId>([...stream.rule.core, ...stream.rule.choose.from]);
  if (!selected.every((id) => allowed.has(id))) return 'incomplete';

  const atLeast = stream.rule.atLeast;
  if (atLeast) {
    const count = selected.filter((id) => atLeast.from.includes(id)).length;
    if (count < atLeast.count) return 'not_enough_core';
  }
  return null;
}

export function isSelectionComplete(stream: Stream, selected: readonly SubjectId[]): boolean {
  return validateSelection(stream, selected) === null;
}

/**
 * Whether adding this subject could still lead to a valid set of three.
 * Used to grey out choices instead of letting a student build a dead end.
 */
export function canAddSubject(
  stream: Stream,
  selected: readonly SubjectId[],
  subjectId: SubjectId,
): boolean {
  if (selected.includes(subjectId)) return true;
  if (selected.length >= SUBJECTS_REQUIRED) return false;
  if (!stream.subjectIds.includes(subjectId)) return false;

  const next = [...selected, subjectId];
  return canCompleteFrom(stream, next);
}

/** Can a valid selection of three still be reached from this partial set? */
function canCompleteFrom(stream: Stream, selected: readonly SubjectId[]): boolean {
  if (selected.length > SUBJECTS_REQUIRED) return false;

  const pool = stream.subjectIds.filter((id) => !selected.includes(id));
  const needed = SUBJECTS_REQUIRED - selected.length;
  if (needed === 0) return validateSelection(stream, selected) === null;
  if (pool.length < needed) return false;

  // The pools here are small (at most a dozen subjects), so an exhaustive
  // search is both fast and easier to trust than a clever rule engine.
  for (const combination of combinationsOf(pool, needed)) {
    if (validateSelection(stream, [...selected, ...combination]) === null) return true;
  }
  return false;
}

function* combinationsOf<T>(items: readonly T[], size: number): Generator<T[]> {
  if (size === 0) {
    yield [];
    return;
  }
  for (let i = 0; i <= items.length - size; i += 1) {
    const head = items[i];
    if (head === undefined) continue;
    for (const tail of combinationsOf(items.slice(i + 1), size - 1)) {
      yield [head, ...tail];
    }
  }
}

/** Toggles a subject, honouring core subjects and the three-subject limit. */
export function toggleSubject(
  stream: Stream,
  selected: readonly SubjectId[],
  subjectId: SubjectId,
): SubjectId[] {
  if (isCoreSubject(stream, subjectId)) return [...selected];
  if (selected.includes(subjectId)) return selected.filter((id) => id !== subjectId);
  if (selected.length >= SUBJECTS_REQUIRED) return [...selected];
  return [...selected, subjectId];
}
