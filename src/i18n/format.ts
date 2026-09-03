/**
 * Localized formatting for dates, durations and percentages.
 *
 * Weekday and month names come from the bundled dictionaries rather than
 * Intl, because Hermes' ICU data for Sinhala and Tamil varies by platform.
 */
import type { LocalDate } from '@/types/content';
import { addDays, dateParts, isoWeekday, todayLocal } from '@/utils/date';
import type { TranslateFn, TranslationKey } from './index';

export function formatPercent(t: TranslateFn, fraction: number): string {
  const value = Math.round(fraction * 100);
  return t('common.percent', { value });
}

export function percentValue(fraction: number): number {
  return Math.round(fraction * 100);
}

/** "45 min", "1h", "6h 30m" — always with localized unit words. */
export function formatMinutes(t: TranslateFn, minutes: number): string {
  const safe = Math.max(0, Math.round(minutes));
  if (safe === 0) return t('common.noTime');
  const hours = Math.floor(safe / 60);
  const rest = safe % 60;
  if (hours === 0) return t('common.minutesShort', { count: rest });
  if (rest === 0) return t('common.hoursShort', { count: hours });
  return t('common.hoursMinutesShort', { hours, minutes: rest });
}

export function formatSeconds(t: TranslateFn, seconds: number): string {
  return formatMinutes(t, Math.round(Math.max(0, seconds) / 60));
}

/** mm:ss (or h:mm:ss past an hour) for the running timer. */
export function formatClock(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = h > 0 ? String(m).padStart(2, '0') : String(m);
  const ss = String(s).padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export function weekdayShort(t: TranslateFn, date: LocalDate): string {
  return t(`weekday.short.${isoWeekday(date)}` as TranslationKey);
}

/**
 * A one- or two-character weekday initial for the compact week strip.
 *
 * These are authored per language rather than truncated from the short form:
 * a Sinhala or Tamil initial is a grapheme cluster, and cutting the short name
 * by code units would split a consonant from its vowel sign.
 */
export function weekdayNarrow(t: TranslateFn, date: LocalDate): string {
  return t(`weekday.narrow.${isoWeekday(date)}` as TranslationKey);
}

export function weekdayLong(t: TranslateFn, date: LocalDate): string {
  return t(`weekday.long.${isoWeekday(date)}` as TranslationKey);
}

export function monthShort(t: TranslateFn, month: number): string {
  return t(`month.short.${month}` as TranslationKey);
}

export function monthLong(t: TranslateFn, month: number): string {
  return t(`month.long.${month}` as TranslationKey);
}

/** "12 Aug" — day and short month, no year. */
export function formatDayMonth(t: TranslateFn, date: LocalDate): string {
  const { day, month } = dateParts(date);
  return `${day} ${monthShort(t, month)}`;
}

/** "12 August 2027" — used where a date must be unambiguous. */
export function formatFullDate(t: TranslateFn, date: LocalDate): string {
  const { day, month, year } = dateParts(date);
  return `${day} ${monthLong(t, month)} ${year}`;
}

/**
 * "Today", "Tomorrow", "Yesterday", otherwise a weekday plus date.
 * Relative words only apply within a day of today, so a label never lies.
 */
export function formatRelativeDay(t: TranslateFn, date: LocalDate, today: LocalDate = todayLocal()): string {
  if (date === today) return t('common.today');
  if (date === addDays(today, 1)) return t('common.tomorrow');
  if (date === addDays(today, -1)) return t('common.yesterday');
  const { day, month } = dateParts(date);
  const dayMonth = `${day} ${monthShort(t, month)}`;
  return `${weekdayShort(t, date)} ${dayMonth}`;
}

export function formatDateRange(t: TranslateFn, start: LocalDate, end: LocalDate): string {
  return t('settings.exam.range', { start: formatFullDate(t, start), end: formatFullDate(t, end) });
}
