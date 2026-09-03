import { Stack } from 'expo-router';
import { OnboardingProvider } from '@/screens/onboarding/OnboardingContext';
import { useTheme } from '@/theme/ThemeProvider';

export default function OnboardingLayout() {
  const theme = useTheme();
  return (
    <OnboardingProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.canvas },
        }}
      />
    </OnboardingProvider>
  );
}
