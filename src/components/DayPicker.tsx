/**
 * Compact day chooser for the task form: Today, Tomorrow, then a scrollable
 * strip of the next two weeks. Avoids a full calendar for a one-tap decision.
 */
import { ScrollView, View } from 'react-native';
import { formatDayMonth, weekdayShort } from '@/i18n/format';
import { useT, useTheme } from '@/theme/ThemeProvider';
import type { LocalDate } from '@/types/content';
import { addDays } from '@/utils/date';
import { Chip } from './Chip';
import { Text } from './Text';

export interface DayPickerProps {
  value: LocalDate;
  today: LocalDate;
  onChange: (date: LocalDate) => void;
  /** How many days forward to offer. */
  days?: number;
}

export function DayPicker({ value, today, onChange, days = 14 }: DayPickerProps) {
  const theme = useTheme();
  const t = useT();

  const tomorrow = addDays(today, 1);
  const laterDates = Array.from({ length: days }, (_, i) => addDays(today, i + 2));
  const isPast = value < today;

  return (
    <View>
      <View style={{ flexDirection: 'row', gap: theme.spacing.xs }}>
        <Chip label={t('common.today')} selected={value === today} onPress={() => onChange(today)} />
        <Chip label={t('common.tomorrow')} selected={value === tomorrow} onPress={() => onChange(tomorrow)} />
      </View>

      <Text variant="caption" tone="stone" style={{ marginTop: theme.spacing.sm, marginBottom: theme.spacing.xxs }}>
        {t('task.pickDay')}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: theme.spacing.xs, paddingRight: theme.spacing.md }}
      >
        {laterDates.map((date) => (
          <Chip
            key={date}
            label={`${weekdayShort(t, date)} ${formatDayMonth(t, date)}`}
            selected={value === date}
            onPress={() => onChange(date)}
          />
        ))}
      </ScrollView>

      {isPast ? (
        <Text variant="caption" tone="slate" style={{ marginTop: theme.spacing.xs }}>
          {formatDayMonth(t, value)}
        </Text>
      ) : null}
    </View>
  );
}
