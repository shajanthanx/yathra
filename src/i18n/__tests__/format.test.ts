/**
 * Formatters that the week strip and the plan depend on. The narrow weekday
 * names and the relative-day words are the two places where a naive
 * implementation would either lie about a date or break an Indic glyph.
 */
import { formatRelativeDay, weekdayNarrow, weekdayShort } from '../format';
import { createTranslator } from '../index';

const en = createTranslator('en');
const si = createTranslator('si');
const ta = createTranslator('ta');

// 2027-08-02 is a Monday.
const MONDAY = '2027-08-02';
const SUNDAY = '2027-08-08';
const WEEK = [
  '2027-08-02',
  '2027-08-03',
  '2027-08-04',
  '2027-08-05',
  '2027-08-06',
  '2027-08-07',
  '2027-08-08',
];

describe('weekdayNarrow', () => {
  it('gives an initial for every day of the week', () => {
    expect(WEEK.map((date) => weekdayNarrow(en, date))).toEqual([
      'M',
      'T',
      'W',
      'T',
      'F',
      'S',
      'S',
    ]);
  });

  it('is authored per language rather than truncated from the short name', () => {
    for (const t of [si, ta]) {
      // A truncation would be a code-unit prefix of the short form, which is
      // exactly what splits a consonant from its dependent vowel sign.
      expect(weekdayNarrow(t, MONDAY)).not.toBe(weekdayShort(t, MONDAY));
    }
  });

  it('never returns an empty string in any language', () => {
    for (const t of [en, si, ta]) {
      for (const date of WEEK) {
        expect(weekdayNarrow(t, date).trim()).not.toBe('');
      }
    }
  });

  it('distinguishes every day within a language', () => {
    for (const t of [si, ta]) {
      const narrow = WEEK.map((date) => weekdayNarrow(t, date));
      expect(new Set(narrow).size).toBe(7);
    }
  });
});

describe('formatRelativeDay', () => {
  it('names today, tomorrow and yesterday', () => {
    expect(formatRelativeDay(en, '2027-08-04', '2027-08-04')).toBe('Today');
    expect(formatRelativeDay(en, '2027-08-05', '2027-08-04')).toBe('Tomorrow');
    expect(formatRelativeDay(en, '2027-08-03', '2027-08-04')).toBe('Yesterday');
  });

  it('uses a weekday and date beyond that window, so a label never lies', () => {
    expect(formatRelativeDay(en, '2027-08-06', '2027-08-04')).toBe('Fri 6 Aug');
    expect(formatRelativeDay(en, MONDAY, '2027-08-04')).toBe('Mon 2 Aug');
    expect(formatRelativeDay(en, SUNDAY, '2027-08-04')).toBe('Sun 8 Aug');
  });

  it('crosses a month boundary correctly', () => {
    expect(formatRelativeDay(en, '2027-09-01', '2027-08-31')).toBe('Tomorrow');
    expect(formatRelativeDay(en, '2027-08-31', '2027-09-01')).toBe('Yesterday');
  });

  it('crosses a year boundary correctly', () => {
    expect(formatRelativeDay(en, '2028-01-01', '2027-12-31')).toBe('Tomorrow');
    expect(formatRelativeDay(en, '2027-12-31', '2028-01-01')).toBe('Yesterday');
  });

  it('translates the relative words', () => {
    expect(formatRelativeDay(si, '2027-08-05', '2027-08-04')).toBe(si('common.tomorrow'));
    expect(formatRelativeDay(ta, '2027-08-03', '2027-08-04')).toBe(ta('common.yesterday'));
  });
});
