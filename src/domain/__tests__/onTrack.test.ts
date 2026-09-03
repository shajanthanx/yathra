import { calculateOnTrackStatus, needsCatchUp } from '../onTrack';
import { makeTask, testYear } from './fixtures';

/** Halfway through the journey, when roughly half the syllabus is expected. */
const MIDPOINT = '2026-07-12';

function status(actualProgress: number, tasks = [] as ReturnType<typeof makeTask>[], today = MIDPOINT) {
  return calculateOnTrackStatus({ year: testYear, today, actualProgress, tasks }).status;
}

describe('early in the journey', () => {
  it('is "just started" before classes begin', () => {
    expect(status(0, [], '2025-01-01')).toBe('just_started');
  });

  it('is "just started" in the first fortnight', () => {
    expect(status(0, [], '2025-08-10')).toBe('just_started');
  });

  it('is "just started" when a student has recorded nothing at all', () => {
    expect(status(0, [])).toBe('just_started');
  });
});

describe('comparing expected with actual progress', () => {
  it('is on track when actual progress matches expectation', () => {
    expect(status(0.5, [makeTask({ completed: true })])).toBe('on_track');
  });

  it('is on track when a student is ahead', () => {
    expect(status(0.8, [makeTask({ completed: true })])).toBe('on_track');
  });

  it('is catching up when slightly behind', () => {
    expect(status(0.42, [makeTask({ completed: true })])).toBe('catching_up');
  });

  it('is behind when well short of expectation', () => {
    expect(status(0.2, [makeTask({ completed: true })])).toBe('behind');
  });
});

describe('overdue tasks', () => {
  it('keeps a student on track with only a couple of overdue tasks', () => {
    const tasks = [makeTask({ date: '2026-07-01' }), makeTask({ date: '2026-07-02' })];
    expect(status(0.5, tasks)).toBe('on_track');
  });

  it('moves to catching up once overdue work builds up', () => {
    const tasks = Array.from({ length: 4 }, (_, i) => makeTask({ date: `2026-07-0${i + 1}` }));
    expect(status(0.5, tasks)).toBe('catching_up');
  });

  it('is behind when a lot of work is overdue', () => {
    const tasks = Array.from({ length: 9 }, (_, i) => makeTask({ date: '2026-07-01' }));
    expect(status(0.5, tasks)).toBe('behind');
  });
});

describe('recent completion rate', () => {
  it('treats a moderate gap with poor recent completion as behind', () => {
    const tasks = [
      makeTask({ date: '2026-07-10', completed: false }),
      makeTask({ date: '2026-07-11', completed: false }),
      makeTask({ date: '2026-07-09', completed: true }),
    ];
    expect(status(0.38, tasks)).toBe('behind');
  });
});

describe('reported figures', () => {
  it('exposes the gap and the overdue count', () => {
    const result = calculateOnTrackStatus({
      year: testYear,
      today: MIDPOINT,
      actualProgress: 0.3,
      tasks: [makeTask({ date: '2026-07-01' })],
    });
    expect(result.expectedProgress).toBeCloseTo(0.5, 1);
    expect(result.actualProgress).toBe(0.3);
    expect(result.gap).toBeCloseTo(result.expectedProgress - 0.3);
    expect(result.overdueCount).toBe(1);
  });
});

describe('needsCatchUp', () => {
  it('is true only when the student is behind or catching up', () => {
    expect(needsCatchUp('on_track')).toBe(false);
    expect(needsCatchUp('just_started')).toBe(false);
    expect(needsCatchUp('catching_up')).toBe(true);
    expect(needsCatchUp('behind')).toBe(true);
  });
});
