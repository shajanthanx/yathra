/**
 * A task in a list.
 *
 * The subject's mark leads the row so a list of tasks is scannable by subject
 * at a glance, and the completion control sits at the trailing edge where a
 * thumb reaches it. Tapping the middle opens the editor; the mark itself is
 * hidden from assistive technology because the subject is already named in
 * the line beneath the title.
 */
import { Pressable, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSubjectName } from '@/hooks/useContent';
import { formatMinutes } from '@/i18n/format';
import { useT, useTheme } from '@/theme/ThemeProvider';
import type { Task } from '@/types/models';
import { SubjectMark } from './SubjectMark';
import { Text } from './Text';

export interface TaskRowProps {
  task: Task;
  onToggle: (task: Task) => void;
  onPress?: (task: Task) => void;
  /** Shows the date, for lists that span more than one day. */
  showDate?: string;
  last?: boolean;
}

export function TaskRow({ task, onToggle, onPress, showDate, last = false }: TaskRowProps) {
  const theme = useTheme();
  const t = useT();
  const subjectName = useSubjectName();

  const meta = [
    subjectName(task.subjectId, true),
    showDate,
    task.durationMinutes ? formatMinutes(t, task.durationMinutes) : undefined,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: theme.sizes.listRowMinHeight,
        paddingVertical: theme.spacing.xs,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: theme.colors.hairlineSoft,
      }}
    >
      <SubjectMark subjectId={task.subjectId} size="sm" style={{ marginRight: theme.spacing.sm }} />

      <Pressable
        onPress={onPress ? () => onPress(task) : undefined}
        disabled={!onPress}
        accessibilityRole={onPress ? 'button' : undefined}
        accessibilityLabel={onPress ? `${task.title}, ${meta}` : undefined}
        style={{ flex: 1, paddingVertical: theme.spacing.xxs }}
      >
        <Text
          variant="body"
          tone={task.completed ? 'stone' : 'ink'}
          style={task.completed ? { textDecorationLine: 'line-through' } : undefined}
        >
          {task.title}
        </Text>
        {meta ? (
          <Text variant="caption" tone="slate" style={{ marginTop: 2 }} numberOfLines={1}>
            {meta}
          </Text>
        ) : null}
      </Pressable>

      <Pressable
        onPress={() => onToggle(task)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: task.completed }}
        accessibilityLabel={task.title}
        accessibilityHint={t('a11y.toggleTask')}
        hitSlop={8}
        style={{
          width: 44,
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: theme.spacing.xxs,
        }}
      >
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: theme.radius.full,
            borderWidth: task.completed ? 0 : 2,
            borderColor: theme.colors.hairlineStrong,
            backgroundColor: task.completed ? theme.colors.success : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {task.completed ? <Feather name="check" size={16} color="#ffffff" /> : null}
        </View>
      </Pressable>
    </View>
  );
}
