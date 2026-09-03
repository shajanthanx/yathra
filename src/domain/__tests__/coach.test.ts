/**
 * The coach line. What matters here is the priority order — the message has to
 * be true about the student's actual state, and it must never scold.
 */
import { selectCoachMessage, type CoachInput } from '../coach';

function input(overrides: Partial<CoachInput> = {}): CoachInput {
  return {
    status: 'on_track',
    examPhase: 'before',
    notStarted: false,
    tasksToday: 0,
    tasksCompletedToday: 0,
    topicsCompletedThisWeek: 0,
    ...overrides,
  };
}

describe('selectCoachMessage', () => {
  it('lets the exam outrank everything else', () => {
    expect(selectCoachMessage(input({ examPhase: 'after', status: 'behind' })).id).toBe('examDone');
    expect(selectCoachMessage(input({ examPhase: 'during', status: 'behind' })).id).toBe(
      'examPeriod',
    );
  });

  it('says there is nothing to do before the journey begins', () => {
    expect(selectCoachMessage(input({ notStarted: true, status: 'just_started' })).id).toBe(
      'notStarted',
    );
  });

  it('celebrates a finished day ahead of the on-track status', () => {
    const message = selectCoachMessage(
      input({ tasksToday: 3, tasksCompletedToday: 3, status: 'behind' }),
    );
    expect(message.id).toBe('allDoneToday');
  });

  it('treats more completions than planned as a finished day', () => {
    expect(selectCoachMessage(input({ tasksToday: 2, tasksCompletedToday: 4 })).id).toBe(
      'allDoneToday',
    );
  });

  it('points at the next step when the student is behind', () => {
    expect(selectCoachMessage(input({ status: 'behind' })).id).toBe('behind');
    expect(selectCoachMessage(input({ status: 'catching_up' })).id).toBe('catchingUp');
  });

  it('acknowledges partial progress once the status is not a concern', () => {
    const message = selectCoachMessage(input({ tasksToday: 3, tasksCompletedToday: 1 }));
    expect(message).toEqual({ id: 'someDoneToday', count: 1 });
  });

  it('falls back to the week when nothing was done today', () => {
    const message = selectCoachMessage(input({ topicsCompletedThisWeek: 2 }));
    expect(message).toEqual({ id: 'topicsThisWeek', count: 2 });
  });

  it('carries a count only on the messages whose copy names one', () => {
    expect(selectCoachMessage(input({ status: 'on_track' })).count).toBeUndefined();
    expect(selectCoachMessage(input({ status: 'behind' })).count).toBeUndefined();
  });

  it('is calm when there is simply nothing to report', () => {
    expect(selectCoachMessage(input({ status: 'just_started' })).id).toBe('justStarted');
    expect(selectCoachMessage(input({ status: 'on_track' })).id).toBe('onTrack');
  });

  it('is deterministic — the same state always gives the same line', () => {
    const state = input({ tasksToday: 4, tasksCompletedToday: 2, topicsCompletedThisWeek: 3 });
    const first = selectCoachMessage(state);
    for (let run = 0; run < 20; run += 1) {
      expect(selectCoachMessage(state)).toEqual(first);
    }
  });
});
