import { createTranslator, getDictionary, interpolate, localize, plural } from '../index';
import { en } from '../en';
import { si } from '../si';
import { ta } from '../ta';
import { LANGUAGES } from '../languages';
import { formatClock, formatMinutes, formatPercent, percentValue } from '../format';

const PLACEHOLDER = /\{(\w+)\}/g;

function placeholdersOf(value: string): string[] {
  return [...value.matchAll(PLACEHOLDER)].map((match) => match[1] as string).sort();
}

const englishKeys = Object.keys(en) as (keyof typeof en)[];

describe('dictionary completeness', () => {
  it.each([
    ['Sinhala', si],
    ['Tamil', ta],
  ])('%s has every English key', (_name, dictionary) => {
    const missing = englishKeys.filter((key) => !(key in dictionary));
    expect(missing).toEqual([]);
  });

  it.each([
    ['Sinhala', si],
    ['Tamil', ta],
  ])('%s has no empty strings', (_name, dictionary) => {
    const empty = englishKeys.filter((key) => dictionary[key].trim().length === 0);
    expect(empty).toEqual([]);
  });

  it.each([
    ['Sinhala', si],
    ['Tamil', ta],
  ])('%s never introduces a placeholder English does not have', (_name, dictionary) => {
    // An unknown placeholder would be rendered literally, as "{count}".
    const offenders = englishKeys.filter((key) => {
      const allowed = new Set(placeholdersOf(en[key]));
      return placeholdersOf(dictionary[key]).some((name) => !allowed.has(name));
    });
    expect(offenders).toEqual([]);
  });

  it.each([
    ['Sinhala', si],
    ['Tamil', ta],
  ])('%s keeps every placeholder outside singular plural forms', (_name, dictionary) => {
    // A singular form may drop {count} — "one day left" reads better than
    // "1 day left" in Sinhala and Tamil — but nothing else may lose a value.
    const mismatched = englishKeys
      .filter((key) => !key.endsWith('.one'))
      .filter((key) => placeholdersOf(en[key]).join() !== placeholdersOf(dictionary[key]).join());
    expect(mismatched).toEqual([]);
  });

  it.each([
    ['Sinhala', si],
    ['Tamil', ta],
  ])('%s only ever omits the count from a singular form', (_name, dictionary) => {
    const offenders = englishKeys
      .filter((key) => key.endsWith('.one'))
      .filter((key) => {
        const missing = placeholdersOf(en[key]).filter(
          (name) => !placeholdersOf(dictionary[key]).includes(name),
        );
        return missing.some((name) => name !== 'count');
      });
    expect(offenders).toEqual([]);
  });

  it('has a matching .other for every .one key', () => {
    const oneKeys = englishKeys.filter((key) => key.endsWith('.one'));
    const missing = oneKeys.filter((key) => !(key.replace(/\.one$/, '.other') in en));
    expect(missing).toEqual([]);
    expect(oneKeys.length).toBeGreaterThan(0);
  });
});

describe('script coverage', () => {
  const sinhalaScript = /[඀-෿]/;
  const tamilScript = /[஀-௿]/;
  const latinLetters = /[A-Za-z]/;

  /**
   * Placeholders and product names are Latin by design, so they are removed
   * before deciding whether a value was actually translated.
   */
  function translatableText(value: string): string {
    return value
      .replace(PLACEHOLDER, '')
      .replace(/\b(?:Yathra|ICT|DNA|RNA|HTML|CSS|PHP|IoT|CPU|Z|A|B|C|S|F)\b/g, '');
  }

  it('writes Sinhala values in Sinhala script', () => {
    const suspicious = englishKeys.filter((key) => {
      const value = translatableText(si[key]);
      return latinLetters.test(value) && !sinhalaScript.test(value);
    });
    expect(suspicious).toEqual([]);
  });

  it('writes Tamil values in Tamil script', () => {
    const suspicious = englishKeys.filter((key) => {
      const value = translatableText(ta[key]);
      return latinLetters.test(value) && !tamilScript.test(value);
    });
    expect(suspicious).toEqual([]);
  });
});

describe('translator', () => {
  it('returns the language\'s own string', () => {
    expect(createTranslator('si')('tab.home')).toBe(si['tab.home']);
    expect(createTranslator('ta')('tab.home')).toBe(ta['tab.home']);
  });

  it('substitutes placeholders', () => {
    expect(createTranslator('en')('home.journeyTitle', { year: 2027 })).toBe('A/L 2027');
  });

  it('leaves an unknown placeholder untouched', () => {
    expect(interpolate('Hello {name}', {})).toBe('Hello {name}');
  });

  it('falls back to English for an unknown language', () => {
    expect(getDictionary('de' as 'en')).toBe(en);
  });
});

describe('plurals', () => {
  it('uses the singular form for one', () => {
    const t = createTranslator('en');
    expect(plural(t, 'plan.tasksCount', 1)).toBe('1 task');
  });

  it('uses the plural form otherwise', () => {
    const t = createTranslator('en');
    expect(plural(t, 'plan.tasksCount', 0)).toBe('0 tasks');
    expect(plural(t, 'plan.tasksCount', 5)).toBe('5 tasks');
  });

  it('works in every language', () => {
    for (const language of LANGUAGES) {
      const t = createTranslator(language.code);
      expect(plural(t, 'plan.tasksCount', 3)).toContain('3');
    }
  });
});

describe('localizing bundled content', () => {
  it('picks the requested language', () => {
    const text = { en: 'Physics', si: 'භෞතික විද්‍යාව', ta: 'பௌதிகவியல்' };
    expect(localize(text, 'si')).toBe('භෞතික විද්‍යාව');
    expect(localize(text, 'ta')).toBe('பௌதிகவியல்');
  });

  it('falls back to English when a translation is blank', () => {
    expect(localize({ en: 'Physics', si: '', ta: '' }, 'si')).toBe('Physics');
  });
});

describe('formatters', () => {
  const t = createTranslator('en');

  it('formats percentages', () => {
    expect(formatPercent(t, 0.643)).toBe('64%');
    expect(percentValue(0.5)).toBe(50);
  });

  it('formats durations', () => {
    expect(formatMinutes(t, 0)).toBe('0m');
    expect(formatMinutes(t, 45)).toBe('45 min');
    expect(formatMinutes(t, 60)).toBe('1h');
    expect(formatMinutes(t, 390)).toBe('6h 30m');
  });

  it('formats a clock', () => {
    expect(formatClock(0)).toBe('0:00');
    expect(formatClock(65)).toBe('1:05');
    expect(formatClock(2700)).toBe('45:00');
    expect(formatClock(3661)).toBe('1:01:01');
  });

  it('never shows a negative clock', () => {
    expect(formatClock(-10)).toBe('0:00');
  });
});
