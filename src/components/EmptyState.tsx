/**
 * Empty state: a tint panel with an icon, a line saying what would be here and
 * one line of guidance. Never a bare "no data".
 */
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeProvider';
import { tintPair, type TintKey } from '@/theme/tokens';
import { Button } from './Button';
import { Text } from './Text';

export interface EmptyStateProps {
  title: string;
  body?: string;
  icon?: keyof typeof Feather.glyphMap;
  tint?: TintKey;
  actionLabel?: string;
  onAction?: () => void;
  testID?: string;
}

export function EmptyState({
  title,
  body,
  icon = 'feather',
  tint = 'violet',
  actionLabel,
  onAction,
  testID,
}: EmptyStateProps) {
  const theme = useTheme();
  const { background, foreground } = tintPair(theme.colors, tint);

  return (
    <View
      testID={testID}
      style={{
        backgroundColor: background,
        borderRadius: theme.radius.xxxl,
        padding: theme.spacing.xl,
        alignItems: 'center',
      }}
    >
      <Feather name={icon} size={28} color={foreground} />
      <Text variant="subheading" color={foreground} align="center" style={{ marginTop: theme.spacing.sm }}>
        {title}
      </Text>
      {body ? (
        <Text variant="bodySm" color={foreground} align="center" style={{ marginTop: theme.spacing.xxs, opacity: 0.85 }}>
          {body}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <Button
          label={actionLabel}
          onPress={onAction}
          variant="primary"
          size="sm"
          fullWidth={false}
          style={{ marginTop: theme.spacing.md }}
        />
      ) : null}
    </View>
  );
}
