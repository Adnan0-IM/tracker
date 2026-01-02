import React from "react";
import { Tabs } from "expo-router";
import {Home, Building, Plus, Receipt, Settings} from "lucide-react-native"

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
            tabBarIcon: ({ color }) => <Home size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="budgets"
        options={{
          title: "Budgets",
          tabBarIcon: ({ color }) => <Building size={28}  color={color} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "add",
          tabBarIcon: ({ color }) => <Plus size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: "reports",
          tabBarIcon: ({ color }) => <Receipt size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "settings",
          tabBarIcon: ({ color }) => <Settings size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}

