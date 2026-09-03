/**
 * The week at a glance on Home: seven cells, each carrying its weekday
 * initial, the date, and how that day went.
 *
 * The four states are told apart by shape before colour — a check, a filled
 * disc, a hollow ring, a bare dot — so the row still reads without colour
 * vision. Exact counts go to assistive technology through each cell's label
 * rather than being printed in every cell, which turned the row into a wall of
 * "0 of 1".
 */
import { Pressable, View, type ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { DayLoad } from '@/domain/tasks';
import { weekdayNarrow } from '@/i18n/format';
import { useT, useTheme } from '@/theme/ThemeProvider';
import type { LocalDate } from '@/types/content';
import { dateParts } from '@/utils/date';
import { Text } from './Text';

export interface DayCellsProps {
  days: readonly DayLoad[];
  today: LocalDate;
  onSelect?: (date: LocalDate) => void;
  style?: ViewStyle;
  testID?: string;
}

export function DayCells({ days, today, onSelect, style, testID }: DayCellsProps) {
  const theme = useTheme();
  const t = useT();

  return (
    <View
      style={[{ flexDirection: 'row', gap: theme.spacing.xxs }, style]}
      accessibilityRole="list"
      testID={testID}
    >
      {days.map((day) => {
        const isToday = day.date === today;
        const allDone = day.tasks > 0 && day.completed >= day.tasks;
        const label = `${weekdayNarrow(t, day.date)} ${dateParts(day.date).day}, ${
          day.tasks === 0
            ? t('plan.empty.day.title')
            : t('plan.completedCount', { done: day.completed, total: day.tasks })
        }`;

        const cell = (
          <>
            <Text variant="micro" tone={isToday ? 'ink' : 'steel'}>
              {weekdayNarrow(t, day.date)}
            </Text>
            <Text variant="bodySmMedium" tone={isToday ? 'ink' : 'slate'} style={{ marginTop: 2 }}>
              {dateParts(day.date).day}
            </Text>

            <View style={{ height: 20, justifyContent: 'center', marginTop: 2 }}>
              {allDone ? (
                <Feather name="check" size={16} color={theme.colors.success} />
              ) : day.completed > 0 ? (
                <Feather name="disc" size={14} color={theme.colors.info} />
              ) : day.tasks > 0 ? (
                <Feather name="circle" size={14} color={theme.colors.stone} />
              ) : (
                <View
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: theme.radius.full,
                    backgroundColor: theme.colors.hairlineStrong,
                  }}
                />
              )}
            </View>
          </>
        );

        const cellStyle: ViewStyle = {
          flex: 1,
          alignItems: 'center',
          paddingVertical: theme.spacing.xs,
          borderRadius: theme.radius.lg,
          borderWidth: 1,
          borderColor: isToday ? theme.colors.hairlineStrong : 'transparent',
          backgroundColor: isToday ? theme.colors.surface : 'transparent',
        };

        return onSelect ? (
          <Pressable
            key={day.date}
            onPress={() => onSelect(day.date)}
            accessibilityRole="button"
            accessibilityLabel={label}
            style={cellStyle}
          >
            {cell}
          </Pressable>
        ) : (
          <View key={day.date} accessible accessibilityLabel={label} style={cellStyle}>
            {cell}
          </View>
        );
      })}
    </View>
  );
}
