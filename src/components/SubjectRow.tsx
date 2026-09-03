/**
 * A subject with its progress: mark, percentage, bar, what to work on next and
 * how much is left.
 *
 * The bar takes the subject's own colour by default, so a list of subjects is
 * distinguishable without the caller having to wire a palette through.
 */
import { Pressable, View, type ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { SubjectProgressSummary } from '@/domain/progress';
import { useLocalize, useSubjectName, useSubjectTint } from '@/hooks/useContent';
import { plural } from '@/i18n';
import { percentValue } from '@/i18n/format';
import { useT, useTheme } from '@/theme/ThemeProvider';
import { tintPair } from '@/theme/tokens';
import { ProgressBar } from './ProgressBar';
import { SubjectMark } from './SubjectMark';
import { Text } from './Text';

export interface SubjectRowProps {
  summary: SubjectProgressSummary;
  onPress: (subjectId: SubjectProgressSummary['subjectId']) => void;
  /** Overrides the subject's own tint for the progress bar. */
  color?: string;
  last?: boolean;
  style?: ViewStyle;
}

export function SubjectRow({ summary, onPress, color, last = false, style }: SubjectRowProps) {
  const theme = useTheme();
  const t = useT();
  const localize = useLocalize();
  const subjectName = useSubjectName();
  const subjectTint = useSubjectTint();

  const name = subjectName(summary.subjectId);
  const percent = percentValue(summary.progress);
  const barColor = color ?? tintPair(theme.colors, subjectTint(summary.subjectId)).foreground;
  const focus = summary.focusTopic
    ? t('subjects.currentFocus', { topic: localize(summary.focusTopic.name) })
    : t('subjects.allDone');
  const remaining =
    summary.incompleteTopics > 0
      ? plural(t, 'subjects.topicsLeft', summary.incompleteTopics)
      : t('subjects.allDone');

  return (
    <Pressable
      onPress={() => onPress(summary.subjectId)}
      accessibilityRole="button"
      accessibilityLabel={t('a11y.openSubject', { subject: name })}
      accessibilityHint={t('a11y.progress', { value: percent })}
      style={({ pressed }) => [
        {
          paddingVertical: theme.spacing.md,
          borderBottomWidth: last ? 0 : 1,
          borderBottomColor: theme.colors.hairlineSoft,
          backgroundColor: pressed ? theme.colors.surface : 'transparent',
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <SubjectMark
          subjectId={summary.subjectId}
          size="md"
          style={{ marginRight: theme.spacing.sm }}
        />

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text variant="bodyMedium" style={{ flex: 1 }} numberOfLines={2}>
              {name}
            </Text>
            <Text variant="bodyMedium" style={{ marginHorizontal: theme.spacing.xs }}>
              {t('common.percent', { value: percent })}
            </Text>
          </View>

          <ProgressBar
            value={summary.progress}
            color={barColor}
            style={{ marginTop: theme.spacing.xs }}
          />
        </View>

        <Feather name="chevron-right" size={theme.sizes.iconSm} color={theme.colors.stone} />
      </View>

      {/* Indented to line up with the text column rather than the mark. */}
      <View
        style={{
          flexDirection: 'row',
          marginTop: theme.spacing.xs,
          paddingLeft: 40 + theme.spacing.sm,
        }}
      >
        <Text variant="caption" tone="slate" style={{ flex: 1 }} numberOfLines={1}>
          {focus}
        </Text>
        <Text variant="caption" tone="stone" style={{ marginLeft: theme.spacing.xs }}>
          {remaining}
        </Text>
      </View>
    </Pressable>
  );
}
