import {
  addDays,
  compareLocalDates,
  daysBetween,
  endOfWeek,
  fractionElapsed,
  isoWeekday,
  isValidLocalDate,
  localDateOf,
  monthsBetween,
  startOfWeek,
  toLocalDate,
  weekDates,
} from '../date';

describe('local date formatting', () => {
  it('uses local calendar components, not UTC', () => {
    // Late evening local time falls on the next UTC day for +05:30 (Sri Lanka).
    const lateEvening = new Date(2027, 0, 31, 23, 30, 0);
    expect(toLocalDate(lateEvening)).toBe('2027-01-31');
  });

  it('formats single-digit months and days with a leading zero', () => {
    expect(toLocalDate(new Date(2027, 8, 5, 12))).toBe('2027-09-05');
  });

  it('reads the local day of an ISO timestamp', () => {
    const iso = new Date(2027, 5, 10, 8, 0, 0).toISOString();
    expect(localDateOf(iso)).toBe('2027-06-10');
  });
});

describe('validation', () => {
  it.each(['2026-08-10', '2028-02-29', '2027-12-31'])('accepts %s', (value) => {
    expect(isValidLocalDate(value)).toBe(true);
  });

  it.each(['2027-02-30', '2027-13-01', '2027-00-10', '27-01-01', '', 'today', null, 42])(
    'rejects %p',
    (value) => {
      expect(isValidLocalDate(value)).toBe(false);
    },
  );
});

describe('day arithmetic', () => {
  it('adds and subtracts across a month boundary', () => {
    expect(addDays('2027-01-31', 1)).toBe('2027-02-01');
    expect(addDays('2027-03-01', -1)).toBe('2027-02-28');
  });

  it('adds across a year boundary', () => {
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(addDays('2027-01-01', -1)).toBe('2026-12-31');
  });

  it('handles a leap day', () => {
    expect(addDays('2028-02-28', 1)).toBe('2028-02-29');
    expect(addDays('2028-02-29', 1)).toBe('2028-03-01');
  });

  it('counts days between dates in both directions', () => {
    expect(daysBetween('2027-08-01', '2027-08-03')).toBe(2);
    expect(daysBetween('2027-08-03', '2027-08-01')).toBe(-2);
    expect(daysBetween('2027-08-03', '2027-08-03')).toBe(0);
  });

  it('counts days across a year boundary', () => {
    expect(daysBetween('2026-12-30', '2027-01-02')).toBe(3);
  });

  it('counts whole months only', () => {
    expect(monthsBetween('2025-08-01', '2026-03-01')).toBe(7);
    expect(monthsBetween('2025-08-15', '2026-03-14')).toBe(6);
    expect(monthsBetween('2027-01-01', '2026-01-01')).toBe(0);
  });

  it('orders dates chronologically', () => {
    expect(compareLocalDates('2027-01-01', '2027-01-02')).toBe(-1);
    expect(compareLocalDates('2027-02-01', '2027-01-02')).toBe(1);
    expect(compareLocalDates('2027-01-01', '2027-01-01')).toBe(0);
  });
});

describe('weeks', () => {
  it('starts the week on Monday', () => {
    // 2027-08-04 is a Wednesday.
    expect(isoWeekday('2027-08-04')).toBe(3);
    expect(startOfWeek('2027-08-04')).toBe('2027-08-02');
    expect(endOfWeek('2027-08-04')).toBe('2027-08-08');
  });

  it('treats Sunday as the last day of its week', () => {
    expect(isoWeekday('2027-08-08')).toBe(7);
    expect(startOfWeek('2027-08-08')).toBe('2027-08-02');
  });

  it('treats Monday as the first day of its own week', () => {
    expect(startOfWeek('2027-08-02')).toBe('2027-08-02');
  });

  it('spans a month boundary', () => {
    expect(startOfWeek('2027-09-01')).toBe('2027-08-30');
  });

  it('lists seven consecutive dates', () => {
    expect(weekDates('2027-08-02')).toEqual([
      '2027-08-02',
      '2027-08-03',
      '2027-08-04',
      '2027-08-05',
      '2027-08-06',
      '2027-08-07',
      '2027-08-08',
    ]);
  });
});

describe('fractionElapsed', () => {
  it('is 0 at the start and 1 at the end', () => {
    expect(fractionElapsed('2027-01-01', '2027-01-11', '2027-01-01')).toBe(0);
    expect(fractionElapsed('2027-01-01', '2027-01-11', '2027-01-11')).toBe(1);
  });

  it('is half way at the midpoint', () => {
    expect(fractionElapsed('2027-01-01', '2027-01-11', '2027-01-06')).toBeCloseTo(0.5);
  });

  it('clamps outside the range', () => {
    expect(fractionElapsed('2027-01-01', '2027-01-11', '2026-12-01')).toBe(0);
    expect(fractionElapsed('2027-01-01', '2027-01-11', '2027-06-01')).toBe(1);
  });

  it('handles an empty range', () => {
    expect(fractionElapsed('2027-01-01', '2027-01-01', '2027-01-01')).toBe(1);
    expect(fractionElapsed('2027-01-01', '2027-01-01', '2026-12-31')).toBe(0);
  });
});
