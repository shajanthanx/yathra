/**
 * Edit the A/L profile. Changing a stream or a subject never deletes anything:
 * progress for a removed subject stays on the device and reappears if the
 * subject is added back, and the student is told so before they confirm.
 */
import { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import {
  BottomSheet,
  Button,
  Chip,
  ChipGroup,
  ConfirmDialog,
  DetailScreen,
  ListRow,
  SectionHeader,
  Text,
} from '@/components';
import { journeyStartYear, selectableAcademicYears } from '@/data/academic-years';
import { getStream, STREAMS } from '@/data/curriculum';
import {
  canAddSubject,
  coreSubjects,
  isSelectionComplete,
  optionalSubjects,
  toggleSubject,
  validateSelection,
} from '@/domain/combinations';
import { useAcademicYear, useLocalize, useSubjectName } from '@/hooks/useContent';
import { useToday } from '@/hooks/useToday';
import { updateProfile } from '@/store/appStore';
import { useProfile } from '@/store/useStore';
import { useT, useTheme } from '@/theme/ThemeProvider';
import type { StreamId, SubjectId } from '@/types/content';

type Sheet = 'year' | 'stream' | 'subjects' | null;

export default function ProfileSettings() {
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const today = useToday();
  const localize = useLocalize();
  const subjectName = useSubjectName();
  const profile = useProfile();
  const year = useAcademicYear();

  const [sheet, setSheet] = useState<Sheet>(null);
  const [pendingStream, setPendingStream] = useState<StreamId | null>(null);
  const [draftSubjects, setDraftSubjects] = useState<SubjectId[]>([]);
  const [confirmSubjects, setConfirmSubjects] = useState(false);

  if (!profile) {
    return (
      <DetailScreen title={t('settings.profile.title')} onBack={() => router.back()}>
        <Text variant="body" tone="slate" style={{ marginTop: theme.spacing.md }}>
          {t('error.notFound.body')}
        </Text>
      </DetailScreen>
    );
  }

  const stream = getStream(profile.streamId);
  const years = selectableAcademicYears(today);

  const openSubjects = (streamId: StreamId, initial: SubjectId[]) => {
    setDraftSubjects(initial);
    setPendingStream(streamId);
    setSheet('subjects');
  };

  const commitSubjects = () => {
    const targetStream = getStream(pendingStream ?? profile.streamId);
    if (!isSelectionComplete(targetStream, draftSubjects)) return;
    updateProfile({ streamId: targetStream.id, subjectIds: draftSubjects });
    setSheet(null);
    setPendingStream(null);
    setConfirmSubjects(false);
  };

  const sheetStream = getStream(pendingStream ?? profile.streamId);
  const draftError = draftSubjects.length === 3 ? validateSelection(sheetStream, draftSubjects) : null;

  return (
    <DetailScreen
      title={t('settings.profile.title')}
      onBack={() => router.back()}
      overlay={
        <>
          {/* Year */}
          <BottomSheet visible={sheet === 'year'} onClose={() => setSheet(null)} title={t('settings.profile.year')}>
            {years.map((option, index) => (
              <ListRow
                key={option.id}
                title={t('onboarding.year.option', { year: option.examYear })}
                subtitle={t('onboarding.year.startedIn', { year: journeyStartYear(option) })}
                last={index === years.length - 1}
                onPress={() => {
                  updateProfile({ academicYearId: option.id });
                  setSheet(null);
                }}
              />
            ))}
          </BottomSheet>

          {/* Stream */}
          <BottomSheet
            visible={sheet === 'stream'}
            onClose={() => setSheet(null)}
            title={t('settings.profile.stream')}
          >
            <Text variant="bodySm" tone="slate" style={{ marginBottom: theme.spacing.md }}>
              {t('settings.profile.streamWarning.body')}
            </Text>
            {STREAMS.map((option, index) => (
              <ListRow
                key={option.id}
                title={localize(option.name)}
                last={index === STREAMS.length - 1}
                onPress={() => openSubjects(option.id, coreSubjects(option))}
              />
            ))}
          </BottomSheet>

          {/* Subjects */}
          <BottomSheet
            visible={sheet === 'subjects'}
            onClose={() => {
              setSheet(null);
              setPendingStream(null);
            }}
            title={t('onboarding.subjects.title')}
            footer={
              <Button
                label={t('common.saveChanges')}
                disabled={!isSelectionComplete(sheetStream, draftSubjects)}
                onPress={() => setConfirmSubjects(true)}
                style={{ marginBottom: theme.spacing.xs }}
              />
            }
          >
            <Text variant="bodySm" tone="slate" style={{ marginBottom: theme.spacing.md }}>
              {t('onboarding.subjects.subtitle')}
            </Text>

            {coreSubjects(sheetStream).length > 0 ? (
              <View style={{ marginBottom: theme.spacing.lg }}>
                <SectionHeader title={t('onboarding.subjects.included')} />
                <ChipGroup>
                  {coreSubjects(sheetStream).map((id) => (
                    <Chip key={id} label={subjectName(id)} locked />
                  ))}
                </ChipGroup>
              </View>
            ) : null}

            <ChipGroup>
              {optionalSubjects(sheetStream).map((id) => {
                const selected = draftSubjects.includes(id);
                return (
                  <Chip
                    key={id}
                    label={subjectName(id)}
                    selected={selected}
                    disabled={!selected && !canAddSubject(sheetStream, draftSubjects, id)}
                    onPress={() => setDraftSubjects(toggleSubject(sheetStream, draftSubjects, id))}
                  />
                );
              })}
            </ChipGroup>

            {draftError === 'not_enough_core' ? (
              <Text variant="caption" tone="danger" style={{ marginTop: theme.spacing.md }}>
                {t('onboarding.subjects.needTwoCore')}
              </Text>
            ) : null}
          </BottomSheet>

          <ConfirmDialog
            visible={confirmSubjects}
            title={t('settings.profile.subjectsWarning.title')}
            body={t('settings.profile.subjectsWarning.body')}
            confirmLabel={t('common.saveChanges')}
            onCancel={() => setConfirmSubjects(false)}
            onConfirm={commitSubjects}
          />
        </>
      }
    >
      <View style={{ marginTop: theme.spacing.md }}>
        <ListRow
          title={t('settings.profile.year')}
          {...(year ? { value: t('onboarding.year.option', { year: year.examYear }) } : {})}
          onPress={() => setSheet('year')}
          showChevron
        />
        <ListRow
          title={t('settings.profile.stream')}
          value={localize(stream.name)}
          onPress={() => setSheet('stream')}
          showChevron
        />
        <ListRow
          title={t('settings.profile.subjects')}
          onPress={() => openSubjects(profile.streamId, [...profile.subjectIds])}
          showChevron
          last
        />
      </View>

      <View style={{ marginTop: theme.spacing.xl }}>
        <SectionHeader title={t('settings.profile.subjects')} />
        <ChipGroup>
          {profile.subjectIds.map((id) => (
            <Chip key={id} label={subjectName(id)} locked />
          ))}
        </ChipGroup>
      </View>
    </DetailScreen>
  );
}
