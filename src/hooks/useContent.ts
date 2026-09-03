/**
 * Hooks that turn ids into localized content, and the student's profile into
 * the curriculum they actually study.
 */
import { useCallback, useMemo } from 'react';
import { findAcademicYear } from '@/data/academic-years';
import { getStream, getSubject, getSyllabus } from '@/data/curriculum';
import { localize } from '@/i18n';
import { useLanguage } from '@/theme/ThemeProvider';
import { SUBJECT_TINT_ORDER, type TintKey } from '@/theme/tokens';
import { useProfile } from '@/store/useStore';
import type { AcademicYear, LocalizedText, Stream, SubjectId, SubjectSyllabus } from '@/types/content';

/** Resolves a bundled LocalizedText in the current language. */
export function useLocalize(): (text: LocalizedText) => string {
  const language = useLanguage();
  return useCallback((text: LocalizedText) => localize(text, language), [language]);
}

export function useSubjectName(): (subjectId: SubjectId, short?: boolean) => string {
  const localizeText = useLocalize();
  return useCallback(
    (subjectId: SubjectId, short = false) => {
      const subject = getSubject(subjectId);
      return localizeText(short ? subject.shortName : subject.name);
    },
    [localizeText],
  );
}

/** The subject's short identity mark in the current language. */
export function useSubjectMark(): (subjectId: SubjectId) => string {
  const localizeText = useLocalize();
  return useCallback(
    (subjectId: SubjectId) => localizeText(getSubject(subjectId).mark),
    [localizeText],
  );
}

/** The subjects the student selected, in their chosen order. */
export function useSelectedSubjectIds(): SubjectId[] {
  const profile = useProfile();
  return useMemo(() => (profile ? [...profile.subjectIds] : []), [profile]);
}

export function useSelectedSyllabi(): SubjectSyllabus[] {
  const subjectIds = useSelectedSubjectIds();
  return useMemo(() => subjectIds.map(getSyllabus), [subjectIds]);
}

export function useAcademicYear(): AcademicYear | undefined {
  const profile = useProfile();
  return useMemo(() => (profile ? findAcademicYear(profile.academicYearId) : undefined), [profile]);
}

export function useStream(): Stream | undefined {
  const profile = useProfile();
  return useMemo(() => (profile ? getStream(profile.streamId) : undefined), [profile]);
}

/**
 * A stable tint per subject so a subject keeps the same colour everywhere.
 * Assigned by position in the student's own list, which keeps the palette to
 * the two or three tints the design system asks for on one screen.
 */
export function useSubjectTint(): (subjectId: SubjectId) => TintKey {
  const subjectIds = useSelectedSubjectIds();
  return useCallback(
    (subjectId: SubjectId) => {
      const index = subjectIds.indexOf(subjectId);
      const position = index >= 0 ? index : 0;
      return SUBJECT_TINT_ORDER[position % SUBJECT_TINT_ORDER.length] ?? 'violet';
    },
    [subjectIds],
  );
}
