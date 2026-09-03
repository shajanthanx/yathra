/**
 * Root layout: providers, the one-time hydration of local data, and the
 * onboarding gate. The splash screen is held until stored data has been read,
 * so a returning student never sees an empty Home flash before their data
 * arrives.
 */
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoveryScreen } from '@/screens/RecoveryScreen';
import { loadApp } from '@/store/appStore';
import { useAppStatus, useSettings } from '@/store/useStore';
import { ThemeProvider, useTheme } from '@/theme/ThemeProvider';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppShell />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function AppShell() {
  const theme = useTheme();
  const status = useAppStatus();
  const settings = useSettings();

  // Stored data is read once, when the app starts.
  useEffect(() => {
    void loadApp();
  }, []);

  useEffect(() => {
    if (status !== 'loading') void SplashScreen.hideAsync();
  }, [status]);

  if (status === 'loading') return null;
  if (status === 'error') return <RecoveryScreen />;

  const onboarded = settings.onboardingComplete;

  return (
    <>
      <StatusBar style={theme.scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.canvas },
        }}
      >
        <Stack.Protected guard={!onboarded}>
          <Stack.Screen name="onboarding" />
        </Stack.Protected>

        <Stack.Protected guard={onboarded}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="subject/[subjectId]" />
          <Stack.Screen name="past-papers/index" />
          <Stack.Screen name="past-papers/[subjectId]" />
          <Stack.Screen name="catch-up" />
          <Stack.Screen name="weekly-review" />
          <Stack.Screen name="settings/language" />
          <Stack.Screen name="settings/appearance" />
          <Stack.Screen name="settings/profile" />
          <Stack.Screen name="settings/exam" />
          <Stack.Screen name="settings/data" />
          <Stack.Screen name="settings/about" />
          <Stack.Screen name="task" options={{ presentation: 'modal' }} />
          <Stack.Screen name="study" options={{ presentation: 'modal' }} />
        </Stack.Protected>
      </Stack>
    </>
  );
}
