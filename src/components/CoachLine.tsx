/**
 * One encouraging sentence, chosen from what the student has actually done.
 * Deliberately not a card: it reads as the app talking, not as another panel.
 */
import type { TextStyle } from 'react-native';
import { useCoachMessage } from '@/hooks/useCoach';
import { Text } from './Text';

export interface CoachLineProps {
  style?: TextStyle;
  testID?: string;
}

export function CoachLine({ style, testID }: CoachLineProps) {
  const message = useCoachMessage();

  return (
    <Text variant="body" tone="slate" style={style} testID={testID}>
      {message}
    </Text>
  );
}
