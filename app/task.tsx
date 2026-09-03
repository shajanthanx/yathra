/**
 * Add or edit a task. Three fields are required — what, which subject and
 * when — and everything else has a sensible default, so a task takes a few
 * seconds rather than a form. The title field takes focus immediately on a new
 * task, so the common case is type-and-save.
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
  DayPicker,
  DetailScreen,
  ListRow,
  SectionHeader,
  Text,
  TextField,
} from '@/components';
import { topicsForSubject } from '@/data/curriculum';
import { isSubjectId } from '@/data/curriculum/subject-ids';
import { TASK_TITLE_MAX, validateTaskInput, type FieldError } from '@/domain/validation';
import { useLocalize, useSelectedSubjectIds, useSubjectName } from '@/hooks/useContent';
import { useToday } from '@/hooks/useToday';
import { formatMinutes } from '@/i18n/format';
import { addTask, deleteTask, updateTask } from '@/store/appStore';
import { useTasks } from '@/store/useStore';
import { useT, useTheme } from '@/theme/ThemeProvider';
import type { LocalDate, SubjectId } from '@/types/content';
import { isValidLocalDate } from '@/utils/date';

const DURATION_OPTIONS = [15, 30, 45, 60, 90];

export default function TaskScreen() {
  const theme = useTheme();
  const t = useT();
  const router = useRouter();
  const today = useToday();
  const localize = useLocalize();
  const subjectName = useSubjectName();
  const selectedSubjects = useSelectedSubjectIds();
  const tasks = useTasks();

  const params = useLocalSearchParams<{
    taskId?: string;
    subjectId?: string;
    topicId?: string;
    date?: string;
    title?: string;
  }>();

  const existing = useMemo(
    () => (params.taskId ? tasks.find((task) => task.id === params.taskId) : undefined),
    [params.taskId, tasks],
  );

  const [title, setTitle] = useState(existing?.title ?? params.title ?? '');
  const [subjectId, setSubjectId] = useState<SubjectId | null>(() => {
    if (existing) return existing.subjectId;
    if (params.subjectId && isSubjectId(params.subjectId)) return params.subjectId;
    return selectedSubjects[0] ?? null;
  });
  const [topicId, setTopicId] = useState<string | undefined>(existing?.topicId ?? params.topicId);
  const [date, setDate] = useState<LocalDate>(() => {
    if (existing) return existing.date;
    if (params.date && isValidLocalDate(params.date)) return params.date;
    return today;
  });
  const [duration, setDuration] = useState<number | undefined>(existing?.durationMinutes ?? 45);
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [topicSheetOpen, setTopicSheetOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const topics = useMemo(() => (subjectId ? topicsForSubject(subjectId) : []), [subjectId]);
  const selectedTopic = useMemo(
    () => (topicId ? topics.find((topic) => topic.id === topicId) : undefined),
    [topicId, topics],
  );

  const titleError = errors.includes('title_required')
    ? t('task.error.titleRequired')
    : errors.includes('title_too_long')
      ? t('task.error.titleTooLong', { max: TASK_TITLE_MAX })
      : undefined;

  const submit = () => {
    const found = validateTaskInput({
      title,
      subjectId,
      date,
      ...(duration === undefined ? {} : { durationMinutes: duration }),
    });
    setErrors(found);
    if (found.length > 0 || !subjectId) return;

    if (existing) {
      updateTask(existing.id, {
        title: title.trim(),
        subjectId,
        topicId,
        date,
        durationMinutes: duration,
      });
    } else {
      addTask({
        title: title.trim(),
        subjectId,
        ...(topicId === undefined ? {} : { topicId }),
        date,
        ...(duration === undefined ? {} : { durationMinutes: duration }),
      });
    }
    router.back();
  };

  return (
    <DetailScreen
      title={existing ? t('task.edit') : t('task.new')}
      onClose={() => router.back()}
      bottomInset={theme.spacing.md}
      overlay={
        <>
          <BottomSheet
            visible={topicSheetOpen}
            onClose={() => setTopicSheetOpen(false)}
            title={t('task.topicChoose')}
          >
            <ListRow
              title={t('task.topicNone')}
              onPress={() => {
                setTopicId(undefined);
                setTopicSheetOpen(false);
              }}
            />
            {topics.map((topic, index) => (
              <ListRow
                key={topic.id}
                title={localize(topic.name)}
                last={index === topics.length - 1}
                onPress={() => {
                  setTopicId(topic.id);
                  if (title.trim().length === 0) setTitle(localize(topic.name));
                  setTopicSheetOpen(false);
                }}
              />
            ))}
          </BottomSheet>

          <ConfirmDialog
            visible={confirmDelete}
            title={t('task.deleteConfirm.title')}
            body={t('task.deleteConfirm.body')}
            confirmLabel={t('common.delete')}
            destructive
            onCancel={() => setConfirmDelete(false)}
            onConfirm={() => {
              if (existing) deleteTask(existing.id);
              setConfirmDelete(false);
              router.back();
            }}
          />
        </>
      }
    >
      <TextField
        label={t('task.titleLabel')}
        placeholder={t('task.titlePlaceholder')}
        value={title}
        onChangeText={setTitle}
        {...(titleError === undefined ? {} : { error: titleError })}
        autoFocus={!existing}
        maxLength={TASK_TITLE_MAX + 10}
        returnKeyType="done"
        containerStyle={{ marginTop: theme.spacing.md }}
      />

      <View style={{ marginTop: theme.spacing.xl }}>
        <SectionHeader title={t('task.subjectLabel')} />
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
        {errors.includes('subject_required') ? (
          <Text variant="caption" tone="danger" style={{ marginTop: theme.spacing.xs }}>
            {t('task.error.subjectRequired')}
          </Text>
        ) : null}
      </View>

      <View style={{ marginTop: theme.spacing.xl }}>
        <SectionHeader title={t('task.whenLabel')} />
        <DayPicker value={date} today={today} onChange={setDate} />
      </View>

      <View style={{ marginTop: theme.spacing.xl }}>
        <SectionHeader title={t('task.durationLabel')} />
        <ChipGroup>
          {DURATION_OPTIONS.map((minutes) => (
            <Chip
              key={minutes}
              label={formatMinutes(t, minutes)}
              selected={duration === minutes}
              onPress={() => setDuration(duration === minutes ? undefined : minutes)}
            />
          ))}
        </ChipGroup>
      </View>

      <View style={{ marginTop: theme.spacing.xl }}>
        <SectionHeader title={`${t('task.topicLabel')} · ${t('common.optional')}`} />
        <ListRow
          title={selectedTopic ? localize(selectedTopic.name) : t('task.topicNone')}
          onPress={() => setTopicSheetOpen(true)}
          showChevron
          last
        />
      </View>

      <View style={{ marginTop: theme.spacing.xxl, gap: theme.spacing.xs }}>
        <Button label={existing ? t('task.saveChanges') : t('task.add')} onPress={submit} />
        {existing ? (
          <Button label={t('task.delete')} variant="ghost" onPress={() => setConfirmDelete(true)} />
        ) : null}
      </View>
    </DetailScreen>
  );
}
