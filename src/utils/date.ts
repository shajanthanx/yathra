/**
 * All date arithmetic in the app goes through this module.
 *
 * Dates that matter to a student (task dates, exam dates, week boundaries) are
 * plain local calendar dates formatted YYYY-MM-DD. They are never derived from
 * `toISOString()` (UTC), which would shift the day near midnight.
 */
import type { ISODateTime, LocalDate } from '@/types/content';

const LOCAL_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const MS_PER_DAY = 86_400_000;

/** Monday = 1 … Sunday = 7 (ISO weekday numbering). */
export type IsoWeekday = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const WEEK_STARTS_ON: IsoWeekday = 1;

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

/** Formats a Date using its local calendar components. */
export function toLocalDate(date: Date): LocalDate {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

export function isValidLocalDate(value: unknown): value is LocalDate {
  if (typeof value !== 'string') return false;
  const match = LOCAL_DATE_PATTERN.exec(value);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;
  const probe = new Date(year, month - 1, day, 12);
  return probe.getFullYear() === year && probe.getMonth() === month - 1 && probe.getDate() === day;
}

/**
 * Parses a LocalDate into a Date at local noon. Noon keeps day arithmetic
 * stable across daylight-saving changes on devices that observe them.
 * Throws on malformed input; callers validate first with isValidLocalDate.
 */
export function parseLocalDate(value: LocalDate): Date {
  const match = LOCAL_DATE_PATTERN.exec(value);
  if (!match) throw new Error(`Invalid local date: ${value}`);
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12);
}

export function todayLocal(now: Date = new Date()): LocalDate {
  return toLocalDate(now);
}

export function nowISO(now: Date = new Date()): ISODateTime {
  return now.toISOString();
}

/** Local calendar date of an ISO timestamp. */
export function localDateOf(iso: ISODateTime): LocalDate {
  return toLocalDate(new Date(iso));
}

export function addDays(date: LocalDate, days: number): LocalDate {
  const d = parseLocalDate(date);
  d.setDate(d.getDate() + days);
  return toLocalDate(d);
}

function utcDayNumber(date: LocalDate): number {
  const d = parseLocalDate(date);
  return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / MS_PER_DAY);
}

/** Whole days from `from` to `to`; negative when `to` is earlier. */
export function daysBetween(from: LocalDate, to: LocalDate): number {
  return utcDayNumber(to) - utcDayNumber(from);
}

/** Whole calendar months elapsed from `from` to `to`, never negative. */
export function monthsBetween(from: LocalDate, to: LocalDate): number {
  const a = parseLocalDate(from);
  const b = parseLocalDate(to);
  let months = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
  if (b.getDate() < a.getDate()) months -= 1;
  return Math.max(0, months);
}

/** Lexicographic comparison is chronological for YYYY-MM-DD. */
export function compareLocalDates(a: LocalDate, b: LocalDate): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

export function isBefore(a: LocalDate, b: LocalDate): boolean {
  return a < b;
}

export function isAfter(a: LocalDate, b: LocalDate): boolean {
  return a > b;
}

export function isBetweenInclusive(date: LocalDate, start: LocalDate, end: LocalDate): boolean {
  return date >= start && date <= end;
}

/** ISO weekday of a local date: Monday = 1 … Sunday = 7. */
export function isoWeekday(date: LocalDate): IsoWeekday {
  const day = parseLocalDate(date).getDay(); // 0 = Sunday
  return (day === 0 ? 7 : day) as IsoWeekday;
}

/** First day (Monday) of the week containing `date`. */
export function startOfWeek(date: LocalDate, weekStartsOn: IsoWeekday = WEEK_STARTS_ON): LocalDate {
  const weekday = isoWeekday(date);
  const offset = (weekday - weekStartsOn + 7) % 7;
  return addDays(date, -offset);
}

export function endOfWeek(date: LocalDate, weekStartsOn: IsoWeekday = WEEK_STARTS_ON): LocalDate {
  return addDays(startOfWeek(date, weekStartsOn), 6);
}

/** The seven dates of the week starting at `weekStart`. */
export function weekDates(weekStart: LocalDate): LocalDate[] {
  return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
}

export function isSameWeek(a: LocalDate, b: LocalDate): boolean {
  return startOfWeek(a) === startOfWeek(b);
}

export function startOfMonth(date: LocalDate): LocalDate {
  return `${date.slice(0, 7)}-01`;
}

/** Splits a local date into numeric parts. */
export function dateParts(date: LocalDate): { year: number; month: number; day: number } {
  const d = parseLocalDate(date);
  return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
}

/** Clamps a fraction into [0, 1]. */
export function clamp01(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

/**
 * Position of `today` between `start` and `end` as a fraction in [0, 1].
 * Returns 0 when the range is empty or inverted.
 */
export function fractionElapsed(start: LocalDate, end: LocalDate, today: LocalDate): number {
  const total = daysBetween(start, end);
  if (total <= 0) return today >= end ? 1 : 0;
  return clamp01(daysBetween(start, today) / total);
}
