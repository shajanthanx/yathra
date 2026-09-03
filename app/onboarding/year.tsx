/** Step 2 — which year the student sits the examination. */
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { OptionCard } from '@/components';
import { journeyStartYear, selectableAcademicYears } from '@/data/academic-years';
import { useToday } from '@/hooks/useToday';
import { useOnboarding } from '@/screens/onboarding/OnboardingContext';
import { OnboardingStep } from '@/screens/onboarding/OnboardingStep';
import { useT, useTheme } from '@/theme/ThemeProvider';

export default function YearStep() {
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const today = useToday();
  const { draft, setAcademicYear } = useOnboarding();
  const years = selectableAcademicYears(today);

  return (
    <OnboardingStep
      step={2}
      title={t('onboarding.year.title')}
      subtitle={t('onboarding.year.subtitle')}
      actionLabel={t('common.continue')}
      onAction={() => router.push('/onboarding/stream')}
      actionDisabled={draft.academicYearId === null}
    >
      <View style={{ gap: theme.spacing.sm }}>
        {years.map((year) => (
          <OptionCard
            key={year.id}
            title={t('onboarding.year.option', { year: year.examYear })}
            subtitle={t('onboarding.year.startedIn', { year: journeyStartYear(year) })}
            selected={draft.academicYearId === year.id}
            onPress={() => setAcademicYear(year.id)}
          />
        ))}
      </View>
    </OnboardingStep>
  );
}
