import { Redirect } from 'expo-router';
import { useSettings } from '@/store/useStore';

/** Entry route: sends a new student to onboarding and everyone else to Home. */
export default function Index() {
  const settings = useSettings();
  return <Redirect href={settings.onboardingComplete ? '/(tabs)' : '/onboarding'} />;
}
