import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StatusBar } from 'react-native';

export default function TabLayout() {

  StatusBar.setBarStyle('dark-content');
  return (
    <Tabs >
      <Tabs.Screen name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen name="OrderHistory"
        options={{
          title: 'Order History',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="archive" color={color} />,
        }}
      />
      <Tabs.Screen name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  )
}