/**
 * Subject detail: the syllabus, unit by unit, with a topic sheet that changes
 * a topic's status in one tap.
 *
 * The header is a tint panel in the subject's own colour — the one place the
 * `-on` foreground is exactly right, since that is what those tokens are for.
 * Units are numbered so a long syllabus stays navigable, and the status
 * control stays a wrapping chip group rather than a segmented control: four
 * Sinhala or Tamil status words will not fit four equal segments on a phone.
 */
import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import {
  BottomSheet,
  Button,
  Chip,
  ChipGroup,
  DetailScreen,
  ProgressBar,
  ProgressRing,
  Text,
  TopicRow,
} from '@/components';
import { getSyllabus } from '@/data/curriculum';
import { isSubjectId } from '@/data/curriculum/subject-ids';
import {
  calculateUnitProgress,
  getTopicStatus,
  isUnitComplete,
  nextTopicStatus,
  STATUS_ORDER,
} from '@/domain/progress';
import { useLocalize, useSubjectName, useSubjectTint } from '@/hooks/useContent';
import { useSubjectSummary } from '@/hooks/useProgress';
import { useToday } from '@/hooks/useToday';
import { percentValue } from '@/i18n/format';
import { setTopicStatus } from '@/store/appStore';
import { useTopicProgress } from '@/store/useStore';
import { useT, useTheme } from '@/theme/ThemeProvider';
import { tintPair } from '@/theme/tokens';
import type { SyllabusTopic } from '@/types/content';

export default function SubjectDetailScreen() {
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const today = useToday();
  const localize = useLocalize();
  const subjectName = useSubjectName();
  const subjectTint = useSubjectTint();
  const progress = useTopicProgress();
  const { subjectId } = useLocalSearchParams<{ subjectId: string }>();
  const [openTopic, setOpenTopic] = useState<SyllabusTopic | null>(null);

  const valid = typeof subjectId === 'string' && isSubjectId(subjectId);
  const syllabus = useMemo(() => (valid ? getSyllabus(subjectId) : null), [valid, subjectId]);
  const summary = useSubjectSummary(valid ? subjectId : 'physics');

  if (!valid || !syllabus) return <Redirect href="/(tabs)/subjects" />;

  const pair = tintPair(theme.colors, subjectTint(subjectId));
  const percent = percentValue(summary.progress);
  const openTopicStatus = openTopic ? getTopicStatus(progress, openTopic.id) : 'not_started';

  return (
    <DetailScreen
      title={subjectName(subjectId)}
      onBack={() => router.back()}
      bottomInset={theme.spacing.md}
      overlay={
        <BottomSheet
          visible={openTopic !== null}
          onClose={() => setOpenTopic(null)}
          title={openTopic ? localize(openTopic.name) : undefined}
        >
          {openTopic ? (
            <View>
              <Text variant="microUppercase" tone="steel" uppercase>
                {t('subject.topicStatus')}
              </Text>
              <ChipGroup style={{ marginTop: theme.spacing.xs }}>
                {STATUS_ORDER.map((status) => (
                  <Chip
                    key={status}
                    label={t(`topicStatus.${status}`)}
                    selected={openTopicStatus === status}
                    onPress={() => setTopicStatus(openTopic.id, status)}
                  />
                ))}
              </ChipGroup>

              <View style={{ marginTop: theme.spacing.xl, gap: theme.spacing.xs }}>
                <Button
                  label={t('subject.addTask')}
                  icon="plus"
                  variant="secondary"
                  onPress={() => {
                    const topic = openTopic;
                    setOpenTopic(null);
                    router.push({
                      pathname: '/task',
                      params: {
                        subjectId,
                        topicId: topic.id,
                        date: today,
                        title: localize(topic.name),
                      },
                    });
                  }}
                />
                <Button
                  label={t('subject.startSession')}
                  icon="play"
                  onPress={() => {
                    const topic = openTopic;
                    setOpenTopic(null);
                    router.push({ pathname: '/study', params: { subjectId, topicId: topic.id } });
                  }}
                />
              </View>
            </View>
          ) : null}
        </BottomSheet>
      }
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.lg,
          marginTop: theme.spacing.md,
          padding: theme.spacing.lg,
          borderRadius: theme.radius.xxxl,
          backgroundColor: pair.background,
        }}
      >
        <ProgressRing
          value={summary.progress}
          size={88}
          color={pair.foreground}
          trackColor={theme.colors.surfaceRaised}
          accessibilityLabel={t('a11y.progress', { value: percent })}
        >
          <Text variant="heading" color={pair.foreground} maxFontSizeMultiplier={1.2}>
            {t('common.percent', { value: percent })}
          </Text>
        </ProgressRing>

        <View style={{ flex: 1 }}>
          <Text variant="bodyMedium" color={pair.foreground}>
            {t('common.of', { done: summary.completedTopics, total: summary.totalTopics })}
          </Text>
          <Text
            variant="caption"
            color={pair.foreground}
            style={{ marginTop: theme.spacing.xxs, opacity: 0.9 }}
          >
            {summary.focusTopic
              ? t('subjects.currentFocus', { topic: localize(summary.focusTopic.name) })
              : t('subjects.allDone')}
          </Text>
          {syllabus.depth === 'units' ? (
            <Text
              variant="micro"
              color={pair.foreground}
              style={{ marginTop: theme.spacing.xs, opacity: 0.9 }}
            >
              {t('subject.unitsOnlyNote')}
            </Text>
          ) : null}
        </View>
      </View>

      {syllabus.units.map((unit, unitIndex) => {
        const unitProgress = calculateUnitProgress(unit, progress);
        const complete = isUnitComplete(unit, progress);

        return (
          <View key={unit.id} style={{ marginTop: theme.spacing.xxl }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: theme.spacing.sm,
                marginBottom: theme.spacing.xs,
              }}
            >
              <Text variant="captionBold" tone="stone" style={{ marginTop: 6 }}>
                {String(unitIndex + 1).padStart(2, '0')}
              </Text>
              <Text
                variant="heading"
                accessibilityRole="header"
                style={{ flex: 1 }}
              >
                {localize(unit.name)}
              </Text>
              {complete ? (
                <Feather
                  name="check-circle"
                  size={theme.sizes.iconSm}
                  color={theme.colors.success}
                  style={{ marginTop: 6 }}
                />
              ) : (
                <Text variant="bodySmMedium" tone="slate" style={{ marginTop: 6 }}>
                  {t('common.percent', { value: percentValue(unitProgress) })}
                </Text>
              )}
            </View>

            {unit.periods ? (
              <Text variant="caption" tone="stone" style={{ marginBottom: theme.spacing.xs }}>
                {[
                  t('subject.periods', { count: unit.periods }),
                  unit.grade ? t('subject.grade', { grade: unit.grade }) : null,
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </Text>
            ) : null}

            <ProgressBar
              value={unitProgress}
              color={pair.foreground}
              height={theme.sizes.progressBarThin}
              style={{ marginBottom: theme.spacing.xs }}
            />

            {unit.topics.map((topic, index) => (
              <TopicRow
                key={topic.id}
                topic={topic}
                status={getTopicStatus(progress, topic.id)}
                last={index === unit.topics.length - 1}
                onPress={setOpenTopic}
                onLongPress={(item) =>
                  setTopicStatus(item.id, nextTopicStatus(getTopicStatus(progress, item.id)))
                }
              />
            ))}
          </View>
        );
      })}
    </DetailScreen>
  );
}
