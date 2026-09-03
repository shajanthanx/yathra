/**
 * A subject at a glance, sized for the three-up row on Home.
 *
 * It shows what the app actually knows — completed topics out of total — and
 * not an invented per-subject verdict. The on-track judgement is computed for
 * the syllabus as a whole, so claiming one per subject would be making it up.
 *
 * The card itself is a plain surface and the subject's colour arrives through
 * the ring. Three of the six tints pair with a near-black foreground, because
 * those `-on` values are text colours for a pale panel, not graphic colours —
 * drawing the ring in one over its own tint gave Chemistry a dark maroon arc
 * on pink. On a white surface all six read cleanly, and the design system asks
 * for tint panels to be mixed with plain ones in any case.
 */
import { Pressable, type ViewStyle } from 'react-native';
import type { SubjectProgressSummary } from '@/domain/progress';
import { useSubjectName, useSubjectTint } from '@/hooks/useContent';
import { percentValue } from '@/i18n/format';
import { useT, useTheme } from '@/theme/ThemeProvider';
import { tintPair } from '@/theme/tokens';
import type { SubjectId } from '@/types/content';
import { ProgressRing } from './ProgressRing';
import { Text } from './Text';

export interface SubjectCardProps {
  summary: SubjectProgressSummary;
  onPress: (subjectId: SubjectId) => void;
  style?: ViewStyle;
  testID?: string;
}

export function SubjectCard({ summary, onPress, style, testID }: SubjectCardProps) {
  const theme = useTheme();
  const t = useT();
  const subjectName = useSubjectName();
  const subjectTint = useSubjectTint();

  const pair = tintPair(theme.colors, subjectTint(summary.subjectId));
  const name = subjectName(summary.subjectId, true);
  const percent = percentValue(summary.progress);

  return (
    <Pressable
      onPress={() => onPress(summary.subjectId)}
      accessibilityRole="button"
      accessibilityLabel={t('a11y.subjectProgress', { subject: name, value: percent })}
      style={({ pressed }) => [
        {
          flex: 1,
          alignItems: 'center',
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.xs,
          borderRadius: theme.radius.xl,
          borderWidth: 1,
          borderColor: theme.colors.hairlineSoft,
          backgroundColor: pressed ? theme.colors.surface : theme.colors.surfaceRaised,
        },
        style,
      ]}
      testID={testID}
    >
      <ProgressRing
        value={summary.progress}
        size={theme.sizes.ringSm}
        thickness={6}
        color={pair.foreground}
      >
        <Text variant="bodyMedium" maxFontSizeMultiplier={1.2}>
          {t('common.percent', { value: percent })}
        </Text>
      </ProgressRing>

      <Text
        variant="bodySmMedium"
        align="center"
        numberOfLines={2}
        style={{ marginTop: theme.spacing.xs }}
      >
        {name}
      </Text>

      <Text variant="micro" tone="steel" align="center" style={{ marginTop: 2 }}>
        {t('common.of', { done: summary.completedTopics, total: summary.totalTopics })}
      </Text>
    </Pressable>
  );
}
