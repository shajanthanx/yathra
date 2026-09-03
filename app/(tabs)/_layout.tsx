import { View, type ColorValue } from 'react-native';
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components';
import { useT, useTheme } from '@/theme/ThemeProvider';

/**
 * Icon plus an active indicator. The design system is explicit that a state
 * must never be carried by colour alone, and a tinted icon was the only thing
 * marking the current tab. The indicator keeps its height when inactive so
 * the icon does not shift as tabs change.
 */
function TabIcon({
  name,
  color,
  size,
  focused,
}: {
  name: keyof typeof Feather.glyphMap;
  color: ColorValue;
  size: number;
  focused: boolean;
}) {
  const theme = useTheme();

  return (
    <View style={{ alignItems: 'center' }}>
      <View
        style={{
          height: 3,
          width: focused ? 16 : 0,
          borderRadius: theme.radius.full,
          marginBottom: 4,
          backgroundColor: theme.colors.primary,
        }}
      />
      <Feather name={name} size={size} color={color} />
    </View>
  );
}

/**
 * The tab label, allowed two lines inside a block of fixed height.
 *
 * "Progress" in Tamil is six grapheme clusters and does not fit one line of a
 * 78px slot; it was being truncated to an ellipsis. Wrapping keeps the correct
 * word rather than trading it for a shorter, less accurate one, and the fixed
 * block height keeps all five items the same height whether their label wraps
 * or not.
 */
function TabLabel({ label, color }: { label: string; color: ColorValue }) {
  return (
    <View style={{ height: 28, justifyContent: 'flex-start', paddingHorizontal: 2 }}>
      <Text
        variant="micro"
        color={color as string}
        align="center"
        numberOfLines={2}
        maxFontSizeMultiplier={1}
        style={{ fontSize: 11, lineHeight: 14 }}
      >
        {label}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  const theme = useTheme();
  const t = useT();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.ink,
        tabBarInactiveTintColor: theme.colors.steel,
        tabBarStyle: {
          backgroundColor: theme.colors.canvas,
          borderTopColor: theme.colors.hairlineSoft,
          borderTopWidth: 1,
          height: theme.sizes.tabBarHeight + insets.bottom,
          paddingBottom: insets.bottom + 8,
          paddingTop: 8,
        },
        // No horizontal padding, so a long Sinhala or Tamil label gets the
        // whole slot before it has to wrap.
        tabBarItemStyle: { paddingVertical: 0, paddingHorizontal: 0 },
        sceneStyle: { backgroundColor: theme.colors.canvas },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tab.home'),
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="home" color={color} size={size} focused={focused} />
          ),
          tabBarLabel: ({ color }) => <TabLabel label={t('tab.home')} color={color} />,
        }}
      />
      <Tabs.Screen
        name="subjects"
        options={{
          title: t('tab.subjects'),
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="book-open" color={color} size={size} focused={focused} />
          ),
          tabBarLabel: ({ color }) => <TabLabel label={t('tab.subjects')} color={color} />,
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          title: t('tab.plan'),
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="calendar" color={color} size={size} focused={focused} />
          ),
          tabBarLabel: ({ color }) => <TabLabel label={t('tab.plan')} color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: t('tab.progress'),
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="bar-chart-2" color={color} size={size} focused={focused} />
          ),
          tabBarLabel: ({ color }) => <TabLabel label={t('tab.progress')} color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: t('tab.more'),
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="menu" color={color} size={size} focused={focused} />
          ),
          tabBarLabel: ({ color }) => <TabLabel label={t('tab.more')} color={color} />,
        }}
      />
    </Tabs>
  );
}
