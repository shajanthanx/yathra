/**
 * A syllabus topic. Tapping opens the status sheet; a long press cycles the
 * status directly, which makes marking a run of topics quick.
 */
import { Pressable, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useLocalize } from '@/hooks/useContent';
import { useT, useTheme } from '@/theme/ThemeProvider';
import type { SyllabusTopic } from '@/types/content';
import type { TopicStatus } from '@/types/models';
import { Text } from './Text';

export interface TopicRowProps {
  topic: SyllabusTopic;
  status: TopicStatus;
  onPress: (topic: SyllabusTopic) => void;
  onLongPress?: (topic: SyllabusTopic) => void;
  last?: boolean;
}

const STATUS_ICON: Record<TopicStatus, keyof typeof Feather.glyphMap> = {
  not_started: 'circle',
  learning: 'book-open',
  practising: 'edit-3',
  completed: 'check-circle',
};

export function TopicRow({ topic, status, onPress, onLongPress, last = false }: TopicRowProps) {
  const theme = useTheme();
  const t = useT();
  const localize = useLocalize();

  const statusColor =
    status === 'completed'
      ? theme.colors.success
      : status === 'not_started'
        ? theme.colors.stone
        : theme.colors.info;

  const statusLabel = t(`topicStatus.${status}`);

  return (
    <Pressable
      onPress={() => onPress(topic)}
      onLongPress={onLongPress ? () => onLongPress(topic) : undefined}
      accessibilityRole="button"
      accessibilityLabel={`${localize(topic.name)}, ${statusLabel}`}
      accessibilityHint={t('a11y.cycleStatus')}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: theme.sizes.listRowMinHeight,
        paddingVertical: theme.spacing.sm,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: theme.colors.hairlineSoft,
        backgroundColor: pressed ? theme.colors.surface : 'transparent',
      })}
    >
      <Feather
        name={STATUS_ICON[status]}
        size={theme.sizes.iconSm}
        color={statusColor}
        style={{ marginRight: theme.spacing.sm }}
      />
      <View style={{ flex: 1 }}>
        <Text variant="body" tone={status === 'completed' ? 'slate' : 'ink'}>
          {localize(topic.name)}
        </Text>
        {status !== 'not_started' ? (
          <Text variant="caption" color={statusColor} style={{ marginTop: 2 }}>
            {statusLabel}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}
