import { getExamCountdown, getExpectedProgress, getJourneyPosition, syllabusTargetDate } from '../journey';
import { testYear } from './fixtures';

describe('exam countdown', () => {
  it('counts the days before the exam', () => {
    const countdown = getExamCountdown(testYear, '2027-08-01');
    expect(countdown.phase).toBe('before');
    expect(countdown.daysLeft).toBe(2);
  });

  it('switches to the exam period on the first day', () => {
    const countdown = getExamCountdown(testYear, '2027-08-03');
    expect(countdown.phase).toBe('during');
    expect(countdown.daysLeft).toBe(0);
  });

  it('stays in the exam period on the last day', () => {
    expect(getExamCountdown(testYear, '2027-08-28').phase).toBe('during');
  });

  it('is over the day after the exam ends', () => {
    expect(getExamCountdown(testYear, '2027-08-29').phase).toBe('after');
  });

  it('never reports negative days left', () => {
    expect(getExamCountdown(testYear, '2028-01-01').daysLeft).toBe(0);
  });

  it('marks an estimated date as estimated', () => {
    const estimated = { ...testYear, examDateStatus: 'estimated' as const };
    expect(getExamCountdown(estimated, '2027-01-01').isEstimated).toBe(true);
  });

  it("uses the student's own date when they set one", () => {
    const countdown = getExamCountdown(testYear, '2027-08-01', '2027-09-01');
    expect(countdown.examStart).toBe('2027-09-01');
    expect(countdown.daysLeft).toBe(31);
    // A date the student set themselves is never labelled an estimate.
    expect(countdown.isEstimated).toBe(false);
  });

  it('keeps the published length of the exam period when the start moves', () => {
    const countdown = getExamCountdown(testYear, '2027-01-01', '2027-09-01');
    expect(countdown.examEnd).toBe('2027-09-26');
  });
});

describe('journey position', () => {
  it('reports nothing elapsed before classes start', () => {
    const journey = getJourneyPosition(testYear, '2025-01-01');
    expect(journey.notStarted).toBe(true);
    expect(journey.monthsElapsed).toBe(0);
    expect(journey.fraction).toBe(0);
  });

  it('counts whole months into the journey', () => {
    const journey = getJourneyPosition(testYear, '2026-03-01');
    expect(journey.notStarted).toBe(false);
    expect(journey.monthsElapsed).toBe(7);
  });

  it('is complete at the exam', () => {
    expect(getJourneyPosition(testYear, '2027-08-03').fraction).toBe(1);
  });
});

describe('expected progress', () => {
  it('is zero on the first day', () => {
    expect(getExpectedProgress(testYear, '2025-08-01')).toBe(0);
  });

  it('reaches one by the syllabus target date', () => {
    expect(getExpectedProgress(testYear, testYear.syllabusTargetDate)).toBe(1);
  });

  it('stays at one after the target date', () => {
    expect(getExpectedProgress(testYear, '2027-07-15')).toBe(1);
  });

  it('is roughly half way at the midpoint', () => {
    // 2025-08-01 to 2027-06-22 is 690 days; day 345 is 2026-07-12.
    expect(getExpectedProgress(testYear, '2026-07-12')).toBeCloseTo(0.5, 2);
  });

  it('shifts the target when the student moves the exam date', () => {
    // The 42-day revision gap is preserved relative to the new exam start.
    expect(syllabusTargetDate(testYear, '2027-09-01')).toBe('2027-07-21');
  });
});
