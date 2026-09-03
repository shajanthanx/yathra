import {
  calculateOverallProgress,
  calculateSubjectProgress,
  calculateUnitProgress,
  countCompletedTopics,
  countIncompleteTopics,
  getCurrentFocusTopic,
  getNextTopics,
  getTopicStatus,
  isUnitComplete,
  nextTopicStatus,
  STATUS_WEIGHTS,
  summariseSubject,
} from '../progress';
import { makeSyllabus, progressOf, topicIds } from './fixtures';

const syllabus = makeSyllabus();
const [alpha, beta, gamma, delta] = topicIds(syllabus) as [string, string, string, string];

describe('topic status', () => {
  it('defaults to not started', () => {
    expect(getTopicStatus({}, alpha)).toBe('not_started');
  });

  it('cycles through the four states and back', () => {
    expect(nextTopicStatus('not_started')).toBe('learning');
    expect(nextTopicStatus('learning')).toBe('practising');
    expect(nextTopicStatus('practising')).toBe('completed');
    expect(nextTopicStatus('completed')).toBe('not_started');
  });
});

describe('unit progress', () => {
  it('is zero when nothing is started', () => {
    const unit = syllabus.units[0]!;
    expect(calculateUnitProgress(unit, {})).toBe(0);
  });

  it('gives partial credit for a topic in progress', () => {
    const unit = syllabus.units[0]!;
    const progress = progressOf({ [alpha]: 'learning' });
    expect(calculateUnitProgress(unit, progress)).toBeCloseTo(STATUS_WEIGHTS.learning / 2);
  });

  it('is one when every topic is complete', () => {
    const unit = syllabus.units[0]!;
    const progress = progressOf({ [alpha]: 'completed', [beta]: 'completed' });
    expect(calculateUnitProgress(unit, progress)).toBe(1);
    expect(isUnitComplete(unit, progress)).toBe(true);
  });

  it('is not complete while a topic is only being practised', () => {
    const unit = syllabus.units[0]!;
    const progress = progressOf({ [alpha]: 'completed', [beta]: 'practising' });
    expect(isUnitComplete(unit, progress)).toBe(false);
  });
});

describe('subject progress', () => {
  it('weights units by their period allocation', () => {
    const progress = progressOf({ [alpha]: 'completed', [beta]: 'completed' });
    // Both units carry 10 periods, so finishing one is half the subject.
    expect(calculateSubjectProgress(syllabus, progress)).toBeCloseTo(0.5);
  });

  it('reaches one when everything is complete', () => {
    const progress = progressOf({
      [alpha]: 'completed',
      [beta]: 'completed',
      [gamma]: 'completed',
      [delta]: 'completed',
    });
    expect(calculateSubjectProgress(syllabus, progress)).toBe(1);
  });

  it('counts completed and incomplete topics', () => {
    const progress = progressOf({ [alpha]: 'completed', [beta]: 'practising' });
    expect(countCompletedTopics(syllabus, progress)).toBe(1);
    expect(countIncompleteTopics(syllabus, progress)).toBe(3);
  });
});

describe('overall progress', () => {
  it('is zero with no subjects', () => {
    expect(calculateOverallProgress([], {})).toBe(0);
  });

  it('averages subjects equally regardless of their size', () => {
    const a = makeSyllabus('physics');
    const b = makeSyllabus('chemistry');
    const done = progressOf(Object.fromEntries(topicIds(a).map((id) => [id, 'completed' as const])));
    expect(calculateOverallProgress([a, b], done)).toBeCloseTo(0.5);
  });
});

describe('current focus', () => {
  it('is the first topic when nothing has started', () => {
    expect(getCurrentFocusTopic(syllabus, {})?.id).toBe(alpha);
  });

  it('prefers a topic already in progress over an untouched one', () => {
    const progress = progressOf({ [alpha]: 'completed', [gamma]: 'practising' });
    expect(getCurrentFocusTopic(syllabus, progress)?.id).toBe(gamma);
  });

  it('is undefined when the subject is finished', () => {
    const progress = progressOf(
      Object.fromEntries(topicIds(syllabus).map((id) => [id, 'completed' as const])),
    );
    expect(getCurrentFocusTopic(syllabus, progress)).toBeUndefined();
  });
});

describe('next topics', () => {
  it('returns unfinished topics in syllabus order', () => {
    const progress = progressOf({ [alpha]: 'completed' });
    expect(getNextTopics(syllabus, progress, 2).map((topic) => topic.id)).toEqual([beta, gamma]);
  });

  it('respects the limit', () => {
    expect(getNextTopics(syllabus, {}, 1)).toHaveLength(1);
  });
});

describe('summariseSubject', () => {
  it('reports progress, counts and the focus topic together', () => {
    const progress = progressOf({ [alpha]: 'completed', [beta]: 'learning' });
    const summary = summariseSubject(syllabus, progress);
    expect(summary.subjectId).toBe('physics');
    expect(summary.totalTopics).toBe(4);
    expect(summary.completedTopics).toBe(1);
    expect(summary.incompleteTopics).toBe(3);
    expect(summary.focusTopic?.id).toBe(beta);
  });
});
