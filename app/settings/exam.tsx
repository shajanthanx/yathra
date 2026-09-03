/**
 * Examination information. Bundled dates are shown with their status, and a
 * student can set their own start date if an official timetable differs from
 * what shipped with the app.
 */
import { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card, DetailScreen, ListRow, SectionHeader, Text, TextField } from '@/components';
import { syllabusTargetDate } from '@/domain/journey';
import { useAcademicYear } from '@/hooks/useContent';
import { useCountdown } from '@/hooks/useJourney';
import { plural } from '@/i18n';
import { formatFullDate } from '@/i18n/format';
import { updateProfile } from '@/store/appStore';
import { useProfile } from '@/store/useStore';
import { useT, useTheme } from '@/theme/ThemeProvider';
import { isValidLocalDate } from '@/utils/date';

export default function ExamScreen() {
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const year = useAcademicYear();
  const profile = useProfile();
  const countdown = useCountdown();

  const [editing, setEditing] = useState(false);
  const [dateText, setDateText] = useState(profile?.examDateOverride ?? '');
  const [error, setError] = useState<string | undefined>(undefined);

  if (!year) {
    return (
      <DetailScreen title={t('settings.exam.title')} onBack={() => router.back()}>
        <Text variant="body" tone="slate" style={{ marginTop: theme.spacing.md }}>
          {t('error.notFound.body')}
        </Text>
      </DetailScreen>
    );
  }

  const overridden = profile?.examDateOverride !== undefined;
  const target = syllabusTargetDate(year, profile?.examDateOverride);

  const save = () => {
    const trimmed = dateText.trim();
    if (!isValidLocalDate(trimmed)) {
      setError(t('task.error.dateInvalid'));
      return;
    }
    updateProfile({ examDateOverride: trimmed });
    setError(undefined);
    setEditing(false);
  };

  return (
    <DetailScreen title={t('settings.exam.title')} onBack={() => router.back()}>
        <Card style={{ marginTop: theme.spacing.md }}>
          <Text variant="microUppercase" tone="steel" uppercase>
            {t('settings.exam.dates')}
          </Text>
          <Text variant="subheading" style={{ marginTop: theme.spacing.xxs }}>
            {countdown
              ? t('settings.exam.range', {
                  start: formatFullDate(t, countdown.examStart),
                  end: formatFullDate(t, countdown.examEnd),
                })
              : ''}
          </Text>
          {countdown && countdown.phase === 'before' ? (
            <Text variant="body" tone="slate" style={{ marginTop: theme.spacing.xs }}>
              {plural(t, 'home.countdown.days', countdown.daysLeft)}
            </Text>
          ) : null}
          <Text variant="caption" tone="stone" style={{ marginTop: theme.spacing.sm }}>
            {overridden
              ? t('settings.exam.overrideActive')
              : year.examDateStatus === 'confirmed'
                ? t('settings.exam.statusConfirmed')
                : t('settings.exam.statusEstimated')}
          </Text>
        </Card>

        <View style={{ marginTop: theme.spacing.xl }}>
          <ListRow
            title={t('settings.exam.journeyStart')}
            value={formatFullDate(t, year.journeyStart)}
          />
          <ListRow
            title={t('settings.exam.syllabusTarget')}
            value={formatFullDate(t, target)}
            last
          />
        </View>

        <View style={{ marginTop: theme.spacing.xl }}>
          {editing ? (
            <>
              <TextField
                label={t('settings.exam.override')}
                placeholder="YYYY-MM-DD"
                value={dateText}
                onChangeText={(text) => {
                  setDateText(text);
                  setError(undefined);
                }}
                autoCapitalize="none"
                {...(error === undefined ? {} : { error })}
              />
              <View style={{ marginTop: theme.spacing.md, gap: theme.spacing.xs }}>
                <Button label={t('common.save')} onPress={save} />
                <Button label={t('common.cancel')} variant="ghost" onPress={() => setEditing(false)} />
              </View>
            </>
          ) : (
            <View style={{ gap: theme.spacing.xs }}>
              <Button
                label={t('settings.exam.override')}
                variant="secondary"
                onPress={() => {
                  setDateText(profile?.examDateOverride ?? year.examStart);
                  setEditing(true);
                }}
              />
              {overridden ? (
                <Button
                  label={t('settings.exam.overrideClear')}
                  variant="ghost"
                  onPress={() => updateProfile({ examDateOverride: null })}
                />
              ) : null}
            </View>
          )}
        </View>

        <View style={{ marginTop: theme.spacing.xxl }}>
          <SectionHeader title={t('settings.exam.gradingTitle')} variant="heading" />
          <Text variant="bodySm" tone="slate">
            {t('settings.exam.gradingBody')}
          </Text>
        </View>
    </DetailScreen>
  );
}
