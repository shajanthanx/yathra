/**
 * Study session. The timer is wall-clock based, so a session survives the app
 * being backgrounded or suspended, and an unfinished session is offered back
 * when the app is reopened rather than being silently lost.
 *
 * The running state is deliberately bare: the subject, the topic, a ring, and
 * two controls. Everything else is a distraction from the one thing the screen
 * exists for.
 */
import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  BottomSheet,
  Button,
  Chip,
  ChipGroup,
  ConfirmDialog,
  DetailScreen,
  ListRow,
  MessageScreen,
  ProgressRing,
  SectionHeader,
  Text,
} from '@/components';
import { findTopic, topicsForSubject } from '@/data/curriculum';
import { isSubjectId } from '@/data/curriculum/subject-ids';
import {
  useLocalize,
  useSelectedSubjectIds,
  useSubjectName,
  useSubjectPalette,
} from '@/hooks/useContent';
import { useStudyTimer } from '@/hooks/useStudyTimer';
import { formatClock, formatMinutes, formatSeconds } from '@/i18n/format';
import {
  discardStudySession,
  finishStudySession,
  pauseStudySession,
  resumeStudySession,
  startStudySession,
} from '@/store/appStore';
import { useActiveSession } from '@/store/useStore';
import { useT, useTheme } from '@/theme/ThemeProvider';
import type { SubjectId } from '@/types/content';
import { clamp01 } from '@/utils/date';

const DURATION_OPTIONS = [15, 25, 45, 60, 90];

export default function StudyScreen() {
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const localize = useLocalize();
  const subjectName = useSubjectName();
  const subjectPalette = useSubjectPalette();
  const selectedSubjects = useSelectedSubjectIds();
  const session = useActiveSession();
  const timer = useStudyTimer();

  const params = useLocalSearchParams<{ subjectId?: string; topicId?: string }>();

  const [subjectId, setSubjectId] = useState<SubjectId | null>(() => {
    if (params.subjectId && isSubjectId(params.subjectId)) return params.subjectId;
    return selectedSubjects[0] ?? null;
  });
  const [topicId, setTopicId] = useState<string | undefined>(params.topicId);
  const [minutes, setMinutes] = useState(45);
  /** Set when the timer has stopped and the student is answering the prompt. */
  const [asking, setAsking] = useState(false);
  const [finished, setFinished] = useState<{ seconds: number; saved: boolean } | null>(null);
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const [topicSheet, setTopicSheet] = useState(false);

  const topics = useMemo(() => (subjectId ? topicsForSubject(subjectId) : []), [subjectId]);
  const activeTopic = session?.topicId ? findTopic(session.topicId) : undefined;
  const chosenTopic = topicId ? findTopic(topicId) : undefined;

  // ---- completion prompt ----
  // While `asking` is true the session is still active, so the student's answer
  // decides whether the topic is marked complete when the session is recorded.
  if (asking && session) {
    const stop = (markTopicCompleted: boolean) => {
      const result = finishStudySession(markTopicCompleted);
      setAsking(false);
      setFinished({ seconds: result.seconds, saved: result.saved });
    };

    return (
      <MessageScreen
        title={t('study.complete.title')}
        body={t('study.complete.studied', { duration: formatSeconds(t, timer.elapsed) })}
        icon="check-circle"
        tint="teal"
        appBar={{ title: t('study.complete.title') }}
      >
        {session.topicId ? (
          <>
            <Text variant="subheading" align="center" style={{ marginBottom: theme.spacing.sm }}>
              {t('study.complete.question')}
            </Text>
            <Button label={t('common.yes')} onPress={() => stop(true)} />
            <Button label={t('common.notYet')} variant="secondary" onPress={() => stop(false)} />
          </>
        ) : (
          <Button label={t('common.done')} onPress={() => stop(false)} />
        )}
      </MessageScreen>
    );
  }

  // ---- saved confirmation ----
  if (finished) {
    return (
      <MessageScreen
        title={t('study.complete.title')}
        body={
          finished.saved
            ? t('study.complete.studied', { duration: formatSeconds(t, finished.seconds) })
            : t('study.tooShort')
        }
        icon={finished.saved ? 'check-circle' : 'clock'}
        tint={finished.saved ? 'teal' : 'amber'}
        appBar={{ title: t('study.complete.title'), onClose: () => router.back() }}
      >
        <Button
          label={t('common.done')}
          onPress={() => {
            setFinished(null);
            router.back();
          }}
        />
      </MessageScreen>
    );
  }

  // ---- running timer ----
  if (session && timer.isActive) {
    const colours = subjectPalette(session.subjectId);
    const swept =
      timer.plannedSeconds > 0 ? clamp01(timer.elapsed / timer.plannedSeconds) : timer.isRunning ? 1 : 0;

    return (
      <DetailScreen
        title={t('study.title')}
        onClose={() => setConfirmDiscard(true)}
        scroll={false}
        contentStyle={{ justifyContent: 'center' }}
        overlay={
          <ConfirmDialog
            visible={confirmDiscard}
            title={t('study.discardConfirm.title')}
            body={t('study.discardConfirm.body')}
            confirmLabel={t('study.discard')}
            destructive
            onCancel={() => setConfirmDiscard(false)}
            onConfirm={() => {
              discardStudySession();
              setConfirmDiscard(false);
              router.back();
            }}
          />
        }
      >
        <View style={{ alignItems: 'center' }}>
          <Text variant="subheading" align="center" tone="slate">
            {subjectName(session.subjectId)}
          </Text>
          {activeTopic ? (
            <Text
              variant="body"
              align="center"
              tone="steel"
              style={{ marginTop: theme.spacing.xxs }}
            >
              {localize(activeTopic.name)}
            </Text>
          ) : null}

          <ProgressRing
            value={swept}
            size={240}
            thickness={10}
            color={colours.graphic}
            style={{ marginTop: theme.spacing.xxl }}
            accessibilityLabel={`${t('study.elapsed')} ${formatSeconds(t, timer.elapsed)}`}
          >
            <Text variant="display" align="center" style={{ fontVariant: ['tabular-nums'] }}>
              {formatClock(timer.reachedTarget ? timer.elapsed : timer.remaining)}
            </Text>
            <Text variant="caption" align="center" tone="stone">
              {timer.reachedTarget ? t('study.elapsed') : t('study.durationLabel')}
            </Text>
          </ProgressRing>

          <View
            style={{ alignSelf: 'stretch', marginTop: theme.spacing.xxxl, gap: theme.spacing.xs }}
          >
            {timer.isRunning ? (
              <Button
                label={t('study.pause')}
                icon="pause"
                variant="secondary"
                onPress={pauseStudySession}
              />
            ) : (
              <Button
                label={t('study.resume')}
                icon="play"
                variant="secondary"
                onPress={resumeStudySession}
              />
            )}
            <Button label={t('study.finish')} icon="check" onPress={() => setAsking(true)} />
          </View>
        </View>
      </DetailScreen>
    );
  }

  // ---- setup ----
  return (
    <DetailScreen
      title={t('study.title')}
      onClose={() => router.back()}
      bottomInset={theme.spacing.md}
      overlay={
        <BottomSheet
          visible={topicSheet}
          onClose={() => setTopicSheet(false)}
          title={t('study.chooseTopic')}
        >
          <ListRow
            title={t('study.noTopic')}
            onPress={() => {
              setTopicId(undefined);
              setTopicSheet(false);
            }}
          />
          {/* The whole syllabus, not a slice of it: this list used to stop at
              twelve topics with no way to reach the rest of a subject. */}
          {topics.map((topic, index) => (
            <ListRow
              key={topic.id}
              title={localize(topic.name)}
              last={index === topics.length - 1}
              onPress={() => {
                setTopicId(topic.id);
                setTopicSheet(false);
              }}
            />
          ))}
        </BottomSheet>
      }
    >
      <View style={{ marginTop: theme.spacing.md }}>
        <SectionHeader title={t('study.chooseSubject')} />
        <ChipGroup>
          {selectedSubjects.map((id) => (
            <Chip
              key={id}
              label={subjectName(id, true)}
              selected={subjectId === id}
              onPress={() => {
                setSubjectId(id);
                if (id !== subjectId) setTopicId(undefined);
              }}
            />
          ))}
        </ChipGroup>
      </View>

      <View style={{ marginTop: theme.spacing.xl }}>
        <SectionHeader title={`${t('study.chooseTopic')} · ${t('common.optional')}`} />
        <ListRow
          title={chosenTopic ? localize(chosenTopic.name) : t('study.noTopic')}
          onPress={() => setTopicSheet(true)}
          showChevron
          last
        />
      </View>

      <View style={{ marginTop: theme.spacing.xl }}>
        <SectionHeader title={t('study.durationLabel')} />
        <ChipGroup>
          {DURATION_OPTIONS.map((option) => (
            <Chip
              key={option}
              label={formatMinutes(t, option)}
              selected={minutes === option}
              onPress={() => setMinutes(option)}
            />
          ))}
        </ChipGroup>
      </View>

      <Button
        label={t('study.start')}
        icon="play"
        disabled={!subjectId}
        style={{ marginTop: theme.spacing.xxl }}
        onPress={() => {
          if (!subjectId) return;
          startStudySession({
            subjectId,
            ...(topicId === undefined ? {} : { topicId }),
            plannedSeconds: minutes * 60,
          });
        }}
      />
    </DetailScreen>
  );
}
