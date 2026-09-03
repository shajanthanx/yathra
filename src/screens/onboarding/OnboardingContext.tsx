/**
 * Draft profile shared across the onboarding steps. It lives in memory only:
 * nothing is written to storage until the student reaches the final step.
 */
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { StreamId, SubjectId } from '@/types/content';

export interface OnboardingDraft {
  academicYearId: string | null;
  streamId: StreamId | null;
  subjectIds: SubjectId[];
}

interface OnboardingContextValue {
  draft: OnboardingDraft;
  setAcademicYear: (id: string) => void;
  setStream: (id: StreamId, coreSubjects: SubjectId[]) => void;
  setSubjects: (ids: SubjectId[]) => void;
  reset: () => void;
}

const emptyDraft: OnboardingDraft = { academicYearId: null, streamId: null, subjectIds: [] };

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<OnboardingDraft>(emptyDraft);

  const setAcademicYear = useCallback((academicYearId: string) => {
    setDraft((current) => ({ ...current, academicYearId }));
  }, []);

  // Changing stream clears any subjects picked for the previous one, which
  // would otherwise be invalid for the new stream.
  const setStream = useCallback((streamId: StreamId, core: SubjectId[]) => {
    setDraft((current) =>
      current.streamId === streamId
        ? { ...current, streamId }
        : { ...current, streamId, subjectIds: [...core] },
    );
  }, []);

  const setSubjects = useCallback((subjectIds: SubjectId[]) => {
    setDraft((current) => ({ ...current, subjectIds }));
  }, []);

  const reset = useCallback(() => setDraft(emptyDraft), []);

  const value = useMemo<OnboardingContextValue>(
    () => ({ draft, setAcademicYear, setStream, setSubjects, reset }),
    [draft, setAcademicYear, setStream, setSubjects, reset],
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding(): OnboardingContextValue {
  const context = useContext(OnboardingContext);
  if (!context) throw new Error('OnboardingProvider is missing above this component');
  return context;
}
