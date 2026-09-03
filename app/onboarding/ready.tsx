/**
 * Step 5 — confirmation. Saving the profile is what ends onboarding.
 *
 * This is the handover into the app, so it shows the student their own three
 * subjects in the colours they will carry from here on. Those tints have to be
 * passed in explicitly: the profile does not exist yet, so the usual
 * per-subject tint lookup has nothing to read.
 */
import { View } from 'react-native';
import { Redirect } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { ListRow, SubjectMark, Text } from '@/components';
import { findAcademicYear } from '@/data/academic-years';
import { getStream, getSubject } from '@/data/curriculum';
import { useLocalize } from '@/hooks/useContent';
import { useOnboarding } from '@/screens/onboarding/OnboardingContext';
import { OnboardingStep } from '@/screens/onboarding/OnboardingStep';
import { completeOnboarding } from '@/store/appStore';
import { useT, useTheme } from '@/theme/ThemeProvider';


export default function ReadyStep() {
  const theme = useTheme();
  const t = useT();
  const localize = useLocalize();
  const { draft } = useOnboarding();

  if (!draft.academicYearId || !draft.streamId || draft.subjectIds.length !== 3) {
    return <Redirect href="/onboarding/subjects" />;
  }

  const year = findAcademicYear(draft.academicYearId);
  const stream = getStream(draft.streamId);

  return (
    <OnboardingStep
      step={5}
      title={t('onboarding.ready.title')}
      subtitle={t('onboarding.ready.subtitle')}
      actionLabel={t('onboarding.ready.start')}
      onAction={() =>
        completeOnboarding({
          academicYearId: draft.academicYearId as string,
          streamId: stream.id,
          subjectIds: draft.subjectIds,
        })
      }
    >
      {year ? (
        <ListRow
          title={t('onboarding.year.option', { year: year.examYear })}
          subtitle={localize(stream.name)}
          leading={
            <Feather
              name="flag"
              size={theme.sizes.iconSm}
              color={theme.colors.steel}
              style={{ marginRight: theme.spacing.sm }}
            />
          }
          last
        />
      ) : null}

      <View style={{ marginTop: theme.spacing.xl, gap: theme.spacing.sm }}>
        {draft.subjectIds.map((id, index) => (
          <View
            key={id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: theme.spacing.sm,
              padding: theme.spacing.sm,
              borderRadius: theme.radius.xl,
              borderWidth: 1,
              borderColor: theme.colors.hairlineSoft,
              backgroundColor: theme.colors.surfaceRaised,
            }}
          >
            <SubjectMark
              subjectId={id}
              size="md"
              palette={theme.subjects[index % theme.subjects.length]}
            />
            <Text variant="bodyMedium" style={{ flex: 1 }} numberOfLines={2}>
              {localize(getSubject(id).name)}
            </Text>
          </View>
        ))}
      </View>
    </OnboardingStep>
  );
}
