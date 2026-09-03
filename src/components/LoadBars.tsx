/**
 * How heavy each day of the week is, as bars.
 *
 * Heights come from the domain's normalised intensity, which is driven by
 * planned minutes and falls back to task counts rather than inventing a
 * duration for a task that has none. A day with work always shows a visible
 * stub so "a little" never looks like "nothing".
 */
import { View, type ViewStyle } from 'react-native';
import type { DayLoad } from '@/domain/tasks';
import { formatMinutes, weekdayNarrow } from '@/i18n/format';
import { plural } from '@/i18n';
import { useT, useTheme } from '@/theme/ThemeProvider';
import type { LocalDate } from '@/types/content';
import { Text } from './Text';

const TRACK_HEIGHT = 56;
const MIN_BAR = 4;

export interface LoadBarsProps {
  days: readonly DayLoad[];
  today: LocalDate;
  style?: ViewStyle;
  testID?: string;
}

export function LoadBars({ days, today, style, testID }: LoadBarsProps) {
  const theme = useTheme();
  const t = useT();

  return (
    <View
      style={[{ flexDirection: 'row', gap: theme.spacing.xxs }, style]}
      accessibilityRole="list"
      testID={testID}
    >
      {days.map((day) => {
        const height = day.tasks === 0 ? 0 : Math.max(MIN_BAR, day.intensity * TRACK_HEIGHT);
        const isToday = day.date === today;

        return (
          <View
            key={day.date}
            accessible
            accessibilityLabel={`${weekdayNarrow(t, day.date)}, ${
              day.tasks === 0
                ? t('plan.empty.day.title')
                : `${plural(t, 'plan.tasksCount', day.tasks)}, ${formatMinutes(t, day.minutes)}`
            }`}
            style={{ flex: 1, alignItems: 'center' }}
          >
            <View style={{ height: TRACK_HEIGHT, justifyContent: 'flex-end' }}>
              <View
                style={{
                  width: 10,
                  height,
                  borderRadius: theme.radius.full,
                  backgroundColor: isToday ? theme.colors.primary : theme.colors.hairlineStrong,
                }}
              />
            </View>
            <Text
              variant="micro"
              tone={isToday ? 'ink' : 'steel'}
              style={{ marginTop: theme.spacing.xs }}
            >
              {weekdayNarrow(t, day.date)}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
