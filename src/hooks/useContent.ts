/**
 * Hooks that turn ids into localized content, and the student's profile into
 * the curriculum they actually study.
 */
import { useCallback, useMemo } from 'react';
import { findAcademicYear } from '@/data/academic-years';
import { getStream, getSubject, getSyllabus } from '@/data/curriculum';
import { localize } from '@/i18n';
import { useLanguage, useTheme } from '@/theme/ThemeProvider';
import type { SubjectPalette } from '@/theme/tokens';
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
 * A stable colour per subject, so a subject looks the same everywhere.
 *
 * Assigned by position in the student's own subject list rather than by
 * subject id: two students taking different subjects both get the first three
 * colours, and a subject never changes colour while it stays in the list.
 */
export function useSubjectPalette(): (subjectId: SubjectId) => SubjectPalette {
  const theme = useTheme();
  const subjectIds = useSelectedSubjectIds();

  return useCallback(
    (subjectId: SubjectId) => {
      const index = subjectIds.indexOf(subjectId);
      const position = index >= 0 ? index : 0;
      const palette = theme.subjects[position % theme.subjects.length];
      // The palette is never empty, but the index signature cannot know that.
      return palette ?? theme.subjects[0]!;
    },
    [subjectIds, theme.subjects],
  );
}
