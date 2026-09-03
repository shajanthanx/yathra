/** Step 3 — stream. */
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { OptionCard } from '@/components';
import { STREAMS } from '@/data/curriculum';
import { coreSubjects } from '@/domain/combinations';
import { useLocalize } from '@/hooks/useContent';
import { useOnboarding } from '@/screens/onboarding/OnboardingContext';
import { OnboardingStep } from '@/screens/onboarding/OnboardingStep';
import { useT, useTheme } from '@/theme/ThemeProvider';

export default function StreamStep() {
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const localize = useLocalize();
  const { draft, setStream } = useOnboarding();

  return (
    <OnboardingStep
      step={3}
      title={t('onboarding.stream.title')}
      subtitle={t('onboarding.stream.subtitle')}
      actionLabel={t('common.continue')}
      onAction={() => router.push('/onboarding/subjects')}
      actionDisabled={draft.streamId === null}
    >
      <View style={{ gap: theme.spacing.sm }}>
        {STREAMS.map((stream) => (
          <OptionCard
            key={stream.id}
            title={localize(stream.name)}
            selected={draft.streamId === stream.id}
            onPress={() => setStream(stream.id, coreSubjects(stream))}
          />
        ))}
      </View>
    </OnboardingStep>
  );
}
