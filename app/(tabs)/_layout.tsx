import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { getIconName } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={({
        route,
      }: {
        route: RouteProp<ParamListBase, string>;
      }) => ({
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarIcon: ({ focused }) => (
          <View style={styles.iconContainer}>
            <Ionicons
              name={getIconName(route.name, focused)}
              size={24}
              color={focused ? "blue" : "#fff"}
            />
          </View>
        ),
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "",
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    marginTop: 60,
    height: 50,
  },
});
