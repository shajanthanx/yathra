/**
 * The week at a glance: seven days with how many tasks each holds. Tapping a
 * day filters the list below it. This is deliberately not a calendar grid.
 */
import { Pressable, View } from 'react-native';
import type { WeekDaySummary } from '@/domain/tasks';
import { weekdayShort } from '@/i18n/format';
import { plural } from '@/i18n';
import { useT, useTheme } from '@/theme/ThemeProvider';
import type { LocalDate } from '@/types/content';
import { dateParts } from '@/utils/date';
import { Text } from './Text';

export interface WeekStripProps {
  days: readonly WeekDaySummary[];
  selected: LocalDate;
  today: LocalDate;
  onSelect: (date: LocalDate) => void;
}

export function WeekStrip({ days, selected, today, onSelect }: WeekStripProps) {
  const theme = useTheme();
  const t = useT();

  return (
    <View style={{ flexDirection: 'row', gap: theme.spacing.xxs }}>
      {days.map((day) => {
        const isSelected = day.date === selected;
        const isToday = day.date === today;
        const allDone = day.total > 0 && day.completed === day.total;

        return (
          <Pressable
            key={day.date}
            onPress={() => onSelect(day.date)}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={`${weekdayShort(t, day.date)} ${dateParts(day.date).day}, ${plural(t, 'plan.tasksCount', day.total)}`}
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: theme.spacing.xs,
              borderRadius: theme.radius.lg,
              backgroundColor: isSelected ? theme.colors.primary : 'transparent',
              borderWidth: 1,
              borderColor: isSelected
                ? theme.colors.primary
                : isToday
                  ? theme.colors.hairlineStrong
                  : 'transparent',
              minHeight: 64,
            }}
          >
            <Text
              variant="micro"
              color={isSelected ? theme.colors.onPrimary : theme.colors.steel}
              numberOfLines={1}
            >
              {weekdayShort(t, day.date)}
            </Text>
            <Text
              variant="bodyMedium"
              color={isSelected ? theme.colors.onPrimary : theme.colors.ink}
              style={{ marginTop: 2 }}
            >
              {dateParts(day.date).day}
            </Text>
            <View
              style={{
                marginTop: 4,
                height: 6,
                minWidth: 6,
                paddingHorizontal: day.total > 0 ? 4 : 0,
                borderRadius: theme.radius.full,
                backgroundColor:
                  day.total === 0
                    ? 'transparent'
                    : isSelected
                      ? theme.colors.onPrimary
                      : allDone
                        ? theme.colors.success
                        : theme.colors.hairlineStrong,
              }}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
