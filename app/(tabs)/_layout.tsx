import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import useIsLoggedIn from '@/hooks/useIsLoggedIn';

export default function TabLayout() {
  const isLoggedIn = useIsLoggedIn();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="auth"
        options={{
          title: 'Sign In',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
          ...(isLoggedIn && { href: null }),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
          ...(!isLoggedIn && { href: null }),
        }}
      />
      <Tabs.Screen
        name="setup"
        options={{
          title: 'Setup',
          href: null,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
          ...(!isLoggedIn && { href: null }),
        }}
      />
    </Tabs>
  );
}
