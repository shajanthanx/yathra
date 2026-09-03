/**
 * Step 4 — the three subjects. Core subjects for the stream are shown as
 * already chosen and locked; anything that could not lead to a valid
 * combination is greyed out rather than rejected after the fact.
 */
import { View } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { Chip, ChipGroup, SectionHeader, Text } from '@/components';
import { getStream, getSubject } from '@/data/curriculum';
import {
  canAddSubject,
  coreSubjects,
  isSelectionComplete,
  optionalSubjects,
  remainingChoices,
  toggleSubject,
  validateSelection,
} from '@/domain/combinations';
import { useLocalize } from '@/hooks/useContent';
import { OnboardingStep } from '@/screens/onboarding/OnboardingStep';
import { useOnboarding } from '@/screens/onboarding/OnboardingContext';
import { useT, useTheme } from '@/theme/ThemeProvider';

export default function SubjectsStep() {
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const localize = useLocalize();
  const { draft, setSubjects } = useOnboarding();

  if (!draft.streamId) return <Redirect href="/onboarding/stream" />;

  const stream = getStream(draft.streamId);
  const core = coreSubjects(stream);
  const optional = optionalSubjects(stream);
  const selected = draft.subjectIds;
  const complete = isSelectionComplete(stream, selected);
  const remaining = remainingChoices(stream, selected);
  const error = selected.length === 3 ? validateSelection(stream, selected) : null;

  const hint = error === 'not_enough_core'
    ? t('onboarding.subjects.needTwoCore')
    : remaining > 0
      ? remaining === 1
        ? t('onboarding.subjects.chooseOne')
        : t('onboarding.subjects.chooseCount', { count: remaining })
      : t('onboarding.subjects.selectedCount', { count: selected.length });

  return (
    <OnboardingStep
      step={4}
      title={t('onboarding.subjects.title')}
      subtitle={t('onboarding.subjects.subtitle')}
      actionLabel={t('common.continue')}
      onAction={() => router.push('/onboarding/ready')}
      actionDisabled={!complete}
      hint={hint}
    >
      {core.length > 0 ? (
        <View style={{ marginBottom: theme.spacing.xl }}>
          <SectionHeader title={t('onboarding.subjects.included')} />
          <ChipGroup>
            {core.map((id) => (
              <Chip key={id} label={localize(getSubject(id).name)} locked />
            ))}
          </ChipGroup>
        </View>
      ) : null}

      <ChipGroup>
        {optional.map((id) => {
          const isSelected = selected.includes(id);
          const canAdd = isSelected || canAddSubject(stream, selected, id);
          return (
            <Chip
              key={id}
              label={localize(getSubject(id).name)}
              selected={isSelected}
              disabled={!canAdd}
              onPress={() => setSubjects(toggleSubject(stream, selected, id))}
            />
          );
        })}
      </ChipGroup>

      {error === 'not_enough_core' ? (
        <Text variant="caption" tone="danger" style={{ marginTop: theme.spacing.md }}>
          {t('onboarding.subjects.needTwoCore')}
        </Text>
      ) : null}
    </OnboardingStep>
  );
}
