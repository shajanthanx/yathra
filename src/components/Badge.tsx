/**
 * Status chips. Colour never carries the meaning on its own: every badge shows
 * a word, and the semantic variants also show an icon.
 */
import { View, type ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeProvider';
import { tintPair, type TintKey } from '@/theme/tokens';
import { Text } from './Text';

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export interface BadgeProps {
  label: string;
  tone?: BadgeTone;
  tint?: TintKey;
  icon?: keyof typeof Feather.glyphMap;
  style?: ViewStyle;
}

export function Badge({ label, tone = 'neutral', tint, icon, style }: BadgeProps) {
  const theme = useTheme();

  const semantic = {
    neutral: { bg: theme.colors.surface, fg: theme.colors.slate },
    success: { bg: theme.colors.successSoft, fg: theme.colors.success },
    warning: { bg: theme.colors.warningSoft, fg: theme.colors.accentOnSoft },
    danger: { bg: theme.colors.dangerSoft, fg: theme.colors.danger },
    info: { bg: theme.colors.infoSoft, fg: theme.colors.info },
  }[tone];

  const colors = tint ? tintPair(theme.colors, tint) : { background: semantic.bg, foreground: semantic.fg };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          backgroundColor: colors.background,
          borderRadius: theme.radius.full,
          paddingVertical: theme.spacing.xxs,
          paddingHorizontal: theme.spacing.sm,
        },
        style,
      ]}
    >
      {icon ? (
        <Feather
          name={icon}
          size={14}
          color={colors.foreground}
          style={{ marginRight: theme.spacing.xxs }}
        />
      ) : null}
      <Text variant="captionBold" color={colors.foreground} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}
