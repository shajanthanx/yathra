/**
 * A single centred message with its actions — "session complete", "nothing to
 * catch up on", "we couldn't read your saved data", the 404. Five screens had
 * hand-rolled this same layout with slightly different spacing.
 */
import type { ReactNode } from 'react';
import { View, type ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/theme/ThemeProvider';
import { tintPair, type TintKey } from '@/theme/tokens';
import { DetailScreen } from './DetailScreen';
import { Screen } from './Screen';
import { Text } from './Text';

const CENTRED: ViewStyle = { justifyContent: 'center' };

export interface MessageScreenAppBar {
  title?: string;
  onBack?: () => void;
  onClose?: () => void;
}

export interface MessageScreenProps {
  title: string;
  body?: string;
  icon?: keyof typeof Feather.glyphMap;
  tint?: TintKey;
  /** Actions, usually one or two Buttons. */
  children?: ReactNode;
  /** Give this to frame the message with an app bar. */
  appBar?: MessageScreenAppBar;
  testID?: string;
}

export function MessageScreen({
  title,
  body,
  icon,
  tint = 'violet',
  children,
  appBar,
  testID,
}: MessageScreenProps) {
  const theme = useTheme();
  const pair = tintPair(theme.colors, tint);

  const content = (
    <View style={{ alignItems: 'center' }}>
      {icon ? (
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: theme.radius.full,
            backgroundColor: pair.background,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: theme.spacing.lg,
          }}
        >
          <Feather name={icon} size={28} color={pair.foreground} />
        </View>
      ) : null}

      <Text variant="title" align="center" accessibilityRole="header">
        {title}
      </Text>

      {body ? (
        <Text variant="body" tone="slate" align="center" style={{ marginTop: theme.spacing.xs }}>
          {body}
        </Text>
      ) : null}

      {children ? (
        <View style={{ alignSelf: 'stretch', marginTop: theme.spacing.xl, gap: theme.spacing.xs }}>
          {children}
        </View>
      ) : null}
    </View>
  );

  if (appBar) {
    return (
      <DetailScreen
        {...appBar}
        scroll={false}
        contentStyle={CENTRED}
        {...(testID === undefined ? {} : { testID })}
      >
        {content}
      </DetailScreen>
    );
  }

  return (
    <Screen
      scroll={false}
      topSafeArea
      contentStyle={CENTRED}
      {...(testID === undefined ? {} : { testID })}
    >
      {content}
    </Screen>
  );
}
